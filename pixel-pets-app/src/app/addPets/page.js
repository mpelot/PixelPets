'use client'
import React, { useState } from 'react';
import axios from'axios';
import styles from "./addPets.css";
import Navbar from "../navbar/navbar";

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    rarity: '1',
    image: '',
    personalityTrait: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      await axios.post('http://localhost:8085/pets', formData);
      console.log('Pet added successfully');
      setFormData({
        name: '',
        description: '',
        rarity: '1',
        image: '',
        personalityTrait: ''
      });
    } catch (error) {
      console.error('Error adding pet:', error);
    }
  };

  return (
    <div className="addPetsContainer">
      <Navbar />
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <div className="upload">
            <h3 className="newPetTitle">Create New Pet</h3>
            <img
              src="https://static.thenounproject.com/png/187803-200.png"
              alt="Logo"
            />
          </div>
          <div>
            <label>Image:</label>
            <input 
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              />
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Rarity:</label>
            <select
              name="rarity"
              value={formData.rarity}
              onChange={handleInputChange}
            >
              <option value="1">⭐️</option>
              <option value="2">⭐️⭐️</option>
              <option value="3">⭐️⭐️⭐️</option>
              <option value="4">⭐️⭐️⭐️⭐️</option>
              <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
            </select>
          </div>
          <div>
            <label>Personality Trait:</label>
            <select
              name="personalityTrait"
              value={formData.personalityTrait}
              onChange={handleInputChange}
            >
              <option value="">Select One</option>
              <option value="friendly">Friendly</option>
              <option value="outgoing">Outgoing</option>
              <option value="introverted">Introverted</option>
              <option value="loyal">Loyal</option>
              <option value="clever">Clever</option>
              <option value="courageous">Courageous</option>
              <option value="lazy">Lazy</option>
              <option value="independent">Independent</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
