/**
 * Local Development CORS Proxy for AI Chat API
 *
 * Run this alongside `npm start` (CRA dev server on port 3000):
 *   node proxy-server.js
 *
 * This proxies /api/chat requests to the NVIDIA NIM API,
 * adding proper CORS headers and the API key from .env
 *
 * The CRA dev server will forward /api/* requests here
 * because of the "proxy" field in package.json.
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

// Load .env file
const envPath = path.join(__dirname, '.env');
let API_KEY = '';
try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/REACT_APP_NVD_TOKEN=(.+)/);
  if (match) API_KEY = match[1].trim();
} catch (e) {
  console.warn('[proxy] Could not read .env file');
}

const AI_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const DEFAULT_MODEL = 'meta/llama-3.1-70b-instruct';
const PORT = 3001;

const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'https://sam.reallexi.com',
];

const server = http.createServer((req, res) => {
  const origin = req.headers.origin || '';

  // CORS headers
  const corsOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  res.setHeader('Access-Control-Allow-Origin', corsOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Only allow POST to /api/chat
  if (req.method !== 'POST' || req.url !== '/api/chat') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
    return;
  }

  if (!API_KEY) {
    console.error('[proxy] No API key found in .env');
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'API key not configured' }));
    return;
  }

  // Read request body
  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => {
    let parsed;
    try {
      parsed = JSON.parse(body);
    } catch (e) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
      return;
    }

    const upstreamPayload = {
      model: parsed.model || DEFAULT_MODEL,
      messages: parsed.messages || [],
      temperature: Math.min(Math.max(parsed.temperature || 0.7, 0), 1),
      max_tokens: Math.min(Math.max(parsed.max_tokens || 500, 1), 2000),
      top_p: Math.min(Math.max(parsed.top_p || 0.9, 0), 1),
      stream: false,
    };

    console.log(`[proxy] Forwarding to AI API with model: ${upstreamPayload.model}`);

    const upstreamBody = JSON.stringify(upstreamPayload);
    const url = new URL(AI_API_URL);

    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json',
        'Content-Length': Buffer.byteLength(upstreamBody),
      },
    };

    const apiReq = https.request(options, (apiRes) => {
      let data = '';
      apiRes.on('data', chunk => { data += chunk; });
      apiRes.on('end', () => {
        res.writeHead(apiRes.statusCode, { 'Content-Type': 'application/json' });
        res.end(data);
        if (apiRes.statusCode === 200) {
          console.log('[proxy] Success — response forwarded');
        } else {
          console.error(`[proxy] API error ${apiRes.statusCode}: ${data.slice(0, 200)}`);
        }
      });
    });

    apiReq.on('error', (e) => {
      console.error('[proxy] Request error:', e.message);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Upstream request failed', details: e.message }));
    });

    apiReq.write(upstreamBody);
    apiReq.end();
  });
});

server.listen(PORT, () => {
  console.log(`[proxy] CORS proxy running on http://localhost:${PORT}`);
  console.log(`[proxy] API key loaded: ${API_KEY ? 'YES' : 'NO'}`);
  console.log(`[proxy] Forwarding /api/chat → ${AI_API_URL}`);
  console.log(`[proxy] Default model: ${DEFAULT_MODEL}`);
});
