import React, { useEffect, useRef } from "react";

import birdScene from "../3d/latte.glb";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Coffee = () => {
  const { scene, animations } = useGLTF(birdScene);
  const birdRef = useRef();
  const { actions } = useAnimations(animations, birdRef);

{ /* useEffect(() => {
    actions["Take 001"].play();
  }, []);
*/}
 
useFrame(({ clock, camera }) => {
  // Update the Y position simulate the flight moving in a sin wave
  birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.25 + 2;

  const radius = 5; // Radius of the circular path
  const duration = 10; // Duración de la animación en segundos
  const angle = (clock.elapsedTime / duration) * Math.PI * 2; // Ajuste de la duración

  // Calculate circular motion
  birdRef.current.position.x = camera.position.x + radius * Math.cos(angle);
  birdRef.current.position.z = camera.position.z + radius * Math.sin(angle);

  // Adjust rotation based on movement direction
  if (birdRef.current.position.x > camera.position.x) {
    birdRef.current.rotation.y = Math.PI / 2 - angle; // Adjust rotation for clockwise movement
  } else {
    birdRef.current.rotation.y = -Math.PI / 2 + angle; // Adjust rotation for anticlockwise movement
  }
});

return (
  <mesh
    position={[-5, 10, 1]}
    scale={[0.15, 0.15, 0.15]}
    ref={birdRef}
    rotation={[-Math.PI / 20,5,20]}
  >
    <primitive object={scene} />
  </mesh>
);


};

export default Coffee;
