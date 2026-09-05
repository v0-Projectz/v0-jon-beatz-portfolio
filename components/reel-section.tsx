import Image from 'next/image'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { disciplines } from '@/lib/site-data'

export function ReelSection() {
  const featured = disciplines.slice(0, 3)

  return (
    <section id="reel" className="scroll-mt-20 bg-background py-24 md:py-32">
      <div className="container-wide">
        <SectionHeading index="// 02" ghost="Work" title="Work" />

        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((item, i) => (
            <Reveal key={item.name} delay={i * 120}>
              <figure className="group relative aspect-[3/4] w-full overflow-hidden bg-band">
                <Image
                  src={item.image || '/placeholder.svg'}
                  alt={item.name}
                  fill
                  className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <div className="absolute inset-0 bg-scrim/30 transition-colors duration-500 group-hover:bg-scrim/60" />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-6 text-band-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-accent">
                    {item.category}
                  </span>
                  <p className="mt-1 text-lg font-light uppercase tracking-[0.15em]">{item.name}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
