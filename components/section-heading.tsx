export function SectionHeading({
  index,
  title,
  lead,
  discipline = 'Media / Studio',
}: {
  index: string
  title: string
  lead: string
  discipline?: string
}) {
  return (
    <div className="flex flex-col gap-4">
      <span className="font-mono text-sm tracking-[0.3em] text-primary">{index}</span>
      <h2 className="text-pretty text-4xl font-bold tracking-tight md:text-5xl">
        {title} <span className="text-muted-foreground">{lead}</span>
      </h2>
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {discipline}
      </span>
    </div>
  )
}
