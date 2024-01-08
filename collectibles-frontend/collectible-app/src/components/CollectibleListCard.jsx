import React from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import DeleteIcon from "@mui/icons-material/Delete";
import { CardActionArea, IconButton } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import {
  deepPurple,
  lightBlue,
  cyan,
  lightGreen,
  indigo,
} from "@mui/material/colors";

const CollectibleListCard = ({ collectible, collectibleType }) => {
  const handleDeleteClick = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      // Show confirmation message and ask for confirmation
      const userConfirmed = window.confirm(
        `Are you sure you want to delete ${collectible.subcategory}?`
      );

      if (!userConfirmed) {
        // User canceled the deletion
        return;
      }
      console.log("llego aca",collectibleType, collectible.subcategory);
      // Send a DELETE request to the server endpoint using Axios
      const response = await axios.delete(
        `http://localhost:3000/api/user/collectibles/${collectibleType}/${collectible.subcategory}`
      );

      if (response.status === 200) {
        // Refresh the page after successful deletion
        window.location.reload();
        // Alternatively, you can update the state to re-render the component
        // setRefreshPage(true);
        // Handle success with a pop-up message
        alert("Collectible deleted successfully");
      } else {
        // Handle error with a pop-up message
        alert("Failed to delete collectible");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const cardStyles = {
    display: "flex",
    flexDirection: "column", // Align children horizontally
    maxWidth: 200,
    margin: "10px",
    position: "relative",
    backgroundColor: collectible.id % 2 === 0 ? "#e0e0e0" : "#f0f0f0",
    borderRadius: "8px", // Add border-radius to make corners rounded
    overflow: "hidden", // Hide overflow to maintain shape
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
    border: "2px solid black", // Add a black border
    textDecoration: "none", // Remove default link styles
    color: "inherit", // Inherit color from parent
  };

  const avatarStyles = [
    { backgroundColor: deepPurple[500] },
    { backgroundColor: lightBlue[500] },
    { backgroundColor: cyan[500] },
    { backgroundColor: lightGreen[500] },
    { backgroundColor: indigo[500] },
  ];

  const getRandomStyle = () => {
    const randomIndex = Math.floor(Math.random() * avatarStyles.length);
    return avatarStyles[randomIndex];
  };

  const randomStyle = getRandomStyle();

  return (
    <Card
      sx={cardStyles}
      style={randomStyle}
      component={Link}
      to={`/collectibles/${collectibleType}/${collectible.subcategory}`}
    >
      <div style={{ borderBottom: "2px solid black" }}>
        <div
          style={{
            backgroundColor: "white",
            height: "20px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "50%",
              height: "100%",
              backgroundColor: "white",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              width: "50%",
              height: "100%",
              backgroundColor: "#ccc",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "-10px",
              left: "50%",
              width: "0",
              height: "0",
              borderTop: "10px solid transparent",
              borderBottom: "10px solid white",
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              transform: "translateX(-50%)",
            }}
          />
        </div>
      </div>
      <CardContent
        style={{
          flex: "1 1 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          style={{ color: "white", marginTop: "20px" }}
        >
          {collectible.subcategory}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share collection</Button>
      </CardActions>
      <div style={{ position: "absolute", top: 12, right: 0 }}>
        <IconButton aria-label="delete" onClick={handleDeleteClick}>
          <DeleteIcon />
        </IconButton>
      </div>
    </Card>
  );
};

export default CollectibleListCard;
