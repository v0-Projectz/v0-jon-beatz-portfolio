import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { studio } from '@/lib/site-data'

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 bg-background py-24 md:py-32">
      <div className="container-wide">
        <SectionHeading index="// 01" ghost="About" title="About" />

        <div className="grid gap-12 md:grid-cols-3 md:gap-16">
          <Reveal className="md:col-span-1">
            <dl className="space-y-6 text-sm">
              <div>
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                  Studio
                </dt>
                <dd className="mt-1 text-foreground">{studio.name}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                  Founder
                </dt>
                <dd className="mt-1 text-foreground">{studio.artist}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                  Base
                </dt>
                <dd className="mt-1 text-foreground">{studio.location}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                  Focus
                </dt>
                <dd className="mt-1 text-foreground">Music · Video · Brand</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={120} className="md:col-span-2">
            <p className="text-pretty text-2xl font-light leading-relaxed text-foreground md:text-3xl">
              {studio.name} is the full-service media studio of {studio.artist} — where every
              frequency and every frame is made under one roof.
            </p>
            <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
              From the first loop to the final master, from concept to color, we build records and
              the visuals that carry them. Production, mixing, direction, motion, and identity are
              not separate departments here — they are one continuous idea. The result is work that
              sounds and looks like it belongs to a single, deliberate vision.
            </p>
            <p className="mt-6 font-mono text-sm italic text-muted-foreground">
              &ldquo;Sound is a decision.&rdquo; — {studio.artist}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
