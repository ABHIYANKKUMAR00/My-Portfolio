import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import AIAssistant from './components/AIAssistant'
import ProjectModal from './components/ProjectModal'
import SpaceBackground from './components/SpaceBackground'

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <div style={{ width: '100%', background: '#030014', color: '#f8fafc', position: 'relative' }}>
      <AnimatePresence>
        {loading && <LoadingScreen key="loading" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <SpaceBackground />
          <Navigation />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <section id="home"><Hero /></section>
            <section id="about"><About /></section>
            <section id="skills"><Skills /></section>
            <section id="projects"><Projects /></section>
            <section id="contact"><Contact /></section>
          </div>
          <AIAssistant />
          <ProjectModal />
        </>
      )}
    </div>
  )
}

export default App
