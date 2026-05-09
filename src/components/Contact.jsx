import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ── Animated terminal line ── */
function TermLine({ text, color = '#e2e8f0', delay = 0 }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay)
    return () => clearTimeout(t)
  }, [delay])
  if (!show) return null
  return (
    <motion.div
      initial={{ opacity: 0, x: -5 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.18 }}
      style={{ color, fontFamily: 'monospace', fontSize: 'clamp(0.7rem, 1.4vw, 0.83rem)', lineHeight: 1.7, minHeight: text === '' ? '0.85em' : 'auto' }}
    >
      {text}
    </motion.div>
  )
}

const termLines = [
  { text: '$ ./contact-abhiyank.sh', color: '#8b5cf6', delay: 0 },
  { text: 'Initializing secure channel...', color: '#475569', delay: 350 },
  { text: '[✓] Identity verified', color: '#10b981', delay: 700 },
  { text: '[✓] Encryption active', color: '#10b981', delay: 1000 },
  { text: '', delay: 1200 },
  { text: '══ CONTACT INFORMATION ══', color: '#8b5cf6', delay: 1350 },
  { text: '', delay: 1450 },
  { text: '  📧  Email     : abhiyankhatana@gmail.com', color: '#06b6d4', delay: 1600 },
  { text: '  📞  Phone     : +91 9627679373', color: '#06b6d4', delay: 1900 },
  { text: '  📍  Location  : Greater Noida, India', color: '#06b6d4', delay: 2150 },
  { text: '', delay: 2350 },
  { text: '══ SOCIAL LINKS ══', color: '#8b5cf6', delay: 2500 },
  { text: '', delay: 2600 },
  { text: '  🐙  GitHub    : github.com/ABHIYANKKUMAR00', color: '#94a3b8', delay: 2750 },
  { text: '  💼  LinkedIn  : linkedin.com/in/abhiyank-kumar00', color: '#94a3b8', delay: 2950 },
  { text: '', delay: 3100 },
  { text: '> Ready to connect — send a message ↓', color: '#f8fafc', delay: 3250 },
]

const socials = [
  { label: 'GitHub', icon: '🐙', href: 'https://github.com/ABHIYANKKUMAR00?tab=repositories', color: '#64748b' },
  { label: 'LinkedIn', icon: '💼', href: 'https://www.linkedin.com/in/abhiyank-kumar00', color: '#3b82f6' },
  { label: 'Email', icon: '📧', href: 'mailto:abhiyankhatana@gmail.com', color: '#8b5cf6' },
]

