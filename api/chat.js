/**
 * Vercel Serverless Function — CORS Proxy for AI Chat API
 *
 * This function proxies chat completion requests to the AI provider,
 * solving CORS restrictions for browser-based calls.
 *
 * Environment variables needed in Vercel:
 *   - REACT_APP_NVD_TOKEN: API key for the AI provider
 */

const AI_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const DEFAULT_MODEL = 'meta/llama-3.1-70b-instruct';

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  'https://sam.reallexi.com',
  'http://localhost:3000',
  'http://localhost:3001',
];

/**
 * Build CORS headers based on the request origin
 */
function getCorsHeaders(origin) {
  const headers = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };

  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Vary'] = 'Origin';
  } else {
    // Default to production origin
    headers['Access-Control-Allow-Origin'] = 'https://sam.reallexi.com';
  }

  return headers;
}

/**
 * Validate the incoming request body
 */
function validateBody(body) {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid request body' };
  }
  if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
    return { valid: false, error: 'messages array is required and must not be empty' };
  }
  for (const msg of body.messages) {
    if (!msg.role || !msg.content) {
      return { valid: false, error: 'Each message must have role and content' };
    }
    if (!['system', 'user', 'assistant'].includes(msg.role)) {
      return { valid: false, error: `Invalid message role: ${msg.role}` };
    }
  }
  return { valid: true };
}

export default async function handler(req) {
  const origin = req.headers.get('origin') || req.headers.get('Origin') || '';
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Get API key from environment
  const apiKey = process.env.REACT_APP_NVD_TOKEN || process.env.NVD_TOKEN || '';
  if (!apiKey) {
    console.error('[chat-proxy] No API key configured');
    return new Response(
      JSON.stringify({ error: 'API key not configured on server' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Parse request body
    const body = await req.json();
    const validation = validateBody(body);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build the upstream request payload
    const upstreamPayload = {
      model: body.model || DEFAULT_MODEL,
      messages: body.messages,
      temperature: Math.min(Math.max(body.temperature || 0.7, 0), 1),
      max_tokens: Math.min(Math.max(body.max_tokens || 500, 1), 2000),
      top_p: Math.min(Math.max(body.top_p || 0.9, 0), 1),
      stream: false,
    };

    console.log(`[chat-proxy] Forwarding to ${AI_API_URL} with model: ${upstreamPayload.model}`);

    // Call the AI API
    const apiResponse = await fetch(AI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify(upstreamPayload),
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text().catch(() => '');
      console.error(`[chat-proxy] API error ${apiResponse.status}: ${errorText.slice(0, 300)}`);
      return new Response(
        JSON.stringify({
          error: `AI API returned ${apiResponse.status}`,
          details: errorText.slice(0, 200),
        }),
        { status: apiResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await apiResponse.json();
    console.log('[chat-proxy] Success — returning response');

    return new Response(
      JSON.stringify(data),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (error) {
    console.error('[chat-proxy] Error:', error.message);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}
