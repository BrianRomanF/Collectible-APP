import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

export default function CollectibleCard({ collectibleType, collectibleImage, collectibleInfo }) {
  const handleDeleteClick = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      // Show confirmation message and ask for confirmation
      const userConfirmed = window.confirm(`Are you sure you want to delete ${collectibleType}?`);

      if (!userConfirmed) {
        // User canceled the deletion
        return;
      }

      // Send a DELETE request to the server endpoint using Axios
      const response = await axios.delete(`http://localhost:3000/api/user/collectibles/${collectibleType}`);

      if (response.status === 200) {
        // Refresh the page after successful deletion
        window.location.reload();
        // Alternatively, you can update the state to re-render the component
        // setRefreshPage(true);
        // Handle success with a pop-up message
        alert('Collectible deleted successfully');
      } else {
        // Handle error with a pop-up message
        alert('Failed to delete collectible');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card sx={{ maxWidth: 345, position: 'relative' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="220"
          image={collectibleImage}
          alt={collectibleType}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {collectibleType}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {collectibleInfo}
          </Typography>
        </CardContent>
      </CardActionArea>
      <div style={{ position: 'absolute', top: 5, right: 5 }}>
        <IconButton
          aria-label="delete"
          onClick={handleDeleteClick}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </Card>
  );
}
