import Image from 'next/image'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { news } from '@/lib/site-data'

const newsImages = ['/images/reel-liveset.png', '/images/reel-motion.png']

export function NewsSection() {
  return (
    <section id="news" className="scroll-mt-20 bg-background py-24 md:py-32">
      <div className="container-wide">
        <SectionHeading index="// 05" ghost="News" title="News" />

        <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2">
          {news.map((item, i) => (
            <Reveal key={item.title} delay={i * 120}>
              <article className="group flex flex-col">
                <figure className="relative aspect-video w-full overflow-hidden bg-band">
                  <Image
                    src={newsImages[i] || '/placeholder.svg'}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </figure>
                <span className="mt-5 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-accent">
                  {item.meta}
                </span>
                <h3 className="mt-2 text-xl font-light uppercase tracking-[0.1em] text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
