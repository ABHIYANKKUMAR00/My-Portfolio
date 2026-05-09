import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const sections = ['Home', 'About', 'Skills', 'Projects', 'Contact']
const sectionIds = ['home', 'about', 'skills', 'projects', 'contact']
const sectionColors = ['#00f5ff', '#8b5cf6', '#00ff88', '#8b5cf6', '#00ff88']

function scrollToSection(idx) {
  document.getElementById(sectionIds[idx])?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navigation() {
  const [active, setActive] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = sectionIds.indexOf(entry.target.id)
            if (idx >= 0) {
              setActive(idx)
              window.dispatchEvent(new CustomEvent('sectionChange', { detail: { section: idx } }))
            }
          }
        })
      },
      { threshold: 0.35, rootMargin: '-60px 0px -40% 0px' }
    )

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })

    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const color = sectionColors[active]

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: isMobile ? '0.5rem 1.25rem' : scrolled ? '0.6rem 1.5rem' : '1rem 1.5rem',
          background: scrolled ? 'rgba(3,0,20,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(139,92,246,0.12)' : 'none',
          transition: 'all 0.35s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <motion.button
          onClick={() => scrollToSection(0)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '1.3rem', fontWeight: 800, fontFamily: 'monospace',
            color: '#f8fafc', textShadow: `0 0 15px ${color}44`,
          }}
        >
          <span style={{ color: '#8b5cf6' }}>&lt;</span>
          AK
          <span style={{ color: '#8b5cf6' }}>/&gt;</span>
        </motion.button>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
            {sections.map((sec, i) => (
              <button
                key={sec}
                onClick={() => scrollToSection(i)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '0.45rem 0.9rem', borderRadius: 8,
                  color: active === i ? sectionColors[i] : '#64748b',
                  fontFamily: 'monospace', fontSize: '0.84rem',
                  fontWeight: active === i ? 700 : 400,
                  textShadow: active === i ? `0 0 8px ${sectionColors[i]}` : 'none',
                  transition: 'all 0.25s', position: 'relative',
                }}
              >
                {sec}
                {active === i && (
                  <motion.div
                    layoutId="navUnderline"
                    style={{
                      position: 'absolute', bottom: 2, left: '20%',
                      width: '60%', height: 1.5, borderRadius: 2,
                      background: sectionColors[i],
                      boxShadow: `0 0 6px ${sectionColors[i]}`,
                    }}
                  />
                )}
              </button>
            ))}

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(139,92,246,0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection(4)}
              style={{
                marginLeft: '0.5rem', padding: '0.45rem 1.1rem', borderRadius: 8,
                background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                border: 'none', color: '#fff', fontFamily: 'monospace',
                fontSize: '0.84rem', fontWeight: 700, cursor: 'pointer',
                boxShadow: '0 0 16px rgba(139,92,246,0.3)',
              }}
            >
              Hire Me
            </motion.button>
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6 }}
          >
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: 22, height: 2, background: '#94a3b8', borderRadius: 2,
                marginBottom: i < 2 ? 5 : 0, transition: 'all 0.3s',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(5px, 7px)'
                    : i === 2 ? 'rotate(-45deg) translate(5px, -7px)' : 'scaleX(0)'
                  : 'none',
              }} />
            ))}
          </button>
        )}
      </motion.nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            style={{
              position: 'fixed', top: 56, left: 0, right: 0, zIndex: 99,
              background: 'rgba(3,0,20,0.97)', backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(139,92,246,0.15)',
              padding: '0.5rem 1.5rem 1rem',
            }}
          >
            {sections.map((sec, i) => (
              <button
                key={sec}
                onClick={() => { scrollToSection(i); setMenuOpen(false) }}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  background: active === i ? 'rgba(139,92,246,0.08)' : 'none',
                  border: 'none', borderRadius: 8, cursor: 'pointer',
                  fontFamily: 'monospace', fontSize: '0.95rem',
                  padding: '0.75rem 0.75rem',
                  color: active === i ? sectionColors[i] : '#94a3b8',
                  marginBottom: '0.25rem',
                }}
              >
                {sec}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section dot indicator — hidden on mobile */}
      <div style={{
        position: 'fixed', right: '1.25rem', top: '50%', transform: 'translateY(-50%)',
        zIndex: 90, display: isMobile ? 'none' : 'flex', flexDirection: 'column', gap: '0.65rem',
      }}>
        {sections.map((sec, i) => (
          <button
            key={sec}
            onClick={() => scrollToSection(i)}
            title={sec}
            style={{
              width: active === i ? 10 : 6, height: active === i ? 10 : 6,
              borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0,
              background: active === i ? sectionColors[i] : 'rgba(100,116,139,0.35)',
              boxShadow: active === i ? `0 0 10px ${sectionColors[i]}` : 'none',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </>
  )
}
