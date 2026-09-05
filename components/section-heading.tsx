import { Reveal } from '@/components/reveal'

export function SectionHeading({
  index,
  ghost,
  title,
  subtitle,
}: {
  index: string
  ghost: string
  title: string
  subtitle?: string
}) {
  return (
    <Reveal className="relative flex flex-col items-center pb-14 text-center">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 select-none text-6xl font-bold uppercase tracking-[0.18em] text-foreground/[0.05] sm:text-7xl md:text-8xl"
      >
        {ghost}
      </span>
      <span className="relative font-mono text-[0.7rem] tracking-[0.35em] text-accent">{index}</span>
      <div className="relative mt-4 flex items-center gap-4">
        <span className="h-px w-8 bg-border" />
        <h2 className="text-sm font-semibold uppercase tracking-[0.45em] text-foreground">
          {title}
        </h2>
        <span className="h-px w-8 bg-border" />
      </div>
      {subtitle && (
        <p className="relative mt-3 font-mono text-[0.6rem] uppercase tracking-[0.35em] text-muted-foreground">
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}
