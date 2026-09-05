import Image from 'next/image'
import { SectionHeading } from '@/components/section-heading'
import { works } from '@/lib/site-data'

export function WorksSection() {
  return (
    <section id="works" className="container-wide scroll-mt-24 py-24 md:py-32">
      <SectionHeading index="// 03" title="Works" lead="Full portfolio" discipline="Selected Projects" />

      <div className="mt-14 flex flex-col">
        {works.map((work) => (
          <article
            key={work.id}
            className="group grid gap-6 border-t border-border py-8 md:grid-cols-[auto_1.2fr_2fr_auto] md:items-center md:gap-10"
          >
            <span className="font-mono text-sm text-primary">{work.id}</span>

            <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-bold tracking-tight">{work.name}</h3>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {work.category}
              </span>
            </div>

            <p className="max-w-xl leading-relaxed text-muted-foreground">{work.description}</p>

            <div className="relative aspect-video w-full overflow-hidden md:w-40">
              <Image
                src={work.image || '/placeholder.svg'}
                alt={work.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width: 768px) 10rem, 100vw"
              />
            </div>
          </article>
        ))}
        <div className="border-t border-border" />
      </div>
    </section>
  )
}
