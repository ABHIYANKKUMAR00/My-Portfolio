import { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion'

/* ── Project data ── */
const projects = [
  {
    id: 'chatbot',
    icon: '🧠',
    title: 'AI Medical Chatbot',
    subtitle: 'RAG-Powered Intelligent Assistant',
    description: 'AI-powered medical chatbot using Retrieval-Augmented Generation (RAG) to answer domain-specific queries from medical documents with context-aware accuracy. Integrated Pinecone vector database with open-source LLMs via Hugging Face and LangChain for semantic search and response generation. Deployed a Flask-based UI achieving ~85% relevance accuracy on test queries.',
    tech: ['Python', 'LangChain', 'HuggingFace', 'Pinecone', 'RAG', 'Flask', 'LLM'],
    tags: ['AI', 'RAG', 'NLP'],
    colors: { primary: '#8b5cf6', secondary: '#06b6d4' },
    github: 'https://github.com/ABHIYANKKUMAR00?tab=repositories',
  },
  {
    id: 'clinic',
    icon: '🏥',
    title: 'City Clinic Automation',
    subtitle: 'AI Appointment Booking System',
    description: 'Clinic website with an integrated AI chatbot that automates patient appointment bookings. Uses Groq\'s Llama 3.3-70B to collect patient details conversationally, then triggers n8n webhooks — zero backend, pure HTML/CSS/JS frontend.',
    tech: ['Groq API', 'Llama 3.3', 'n8n', 'HTML5', 'CSS3', 'JavaScript', 'Webhooks'],
    tags: ['AI', 'Automation', 'n8n'],
    colors: { primary: '#10b981', secondary: '#06b6d4' },
    github: 'https://github.com/ABHIYANKKUMAR00/clinic-automation-system',
  },
  {
    id: 'assistant',
    icon: '🤖',
    title: 'Personal Assistant',
    subtitle: 'n8n + Streamlit Productivity Hub',
    description: 'AI-powered personal assistant connecting Groq\'s Llama 3.3 with n8n workflows. Manages Gmail, Google Calendar, Tasks, Docs, and Sheets through natural language commands via a Streamlit interface.',
    tech: ['Python', 'Streamlit', 'n8n', 'Groq API', 'Llama 3.3', 'Google APIs', 'OAuth2'],
    tags: ['AI', 'Automation', 'Productivity'],
    colors: { primary: '#f59e0b', secondary: '#ef4444' },
    github: 'https://github.com/ABHIYANKKUMAR00/Personal-Assistant-n8n',
  },
  {
    id: 'myntra',
    icon: '🛍️',
    title: 'Myntra Clone',
    subtitle: 'Full-Stack E-Commerce Platform',
    description: 'Fully responsive e-commerce frontend replicating Myntra\'s UI with product listings, filters, product detail pages, and cart functionality. Implemented state management using Redux Toolkit; app handled 200+ product cards with smooth rendering and sub-2s load time. Designed reusable React components following modular architecture.',
    tech: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Redux', 'Redux Toolkit'],
    tags: ['Frontend', 'Redux', 'E-Commerce'],
    colors: { primary: '#f97316', secondary: '#ec4899' },
    github: 'https://github.com/ABHIYANKKUMAR00?tab=repositories',
  },
]

/* ── Holographic 3D card ── */
function HoloCard({ project, index, inView, onClick }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-0.5, 0.5], [14, -14])
  const rotateY = useTransform(x, [-0.5, 0.5], [-14, 14])
  const rx = useSpring(rotateX, { stiffness: 280, damping: 26 })
  const ry = useSpring(rotateY, { stiffness: 280, damping: 26 })

  // Sheen moves opposite to tilt — creates specular depth
  const sheenX = useTransform(x, [-0.5, 0.5], ['120%', '-20%'])
  const sheenY = useTransform(y, [-0.5, 0.5], ['120%', '-20%'])

  // Shadow follows tilt
  const shadowX = useTransform(ry, v => `${v * 1.8}px`)
  const shadowY = useTransform(rx, v => `${v * -1.8}px`)

  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - r.left) / r.width - 0.5)
        y.set((e.clientY - r.top) / r.height - 0.5)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ perspective: 700 }}
    >
      <motion.div
        style={{
          rotateX: rx, rotateY: ry,
          transformStyle: 'preserve-3d',
          borderRadius: 16,
          background: 'rgba(10,10,26,0.88)',
          border: `1px solid ${project.colors.primary}30`,
          position: 'relative', overflow: 'hidden',
          boxShadow: `0 16px 48px rgba(0,0,0,0.5), 0 0 0 0.5px ${project.colors.primary}20`,
        }}
        whileHover={{
          borderColor: `${project.colors.primary}60`,
          boxShadow: `0 28px 70px rgba(0,0,0,0.6), 0 0 40px ${project.colors.primary}22, 0 0 0 1px ${project.colors.primary}30`,
        }}
        transition={{ duration: 0.25 }}
      >
        {/* Specular sheen */}
        <motion.div
          style={{
            position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none', borderRadius: 'inherit',
            background: `radial-gradient(circle at ${sheenX} ${sheenY}, rgba(255,255,255,0.065), transparent 55%)`,
          }}
        />

        {/* Top accent line */}
        <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${project.colors.primary}, ${project.colors.secondary}, transparent)` }} />

        {/* Header zone */}
        <div style={{
          padding: '1.1rem 1.2rem 0.9rem',
          background: `linear-gradient(135deg, ${project.colors.primary}14 0%, ${project.colors.secondary}08 60%, transparent 100%)`,
          borderBottom: `1px solid ${project.colors.primary}12`,
          display: 'flex', alignItems: 'center', gap: '0.85rem',
        }}>
          {/* Icon bubble */}
          <motion.div
            animate={{ boxShadow: [`0 0 10px ${project.colors.primary}30`, `0 0 22px ${project.colors.primary}60`, `0 0 10px ${project.colors.primary}30`] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
            style={{
              width: 48, height: 48, borderRadius: 12, flexShrink: 0,
              background: `linear-gradient(135deg, ${project.colors.primary}22, ${project.colors.secondary}14)`,
              border: `1px solid ${project.colors.primary}35`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem',
            }}
          >
            {project.icon}
          </motion.div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f1f5f9', margin: 0, lineHeight: 1.25 }}>
              {project.title}
            </h3>
            <div style={{
              fontSize: '0.68rem', color: project.colors.primary,
              marginTop: '0.2rem', opacity: 0.85,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {project.subtitle}
            </div>
          </div>

          {/* GitHub icon */}
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            whileHover={{ scale: 1.18, y: -2 }}
            whileTap={{ scale: 0.9 }}
            title="GitHub"
            style={{
              width: 32, height: 32, borderRadius: 8, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.09)',
              fontSize: '0.9rem', textDecoration: 'none',
              transition: 'border-color 0.2s',
            }}
          >🐙</motion.a>
        </div>

        {/* Body */}
        <div style={{ padding: '0.85rem 1.2rem 1.1rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          {/* Tags */}
          <div style={{ display: 'flex', gap: '0.28rem', flexWrap: 'wrap' }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                padding: '2px 8px', borderRadius: 4,
                background: `${project.colors.primary}16`,
                border: `1px solid ${project.colors.primary}35`,
                color: project.colors.primary,
                fontSize: '0.58rem', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.04em',
              }}>{tag}</span>
            ))}
          </div>

          {/* Mini tech strip */}
          <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
            {project.tech.slice(0, 4).map(t => (
              <span key={t} style={{
                padding: '2px 7px', borderRadius: 6,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#64748b', fontSize: '0.58rem', fontFamily: 'monospace',
              }}>{t}</span>
            ))}
            {project.tech.length > 4 && (
              <span style={{ padding: '2px 7px', borderRadius: 6, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#475569', fontSize: '0.58rem', fontFamily: 'monospace' }}>
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          {/* Details button */}
          <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            style={{
              width: '100%', padding: '8px 12px',
              background: `linear-gradient(135deg, ${project.colors.primary}20, ${project.colors.secondary}14)`,
              border: `1px solid ${project.colors.primary}38`,
              borderRadius: 8, color: '#e2e8f0',
              fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
              letterSpacing: '0.02em',
            }}
          >
            <span style={{ color: project.colors.primary }}>⚡</span>
            View Details
            <span style={{ marginLeft: 'auto', color: project.colors.primary, opacity: 0.7, fontSize: '0.7rem' }}>↗</span>
          </motion.button>
        </div>

        {/* Bottom glow strip */}
        <div style={{
          position: 'absolute', bottom: 0, left: '10%', right: '10%', height: 1,
          background: `linear-gradient(90deg, transparent, ${project.colors.primary}50, transparent)`,
          pointerEvents: 'none',
        }} />
      </motion.div>
    </motion.div>
  )
}

/* ── Detail modal ── */
function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 32 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 32 }}
        transition={{ type: 'spring', damping: 24, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: 540, width: '100%', maxHeight: '88vh', overflowY: 'auto',
          background: 'rgba(8,8,22,0.97)',
          border: `1px solid ${project.colors.primary}35`,
          borderRadius: 20,
          boxShadow: `0 40px 100px rgba(0,0,0,0.75), 0 0 70px ${project.colors.primary}18`,
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Top gradient bar */}
        <div style={{ height: 3, background: `linear-gradient(90deg, ${project.colors.primary}, ${project.colors.secondary})` }} />

        {/* Ambient glow */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 180, pointerEvents: 'none',
          background: `radial-gradient(ellipse at 50% 0%, ${project.colors.primary}14, transparent 70%)`,
        }} />

        <div style={{ padding: '1.8rem', position: 'relative' }}>
          {/* Header */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.3rem' }}>
            <div style={{
              width: 54, height: 54, borderRadius: 14, flexShrink: 0,
              background: `linear-gradient(135deg, ${project.colors.primary}22, ${project.colors.secondary}14)`,
              border: `1px solid ${project.colors.primary}40`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.7rem',
            }}>
              {project.icon}
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f1f5f9', margin: '0 0 0.28rem', lineHeight: 1.2 }}>
                {project.title}
              </h3>
              <div style={{ fontSize: '0.75rem', color: project.colors.primary, fontStyle: 'italic' }}>
                {project.subtitle}
              </div>
            </div>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.92 }}
              style={{
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.04)', color: '#94a3b8',
                cursor: 'pointer', fontSize: '1rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >×</motion.button>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginBottom: '1.1rem' }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                padding: '3px 10px', borderRadius: 5,
                background: `${project.colors.primary}18`, border: `1px solid ${project.colors.primary}42`,
                color: project.colors.primary, fontSize: '0.62rem', fontFamily: 'monospace', fontWeight: 700,
              }}>{tag}</span>
            ))}
          </div>

          {/* Description */}
          <p style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: 1.85, margin: '0 0 1.4rem' }}>
            {project.description}
          </p>

          {/* Tech stack */}
          <div style={{ marginBottom: '1.6rem' }}>
            <div style={{ fontFamily: 'monospace', fontSize: '0.58rem', color: '#334155', marginBottom: '0.6rem', letterSpacing: '0.12em' }}>
              TECH STACK
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.38rem' }}>
              {project.tech.map(t => (
                <span key={t} style={{
                  padding: '4px 11px', borderRadius: 10,
                  background: `${project.colors.primary}0e`, border: `1px solid ${project.colors.primary}26`,
                  color: '#cbd5e1', fontSize: '0.7rem', fontFamily: 'monospace',
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, boxShadow: `0 0 32px ${project.colors.primary}55` }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              width: '100%', padding: '13px',
              background: `linear-gradient(135deg, ${project.colors.primary}, ${project.colors.secondary})`,
              border: 'none', borderRadius: 10, color: 'white',
              fontWeight: 700, fontSize: '0.87rem', textDecoration: 'none',
              letterSpacing: '0.02em',
            }}
          >
            🐙 View on GitHub →
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [selected, setSelected] = useState(null)

  return (
    <div ref={ref} style={{ padding: 'clamp(4rem, 8vw, 7rem) 1.5rem', position: 'relative' }}>
      {/* Ambient blobs */}
      <div style={{ position: 'absolute', top: '20%', left: '5%', width: '40%', height: '50%', pointerEvents: 'none', background: 'radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '40%', height: '40%', pointerEvents: 'none', background: 'radial-gradient(ellipse, rgba(6,182,212,0.05) 0%, transparent 70%)' }} />

      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '3rem', textAlign: 'center' }}
        >
          <div style={{ fontFamily: 'monospace', color: '#8b5cf6', fontSize: '0.82rem', marginBottom: '0.4rem' }}>
            // 03. projects
          </div>
          <h2 className="section-title" style={{ margin: '0 0 0.85rem' }}>
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p style={{ color: '#64748b', maxWidth: 460, margin: '0 auto', lineHeight: 1.75, fontSize: '0.92rem' }}>
            Production-grade apps combining AI intelligence with elegant engineering
          </p>
        </motion.div>

        {/* 2×2 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: '1.1rem' }}>
          {projects.map((project, i) => (
            <HoloCard
              key={project.id}
              project={project}
              index={i}
              inView={inView}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}
