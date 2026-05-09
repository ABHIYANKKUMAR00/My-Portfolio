import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const techStack = ['React', 'Redux', 'Redux Toolkit', 'Node.js', 'Python', 'JavaScript', 'FastAPI', 'Flask', 'LangChain', 'LangGraph', 'HuggingFace', 'Pinecone', 'SQL', 'n8n', 'NumPy', 'Pandas', 'Scikit-learn', 'RAG']

const timeline = [
  {
    year: '2022 – 2026',
    title: 'B.Tech — Computer Science & Engineering',
    org: 'GL Bajaj Institute of Technology and Management, Greater Noida',
    desc: 'CGPA: 7 | Strong foundations in Data Structures & Algorithms, DBMS, Operating Systems, and OOPs.',
    color: '#8b5cf6',
  },
  {
    year: '2020 – 2021',
    title: 'Sr. Secondary Education (Class XII)',
    org: 'Lord Krishna Public School, Nanauta (S.R.E), Uttar Pradesh',
    color: '#06b6d4',
  },
  {
    year: '2025',
    title: 'IBM Artificial Intelligence Fundamentals',
    org: 'IBM (via Credly)',
    desc: 'Covered foundational AI concepts including machine learning, neural networks, and real-world AI applications.',
    color: '#f59e0b',
  },
]

const csFundamentals = [
  { label: 'Data Structures & Algorithms', icon: '🧮' },
  { label: 'Database Management', icon: '🗄️' },
  { label: 'Operating Systems', icon: '⚙️' },
  { label: 'Object-Oriented Design', icon: '🏗️' },
]

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} style={{ padding: 'clamp(4rem, 8vw, 7rem) 1.5rem', position: 'relative' }}>
      {/* Left border accent */}
      <div style={{
        position: 'absolute', left: 0, top: '15%', bottom: '15%', width: 2,
        background: 'linear-gradient(180deg, transparent, #8b5cf6 30%, #06b6d4 70%, transparent)',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '3.5rem' }}
        >
          <div style={{ fontFamily: 'monospace', color: '#8b5cf6', fontSize: '0.82rem', marginBottom: '0.4rem' }}>
            // 01. about
          </div>
          <h2 className="section-title" style={{ margin: '0 0 0.75rem' }}>
            About <span className="gradient-text">Me</span>
          </h2>
          <div style={{ width: 56, height: 2, background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)', borderRadius: 1 }} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Bio + tech stack */}
          <motion.div variants={container} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <motion.div
              variants={item}
              className="glass"
              style={{ padding: '1.75rem', borderRadius: 16, marginBottom: '1.5rem' }}
            >
              <div style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#8b5cf6', marginBottom: '0.75rem', opacity: 0.7 }}>
                $ whoami
              </div>
              <p style={{ color: '#cbd5e1', lineHeight: 1.88, marginBottom: '1rem', fontSize: '0.95rem', margin: '0 0 1rem' }}>
                I'm <strong style={{ color: '#a78bfa' }}>Abhiyank Kumar</strong>, a final-year Computer Science
                student from Greater Noida, India. I build intelligent, high-performance web applications that
                bridge the gap between elegant UI and cutting-edge AI.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.88, fontSize: '0.9rem', margin: 0 }}>
                My expertise spans RAG (Retrieval-Augmented Generation) pipelines, React + Redux frontends,
                and FastAPI/Node.js backends. I'm deeply passionate about making AI accessible through
                intuitive, production-ready interfaces.
              </p>
              <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {[
                  { v: '📍 Greater Noida, IN' },
                  { v: '🟢 Open to Work' },
                ].map(b => (
                  <div key={b.v} style={{
                    padding: '6px 14px', borderRadius: 8,
                    background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)',
                    fontSize: '0.78rem', color: '#94a3b8',
                  }}>
                    {b.v}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={item}>
              <div style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#06b6d4', marginBottom: '0.75rem', opacity: 0.7 }}>
                $ tech-stack --list
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                {techStack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    className="skill-badge"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.35 + i * 0.04 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Timeline */}
          <motion.div variants={container} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <div style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#8b5cf6', marginBottom: '1.25rem', opacity: 0.7 }}>
              $ history --verbose
            </div>

            <div style={{ position: 'relative', paddingLeft: '1.75rem' }}>
              <div style={{
                position: 'absolute', left: 0, top: 6, bottom: 6, width: 1,
                background: 'linear-gradient(180deg, #8b5cf6, #06b6d4, rgba(6,182,212,0.08))',
              }} />
              {timeline.map((t, i) => (
                <motion.div key={i} variants={item} style={{ position: 'relative', marginBottom: '1.75rem' }}>
                  <div style={{
                    position: 'absolute', left: -28, top: 5, width: 11, height: 11,
                    borderRadius: '50%', background: t.color,
                    boxShadow: `0 0 10px ${t.color}`,
                    border: '2px solid #030014',
                  }} />
                  <div style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: t.color, marginBottom: '0.25rem' }}>{t.year}</div>
                  <div style={{ fontSize: '0.97rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.2rem' }}>{t.title}</div>
                  <div style={{ fontSize: '0.78rem', color: t.color, marginBottom: '0.4rem', fontStyle: 'italic' }}>{t.org}</div>
                  <div style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.7 }}>{t.desc}</div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={item} className="glass" style={{ padding: '1.25rem 1.5rem', borderRadius: 12 }}>
              <div style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#f59e0b', marginBottom: '0.85rem', opacity: 0.8 }}>
                $ core-cs --show
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                {csFundamentals.map(f => (
                  <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                    <span style={{ color: '#10b981', flexShrink: 0 }}>✓</span>
                    {f.label}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
