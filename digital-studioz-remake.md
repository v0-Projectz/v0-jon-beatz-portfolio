# DigitalStudioz Remake — Workflow Documentation

This document records how a **rebranded, design-tweaked sibling** of this
site (MSC-Projectz / Jon Beatz portfolio) was spun up as a brand-new,
separate v0 chat/project called **v0-DigitalStudioz**. It captures the
original request, the approach taken, and the exact seed prompt sent to the
new chat — so the whole workflow is documented for future reference.

> Note: This is a documentation-only file added to the MSC-Projectz repo
> (`jonbeatz/v0-jon-beatz-portfolio`). The DigitalStudioz build itself lives
> in its own separate v0 chat and will get its own repo/project when
> published.

---

## 1. The goal

Create a **new, standalone project** (not a modification of this one) that:

- Reuses the *same architecture, component structure, motion, and
  interaction quality* as the existing MSC-Projectz site.
- Rebrands completely to **DigitalStudioz**, a digital creative studio
  (music, video, motion, and brand/web) still founded by **Jon Beatz**.
- Applies a handful of deliberate design tweaks so it reads as a
  **sibling** of the original, not a straight copy.

## 2. Why a new chat (not an edit of this repo)

- **Chats** = the conversation + generated code + preview (always saved to
  your account).
- **Projects** = a dashboard-level container tied to a Vercel project;
  a chat becomes a Project when you **Publish** it or assign it in the
  chat's settings.

Because DigitalStudioz is a separate sibling site, it was created as its own
chat via the `v0_createChat` tool rather than editing this repo. It starts
life as a **draft chat**; hitting **Publish** in that chat promotes it into
the Projects dashboard with its own Vercel project (and, if desired, its own
GitHub repo).

## 3. How the remake was seeded

1. Read the current site's full source (globals.css, layout, page, and every
   component) to capture the exact tokens, motion logic, and structure.
2. Bundled the authoritative source files as reference attachments (smaller
   files combined with `// ==== FILE: path ====` delimiters to stay within
   attachment limits).
3. Called `v0_createChat` with `v0-max` + image generation, passing a
   detailed seed prompt (below) plus those reference files.
4. The new chat generates the full DigitalStudioz site asynchronously.

---

## 4. Stack that must match the original

- Next.js App Router, React 19, Tailwind v4 (CSS-variable theme tokens in
  `app/globals.css` via `@theme inline` + `:root`/`.dark`, OKLCH colors,
  `--radius: 0rem` everywhere — hard rectangles).
- `next-themes` with `defaultTheme="dark"`, `enableSystem={false}`,
  `<html suppressHydrationWarning className="... bg-background">`.
- Deps: `next-themes`, `lucide-react`, `@vercel/analytics`.
  **No GSAP / Framer Motion / Lenis** — all motion is CSS
  transitions/keyframes + IntersectionObserver + requestAnimationFrame.

## 5. Behaviors recreated 1:1

- `lib/site-data.ts` as the single content source of truth.
- Section order: fixed SiteHeader → HeroSlider (`#top`) → About (`#about`) →
  StatsBand (parallax counters) → Featured Work carousel (`#reel`, 3-up with
  dash pagination, opens lightbox) → Full Works (`#works`, alternating
  zig-zag rows, opens lightbox) → ParallaxBand (quote) → Services
  (`#services`, on `bg-secondary`) → News (`#news`) → ParallaxBand (quote) →
  Contact (`#contact`, form) → ParallaxBand (closer) → SiteFooter → BackToTop.
- HeroSlider: full-bleed `h-[100svh]`, 3 transitions (Cross Fade / Slide /
  Dip to Black), Ken Burns zoom bound to slide duration, self-re-arming
  autoplay keyed on active index, gear settings picker (transition /
  Ken Burns / autoplay / 2–15s duration with steppers + Slow/Normal/Fast
  presets), double-rAF trick so the first slide's Ken Burns animates on load.
  Defaults: fade, Ken Burns on, autoplay on, 6s.
- Shared `SectionHeading` (ghost watermark word + mono `// 0x` index +
  hairline-flanked title + optional subtitle), shared `Reveal`
  (IntersectionObserver fade/translate-up, one-shot, staggered via delay),
  Lightbox as a React Context provider (Esc/←/→ keys, body-scroll lock,
  counter, caption/meta, fade+zoom image swap keyed on `src`), scroll-spy nav
  with active-accent state + 80px smooth-scroll offset + `scroll-mt-20`,
  BackToTop fade-in past 600px.
- Responsiveness/smoothness fixes: `background-attachment: fixed` falls back
  to `scroll` on touch/coarse/≤768px, global `prefers-reduced-motion` reset,
  `transform-gpu` + `transition` (not `transition-all`) on hover-zoom images,
  ghost heading clamped `max-w-[92vw]`, `overflow-x: hidden` guards.

