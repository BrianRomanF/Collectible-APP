import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import axios from "axios";
import MultiActionAreaCard from "../components/MultiActionAreaCard";

const CollectibleDetailPage = () => {
  const { collectibleType } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const [collectibleInfo, setCollectibleInfo] = useState([]);
  const [noCollectiblesMessage, setNoCollectiblesMessage] = useState(null);

  useEffect(() => {
    if (user) {
      loadCollectibleInfo();
    }
  }, [collectibleType, user]);

  const loadCollectibleInfo = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/user/getAllCollectibles/${collectibleType}`,
        { userId: user?.email }
      );

      // Check if the response contains the expected data
      if (response.data && Array.isArray(response.data)) {
        const newCollectibleInfo = response.data;
        // Create a Set to store unique names
        const uniqueNames = new Set();

        // Define the property to filter based on collectibleType
        let filterProperty;

        switch (collectibleType) {
          case "comics":
            filterProperty = "collectibleName";
            break;
          case "games":
            filterProperty = "platform";
            break;
          case "figures":
            filterProperty = "stock";
            break;
          case "vinyls":
            filterProperty = "artist";
            break;
          default:
            console.error("Invalid collectibleType");
            return;
        }

        // Create a new array with unique names or properties based on the collectibleType
        const uniqueFilteredCollectibles = newCollectibleInfo.filter((collectible) => {
          if (!uniqueNames.has(collectible[filterProperty])) {
            uniqueNames.add(collectible[filterProperty]);
            return true;
          }
          return false;
        });

        setCollectibleInfo(uniqueFilteredCollectibles);

        if (uniqueFilteredCollectibles.length === 0) {
          setNoCollectiblesMessage(
            `You don't have ${collectibleType} yet. Add some!`
          );
        } else {
          setNoCollectiblesMessage(null);
        }
      } else {
        console.error("Invalid response format");
      }
    } catch (error) {
      console.error("Error loading collectibles info:", error.message);
    }
  };

  return (
    <>
      {noCollectiblesMessage ? (
        <div>
          <h1>{noCollectiblesMessage}</h1>
          <Link to="/addcollectible">Add Collectible</Link>
        </div>
      ) : (
        <>
          <div>
            <h1>{collectibleType.toUpperCase()} LIST:</h1>
            <MultiActionAreaCard collectibles={collectibleInfo}/>
          </div>
        </>
      )}
    </>
  );
};

export default CollectibleDetailPage;
