'use client'

import Image from 'next/image'
import { Maximize2 } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { useLightbox, type LightboxSlide } from '@/components/lightbox'
import { works } from '@/lib/site-data'

export function WorksSection() {
  const { open } = useLightbox()

  const gallery: LightboxSlide[] = works.map((w) => ({
    src: w.image,
    alt: w.name,
    caption: w.name,
    meta: `// ${w.id} / ${w.category}`,
  }))

  return (
    <section id="works" className="scroll-mt-20 bg-background pb-24 md:pb-32">
      <div className="container-wide">
        <SectionHeading index="// 03" ghost="Works" title="Full Works" />
      </div>

      <div className="flex flex-col">
        {works.map((work, i) => {
          const reversed = i % 2 === 1
          return (
            <div
              key={work.id}
              className="container-wide grid items-center gap-8 py-8 md:grid-cols-2 md:gap-16 md:py-12"
            >
              <Reveal className={reversed ? 'md:order-2' : ''}>
                <button
                  type="button"
                  onClick={() => open(gallery, i)}
                  aria-label={`Open ${work.name} in lightbox`}
                  className="group relative block aspect-[4/3] w-full overflow-hidden bg-band"
                >
                  <Image
                    src={work.image || '/placeholder.svg'}
                    alt={work.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-scrim/0 transition-colors duration-500 group-hover:bg-scrim/40">
                    <Maximize2 className="h-6 w-6 text-band-foreground opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </span>
                </button>
              </Reveal>

              <Reveal delay={120} className={reversed ? 'md:order-1' : ''}>
                <div className={reversed ? 'md:text-right' : ''}>
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-accent">
                    {`// ${work.id} / ${work.name}`}
                  </span>
                  <h3 className="mt-3 text-2xl font-light uppercase tracking-[0.12em] text-foreground md:text-3xl">
                    {work.name}
                  </h3>
                  <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    {work.category}
                  </p>
                  <p
                    className={`mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground ${reversed ? 'md:ml-auto' : ''}`}
                  >
                    {work.description}
                  </p>
                </div>
              </Reveal>
            </div>
          )
        })}
      </div>
    </section>
  )
}
