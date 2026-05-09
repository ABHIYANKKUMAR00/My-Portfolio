import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll, Scroll } from '@react-three/drei'
import * as THREE from 'three'
import HeroWorld from './worlds/HeroWorld'
import AILabWorld from './worlds/AILabWorld'
import MatrixWorld from './worlds/MatrixWorld'
import GalaxyWorld from './worlds/GalaxyWorld'
import TerminalWorld from './worlds/TerminalWorld'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import SkillsSection from './sections/SkillsSection'
import ProjectsSection from './sections/ProjectsSection'
import ContactSection from './sections/ContactSection'

export const SECTION_GAP = 22
const TOTAL_SECTIONS = 5

const camPoints = [
  new THREE.Vector3(0, 0, 8),
  new THREE.Vector3(1.5, -SECTION_GAP, 6.5),
  new THREE.Vector3(-1.5, -SECTION_GAP * 2, 9),
  new THREE.Vector3(2, -SECTION_GAP * 3, 5.5),
  new THREE.Vector3(0, -SECTION_GAP * 4, 8),
]
const lookPoints = [
  new THREE.Vector3(0, -1, 0),
  new THREE.Vector3(1.5, -SECTION_GAP - 1, 0),
  new THREE.Vector3(-1.5, -SECTION_GAP * 2 - 1, 0),
  new THREE.Vector3(2, -SECTION_GAP * 3 - 1, 0),
  new THREE.Vector3(0, -SECTION_GAP * 4 - 1, 0),
]
const camCurve = new THREE.CatmullRomCurve3(camPoints)
const lookCurve = new THREE.CatmullRomCurve3(lookPoints)

function CameraRig() {
  const scroll = useScroll()
  const prevSection = useRef(-1)
  const smoothLook = useRef(new THREE.Vector3(0, -1, 0))
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  useFrame((state) => {
    const t = scroll.offset
    const section = Math.min(Math.round(t * (TOTAL_SECTIONS - 1)), TOTAL_SECTIONS - 1)

    const base = camCurve.getPoint(Math.min(t, 0.9999))
    const lookAt = lookCurve.getPoint(Math.min(t, 0.9999))

    const mx = isMobile ? 0 : state.mouse.x * 0.4
    const my = isMobile ? 0 : state.mouse.y * 0.25

    const targetPos = new THREE.Vector3(base.x + mx, base.y + my, base.z)
    state.camera.position.lerp(targetPos, 0.06)

    smoothLook.current.lerp(lookAt, 0.05)
    state.camera.lookAt(smoothLook.current)

    if (prevSection.current !== section) {
      prevSection.current = section
      window.dispatchEvent(new CustomEvent('sectionChange', { detail: { section, progress: t } }))
    }
  })

  return null
}

export default function MainScene() {
  return (
    <>
      <ambientLight intensity={0.05} />
      <CameraRig />

      <HeroWorld position={[0, 0, 0]} />
      <AILabWorld position={[0, -SECTION_GAP, 0]} />
      <MatrixWorld position={[0, -SECTION_GAP * 2, 0]} />
      <GalaxyWorld position={[0, -SECTION_GAP * 3, 0]} />
      <TerminalWorld position={[0, -SECTION_GAP * 4, 0]} />

      <Scroll html>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </Scroll>
    </>
  )
}
