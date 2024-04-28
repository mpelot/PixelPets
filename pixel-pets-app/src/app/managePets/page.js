"use client";
import styles from "./managePets.css";
import { useState, useEffect } from "react";
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

   const handleEdit = (id) => {
       console.log(`Edit pet with ID: ${id}`);
   };
  return (
    <div className="petContainer">
      <Navbar />

      <h2 className="subtitle">Admin Access: All Pets</h2>

      <div className="subContainer">
        <div className="myCards">
          {pets.map((pet) => (
            <div className="petCardContainer" key={pet._id}>
              <PetCard
                name={pet.name}
                img={pet.image}
                desc={pet.description}
                trait={pet.personalityTrait}
                rarity={pet.rarity}
              />
              <button className="editButton">Edit</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
