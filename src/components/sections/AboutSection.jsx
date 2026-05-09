import { motion } from 'framer-motion'
import { useActiveSection } from '../../hooks/useActiveSection'

const techStack = [
  'React', 'Redux', 'Node.js', 'Python', 'FastAPI',
  'LangChain', 'HuggingFace', 'Pinecone', 'SQL', 'Docker', 'Flask', 'JavaScript',
]

const timeline = [
  { year: '2022–26', title: 'B.Tech Computer Science', org: 'Chandigarh University', color: '#8b5cf6' },
  { year: '2024', title: 'AI & GenAI Specialization', org: 'Self-directed + Coursework', color: '#00f5ff' },
  { year: '2024', title: 'Full Stack Development', org: 'Projects & Freelance', color: '#10b981' },
]

const fundamentals = ['DSA', 'DBMS', 'OS', 'OOPs']

export default function AboutSection() {
  const visited = useActiveSection(1)
  return (
    <div style={{
      position: 'absolute', top: '100vh', left: 0, width: '100vw', height: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      pointerEvents: 'none',
    }}>
      <div style={{
        width: '100%', maxWidth: 960, padding: '0 1.5rem',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem', pointerEvents: 'auto',
      }}>
        {/* Bio card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: visited ? 1 : 0, x: visited ? 0 : -40 }}
          transition={{ duration: 0.7 }}
          style={{
            background: 'rgba(10,8,30,0.82)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(139,92,246,0.25)', borderRadius: 16, padding: '2rem',
            borderLeft: '3px solid #8b5cf6',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'linear-gradient(135deg,#8b5cf6,#06b6d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.1rem', fontWeight: 800, color: '#fff',
            }}>AK</div>
            <div>
              <div style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1.05rem' }}>Abhiyank Kumar</div>
              <div style={{ color: '#64748b', fontSize: '0.8rem' }}>📍 Greater Noida, India · Open to Remote</div>
            </div>
          </div>

          <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.92rem', marginBottom: '1.5rem' }}>
            Final-year Computer Science student with strong foundations in DSA, DBMS, OS,
            and OOPs. Experienced in React, Redux, and Generative AI technologies like
            LangChain, Hugging Face, and RAG — building intelligent, production-ready
            web applications from end to end.
          </p>

          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ color: '#8b5cf6', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Core Fundamentals
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {fundamentals.map(f => (
                <span key={f} style={{
                  padding: '0.25rem 0.75rem', borderRadius: 6, fontSize: '0.78rem',
                  background: 'rgba(139,92,246,0.12)', color: '#a78bfa',
                  border: '1px solid rgba(139,92,246,0.2)',
                }}>{f}</span>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {timeline.map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: t.color, flexShrink: 0 }} />
                  {i < timeline.length - 1 && <div style={{ width: 1, height: 28, background: 'rgba(100,116,139,0.25)', marginTop: 2 }} />}
                </div>
                <div>
                  <div style={{ color: t.color, fontSize: '0.72rem', fontFamily: 'monospace', letterSpacing: '0.08em' }}>{t.year}</div>
                  <div style={{ color: '#f1f5f9', fontSize: '0.88rem', fontWeight: 600 }}>{t.title}</div>
                  <div style={{ color: '#64748b', fontSize: '0.78rem' }}>{t.org}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: visited ? 1 : 0, x: visited ? 0 : 40 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            background: 'rgba(10,8,30,0.82)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(6,182,212,0.2)', borderRadius: 16, padding: '2rem',
            borderLeft: '3px solid #06b6d4',
          }}
        >
          <div style={{
            color: '#00f5ff', fontSize: '0.75rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', marginBottom: '1.25rem', fontFamily: 'monospace',
          }}>
            &gt; Tech Stack
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.5rem' }}>
            {techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: visited ? 1 : 0, scale: visited ? 1 : 0.8 }}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.3 }}
                style={{
                  padding: '0.35rem 0.9rem', borderRadius: 20, fontSize: '0.82rem',
                  background: 'rgba(0,245,255,0.07)', color: '#00f5ff',
                  border: '1px solid rgba(0,245,255,0.2)',
                  transition: 'all 0.2s', cursor: 'default',
                }}
                whileHover={{ background: 'rgba(0,245,255,0.18)', scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(100,116,139,0.15)', paddingTop: '1.25rem' }}>
            <div style={{ color: '#8b5cf6', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              AI / ML Focus
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.65 }}>
              Specializing in Retrieval-Augmented Generation, vector databases,
              fine-tuning open-source LLMs, and building production AI pipelines
              with LangChain and HuggingFace.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Section label */}
      <div style={{
        position: 'absolute', top: '4rem', left: '50%', transform: 'translateX(-50%)',
        textAlign: 'center',
      }}>
        <div style={{ color: '#00f5ff', fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          &gt; Section 02
        </div>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#f8fafc',
          background: 'linear-gradient(135deg, #fff, #8b5cf6)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          AI Lab · About Me
        </h2>
      </div>
    </div>
  )
}
