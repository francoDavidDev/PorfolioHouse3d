import React from "react";
import { Link } from "react-router-dom";
import { arrow } from "../icons";

const InfoBox = ({ text, link, btnText }) => (
  <div className="info-box">
    <p className="font-medium sm:text-xl text-center"> {text}</p>
    <Link to={link} target="_blank" className="neo-brutalism-white neo-btn">
      {btnText}
      <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
    </Link>
  </div>
);

const renderContent = {
  1: (
    <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">
      Hola, Me llamo <span className="font-semibold"> Franco David Gomez</span>
      <br />soy <span className="text-red-500 font-semibold"> Fullstack Developer</span> 
      <br />
      Arrastra la casa para poder volar sobre mi casa
    </h1>
  ),
  2: (
    <InfoBox
     
      text={"Trabajé en muchos proyectos y adquirí muchas habilidades a lo largo del camino."}
      link="https://porfolio3d-ruby.vercel.app/"
      btnText={"Visitar mi porfolio"}
    />
  ),
  3: (
    <InfoBox
       text={"Si quieres saber quién soy, tengo un video de presentación en YouTube"}
      link="https://www.youtube.com/watch?v=iC1iS3Jyu5k&ab_channel=FrancoGomez"
      btnText={"Video presentacion"}
    />
  ),
  4: (
    <InfoBox
      text={"Si quieres puedes visitarme por mi LinkedIn, subo contenido sobre programacion"}
      link="https://www.linkedin.com/in/franco-david-gomez-036721242/"
      btnText={"Ir a mi LinkedIn"}
    />
  ),
};

const HomeInfo = ({ currentStage }) => {
  return renderContent[currentStage] || null;
};

export default HomeInfo;
