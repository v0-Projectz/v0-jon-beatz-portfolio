'use client'

import { useState } from 'react'
import Image from 'next/image'
import { SectionHeading } from '@/components/section-heading'
import { disciplines } from '@/lib/site-data'

export function ReelSection() {
  const [active, setActive] = useState(0)

  return (
    <section id="reel" className="scroll-mt-24 border-t border-border bg-card py-24 md:py-32">
      <div className="container-wide">
        <SectionHeading index="// 02" title="Reel" lead="Featured" discipline="Mixed Media" />

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ul className="flex flex-col">
            {disciplines.map((d, i) => (
              <li key={d.name}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex w-full items-baseline justify-between gap-4 border-b border-border py-5 text-left"
                >
                  <span
                    className={`text-2xl font-bold tracking-tight transition-colors md:text-3xl ${i === active ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}
                  >
                    {d.name}
                  </span>
                  <span className="shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {d.category}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="relative hidden aspect-[4/3] w-full overflow-hidden lg:block">
            {disciplines.map((d, i) => (
              <Image
                key={d.name}
                src={d.image || '/placeholder.svg'}
                alt={d.name}
                fill
                className={`object-cover transition-opacity duration-500 ${i === active ? 'opacity-100' : 'opacity-0'}`}
                sizes="50vw"
              />
            ))}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-border" />
          </div>
        </div>
      </div>
    </section>
  )
}