/* ── Contact form ── */
function ContactForm({ inView }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => { setSending(false); setSent(true); setForm({ name: '', email: '', message: '' }) }, 1800)
  }

  const inputStyle = {
    width: '100%', padding: '11px 15px', borderRadius: 9,
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(139,92,246,0.22)',
    color: '#f1f5f9', fontSize: '0.9rem', outline: 'none',
    transition: 'border-color 0.2s ease', boxSizing: 'border-box',
    fontFamily: 'inherit',
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 28 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="glass" style={{ padding: '2rem', borderRadius: 16 }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f1f5f9', margin: '0 0 1.5rem' }}>
          Send a Message
        </h3>
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{ textAlign: 'center', padding: '2.5rem 1rem' }}
            >
              <div style={{ fontSize: '2.8rem', marginBottom: '1rem' }}>✅</div>
              <div style={{ color: '#10b981', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.4rem' }}>Message Sent!</div>
              <div style={{ color: '#64748b', fontSize: '0.83rem' }}>I'll get back to you soon.</div>
              <button
                onClick={() => setSent(false)}
                style={{
                  marginTop: '1.5rem', padding: '8px 20px', cursor: 'pointer',
                  background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.3)',
                  borderRadius: 8, color: '#a78bfa', fontFamily: 'monospace', fontSize: '0.78rem',
                }}
              >
                Send Another
              </button>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={submit}>
              {[
                { key: 'name', label: 'NAME', type: 'text', placeholder: 'Your name' },
                { key: 'email', label: 'EMAIL', type: 'email', placeholder: 'your@email.com' },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontFamily: 'monospace', fontSize: '0.68rem', color: '#8b5cf6', marginBottom: '0.4rem', letterSpacing: '0.07em' }}>
                    {f.label}
                  </label>
                  <input
                    type={f.type} required
                    value={form[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = 'rgba(139,92,246,0.5)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(139,92,246,0.22)' }}
                  />
                </div>
              ))}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontFamily: 'monospace', fontSize: '0.68rem', color: '#8b5cf6', marginBottom: '0.4rem', letterSpacing: '0.07em' }}>
                  MESSAGE
                </label>
                <textarea
                  required rows={5}
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  placeholder="Tell me about your project or idea..."
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 115 }}
                  onFocus={e => { e.target.style.borderColor = 'rgba(139,92,246,0.5)' }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(139,92,246,0.22)' }}
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(139,92,246,0.5)' }}
                whileTap={{ scale: 0.98 }}
                disabled={sending}
                style={{
                  width: '100%', padding: '12px',
                  background: sending ? 'rgba(139,92,246,0.3)' : 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                  border: 'none', borderRadius: 9, color: 'white',
                  fontWeight: 700, fontSize: '0.88rem', cursor: sending ? 'default' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                }}
              >
                {sending ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%' }}
                    />
                    Sending...
                  </>
                ) : 'Send Message →'}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [termActive, setTermActive] = useState(false)

  useEffect(() => { if (inView) setTimeout(() => setTermActive(true), 300) }, [inView])

  return (
    <div ref={ref} style={{ padding: 'clamp(4rem, 8vw, 7rem) 1.5rem', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: '15%', right: '8%', width: '50%', height: '55%', pointerEvents: 'none',
        background: 'radial-gradient(ellipse, rgba(6,182,212,0.07) 0%, transparent 70%)',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '3rem', textAlign: 'center' }}
        >
          <div style={{ fontFamily: 'monospace', color: '#8b5cf6', fontSize: '0.82rem', marginBottom: '0.4rem' }}>
            // 04. contact
          </div>
          <h2 className="section-title" style={{ margin: '0 0 0.85rem' }}>
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p style={{ color: '#64748b', maxWidth: 440, margin: '0 auto', lineHeight: 1.75 }}>
            Open to opportunities, collaborations, and interesting conversations about AI and the web.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Terminal */}
          <motion.div initial={{ opacity: 0, x: -28 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
            <div className="glass" style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 0 50px rgba(139,92,246,0.12)' }}>
              {/* Title bar */}
              <div style={{ padding: '11px 16px', display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(0,0,0,0.35)', borderBottom: '1px solid rgba(139,92,246,0.12)' }}>
                {['#ef4444', '#f59e0b', '#10b981'].map((c, i) => (
                  <div key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c, opacity: 0.75 }} />
                ))}
                <span style={{ marginLeft: 8, fontFamily: 'monospace', fontSize: '0.7rem', color: '#475569' }}>
                  abhiyank@portfolio:~
                </span>
              </div>

              {/* Body */}
              <div style={{ padding: '1.35rem 1.5rem', minHeight: 340, background: 'rgba(0,0,0,0.38)' }}>
                {termActive && termLines.map((l, i) => <TermLine key={i} {...l} />)}
                {termActive && (
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: '#8b5cf6' }}>$ </span>
                    <span className="terminal-cursor" style={{ marginLeft: 4 }} />
                  </div>
                )}
              </div>
            </div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9, duration: 0.6 }}
              style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}
            >
              {socials.map(s => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, boxShadow: `0 0 18px ${s.color}45` }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    flex: 1, padding: '9px', borderRadius: 10, textAlign: 'center',
                    background: `${s.color}0f`, border: `1px solid ${s.color}30`,
                    color: s.color, fontSize: '0.78rem', fontWeight: 600,
                    textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {s.icon} {s.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Form */}
          <ContactForm inView={inView} />
        </div>
      </div>
    </div>
  )
}
