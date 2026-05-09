import { motion } from 'framer-motion'
import { useActiveSection } from '../../hooks/useActiveSection'

const categories = [
  {
    name: 'Programming',
    color: '#3b82f6',
    skills: ['JavaScript', 'Python', 'C', 'C++'],
    icon: '⚡',
  },
  {
    name: 'Frontend',
    color: '#06b6d4',
    skills: ['React', 'Redux', 'Tailwind', 'HTML5', 'CSS3'],
    icon: '🎨',
  },
  {
    name: 'Backend',
    color: '#8b5cf6',
    skills: ['Node.js', 'FastAPI', 'Flask', 'REST APIs', 'Express'],
    icon: '⚙️',
  },
  {
    name: 'AI / ML',
    color: '#f59e0b',
    skills: ['LangChain', 'HuggingFace', 'RAG', 'Transformers', 'OpenAI'],
    icon: '🧠',
  },
  {
    name: 'Databases',
    color: '#10b981',
    skills: ['SQL', 'PostgreSQL', 'MongoDB', 'Pinecone', 'Vector DB'],
    icon: '🗄️',
  },
]

export default function SkillsSection() {
  const visited = useActiveSection(2)
  return (
    <div style={{
      position: 'absolute', top: '200vh', left: 0, width: '100vw', height: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      pointerEvents: 'none', overflow: 'hidden',
    }}>
      {/* Section label */}
      <div style={{
        position: 'absolute', top: '3rem', left: '50%', transform: 'translateX(-50%)',
        textAlign: 'center', zIndex: 1,
      }}>
        <div style={{ color: '#00ff88', fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          &gt; Section 03
        </div>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800,
          background: 'linear-gradient(135deg, #00ff88, #00f5ff)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Code Matrix · Skills
        </h2>
        <p style={{ color: '#475569', fontSize: '0.85rem', marginTop: '0.3rem', fontFamily: 'monospace' }}>
          Hover nodes in 3D · Click to interact
        </p>
      </div>

      {/* Skill cards - bottom strip */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: 0, right: 0,
        overflowX: 'auto', padding: '0 1rem',
        display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap',
        pointerEvents: 'auto',
      }}>
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: visited ? 1 : 0, y: visited ? 0 : 30 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.04, borderColor: cat.color }}
            style={{
              background: 'rgba(5,5,20,0.88)', backdropFilter: 'blur(16px)',
              border: `1px solid rgba(${cat.color === '#3b82f6' ? '59,130,246' : cat.color === '#06b6d4' ? '6,182,212' : cat.color === '#8b5cf6' ? '139,92,246' : cat.color === '#f59e0b' ? '245,158,11' : '16,185,129'},0.25)`,
              borderRadius: 12, padding: '1rem 1.25rem', minWidth: 160,
              cursor: 'default', transition: 'all 0.25s',
            }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{cat.icon}</div>
            <div style={{ color: cat.color, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem', fontWeight: 700 }}>
              {cat.name}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {cat.skills.map(s => (
                <span key={s} style={{
                  padding: '0.2rem 0.55rem', borderRadius: 20, fontSize: '0.72rem',
                  background: `rgba(${cat.color === '#3b82f6' ? '59,130,246' : cat.color === '#06b6d4' ? '6,182,212' : cat.color === '#8b5cf6' ? '139,92,246' : cat.color === '#f59e0b' ? '245,158,11' : '16,185,129'},0.1)`,
                  color: cat.color, border: `1px solid ${cat.color}33`,
                }}>
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
