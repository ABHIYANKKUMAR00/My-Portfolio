import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'

function AnimatedStars({ mousePos }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    ref.current.rotation.y = t * 0.012 + (mousePos?.x || 0) * 0.04
    ref.current.rotation.x = (mousePos?.y || 0) * 0.025
  })

  return (
    <group ref={ref}>
      <Stars radius={120} depth={60} count={6000} factor={3.5} saturation={0.2} fade speed={0.4} />
    </group>
  )
}

export default function ParticleBackground({ mousePos }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 1], fov: 60 }} gl={{ antialias: false, alpha: true }} dpr={[1, 1.5]}>
        <AnimatedStars mousePos={mousePos} />
      </Canvas>
    </div>
  )
}
