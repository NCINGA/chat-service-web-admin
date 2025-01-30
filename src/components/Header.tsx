import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Navigate to the login page
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1, paddingBottom: 10 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#40BFB4" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
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
    </Box>
  );
};

export default Header;
