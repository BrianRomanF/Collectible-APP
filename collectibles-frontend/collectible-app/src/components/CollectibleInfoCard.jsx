import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import DeleteIcon from "@mui/icons-material/Delete";
import { CardActionArea, IconButton } from "@mui/material";
import axios from "axios";

function CollectibleInfoCard({ collectible, collectibleType, collectibleSub }) {
  console.log("collectibleInfoCard", collectible, collectibleType, collectibleSub)
  const handleDeleteClick = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      // Show confirmation message and ask for confirmation
      const userConfirmed = window.confirm(
        `Are you sure you want to delete ${collectible.CollectibleName}?`
      );

      if (!userConfirmed) {
        // User canceled the deletion
        return;
      }

      // Send a DELETE request to the server endpoint using Axios
      const response = await axios.delete(
        `http://localhost:3000/api/user/collectibles/${collectibleType}/${collectibleSub}/${collectible.CollectibleName}`
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

  return (
    <div style={{ position: 'relative' }}>
      <Card sx={{ display: "flex" }}>
        <div style={{ position: 'absolute', top: 140, right: 0 }}>
          <IconButton
            aria-label="delete"
            onClick={handleDeleteClick}
          >
            <DeleteIcon />
          </IconButton>
        </div>
        <CardMedia
          component="img"
          sx={{ width: 113, height: 173 }}
          image={collectible.img}
          alt={collectible.name}
        />
        <CardContent>
          <Typography variant="h6">{collectible.CollectibleName}</Typography>
          <Typography variant="subtitle1">
            Issue: {collectible.Issue}
          </Typography>
          <Typography variant="subtitle1">
            Stock: {collectible.Stock}
          </Typography>
          <Typography variant="subtitle1">
            Price: ${collectible.price}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {collectible.info}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default CollectibleInfoCard;
