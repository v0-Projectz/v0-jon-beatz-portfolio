'use client'

import { useState } from 'react'
import { nav, studio } from '@/lib/site-data'

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="container-wide flex items-center justify-between py-5">
          <a href="#top" className="flex items-baseline gap-2">
            <span className="text-lg font-bold tracking-tight">{studio.name}</span>
            <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.3em] text-primary sm:inline">
              {studio.artist}
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex flex-col items-end gap-1.5 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Toggle menu</span>
            <span className={`h-px w-7 bg-foreground transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-px w-5 bg-foreground transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`h-px w-7 bg-foreground transition-transform ${open ? '-translate-y-1 -rotate-45' : ''}`} />
          </button>
        </div>
        <div className="container-wide">
          <div className="h-px w-full bg-border" />
        </div>
      </header>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-background md:hidden"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-mono text-lg uppercase tracking-[0.25em] text-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </>
  )
}
