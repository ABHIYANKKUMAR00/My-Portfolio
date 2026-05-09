import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import HoloPhoto from './HoloPhoto'

const roles = ['Full Stack Developer', 'AI Engineer', 'n8n Automation Specialist', 'ChatBot Developer', 'Freelancer']

function TypeWriter({ words }) {
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [text, setText] = useState('')

  useEffect(() => {
    const cur = words[wordIdx]
    const timeout = setTimeout(() => {
      if (!deleting && charIdx < cur.length) {
        setText(cur.slice(0, charIdx + 1)); setCharIdx(c => c + 1)
      } else if (!deleting && charIdx === cur.length) {
        setTimeout(() => setDeleting(true), 1600)
      } else if (deleting && charIdx > 0) {
        setText(cur.slice(0, charIdx - 1)); setCharIdx(c => c - 1)
      } else {
        setDeleting(false); setWordIdx(w => (w + 1) % words.length)
      }
    }, deleting ? 45 : 95)
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx, words])

  return (
    <span>
      {text}
      <span style={{ color: '#06b6d4', animation: 'blink 1s step-end infinite' }}>|</span>
    </span>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.14, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }),
}

export default function Hero() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const orb1Ref = useRef()
  const orb2Ref = useRef()
  const gridRef = useRef()
  const spotRef = useRef()

  useEffect(() => {
    const onMouse = (e) => {
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      if (orb1Ref.current) orb1Ref.current.style.transform = `translate(${x * 32}px, ${y * 22}px)`
      if (orb2Ref.current) orb2Ref.current.style.transform = `translate(${x * -22}px, ${y * -16}px)`
      if (gridRef.current) gridRef.current.style.transform = `translate(${x * 10}px, ${y * 6}px)`
      if (spotRef.current) spotRef.current.style.transform = `translate(${x * 14}px, ${y * 10}px)`
    }
    window.addEventListener('mousemove', onMouse, { passive: true })
    return () => window.removeEventListener('mousemove', onMouse)
  }, [])

  /* ── MOBILE LAYOUT ── */
  if (isMobile) {
    return (
      <div style={{
        minHeight: '75vh', position: 'relative',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '72px 1.25rem 2rem',
        overflowX: 'hidden', textAlign: 'center',
      }}>
        {/* Minimal bg glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(139,92,246,0.10) 0%, transparent 70%)',
        }} />

        {/* Profile image — circular, sharp */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'relative', marginBottom: '1.5rem' }}
        >
          <div style={{
            width: 180, height: 180, borderRadius: '50%',
            overflow: 'hidden',
            border: '2.5px solid rgba(139,92,246,0.55)',
            boxShadow: '0 0 40px rgba(139,92,246,0.35), 0 0 80px rgba(139,92,246,0.12)',
          }}>
            <img
              src="/abhiyank.jpeg"
              alt="Abhiyank Kumar"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 18%', display: 'block' }}
            />
          </div>
          {/* Pulsing ring */}
          <div style={{
            position: 'absolute', inset: -10, borderRadius: '50%',
            border: '1px solid rgba(139,92,246,0.28)',
            animation: 'sp-holo-pulse 3s ease-in-out infinite',
            pointerEvents: 'none',
          }} />
          {/* Online dot */}
          <div style={{
            position: 'absolute', bottom: 10, right: 10,
            width: 14, height: 14, borderRadius: '50%',
            background: '#10b981', boxShadow: '0 0 8px #10b981',
            border: '2px solid #030014',
          }} />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#8b5cf6', marginBottom: '0.6rem' }}
        >
          Available for opportunities
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.7 }}
          style={{ fontSize: 'clamp(1.9rem, 8vw, 2.6rem)', fontWeight: 800, lineHeight: 1.1, margin: '0 0 0.5rem' }}
        >
          Hi, I'm{' '}
          <span style={{ color: '#8b5cf6', textShadow: '0 0 30px rgba(139,92,246,0.6)' }}>
            Abhiyank
          </span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ fontSize: 'clamp(0.9rem, 4vw, 1.1rem)', fontWeight: 600, color: '#94a3b8', marginBottom: '1.4rem', minHeight: '1.6rem' }}
        >
          <span style={{ color: '#06b6d4' }}>I am </span>
          <TypeWriter words={roles} />
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.a
            href="/AbhiyankKumar_Resume.pdf"
            target="_blank" rel="noopener noreferrer"
            whileTap={{ scale: 0.96 }}
            style={{
              padding: '11px 24px', borderRadius: 10,
              background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
              color: 'white', fontWeight: 700, fontSize: '0.88rem',
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
            }}
          >
            View Resume ↗
          </motion.a>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '11px 24px', borderRadius: 10,
              background: 'rgba(139,92,246,0.08)',
              border: '1px solid rgba(139,92,246,0.4)',
              color: '#a78bfa', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer',
            }}
          >
            Contact Me
          </motion.button>
        </motion.div>

        {/* Mini stats */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'center' }}
        >
          {[{ num: '2+', label: 'AI Projects' }, { num: '10+', label: 'Tech' }, { num: 'B.Tech', label: 'CS' }].map(s => (
            <div key={s.label} style={{
              padding: '0.5rem 0.85rem', borderRadius: 10,
              background: 'rgba(139,92,246,0.06)',
              border: '1px solid rgba(139,92,246,0.14)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#8b5cf6', lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: '0.62rem', color: '#64748b', marginTop: '0.2rem', fontFamily: 'monospace' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    )
  }

  /* ── DESKTOP LAYOUT (unchanged) ── */
  return (
    <div style={{
      minHeight: '100vh', position: 'relative',
      display: 'flex', alignItems: 'center',
      padding: 'clamp(80px, 12vw, 120px) 1.5rem clamp(60px, 8vw, 80px)',
      overflow: 'hidden',
    }}>
      <div ref={gridRef} className="sp-grid-wrapper"><div className="sp-grid" /></div>

      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div ref={orb1Ref} style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 72% 82% at 74% 50%, rgba(139,92,246,0.13) 0%, transparent 65%)',
        transition: 'transform 0.35s ease-out', willChange: 'transform',
      }} />
      <div ref={orb2Ref} style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 52% 62% at 20% 60%, rgba(6,182,212,0.07) 0%, transparent 60%)',
        transition: 'transform 0.35s ease-out', willChange: 'transform',
      }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(139,92,246,0.012) 3px, rgba(139,92,246,0.012) 4px)',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}
        className="grid grid-cols-2 gap-12 lg:gap-16 items-center"
      >
        {/* Left: text */}
        <div>
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible"
            style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: '#8b5cf6', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981', display: 'inline-block', flexShrink: 0 }} />
            Available for opportunities
          </motion.div>

          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
            style={{ fontSize: 'clamp(2rem, 5.5vw, 4rem)', fontWeight: 800, lineHeight: 1.08, margin: '0 0 0.65rem' }}
          >
            Hi, I'm{' '}
            <span style={{ color: '#8b5cf6', textShadow: '0 0 40px rgba(139,92,246,0.55), 0 0 80px rgba(139,92,246,0.2)' }}>
              Abhiyank
            </span>
          </motion.h1>

          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible"
            style={{ fontSize: 'clamp(1.1rem, 2.8vw, 1.7rem)', fontWeight: 600, color: '#94a3b8', marginBottom: '1.5rem', minHeight: '2.4rem' }}
          >
            <span style={{ color: '#06b6d4' }}>I am </span>
            <TypeWriter words={roles} />
          </motion.div>

          <motion.p custom={3} variants={fadeUp} initial="hidden" animate="visible"
            style={{ color: '#64748b', lineHeight: 1.85, maxWidth: 490, fontSize: '0.97rem', margin: '0 0 2rem' }}
          >
            Final-year CS student from Greater Noida, India. I architect AI-powered web experiences
            using React, LangChain, and modern cloud stacks. Passionate about RAG systems, vector
            databases, and production-grade full-stack applications.
          </motion.p>

          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible"
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <motion.a
              href="/AbhiyankKumar_Resume.pdf" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.03, boxShadow: '0 0 36px rgba(139,92,246,0.55)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '12px 28px', borderRadius: 9,
                background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                border: 'none', color: 'white', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              }}
            >
              View Resume ↗
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 24px rgba(139,92,246,0.32)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: '12px 28px', borderRadius: 9,
                background: 'rgba(139,92,246,0.07)',
                border: '1px solid rgba(139,92,246,0.35)',
                color: '#a78bfa', fontWeight: 700, fontSize: '0.9rem',
                cursor: 'pointer', transition: 'all 0.2s ease',
              }}
            >
              Contact Me
            </motion.button>
          </motion.div>

          <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible"
            style={{ display: 'flex', gap: '1rem', marginTop: '2.8rem', flexWrap: 'wrap' }}
          >
            {[{ num: '2+', label: 'AI Projects' }, { num: '10+', label: 'Technologies' }, { num: 'B.Tech', label: 'CS Final Year' }].map(s => (
              <div key={s.label} className="glass-stat">
                <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#8b5cf6', textShadow: '0 0 18px rgba(139,92,246,0.4)', lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.3rem', fontFamily: 'monospace', letterSpacing: '0.05em' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: HoloPhoto */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}
        >
          <div ref={spotRef} style={{
            position: 'absolute', inset: -80, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(139,92,246,0.28) 0%, rgba(6,182,212,0.12) 40%, transparent 68%)',
            transition: 'transform 0.4s ease-out', willChange: 'transform',
          }} />
          <div style={{
            position: 'absolute', width: 560, height: 560, borderRadius: '50%',
            background: 'transparent', border: '1px solid rgba(139,92,246,0.1)',
            boxShadow: '0 0 60px rgba(139,92,246,0.1), inset 0 0 60px rgba(139,92,246,0.05)',
            animation: 'sp-holo-pulse 4s ease-in-out infinite', pointerEvents: 'none',
          }} />
          <HoloPhoto size={520} />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          color: '#334155', fontFamily: 'monospace', fontSize: '0.65rem', letterSpacing: '0.12em',
        }}
      >
        <span>SCROLL</span>
        <div style={{ width: 1, height: 38, background: 'linear-gradient(180deg, #8b5cf6, transparent)' }} />
      </motion.div>
    </div>
  )
}
