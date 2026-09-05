'use client'

import { useEffect, useRef, useState } from 'react'
import { stats } from '@/lib/site-data'

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement | null>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1600
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setDisplay(Math.round(eased * value))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [value])

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  )
}

export function StatsBand() {
  return (
    <section
      className="parallax-fixed relative bg-band py-24 text-band-foreground md:py-32"
      style={{ backgroundImage: "url('/images/hero-video.png')" }}
      aria-label="Studio by the numbers"
    >
      <div className="absolute inset-0 bg-scrim/70" />
      <div className="container-wide relative">
        <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <span className="text-5xl font-extralight md:text-6xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="mt-3 h-px w-8 bg-accent" />
              <span className="mt-3 text-[0.65rem] uppercase tracking-[0.3em] text-band-foreground/70">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
