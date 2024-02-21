import React, { useEffect, useRef } from "react";

import birdScene from "../3d/clock.glb";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Clock = () => {
  const { scene, animations } = useGLTF(birdScene);
  const birdRef = useRef();
  const { actions } = useAnimations(animations, birdRef);

{ /* useEffect(() => {
    actions["Take 001"].play();
  }, []);
*/}
 
// Dentro de tu componente
useFrame(({ clock, camera }) => {
  // Define la posición inicial
  const initialX = 10;
  const initialZ = 5;
  
  // Define la amplitud y frecuencia de la oscilación sinusoidal
  const amplitude = 2;
  const frequency = 1;

  // Calcula la posición en el eje X siguiendo una trayectoria sinusoidal
  const offsetX = Math.sin(clock.elapsedTime * frequency) * amplitude;
  birdRef.current.position.x = initialX + offsetX;

  // Calcula la posición en el eje Z para que el pájaro se mueva hacia adelante
  const speed = 0.04;
  birdRef.current.position.z -= speed;

  // Ajusta la rotación del pájaro basado en su posición relativa a la cámara
  if (birdRef.current.position.x > camera.position.x) {
    birdRef.current.rotation.y = Math.PI / 2;
  } else {
    birdRef.current.rotation.y = -Math.PI / 2;
  }

  // Si el pájaro se sale del rango, reinicia su posición
  if (birdRef.current.position.x > camera.position.x + 20 || birdRef.current.position.x < camera.position.x - 30) {
    birdRef.current.position.x = initialX;
    birdRef.current.position.z = initialZ;
  }
});

return (
  <mesh
    position={[10, 2, 5]} // Nueva posición inicial del lado derecho
    scale={[0.015, 0.015, 0.015]}
    ref={birdRef}
    rotation={[-Math.PI / 1.5, 0, 0]}
  >
    <primitive object={scene} />
  </mesh>
);



};

export default Clock;
