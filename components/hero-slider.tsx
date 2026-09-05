'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { heroSlides } from '@/lib/site-data'

export function HeroSlider() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive((v) => (v + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="top" className="relative h-screen min-h-[640px] w-full overflow-hidden">
      {heroSlides.map((slide, i) => (
        <div
          key={slide.subtitle}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === active ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden={i !== active}
        >
          <Image
            src={slide.image || '/placeholder.svg'}
            alt={slide.alt}
            fill
            priority={i === 0}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/30" />
        </div>
      ))}

      <div className="container-wide relative flex h-full flex-col justify-end pb-20">
        <span className="font-mono text-sm tracking-[0.3em] text-primary">
          {heroSlides[active].kicker}
        </span>
        <h1 className="mt-4 text-balance text-6xl font-bold tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl">
          {heroSlides[active].title}
        </h1>
        <p className="mt-2 max-w-xl text-pretty text-xl text-muted-foreground md:text-2xl">
          {heroSlides[active].subtitle}
        </p>

        <div className="mt-10 flex items-center gap-4">
          {heroSlides.map((slide, i) => (
            <button
              key={slide.subtitle}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show slide ${i + 1}: ${slide.subtitle}`}
              className="group flex items-center gap-2"
            >
              <span
                className={`h-px transition-all duration-500 ${i === active ? 'w-12 bg-primary' : 'w-6 bg-border group-hover:bg-muted-foreground'}`}
              />
              <span
                className={`font-mono text-xs ${i === active ? 'text-primary' : 'text-muted-foreground'}`}
              >
                0{i + 1}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
