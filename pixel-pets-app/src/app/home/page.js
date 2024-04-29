"use client";
import { useState, useEffect } from "react";
import styles from "./home.css";
import PetCard from "../petCard/petCard";
import Navbar from "../navbar/navbar";
import axios from "axios";

export default function Home() {

  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8085/pets/ofUser/MODEL`)
    .then((res) => {
      setPets(res.data);
    })
  }, []) 

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
      {pets.map((pet, index) => (
        <PetCard
          key={index}
          name={pet.name}
          img={pet.image}
          desc={pet.description}
          trait={pet.personalityTrait}
          rarity={pet.rarity}
        ></PetCard>
      ))}
    </div>
  </div>
</div>

  );
}
