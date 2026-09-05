'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { useLightbox, type LightboxSlide } from '@/components/lightbox'
import { disciplines } from '@/lib/site-data'

const PER_PAGE = 3

function chunk<T>(items: T[], size: number): T[][] {
  const pages: T[][] = []
  for (let i = 0; i < items.length; i += size) pages.push(items.slice(i, i + size))
  return pages
}

export function ReelSection() {
  const { open } = useLightbox()
  const [page, setPage] = useState(0)

  const pages = chunk(disciplines, PER_PAGE)
  const pageCount = pages.length

  const gallery: LightboxSlide[] = disciplines.map((item) => ({
    src: item.image,
    alt: item.name,
    caption: item.name,
    meta: item.category,
  }))

  const go = (next: number) => setPage((next + pageCount) % pageCount)

  return (
    <section id="reel" className="scroll-mt-20 bg-background py-24 md:py-32">
      <div className="container-wide">
        <SectionHeading index="// 02" ghost="Featured" title="Work" subtitle="Studio / Portfolio" />

        <Reveal>
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
              style={{ transform: `translateX(-${page * 100}%)` }}
            >
              {pages.map((group, pageIndex) => (
                <div key={pageIndex} className="grid w-full shrink-0 gap-6 md:grid-cols-3">
                  {group.map((item, i) => {
                    const globalIndex = pageIndex * PER_PAGE + i
                    return (
                      <figure key={item.name} className="flex flex-col">
                        <button
                          type="button"
                          onClick={() => open(gallery, globalIndex)}
                          aria-label={`Open ${item.name} in lightbox`}
                          className="group relative block aspect-[3/4] w-full overflow-hidden bg-band"
                        >
                          <Image
                            src={item.image || '/placeholder.svg'}
                            alt={item.name}
                            fill
                            className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                            sizes="(min-width: 768px) 33vw, 100vw"
                          />
                          <div className="absolute inset-0 bg-scrim/20 transition-colors duration-500 group-hover:bg-scrim/40" />
                        </button>
                        <figcaption className="pt-5 text-left">
                          <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground transition-colors group-hover:text-accent">
                            {item.category}
                          </span>
                          <p className="mt-1 text-sm font-light uppercase tracking-[0.2em] text-foreground">
                            {item.name}
                          </p>
                        </figcaption>
                      </figure>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {pageCount > 1 && (
          <div className="mt-12 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => go(page - 1)}
              aria-label="Previous work"
              className="grid h-9 w-9 place-items-center border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3" role="tablist" aria-label="Work pages">
              {pages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={page === i}
                  aria-label={`Go to work page ${i + 1}`}
                  onClick={() => setPage(i)}
                  className={`h-[2px] transition-all duration-300 ${
                    page === i ? 'w-10 bg-accent' : 'w-6 bg-border hover:bg-muted-foreground'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(page + 1)}
              aria-label="Next work"
              className="grid h-9 w-9 place-items-center border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
