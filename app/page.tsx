'use client'

import { useState, useRef } from 'react'
import MinecraftScene from '@/components/Scene';
import Hero from '@/components/Homepage/Hero';
import MyProjects from '@/components/Homepage/MyProjects';
import Contact from '@/components/Homepage/Contact';

export default function Home() {
  const [focusedSection, setFocusedSection] = useState(0)
  const OneRef = useRef<HTMLDivElement | null>(null)
  const TwoRef = useRef<HTMLDivElement | null>(null)

  const scrollToViewProjects = () => {
    TwoRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="font-mc">
      <div className="pointer-events-none fixed left-3 top-3 z-50 md:left-4 md:top-4">
        <div className="flex h-10 min-w-14 items-center justify-center rounded-sm border border-white/15 bg-black/35 px-3 backdrop-blur-sm md:h-12 md:min-w-16">
          <h1 className="font-mc text-base md:text-xl">{focusedSection + 1}/5</h1>
        </div>
      </div>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <MinecraftScene />
      </div>
      <div className="fixed inset-0 z-10 bg-black/80 backdrop-blur-[3px] pointer-events-none" />
      <div className="relative z-20">
        <div ref={OneRef}>
          <Hero
          index={0}
          onFocus={setFocusedSection}
          viewProjectsClicked={scrollToViewProjects}
          />
        </div>
        {/* <div ref={OneRef}>
          <AboutMe
          index={1}
          onFocus={setFocusedSection}
          />
        </div> */}
        <div ref={TwoRef}>
          <MyProjects
          index={1}
          onFocus={setFocusedSection}
          
          />
        </div>
        <div>
          <Contact
          index={4}
          onFocus={setFocusedSection}
          />
        </div>
      </div>
      
    </div>





    // <div className="relative overflow-x-hidden">
    //   <div className="fixed inset-0 z-0 pointer-events-none">
    //     <MinecraftScene />
    //   </div>

    //   <div className="fixed inset-0 z-10 bg-black/80 backdrop-blur-[3px] pointer-events-none" />
    //   <div className='relative z-50 [touch-action:pan-y]'>
    //     <div className="fixed top-0 left-0 flex items-center justify-center w-30 h-30">
    //       <h1 className="font-mc text-2xl z-50">{focusedSection + 1}/5</h1>
    //     </div>
    //   </div>
      
    //   <div className="relative z-50">
        
        
    //     <div ref={OneRef}>
    //       <Hero
    //       index={0}
    //       onFocus={setFocusedSection}
    //       viewProjectsClicked={scrollToViewProjects}
    //       />
    //     </div>
    //     {/* <div ref={OneRef}>
    //       <AboutMe
    //       index={1}
    //       onFocus={setFocusedSection}
    //       />
    //     </div> */}
    //     <div ref={TwoRef}>
    //       <MyProjects
    //       index={1}
    //       onFocus={setFocusedSection}
          
    //       />
    //     </div>
        
               
    //   </div>
    // </div>
  );
}
