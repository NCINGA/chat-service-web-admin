import { Box, Divider, Link, Typography } from "@mui/material";
import logo from "../../public/Logo.svg";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        bgcolor: "background.paper",
        p: 4,
        zIndex: 1000,  // Ensure footer is above other content
      }}
    >
      <Divider />
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        style={{ marginTop: "2%" }}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://www.ncinga.net/">
          <img src={logo} alt="logo" style={{ width: "60px" }} />
        </Link>{" "}
        <br />
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

export default Footer;
