import Image from 'next/image'

const linkStyles =
  'inline-flex min-h-11 items-center justify-center px-2 text-center text-xl opacity-75 transition hover:opacity-100 hover:underline focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-2xl md:shake-pixel md:text-3xl'

export default function Hero() {
  return (
    <section
      id="home"
      data-section-index="0"
      className="flex min-h-[100svh] snap-start items-center justify-center px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(5rem,env(safe-area-inset-top))] sm:px-8"
    >
      <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-8 text-center sm:gap-10 md:gap-12">
        <div>
          <p className="mb-4 text-lg uppercase tracking-[0.2em] text-white/60 sm:text-xl">
            Developer · Game maker · Homelab builder
          </p>
          <h1 className="font-mc text-[clamp(2.7rem,14vw,6rem)] leading-[0.95] text-balance">
            Vyomesh Jamwal
          </h1>
        </div>

        <nav
          aria-label="Portfolio links"
          className="flex max-w-3xl flex-wrap justify-center gap-x-3 gap-y-1 sm:gap-x-5 sm:gap-y-2"
        >
          <a className={linkStyles} href="#projects">
            [view projects]
          </a>
          <a className={linkStyles} href="https://github.com/VyomeshJ" target="_blank" rel="noopener noreferrer">
            [github]
          </a>
          <a className={linkStyles} href="https://vyomesh-jamwal.itch.io/" target="_blank" rel="noopener noreferrer">
            [itch.io]
          </a>
          <a className={linkStyles} href="/Vyomesh_Jamwal_Resume.pdf" target="_blank" rel="noopener noreferrer">
            [resume]
          </a>
        </nav>

        <a
          href="#projects"
          className="updown flex min-h-12 select-none flex-col items-center justify-center gap-1 text-xl opacity-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-2xl"
          aria-label="Scroll to projects"
        >
          <span>scroll down</span>
          <Image
            src="/images/arrow_down.png"
            alt=""
            width={24}
            height={24}
            className="image-pixelated"
            priority
          />
        </a>
      </div>
    </section>
  )
}
