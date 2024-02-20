import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "../components/Loader";
import Island from "../models/Island";
import Sky from "../models/Sky";
import Bird from "../models/Bird";
import Plane from "../models/Plane";
import HomeInfo from "../components/HomeInfo";
import House from "../models/House";
import SkyNight from "../models/SkyNight";


//import Nebular from "../models/Plane2";



const Home = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);


  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6.5, -43.4];
    } else {
      screenScale = [20,20,20];
      screenPosition = [-1, -1.5, -15];
    }

    return [screenScale, screenPosition];
  };

  

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;

 

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition=[0, -1.5, 0]
    } else {
      screenScale = [3, 3, 3];
      screenPosition=[0, -4,-4]

    }
    return [screenScale, screenPosition, islandRotation];
  };

  


  const [islandScale, islandPosition, islandRotation] =
    adjustIslandForScreenSize();
 

    const [planeScale, planePosition] = adjustPlaneForScreenSize();

    


  return (
    <section className="w-full h-screen relative">
       <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
      {currentStage && <HomeInfo currentStage={currentStage} /> }
      </div>
      
   <Canvas
       className={`w-full h-screen bg-transparent ${
        isRotating ? "cursor-grabbing" : "cursor-grab"
      }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 10, 1]} intensity={2} />
          <ambientLight intensity={0.5} />

          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor={"#000000"}
            intensity={1}
          />

          <Bird />
          <SkyNight isRotating={isRotating} 
          position={[2,2,2]}
          scale={1}
          />

         <House
          isRotating={isRotating}
          setIsRotating={setIsRotating}
          setCurrentStage={setCurrentStage}
          position={islandPosition}
          rotation={[0.1, 4.7077, 0]}
          scale={islandScale}

          />

      {/* <House
          isRotating={isRotating}
          setIsRotating={setIsRotating}
          setCurrentStage={setCurrentStage}
          position={islandPosition}
          rotation={[0.1, 4.7077, 0]}
          scale={islandScale}

          />*/}
          <Plane 
          isRotating={isRotating}
       
     
          rotation={[0,20,0]}
          position={[0, -0.5,3]}
          scale={[0.6,0.6,0.6]}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
