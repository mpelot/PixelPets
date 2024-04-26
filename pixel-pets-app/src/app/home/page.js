"use client";
import { useState } from "react";
import styles from "./home.css";
import PetCard from "../petCard/petCard";
import Navbar from "../navbar/navbar";

export default function Home() {
  const [pets, setPets] = useState([
    {
      id: "0",
      name: "Turtle",
      img: "Turtle.png",
      desc: "This is a turtle rahhhhhhh",
    },
    {
      id: "1",
      name: "Turtle",
      img: "Turtle.png",
      desc: "This is a turtle rahhhhhhh",
    },
    {
      id: "2",
      name: "Turtle",
      img: "Turtle.png",
      desc: "This is a turtle rahhhhhhh",
    },
  ]);

  return (
<div className="homePetContainer">
  <Navbar />
  <div className="homeTitleContainer">
    <div className="homePixelPets">
      <img src="logo.png" />
      <h1 className="mainTitle">Pixel Pets</h1>
    </div>
    
      <button className="browse"><a href="./getPets">Browse Pets</a></button>

  </div>

  <h2 className="homeSubtitle">My Pets</h2>

  <div className="homeSubContainer">
    <div className="homeMyCards">
      {pets.map((pet) => (
        <PetCard
          key={pet.id}
          name={pet.name}
          img={pet.img}
          desc={pet.desc}
        ></PetCard>
      ))}
    </div>
  </div>
</div>

  );
}
