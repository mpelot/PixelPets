'use client'
import { useState, useEffect, useContext } from "react";
import {UserContext} from '../context/UserContext';
import axios from 'axios';
import Navbar from '../navbar/navbar';
import PetCard from '../petCard/petCard';
import styles from './getPets.css';

export default function GetPets() {
    const [pets, setPets] = useState([]);
    const [displayPets, setDisplayPets] = useState([]);
    const [countdown, setCountdown] = useState("");
    const { userData, setUserData } = useContext(UserContext);

    // Function to fetch pets from the backend
    const fetchPets = () => {
        axios.get(`http://localhost:8085/pets/ofUser/MODEL`)  // Adjust the URL as needed
            .then((response) => {
                setPets(response.data);  // Assume the server response contains the array of pets
                randomizePets(response.data); // Randomize and display initial 3 pets
            })
            .catch((error) => {
                console.error('Failed to fetch pets:', error);
            });
    };

    // Shuffle and display 3 pets
    const randomizePets = (petsData) => {
        let shuffled = [...petsData].sort(() => 0.5 - Math.random());
        setDisplayPets(shuffled.slice(0, 3)); // Take only the first 3 pets
    };

    // Timer to reset daily
    const resetTimer = () => {
        const now = new Date();
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const diff = tomorrow - now;
        return diff;
    };

    useEffect(() => {
        fetchPets();  // Fetch and set pets on load
        const timer = setInterval(() => {
            const timeLeft = resetTimer();
            const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
            const seconds = Math.floor((timeLeft / 1000) % 60);
            setCountdown(`${hours}h ${minutes}m ${seconds}s`);
        }, 1000);
        return () => clearInterval(timer);  // Clean up on unmount
    }, []);

    const handleAdopt = async (pet) => {
      try {
        const petData = {
          userID: userData.user.id,
          name: pet.name,
          description: pet.description,
          rarity: pet.rarity,
          image: pet.image,
          personalityTrait: pet.personalityTrait
        }

        await axios.post('http://localhost:8085/pets', petData);
        console.log('Pet added successfully');
      } catch (error) {
        console.error('Error adding pet:', error);
      }
    }

    return (
      <div className="getPetsContainer">
        <Navbar />
        <div className="getFormContainer">
          <h1>Daily Pets</h1>
          <div className="timerDisplay">Next refresh in: {countdown}</div>
          <div className="petsDisplay">
            {displayPets.map((pet) => (
              <div className="petCardContainer" key={pet._id}>
                <PetCard
                  name={pet.name}
                  img={pet.image}
                  desc={pet.description}
                  trait={pet.personalityTrait}
                  rarity={pet.rarity}
                />
                <button className="adoptButton" onClick={() => handleAdopt(pet)}>Adopt</button>
              </div>
            ))}
          </div>
          <button onClick={() => randomizePets(pets)} className="refreshButton">
            Refresh Pets
          </button>
        </div>
      </div>
    );
}
