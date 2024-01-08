import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import axios from "axios";
import CollectibleListCard from "../components/CollectibleListCard";
import Container from "@mui/material/Container";

const CollectibleListPage = () => {
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
      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};
      const response = await axios.post(
        `http://localhost:3000/api/user/getSubcategories`,
        { userId: user?.email, collectibleType },
        {
          headers,
        }
      );

      setCollectibleInfo(response.data.subcategories);
      if (response.data.subcategories.length === 0) {
        setNoCollectiblesMessage("No collectibles found.");
      }
    } catch (error) {
      console.error("Error loading collectible info:", error.message);
    }
  };

  return (
    <>
      {noCollectiblesMessage ? (
        <div>
          <h1>{noCollectiblesMessage}</h1>
          <p>
            <Link to={`/dashboard/addSubcategoriesForm`}>
              Add a Subcategory
            </Link>
          </p>
          <Link to="/dashboard/addCollectibleForm">Add Collectible</Link>
        </div>
      ) : (
        <>
          <h1>{collectibleType.toUpperCase()} CATEGORIES:</h1>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {collectibleInfo ? (
              collectibleInfo.map((collectible) => (
                <div key={collectible._id}>
                  <Container fixed>
                    <div style={{ margin: "10px" }}>
                      <CollectibleListCard
                        collectible={collectible}
                        collectibleType={collectibleType}
                      />
                    </div>
                  </Container>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <Link to={`/dashboard/addSubcategoriesForm`}>
            <button>Add Subcategory</button>
          </Link>
        </>
      )}
    </>
  );
};

export default CollectibleListPage;
