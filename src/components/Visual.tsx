import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import {
  Canvas,
  useFrame,
  type ThreeElements,
  useThree,
} from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'

type CubeProps = {
  size: number
  timeOffset: number
} & ThreeElements['mesh']
function Cube({ size, timeOffset, ...meshProps }: CubeProps) {
  const { clock } = useThree()
  const meshRef = useRef<THREE.Mesh>(null!)
  useFrame((state, delta) => {
    const elapsedTime = clock.getElapsedTime()
    meshRef.current.rotation.x += delta * 0.67
    meshRef.current.rotation.y -= delta * 0.23
    meshRef.current.position.y =
      Math.sin(elapsedTime + timeOffset) * 0.75 + meshProps?.position[1]
  })
  return (
    <mesh {...meshProps} ref={meshRef}>
      <boxGeometry args={[size, size, size, 10, 10, 10]} />
      <meshNormalMaterial />
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

const CubeGroup = ({ scale = 1 }: { scale: number }) => {
  const groupRef = useRef<THREE.Group>(null!)
  // useFrame((state, delta) => {
  //   groupRef.current.rotation.y -= delta * 0.23
  // })
  return (
    <group ref={groupRef}>
      <Cube size={scale * 0.3} timeOffset={10} position={[scale * -3, 0, 0]} />
      <Cube size={scale * 0.5} timeOffset={11} position={[scale * -2, 0, 0]} />
      <Cube size={scale * 0.8} timeOffset={12} position={[scale * -1, 0, 0]} />
      <Cube size={scale} timeOffset={13} position={[scale * 0, 0, 0]} />
      <Cube size={scale * 0.8} timeOffset={14} position={[scale * 1, 0, 0]} />
      <Cube size={scale * 0.5} timeOffset={15} position={[scale * 2, 0, 0]} />
      <Cube size={scale * 0.3} timeOffset={16} position={[scale * 3, 0, 0]} />
    </group>
  )
}
export const Visual = () => {
  const canvas = useRef<HTMLCanvasElement>(null)
  return (
    <Canvas ref={canvas}>
      <CubeGroup scale={2} />
      <EffectComposer>
        <Bloom luminanceThreshold={0} luminanceSmoothing={1} height={200} />
      </EffectComposer>
    </Canvas>
  )
}
