'use client'

import { useState } from 'react';
import styles from "./home.css";
import PetCard from "../petCard/petCard";

export default function Home() {

  const [pet, setPet] = useState(
    {
      name: 'Turtle',
      img: "Turtle.png",
      desc: "This is a turtle rahhhhhhh"
    }
  );

  return (
    <div className="petContainer">
      <div className="titleContainer">
        <div className="pixelPets">
          <img src="logo.png" />
          <h1 className="mainTitle">Pixel Pets</h1>
        </div>

        <button className="browse">Browse Pets</button>
      </div>
      <div className="subContainer">
        <div className="subheader">
          <h2 className="subtitle">My Pets</h2>
        </div>

        <div className="myCards">
          <PetCard name={pet.name} img={pet.img} desc={pet.desc}></PetCard>
          <PetCard name={pet.name} img={pet.img} desc={pet.desc}></PetCard>
          <PetCard name={pet.name} img={pet.img} desc={pet.desc}></PetCard>
          <PetCard name={pet.name} img={pet.img} desc={pet.desc}></PetCard>
        </div>
      </div>
    </div>
  );
}
