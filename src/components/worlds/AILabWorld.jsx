import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Grid, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Neural network node
function NeuralNode({ position, color = '#00f5ff', size = 0.12 }) {
  const ref = useRef()
  const phase = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const intensity = 0.5 + Math.sin(t * 2 + phase) * 0.5
    ref.current.material.emissiveIntensity = intensity * 3
  })

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
    </mesh>
  )
}

// Synapse connection between nodes
function Synapse({ start, end, color = '#00f5ff' }) {
  const ref = useRef()
  const phase = useMemo(() => Math.random() * Math.PI * 2, [])

  const { midPoint, length, quaternion } = useMemo(() => {
    const s = new THREE.Vector3(...start)
    const e = new THREE.Vector3(...end)
    const mid = s.clone().add(e).multiplyScalar(0.5)
    const dir = e.clone().sub(s)
    const len = dir.length()
    const q = new THREE.Quaternion()
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize())
    return { midPoint: mid, length: len, quaternion: q }
  }, [start, end])

  useFrame((state) => {
    const pulse = 0.3 + Math.sin(state.clock.elapsedTime * 3 + phase) * 0.3
    ref.current.material.opacity = pulse
  })

  return (
    <mesh ref={ref} position={midPoint} quaternion={quaternion}>
      <cylinderGeometry args={[0.004, 0.004, length, 4]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} transparent opacity={0.4} />
    </mesh>
  )
}

// Holographic floating panel
function HoloPanel({ position, rotation = [0, 0, 0], color = '#00f5ff', w = 2, h = 1.2 }) {
  const ref = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    ref.current.material.opacity = 0.06 + Math.sin(t * 1.5) * 0.02
  })

  return (
    <group position={position} rotation={rotation}>
      {/* Panel face */}
      <mesh ref={ref}>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial color={color} transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
      {/* Border frame */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(w, h)]} />
        <lineBasicMaterial color={color} transparent opacity={0.6} />
      </lineSegments>
      {/* Corner accents */}
      {[[-w / 2, -h / 2], [w / 2, -h / 2], [-w / 2, h / 2], [w / 2, h / 2]].map(([cx, cy], i) => (
        <mesh key={i} position={[cx, cy, 0]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
        </mesh>
      ))}
    </group>
  )
}

// Rotating brain / neural network cluster
function NeuralBrain() {
  const groupRef = useRef()

  const nodes = useMemo(() => {
    const layers = [
      { count: 3, x: -2, color: '#8b5cf6' },
      { count: 5, x: -0.8, color: '#00f5ff' },
      { count: 4, x: 0.4, color: '#06b6d4' },
      { count: 5, x: 1.6, color: '#00f5ff' },
      { count: 3, x: 2.8, color: '#8b5cf6' },
    ]
    const all = []
    layers.forEach((layer) => {
      for (let i = 0; i < layer.count; i++) {
        const y = (i - (layer.count - 1) / 2) * 0.9
        all.push({ pos: [layer.x, y, 0], color: layer.color, layer: layer.x })
      }
    })
    return all
  }, [])

  const connections = useMemo(() => {
    const conns = []
    const layers = [-2, -0.8, 0.4, 1.6, 2.8]
    for (let l = 0; l < layers.length - 1; l++) {
      const srcNodes = nodes.filter(n => n.layer === layers[l])
      const dstNodes = nodes.filter(n => n.layer === layers[l + 1])
      srcNodes.forEach(src => {
        dstNodes.forEach((dst, di) => {
          if (di % 2 === 0 || srcNodes.indexOf(src) % 2 === 0) {
            conns.push({ start: src.pos, end: dst.pos, color: '#00f5ff' })
          }
        })
      })
    }
    return conns
  }, [nodes])

  useFrame((_, delta) => {
    groupRef.current.rotation.y += delta * 0.15
  })

  return (
    <group ref={groupRef}>
      {nodes.map((n, i) => <NeuralNode key={i} position={n.pos} color={n.color} />)}
      {connections.map((c, i) => <Synapse key={i} start={c.start} end={c.end} color={c.color} />)}
    </group>
  )
}

// Scanning beam
function ScanBeam() {
  const ref = useRef()

  useFrame((state) => {
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 4
    ref.current.material.opacity = 0.04 + Math.abs(Math.sin(state.clock.elapsedTime * 0.8)) * 0.06
  })

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 0.3]} />
      <meshStandardMaterial color="#00f5ff" transparent opacity={0.06} side={THREE.DoubleSide} />
    </mesh>
  )
}

export default function AILabWorld({ position }) {
  return (
    <group position={position}>
      {/* Grid floor */}
      <Grid
        position={[0, -5, 0]}
        args={[30, 30]}
        cellSize={1}
        cellThickness={0.4}
        cellColor="#8b5cf6"
        sectionSize={5}
        sectionThickness={0.8}
        sectionColor="#00f5ff"
        fadeDistance={20}
        fadeStrength={1.5}
        infiniteGrid
      />

      {/* Neural network brain */}
      <Float speed={0.8} floatIntensity={0.3} rotationIntensity={0.1}>
        <group position={[0, 1.5, -2]}>
          <NeuralBrain />
        </group>
      </Float>

      {/* Holographic panels */}
      <Float speed={1.2} floatIntensity={0.4}>
        <HoloPanel position={[-5, 0, 1]} rotation={[0, 0.4, 0]} color="#00f5ff" w={3} h={2} />
      </Float>
      <Float speed={0.9} floatIntensity={0.35}>
        <HoloPanel position={[5, -0.5, 0]} rotation={[0, -0.4, 0]} color="#8b5cf6" w={2.5} h={1.8} />
      </Float>
      <Float speed={1.1} floatIntensity={0.25}>
        <HoloPanel position={[0, 4, -1]} rotation={[0.2, 0, 0]} color="#06b6d4" w={4} h={1} />
      </Float>

      {/* Scanning beam */}
      <ScanBeam />

      {/* Floating data spheres */}
      {[[-4, 2, 2], [4, 3, -3], [-3, -1, -4], [3, -2, 3]].map(([x, y, z], i) => (
        <Float key={i} speed={0.6 + i * 0.2} floatIntensity={0.5}>
          <mesh position={[x, y, z]}>
            <octahedronGeometry args={[0.15 + i * 0.05]} />
            <meshStandardMaterial
              color={['#00f5ff', '#8b5cf6', '#06b6d4', '#f59e0b'][i]}
              emissive={['#00f5ff', '#8b5cf6', '#06b6d4', '#f59e0b'][i]}
              emissiveIntensity={2}
              wireframe
            />
          </mesh>
        </Float>
      ))}

      {/* Lighting */}
      <pointLight color="#00f5ff" intensity={2} distance={18} position={[0, 3, 0]} />
      <pointLight color="#8b5cf6" intensity={1.5} distance={15} position={[-5, 1, 2]} />
      <pointLight color="#06b6d4" intensity={1} distance={12} position={[5, -1, -3]} />
      <ambientLight intensity={0.08} />
    </group>
  )
}
