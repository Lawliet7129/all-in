import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Group } from 'three'

interface AvatarProps {
  position: [number, number, number]
  rotation?: [number, number, number]
}

export default function Avatar({ position, rotation = [0, 0, 0] }: AvatarProps) {
  const groupRef = useRef<Group>(null)
  // TODO: Replace with actual avatar model
  const { scene } = useGLTF('/models/placeholder.glb')

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Add any animation logic here
    }
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <primitive object={scene} scale={1} />
    </group>
  )
} 