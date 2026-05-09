import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Text } from '@react-three/drei'
import * as THREE from 'three'

const W = 3.6   // card width
const H = 2.25  // card height

const PROJECTS = [
  {
    position: [-3.2, 0, 0],
    color: '#8b5cf6',
    ringColor: '#00f5ff',
    title: 'AI Medical Chatbot',
    subtitle: 'RAG-Powered Intelligent Assistant',
    description:
      'End-to-end RAG pipeline for medical Q&A. Embeds documents into Pinecone vector DB, retrieves context, and streams responses via LangChain + FastAPI backend with a React frontend.',
    tech: ['LangChain', 'HuggingFace', 'Pinecone', 'FastAPI', 'React', 'RAG'],
    github: 'https://github.com/abhiyankgujjar00',
  },
  {
    position: [3.2, 0, 0],
    color: '#f97316',
    ringColor: '#ec4899',
    title: 'Myntra Clone',
    subtitle: 'Full-Stack E-Commerce Platform',
    description:
      "Feature-complete e-commerce platform with product catalog, cart/wishlist, Redux state management, user auth, and a Node.js REST API. Pixel-perfect UI matching Myntra's design system.",
    tech: ['React', 'Redux', 'Node.js', 'CSS3', 'REST API', 'JavaScript'],
    github: 'https://github.com/abhiyankgujjar00',
  },
]

/* Subtle floating dust — not a full galaxy */
function AmbientDust() {
  const ref = useRef()
  const positions = useMemo(() => {
    const n = 180, arr = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 22
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 4
    }
    return arr
  }, [])

  useFrame((_, delta) => { ref.current.rotation.y += delta * 0.02 })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#8b5cf6" size={0.022} transparent opacity={0.30} sizeAttenuation />
    </points>
  )
}

/* Glowing neon border for a card */
function CardBorder({ color, hovered }) {
  const hw = W / 2, hh = H / 2
  const edges = [
    { pos: [0,  hh, 0.01], size: [W,     0.010] },
    { pos: [0, -hh, 0.01], size: [W,     0.010] },
    { pos: [-hw, 0, 0.01], size: [0.010, H    ] },
    { pos: [ hw, 0, 0.01], size: [0.010, H    ] },
  ]
  return (
    <group>
      {edges.map(({ pos, size }, i) => (
        <mesh key={i} position={pos}>
          <planeGeometry args={size} />
          <meshBasicMaterial color={color} transparent opacity={hovered ? 0.9 : 0.55} />
        </mesh>
      ))}
      {/* Corner accent dots */}
      {[[-hw, hh], [hw, hh], [-hw, -hh], [hw, -hh]].map(([cx, cy], i) => (
        <mesh key={`c${i}`} position={[cx, cy, 0.015]}>
          <sphereGeometry args={[0.042, 8, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </group>
  )
}

/* Clean 3D project card panel */
function ProjectCard({ project }) {
  const groupRef = useRef()
  const bgRef    = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {
    /* Smooth scale on hover */
    const target = hovered ? 1.055 : 1.0
    const s = groupRef.current.scale.x
    groupRef.current.scale.setScalar(s + (target - s) * 0.1)

    /* Pulsing card glow */
    const pulse = 0.45 + Math.sin(clock.elapsedTime * 1.5) * 0.35
    bgRef.current.material.opacity          = (hovered ? 0.18 : 0.06) + pulse * 0.025
    bgRef.current.material.emissiveIntensity = hovered ? 0.22 : 0.06
  })

  const handleClick = (e) => {
    e.stopPropagation()
    window.dispatchEvent(new CustomEvent('projectSelect', { detail: project }))
  }

  const tags1 = project.tech.slice(0, 3)
  const tags2 = project.tech.slice(3, 6)

  return (
    <group
      ref={groupRef}
      position={project.position}
      onPointerEnter={(e) => { e.stopPropagation(); setHovered(true);  document.body.style.cursor = 'pointer' }}
      onPointerLeave={()  => {                      setHovered(false); document.body.style.cursor = 'auto'    }}
      onClick={handleClick}
    >
      {/* Card background */}
      <mesh ref={bgRef}>
        <planeGeometry args={[W, H]} />
        <meshStandardMaterial
          color={project.color}
          emissive={project.color}
          emissiveIntensity={0.06}
          transparent opacity={0.06}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Top accent bar */}
      <mesh position={[0, H / 2 - 0.09, 0.008]}>
        <planeGeometry args={[W, 0.15]} />
        <meshBasicMaterial color={project.color} transparent opacity={0.82} />
      </mesh>

      <CardBorder color={project.color} hovered={hovered} />

      {/* Title */}
      <Text
        position={[0, 0.60, 0.02]}
        fontSize={0.24}
        color="#f8fafc"
        anchorX="center"
        anchorY="middle"
        maxWidth={W - 0.35}
      >
        {project.title}
      </Text>

      {/* Subtitle */}
      <Text
        position={[0, 0.27, 0.02]}
        fontSize={0.115}
        color={project.color}
        anchorX="center"
        anchorY="middle"
        maxWidth={W - 0.45}
      >
        {project.subtitle}
      </Text>

      {/* Thin divider */}
      <mesh position={[0, 0.09, 0.02]}>
        <planeGeometry args={[W - 0.55, 0.005]} />
        <meshBasicMaterial color={project.ringColor} transparent opacity={0.48} />
      </mesh>

      {/* Tech row 1 */}
      {tags1.map((t, i) => (
        <Text
          key={t}
          position={[-1.08 + i * 1.08, -0.10, 0.02]}
          fontSize={0.096}
          color={project.ringColor}
          anchorX="center"
          anchorY="middle"
        >
          {t}
        </Text>
      ))}

      {/* Tech row 2 */}
      {tags2.map((t, i) => (
        <Text
          key={t}
          position={[-1.08 + i * 1.08, -0.29, 0.02]}
          fontSize={0.096}
          color={project.ringColor}
          anchorX="center"
          anchorY="middle"
        >
          {t}
        </Text>
      ))}

      {/* CTA hint */}
      <Text
        position={[0, -0.78, 0.02]}
        fontSize={0.088}
        color={hovered ? '#ffffff' : '#475569'}
        anchorX="center"
        anchorY="middle"
      >
        {hovered ? '[ Click to explore ]' : '[ Hover to preview ]'}
      </Text>

      {hovered && <pointLight color={project.color} intensity={3.5} distance={5} />}
    </group>
  )
}

export default function GalaxyWorld({ position }) {
  return (
    <group position={position}>
      <AmbientDust />

      {PROJECTS.map((p, i) => (
        <Float key={i} speed={0.65} floatIntensity={0.25} rotationIntensity={0.04}>
          <ProjectCard project={p} />
        </Float>
      ))}

      <pointLight color="#8b5cf6" intensity={1.0} distance={22} position={[ 0,  3,  0]} />
      <pointLight color="#f97316" intensity={0.7} distance={16} position={[ 5, -1,  2]} />
      <pointLight color="#00f5ff" intensity={0.5} distance={16} position={[-5,  1, -2]} />
    </group>
  )
}