## 6. Rebrand rules

- Studio name everywhere → **DigitalStudioz**. Header lockup split as
  `DIGITAL` + `STUDIOZ` (mirroring the MSC / Projectz split). Footer,
  metadata, hero title, about, copyright all updated.
- Keep **Jon Beatz** as founder/creative director, but frame the studio as a
  **digital creative studio** (music, video, motion, brand/web) rather than
  strictly a music studio. About prose, services, news, quotes, work titles,
  and stat labels reworded to that framing.
- Email → `hello@digitalstudioz.com`; Instagram + YouTube → `@digitalstudioz`.
- `location`: replace placeholder "Studio Command Center" with
  "Remote / Worldwide".
- Update image `alt` text to match new copy.

## 7. Design tweaks (sibling, not clone)

1. **Accent color:** swap warm gold/amber for cool electric-cyan/azure.
   - Light: `--accent: oklch(0.68 0.15 230)`
   - Dark: `--accent: oklch(0.74 0.15 225)`
   - Set `--ring` to match and pick a readable `--accent-foreground`.
   - Keep the monochrome neutral ramp and warm-tinted band/scrim surfaces
     (hero + parallax stay dark in both themes).
2. **Display font:** **Space Grotesk** for headings/display (via next/font),
   **JetBrains Mono** kept for all mono labels/kickers/indices. Replace the
   Raleway `--font-raleway` variable with a Space Grotesk
   `--font-space-grotesk` variable; keep the wide-uppercase-tracking
   editorial personality.
3. **Layout tweak:** Featured Work carousel items become square
   `aspect-[1/1]` (original uses `3/4`), and the hero tagline treatment is
   tightened slightly.
4. **Imagery:** generate fresh dark, moody, high-contrast digital-studio
   imagery (studio / code-and-screens / video set / brand-and-motion) for
   hero slides, reel/works, stats, and about. No placeholder images left.

Accessibility (ARIA labels, roles, alt text, sr-only) kept at least as strong
as the original.

---

## 8. The exact seed prompt sent to the new chat

