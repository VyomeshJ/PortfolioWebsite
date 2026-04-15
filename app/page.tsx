'use client'

import Image from "next/image";
import { useState, useRef } from 'react'
import MinecraftScene from '@/components/Scene';
import Hero from '@/components/Homepage/Hero';
import MyProjects from '@/components/Homepage/MyProjects';

export default function Home() {
  const [focusedSection, setFocusedSection] = useState(0)
  const OneRef = useRef<HTMLDivElement | null>(null)
  const TwoRef = useRef<HTMLDivElement | null>(null)

  const scrollToViewProjects = () => {
    TwoRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="font-mc">
      <div className='hidden md:block relative z-50'>
        <div className="fixed top-0 left-0 flex items-center justify-center w-30 h-30">
          <h1 className="font-mc text-2xl z-50">{focusedSection + 1}/5</h1>
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
