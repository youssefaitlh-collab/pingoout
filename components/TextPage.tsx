/** Simple layout for About and legal pages. */
export function TextPage({ title, intro, children }: { title: string; intro: string; children?: React.ReactNode }) {
  return (
    <div className="container-page section max-w-3xl">
      <h1 className="text-[32px] font-bold tracking-tight md:text-5xl">{title}</h1>
      <p className="mt-4 text-[17px] text-muted">{intro}</p>
      <div className="mt-10 space-y-8 text-[16px] leading-relaxed text-text/90 [&_h2]:mb-2 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-text">{children}</div>
    </div>
  )
}
