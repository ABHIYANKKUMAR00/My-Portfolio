import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const roles = [
  'Full Stack Developer',
  'AI Engineer',
  'n8n Automation Specialist',
  'ChatBot Developer',
  'Freelancer',
]

function TypeWriter() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    if (!deleting && displayed.length < current.length) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
      return () => clearTimeout(t)
    }
    if (!deleting && displayed.length === current.length) {
      const t = setTimeout(() => setDeleting(true), 2000)
      return () => clearTimeout(t)
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45)
      return () => clearTimeout(t)
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIndex((i) => (i + 1) % roles.length)
    }
  }, [displayed, deleting, roleIndex])

  return (
    <span style={{ color: '#00f5ff' }}>
      {displayed}
      <span style={{
        display: 'inline-block', width: 2, height: '1em', background: '#00f5ff',
        marginLeft: 2, verticalAlign: 'middle',
        animation: 'blink 1s step-end infinite',
      }} />
    </span>
  )
}

export default function HeroSection() {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh',
      pointerEvents: 'none', overflow: 'hidden',
    }}>

      {/* Profile photo — tracks 3D orbit center (x = -2 world units ≈ 36% screen left) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          top: '50%', left: '36%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <motion.div
          animate={{
            boxShadow: [
              '0 0 0 3px rgba(0,245,255,0.28), 0 0 28px rgba(0,245,255,0.16), 0 0 65px rgba(138,43,226,0.12)',
              '0 0 0 4px rgba(0,245,255,0.52), 0 0 52px rgba(0,245,255,0.30), 0 0 90px rgba(138,43,226,0.24)',
              '0 0 0 3px rgba(0,245,255,0.28), 0 0 28px rgba(0,245,255,0.16), 0 0 65px rgba(138,43,226,0.12)',
            ],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ borderRadius: '50%', display: 'block' }}
        >
          <img
            src="/abhiyank.jpeg"
            alt="Abhiyank Kumar"
            style={{
              width: 220,
              height: 220,
              objectFit: 'cover',
              objectPosition: '50% 18%',
              borderRadius: '50%',
              display: 'block',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Text block — right side, clear of orbits which extend to ~60% on 16:9 */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '62%',
        width: '34vw',
        transform: 'translateY(-50%)',
        pointerEvents: 'auto',
      }}>
        <motion.h1
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{
            fontSize: 'clamp(1.5rem, 3.2vw, 3rem)', fontWeight: 800,
            lineHeight: 1.1, marginBottom: '0.4rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #c4b5fd 40%, #00f5ff 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}
        >
          Hi, I'm Abhiyank
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          style={{
            fontSize: 'clamp(0.78rem, 1.5vw, 1rem)', fontWeight: 600,
            color: '#8b5cf6', marginBottom: '0.6rem', letterSpacing: '0.01em',
          }}
        >
          I build AI-powered web experiences
        </motion.p>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          style={{
            fontSize: 'clamp(0.78rem, 1.6vw, 1.05rem)', color: '#94a3b8',
            marginBottom: '1.5rem', minHeight: '1.5em',
          }}
        >
          <TypeWriter />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2rem', justifyContent: 'flex-start' }}
        >
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('navTo', { detail: 3 }))}
            style={{
              padding: '0.55rem 1.3rem', borderRadius: 8,
              background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
              border: 'none', color: '#fff', fontWeight: 700,
              fontSize: 'clamp(0.75rem, 1.4vw, 0.9rem)',
              cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 0 20px rgba(139,92,246,0.4)',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            View Projects
          </button>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('navTo', { detail: 4 }))}
            style={{
              padding: '0.55rem 1.3rem', borderRadius: 8,
              background: 'transparent',
              border: '1.5px solid #00f5ff', color: '#00f5ff', fontWeight: 700,
              fontSize: 'clamp(0.75rem, 1.4vw, 0.9rem)',
              cursor: 'pointer', transition: 'all 0.2s',
              boxShadow: '0 0 12px rgba(0,245,255,0.2)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,245,255,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Contact Me
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}
        >
          {[
            { value: '2+', label: 'AI Projects' },
            { value: '10+', label: 'Technologies' },
            { value: 'B.Tech', label: 'CS Final Year' },
          ].map(({ value, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 800, color: '#8b5cf6' }}>{value}</div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          color: '#475569', fontSize: '0.75rem', letterSpacing: '0.15em',
          textTransform: 'uppercase', pointerEvents: 'none',
        }}
      >
        <span>Scroll to explore</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect x="6.5" y="0" width="3" height="3" rx="1.5" fill="#00f5ff" style={{ animation: 'float-up 2s ease-in-out infinite' }} />
          <rect x="0" y="0" width="16" height="24" rx="8" stroke="#475569" strokeWidth="1.5" fill="none" />
        </svg>
      </motion.div>
    </div>
  )
}
