import React, { useState, Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "../components/Loader";
import Island from "../models/Island";
import Sky from "../models/Sky";
import Cash from "../models/Cash";
import Plane from "../models/Plane";
import HomeInfo from "../components/HomeInfo";
import SkyNight from "../models/SkyNight";
import Ciberpunk from "../models/Ciberpunk";
import Coffee from "../models/Coffee";
import Bird from "../models/Bird";

//Sound
import music from "../sounds/bladeRunner.mp3";
import { soundon } from "../icons";

//image
import { soundoff } from "../icons";
import Clock from "../models/Clock";

//import Nebular from "../models/Plane2";

const Home = () => {
  const audioRef = useRef(new Audio(music));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;
  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(true);

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    };
  }, [isPlayingMusic]);

  {
    /* ajustar diseño principal */
  }
  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6.5, -43.4];
    } else {
      //house
      //screenScale = [20,20,20];
      //screenPosition = [-1, -1.5, -15];
      //ciberunk
      screenScale = [4, 4, 4];
      screenPosition = [-1, -1, -7];
    }

    return [screenScale, screenPosition];
  };

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }
    return [screenScale, screenPosition, islandRotation];
  };

  const [islandScale, islandPosition, islandRotation] =
    adjustIslandForScreenSize();

  const [planeScale, planePosition] = adjustPlaneForScreenSize();

  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
      

        <Suspense fallback={<Loader />}>
          <directionalLight position={[0, 20, -27]} intensity={0.1} />
          <ambientLight intensity={0.5}  color={"#0000FF"}/>

          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor={"#000000"}
            intensity={1}
          />

          <Bird/>
          <Cash />
          <Coffee/>
          <Clock/>
          <SkyNight isRotating={isRotating} position={[2, 2, 2]} scale={1} />

        

          <Ciberpunk
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={islandPosition}
            rotation={[0.1, 4.7077, 0]}
            scale={islandScale}
          />

         {/*  <Plane
            isRotating={isRotating}
            rotation={[0, 20, 0]}
            position={[0, -1, 3]}
            scale={[0.6, 0.6, 0.6]}
          />*/}
        </Suspense>
        {/*esquina superior Derecha */}
        <Suspense>
          <directionalLight position={[50, 0, -50]} intensity={0.5} />
          <ambientLight intensity={0.5} color={"#0000FF"} />
        </Suspense>

        {/* luz total arriba */}
        <Suspense>
          <directionalLight position={[30, 50, -50]} intensity={0.5} />
          <ambientLight intensity={0.5}  color={"#0000FF"}/>
        </Suspense>
      </Canvas>

      <div className="absolute bottom-2 left-2">
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt="sound"
          className="w-10 h-10 cursor-pointer object-contain"
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
        />
      </div>
    </section>
  );
};

export default Home;
