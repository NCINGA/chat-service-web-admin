import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Drawer from "@mui/material/Drawer";
import { useNavigate } from "react-router-dom";
import AppDrawer from "./AppDrawer";
import colors from "../styles/Theme";
import axios from "axios";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = async () => {
    try {

      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        throw new Error("No refresh token found");
      }

      await axios.post("http://localhost:8081/auth/logout", {}, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");  

      navigate("/");

    } catch (error) {
      console.error('Logout failed:', error);

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/");
    }
    
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ flexGrow: 1, paddingBottom: 10 }}>
      <AppBar position="fixed" sx={{ backgroundColor: colors.primary }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
            HELP DESK
          </Typography>

          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <AppDrawer />
      </Drawer>
    </Box>
  );
};

export default Header;
