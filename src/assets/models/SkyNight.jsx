import { useGLTF } from '@react-three/drei'
import React,{useEffect, useRef} from 'react'
import { useFrame } from '@react-three/fiber'
import skyScene from '../3d/sky_night.glb'

const SkyNight = ({isRotating}) => {

    const sky = useGLTF(skyScene);
    const skyRef = useRef();

    useFrame((_, delta)=>{
      if(isRotating){
        skyRef.current.rotation.y += 0.15 * delta
      }
    })

  return (
    <mesh ref={skyRef} >
      <primitive object={sky.scene} />
    </mesh>
  )
}

export default SkyNight
