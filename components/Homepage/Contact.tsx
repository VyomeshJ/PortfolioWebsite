'use client'

import { useEffect, useRef, useState } from 'react'

type ContactProps = {
  index: number
  onFocus: (index: number) => void
}

export default function Contact({ index, onFocus }: ContactProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')

    const handleScroll = () => {
      if (!ref.current) return

      if (mediaQuery.matches) {
        setOpacity(1)
        onFocus(index)
        return
      }

      const rect = ref.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      const elementCenter = rect.top + rect.height / 2
      const screenCenter = windowHeight / 2

      const distance = Math.abs(screenCenter - elementCenter)
      const maxDistance = windowHeight / 2

      let newOpacity = 1 - distance / maxDistance
      newOpacity = Math.max(0, Math.min(1, newOpacity))

      setOpacity(newOpacity)

      if (distance < 80) {
        onFocus(index)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={ref}
      style={{ opacity }}
      className="flex flex-col items-center justify-center min-h-screen px-8 transition-opacity duration-200"
    >
      <h1 className="font-mc text-7xl md:text-8xl text-center mb-16">
        Contact
      </h1>

      <div className="flex flex-col gap-10 text-2xl md:text-3xl text-center">
        
        {/* Email */}
        <a
          href="mailto:vyomesh.jamwal@gmail.com"
          className="underline hover:brightness-75 transition"
        >
          vyomesh.jamwal@gmail.com
        </a>

        {/* Phone */}
        <a
          href="tel:+64225141423"
          className="underline hover:brightness-75 transition"
        >
          +64 0225141423
        </a>

      </div>
    </div>
  )
}