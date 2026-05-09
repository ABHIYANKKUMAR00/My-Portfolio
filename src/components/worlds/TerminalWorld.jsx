import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

// Scanlines overlay mesh
function Scanlines() {
  const ref = useRef()
  useFrame((_, delta) => {
    ref.current.position.y -= delta * 1.5
    if (ref.current.position.y < -6) ref.current.position.y = 6
  })

  const count = 40
  const { positions } = useMemo(() => {
    const pos = new Float32Array(count * 6)
    for (let i = 0; i < count; i++) {
      const y = -6 + i * 0.3
      pos[i * 6 + 0] = -12; pos[i * 6 + 1] = y; pos[i * 6 + 2] = 0
      pos[i * 6 + 3] = 12; pos[i * 6 + 4] = y; pos[i * 6 + 5] = 0
    }
    return { positions: pos }
  }, [])

  return (
    <lineSegments ref={ref} position={[0, 0, 2]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#00ff88" transparent opacity={0.05} />
    </lineSegments>
  )
}

// Glitchy floating data streams
function DataStream({ xOffset, speed, color }) {
  const ref = useRef()
  const count = 30

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = xOffset + (Math.random() - 0.5) * 0.8
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4
    }
    return pos
  }, [xOffset])

  const posRef = useRef(positions.slice())

  useFrame((_, delta) => {
    for (let i = 0; i < count; i++) {
      posRef.current[i * 3 + 1] -= speed * delta
      if (posRef.current[i * 3 + 1] < -6) posRef.current[i * 3 + 1] = 6
    }
    ref.current.geometry.attributes.position.array.set(posRef.current)
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.06} transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

// 3D terminal screen frame
function TerminalFrame({ position, rotation = [0, 0, 0], w = 5, h = 3.5 }) {
  const ref = useRef()

  useFrame((state) => {
    const flicker = 0.88 + Math.sin(state.clock.elapsedTime * 8 + Math.random() * 0.5) * 0.02
    ref.current.material.opacity = flicker * 0.07
  })

  return (
    <group position={position} rotation={rotation}>
      {/* Screen bg */}
      <mesh ref={ref}>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial color="#00ff88" transparent opacity={0.07} side={THREE.DoubleSide} />
      </mesh>
      {/* Frame border */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(w, h)]} />
        <lineBasicMaterial color="#00ff88" transparent opacity={0.5} />
      </lineSegments>
      {/* Top bar */}
      <mesh position={[0, h / 2 - 0.18, 0.01]}>
        <planeGeometry args={[w, 0.35]} />
        <meshStandardMaterial color="#00ff88" transparent opacity={0.12} />
      </mesh>
      {/* Corner glows */}
      {[[-w / 2, -h / 2], [w / 2, -h / 2], [-w / 2, h / 2], [w / 2, h / 2]].map(([cx, cy], i) => (
        <mesh key={i} position={[cx, cy, 0]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={4} />
        </mesh>
      ))}
    </group>
  )
}

// Holographic grid floor
function CyberGrid() {
  return (
    <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[40, 40, 24, 24]} />
      <meshStandardMaterial color="#00ff88" transparent opacity={0.05} wireframe />
    </mesh>
  )
}

// Floating wireframe shapes
function FloatingShape({ position, speed = 1 }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.4
    ref.current.rotation.y = state.clock.elapsedTime * speed * 0.3
  })
  return (
    <Float speed={0.8} floatIntensity={0.4}>
      <mesh ref={ref} position={position}>
        <icosahedronGeometry args={[0.25, 1]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={1.5} wireframe />
      </mesh>
    </Float>
  )
}

export default function TerminalWorld({ position }) {
  return (
    <group position={position}>
      {/* Data streams */}
      <DataStream xOffset={-7} speed={3} color="#00ff88" />
      <DataStream xOffset={7} speed={2.5} color="#00f5ff" />
      <DataStream xOffset={-4} speed={4} color="#00ff88" />
      <DataStream xOffset={4} speed={3.5} color="#8b5cf6" />

      {/* Scanlines */}
      <Scanlines />

      {/* Terminal frames */}
      <Float speed={0.6} floatIntensity={0.2}>
        <TerminalFrame position={[-4.5, 1, -1]} rotation={[0, 0.3, 0]} w={5} h={3.5} />
      </Float>
      <Float speed={0.8} floatIntensity={0.15}>
        <TerminalFrame position={[4.5, 0.5, -1]} rotation={[0, -0.3, 0]} w={4} h={3} />
      </Float>
      <Float speed={0.5} floatIntensity={0.25}>
        <TerminalFrame position={[0, 4.5, -2]} rotation={[0.15, 0, 0]} w={7} h={1.2} />
      </Float>

      {/* Cyber grid floor */}
      <CyberGrid />

      {/* Floating wireframe shapes */}
      {[[-6, 2, 2], [6, 3, -3], [-2, -1, 3], [2, 4, 2], [-5, -2, -2]].map(([x, y, z], i) => (
        <FloatingShape key={i} position={[x, y, z]} speed={0.5 + i * 0.3} />
      ))}

      {/* Lighting - green hacker glow */}
      <pointLight color="#00ff88" intensity={2} distance={20} position={[0, 3, 0]} />
      <pointLight color="#00f5ff" intensity={1} distance={15} position={[-5, 0, 2]} />
      <pointLight color="#8b5cf6" intensity={0.5} distance={10} position={[5, 2, -3]} />
      <ambientLight intensity={0.06} color="#00ff44" />
    </group>
  )
}
