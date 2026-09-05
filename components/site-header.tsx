'use client'

import { useCallback, useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { nav, studio } from '@/lib/site-data'

const HEADER_OFFSET = 80

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = nav.map((item) => item.href.replace('#', ''))
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(`#${visible[0].target.id}`)
      },
      { rootMargin: `-${HEADER_OFFSET + 10}px 0px -55% 0px`, threshold: [0.1, 0.25, 0.5] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      event.preventDefault()
      setOpen(false)
      const target = document.getElementById(href.replace('#', ''))
      if (!target) return
      const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
      window.scrollTo({ top, behavior: 'smooth' })
      setActive(href)
      history.replaceState(null, '', href)
    },
    [],
  )

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
          {nav.map((item) => {
            const isActive = active === item.href
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                aria-current={isActive ? 'true' : undefined}
                className={`text-[0.7rem] uppercase tracking-[0.25em] transition-colors ${
                  isActive ? 'text-accent opacity-100' : 'opacity-80 hover:opacity-100'
                }`}
              >
                {item.label}
              </a>
            )
          })}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="p-2"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background text-foreground md:hidden" aria-label="Mobile">
          <ul className="container-wide flex flex-col py-4">
            {nav.map((item) => {
              const isActive = active === item.href
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`block py-3 text-xs uppercase tracking-[0.3em] transition-colors ${
                      isActive ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      )}
    </header>
  )
}
