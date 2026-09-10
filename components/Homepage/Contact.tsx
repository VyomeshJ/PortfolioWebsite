export default function Contact({ index }: { index: number }) {
  return (
    <section
      id="contact"
      data-section-index={index}
      className="flex min-h-[100svh] snap-start items-center justify-center px-5 py-20 sm:px-8"
    >
      <div className="flex w-full max-w-4xl flex-col items-center justify-center text-center">
        <p className="mb-4 text-lg uppercase tracking-[0.2em] text-white/60">
          Let&apos;s build something
        </p>
        <h1 className="font-mc text-[clamp(3rem,14vw,6rem)] leading-none">
          Contact
        </h1>

        <div className="mt-12 flex w-full flex-col items-center gap-6 text-xl sm:mt-16 sm:text-2xl md:text-3xl">
          <a
            href="mailto:vyomesh.jamwal@gmail.com"
            className="min-h-11 max-w-full break-all underline decoration-white/40 underline-offset-4 transition hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            vyomesh.jamwal@gmail.com
          </a>

          <a
            href="tel:+64225141423"
            className="inline-flex min-h-11 items-center underline decoration-white/40 underline-offset-4 transition hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            +64 22 514 1423
          </a>
        </div>
      </div>
    </section>
  )
}
