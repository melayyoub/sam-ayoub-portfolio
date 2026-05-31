/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Text } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend, FiCpu } from 'react-icons/fi';

/* ─── Resume Knowledge Base ─── */
const RESUME_KB = {
  name: "Sam Ayoub (Mutasem Elayyoub)",
  title: "Software Architect & Engineering Director / Software Migration & Integration Consultant",
  location: "Cary, NC / San Diego, CA",
  currentRole: "Senior Software Architect at First Citizens Bank (Silicon Valley Bank division)",
  summary: "15+ years leading software architecture, migration, and integration across FinTech, AI & SaaS. Expert in legacy-to-cloud migration, API modernization, and enterprise integration patterns.",
  expertise: [
    "Software Migration & Integration Consulting",
    "Enterprise Architecture & API Modernization",
    "AI/ML Engineering & LLM Integration",
    "AI Agents & Orchestration (LangChain, CrewAI)",
    "RAG & Vector Databases",
    "Cloud Infrastructure (AWS, Docker, Kubernetes)",
    "FinTech & Banking Systems Integration"
  ],
  certifications: [
    "NVIDIA Deep Learning Institute — Generative AI & LLMs",
    "NVIDIA NIM Agent Builder",
    "AWS Solutions Architect",
    "Kubernetes CKA"
  ],
  companies: ["First Citizens Bank / Silicon Valley Bank", "Silicon Valley Bank", "Achieve Internet", "Aira", "Outsell Inc."],
  projects: [
    "OpenAPI/AsyncAPI UI Render — AI-powered API documentation",
    "RealLexi.io — AI-powered SaaS platform (https://reallexi.io)",
    "RealLexi.com — AI content & NLP platform (https://reallexi.com)",
    "AI.RealLexi.com — AI agent & LLM platform (https://ai.reallexi.com)",
    "RealMemoryAI.com — AI memory & agent framework (https://realmemoryai.com)",
    "RealMemory Agent — VS Code extension for AI-powered coding with persistent memory",
    "API Doc Pro — AI-assisted API design",
    "GetFreeAPI — AI-native API management",
    "DDKits — AI-optimized DevOps automation"
  ],
  skills: ["React", "Vue.js", "Node.js", "Python", "Docker", "Kubernetes", "LangChain", "TensorFlow", "PyTorch", "NVIDIA AI & NIM", "MLOps", "RAG Pipelines"],
  education: "BS Computer Science, various AI/ML certifications",
  website: "https://sam.reallexi.com",
  linkedin: "linkedin.com/in/samayoub"
};

