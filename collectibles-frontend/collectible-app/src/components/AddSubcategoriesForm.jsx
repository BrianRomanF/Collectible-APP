import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import axios from "axios";

const AddSubcategoriesForm = () => {
  const [collectibleTypes, setCollectibleTypes] = useState([]);
  const [collectibleType, setCollectibleType] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setUserId(user.email);
        // Fetch collectible types for the user
        try {
          const response = await axios.post("http://localhost:3000/api/user/getCollectibleTypes", {
            userId: user.email,
          });
          setCollectibleTypes(response.data.collectibleTypes);
        } catch (error) {
          console.error("Error fetching collectible types:", error);
        }
      }
    };

    fetchData();
  }, [user]);

  const createSubcategory = async () => {
    try {
      if (!collectibleType || !subcategoryName) {
        setError("Please fill in all fields.");
        return;
      }

      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};
      
      await axios.post("http://localhost:3000/api/user/addSubcategories", {
        userId: userId,
        collectibleType: collectibleType,
        subcategories: [
          {
            subcategory: subcategoryName,
          },
        ],
      }, {
        headers,
      });

      // Clear any previous error messages
      setError(null);
      setSuccessMessage("Subcategory successfully added!");

      // Reset form fields
      setCollectibleType("");
      setSubcategoryName("");

      setTimeout(() => {
        navigate(`/collectibles/${collectibleType}`);
      }, 2000);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <h1>Add Subcategory!</h1>
      
      <select
        id="collectibleType"
        value={collectibleType}
        onChange={(e) => setCollectibleType(e.target.value)}
      >
        <option value="" disabled>Select Collectible Type</option>
        {collectibleTypes.map((type) => (
          <option key={type.type} value={type.type}>{type.type}</option>
        ))}
      </select>

      <input
        placeholder="Subcategory Name"
        value={subcategoryName}
        onChange={(e) => setSubcategoryName(e.target.value)}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <button onClick={createSubcategory}>Create Subcategory</button>
    </div>
  );
};

export default AddSubcategoriesForm;
