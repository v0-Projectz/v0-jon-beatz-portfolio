export function ParallaxBand({
  image,
  quote,
  author,
  height = 'md',
}: {
  image: string
  quote?: string
  author?: string
  height?: 'md' | 'lg'
}) {
  return (
    <section
      className={`parallax-fixed relative flex items-center justify-center bg-band text-band-foreground ${height === 'lg' ? 'min-h-[70vh]' : 'min-h-[52vh]'}`}
      style={{ backgroundImage: `url('${image}')` }}
      aria-hidden={!quote}
    >
      <div className="absolute inset-0 bg-scrim/65" />
      {quote && (
        <blockquote className="container-wide relative max-w-3xl text-center">
          <p className="text-balance text-2xl font-light leading-relaxed md:text-3xl">
            &ldquo;{quote}&rdquo;
          </p>
          {author && (
            <footer className="mt-6 font-mono text-[0.65rem] uppercase tracking-[0.35em] text-band-foreground/70">
              {author}
            </footer>
          )}
        </blockquote>
      )}
    </section>
  )
}
