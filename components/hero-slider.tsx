'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { heroSlides, studio } from '@/lib/site-data'

export function HeroSlider() {
  const [active, setActive] = useState(0)
  const count = heroSlides.length

  const go = useCallback((next: number) => setActive((next + count) % count), [count])

  useEffect(() => {
    const id = setInterval(() => setActive((v) => (v + 1) % count), 6000)
    return () => clearInterval(id)
  }, [count])

  return (
    <section id="top" className="relative h-screen min-h-[640px] w-full overflow-hidden">
      {heroSlides.map((slide, i) => (
        <div
          key={slide.subtitle}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ${i === active ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden={i !== active}
        >
          <div className={`relative h-full w-full ${i === active ? 'animate-kenburns' : ''}`}>
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
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-band-foreground">
        <span className="font-mono text-xs tracking-[0.4em] text-band-foreground/70">
          {heroSlides[active].subtitle}
        </span>
        <h1 className="mt-6 text-5xl font-light uppercase tracking-[0.25em] sm:text-6xl md:text-7xl">
          {studio.name}
        </h1>
        <div className="mt-6 flex items-center gap-4">
          <span className="h-px w-10 bg-band-foreground/40" />
          <span className="text-[0.7rem] uppercase tracking-[0.45em] text-band-foreground/80">
            {studio.tagline}
          </span>
          <span className="h-px w-10 bg-band-foreground/40" />
        </div>
      </div>

      {/* Arrows */}
      <button
        type="button"
        onClick={() => go(active - 1)}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 p-3 text-band-foreground/60 transition-colors hover:text-band-foreground md:left-8"
      >
        <ChevronLeft className="h-7 w-7" strokeWidth={1} />
      </button>
      <button
        type="button"
        onClick={() => go(active + 1)}
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
            onClick={() => setActive(i)}
            aria-label={`Show slide ${i + 1}`}
            aria-current={i === active}
            className={`h-2 w-2 rounded-full border border-band-foreground/70 transition-all ${i === active ? 'bg-band-foreground' : 'bg-transparent hover:bg-band-foreground/50'}`}
          />
        ))}
      </div>
    </section>
  )
}
