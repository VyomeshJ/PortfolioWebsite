'use client'

import { useEffect, useRef, useState } from 'react'
import Image, { type StaticImageData } from 'next/image'

type MyProjectsProps = {
  index: number
  onFocus: (index: number) => void
}

type Project = {
  title: string
  href?: string
  description: string
  image: string | StaticImageData
  imageAlt: string
  unoptimized?: boolean
  points: React.ReactNode[]
}

const projects: Project[] = [
  {
    title: 'NoLoginShare',
    href: 'https://nologinshare.vyomeshj.com/',
    description: 'Self-hosted, Secure, no-login file sharing app with file encryption and auto-expiry',
    image: '/images/NoLoginShare.gif',
    imageAlt: 'NoLoginShare project preview',
    unoptimized: true,
    points: [
      'Next.js frontend and Express backend',
      'SQLite used to store metadata of files',
      'Web app deployed on my homelab server containerized using Docker',
      'Exposed the service using Cloudflare Tunnels',
    ],
  },
  {
    title: 'Homelab',
    description: 'An Ubuntu server running services',
    image: '/images/HomeServer.png',
    imageAlt: 'Homelab server preview',
    unoptimized: true,
    points: [
      'Exposing services using Cloudflare Tunnels and Tailscale',
      <>
        Self-hosted Strapi CMS for the{' '}
        <a
          href="https://www.uoagdg.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          UOAGDG Website
        </a>
      </>,
      'Setup a media server with Jellyfin and the arr stack',
      'Running instances of NextCloud and Immich',
      'Managing all docker deployments with Portainer',
    ],
  },
  {
    title: 'Game Dev',
    href: 'https://vyomesh-jamwal.itch.io/',
    description: 'Designed and developed games ranging from small game jam projects to fully developed long-term projects',
    image: '/images/GameDev.png',
    imageAlt: 'Game development project preview',
    points: [
      'Developed on Unity for 4+ years and 2+ years in Godot',
      <>
        President of the Game Developer Guild at University of Auckland and Created the{' '}
        <a
          href="https://www.uoagdg.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          UOAGDG Website
        </a>
      </>,
      <>Co-developed &quot;Awake in Fear&quot; over two years</>,
    ],
  },
]

function ProjectPanel({
  project,
  sectionIndex,
  showHeading,
  onFocus,
}: {
  project: Project
  sectionIndex: number
  showHeading: boolean
  onFocus: (index: number) => void
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')

    const handleScroll = () => {
      if (!ref.current) return

      if (mediaQuery.matches) {
        setOpacity(1)
        return
      }

      const rect = ref.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementCenter = rect.top + rect.height / 2
      const screenCenter = windowHeight / 2
      const distance = Math.abs(screenCenter - elementCenter)
      const maxDistance = windowHeight / 2
      const newOpacity = Math.max(0, Math.min(1, 1 - distance / maxDistance))

      setOpacity(newOpacity)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const current = ref.current
    if (!current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onFocus(sectionIndex)
        }
      },
      { threshold: 0.55 }
    )

    observer.observe(current)

    return () => observer.disconnect()
  }, [onFocus, sectionIndex])

  return (
    <section
      ref={ref}
      style={{ opacity }}
      className="flex min-h-[100svh] snap-center flex-col items-center justify-center gap-4 px-4 py-6 transition-opacity duration-75 ease-out sm:gap-6 sm:px-6 sm:py-8 md:snap-always md:gap-10 md:px-8 md:py-12"
    >
      {showHeading && (
        <h1 className="font-mc text-center text-4xl sm:text-5xl md:text-8xl">
          My Projects
        </h1>
      )}

      <article
        className={`flex w-full max-w-7xl flex-col justify-between gap-4 overflow-hidden rounded-md border border-white/15 bg-black/25 p-4 backdrop-blur-sm sm:gap-5 sm:p-5 md:gap-6 md:p-8 lg:min-h-[68svh] lg:flex-row lg:items-stretch lg:justify-between lg:gap-16 ${
          showHeading ? 'h-[calc(80svh-4rem)] sm:h-[calc(80svh-4.5rem)] lg:h-auto' : 'h-[80svh] lg:h-auto'
        }`}
      >
        <div className="shrink-0 max-w-3xl lg:flex lg:max-w-[52%] lg:flex-col lg:justify-center">
          <h3 className="font-mc text-2xl sm:text-3xl md:text-6xl">
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {project.title}
              </a>
            ) : (
              project.title
            )}
          </h3>
          <h3 className="mt-3 font-pixel text-xl font-medium leading-snug brightness-70 sm:text-2xl md:mt-4 md:text-4xl md:leading-tight">
            {project.description}
          </h3>
          <ul className="mt-5 space-y-3 text-base leading-relaxed sm:ml-2 sm:mt-7 sm:space-y-3 sm:text-lg md:ml-4 md:mt-12 md:space-y-5 md:text-2xl">
            {project.points.map((point, pointIndex) => (
              <li key={pointIndex}>- {point}</li>
            ))}
          </ul>
        </div>

        <div className="flex min-h-0 w-full flex-1 items-center justify-center overflow-hidden max-h-[clamp(8rem,22svh,12rem)] lg:max-h-none lg:h-auto lg:w-[48%] lg:flex-1">
          <Image
            src={project.image}
            alt={project.imageAlt}
            width={500}
            height={500}
            className="image-pixelated h-full max-h-full w-full max-w-full object-contain"
            unoptimized={project.unoptimized}
          />
        </div>
      </article>
    </section>
  )
}

export default function MyProjects({ index, onFocus }: MyProjectsProps) {
  return (
    <>
      {projects.map((project, projectIndex) => (
        <ProjectPanel
          key={project.title}
          project={project}
          sectionIndex={index + projectIndex}
          showHeading={projectIndex === 0}
          onFocus={onFocus}
        />
      ))}
    </>
  )
}