> Build a single-page, dark-default studio portfolio for a creative studio
> called **DigitalStudioz**. This is a rebrand + design-tweaked sibling of an
> existing site I built — I've attached ALL of that site's source files as
> reference (some smaller files are bundled together in combined attachments,
> each clearly delimited with `// ==== FILE: path ====` headers — split them
> back into their own files). Recreate the SAME architecture, component
> structure, motion, and interaction quality faithfully, then apply the
> rebrand and the specific design tweaks below so it feels like a sibling,
> not a copy.
>
> **Stack (match the attachments exactly)**
> - Next.js App Router, React 19, Tailwind v4 (CSS-variable theme tokens in
>   `app/globals.css` via `@theme inline` + `:root`/`.dark`, OKLCH colors,
>   `--radius: 0rem` everywhere — hard rectangles, no rounded corners).
> - `next-themes` with `defaultTheme="dark"`, `enableSystem={false}`,
>   `<html suppressHydrationWarning className="... bg-background">`.
> - Deps used: `next-themes`, `lucide-react`, `@vercel/analytics`. NO GSAP /
>   Framer Motion / Lenis — all motion is CSS transitions/keyframes +
>   IntersectionObserver + requestAnimationFrame, exactly like the
>   attachments.
>
> **Recreate these components/behaviors 1:1 (see attachments for exact
> logic)**
> - `lib/site-data.ts` as the single content source of truth. Every component
>   imports copy/images from here.
> - Section order: fixed SiteHeader → HeroSlider (#top) → About (#about) →
>   StatsBand (parallax counters) → Featured Work carousel (#reel, 3-up with
>   dash pagination, opens lightbox) → Full Works (#works, alternating zig-zag
>   rows, opens lightbox) → ParallaxBand (quote) → Services (#services, on
>   bg-secondary) → News (#news) → ParallaxBand (quote) → Contact (#contact,
>   form) → ParallaxBand (closer) → SiteFooter → BackToTop.
> - HeroSlider: full-bleed `h-[100svh]`, 3 transition styles (Cross Fade /
>   Slide / Dip to Black), Ken Burns zoom bound to slide duration, autoplay
>   via self-re-arming setTimeout keyed on active index, gear settings picker
>   (transition / Ken Burns on-off / autoplay on-off / duration 2–15s slider
>   with -/+ steppers and Slow/Normal/Fast presets). Keep the double-
>   requestAnimationFrame trick so the first slide's Ken Burns animates on
>   load. Defaults: fade, Ken Burns on, autoplay on, 6s.
> - Shared `SectionHeading` (giant ghosted watermark word + mono `// 0x` index
>   + hairline-flanked title + optional subtitle), shared `Reveal`
>   (IntersectionObserver fade/translate-up, one-shot, staggered via delay),
>   Lightbox as a React Context provider (keyboard Esc/←/→, body-scroll lock,
>   counter, caption/meta, fade+zoom image swap keyed on src), scroll-spy nav
>   with gold→(new accent) active state + 80px smooth-scroll offset +
>   `scroll-mt-20` on sections, BackToTop fade-in past 600px.
> - Keep all the responsiveness/smoothness fixes: `background-attachment:
>   fixed` falls back to `scroll` on touch/coarse/≤768px, global
>   `prefers-reduced-motion` reset, `transform-gpu` + `transition` (NOT
>   `transition-all`) on hover-zoom images, ghost heading clamped
>   `max-w-[92vw]`, `overflow-x: hidden` guards.
>
> **REBRAND — replace ALL wording (remove every trace of "MSC-Projectz" /
> "MSC" / "Projectz")**
> - Studio name everywhere: **DigitalStudioz**. Header lockup: split as
>   `DIGITAL` + `STUDIOZ` (mirror how the reference splits MSC / Projectz).
>   Footer, metadata title/description, hero title, about, footer copyright →
>   DigitalStudioz.
> - Keep founder/creative director as **Jon Beatz** (don't remove that), but
>   frame DigitalStudioz as a **digital creative studio** — music, video,
>   motion, and brand/web — rather than strictly a music studio. Update About
>   prose, services, news, quotes, work titles, and stat labels to that
>   digital-studio framing. Email → `hello@digitalstudioz.com`, socials
>   Instagram + YouTube `@digitalstudioz`. Update image `alt` text to match
>   new copy.
> - `location`: replace the placeholder "Studio Command Center" with
>   something real-sounding like "Remote / Worldwide".
>
> **DESIGN TWEAKS (make it a sibling, same vibe, clearly distinct)**
> 1. **Accent color:** swap the warm gold/amber accent for a cool
>    electric-cyan/azure to signal "digital". Light
>    `--accent: oklch(0.68 0.15 230)`, dark `--accent: oklch(0.74 0.15 225)`;
>    set `--ring` to match and pick readable `--accent-foreground`. Keep the
>    rest of the monochrome neutral ramp and the warm-tinted band/scrim
>    surfaces (hero + parallax stay dark in both themes).
> 2. **Display font:** use **Space Grotesk** for headings/display (via
>    next/font) while keeping **JetBrains Mono** for all mono
>    labels/kickers/indices. Wire `--font-sans`/`--font-mono` the same way
>    (replace the Raleway `--font-raleway` variable with a Space Grotesk
>    `--font-space-grotesk` variable); keep the wide-uppercase-tracking
>    editorial personality.
> 3. **Small layout tweak:** give the Featured Work carousel items square
>    `aspect-[1/1]` framing (reference uses 3/4) and tighten the hero tagline
>    treatment slightly, so the sibling is visually recognizable but not
>    identical.
> 4. Generate fresh dark, moody, high-contrast themed imagery (studio /
>    code-and-screens / video set / brand-and-motion) for hero slides,
>    reel/works, stats, and about — matching the new digital-studio framing.
>    No placeholder images left in the code.
>
> Keep accessibility (ARIA labels, roles, alt text, sr-only where needed) at
> least as strong as the attachments. Match the attachments' file-by-file
> structure. Use the attached files as the authoritative reference for any
> detail not spelled out here.

---

## 9. Reference files attached to the new chat

The following authoritative source files from this repo were passed to the
new chat as reference (smaller ones bundled together with
`// ==== FILE: path ====` delimiters):

- `lib/site-data.ts`
- `app/globals.css`
- `app/layout.tsx`
- `app/page.tsx`
- `components/hero-slider.tsx`
- `components/site-header.tsx`
- `components/lightbox.tsx`
- `components/reel-section.tsx`
- `components/works-section.tsx`
- `components/about-section.tsx`
- `components/stats-band.tsx`
- `components/parallax-band.tsx`
- `components/services-section.tsx`
- `components/news-section.tsx`
- `components/contact-section.tsx`
- Bundled: `components/site-footer.tsx`, `components/back-to-top.tsx`,
  `components/theme-toggle.tsx`, `components/theme-provider.tsx`,
  `components/reveal.tsx`, `components/section-heading.tsx`, and a
  `package.json` dependencies reference.

## 10. Next step to save it into your Projects dashboard

Open the **v0-DigitalStudioz** chat and click **Publish** (top right). That
creates its own Vercel project, promotes the draft chat into your Projects
dashboard, and lets you connect it to its own GitHub repo.
