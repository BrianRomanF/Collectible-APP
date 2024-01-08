import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "react-router-dom";

const MultiActionAreaCard = ({ collectible }) => {
 
  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {collectible.map((collectible) => (
        <Card
          sx={{ maxWidth: 400, marginBottom: "20px" }}
          key={
            collectible._id + collectible.collectibleName + collectible.issue
          }
        >
          <CardActionArea>
            {collectible.collectibleType === "comics" && (
              <CardMedia
                component="img"
                height="350"
                image={collectible.img}
                alt={collectible.collectibleName}
              />
            )}
            {collectible.collectibleType === "games" && (
              <CardMedia
                component="img"
                height="250"
                image={`../src/static/images/${collectible.platform.toLowerCase()}.jpg`}
                alt={collectible.collectibleName}
                sx={{
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  width: "100%",
                }}
              />
            )}
            {collectible.collectibleType === "figures" && (
              <CardMedia
                component="img"
                height="250"
                image={collectible.img}
                alt={collectible.collectibleName}
              />
            )}
            {collectible.collectibleType === "vinyl" && (
              <CardMedia
                component="img"
                height="250"
                image={collectible.img}
                alt={collectible.collectibleName}
              />
            )}

            <CardContent>
              {collectible.collectibleType === "comics" && (
                <Typography gutterBottom variant="h5" component="div">
                  {collectible.collectibleName}
                </Typography>
              )}
              {collectible.collectibleType === "games" && (
                <Typography gutterBottom variant="h5" component="div">
                  {collectible.platform.toUpperCase()}
                </Typography>
              )}
              {collectible.collectibleType === "figures" && (
                <Typography variant="body2" color="textSecondary">
                  Stock: {collectible.stock}
                </Typography>
              )}
              {collectible.collectibleType === "vinyl" && (
                <Typography variant="body2" color="textSecondary">
                  Artist: {collectible.artist}
                </Typography>
              )}
            </CardContent>
          </CardActionArea>
          <CardActions>
            {collectible.collectibleType === "comics" && (
              <Button
                component={Link}
                to={`/collectibles/${collectible.collectibleType}/${collectible.collectibleName}`}
                size="small"
                color="primary"
              >
                Go To {collectible.collectibleName.substring(0, 20)}{" "}
                {collectible.collectibleType}
              </Button>
            )}
            {collectible.collectibleType === "games" && (
              <Button
                component={Link}
                to={`/collectibles/${collectible.collectibleType}/${collectible.collectibleName}`}
                size="small"
                color="primary"
              >
                Go To {collectible.platform} {collectible.collectibleType}
              </Button>
            )}
            {collectible.collectibleType === "figures" && (
              <Button
                component={Link}
                to={`/collectibles/${collectible.collectibleType}/${collectible.collectibleName}`}
                size="small"
                color="primary"
              >
                Go To {collectible.collectibleName.substring(0, 20)}{" "}
                {collectible.collectibleType}
              </Button>
            )}
            {collectible.collectibleType === "vinyl" && (
              <Button
                component={Link}
                to={`/collectibles/${collectible.collectibleType}/${collectible.collectibleName}`}
                size="small"
                color="primary"
              >
                Go To {collectible.collectibleName.substring(0, 20)}{" "}
                {collectible.collectibleType}
              </Button>
            )}
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default MultiActionAreaCard;
