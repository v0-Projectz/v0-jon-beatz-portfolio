'use client'

import { useState, type FormEvent } from 'react'
import { SectionHeading } from '@/components/section-heading'
import { studio } from '@/lib/site-data'

export function ContactSection() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border bg-card py-24 md:py-32">
      <div className="container-wide">
        <SectionHeading index="// 06" title="Contact" lead="Get in touch" discipline="Start a Project" />

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.3fr_1fr]">
          {sent ? (
            <div className="flex min-h-64 flex-col justify-center gap-3 border border-primary/40 p-10">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                Message received
              </span>
              <p className="text-2xl font-bold tracking-tight">Thanks — we&apos;ll be in touch soon.</p>
              <p className="leading-relaxed text-muted-foreground">
                {studio.artist} reads every message. Expect a reply within a couple of days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Name" name="name" type="text" placeholder="Your name" />
                <Field label="Email" name="email" type="email" placeholder="you@email.com" />
              </div>
              <Field label="Project" name="project" type="text" placeholder="Beat, mix, video, brand..." />
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us what you're working on."
                  className="resize-none border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
                />
              </div>
              <button
                type="submit"
                className="mt-2 w-fit bg-primary px-8 py-3 font-mono text-xs uppercase tracking-[0.25em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                Send Message
              </button>
            </form>
          )}

          <div className="flex flex-col gap-8">
            <ContactRow label="Email">
              <a href={`mailto:${studio.email}`} className="text-lg transition-colors hover:text-primary">
                {studio.email}
              </a>
            </ContactRow>
            <ContactRow label="Instagram">
              <a href={studio.instagram} target="_blank" rel="noopener noreferrer" className="text-lg transition-colors hover:text-primary">
                {studio.instagramHandle}
              </a>
            </ContactRow>
            <ContactRow label="YouTube">
              <a href={studio.youtube} target="_blank" rel="noopener noreferrer" className="text-lg transition-colors hover:text-primary">
                {studio.youtubeHandle}
              </a>
            </ContactRow>
            <ContactRow label="Studio">
              <span className="text-lg">{studio.location}</span>
            </ContactRow>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, name, type, placeholder }: { label: string; name: string; type: string; placeholder: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="border-b border-border bg-transparent py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
      />
    </div>
  )
}

function ContactRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-t border-border pt-5">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
      {children}
    </div>
  )
}
