'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

type HeroProps = {
  index: number
  onFocus: (index: number) => void
  viewProjectsClicked: () => void
}

export default function Hero({ index, onFocus, viewProjectsClicked }: HeroProps){
    const ref = useRef<HTMLDivElement | null>(null)
    const [opacity, setOpacity] = useState(1)
    const [isFocused, setIsFocused] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return

            const rect = ref.current.getBoundingClientRect()
            const windowHeight = window.innerHeight

            
            const elementCenter = rect.top + rect.height / 2
            const screenCenter = windowHeight / 2

            const distance = Math.abs(screenCenter - elementCenter)


            const maxDistance = windowHeight / 2
            let newOpacity = 1 - (distance / maxDistance)*0.7

            newOpacity = Math.max(0, Math.min(1, newOpacity))

            setOpacity(newOpacity)

            const focused = distance < 80
            setIsFocused(focused)

            if (focused) {
                onFocus(index)
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return(
        <div ref={ref} style={{opacity}} className="flex flex-col items-center justify-center min-h-[100svh] px-8 gap-12 transition-opacity duration-200">
            <h1 className="font-mc text-7xl md:text-8xl text-center">Vyomesh Jamwal</h1>
            <div className="flex flex-row flex-wrap gap-4 justify-center">
                <button className="font-mc text-3xl opacity-70 text-center hover:underline hover:opacity-100 shake-pixel" onClick={viewProjectsClicked}>[view projects]</button>
                <button className="font-mc text-3xl opacity-70 text-center hover:underline hover:opacity-100 shake-pixel" onClick={() => {window.open('https://github.com/VyomeshJ', '_blank')}}>[github]</button>
                <button className="font-mc text-3xl opacity-70 text-center hover:underline hover:opacity-100 shake-pixel" onClick={() => {window.open('https://vyomesh-jamwal.itch.io/', '_blank')}}>[itch.io]</button>
                <button className="font-mc text-3xl opacity-70 text-center hover:underline hover:opacity-100 shake-pixel" onClick={() => {window.open('/Vyomesh_Jamwal_Resume.pdf', '_blank')}}>[resume]</button>
            </div>
            
            <div className='select-none pointer-events-none flex flex-col items-center justify-between updown'>
                <p className="font-mc text-3xl text-center">
                    scroll down
                    
                </p>
                <Image src="/images/arrow_down.png" alt="down_arrow" width={30} height={30} className="image-pixelated"/>
            </div>
        </div>
            
    )
}