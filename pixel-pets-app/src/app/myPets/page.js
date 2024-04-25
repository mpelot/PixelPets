"use client";
import styles from "./myPets.css";
import { useState } from "react";
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
    {
      id: "3",
      name: "Turtle",
      img: "Turtle.png",
      desc: "This is a turtle rahhhhhhh",
    },
    {
      id: "4",
      name: "Turtle",
      img: "Turtle.png",
      desc: "This is a turtle rahhhhhhh",
    },
    {
      id: "5",
      name: "Turtle",
      img: "Turtle.png",
      desc: "This is a turtle rahhhhhhh",
    },
    {
      id: "6",
      name: "Turtle",
      img: "Turtle.png",
      desc: "This is a turtle rahhhhhhh",
    },
    {
      id: "7",
      name: "Turtle",
      img: "Turtle.png",
      desc: "This is a turtle rahhhhhhh",
    },
    {
      id: "8",
      name: "Turtle",
      img: "Turtle.png",
      desc: "This is a turtle rahhhhhhh",
    },
    {
      id: "9",
      name: "Turtle",
      img: "Turtle.png",
      desc: "This is a turtle rahhhhhhh",
    },
    {
      id: "10",
      name: "Turtle",
      img: "Turtle.png",
      desc: "This is a turtle rahhhhhhh",
    },
    {
      id: "11",
      name: "Turtle",
      img: "Turtle.png",
      desc: "This is a turtle rahhhhhhh",
    },
  ]);

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
            <div className="petCardContainer">
              <PetCard
                key={pet.id}
                name={pet.name}
                img={pet.img}
                desc={pet.desc}
              />
              <button className="editButton">Edit</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
