import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import useUser from "../hooks/useUser";
import CollectibleCard from "../components/CollectibleCard";


const DashboardPage = () => {
  const { user, isLoading } = useUser();
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const [collectibleTypes, setCollectibleTypes] = useState([]);

  useEffect(() => {
    if (user) {
      setUserId(user.email);
      fetchCollectibleTypes();
    }
  }, [user]);

  const fetchCollectibleTypes = async () => {
    try {
      // Check if user is available and not loading
      if (!user || isLoading) {
        console.error("User is null or undefined, or still loading");
        return;
      }
     

      const response = await axios.post(
        "http://localhost:3000/api/user/getCollectibleTypes",
        {
          userId: user.email,
        }
      );

      setCollectibleTypes(response.data.collectibleTypes);
    } catch (error) {
      console.error("Error fetching collectible types:", error.message);
    }
  };

  

  const handleAddCollectibleClick = () => {
    // Navigate to the AddCollectibleListForm page
    navigate("/dashboard/addCollectibleList");
  };

  return (
    <div className="dashboard-container">
      <div>
        <h1>See your collection!</h1>
        {isLoading && <p>Loading...</p>}
        {!isLoading && (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div className="collectibles-cards">
              {collectibleTypes.map((collectibleType) => {
                let collectibleImage;

                // Check if the collectibleType is one of the specified types
                if (
                  ["comics", "figures", "games", "vinyls"].includes(
                    collectibleType.type.toLowerCase()
                  )
                ) {
                  collectibleImage = `src/static/images/${collectibleType.type.toLowerCase()}.jpg`; // Adjust the file extension as needed
                } else {
                  collectibleImage = collectibleType.typeImg;
                }

                return (
                  <Link
                    key={collectibleType.type}
                    to={`/collectibles/${collectibleType.type}`}
                    className="collectible-link"
                  >
                    <CollectibleCard
                      collectibleType={collectibleType.type}
                      collectibleImage={collectibleImage}
                      collectibleInfo={`See your ${collectibleType.type} collection Here!`}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        )}
         {/* Button to navigate to the AddCollectibleListForm page */}
         <button onClick={handleAddCollectibleClick} style={{ margin: "15px 0" }}>
          Add a New Collectible
        </button>
      </div>
      
    </div>
    
  );
};

export default DashboardPage;
