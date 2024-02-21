import React, { useEffect, useRef } from "react";

import birdScene from "../3d/cash.glb";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Bird = () => {
  const { scene, animations } = useGLTF(birdScene);
  const birdRef = useRef();
  const { actions } = useAnimations(animations, birdRef);

{ /* useEffect(() => {
    actions["Take 001"].play();
  }, []);
*/}
 
useFrame(({ clock, camera }) => {
  // Define initial position
  const initialX = 10;
  const initialZ = 5;

  // Update the Y position to simulate flight in a sine wave
  birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.25 + 2;

  // Adjust rotation based on bird's position relative to the camera
  if (birdRef.current.position.x > camera.position.x + 10) {
    birdRef.current.rotation.y = Math.PI;
  } else if (birdRef.current.position.x < camera.position.x - 20) {
    birdRef.current.rotation.y = 0;
  }

  // Move the bird
  if (birdRef.current.rotation.y === 0) {
    birdRef.current.position.x -= 0.02; // Move towards left
    birdRef.current.position.z -= 0.02; // Move forward
  } else {
    birdRef.current.position.x += 0.02; // Move towards right
    birdRef.current.position.z += 0.02; // Move forward
  }

  // If the bird has gone out of range, reset its position
  if (birdRef.current.position.x > initialX + 20 || birdRef.current.position.x < initialX - 30) {
    birdRef.current.position.x = initialX;
    birdRef.current.position.z = initialZ;
  }
});

return (
  <mesh
    position={[-10, 2, -5]} // Nueva posición inicial del lado izquierdo
    scale={[0.2, 0.2, 0.2]}
    ref={birdRef}
    rotation={[-Math.PI / 1.5, 0, 0]}
  >
    <primitive object={scene} />
  </mesh>
);

};

export default Bird;
