import { useEffect, useRef } from 'react'

/* Constellation: slow-moving particles with faint connecting lines */
function ConstellationCanvas() {
  const canvasRef = useRef()
  const animRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)

    const COUNT = W < 768 ? 30 : 65
    const MAX_DIST = W < 768 ? 90 : 130

    const pts = Array.from({ length: COUNT }, () => {
      const rnd = Math.random()
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.11,
        vy: (Math.random() - 0.5) * 0.11,
        r: Math.random() * 1.1 + 0.4,
        hue: rnd > 0.65 ? '#06b6d4' : rnd > 0.4 ? '#8b5cf6' : rnd > 0.2 ? '#a78bfa' : '#e2e8f0',
        alpha: Math.random() * 0.35 + 0.22,
      }
    })

    const tick = () => {
      ctx.clearRect(0, 0, W, H)

      pts.forEach(p => {
        p.x = ((p.x + p.vx) + W) % W
        p.y = ((p.y + p.vy) + H) % H
      })

      // constellation lines
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d2 = dx * dx + dy * dy
          if (d2 < MAX_DIST * MAX_DIST) {
            const frac = Math.sqrt(d2) / MAX_DIST
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(139,92,246,${(1 - frac) * 0.11})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // particles with soft glow
      pts.forEach(p => {
        ctx.save()
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5)
        g.addColorStop(0, p.hue + '44')
        g.addColorStop(1, 'transparent')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.hue
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      animRef.current = requestAnimationFrame(tick)
    }

    tick()

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  )
}

export default function SpaceBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Deep space gradient base */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 150% 90% at 65% -5%, #0d0726 0%, #030014 52%)',
      }} />

      {/* Ambient gradient orbs */}
      <div className="sp-orb sp-orb-1" />
      <div className="sp-orb sp-orb-2" />
      <div className="sp-orb sp-orb-3" />
      <div className="sp-orb sp-orb-4" />

      {/* Constellation particles + lines */}
      <ConstellationCanvas />

      {/* High-density static star dots */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: [
          'radial-gradient(1px 1px at 10% 15%, rgba(255,255,255,0.6) 0%, transparent 100%)',
          'radial-gradient(1px 1px at 25% 60%, rgba(255,255,255,0.4) 0%, transparent 100%)',
          'radial-gradient(1.5px 1.5px at 40% 30%, rgba(255,255,255,0.5) 0%, transparent 100%)',
          'radial-gradient(1px 1px at 55% 75%, rgba(255,255,255,0.45) 0%, transparent 100%)',
          'radial-gradient(1px 1px at 70% 20%, rgba(255,255,255,0.6) 0%, transparent 100%)',
          'radial-gradient(1.5px 1.5px at 80% 50%, rgba(255,255,255,0.4) 0%, transparent 100%)',
          'radial-gradient(1px 1px at 90% 85%, rgba(255,255,255,0.55) 0%, transparent 100%)',
          'radial-gradient(1px 1px at 15% 85%, rgba(255,255,255,0.35) 0%, transparent 100%)',
          'radial-gradient(1px 1px at 60% 45%, rgba(255,255,255,0.45) 0%, transparent 100%)',
          'radial-gradient(1px 1px at 35% 10%, rgba(255,255,255,0.55) 0%, transparent 100%)',
          'radial-gradient(1px 1px at 75% 90%, rgba(255,255,255,0.4) 0%, transparent 100%)',
          'radial-gradient(1px 1px at 5% 40%, rgba(255,255,255,0.5) 0%, transparent 100%)',
          'radial-gradient(1.5px 1.5px at 45% 65%, rgba(139,92,246,0.5) 0%, transparent 100%)',
          'radial-gradient(1px 1px at 88% 35%, rgba(6,182,212,0.45) 0%, transparent 100%)',
          'radial-gradient(1px 1px at 20% 50%, rgba(255,255,255,0.35) 0%, transparent 100%)',
          'radial-gradient(1px 1px at 65% 8%, rgba(255,255,255,0.5) 0%, transparent 100%)',
          'radial-gradient(1px 1px at 95% 60%, rgba(255,255,255,0.45) 0%, transparent 100%)',
          'radial-gradient(1px 1px at 50% 95%, rgba(255,255,255,0.35) 0%, transparent 100%)',
          'radial-gradient(1.5px 1.5px at 30% 40%, rgba(255,255,255,0.55) 0%, transparent 100%)',
          'radial-gradient(1px 1px at 82% 70%, rgba(255,255,255,0.4) 0%, transparent 100%)',
          'radial-gradient(1px 1px at 3% 72%, rgba(255,255,255,0.3) 0%, transparent 100%)',
          'radial-gradient(1px 1px at 48% 22%, rgba(6,182,212,0.35) 0%, transparent 100%)',
          'radial-gradient(1px 1px at 92% 14%, rgba(255,255,255,0.5) 0%, transparent 100%)',
          'radial-gradient(1.5px 1.5px at 17% 33%, rgba(167,139,250,0.45) 0%, transparent 100%)',
          'radial-gradient(1px 1px at 58% 55%, rgba(255,255,255,0.3) 0%, transparent 100%)',
          'radial-gradient(1px 1px at 72% 78%, rgba(255,255,255,0.38) 0%, transparent 100%)',
          'radial-gradient(1px 1px at 37% 88%, rgba(139,92,246,0.3) 0%, transparent 100%)',
          'radial-gradient(1.5px 1.5px at 85% 12%, rgba(6,182,212,0.35) 0%, transparent 100%)',
        ].join(','),
      }} />

      {/* Neon horizontal light trails */}
      <div className="sp-trail sp-trail-1" />
      <div className="sp-trail sp-trail-2" />
      <div className="sp-trail sp-trail-3" />

      {/* Mini decorative planets */}
      <div className="sp-planet sp-planet-1"><div className="sp-ring" /></div>
      <div className="sp-planet sp-planet-2"><div className="sp-ring sp-ring-alt" /></div>
      <div className="sp-planet sp-planet-3" />

      {/* Distant holographic ring silhouettes */}
      <div className="sp-holo sp-holo-1" />
      <div className="sp-holo sp-holo-2" />
      <div className="sp-holo sp-holo-3" />
    </div>
  )
}
