import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useUser from "../hooks/useUser";
import axios from "axios";
import CollectibleInfoCard from "../components/CollectibleInfoCard";


const CollectiblesPage = () => {
  const { collectibleType, name } = useParams();
  const [collectibleInfo, setCollectibleInfo] = useState([]);
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20); // Number of collectibles per page

  useEffect(() => {
    if (user) {
      loadCollectiblesInfo();
    }
  }, [collectibleType, name, user]);

  const loadCollectiblesInfo = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/user/getCollectiblesByName`, 
        {
          userId: user?.email,
          collectibleType,
          subcategory: {
            name,
          },
        }
      );

      const newCollectiblesInfo = response.data;
      // Adjust the data structure access based on the actual structure
      const sortedCollectibles = newCollectiblesInfo[0]?.collectibles.sort((a, b) => a.issue - b.issue) || [];
      setCollectibleInfo(sortedCollectibles);
    } catch (error) {
      console.error("Error loading collectibles:", error);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedCollectibles = collectibleInfo.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

 
  return (
    <div>
      <h1>{name.toUpperCase()}</h1>
      <Link to="/dashboard/addCollectibleForm">
        <button>Add Collectible</button>
      </Link>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {paginatedCollectibles.map((collectible, index) => (
          <div key={index} style={{ margin: "10px" }}>
            <CollectibleInfoCard collectible={collectible} collectibleType={collectibleType} collectibleSub={name} />
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>{" "}
        {Array.from({ length: Math.ceil(collectibleInfo.length / pageSize) }, (_, index) => (
          <span
            key={index}
            style={{
              cursor: "pointer",
              textDecoration: currentPage === index + 1 ? "underline" : "none",
              margin: "0 5px",
            }}
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </span>
        ))}
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === Math.ceil(collectibleInfo.length / pageSize)}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default CollectiblesPage;
