import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useActiveSection } from '../../hooks/useActiveSection'

const TERMINAL_LINES = [
  { text: 'ABHIYANK.OS v2.0 — CONTACT TERMINAL', color: '#00f5ff', delay: 0 },
  { text: '> Initializing secure channel...', color: '#64748b', delay: 300 },
  { text: '[OK] Channel established', color: '#00ff88', delay: 700 },
  { text: '> Loading contact endpoints...', color: '#64748b', delay: 1100 },
  { text: 'email    :: abhiyankhatana@gmail.com', color: '#f8fafc', delay: 1500 },
  { text: 'phone    :: +91 9627679373', color: '#f8fafc', delay: 1800 },
  { text: 'github   :: github.com/abhiyankgujjar00', color: '#f8fafc', delay: 2100 },
  { text: 'linkedin :: linkedin.com/in/abhiyank-kumar00', color: '#f8fafc', delay: 2400 },
  { text: '> Ready to receive messages.', color: '#00ff88', delay: 2800 },
]

function TerminalLine({ text, color, delay }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])
  if (!visible) return null
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
      style={{ color, fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}
    >
      {text}
    </motion.div>
  )
}

export default function ContactSection() {
  const visited = useActiveSection(4)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    await new Promise(r => setTimeout(r, 1100 + Math.random() * 400))
    setStatus('success')
  }

  return (
    <div style={{
      position: 'absolute', top: '400vh', left: 0, width: '100vw', height: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      pointerEvents: 'none',
    }}>
      {/* Section label */}
      <div style={{
        position: 'absolute', top: '3rem', left: '50%', transform: 'translateX(-50%)',
        textAlign: 'center',
      }}>
        <div style={{ color: '#00ff88', fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          &gt; Section 05
        </div>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800,
          background: 'linear-gradient(135deg, #00ff88, #00f5ff)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Cyber Terminal · Contact
        </h2>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem', maxWidth: 900, width: '100%', padding: '0 1.5rem',
        marginTop: '3rem', pointerEvents: 'auto',
      }}>
        {/* Terminal info panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: visited ? 1 : 0, x: visited ? 0 : -30 }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'rgba(2,8,4,0.92)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0,255,136,0.25)', borderRadius: 12, overflow: 'hidden',
            fontFamily: 'monospace',
          }}
        >
          {/* Title bar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.6rem 1rem', background: 'rgba(0,255,136,0.06)',
            borderBottom: '1px solid rgba(0,255,136,0.12)',
          }}>
            {['#ff5f56', '#ffbd2e', '#27c93f'].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))}
            <span style={{ color: '#00ff88', fontSize: '0.72rem', marginLeft: '0.5rem' }}>
              abhiyank@portfolio ~ contact
            </span>
          </div>

          <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0' }}>
            {TERMINAL_LINES.map((line, i) => <TerminalLine key={i} {...line} />)}

            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{ display: 'inline-block', width: 8, height: '1em', background: '#00ff88', marginTop: '0.25rem' }}
            />
          </div>

          {/* Social links */}
          <div style={{
            display: 'flex', gap: '0.75rem', padding: '0 1.25rem 1.25rem',
            flexWrap: 'wrap',
          }}>
            {[
              { label: 'GitHub', href: 'https://github.com/abhiyankgujjar00', color: '#94a3b8' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abhiyank-kumar00', color: '#0ea5e9' },
              { label: 'Email', href: 'mailto:abhiyankhatana@gmail.com', color: '#00ff88' },
              { label: '+91 9627679373', href: 'tel:+919627679373', color: '#f59e0b' },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '0.4rem 1rem', borderRadius: 6, fontSize: '0.78rem',
                  background: 'rgba(255,255,255,0.04)', color: link.color,
                  border: `1px solid ${link.color}30`, textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = `${link.color}15`}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: visited ? 1 : 0, x: visited ? 0 : -30 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            background: 'rgba(2,8,4,0.88)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0,255,136,0.2)', borderRadius: 12, padding: '1.5rem',
          }}
        >
          <div style={{ color: '#00ff88', fontFamily: 'monospace', fontSize: '0.78rem', marginBottom: '1.25rem' }}>
            &gt; user@portfolio: send-message
          </div>

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '2rem 1rem' }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
                <div style={{ color: '#00ff88', fontFamily: 'monospace', marginBottom: '0.5rem' }}>
                  [OK] Message transmitted
                </div>
                <div style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                  I'll get back to you soon!
                </div>
                <button
                  onClick={() => { setStatus('idle'); setForm({ name: '', email: '', message: '' }) }}
                  style={{
                    padding: '0.5rem 1.25rem', background: 'rgba(0,255,136,0.1)',
                    border: '1px solid rgba(0,255,136,0.3)', borderRadius: 6,
                    color: '#00ff88', fontFamily: 'monospace', fontSize: '0.82rem', cursor: 'pointer',
                  }}
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}
              >
                {['name', 'email'].map(field => (
                  <div key={field}>
                    <div style={{ color: '#475569', fontFamily: 'monospace', fontSize: '0.72rem', marginBottom: '0.3rem' }}>
                      &gt; {field}:
                    </div>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      value={form[field]}
                      onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                      required
                      placeholder={`Enter ${field}...`}
                      style={{
                        width: '100%', padding: '0.6rem 0.9rem',
                        background: 'rgba(0,255,136,0.04)',
                        border: '1px solid rgba(0,255,136,0.18)',
                        borderRadius: 6, color: '#f8fafc', fontSize: '0.88rem',
                        fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={e => e.target.style.borderColor = '#00ff88'}
                      onBlur={e => e.target.style.borderColor = 'rgba(0,255,136,0.18)'}
                    />
                  </div>
                ))}
                <div>
                  <div style={{ color: '#475569', fontFamily: 'monospace', fontSize: '0.72rem', marginBottom: '0.3rem' }}>
                    &gt; message:
                  </div>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    required
                    rows={4}
                    placeholder="Type your message..."
                    style={{
                      width: '100%', padding: '0.6rem 0.9rem',
                      background: 'rgba(0,255,136,0.04)',
                      border: '1px solid rgba(0,255,136,0.18)',
                      borderRadius: 6, color: '#f8fafc', fontSize: '0.88rem',
                      fontFamily: 'monospace', outline: 'none', resize: 'vertical',
                      boxSizing: 'border-box', transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = '#00ff88'}
                    onBlur={e => e.target.style.borderColor = 'rgba(0,255,136,0.18)'}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{
                    padding: '0.7rem 1.5rem', borderRadius: 8,
                    background: status === 'sending' ? 'rgba(0,255,136,0.1)' : 'linear-gradient(135deg, #00ff88, #00b4d8)',
                    border: 'none', color: status === 'sending' ? '#00ff88' : '#030014',
                    fontWeight: 700, fontSize: '0.9rem', fontFamily: 'monospace',
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {status === 'sending' ? '> Transmitting...' : '> Send Message'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
        textAlign: 'center', color: '#1e293b', fontFamily: 'monospace', fontSize: '0.72rem',
        whiteSpace: 'nowrap',
      }}>
        &lt; Crafted with React + Three.js by{' '}
        <span style={{ color: '#475569' }}>Abhiyank Kumar</span> /&gt; © 2026
      </div>
    </div>
  )
}
