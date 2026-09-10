'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'

const MinecraftScene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
})

type NavigatorWithConnection = Navigator & {
  connection?: {
    effectiveType?: string
    saveData?: boolean
  }
}

export default function PageExperience({ sectionCount }: { sectionCount: number }) {
  const [focusedSection, setFocusedSection] = useState(0)
  const [sceneEnabled, setSceneEnabled] = useState(false)
  const [sceneReady, setSceneReady] = useState(false)
  const [progress, setProgress] = useState(0)
  const [loaderMounted, setLoaderMounted] = useState(true)

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-section-index]')
    )
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting)
        if (!visibleEntry) return

        const nextIndex = Number(
          (visibleEntry.target as HTMLElement).dataset.sectionIndex
        )
        if (Number.isFinite(nextIndex)) setFocusedSection(nextIndex)
      },
      { rootMargin: '-45% 0px -45%', threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const connection = (navigator as NavigatorWithConnection).connection
    const hasConstrainedNetwork =
      connection?.saveData === true ||
      connection?.effectiveType === 'slow-2g' ||
      connection?.effectiveType === '2g'
    const canRunImmersiveScene =
      window.matchMedia('(min-width: 900px) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !hasConstrainedNetwork

    setSceneEnabled(canRunImmersiveScene)

    if (!canRunImmersiveScene) {
      setProgress(100)
      setSceneReady(true)
    }
  }, [])

  useEffect(() => {
    if (!sceneEnabled || sceneReady) return

    // Never trap the portfolio behind the loader if WebGL or the model fails.
    const safetyTimeout = window.setTimeout(() => setSceneReady(true), 8000)
    return () => window.clearTimeout(safetyTimeout)
  }, [sceneEnabled, sceneReady])

  useEffect(() => {
    if (!sceneReady) return

    const timeout = window.setTimeout(() => setLoaderMounted(false), 320)
    return () => window.clearTimeout(timeout)
  }, [sceneReady])

  const handleSceneReady = useCallback(() => {
    setProgress(100)
    setSceneReady(true)
  }, [])

  const handleSceneProgress = useCallback((nextProgress: number) => {
    setProgress(Math.max(0, Math.min(100, Math.round(nextProgress))))
  }, [])

  return (
    <>
      <div className="world-fallback fixed inset-0 z-0" aria-hidden="true" />

      {sceneEnabled && (
        <div className="pointer-events-none fixed inset-0 z-[1] hidden min-[900px]:block">
          <MinecraftScene
            onProgress={handleSceneProgress}
            onReady={handleSceneReady}
          />
        </div>
      )}

      <div
        className="page-shade pointer-events-none fixed inset-0 z-10"
        aria-hidden="true"
      />

      <div className="pointer-events-none fixed left-3 top-[max(0.75rem,env(safe-area-inset-top))] z-50 sm:left-4">
        <div className="flex min-h-11 min-w-16 items-center justify-center rounded-sm border border-white/20 bg-black/55 px-3 shadow-lg backdrop-blur-sm">
          <p
            className="font-mc text-base sm:text-lg"
            aria-label={`Section ${focusedSection + 1} of ${sectionCount}`}
          >
            {focusedSection + 1}/{sectionCount}
          </p>
        </div>
      </div>

      {loaderMounted && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#050706] px-6 text-white transition-opacity duration-300 ${
            sceneReady ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
          role="status"
          aria-live="polite"
          aria-label={`Loading portfolio: ${progress}%`}
        >
          <div className="w-full max-w-xs text-center sm:max-w-sm">
            <h1 className="font-mc text-[clamp(2rem,10vw,3.25rem)] leading-none">
              Loading world...
            </h1>

            <div className="mt-7 h-3 overflow-hidden rounded-sm border border-white/30 bg-white/10">
              <div
                className="h-full bg-white transition-[width] duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-3 text-lg text-white/75">{progress}%</p>
          </div>
        </div>
      )}
    </>
  )
}
