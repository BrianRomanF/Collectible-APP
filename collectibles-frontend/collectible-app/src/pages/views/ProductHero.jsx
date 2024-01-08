import * as React from "react";
import Button from "../../components/Button";
import Typography from "../../components/Typography";
import ProductHeroLayout from "./ProductHeroLayout";
import Container from "@mui/material/Container";
import useUser from "../../hooks/useUser";

const backgroundImage =
  "https://sportshub.cbsistatic.com/i/2022/12/01/4ad18f0f-900e-4831-aa4a-9a8e74967459/dark-web-spider-man-xmen-exclusive.jpg";

export default function ProductHero() {
  const { user } = useUser(); // Use the useUser hook

  return (
    <Container maxWidth="xl">
      <ProductHeroLayout
        sxBackground={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundColor: "#7fc7d9", 
          backgroundPosition: "center",
        }}
      >
        <img
          style={{ display: "none" }}
          src={backgroundImage}
          alt="increase priority"
        />
        <Typography color="inherit" align="center" variant="h2" marked="center"  style={{ fontFamily: 'Bangers'}}>
          Create Your Own Collectibles Data Base!
        </Typography>
        {user ? (
          <Typography  color="inherit" variant="h5" marked="center" style={{ fontFamily: 'Bangers'}} >
            Welcome,  {user.displayName}!{" "}
            {/* Display the user's name or other information. */}
          </Typography>
        ) : (
          <>
            <Typography
              color="inherit"
              align="center"
              variant="h5"
              sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
            >
              Enjoy secret offers up to -70% off.
            </Typography>
            <Button
              color="secondary"
              variant="contained"
              size="large"
              component="a"
              href="/create-account"
              sx={{ minWidth: 200 }}
            >
              Register
            </Button>
            <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
              Discover the experience
            </Typography>
          </>
        )}
      </ProductHeroLayout>
    </Container>
  );
}