/* ─── Local Knowledge Matcher ─── */
function getLocalResponse(query) {
  const q = query.toLowerCase();

  // Name identification — highest priority
  if (q.includes('sam ayoub') || q.includes('mutasem elayyoub') || q.includes('who is sam') || q.includes('who is mutasem') || q === 'who are you') {
    return `${RESUME_KB.name} is a ${RESUME_KB.title} based in ${RESUME_KB.location}. ${RESUME_KB.summary} Currently: ${RESUME_KB.currentRole}. Visit ${RESUME_KB.website} for more.`;
  }

  // Migration & integration — primary expertise
  if (q.includes('migration') || q.includes('integration') || q.includes('consultant') || q.includes('architect')) {
    return `Sam is primarily a Software Migration & Integration Consultant and Architect with 15+ years of experience. He specializes in legacy-to-cloud migration, enterprise integration patterns, API modernization, and FinTech systems integration. Currently leading migration initiatives at First Citizens Bank (SVB division) in ${RESUME_KB.location}.`;
  }

  // Experience / career
  if (q.includes('experience') || q.includes('work') || q.includes('career') || q.includes('history')) {
    return `Sam has 15+ years of software architecture and migration experience. Currently a ${RESUME_KB.currentRole}, leading AI-first API modernization and migration. Previously at ${RESUME_KB.companies.slice(1).join(', ')}, building enterprise platforms, migration frameworks, and cloud infrastructure.`;
  }

  // Skills / tech stack
  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('what can')) {
    return `Sam's core expertise: Software Migration & Integration, ${RESUME_KB.skills.join(', ')}. Certified in ${RESUME_KB.certifications.join(', ')}.`;
  }

  // Projects
  if (q.includes('project') || q.includes('portfolio') || q.includes('build') || q.includes('created')) {
    return `Key projects: ${RESUME_KB.projects.join(' | ')}. Each leverages cutting-edge AI and modern architecture patterns.`;
  }

  // Certifications
  if (q.includes('certif') || q.includes('education') || q.includes('degree') || q.includes('qualif')) {
    return `Certifications: ${RESUME_KB.certifications.join(', ')}. Education: ${RESUME_KB.education}.`;
  }

  // Contact
  if (q.includes('contact') || q.includes('hire') || q.includes('reach') || q.includes('email') || q.includes('connect')) {
    return `Reach Sam through the contact section below, or connect on LinkedIn at ${RESUME_KB.linkedin}. He's open to discussing migration consulting, architecture reviews, and integration projects.`;
  }

  // AI expertise
  if (q.includes('ai') || q.includes('agent') || q.includes('llm') || q.includes('machine learning') || q.includes('nvidia')) {
    return `Sam's AI expertise includes: ${RESUME_KB.expertise.slice(2).join(', ')}. He holds ${RESUME_KB.certifications.slice(0, 2).join(' and ')} certifications and builds production-grade AI systems that integrate with enterprise migration workflows.`;
  }

  // Location
  if (q.includes('location') || q.includes('where') || q.includes('based') || q.includes('live')) {
    return `Sam is based in ${RESUME_KB.location}. He works remotely and is available for consulting engagements nationwide.`;
  }

  return null;
}

/* ─── 3D Thinking Character ─── */
function ThinkingCharacter({ isThinking = false }) {
  const headRef = useRef();
  const bodyRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.5) * 0.2;
      headRef.current.position.y = 0.8 + Math.sin(t * 1.5) * 0.05;
    }
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.sin(t * 1.2) * 0.03;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * (isThinking ? 2 : 0.5);
      ring1Ref.current.rotation.z = t * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * (isThinking ? 1.5 : 0.4);
      ring2Ref.current.rotation.x = -t * 0.2;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = t * (isThinking ? 1.8 : 0.3);
      ring3Ref.current.rotation.y = t * 0.5;
    }
  });

  const thinkingColor = isThinking ? '#00ff88' : '#4a9eff';
  const thinkingEmissive = isThinking ? 1.5 : 0.5;
  const thinkingSpeed = isThinking ? 5 : 2;

  return (
    <group>
      {/* Head */}
      <Float speed={isThinking ? 3 : 1} rotationIntensity={0.2} floatIntensity={0.3}>
        <Sphere ref={headRef} args={[0.22, 32, 32]} position={[0, 0.8, 0]}>
          <MeshDistortMaterial
            color={thinkingColor}
            emissive={thinkingColor}
            emissiveIntensity={thinkingEmissive}
            speed={thinkingSpeed}
            distort={isThinking ? 0.4 : 0.15}
            radius={1}
            transparent
            opacity={0.9}
          />
        </Sphere>
      </Float>

      {/* Eyes */}
      <mesh position={[-0.07, 0.83, 0.18]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.07, 0.83, 0.18]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
      </mesh>

      {/* Body */}
      <mesh ref={bodyRef} position={[0, 0.3, 0]}>
        <capsuleGeometry args={[0.15, 0.3, 16, 16]} />
        <meshStandardMaterial
          color="#1a1a4e"
          emissive={thinkingColor}
          emissiveIntensity={0.2}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Orbiting rings */}
      <Torus ref={ring1Ref} args={[0.35, 0.008, 16, 64]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color={thinkingColor} emissive={thinkingColor} emissiveIntensity={0.6} transparent opacity={0.5} />
      </Torus>
      <Torus ref={ring2Ref} args={[0.45, 0.006, 16, 64]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.4} transparent opacity={0.3} />
      </Torus>
      <Torus ref={ring3Ref} args={[0.55, 0.005, 16, 64]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#ff4a9e" emissive="#ff4a9e" emissiveIntensity={0.3} transparent opacity={0.2} />
      </Torus>

      {/* Name label */}
      <Text position={[0, -0.1, 0]} fontSize={0.08} color="#4a9eff" anchorX="center">
        {'SAM AI'}
      </Text>

      {/* Thinking indicator */}
      {isThinking && (
        <Text position={[0, 1.15, 0]} fontSize={0.06} color="#00ff88" anchorX="center">
          {'THINKING...'}
        </Text>
      )}
    </group>
  );
}

