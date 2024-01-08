import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

function ComicCard({ comic }) {
  return (
    <Card sx={{ display: 'flex' }}>

        <CardMedia
        component="img"
        sx={{ width: 113, height: 173 }}
        image={comic.img}
        alt={comic.name}
   
      />
      <CardContent>
        <Typography variant="h6">{comic.name}</Typography>
        <Typography variant="subtitle1">Issue: {comic.issue}</Typography>
        <Typography variant="subtitle1">Stock: {comic.stock}</Typography>
        <Typography variant="subtitle1">Price: ${comic.price}</Typography>
        <Typography variant="body2" color="textSecondary">
          {comic.info}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ComicCard;
