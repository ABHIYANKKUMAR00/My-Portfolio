import { motion } from 'framer-motion'
import { useActiveSection } from '../../hooks/useActiveSection'

const projects = [
  {
    title: 'AI Medical Chatbot',
    subtitle: 'RAG-Powered Intelligent Assistant',
    description:
      'End-to-end RAG pipeline for medical Q&A. Embeds documents into Pinecone vector DB, retrieves context, and streams responses via LangChain + FastAPI backend with a React frontend.',
    tech: ['LangChain', 'HuggingFace', 'Pinecone', 'FastAPI', 'React', 'RAG'],
    color: '#8b5cf6',
    ringColor: '#00f5ff',
    github: 'https://github.com/abhiyankgujjar00',
  },
  {
    title: 'Myntra Clone',
    subtitle: 'Full-Stack E-Commerce Platform',
    description:
      "Feature-complete e-commerce platform with product catalog, cart/wishlist, Redux state management, user auth, and a Node.js REST API. Pixel-perfect UI matching Myntra's design system.",
    tech: ['React', 'Redux', 'Node.js', 'CSS3', 'REST API', 'JavaScript'],
    color: '#f97316',
    ringColor: '#ec4899',
    github: 'https://github.com/abhiyankgujjar00',
  },
]

const openModal = (project) =>
  window.dispatchEvent(new CustomEvent('projectSelect', { detail: project }))

export default function ProjectsSection() {
  const visited = useActiveSection(3)

  return (
    <div style={{
      position: 'absolute', top: '300vh', left: 0, width: '100vw', height: '100vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      pointerEvents: 'none',
    }}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: visited ? 1 : 0, y: visited ? 0 : -20 }}
        transition={{ duration: 0.55 }}
        style={{ textAlign: 'center', paddingTop: '3rem' }}
      >
        <div style={{
          color: '#8b5cf6', fontFamily: 'monospace', fontSize: '0.72rem',
          letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '0.5rem',
        }}>
          &gt; Section 04
        </div>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800,
          background: 'linear-gradient(135deg, #8b5cf6, #f97316)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: '0.4rem',
        }}>
          Projects Galaxy
        </h2>
        <p style={{ color: '#475569', fontSize: '0.82rem' }}>
          Click a planet to explore
        </p>
      </motion.div>

      {/* Mobile-only project cards (hidden on desktop via inline check) */}
      <MobileCards projects={projects} visited={visited} />
    </div>
  )
}

function MobileCards({ projects, visited }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  if (!isMobile) return null

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: '1rem',
      padding: '2rem 1.25rem 0', width: '100%', maxWidth: 480,
      pointerEvents: 'auto',
    }}>
      {projects.map((p, i) => (
        <motion.button
          key={p.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: visited ? 1 : 0, y: visited ? 0 : 30 }}
          transition={{ delay: i * 0.12, duration: 0.5 }}
          onClick={() => openModal(p)}
          style={{
            textAlign: 'left', width: '100%',
            background: 'rgba(8, 5, 28, 0.88)',
            border: `1px solid ${p.color}35`,
            borderRadius: 14, overflow: 'hidden',
            cursor: 'pointer', padding: 0,
          }}
        >
          <div style={{ height: 3, background: `linear-gradient(90deg, ${p.color}, ${p.ringColor})` }} />
          <div style={{ padding: '1rem 1.1rem' }}>
            <p style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1rem', marginBottom: '0.2rem' }}>
              {p.title}
            </p>
            <p style={{ color: p.color, fontSize: '0.78rem', marginBottom: '0.6rem' }}>{p.subtitle}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {p.tech.slice(0, 4).map(t => (
                <span key={t} style={{
                  padding: '0.2rem 0.55rem', borderRadius: 5, fontSize: '0.7rem',
                  background: `${p.color}14`, color: p.color,
                  border: `1px solid ${p.color}28`,
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  )
}
