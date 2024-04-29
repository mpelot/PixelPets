"use client"
import styles from "./managePets.css";
import { useState, useEffect } from "react";
import PetCard from "../petCard/petCard";
import Navbar from "../navbar/navbar";
import axios from "axios";

export default function Home() {
  const [pets, setPets] = useState([]);
  const [editFormData, setEditFormData] = useState({
    id: null,
    name: "",
    description: "",
    rarity: "1",
    image: "",
    personalityTrait: "",
  });
  const [editPopupVisible, setEditPopupVisible] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8085/pets/ofUser/MODEL`).then((res) => {
      setPets(res.data);
    });
  }, []);

  const handleEdit = (pet) => {
    setEditFormData({
      id: pet._id,
      name: pet.name,
      description: pet.description,
      rarity: pet.rarity,
      image: pet.image,
      personalityTrait: pet.personalityTrait,
    });
    setEditPopupVisible(true);
  };

  const handleSubmitEdit = async () => {
    try {
      await axios.post(
        `http://localhost:8085/pets/${editFormData.id}`,
        editFormData
      );
      console.log("Pet edited successfully");
      setEditPopupVisible(false);
      setEditFormData({
        id: null,
        name: "",
        description: "",
        rarity: "1",
        image: "",
        personalityTrait: "",
      });
    } catch (error) {
      console.error("Error editing pet:", error);
    }
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
              <button className="editButton" onClick={() => handleEdit(pet)}>
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Popup */}
      {editPopupVisible && (
        <div className="editPopupOverlay">
          <div className="editPopup">
            <button
              className="exitButton"
              onClick={() => setEditPopupVisible(false)}
            >
              X
            </button>
            <h3>Edit Pet</h3>
            <form onSubmit={handleSubmitEdit} className="form">
              <label>Name:</label>
              <input
                type="text"
                value={editFormData.name}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, name: e.target.value })
                }
              />
              <label>Description:</label>
              <textarea
                value={editFormData.description}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    description: e.target.value,
                  })
                }
              ></textarea>
              <label>Rarity:</label>
              <select
                value={editFormData.rarity}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, rarity: e.target.value })
                }
              >
                <option value="1">⭐️</option>
                <option value="2">⭐️⭐️</option>
                <option value="3">⭐️⭐️⭐️</option>
                <option value="4">⭐️⭐️⭐️⭐️</option>
                <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
              </select>
              <label>Image URL:</label>
              <input
                type="text"
                value={editFormData.image}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, image: e.target.value })
                }
              />
              <label>Personality Trait:</label>
              <select
                name="personalityTrait"
                value={editFormData.personalityTrait}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    personalityTrait: e.target.value,
                  })
                }>
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
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
