'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Center, Environment, Html, useProgress } from '@react-three/drei'
import { Suspense, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'


function Loader() {
  const { progress } = useProgress()

  return (
    <Html center>
      <div className="rounded-xl bg-black/70 px-6 py-4 text-center text-white backdrop-blur-md">
        <div className="mb-3 text-lg font-semibold">
          Loading world...
        </div>

        <div className="h-2 w-64 overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-2 text-sm text-white/80">
          {progress.toFixed(0)}%
        </div>
      </div>
    </Html>
  )
}

function MinecraftWorld() {
  const { scene } = useGLTF('/models/skyblock_spawn_mineville.glb')

  return (
    <Center>
      <primitive object={scene} scale={30} />
    </Center>
  )
}

function FlyCamera() {
  const { camera, gl } = useThree()

  const keys = useRef<Record<string, boolean>>({})
  const yaw = useRef(0)
  const pitch = useRef(0)
  const lastLog = useRef(0)

  const sensitivity = 0.002
  const speed = 20

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      keys.current[e.code] = true
    }

    const onKeyUp = (e: KeyboardEvent) => {
      keys.current[e.code] = false
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  useEffect(() => {
    const handleClick = () => {
      gl.domElement.requestPointerLock()
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (document.pointerLockElement !== gl.domElement) return

      yaw.current -= e.movementX * sensitivity
      pitch.current -= e.movementY * sensitivity

      pitch.current = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch.current))
    }

    gl.domElement.addEventListener('click', handleClick)
    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      gl.domElement.removeEventListener('click', handleClick)
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [gl])

  useFrame((state, delta) => {
    const input = new THREE.Vector3(0, 0, 0)
    const currentSpeed = keys.current['ShiftLeft'] ? speed * 2 : speed

    if (keys.current['KeyW']) input.z -= 1
    if (keys.current['KeyS']) input.z += 1
    if (keys.current['KeyA']) input.x -= 1
    if (keys.current['KeyD']) input.x += 1

    input.normalize()

    const rotation = new THREE.Euler(pitch.current, yaw.current, 0, 'YXZ')

    const forward = new THREE.Vector3(0, 0, -1).applyEuler(rotation)
    const right = new THREE.Vector3(1, 0, 0).applyEuler(rotation)

    const move = new THREE.Vector3()
    move.addScaledVector(forward, -input.z)
    move.addScaledVector(right, input.x)

    camera.position.addScaledVector(move, currentSpeed * delta)
    camera.rotation.set(pitch.current, yaw.current, 0, 'YXZ')

    lastLog.current += delta
    if (lastLog.current >= 0.5) {
      lastLog.current = 0

      const pos = camera.position.clone()
      const dir = new THREE.Vector3()
      camera.getWorldDirection(dir)
      const lookAtPoint = pos.clone().add(dir.clone().multiplyScalar(20))

      console.log('Camera Position:', pos.toArray())
      console.log('Looking Direction:', dir.toArray())
      console.log('LookAt approx:', lookAtPoint.toArray())
    }
  })

  return null
}

function CameraDebugger() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const dir = new THREE.Vector3()
    state.camera.getWorldDirection(dir)

    const target = state.camera.position.clone().add(dir.multiplyScalar(20))

    if (ref.current) {
      ref.current.position.copy(target)
    }
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color="red" />
    </mesh>
  )
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
        position: new THREE.Vector3(2.5325, -4.0690, -0.1544),
        lookAt: new THREE.Vector3(19.0545, -1.5953, 10.8411),
      },
    ],
    []
  )

  const targetT = useRef(0)
  const currentT = useRef(0)
  const lastLog = useRef(0)

  useEffect(() => {
    camera.position.copy(points[0].position)
    camera.lookAt(points[0].lookAt)
  }, [camera, points])

  useEffect(() => {
  const onScroll = () => {
    const sectionProgress = window.scrollY / window.innerHeight
    targetT.current = THREE.MathUtils.clamp(
      sectionProgress,
      0,
      points.length - 1
    )
  }

  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  return () => {
    window.removeEventListener('scroll', onScroll)
  }
}, [points.length])
  useFrame((state, delta) => {
    const smoothness = 4
    const alpha = 1 - Math.exp(-smoothness * delta)

    currentT.current = THREE.MathUtils.lerp(currentT.current, targetT.current, alpha)

    const i = Math.floor(currentT.current)
    const nextI = Math.min(i + 1, points.length - 1)
    const localT = currentT.current - i

    const camPos = new THREE.Vector3().lerpVectors(
      points[i].position,
      points[nextI].position,
      localT
    )

    const lookPos = new THREE.Vector3().lerpVectors(
      points[i].lookAt,
      points[nextI].lookAt,
      localT
    )

    camera.position.copy(camPos)
    camera.lookAt(lookPos)

    lastLog.current += delta
    if (lastLog.current >= 0.5) {
      lastLog.current = 0

      const pos = camera.position.clone()
      const dir = new THREE.Vector3()
      camera.getWorldDirection(dir)
      const lookAtPoint = pos.clone().add(dir.clone().multiplyScalar(20))

      // console.log('Scroll T:', currentT.current)
      // console.log('Camera Position:', pos.toArray())
      // console.log('Looking Direction:', dir.toArray())
      // console.log('LookAt approx:', lookAtPoint.toArray())
      // console.log('Target LookAt:', lookPos.toArray())
    }
  })

  return null
}

export default function SceneBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0.4776, -3.3887, -2.7458], fov: 50, near: 0.1, far: 10000 }}
      >
        <color attach="background" args={['#87ceeb']} />

        <ambientLight intensity={1.5} />
        <directionalLight position={[50, 80, 30]} intensity={2} />

        <Suspense fallback={<Loader />}>
          <MinecraftWorld />
          <Environment preset="sunset" />
        </Suspense>
        <ScrollCamera />
        
      </Canvas>
    </div>
  )
}

useGLTF.preload('/models/skyblock_spawn_mineville.glb')
