import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
)

export default function ProjectModal() {
  const [project, setProject] = useState(null)

  useEffect(() => {
    const onSelect = (e) => setProject(e.detail)
    window.addEventListener('projectSelect', onSelect)
    return () => window.removeEventListener('projectSelect', onSelect)
  }, [])

  const close = () => setProject(null)

  // Close on Escape
  useEffect(() => {
    if (!project) return
    const onKey = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [project])

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={close}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(3, 0, 20, 0.72)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ type: 'spring', damping: 22, stiffness: 320 }}
            style={{
              position: 'fixed',
              top: '50%', left: '50%',
              x: '-50%', y: '-50%',
              zIndex: 201,
              width: 'min(92vw, 480px)',
              background: 'rgba(8, 5, 28, 0.94)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              border: `1px solid ${project.color}45`,
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: `0 0 70px ${project.color}22, 0 0 0 1px ${project.color}18`,
            }}
          >
            {/* Top accent bar */}
            <div style={{
              height: 3,
              background: `linear-gradient(90deg, ${project.color}, ${project.ringColor})`,
            }} />

            <div style={{ padding: '1.75rem' }}>
              {/* Header row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', gap: '0.75rem' }}>
                <div style={{ minWidth: 0 }}>
                  <h2 style={{
                    color: '#f8fafc', fontSize: 'clamp(1.1rem, 4vw, 1.35rem)',
                    fontWeight: 700, marginBottom: '0.3rem', lineHeight: 1.3,
                  }}>
                    {project.title}
                  </h2>
                  <p style={{ color: project.color, fontSize: '0.8rem', fontWeight: 500 }}>
                    {project.subtitle}
                  </p>
                </div>

                {/* Close button */}
                <button
                  onClick={close}
                  style={{
                    flexShrink: 0, width: 32, height: 32,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 8, cursor: 'pointer',
                    color: '#64748b', fontSize: '0.9rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'color 0.15s, background 0.15s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#f8fafc'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#64748b'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Description */}
              <p style={{
                color: '#94a3b8', fontSize: '0.875rem',
                lineHeight: 1.75, marginBottom: '1.25rem',
              }}>
                {project.description}
              </p>

              {/* Tech stack */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                {project.tech.map(t => (
                  <span key={t} style={{
                    padding: '0.25rem 0.65rem', borderRadius: 6, fontSize: '0.75rem',
                    background: `${project.color}14`, color: project.color,
                    border: `1px solid ${project.color}30`, fontWeight: 500,
                  }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* GitHub link */}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.6rem 1.4rem', borderRadius: 10,
                  background: `${project.color}18`, color: project.color,
                  border: `1px solid ${project.color}40`, fontSize: '0.875rem',
                  textDecoration: 'none', fontWeight: 600,
                  transition: 'background 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = `${project.color}2e`
                  e.currentTarget.style.boxShadow = `0 0 20px ${project.color}30`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = `${project.color}18`
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <GitHubIcon />
                View on GitHub
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
