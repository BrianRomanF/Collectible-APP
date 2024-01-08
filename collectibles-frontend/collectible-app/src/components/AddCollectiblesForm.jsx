import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import axios from "axios";

const AddCollectiblesForm = () => {
  const [collectibleTypes, setCollectibleTypes] = useState([]);
  const [collectibleType, setCollectibleType] = useState("");
  const [subcategory, setSubcategory] = useState(""); // New field for subcategory
  const [name, setName] = useState("");
  const [issue, setIssue] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [info, setInfo] = useState("");
  const [img, setImg] = useState("");
  const [platform, setPlatform] = useState("");
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

  const createCollectibleList = async () => {
    try {
      if (!collectibleType || !subcategory || !name || !issue || !stock || !price || !img) {
        setError("Please fill in all fields.");
        return;
      }

      // Display an advisory message to ensure the correct subcategory name
      const isConfirmed = window.confirm(
        `Please ensure the correct subcategory name "${subcategory}". Otherwise, a new subcategory with this name will be created. Continue?`
      );

      if (!isConfirmed) {
        return;
      }

      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};
      
      await axios.post("http://localhost:3000/api/user/addCollectible", {
        userId: userId,
        collectibleType: collectibleType,
        subcategory: {
          name: subcategory, // Use the subcategory state
          collectibles: [
            {
              CollectibleName: name,
              Issue: issue,
              Stock: stock,
              price: price,
              info: info,
              img: img,
              platform: platform,
            },
          ],
        },
      }, {
        headers,
      });

      // Clear any previous error messages
      setError(null);
      setSuccessMessage("Collectible successfully added!");
      
      // Reset form fields
      setCollectibleType("");
      setSubcategory("");
      setName("");
      setIssue("");
      setStock("");
      setPrice("");
      setInfo("");
      setImg("");
      setPlatform("");

      setTimeout(() => {
        navigate(`/collectibles/${collectibleType}/${subcategory}`);
      }, 2000);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <h1>Add Collectible!</h1>
      
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
        placeholder="Subcategory"
        value={subcategory}
        onChange={(e) => setSubcategory(e.target.value)}
      />

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Issue"
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
      />
      <input
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        placeholder="Info"
        value={info}
        onChange={(e) => setInfo(e.target.value)}
      />
      <input
        placeholder="Image URL"
        value={img}
        onChange={(e) => setImg(e.target.value)}
      />
      <input
        placeholder="Platform"
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <button onClick={createCollectibleList}>Create Collectible</button>
    </div>
  );
};

export default AddCollectiblesForm;
