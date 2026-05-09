import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Text } from '@react-three/drei'
import * as THREE from 'three'

/* Falling green code-rain particles */
function CodeRain() {
  const ref = useRef()
  const count = 600

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 28
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 6
      spd[i] = 0.8 + Math.random() * 2.2
    }
    return { positions: pos, speeds: spd }
  }, [])

  const posRef = useRef(positions.slice())

  useFrame((_, delta) => {
    for (let i = 0; i < count; i++) {
      posRef.current[i * 3 + 1] -= speeds[i] * delta
      if (posRef.current[i * 3 + 1] < -10) posRef.current[i * 3 + 1] = 10
    }
    ref.current.geometry.attributes.position.array.set(posRef.current)
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#00ff88" size={0.045} transparent opacity={0.45} sizeAttenuation />
    </points>
  )
}

/* Floating skill sphere — glows on hover */
function SkillSphere({ position, label, color, size = 0.32 }) {
  const meshRef = useRef()
  const glowRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((_, delta) => {
    meshRef.current.rotation.y += delta * (hovered ? 1.8 : 0.35)
    meshRef.current.rotation.x += delta * (hovered ? 0.6 : 0.12)
    const targetScale = hovered ? size * 1.45 : size
    const s = meshRef.current.scale.x
    meshRef.current.scale.setScalar(s + (targetScale - s) * 0.12)
    const targetGlow = hovered ? 1.9 : 1.55
    const gs = glowRef.current.scale.x
    glowRef.current.scale.setScalar(gs + (targetGlow - gs) * 0.1)
  })

  return (
    <group position={position}>
      {/* Main sphere */}
      <mesh
        ref={meshRef}
        onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer' }}
        onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'auto' }}
      >
        <sphereGeometry args={[size, 28, 28]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 2.8 : 1.0}
          transparent
          opacity={hovered ? 1 : 0.88}
        />
      </mesh>

      {/* Outer glow halo */}
      <mesh ref={glowRef} scale={1.55}>
        <sphereGeometry args={[size, 12, 12]} />
        <meshStandardMaterial color={color} transparent opacity={hovered ? 0.14 : 0.05} side={THREE.BackSide} />
      </mesh>

      {/* Label */}
      <Text
        position={[0, size * 1.55, 0]}
        fontSize={0.15}
        color={hovered ? '#ffffff' : color}
        anchorX="center"
        anchorY="bottom"
      >
        {label}
      </Text>

      {hovered && <pointLight color={color} intensity={4} distance={3.5} />}
    </group>
  )
}

/* Skills grouped by category — matches prompt exactly */
const skills = [
  /* Programming */
  { label: 'Python',      color: '#3b82f6', pos: [-4.2, 2.8,  0.2] },
  { label: 'JavaScript',  color: '#f59e0b', pos: [-5.0, 0.2,  0.8] },
  { label: 'C++',         color: '#818cf8', pos: [-3.5, -1.8, -0.4] },
  { label: 'C',           color: '#a78bfa', pos: [-2.0, 3.8, -0.8] },

  /* Frontend */
  { label: 'React',       color: '#61dafb', pos: [-1.0, 1.8,  0.5] },
  { label: 'Redux',       color: '#764abc', pos: [0.5,  3.2,  1.0] },
  { label: 'HTML',        color: '#e34f26', pos: [1.8,  2.2, -0.5] },
  { label: 'CSS',         color: '#1572b6', pos: [0.2, -0.8,  1.8] },

  /* Backend */
  { label: 'Node.js',     color: '#4ade80', pos: [3.8,  1.8,  0.6] },
  { label: 'FastAPI',     color: '#00f5ff', pos: [4.8, -0.3,  0.2] },
  { label: 'Flask',       color: '#94a3b8', pos: [3.2, -2.2, -0.6] },

  /* AI / ML */
  { label: 'LangChain',   color: '#8b5cf6', pos: [1.6, -1.5,  2.2] },
  { label: 'HuggingFace', color: '#ff9a00', pos: [-1.4, -1.2, 2.4] },
  { label: 'RAG',         color: '#06b6d4', pos: [0.2,  0.8,  2.8] },

  /* Databases */
  { label: 'SQL',         color: '#10b981', pos: [-2.8, -3.0,  0.2] },
  { label: 'Pinecone',    color: '#22d3ee', pos: [2.8,  -3.0,  0.2] },
]

export default function MatrixWorld({ position }) {
  return (
    <group position={position}>
      <CodeRain />

      {/* Floating skill spheres with individual Float wrappers */}
      {skills.map((s, i) => (
        <Float
          key={i}
          speed={0.45 + (i % 5) * 0.12}
          floatIntensity={0.35}
          rotationIntensity={0.1}
        >
          <SkillSphere position={s.pos} label={s.label} color={s.color} />
        </Float>
      ))}

      {/* Subtle wireframe grid floor */}
      <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 30, 20, 20]} />
        <meshStandardMaterial color="#00ff88" transparent opacity={0.04} wireframe />
      </mesh>

      <pointLight color="#00ff88" intensity={1.5} distance={22} position={[0,  5,  0]} />
      <pointLight color="#00f5ff" intensity={1.0} distance={16} position={[-6, 0,  2]} />
      <pointLight color="#8b5cf6" intensity={0.8} distance={14} position={[6,  2, -2]} />
    </group>
  )
}
