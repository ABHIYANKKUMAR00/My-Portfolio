import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

function FloatingParticles() {
  const ref = useRef()
  const { positions, colors } = useMemo(() => {
    const count = 500
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const palette = [new THREE.Color('#00f5ff'), new THREE.Color('#8a2be2'), new THREE.Color('#ffffff')]
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 9
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b
    }
    return { positions: pos, colors: col }
  }, [])

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.04
    ref.current.rotation.x += delta * 0.01
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

function OrbitingNode({ radius, speed, offsetAngle, color, tiltX = 0 }) {
  const ref = useRef()
  const angle = useRef(offsetAngle)

  useFrame((_, delta) => {
    angle.current += speed * delta
    const cos = Math.cos(angle.current)
    const sin = Math.sin(angle.current)
    ref.current.position.set(
      cos * radius,
      sin * Math.sin(tiltX) * radius,
      sin * Math.cos(tiltX) * radius
    )
  })

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.11, 12, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={4} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshStandardMaterial color={color} transparent opacity={0.12} />
      </mesh>
    </group>
  )
}

function OrbitRing({ radius, tiltX = 0, tiltZ = 0, color, opacity = 0.35 }) {
  return (
    <mesh rotation={[tiltX, 0, tiltZ]}>
      <torusGeometry args={[radius, 0.007, 8, 128]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} transparent opacity={opacity} />
    </mesh>
  )
}

const orbitNodes = [
  { radius: 2.4, speed: 0.55, offsetAngle: 0,             color: '#00f5ff', tiltX: 0     },
  { radius: 2.4, speed: 0.55, offsetAngle: Math.PI,        color: '#8b5cf6', tiltX: 0     },
  { radius: 3.3, speed: 0.32, offsetAngle: 0,             color: '#8b5cf6', tiltX: 1.1   },
  { radius: 3.3, speed: 0.32, offsetAngle: Math.PI,        color: '#10b981', tiltX: 1.1   },
  { radius: 3.9, speed: 0.19, offsetAngle: Math.PI / 2,   color: '#f59e0b', tiltX: -0.65 },
  { radius: 3.9, speed: 0.19, offsetAngle: Math.PI * 1.5, color: '#06b6d4', tiltX: -0.65 },
]

/* Hologram rings that sit behind the CSS photo — give it a 3D sci-fi feel */
function CenterHologram() {
  const outerRef = useRef()
  const innerRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    outerRef.current.rotation.z =  t * 0.38
    innerRef.current.rotation.z = -t * 0.55
    const pulse = 0.42 + Math.sin(t * 1.6) * 0.22
    outerRef.current.material.opacity = pulse * 0.65
    innerRef.current.material.opacity = pulse * 0.40
  })

  return (
    <group>
      <mesh ref={outerRef}>
        <torusGeometry args={[1.44, 0.009, 8, 140]} />
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.5} />
      </mesh>
      <mesh ref={innerRef}>
        <torusGeometry args={[1.22, 0.006, 8, 100]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.35} />
      </mesh>
      <pointLight color="#00f5ff" intensity={2.5} distance={5} position={[0, 0, 0.5]} />
      <pointLight color="#8b5cf6" intensity={1.2} distance={4} position={[0, 0, -0.5]} />
    </group>
  )
}

export default function HeroWorld({ position }) {
  return (
    <group position={position}>
      {/* Stars + particles span full scene */}
      <Stars radius={90} depth={60} count={7000} factor={4} saturation={0.05} fade speed={0.4} />
      <FloatingParticles />

      {/* Orbit system shifted to left — CSS photo tracks this same x offset */}
      <group position={[-2, 0, 0]}>
        <CenterHologram />
        <OrbitRing radius={2.4} color="#00f5ff" opacity={0.5} />
        <OrbitRing radius={3.3} color="#8b5cf6" tiltX={1.1} opacity={0.38} />
        <OrbitRing radius={3.9} color="#06b6d4" tiltX={-0.65} opacity={0.25} />
        {orbitNodes.map((n, i) => <OrbitingNode key={i} {...n} />)}
      </group>

      <pointLight color="#00f5ff" intensity={0.6} position={[-8, 4, -4]} distance={25} />
      <pointLight color="#8b5cf6" intensity={0.9} position={[4, -4, -6]} distance={25} />
    </group>
  )
}
