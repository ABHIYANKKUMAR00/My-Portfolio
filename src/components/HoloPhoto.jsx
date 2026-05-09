import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, useTexture } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

/*
  Render order
    -1  StarField       depthTest=false  (always behind)
     0  ProfileDisc     depthWrite=true  — photo texture, same radius as inner orbit
                        → writes real depth; outer tilted orbits clip behind it correctly
     1  GlowRing        depthTest=true, depthWrite=false  — pulsing edge on photo boundary
     1  OrbitRings      depthTest=true, depthWrite=false
     1  Trail spheres   depthTest=true, depthWrite=false
     1  Node core       depthTest=true, depthWrite=true
     1  Node glow       depthTest=true, depthWrite=false
     1  Text labels     depthTest=true

  Camera: [0,0,7], fov=50, canvas=520px → 79.7 px/world-unit
  Inner orbit radius 1.78 WU = 142 px radius = 284 px diameter → photo fills exactly
*/

const CYAN = '#00f5ff'
const PURPLE = '#8a2be2'
const VIOLET = '#8966f2'
const TEAL = '#2dd4bf'

/* Inner orbit radius — photo fills to this exact boundary */
const INNER_R = 1.78

const ORBITS = [
  {
    radius: INNER_R, tiltX: 0, tiltY: 0,
    color: CYAN, opacity: 0.55,
    nodes: [
      { skill: 'React', color: CYAN, speed: 0.60, offset: 0 },
      { skill: 'Python', color: VIOLET, speed: 0.60, offset: Math.PI },
    ],
  },
  {
    radius: 2.40, tiltX: Math.PI * 0.40, tiltY: 0,
    color: PURPLE, opacity: 0.42,
    nodes: [
      { skill: 'Node.js', color: PURPLE, speed: 0.60, offset: Math.PI / 4 },
      { skill: 'LangChain', color: TEAL, speed: 0.60, offset: Math.PI + Math.PI / 4 },
    ],
  },
  {
    radius: 2.85, tiltX: Math.PI * 0.20, tiltY: Math.PI * 0.16,
    color: CYAN, opacity: 0.30,
    nodes: [
      { skill: 'AI/ML', color: CYAN, speed: 0.60, offset: Math.PI / 6 },
      { skill: 'n8n Automation', color: VIOLET, speed: 0.60, offset: Math.PI + Math.PI / 6 },
    ],
  },
]

/* ─────────────────────────────────────────────────
   Profile photo disc — radius = INNER_R = inner orbit
   UV mapping replicates: objectFit:cover objectPosition:50% 18%
───────────────────────────────────────────────── */
function ProfileDisc() {
  const texture = useTexture('/abhiyank.jpeg', (tex) => {
    const img = tex.image
    const w = img.naturalWidth || img.width || 1
    const h = img.naturalHeight || img.height || 1
    const aspect = w / h   // < 1 for portrait

    if (aspect < 1) {
      /*
        Portrait: scale so width fills the circle.
        Visible UV v-range = [offset_v, offset_v + aspect].
        objectPosition y=18% from top: with flipY=true, top of image = UV v=1,
        so offset_v = (1 - aspect) * (1 - 0.18) = (1-aspect) * 0.82
      */
      tex.repeat.set(1, aspect)
      tex.offset.set(0, (1 - aspect) * 0.82)
    } else {
      /* Landscape: scale so height fills the circle, center horizontally */
      const rx = aspect
      tex.repeat.set(1 / rx, 1)
      tex.offset.set((1 - 1 / rx) / 2, 0)
    }

    tex.wrapS = THREE.ClampToEdgeWrapping
    tex.wrapT = THREE.ClampToEdgeWrapping
    tex.needsUpdate = true
  })

  return (
    <mesh renderOrder={0}>
      <circleGeometry args={[INNER_R, 128]} />
      {/* depthWrite=true so outer tilted orbits still occlude correctly */}
      <meshBasicMaterial map={texture} color="#b4b1b1" depthWrite={true} depthTest={true} />
    </mesh>
  )
}

/* ─────────────────────────────────────────────────
   Pulsing glow ring exactly at the photo boundary
───────────────────────────────────────────────── */
function GlowRing() {
  const ref = useRef()

  useFrame(({ clock }) => {
    const t = Math.sin(clock.getElapsedTime() * 1.4) * 0.5 + 0.5
    if (ref.current) ref.current.material.opacity = 0.40 + t * 0.45
  })

  return (
    <mesh ref={ref} renderOrder={1}>
      <torusGeometry args={[INNER_R, 0.022, 16, 128]} />
      <meshBasicMaterial
        color={CYAN} transparent opacity={0.65}
        depthTest={true} depthWrite={false}
      />
    </mesh>
  )
}

