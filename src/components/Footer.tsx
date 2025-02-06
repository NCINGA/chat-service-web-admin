import { Box, Divider, Link, Typography } from "@mui/material";
import logo from "../../public/Logo.svg";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        p: 2,
        width: "100%",
        position: "relative", // Default: relative
        bottom: 0,
      }}
    >
      <Divider />
      <Typography variant="body2" color="text.secondary" align="center">
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
