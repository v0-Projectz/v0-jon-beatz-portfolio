'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export type LightboxSlide = { src: string; alt: string; caption?: string; meta?: string }

type LightboxContextValue = {
  open: (slides: LightboxSlide[], index: number) => void
}

const LightboxContext = createContext<LightboxContextValue | null>(null)

export function useLightbox() {
  const ctx = useContext(LightboxContext)
  if (!ctx) throw new Error('useLightbox must be used within a LightboxProvider')
  return ctx
}

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [slides, setSlides] = useState<LightboxSlide[]>([])
  const [index, setIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback((next: LightboxSlide[], i: number) => {
    setSlides(next)
    setIndex(i)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => setIsOpen(false), [])
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + slides.length) % slides.length),
    [slides.length],
  )
  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), [slides.length])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = original
    }
  }, [isOpen, close, prev, next])

  const current = slides[index]

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}

      {isOpen && current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.caption ?? current.alt}
          className="fixed inset-0 z-[100] flex flex-col bg-scrim/95 backdrop-blur-sm"
          onClick={close}
        >
          <div className="flex items-center justify-between px-6 py-5 text-band-foreground">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-band-foreground/70">
              {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="grid h-10 w-10 place-items-center border border-band-foreground/30 transition-colors hover:border-band-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            className="relative flex flex-1 items-center justify-center px-4 pb-4 md:px-16"
            onClick={(e) => e.stopPropagation()}
          >
            {slides.length > 1 && (
              <button
                type="button"
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center border border-band-foreground/30 text-band-foreground transition-colors hover:border-band-foreground md:left-6"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}

            <figure className="relative flex max-h-full max-w-5xl flex-col items-center">
              <div className="relative h-[58vh] w-[86vw] max-w-5xl sm:h-[62vh] md:w-[70vw]">
                <Image
                  key={current.src}
                  src={current.src || '/placeholder.svg'}
                  alt={current.alt}
                  fill
                  className="object-contain animate-in fade-in zoom-in-95 duration-300 ease-out"
                  sizes="86vw"
                  priority
                />
              </div>
              {(current.caption || current.meta) && (
                <figcaption className="mt-5 text-center text-band-foreground">
                  {current.meta && (
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-accent">
                      {current.meta}
                    </span>
                  )}
                  {current.caption && (
                    <p className="mt-1 text-sm font-light uppercase tracking-[0.2em]">
                      {current.caption}
                    </p>
                  )}
                </figcaption>
              )}
            </figure>

            {slides.length > 1 && (
              <button
                type="button"
                onClick={next}
                aria-label="Next image"
                className="absolute right-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center border border-band-foreground/30 text-band-foreground transition-colors hover:border-band-foreground md:right-6"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      )}
    </LightboxContext.Provider>
  )
}
