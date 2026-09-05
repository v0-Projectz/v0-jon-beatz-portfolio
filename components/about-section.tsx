'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { SectionHeading } from '@/components/section-heading'
import { stats, studio } from '@/lib/site-data'

function useCountUp(target: number, run: boolean) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!run) return
    let frame = 0
    const duration = 1400
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, run])
  return value
}

function Stat({ value, suffix, label, run }: { value: number; suffix: string; label: string; run: boolean }) {
  const count = useCountUp(value, run)
  return (
    <div className="flex flex-col gap-2 border-t border-border pt-5">
      <span className="text-4xl font-bold tracking-tight md:text-5xl">
        {count}
        <span className="text-primary">{suffix}</span>
      </span>
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
    </div>
  )
}

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [run, setRun] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="container-wide scroll-mt-24 py-24 md:py-32">
      <SectionHeading index="// 01" title="About" lead="Who we are" discipline="Media / Studio" />

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-6">
          <h3 className="text-balance text-2xl font-medium leading-snug md:text-3xl">
            {studio.name} is the studio of {studio.artist} — one room where music, video, and brand
            come from the same set of hands.
          </h3>
          <p className="max-w-xl leading-relaxed text-muted-foreground">
            We produce records, engineer mixes, direct videos, and design the identity that ties it
            all together. No hand-offs between five vendors, no telephone game — the person who hears
            the beat is the person who cuts the visual.
          </p>
          <p className="max-w-xl leading-relaxed text-muted-foreground">
            That means a consistent point of view from the first loop to the final master, the last
            frame, and the cover art. If it carries the {studio.artist} stamp, it moved us first.
          </p>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src="/images/about-studio.png"
            alt="Producer at a mixing console in a dark studio"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
        </div>
      </div>

      <div ref={ref} className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((s) => (
          <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} run={run} />
        ))}
      </div>
    </section>
  )
}
