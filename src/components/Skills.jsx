import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const categories = [
  { name: 'Programming', color: '#3b82f6', icon: '⚡' },
  { name: 'Frontend', color: '#06b6d4', icon: '🎨' },
  { name: 'Backend', color: '#8b5cf6', icon: '⚙️' },
  { name: 'AI / ML', color: '#f59e0b', icon: '🤖' },
  { name: 'Databases', color: '#10b981', icon: '🗄️' },
  { name: 'Automation', color: '#ef4444', icon: '🔄' },
  { name: 'Tools', color: '#a78bfa', icon: '🛠️' },
]

const skillGrid = {
  Programming: { skills: ['C', 'C++', 'Python', 'JavaScript'], color: '#3b82f6', icon: '⚡' },
  Frontend: { skills: ['HTML', 'CSS', 'React.js', 'Redux', 'Redux Toolkit'], color: '#06b6d4', icon: '🎨' },
  Backend: { skills: ['Node.js', 'REST APIs', 'FastAPI', 'Flask'], color: '#8b5cf6', icon: '⚙️' },
  'AI / ML': { skills: ['LangChain', 'LangGraph', 'HuggingFace', 'RAG', 'NumPy', 'Pandas', 'Scikit-learn', 'Generative AI'], color: '#f59e0b', icon: '🤖' },
  Databases: { skills: ['SQL', 'Pinecone', 'Vector DB'], color: '#10b981', icon: '🗄️' },
  Automation: { skills: ['n8n', 'Webhooks', 'Workflow Automation', 'Groq API'], color: '#ef4444', icon: '🔄' },
  Tools: { skills: ['Git', 'GitHub', 'VS Code', 'Jupyter Notebook'], color: '#a78bfa', icon: '🛠️' },
}

/* ── Animated orbit icons — no Three.js ── */
function SkillOrbit({ inView }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      gap: 'clamp(1rem, 3vw, 2.5rem)', padding: '2.5rem 1rem', flexWrap: 'wrap',
    }}>
      {categories.map((cat, i) => (
        <motion.div
          key={cat.name}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}
        >
          {/* Orbit ring with spinning dot */}
          <div style={{ position: 'relative', width: 80, height: 80 }}>
            {/* Outer ring */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              border: `1.5px solid ${cat.color}35`,
            }} />
            {/* Inner ring */}
            <div style={{
              position: 'absolute', inset: 10, borderRadius: '50%',
              border: `1px solid ${cat.color}20`,
            }} />
            {/* Spinning dot */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4 + i * 1.5, repeat: Infinity, ease: 'linear' }}
              style={{ position: 'absolute', inset: 0, borderRadius: '50%' }}
            >
              <div style={{
                position: 'absolute', top: 2, left: '50%', transform: 'translateX(-50%)',
                width: 8, height: 8, borderRadius: '50%',
                background: cat.color, boxShadow: `0 0 10px ${cat.color}`,
              }} />
            </motion.div>
            {/* Center icon */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem',
            }}>
              {cat.icon}
            </div>
          </div>
          <span style={{
            fontSize: '0.7rem', color: cat.color, fontFamily: 'monospace',
            fontWeight: 700, textAlign: 'center', letterSpacing: '0.04em',
          }}>
            {cat.name}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(null)

  return (
    <div ref={ref} style={{ padding: 'clamp(4rem, 8vw, 7rem) 1.5rem', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: '10%', right: '5%', width: '50%', height: '50%', pointerEvents: 'none',
        background: 'radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 70%)',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '3rem', textAlign: 'center' }}
        >
          <div style={{ fontFamily: 'monospace', color: '#8b5cf6', fontSize: '0.82rem', marginBottom: '0.4rem' }}>
            // 02. skills
          </div>
          <h2 className="section-title" style={{ margin: '0 0 0.85rem' }}>
            Tech <span className="gradient-text">Universe</span>
          </h2>
          <p style={{ color: '#64748b', maxWidth: 480, margin: '0 auto', lineHeight: 1.75 }}>
            Technologies I work with — from full-stack web to AI/ML pipelines
          </p>
        </motion.div>

        {/* Orbit visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="glass"
          style={{ borderRadius: 20, marginBottom: '2.5rem', overflow: 'hidden' }}
        >
          <SkillOrbit inView={inView} />
        </motion.div>

        {/* Skill grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Object.entries(skillGrid).map(([cat, data], i) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.6 }}
              className="glass"
              onMouseEnter={() => setActive(cat)}
              onMouseLeave={() => setActive(null)}
              whileHover={{ scale: 1.03, boxShadow: `0 0 28px ${data.color}22` }}
              style={{
                padding: '1.4rem', borderRadius: 14, cursor: 'default',
                borderColor: active === cat ? `${data.color}55` : undefined,
                transition: 'border-color 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
                <div style={{ width: 9, height: 9, borderRadius: '50%', background: data.color, boxShadow: `0 0 8px ${data.color}` }} />
                <span style={{ fontWeight: 700, fontSize: '0.82rem', color: data.color }}>
                  {data.icon} {cat}
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {data.skills.map(s => (
                  <span key={s} style={{
                    padding: '3px 9px', borderRadius: 10,
                    background: `${data.color}10`, border: `1px solid ${data.color}28`,
                    color: '#cbd5e1', fontSize: '0.72rem', fontFamily: 'monospace',
                  }}>
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
