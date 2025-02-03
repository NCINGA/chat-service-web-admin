import React from "react";
import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import sideBar from "../assets/sideBar.png";

const AppDrawer: React.FC = () => {
  function handleLogout(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    event.preventDefault();
    console.log("Logging out...");
    window.location.href = "/";
  }

  return (
    <Box
      sx={{
        width: 250,
        padding: 2,
        height: "100vh",
        color: "white",
        backgroundColor: "teal",
        backgroundImage: `url(${sideBar})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Overlay to blend the teal color with the background image */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 128, 128, 0.7)",
          zIndex: 1,
        }}
      />

      <Box sx={{ position: "relative", zIndex: 2 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>Menu</Typography>
        <List>
          <ListItem disablePadding>
            <ListItemButton sx={{ color: "white" }}>
              <ListItemIcon sx={{ color: "white" }}><HomeIcon /></ListItemIcon>
              <ListItemText primary={<>Home</>} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton sx={{ color: "white" }}>
              <ListItemIcon sx={{ color: "white" }}><PersonIcon /></ListItemIcon>
              <ListItemText primary={<>User Management</>} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <ListItem disablePadding>
          <ListItemButton sx={{ color: "white" }} onClick={handleLogout}>
            <ListItemIcon sx={{ color: "white" }}><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary={<strong>Logout</strong>} />
          </ListItemButton>
        </ListItem>
      </Box>
    </Box>
  );
};

export default AppDrawer;
