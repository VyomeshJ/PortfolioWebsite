'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'


type MyProjectsProps = {
  index: number
  onFocus: (index: number) => void
}

export default function Two({index, onFocus}: MyProjectsProps){
    const ref = useRef<HTMLDivElement | null>(null)
    const [opacity, setOpacity] = useState(1)
    const [isFocused, setIsFocused] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)

    const [numProjects, setNumProjects] = useState(3)
    const goPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + numProjects) % numProjects)
    }

    const goNext = () => {
        setCurrentIndex((prev) => (prev + 1) % numProjects)
    }

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCurrentIndex((prev) => (prev + 1) % numProjects)
    //     }, 4000)

    //     return () => clearInterval(interval)
    // }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return

            const rect = ref.current.getBoundingClientRect()
            const windowHeight = window.innerHeight

            
            const elementCenter = rect.top + rect.height / 2
            const screenCenter = windowHeight / 2

            const distance = Math.abs(screenCenter - elementCenter)


            const maxDistance = windowHeight / 2
            let newOpacity = 1 - (distance / maxDistance)

            newOpacity = Math.max(0, Math.min(1, newOpacity))

            setOpacity(newOpacity)

            const focused = distance < 80
            setIsFocused(focused)

            if (focused) {
                onFocus(index)
                console.log(index)
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    return(
        <div ref={ref} style={{opacity}} className="flex flex-col items-center justify-center min-h-screen px-8 gap-0 transition-opacity duration-200">
            <h1 className="font-mc text-7xl md:text-8xl text-center">My Projects</h1>
            
            <div className="relative w-full max-w-6xl mx-auto">
                <div className="overflow-hidden">
                    <div
                    className="flex transition-transform duration-500"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                    >
                        <div className="w-full shrink-0 p-8 rounded-2xl flex flex-row items-center gap-20 justify-between">
                            <div className="max-w-[100%] md:max-w-[50%]">
                                <h3 className="text-4xl md:text-5xl font-semibold">
                                    <a
                                        href="https://nologinshare.vyomeshj.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline"
                                    >
                                        NoLoginShare
                                    </a>
                                </h3>
                                <h3 className="text-2xl font-semibold mt-4 brightness-70">
                                    Self-hosted, Secure, no-login file sharing app with file encryption and auto-expiry
                                </h3>
                                <ul className="ml-4 mt-12 text-xl space-y-5">
                                    <li>- Next.js frontend and Express backend</li>
                                    <li>- SQLite used to store metadata of files</li>
                                    <li>- Web app deployed on my homelab server using Docker</li>
                                    <li>- Exposed the service using Cloudflare Tunnels</li>
                                </ul>
                            </div>
                             <div className='hidden md:block'>
                                <Image src="/images/NoLoginShare.gif" alt="NoLoginShareImage" width={500} height={500} className="image-pixelated"/>
                            </div>
                        </div>
                        <div className="w-full shrink-0 p-8 rounded-2xl flex flex-row items-center gap-20 justify-between">
                            <div className="max-w-[100%] md:max-w-[50%]">
                                <h3 className="text-4xl md:text-5xl font-semibold">
                                        Homelab
                                </h3>
                                <h3 className="text-2xl font-semibold mt-4 brightness-70">
                                    An Ubuntu server running services
                                </h3>
                                <ul className="ml-4 mt-12 text-xl space-y-5">
                                    <li>- Exposing services using Cloudflare Tunnels and Tailscale</li>
                                    <li>- Self-hosted Strapi CMS for the <a href="https://www.uoagdg.com/" target="_blank" rel="noopener noreferrer" className="underline">UOAGDG Website</a></li>
                                    <li>- Setup a media server with Jellyfin and the arr stack</li>
                                    <li>- Running instances of NextCloud and Immich</li>
                                    <li>- Managing all docker deployments with Portainer</li>
                                </ul>
                            </div>
                             <div className='hidden md:block'>
                                <Image src="/images/HomeServer.png" alt="Homelab" width={500} height={500} className="image-pixelated" unoptimized/>
                            </div>
                        </div>
                        <div className="w-full shrink-0 p-8 rounded-2xl flex flex-row items-center gap-20 justify-between">
                            <div className="max-w-[100%] md:max-w-[50%]">
                                <h3 className="text-4xl md:text-5xl font-semibold">
                                    <a
                                        href="https://vyomesh-jamwal.itch.io/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline"
                                    >
                                        Game Dev
                                    </a>
                                </h3>
                                <h3 className="text-2xl font-semibold mt-4 brightness-70">
                                    Designed and developed games ranging from small game jam projects to fully developed long-term projects
                                </h3>
                                <ul className="ml-4 mt-12 text-xl space-y-5">
                                    <li>- Developed on Unity for 4+ years and 2+ years in Godot</li>
                                    <li>- President of the Game Developer Guild at UoA and Created the <a href="https://www.uoagdg.com/" target="_blank" rel="noopener noreferrer" className="underline">UOAGDG Website</a></li>
                                    <li>- Co-developed "Awake in Fear" over two years</li>
                                </ul>
                            </div>
                             <div className='hidden md:block'>
                                <Image src="/images/GameDev.png" alt="NoLoginShareImage" width={500} height={500} className="image-pixelated"/>
                            </div>
                        </div>
                    
                    </div>
                </div>

                <div className="w-full flex justify-center gap-6 mt-6 relative z-20">
                    <button
                        type="button"
                        onClick={goPrev}
                        className="p-2 touch-manipulation"
                    >
                        <Image
                        src="/images/MCArrow.png"
                        alt="Previous project"
                        width={80}
                        height={80}
                        className="image-pixelated rotate-225 brightness-70 active:brightness-100"
                        />
                    </button>

                    <button
                        type="button"
                        onClick={goNext}
                        className="p-2 touch-manipulation"
                    >
                        <Image
                        src="/images/MCArrow.png"
                        alt="Next project"
                        width={80}
                        height={80}
                        className="image-pixelated rotate-45 brightness-70 active:brightness-100"
                        />
                    </button>
                </div>
                
            </div>
            

            
        </div>
    )
}