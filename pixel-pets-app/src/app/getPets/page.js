'use client'
import React, { useState } from 'react';
import styles from "./getPets.css";

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    rarity: '1',
    personalityTrait: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      name: '',
      description: '',
      rarity: '1',
      personalityTrait: ''
    });
  };

  return (
    <div>
      <header>
        <h1>Pixel Pets</h1>
      </header>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="upload">
            <h3>Create New Pet</h3>
            <img src="https://static.thenounproject.com/png/187803-200.png" alt="Logo" />
            <input type="file" />
          </div>
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange}/>
          </div>
          <div>
            <label>Description:</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange}/>
          </div>
          <div>
            <label>Rarity:</label>
            <select name="rarity" value={formData.rarity} onChange={handleInputChange}>
              <option value="1">â˜…â˜†â˜†â˜†â˜†</option>
              <option value="2">â˜…â˜…â˜†â˜†â˜†</option>
              <option value="3">â˜…â˜…â˜…â˜†â˜†</option>
              <option value="4">â˜…â˜…â˜…â˜…â˜†</option>
              <option value="5">â˜…â˜…â˜…â˜…â˜…</option>
            </select>
          </div>
          <div>
            <label>Personality Trait:</label>
            <select name="personalityTrait" value={formData.personalityTrait} onChange={handleInputChange}>
              <option value="">Select One</option>
              <option value="friendly">Friendly</option>
              <option value="outgoing">Outgoing</option>
              <option value="introverted">Introverted</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
