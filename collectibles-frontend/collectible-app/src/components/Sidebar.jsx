import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";
import {
  deepPurple,
  lightBlue,
  cyan,
  lightGreen,
  indigo,
} from "@mui/material/colors";

const Sidebar = () => {
  const { user, isLoading } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const avatarStyles = [
    { backgroundColor: deepPurple[500] },
    { backgroundColor: lightBlue[500] },
    { backgroundColor: cyan[500] },
    { backgroundColor: lightGreen[500] },
    { backgroundColor: indigo[500] },
  ];

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  const getRandomStyle = () => {
    const randomIndex = Math.floor(Math.random() * avatarStyles.length);
    return avatarStyles[randomIndex];
  };

  return (
    <div>
      <IconButton
        onClick={toggleDrawer}
        sx={{ ml: 1 }}
        color="inherit"
        edge="start"
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer}>
        <div style={{ width: "250px" }}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              {user ? (
                <div style={{ textAlign: "center", padding: "20px" }}>
                  {user.displayName ? (
                    <>
                      <Avatar sx={getRandomStyle()}>
                        {user.displayName.substring(0, 1).toUpperCase()}
                      </Avatar>
                      <p style={{ textAlign: "left" }}>{user.displayName}</p>
                    </>
                  ) : (
                    <p>No display name</p>
                  )}
                </div>
              ) : null}
              <List>
                <ListItemButton component={Link} to="/" onClick={closeDrawer}>
                  <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton component={Link} to="/about" onClick={closeDrawer}>
                  <ListItemText primary="About" />
                </ListItemButton>
                {!user && (
                  <ListItemButton component={Link} to="/login" onClick={closeDrawer}>
                    <ListItemText primary="Login" />
                  </ListItemButton>
                )}

                {user && (
                  <>
                    <ListItemButton component={Link} to="/dashboard" onClick={closeDrawer}>
                      <ListItemText primary="Dashboard" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/dashboard/addCollectibleForm" onClick={closeDrawer}>
                      <ListItemText primary="Add Collectible" />
                    </ListItemButton>
                  </>
                )}
              </List>
            </>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default Sidebar;
