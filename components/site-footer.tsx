import { studio } from '@/lib/site-data'

export function SiteFooter() {
  return (
    <footer className="bg-background py-16 text-center">
      <div className="container-wide flex flex-col items-center gap-4">
        <div className="flex items-baseline gap-2">
          <span className="text-base font-semibold uppercase tracking-[0.35em]">MSC</span>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-accent">
            Projectz
          </span>
        </div>
        <span className="h-px w-10 bg-border" />
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
          © {new Date().getFullYear()} {studio.name} — {studio.artist}
        </p>
      </div>
    </footer>
  )
}
