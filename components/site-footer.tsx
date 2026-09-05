import { studio } from '@/lib/site-data'

export function SiteFooter() {
  return (
    <footer className="container-wide flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between">
      <div className="flex items-baseline gap-2">
        <span className="text-lg font-bold tracking-tight">{studio.name}</span>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-primary">
          {studio.artist}
        </span>
      </div>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        © {new Date().getFullYear()} {studio.name} — All rights reserved
      </p>
    </footer>
  )
}