/* ─────────────────────────────────────────────────
   Static orbit ring
───────────────────────────────────────────────── */
function OrbitRing({ radius, tiltX, tiltY, color, opacity }) {
  return (
    <mesh renderOrder={1} rotation={[tiltX, tiltY, 0]}>
      <torusGeometry args={[radius, 0.007, 8, 200]} />
      <meshBasicMaterial
        color={color} transparent opacity={opacity}
        depthTest={true} depthWrite={false}
      />
    </mesh>
  )
}

/* ─────────────────────────────────────────────────
   Skill node with comet trail — depth-occluded by photo
───────────────────────────────────────────────── */
const TRAIL_LEN = 6

function SkillNode({ skill, color, radius, tiltX, tiltY, speed, offset }) {
  const nodeRef = useRef()
  const trailRef = useRef([])
  const angle = useRef(offset)

  const cosX = Math.cos(tiltX), sinX = Math.sin(tiltX)
  const cosY = Math.cos(tiltY), sinY = Math.sin(tiltY)

  // Three.js Euler XYZ applies Ry first then Rx: R = Rx*Ry
  const orbPos = (a, out) => {
    const cA = Math.cos(a) * radius
    const sA = Math.sin(a) * radius
    out[0] = cosY * cA
    out[1] = cosX * sA + sinX * sinY * cA
    out[2] = sinX * sA - cosX * sinY * cA
  }

  const tmp = [0, 0, 0]

  useFrame((_, dt) => {
    angle.current += speed * dt
    orbPos(angle.current, tmp)
    nodeRef.current?.position.set(tmp[0], tmp[1], tmp[2])

    trailRef.current.forEach((m, i) => {
      if (!m) return
      orbPos(angle.current - (i + 1) * 0.22, tmp)
      m.position.set(tmp[0], tmp[1], tmp[2])
    })
  })

  return (
    <>
      {Array.from({ length: TRAIL_LEN }, (_, i) => (
        <mesh key={i} ref={el => { trailRef.current[i] = el }} renderOrder={1}>
          <sphereGeometry args={[Math.max(0.008, 0.042 - i * 0.006), 6, 6]} />
          <meshBasicMaterial
            color={color} transparent
            opacity={Math.max(0, 0.52 - i * 0.088)}
            depthTest={true} depthWrite={false}
          />
        </mesh>
      ))}

      <group ref={nodeRef}>
        <mesh renderOrder={1}>
          <sphereGeometry args={[0.10, 20, 20]} />
          <meshBasicMaterial color={color} depthTest={true} depthWrite={true} />
        </mesh>
        <mesh renderOrder={1}>
          <sphereGeometry args={[0.22, 12, 12]} />
          <meshBasicMaterial
            color={color} transparent opacity={0.09}
            depthTest={true} depthWrite={false}
          />
        </mesh>
        <Text
          renderOrder={1}
          position={[0, 0.24, 0]}
          fontSize={0.13}
          color={color}
          anchorX="center"
          anchorY="bottom"
          depthTest={true}
        >
          {skill}
        </Text>
      </group>
    </>
  )
}

/* ─────────────────────────────────────────────────
   Background star field
───────────────────────────────────────────────── */
function StarField() {
  const ref = useRef()
  const pos = useMemo(() => {
    const n = 240, arr = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const r = 3.2 + Math.random() * 2.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.05
  })

  return (
    <points ref={ref} renderOrder={-1}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={CYAN} size={0.016} sizeAttenuation
        transparent opacity={0.28}
        depthTest={false} depthWrite={false}
      />
    </points>
  )
}

/* ─────────────────────────────────────────────────
   Scene
───────────────────────────────────────────────── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.18} />
      <pointLight color={CYAN} intensity={5} distance={7} position={[0, 2, 3]} />
      <pointLight color={PURPLE} intensity={3} distance={5} position={[-3, -1, 1]} />

      <StarField />
      <ProfileDisc />
      <GlowRing />

      {ORBITS.map((o, i) => (
        <group key={i} position={i === 2 ? [0.25, -0.25, 0] : undefined}>
          <OrbitRing
            radius={o.radius} tiltX={o.tiltX} tiltY={o.tiltY}
            color={o.color} opacity={o.opacity}
          />
          {o.nodes.map((n, j) => (
            <SkillNode
              key={j}
              skill={n.skill} color={n.color}
              radius={o.radius} tiltX={o.tiltX} tiltY={o.tiltY}
              speed={n.speed} offset={n.offset}
            />
          ))}
        </group>
      ))}
    </>
  )
}

/* ─────────────────────────────────────────────────
   HoloPhoto — pure Three.js, no DOM image layer
───────────────────────────────────────────────── */
export default function HoloPhoto({ size = 520 }) {
  const isMobile = size < 300
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
        dpr={isMobile ? 1 : [1, 2]}
      >
        <Scene />
      </Canvas>
    </motion.div>
  )
}
