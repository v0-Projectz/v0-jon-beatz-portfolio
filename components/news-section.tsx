import { SectionHeading } from '@/components/section-heading'
import { news, quotes } from '@/lib/site-data'

export function NewsSection() {
  return (
    <section id="news" className="container-wide scroll-mt-24 py-24 md:py-32">
      <SectionHeading index="// 05" title="News" lead="Current projects" discipline="From the Studio" />

      <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
        {news.map((item) => (
          <article key={item.title} className="flex flex-col gap-4 border-t border-border pt-8">
            <h3 className="text-3xl font-bold tracking-tight">{item.title}</h3>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{item.meta}</span>
            <p className="leading-relaxed text-muted-foreground">{item.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-20 grid gap-8 border-t border-border pt-12 md:grid-cols-3">
        {quotes.map((quote) => (
          <blockquote key={quote.text} className="flex flex-col gap-4">
            <p className="text-pretty text-lg leading-relaxed">{`"${quote.text}"`}</p>
            <cite className="font-mono text-xs uppercase not-italic tracking-[0.2em] text-muted-foreground">
              — {quote.author}
            </cite>
          </blockquote>
        ))}
      </div>
    </section>
  )
}