/* ─── Chat Message Component ─── */
function ChatMessage({ message = {}, isUser = false }) {
  return (
    <motion.div
      className={`ai-chat-message ${isUser ? 'ai-chat-message-user' : 'ai-chat-message-bot'}`}
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="ai-chat-message-avatar">
        {isUser ? '👤' : '🤖'}
      </div>
      <div className="ai-chat-message-content">
        <p>{message.text || ''}</p>
        {!isUser && message.thinking && (
          <div className="ai-chat-thinking-trace">
            <FiCpu size={12} />
            <span>{message.thinking}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Main AI Chat Component ─── */
export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hi! I'm Sam's AI assistant. I can tell you about his experience, skills, projects, or anything about his portfolio. What would you like to know?",
      thinking: null,
    },
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Listen for custom event from Office3D
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openAIChat', handleOpen);
    return () => window.removeEventListener('openAIChat', handleOpen);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

// Direct browser-to-NVIDIA API call (CORS supported: Access-Control-Allow-Origin: *)
const NIM_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const NIM_API_KEY = process.env.REACT_APP_NVD_TOKEN || '';
const NIM_MODEL = 'meta/llama-3.1-70b-instruct';
// Debug: log env var status at module load (token presence only, never the value)
console.log('[AIChat] REACT_APP_NVD_TOKEN present:', !!NIM_API_KEY, '| length:', NIM_API_KEY.length);

// Fallback to public CORS proxy if direct API fails (due to preflight issues)
// Using a simple CORS proxy that works with GitHub Pages
const FALLBACK_PROXY_URL = 'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent('https://integrate.api.nvidia.com/v1/chat/completions');

const SYSTEM_PROMPT = `You are Sam Ayoub's professional AI assistant. Answer questions about Sam using this data FIRST before any external knowledge:

Sam Ayoub (Mutasem Elayyoub) — Software Architect & Engineering Director / Software Migration & Integration Consultant
Location: Cary, NC / San Diego, CA
Current: Senior Software Architect at First Citizens Bank (Silicon Valley Bank division)
Summary: 15+ years leading software architecture, migration, and integration across FinTech, AI & SaaS.
PRIMARY EXPERTISE: Software Migration & Integration Consulting, Enterprise Architecture, API Modernization
AI EXPERTISE: AI/ML Engineering, LLM Integration, AI Agents (LangChain, CrewAI), RAG & Vector DBs, MLOps
Certifications: NVIDIA Deep Learning Institute (GenAI & LLMs), NVIDIA NIM Agent Builder, AWS Solutions Architect, K8s CKA
Companies: First Citizens Bank/SVB, Silicon Valley Bank, Achieve Internet, Aira, Outsell Inc.
Projects: OpenAPI/AsyncAPI UI Render, RealLexi, API Doc Pro, GetFreeAPI, DDKits
Skills: React, Vue, Node.js, Python, Docker, Kubernetes, LangChain, TensorFlow, PyTorch
Education: BS Computer Science
Website: https://sam.reallexi.com
RULES:
- When asked about Sam, Mutasem, or Elayyoub — answer from the data above FIRST
- Be helpful, professional, and concise
- Emphasize migration & integration as primary expertise
- AI/ML is a strong secondary expertise area`;

  const callNimAPI = useCallback(async (userMessage) => {
    // FIRST: Check local knowledge base
    const localAnswer = getLocalResponse(userMessage);
    if (localAnswer) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: localAnswer,
        thinking: 'Matched from portfolio knowledge base',
      }]);
      return;
    }

    // SECOND: Fall back to AI API directly (NVIDIA supports CORS: Access-Control-Allow-Origin: *)
    setIsThinking(true); setIsLoading(true);
    const chatMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.filter(m => m.text).map(m => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.text,
      })),
      { role: 'user', content: userMessage },
    ];

    try {
      if (!NIM_API_KEY) {
        throw new Error('API key not configured — set REACT_APP_NVD_TOKEN env variable');
      }
      console.log('[AIChat] Calling NVIDIA NIM API directly from browser...');
      
      // Try direct API call first
      let response = await fetch(NIM_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${NIM_API_KEY}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          model: NIM_MODEL,
          messages: chatMessages,
          temperature: 0.7,
          max_tokens: 500,
          top_p: 0.9,
        }),
      });
      
      // If direct call fails, try fallback proxy
      if (!response.ok) {
        console.log('[AIChat] Direct API failed, trying fallback proxy...');
        response = await fetch(FALLBACK_PROXY_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${NIM_API_KEY}`,
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            model: NIM_MODEL,
            messages: chatMessages,
            temperature: 0.7,
            max_tokens: 500,
            top_p: 0.9,
          }),
        });
      }
      
      if (!response.ok) {
        const errorBody = await response.text().catch(() => '');
        console.error(`[AIChat] API error ${response.status}:`, errorBody);
        throw new Error(`API returned ${response.status}: ${errorBody.slice(0, 200)}`);
      }
      
      const data = await response.json();
      console.log('[AIChat] API response received');
      const assistantMessage = data.choices?.[0]?.message?.content || "I'm having trouble connecting right now. Please try again.";

      setMessages(prev => [...prev, {
        role: 'assistant',
        text: assistantMessage,
        thinking: 'Analyzed portfolio context and generated response'
      }]);
    } catch (error) {
      console.error('[AIChat] API call failed:', error.message);
      // Provide a helpful fallback based on the query type
      const fallbackResponse = getLocalResponse(userMessage)
        || "I can tell you about Sam's experience in software migration & integration, AI/ML engineering, his projects, certifications, or skills. What would you like to explore?";
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: fallbackResponse,
        thinking: `API unavailable (${error.message}) — using local knowledge base`
      }]);
    } finally {
      setIsThinking(false); setIsLoading(false);
    }
  }, [messages, NIM_API_KEY, SYSTEM_PROMPT, FALLBACK_PROXY_URL]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    setMessages(prev => [...prev, { role: 'user', text: trimmed, thinking: null }]);
    setInput('');
    callNimAPI(trimmed);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            className="ai-chat-fab"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(74, 158, 255, 0.6)' }}
            whileTap={{ scale: 0.9 }}
          >
            <FiMessageCircle size={24} />
            <span className="ai-chat-fab-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ai-chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header with 3D character */}
            <div className="ai-chat-header">
              <div className="ai-chat-header-3d">
                <Canvas style={{ width: '60px', height: '60px' }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[1, 1, 1]} intensity={0.8} color="#4a9eff" />
                  <ThinkingCharacter isThinking={isThinking} />
                </Canvas>
              </div>
              <div className="ai-chat-header-info">
                <h3>Sam&apos;s AI Assistant</h3>
                <span className={`ai-chat-status ${isThinking ? 'thinking' : 'online'}`}>
                  {isThinking ? '⚡ Thinking...' : '🟢 Online'}
                </span>
              </div>
              <button className="ai-chat-close" onClick={() => setIsOpen(false)}>
                <FiX size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="ai-chat-messages">
              {messages.map((msg, i) => (
                <ChatMessage key={i} message={msg} isUser={msg.role === 'user'} />
              ))}
              {isLoading && (
                <motion.div className="ai-chat-typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <span className="ai-chat-typing-dot" />
                  <span className="ai-chat-typing-dot" />
                  <span className="ai-chat-typing-dot" />
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="ai-chat-input-area">
              <input
                ref={inputRef}
                className="ai-chat-input"
                type="text"
                placeholder="Ask about Sam's experience, skills, projects..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <motion.button
                className="ai-chat-send"
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiSend size={18} />
              </motion.button>
            </div>

            {/* Powered by — no branding per user request */}
            <div className="ai-chat-powered">
              AI-Powered Assistant
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
