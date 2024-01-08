import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import imgCollectibles from "../../static/images/collectibles.jpg";
import imgDashboard from "../../static/images/dashboardFront.jpg";
import imgCollectible from "../../static/images/collectibleExample.jpg";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Collectible Database
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const cards = [
  {
    name: "Comics",
    image:
      "https://americanenglish.state.gov/files/ae/resource_images/cover_image.jpg",
    mediaCard:
      "Add your favorites comics, create subcategories and organize your collection.",
  },
  {
    name: "Figures",
    image:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sneaker-aging-lead-1626192736.jpg?resize=980:*",
    mediaCard:
      "You have a lot of sneakers?, this is the place to digitize that collection and share it with yours friends.",
  },
  {
    name: "Games",
    image: imgCollectibles,
    mediaCard: "",
  },
  {
    name: "Vinyls",
    image:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sneaker-aging-lead-1626192736.jpg?resize=980:*",
    mediaCard:
      "You have a lot of sneakers?, this is the place to digitize that collection and share it with yours friends.",
  },
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function AboutLayout() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative"></AppBar>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="m">
            <Typography
              style={{ fontFamily: "Bangers", marginBottom: "20px" }}
              component="h1"
              variant="h2"
              align="left"
              color="text.primary"
              gutterBottom
            >
              About Us:
            </Typography>
            <Typography
              variant="h5"
              align="left"
              color="text.secondary"
              paragraph
            >
              Welcome to our user-friendly web app designed to help you organize
              and cherish your physical collectibles. From classic comics to
              unique figurines and exciting games, our default categories cover
              it all.
            </Typography>
            <Typography
              variant="h5"
              align="left"
              color="text.secondary"
              paragraph
            >
              But here's the twist: we believe in personalization! Feel free to
              create and add your very own categories, making the experience
              uniquely yours.
            </Typography>

            <Typography
              style={{ fontFamily: "Bangers", marginBottom: "20px" }}
              component="h1"
              variant="h2"
              align="left"
              color="text.primary"
              gutterBottom
            >
              How it works:
            </Typography>
            <Typography
              variant="h5"
              align="left"
              color="text.secondary"
              paragraph
            >
              After you create a new account, you can access the Dashboard
              Panel, where you're going to see four default categories:
            </Typography>
            <Grid container spacing={4}>
              <Grid item key="dashboard" xs={12} sm={6} md={8}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "30%",
                    }}
                    image={imgDashboard}
                  />
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Container maxWidth="m">
          <Typography
            variant="h5"
            align="left"
            color="text.secondary"
            paragraph
          >
            You can add new categories, create subcategories and start storing
            your collectibles!.
          </Typography>

          <Grid container spacing={4}>
            <Grid item key="dashboard" xs={12} sm={6} md={5}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: "50%",
                  }}
                  image={imgCollectible}
                />
              </Card>
            </Grid>
          </Grid>
          
        </Container>
 
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="m">
          <Typography
            variant="h5"
            align="left"
            color="text.secondary"
            paragraph
          >
            Picture a virtual haven where your collection comes to life,
            beautifully cataloged and easily accessible. Whether you're a comic
            connoisseur or a gaming enthusiast, our platform is here to
            celebrate and showcase your prized possessions, giving them the
            digital spotlight they deserve.
          </Typography>
          </Container>
        </Box>
       
          

       
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Your journey into the extraordinary starts here!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
