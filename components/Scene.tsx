'use client'

import { Center, useGLTF, useProgress } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

type SceneProps = {
  onProgress: (progress: number) => void
  onReady: () => void
}

function MinecraftWorld() {
  const { scene } = useGLTF('/models/skyblock_spawn_mineville.glb')

  return (
    <Center>
      <primitive object={scene} scale={30} />
    </Center>
  )
}

function SceneLifecycle({ onProgress, onReady }: SceneProps) {
  const { active, progress } = useProgress()
  const hasStarted = useRef(false)
  const hasFinished = useRef(false)

  useEffect(() => {
    if (active || progress > 0) hasStarted.current = true
    onProgress(progress)

    if (
      hasStarted.current &&
      !hasFinished.current &&
      !active &&
      progress >= 100
    ) {
      hasFinished.current = true
      onReady()
    }
  }, [active, onProgress, onReady, progress])

  return null
}

function ScrollCamera() {
  const { camera } = useThree()
  const points = useMemo(
    () => [
      {
        position: new THREE.Vector3(0.4776, -3.3887, -2.7458),
        lookAt: new THREE.Vector3(-8.0337, -3.3087, 15.3526),
      },
      {
        position: new THREE.Vector3(-2.7837, -3.5564, 1.8576),
        lookAt: new THREE.Vector3(13.9462, -0.1727, 12.2815),
      },
      {
        position: new THREE.Vector3(-3.6276, -3.8112, 1.2864),
        lookAt: new THREE.Vector3(13.8336, 0.3187, 10.1207),
      },
      {
        position: new THREE.Vector3(-1.0611, -4.1969, -1.2603),
        lookAt: new THREE.Vector3(17.7976, -2.3595, 5.1404),
      },
      {
        position: new THREE.Vector3(2.5325, -4.069, -0.1544),
        lookAt: new THREE.Vector3(19.0545, -1.5953, 10.8411),
      },
    ],
    []
  )
  const targetT = useRef(0)
  const currentT = useRef(0)
  const cameraPosition = useRef(new THREE.Vector3())
  const cameraTarget = useRef(new THREE.Vector3())

  useEffect(() => {
    camera.position.copy(points[0].position)
    camera.lookAt(points[0].lookAt)
  }, [camera, points])

  useEffect(() => {
    const updateTarget = () => {
      targetT.current = THREE.MathUtils.clamp(
        window.scrollY / window.innerHeight,
        0,
        points.length - 1
      )
    }

    updateTarget()
    window.addEventListener('scroll', updateTarget, { passive: true })
    window.addEventListener('resize', updateTarget, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateTarget)
      window.removeEventListener('resize', updateTarget)
    }
  }, [points.length])

  useFrame((_, delta) => {
    const alpha = 1 - Math.exp(-4 * delta)
    currentT.current = THREE.MathUtils.lerp(
      currentT.current,
      targetT.current,
      alpha
    )

    const pointIndex = Math.floor(currentT.current)
    const nextIndex = Math.min(pointIndex + 1, points.length - 1)
    const localProgress = currentT.current - pointIndex

    cameraPosition.current.lerpVectors(
      points[pointIndex].position,
      points[nextIndex].position,
      localProgress
    )
    cameraTarget.current.lerpVectors(
      points[pointIndex].lookAt,
      points[nextIndex].lookAt,
      localProgress
    )

    camera.position.copy(cameraPosition.current)
    camera.lookAt(cameraTarget.current)
  })

  return null
}

export default function SceneBackground({ onProgress, onReady }: SceneProps) {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{
          position: [0.4776, -3.3887, -2.7458],
          fov: 50,
          near: 0.1,
          far: 10000,
        }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        performance={{ min: 0.5 }}
      >
        <color attach="background" args={['#87ceeb']} />
        <ambientLight intensity={1.5} />
        <directionalLight position={[50, 80, 30]} intensity={2} />

        <Suspense fallback={null}>
          <MinecraftWorld />
        </Suspense>
        <SceneLifecycle onProgress={onProgress} onReady={onReady} />
        <ScrollCamera />
      </Canvas>
    </div>
  )
}
