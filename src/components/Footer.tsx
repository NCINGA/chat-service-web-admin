import { Box, Divider, Link, Typography } from "@mui/material";
import logo from "../../public/Logo.svg";

const footer = () => {
  return (
    <Box
      className="fixed-bottom"
      style={{
        position: "relative",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
      }}
      sx={{ bgcolor: "background.paper", p: 4 }}
      component="footer"
      zIndex={-1}
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

export default footer;