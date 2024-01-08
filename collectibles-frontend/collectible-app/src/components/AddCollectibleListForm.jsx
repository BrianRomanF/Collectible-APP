import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import axios from "axios";

const AddCollectibleListForm = () => {
  const [name, setName] = useState("");
  const [typeImg, setTypeImg] = useState("");
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setUserId(user.email);
      }
    };

    fetchData();
  }, [user]);

  const createCollectibleList = async () => {
    try {
      if (!name || !typeImg ) {
        setError("Please fill in all fields.");
        return;
      }



      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};
      await axios.post("http://localhost:3000/api/user/addCollectibleList", {
        userId: userId, // Use userId instead of user.email
        collectibleType: name,
        typeImg: typeImg,
      },{
        headers,
      });
      // Clear any previous error messages
      setError(null);
      setSuccessMessage("Article successfully added!");
      setName("")
      setTypeImg("")
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <h1>Add Collectible!</h1>
      <input
        placeholder="Collectible Type Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Put an Image URL for reference"
        value={typeImg}
        onChange={(e) => setTypeImg(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <button onClick={createCollectibleList} >
        Create Collectible
      </button>
    </div>
  );
};

export default AddCollectibleListForm;
