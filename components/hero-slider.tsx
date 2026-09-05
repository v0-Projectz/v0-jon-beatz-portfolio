'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Minus, Plus, Settings2, X } from 'lucide-react'
import { heroSlides, studio } from '@/lib/site-data'

type Transition = 'fade' | 'slide' | 'dip'

const TRANS_MS: Record<Transition, number> = { fade: 1200, dip: 1350, slide: 950 }

const MIN_SECONDS = 2
const MAX_SECONDS = 15
const DEFAULT_SECONDS = 6

const TRANSITIONS: { value: Transition; label: string }[] = [
  { value: 'fade', label: 'Cross Fade' },
  { value: 'slide', label: 'Slide' },
  { value: 'dip', label: 'Dip to Black' },
]
const PRESETS: { label: string; seconds: number }[] = [
  { label: 'Slow', seconds: 9 },
  { label: 'Normal', seconds: 6 },
  { label: 'Fast', seconds: 3 },
]

export function HeroSlider() {
  const count = heroSlides.length

  const [active, setActive] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [dir, setDir] = useState(1)
  const [phase, setPhase] = useState<'idle' | 'start' | 'run'>('idle')
  const [mounted, setMounted] = useState(false)

  const [transition, setTransition] = useState<Transition>('fade')
  const [kenBurns, setKenBurns] = useState(true)
  const [autoplay, setAutoplay] = useState(true)
  const [seconds, setSeconds] = useState(DEFAULT_SECONDS)
  const [menuOpen, setMenuOpen] = useState(false)

  const speedMs = seconds * 1000
  const setClampedSeconds = (v: number) => setSeconds(Math.min(MAX_SECONDS, Math.max(MIN_SECONDS, v)))

  // Double rAF guarantees the initial scale(1) is committed and painted before
  // we flip to scale(1.12), so the very first slide's Ken Burns zoom animates
  // on load instead of snapping straight to the zoomed state.
  useEffect(() => {
    let r2 = 0
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setMounted(true))
    })
    return () => {
      cancelAnimationFrame(r1)
      cancelAnimationFrame(r2)
    }
  }, [])

  const change = useCallback(
    (direction: number, target?: number) => {
      setActive((cur) => {
        const next = target != null ? (target + count) % count : (cur + direction + count) % count
        if (next === cur) return cur
        setPrev(cur)
        setDir(direction)
        setPhase((p) => (transition === 'slide' ? 'start' : p))
        return next
      })
    },
    [count, transition],
  )

  // Autoplay — a self-re-arming timeout keyed on `active` so the countdown
  // fully resets whenever the slide changes, including manual next/prev/dot
  // clicks. Each slide gets its complete duration on screen no matter how you
  // arrived at it (rather than inheriting the previous slide's leftover time).
  useEffect(() => {
    if (!autoplay) return
    const id = setTimeout(() => change(1), speedMs)
    return () => clearTimeout(id)
  }, [autoplay, speedMs, change, active])

  // Slide needs an off-screen "start" frame before it animates in
  useEffect(() => {
    if (phase !== 'start') return
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setPhase('run')))
    return () => cancelAnimationFrame(r)
  }, [phase, active])

  // Clear the outgoing slide once the transition finishes
  useEffect(() => {
    if (prev === null) return
    const id = setTimeout(() => {
      setPrev(null)
      setPhase('idle')
    }, TRANS_MS[transition])
    return () => clearTimeout(id)
  }, [prev, active, transition])

  const outerStyle = (i: number): React.CSSProperties => {
    const isActive = i === active
    const isPrev = i === prev

    if (transition === 'slide') {
      let x = dir > 0 ? '100%' : '-100%' // parked off-screen
      if (isActive) x = phase === 'start' ? (dir > 0 ? '100%' : '-100%') : '0%'
      else if (isPrev) x = phase === 'run' ? (dir > 0 ? '-100%' : '100%') : '0%'
      const dur = phase === 'start' ? 0 : TRANS_MS.slide
      return {
        transform: `translateX(${x})`,
        opacity: isActive || isPrev ? 1 : 0,
        transition: `transform ${dur}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${dur}ms ease`,
      }
    }

    if (transition === 'dip') {
      if (isActive) {
        return {
          opacity: 1,
          transition: `opacity 650ms ease ${prev !== null ? 550 : 0}ms`,
        }
      }
      if (isPrev) return { opacity: 0, transition: 'opacity 550ms ease' }
      return { opacity: 0, transition: 'opacity 0ms' }
    }

    // fade
    return { opacity: isActive ? 1 : 0, transition: `opacity ${TRANS_MS.fade}ms ease` }
  }

  const innerStyle = (i: number): React.CSSProperties => {
    const zoomed = kenBurns && mounted && (i === active || i === prev)
    return {
      transform: `scale(${zoomed ? 1.12 : 1})`,
      transition: `transform ${kenBurns ? speedMs : 0}ms linear`,
    }
  }

  return (
    <section id="top" className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-scrim">
      {heroSlides.map((slide, i) => (
        <div key={slide.subtitle} className="absolute inset-0" style={outerStyle(i)} aria-hidden={i !== active}>
          <div className="relative h-full w-full will-change-transform" style={innerStyle(i)}>
            <Image
              src={slide.image || '/placeholder.svg'}
              alt={slide.alt}
              fill
              priority={i === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-scrim/55" />
        </div>
      ))}

      {/* Centered title */}
      <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-band-foreground">
        <span className="font-mono text-[0.65rem] tracking-[0.35em] text-band-foreground/70 sm:text-xs sm:tracking-[0.4em]">
          {heroSlides[active].subtitle}
        </span>
        <h1 className="mt-5 max-w-full text-balance text-3xl font-light uppercase tracking-[0.12em] sm:mt-6 sm:text-5xl sm:tracking-[0.2em] md:text-7xl md:tracking-[0.25em]">
          {studio.name}
        </h1>
        <div className="mt-5 flex items-center gap-3 sm:mt-6 sm:gap-4">
          <span className="h-px w-6 bg-band-foreground/40 sm:w-10" />
          <span className="text-[0.6rem] uppercase tracking-[0.3em] text-band-foreground/80 sm:text-[0.7rem] sm:tracking-[0.45em]">
            {studio.tagline}
          </span>
          <span className="h-px w-6 bg-band-foreground/40 sm:w-10" />
        </div>
      </div>

      {/* Arrows */}
      <button
        type="button"
        onClick={() => change(-1)}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 p-3 text-band-foreground/60 transition-colors hover:text-band-foreground md:left-8"
      >
        <ChevronLeft className="h-7 w-7" strokeWidth={1} />
      </button>
      <button
        type="button"
        onClick={() => change(1)}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 p-3 text-band-foreground/60 transition-colors hover:text-band-foreground md:right-8"
      >
        <ChevronRight className="h-7 w-7" strokeWidth={1} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.subtitle}
            type="button"
            onClick={() => change(i >= active ? 1 : -1, i)}
            aria-label={`Show slide ${i + 1}`}
            aria-current={i === active}
            className={`h-2 w-2 rounded-full border border-band-foreground/70 transition-all ${i === active ? 'bg-band-foreground' : 'bg-transparent hover:bg-band-foreground/50'}`}
          />
        ))}
      </div>

      {/* Settings picker */}
      <div className="absolute bottom-8 right-6 z-30 md:bottom-10 md:right-8">
        {menuOpen && (
          <>
            <button
              type="button"
              aria-label="Close slider settings"
              className="fixed inset-0 z-0 cursor-default"
              onClick={() => setMenuOpen(false)}
            />
            <div
              role="dialog"
              aria-label="Slider settings"
              className="relative z-10 mb-3 max-h-[70vh] w-[min(16rem,calc(100vw-3rem))] overflow-y-auto border border-band-foreground/20 bg-scrim/85 p-5 text-band-foreground backdrop-blur-md"
            >
              <PickerGroup label="Transition">
                {TRANSITIONS.map((t) => (
                  <Pill key={t.value} active={transition === t.value} onClick={() => setTransition(t.value)}>
                    {t.label}
                  </Pill>
                ))}
              </PickerGroup>

              <PickerGroup label="Ken Burns Zoom">
                <Pill active={kenBurns} onClick={() => setKenBurns(true)}>
                  On
                </Pill>
                <Pill active={!kenBurns} onClick={() => setKenBurns(false)}>
                  Off
                </Pill>
              </PickerGroup>

              <PickerGroup label="Autoplay">
                <Pill active={autoplay} onClick={() => setAutoplay(true)}>
                  On
                </Pill>
                <Pill active={!autoplay} onClick={() => setAutoplay(false)}>
                  Off
                </Pill>
              </PickerGroup>

              <PickerGroup label={`Duration — ${seconds}s`}>
                {PRESETS.map((p) => (
                  <Pill key={p.label} active={seconds === p.seconds} onClick={() => setSeconds(p.seconds)}>
                    {p.label}
                  </Pill>
                ))}
              </PickerGroup>

              <div className="mb-1 flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Decrease duration by one second"
                  onClick={() => setClampedSeconds(seconds - 1)}
                  className="flex h-7 w-7 shrink-0 items-center justify-center border border-band-foreground/25 text-band-foreground/70 transition-colors hover:border-band-foreground/50 hover:text-band-foreground"
                >
                  <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                </button>
                <input
                  type="range"
                  min={MIN_SECONDS}
                  max={MAX_SECONDS}
                  step={0.5}
                  value={seconds}
                  onChange={(e) => setClampedSeconds(Number(e.target.value))}
                  aria-label="Seconds between slides"
                  className="hero-range h-1 flex-1 cursor-pointer appearance-none rounded-full bg-band-foreground/25"
                />
                <button
                  type="button"
                  aria-label="Increase duration by one second"
                  onClick={() => setClampedSeconds(seconds + 1)}
                  className="flex h-7 w-7 shrink-0 items-center justify-center border border-band-foreground/25 text-band-foreground/70 transition-colors hover:border-band-foreground/50 hover:text-band-foreground"
                >
                  <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                </button>
              </div>
              <div className="flex justify-between font-mono text-[0.55rem] uppercase tracking-[0.2em] text-band-foreground/40">
                <span>{MIN_SECONDS}s</span>
                <span>{MAX_SECONDS}s</span>
              </div>
            </div>
          </>
        )}

        <button
          type="button"
          aria-label="Slider settings"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="relative z-10 ml-auto flex h-11 w-11 items-center justify-center border border-band-foreground/30 bg-scrim/60 text-band-foreground/80 backdrop-blur-md transition-colors hover:border-band-foreground/60 hover:text-band-foreground"
        >
          {menuOpen ? <X className="h-5 w-5" strokeWidth={1.25} /> : <Settings2 className="h-5 w-5" strokeWidth={1.25} />}
        </button>
      </div>
    </section>
  )
}

function PickerGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 last:mb-0">
      <p className="mb-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-band-foreground/50">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`border px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.15em] transition-colors ${
        active
          ? 'border-accent bg-accent text-accent-foreground'
          : 'border-band-foreground/25 text-band-foreground/70 hover:border-band-foreground/50 hover:text-band-foreground'
      }`}
    >
      {children}
    </button>
  )
}
