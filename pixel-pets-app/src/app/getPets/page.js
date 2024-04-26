'use client'
import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/navbar';
import PetCard from '../petCard/petCard';
import styles from './getPets.css';

export default function getPets() {
    const [pets, setPets] = useState([
        { id: 1, name: 'pet 1', img: 'Turtle.png', desc: 'A friendly dog', rarity: '1', personalityTrait: 'friendly' },
        { id: 2, name: 'pet 2', img: 'Turtle.png', desc: 'A sneaky cat', rarity: '2', personalityTrait: 'outgoing' },
        { id: 3, name: 'pet 3', img: 'Turtle.png', desc: 'A chirpy bird', rarity: '3', personalityTrait: 'introverted' }
    ]);
    const [countdown, setCountdown] = useState("");

    const shufflePets = () => {
        let shuffled = [...pets].sort(() => 0.5 - Math.random());
        setPets(shuffled);
        resetTimer();
    };

    const resetTimer = () => {
        const now = new Date();
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const diff = tomorrow - now;
        return diff;
    };

    useEffect(() => {
        shufflePets(); // Initial shuffle on load
        const timer = setInterval(() => {
            const timeLeft = resetTimer();
            const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
            const seconds = Math.floor((timeLeft / 1000) % 60);
            setCountdown(`${hours}h ${minutes}m ${seconds}s`);
        }, 1000);

        return () => clearInterval(timer); // Clear interval on component unmount
    }, []);

    return (
      <div className="getPetsContainer">
        <Navbar />
        <div className="getFormContainer">
          <h1>Daily Pets</h1>
          <div className="timerDisplay">Next refresh in: {countdown}</div>
          <div className="petsDisplay">
            {pets.map((pet) => (
              <div key={pet.id} className="petCardContainer">
                <PetCard
                  name={pet.name}
                  img={pet.img}
                  desc={`${pet.desc}, Rarity: ${pet.rarity}`}
                />
                <button className="adoptButton">Adopt</button>
              </div>
            ))}
          </div>
          <button onClick={shufflePets} className="refreshButton">
            Refresh Pets
          </button>
        </div>
      </div>
    );
}
