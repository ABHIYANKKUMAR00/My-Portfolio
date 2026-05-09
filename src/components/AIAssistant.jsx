import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const QUICK_REPLIES = ['Skills', 'Projects', 'Contact', 'AI Experience', 'About Me']

const RESPONSES = {
  skills: "Abhiyank's core stack: React, Redux, Python, Node.js, FastAPI on the full-stack side — plus LangChain, HuggingFace Transformers, and Pinecone for AI. Strongest in React frontends and RAG-powered AI apps! 🚀",
  projects: "Two featured projects: (1) AI Medical Chatbot — a production RAG pipeline using LangChain + Pinecone + HuggingFace. (2) Myntra Clone — a full e-commerce app with React + Redux state management. Both are real production-grade builds! 💻",
  contact: "Reach Abhiyank at abhiyankhatana@gmail.com or call +91 9627679373. He's based in Greater Noida, India and open to full-stack, AI engineering, or ML roles! 📬",
  ai: "Deep AI expertise: LangChain pipelines, HuggingFace Transformers, RAG architecture, Pinecone vector databases, FastAPI backends for AI. He's built real production AI applications, not just tutorials! 🤖",
  about: "Abhiyank is a final-year B.Tech CS student from Greater Noida. Strong DSA, DBMS, OS, and OOPs foundations combined with hands-on project experience in AI + full-stack web development! 🎓",
  default: "I can tell you about Abhiyank's skills, projects, AI experience, education, or contact info. What would you like to explore? 😊",
}

function getResponse(input) {
  const q = input.toLowerCase()
  if (q.match(/skill|tech|stack|language|framework/)) return RESPONSES.skills
  if (q.match(/project|work|built|chatbot|myntra|app/)) return RESPONSES.projects
  if (q.match(/contact|email|phone|reach|hire|job|work with/)) return RESPONSES.contact
  if (q.match(/ai|ml|rag|langchain|hugging|pinecone|machine learning/)) return RESPONSES.ai
  if (q.match(/about|who|bio|education|degree|study|student/)) return RESPONSES.about
  return RESPONSES.default
}

const QUICK_MAP = {
  'Skills': RESPONSES.skills,
  'Projects': RESPONSES.projects,
  'Contact': RESPONSES.contact,
  'AI Experience': RESPONSES.ai,
  'About Me': RESPONSES.about,
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: "👋 Hi! I'm Riya — Abhiyank's AI portfolio guide. Ask me about his skills, projects, or how to contact him!" },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [pulse, setPulse] = useState(true)
  const bottomRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, typing])
  useEffect(() => { if (open) setTimeout(() => setPulse(false), 3000) }, [open])

  const send = (text) => {
    if (!text.trim()) return
    const response = QUICK_MAP[text] || getResponse(text)
    setMessages(m => [...m, { from: 'user', text: text.trim() }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(m => [...m, { from: 'bot', text: response }])
    }, 900 + Math.random() * 400)
  }

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 50 }}>
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.88, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', bottom: 70, right: 0,
              width: 'clamp(300px, 90vw, 345px)', borderRadius: 20,
              background: 'rgba(3,0,20,0.96)',
              border: '1px solid rgba(139,92,246,0.32)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.55), 0 0 40px rgba(139,92,246,0.14)',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 11,
              background: 'linear-gradient(135deg, rgba(139,92,246,0.18), rgba(6,182,212,0.08))',
              borderBottom: '1px solid rgba(139,92,246,0.14)',
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', flexShrink: 0,
              }}>
                🤖
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#f1f5f9' }}>Riya</div>
                <div style={{ fontSize: '0.65rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                  AI Portfolio Guide
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: '1rem', lineHeight: 1, padding: 4 }}
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div style={{ height: 265, overflowY: 'auto', padding: '14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}
                >
                  <div style={{
                    maxWidth: '82%', padding: '9px 13px',
                    borderRadius: msg.from === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                    background: msg.from === 'user' ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)' : 'rgba(255,255,255,0.055)',
                    border: msg.from === 'bot' ? '1px solid rgba(139,92,246,0.14)' : 'none',
                    color: '#f1f5f9', fontSize: '0.8rem', lineHeight: 1.62,
                  }}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: 4, padding: '8px 12px' }}>
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.45, repeat: Infinity, delay: i * 0.13 }}
                      style={{ width: 6, height: 6, borderRadius: '50%', background: '#8b5cf6' }}
                    />
                  ))}
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            <div style={{ padding: '0 13px 10px', display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {QUICK_REPLIES.map(r => (
                <button
                  key={r}
                  onClick={() => send(r)}
                  style={{
                    padding: '4px 11px', borderRadius: 12,
                    background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.24)',
                    color: '#a78bfa', fontSize: '0.7rem', cursor: 'pointer',
                    fontFamily: 'monospace', transition: 'all 0.18s ease',
                  }}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={e => { e.preventDefault(); send(input) }}
              style={{ padding: '0 11px 11px', display: 'flex', gap: 7 }}
            >
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask me anything..."
                style={{
                  flex: 1, padding: '9px 13px', borderRadius: 10,
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,92,246,0.2)',
                  color: '#f1f5f9', fontSize: '0.8rem', outline: 'none', fontFamily: 'inherit',
                }}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                style={{
                  padding: '9px 15px', borderRadius: 10,
                  background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                  border: 'none', color: 'white', cursor: 'pointer', fontSize: '0.9rem',
                }}
              >
                ↑
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          width: 54, height: 54, borderRadius: '50%',
          background: open ? 'rgba(3,0,20,0.92)' : 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
          border: open ? '1px solid rgba(139,92,246,0.5)' : 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.3rem', cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(139,92,246,0.4)',
          position: 'relative',
        }}
        animate={pulse && !open ? {
          boxShadow: ['0 8px 24px rgba(139,92,246,0.4)', '0 8px 38px rgba(139,92,246,0.7)', '0 8px 24px rgba(139,92,246,0.4)']
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {open ? '✕' : '🤖'}
        {pulse && !open && (
          <motion.div
            style={{ position: 'absolute', inset: -5, borderRadius: '50%', border: '2px solid rgba(139,92,246,0.45)' }}
            animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />
        )}
      </motion.button>
    </div>
  )
}
