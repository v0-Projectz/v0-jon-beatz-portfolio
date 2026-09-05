'use client'

import { useState, type FormEvent } from 'react'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { studio } from '@/lib/site-data'

export function ContactSection() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="scroll-mt-20 bg-background py-24 md:py-32">
      <div className="container-wide">
        <SectionHeading index="// 06" ghost="Contact" title="Contact" />

        <div className="mx-auto max-w-3xl">
          {sent ? (
            <Reveal className="flex min-h-64 flex-col items-center justify-center gap-3 border border-border p-10 text-center">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-accent">
                Message received
              </span>
              <p className="text-2xl font-light uppercase tracking-[0.1em]">
                Thanks — we&apos;ll be in touch.
              </p>
              <p className="text-pretty leading-relaxed text-muted-foreground">
                {studio.artist} reads every message and replies within a couple of days.
              </p>
            </Reveal>
          ) : (
            <Reveal>
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="grid gap-8 sm:grid-cols-2">
                  <Field label="Name" name="name" type="text" />
                  <Field label="Email" name="email" type="email" />
                </div>
                <Field label="Subject" name="subject" type="text" />
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="resize-none border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors focus:border-accent"
                  />
                </div>
                <button
                  type="submit"
                  className="mx-auto mt-4 w-fit border border-foreground px-10 py-3 font-mono text-[0.65rem] uppercase tracking-[0.35em] text-foreground transition-colors hover:bg-foreground hover:text-background"
                >
                  Send Message
                </button>
              </form>
            </Reveal>
          )}

          <div className="mt-16 flex flex-col items-center gap-6 border-t border-border pt-10 text-center sm:flex-row sm:justify-center sm:gap-12">
            <a
              href={`mailto:${studio.email}`}
              className="text-sm transition-colors hover:text-accent"
            >
              {studio.email}
            </a>
            <a
              href={studio.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-accent"
            >
              Instagram {studio.instagramHandle}
            </a>
            <a
              href={studio.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-accent"
            >
              YouTube {studio.youtubeHandle}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, name, type }: { label: string; name: string; type: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors focus:border-accent"
      />
    </div>
  )
}
