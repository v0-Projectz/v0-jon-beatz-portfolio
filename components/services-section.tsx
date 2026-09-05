import { SectionHeading } from '@/components/section-heading'
import { services } from '@/lib/site-data'

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-24 border-t border-border bg-card py-24 md:py-32">
      <div className="container-wide">
        <SectionHeading index="// 04" title="Services" lead="What we do" discipline="Capabilities" />

        <div className="mt-14 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
          {services.map((service, i) => (
            <div key={service.name} className="flex flex-col gap-3 bg-card p-8 md:p-10">
              <span className="font-mono text-xs text-primary">{`0${i + 1}`}</span>
              <h3 className="text-xl font-bold tracking-tight md:text-2xl">{service.name}</h3>
              <p className="leading-relaxed text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Need the whole pipeline? We take a record from a rough idea to a released single with the
          video, art, and rollout to match — all under one roof.
        </p>
      </div>
    </section>
  )
}
