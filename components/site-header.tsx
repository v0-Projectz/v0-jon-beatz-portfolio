'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { nav, studio } from '@/lib/site-data'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? 'bg-background/95 text-foreground shadow-sm backdrop-blur' : 'bg-transparent text-band-foreground'
      }`}
    >
      <div className="container-wide flex h-16 items-center justify-between md:h-20">
        <a href="#top" className="flex items-baseline gap-2" aria-label={`${studio.name} home`}>
          <span className="text-sm font-semibold uppercase tracking-[0.35em]">MSC</span>
          <span
            className={`hidden text-[0.65rem] uppercase tracking-[0.3em] sm:inline ${solid ? 'text-muted-foreground' : 'text-band-foreground/70'}`}
          >
            Projectz
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.7rem] uppercase tracking-[0.25em] opacity-80 transition-opacity hover:opacity-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="p-2 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background text-foreground md:hidden" aria-label="Mobile">
          <ul className="container-wide flex flex-col py-4">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-xs uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
