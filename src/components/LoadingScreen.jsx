import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const bootSequence = [
  { text: '> ABHIYANK.OS [Version 2.0.26]', color: '#8b5cf6', delay: 0 },
  { text: '> Copyright (c) 2026 Abhiyank Kumar. All rights reserved.', color: '#475569', delay: 200 },
  { text: '', color: '', delay: 350 },
  { text: '> Initializing neural interface...', color: '#e2e8f0', delay: 500 },
  { text: '> Loading React modules................... [OK]', color: '#10b981', delay: 850 },
  { text: '> Loading Three.js 3D engine............. [OK]', color: '#10b981', delay: 1100 },
  { text: '> Mounting AI subsystems................. [OK]', color: '#10b981', delay: 1350 },
  { text: '> Calibrating holographic renderer....... [OK]', color: '#10b981', delay: 1600 },
  { text: '> Establishing quantum connection......... [OK]', color: '#10b981', delay: 1850 },
  { text: '', color: '', delay: 2050 },
  { text: '> Portfolio.exe ————————— READY', color: '#06b6d4', delay: 2200 },
  { text: '', color: '', delay: 2400 },
  { text: '> Welcome, Visitor. Initiating experience...', color: '#f8fafc', delay: 2550 },
]

export default function LoadingScreen({ onComplete }) {
  const [lines, setLines] = useState([])
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const timers = bootSequence.map((line, i) =>
      setTimeout(() => {
        setLines(prev => [...prev, line])
        setProgress(Math.round(((i + 1) / bootSequence.length) * 100))
      }, line.delay)
    )
    const exitT = setTimeout(() => setExiting(true), 3400)
    const doneT = setTimeout(onComplete, 4100)
    return () => { timers.forEach(clearTimeout); clearTimeout(exitT); clearTimeout(doneT) }
  }, [onComplete])

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#030014',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Grid overlay */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />

          {/* Scanline */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            <motion.div
              style={{
                position: 'absolute', left: 0, right: 0, height: 2,
                background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), rgba(6,182,212,0.3), transparent)',
              }}
              animate={{ y: ['-5vh', '105vh'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          <div style={{ maxWidth: 680, width: '100%', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: 'center', marginBottom: '2rem' }}
            >
              <div style={{
                fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
                fontWeight: 800, fontFamily: 'monospace',
                color: '#8b5cf6',
                textShadow: '0 0 20px #8b5cf6, 0 0 50px rgba(139,92,246,0.4)',
                letterSpacing: '0.12em',
              }}>
                ABHIYANK.OS
              </div>
              <div style={{
                color: '#06b6d4', fontFamily: 'monospace',
                fontSize: 'clamp(0.6rem, 1.5vw, 0.78rem)',
                marginTop: '0.3rem', letterSpacing: '0.25em',
                opacity: 0.85,
              }}>
                AI-POWERED DEVELOPER TERMINAL v2.0
              </div>
            </motion.div>

            {/* Terminal window */}
            <div style={{
              background: 'rgba(3,0,20,0.92)',
              border: '1px solid rgba(139,92,246,0.3)',
              borderRadius: 14,
              boxShadow: '0 0 60px rgba(139,92,246,0.12), 0 0 20px rgba(0,0,0,0.5)',
              overflow: 'hidden',
            }}>
              {/* Title bar */}
              <div style={{
                padding: '10px 16px',
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'rgba(0,0,0,0.4)',
                borderBottom: '1px solid rgba(139,92,246,0.15)',
              }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444', opacity: 0.75 }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b', opacity: 0.75 }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981', opacity: 0.75 }} />
                <span style={{ marginLeft: 8, color: '#475569', fontFamily: 'monospace', fontSize: '0.72rem' }}>
                  system@abhiyank:~$ ./boot_portfolio.sh
                </span>
              </div>

              {/* Boot lines */}
              <div style={{ padding: '1.25rem 1.5rem', minHeight: 230, fontFamily: 'monospace', fontSize: 'clamp(0.68rem, 1.4vw, 0.83rem)', lineHeight: 1.75 }}>
                {lines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    style={{ color: line.color || '#e2e8f0', minHeight: line.text === '' ? '0.75em' : 'auto' }}
                  >
                    {line.text}
                  </motion.div>
                ))}
                {lines.length < bootSequence.length && (
                  <span style={{ color: '#8b5cf6', animation: 'blink 1s step-end infinite' }}>█</span>
                )}
              </div>

              {/* Progress bar */}
              <div style={{ padding: '0 1.5rem 1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: '0.7rem', color: '#475569', marginBottom: '0.35rem' }}>
                  <span>Initializing portfolio</span>
                  <span style={{ color: '#8b5cf6' }}>{progress}%</span>
                </div>
                <div style={{ height: 3, background: 'rgba(139,92,246,0.12)', borderRadius: 2, overflow: 'hidden' }}>
                  <motion.div
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)',
                      boxShadow: '0 0 10px rgba(139,92,246,0.6)',
                    }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
