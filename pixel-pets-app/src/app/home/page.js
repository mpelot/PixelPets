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
    <div className='petContainer'>
      <PetCard name={pet.name} img={pet.img} desc={pet.desc}></PetCard>
      <PetCard name={pet.name} img={pet.img} desc={pet.desc}></PetCard>
      <PetCard name={pet.name} img={pet.img} desc={pet.desc}></PetCard>
      <PetCard name={pet.name} img={pet.img} desc={pet.desc}></PetCard>
    </div>
  );
}
