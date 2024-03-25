import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import {
  Canvas,
  useFrame,
  type ThreeElements,
  useThree,
} from '@react-three/fiber'
import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl'
import { Bloom, EffectComposer } from '@react-three/postprocessing'

type SphereProps = {
  radius: number
} & ThreeElements['mesh']
function Sphere({ radius, ...meshProps }: SphereProps) {
  const uniforms = useMemo(
    () => ({
      uTime: {
        value: 0,
      },
    }),
    []
  )
  const meshRef = useRef<THREE.Mesh>(null!)
  const shaderRef = useRef<THREE.ShaderMaterial>(null!)
  const { clock } = useThree()
  useFrame((state, delta) => {
    const elapsedTime = clock.getElapsedTime()
    shaderRef.current.uniforms.uTime.value = elapsedTime
  })
  return (
    <mesh {...meshProps} ref={meshRef}>
      <sphereGeometry args={[radius, 32, 32]} />
      <shaderMaterial
        ref={shaderRef}
        blending={THREE.AdditiveBlending}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        wireframe
      />
    </mesh>
  )
}

// const MouseFollower = () => {
//   const { camera, pointer } = useThree()
//   useFrame(() => {
//     // Target position for the camera
//     // This example will move the camera in the XY plane,
//     // with a fixed Z to keep it from moving closer/farther away
//     const targetX = pointer.x * 2 // Adjust multiplier for sensitivity
//     const targetY = pointer.y * 2 // Adjust multiplier for sensitivity
//     const targetZ = camera.position.z // Keeps the camera at the same distance
//     // console.log(targetX, targetY, targetZ)
//     // Smoothly move the camera towards the target position
//     // Adjust the 0.05 multiplier for smoothing speed
//     camera.position.x += (targetX - camera.position.x) * 0.05
//     camera.position.y += (targetY - camera.position.y) * 0.05
//     camera.position.z += (targetZ - camera.position.z) * 0.05

//     // Optionally, make the camera look at the center or another specific point
//     camera.lookAt(new THREE.Vector3(0, 0, 0))
//   })

//   return null // Return your object/mesh here
// }

export const Visual = () => {
  const canvas = useRef<HTMLCanvasElement>(null)
  return (
    <div style={{ height: 350, width: 350 }}>
      <Canvas ref={canvas}>
        <Sphere radius={3} position={[0, 0, 0]} />
        <Sphere radius={1} position={[0, 0, 0]} />
        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.6} height={400} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
