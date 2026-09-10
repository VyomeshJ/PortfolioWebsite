import Image from 'next/image'
import type { ReactNode } from 'react'

type Project = {
  title: string
  href?: string
  description: string
  image: string
  imageAlt: string
  imageWidth: number
  imageHeight: number
  points: ReactNode[]
}

const projects: Project[] = [
  {
    title: 'NoLoginShare',
    href: 'https://nologinshare.vyomeshj.com/',
    description:
      'Self-hosted, secure, no-login file sharing with encryption and automatic expiry.',
    image: '/images/NoLoginShare.gif',
    imageAlt: 'NoLoginShare project preview',
    imageWidth: 179,
    imageHeight: 160,
    points: [
      'Next.js frontend and Express backend',
      'SQLite metadata storage',
      'Docker deployment on my homelab',
      'Securely exposed with Cloudflare Tunnels',
    ],
  },
  {
    title: 'Homelab',
    description: 'An Ubuntu server running the services I use and maintain.',
    image: '/images/HomeServer.avif',
    imageAlt: 'Homelab server preview',
    imageWidth: 153,
    imageHeight: 135,
    points: [
      'Cloudflare Tunnels and Tailscale for secure access',
      <span key="strapi">
        Self-hosted Strapi CMS for the{' '}
        <a
          href="https://www.uoagdg.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          UOAGDG website
        </a>
      </span>,
      'Jellyfin media server with the arr stack',
      'Nextcloud, Immich, and Portainer deployments',
    ],
  },
  {
    title: 'Game Dev',
    href: 'https://vyomesh-jamwal.itch.io/',
    description:
      'Games ranging from compact jam projects to fully developed, long-term releases.',
    image: '/images/GameDev.avif',
    imageAlt: 'Game development project preview',
    imageWidth: 856,
    imageHeight: 706,
    points: [
      '4+ years with Unity and 2+ years with Godot',
      <span key="guild">
        President of the University of Auckland Game Developer Guild and creator of the{' '}
        <a
          href="https://www.uoagdg.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          UOAGDG website
        </a>
      </span>,
      'Co-developed “Awake in Fear” over two years',
    ],
  },
]

function ProjectPanel({
  project,
  sectionIndex,
  showHeading,
}: {
  project: Project
  sectionIndex: number
  showHeading: boolean
}) {
  return (
    <section
      id={showHeading ? 'projects' : undefined}
      data-section-index={sectionIndex}
      className="flex min-h-[100svh] scroll-mt-4 snap-start items-center justify-center px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:py-14"
    >
      <div className="flex w-full max-w-7xl flex-col items-center gap-7 sm:gap-9 lg:gap-10">
        {showHeading && (
          <h2 className="font-mc text-center text-[clamp(2.75rem,12vw,6rem)] leading-none">
            My Projects
          </h2>
        )}

        <article className="grid w-full gap-8 rounded-md border border-white/15 bg-black/40 p-5 shadow-2xl backdrop-blur-sm sm:p-7 lg:min-h-[68svh] lg:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.92fr)] lg:items-center lg:gap-12 lg:p-10">
          <div className="min-w-0">
            <h3 className="font-mc text-[clamp(2rem,9vw,4rem)] leading-none">
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-white/40 underline-offset-4 transition hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  {project.title}
                </a>
              ) : (
                project.title
              )}
            </h3>

            <p className="mt-4 max-w-3xl text-lg font-medium leading-snug text-white/70 sm:text-xl md:text-2xl lg:text-3xl">
              {project.description}
            </p>

            <ul className="mt-7 space-y-3 text-base leading-relaxed text-white/90 sm:text-lg md:mt-9 md:text-xl lg:text-2xl">
              {project.points.map((point, pointIndex) => (
                <li key={pointIndex} className="grid grid-cols-[0.8rem_1fr] gap-2">
                  <span aria-hidden="true">-</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex min-h-0 w-full items-center justify-center overflow-hidden rounded-sm bg-white/[0.03] p-3 sm:p-5 lg:h-full">
            <Image
              src={project.image}
              alt={project.imageAlt}
              width={project.imageWidth}
              height={project.imageHeight}
              sizes="(max-width: 899px) calc(100vw - 4.5rem), 38vw"
              className="image-pixelated max-h-[34svh] w-full object-contain lg:max-h-[58svh]"
              loading="lazy"
              unoptimized
            />
          </div>
        </article>
      </div>
    </section>
  )
}

export default function MyProjects({ firstIndex }: { firstIndex: number }) {
  return (
    <>
      {projects.map((project, projectIndex) => (
        <ProjectPanel
          key={project.title}
          project={project}
          sectionIndex={firstIndex + projectIndex}
          showHeading={projectIndex === 0}
        />
      ))}
    </>
  )
}
