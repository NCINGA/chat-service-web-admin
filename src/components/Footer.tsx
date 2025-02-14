import { Box, Divider, Link, Typography } from "@mui/material";
import logo from "../../public/Logo.svg";
import colors from "../styles/Theme";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: colors.background, 
        p: 2,
        width: "100%",
        position: "relative",
        bottom: 0,
      }}
    >
      <Divider />
      <Typography variant="body2" sx={{ color: colors.textSecondary }} align="center">
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
