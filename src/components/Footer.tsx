import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="#8CA1B0">
      {"Designed & Developed by ©" + "  "}
      <Link color="inherit"></Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const defaultTheme = createTheme();

export default function Footer() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        width="100vw"
        height="160px"
        component="footer"
        sx={{
          py: 4,
          //px: 10,
          mt: "auto",
          textAlign: "center",
          backgroundColor: "#40BFB4",
          color: "#FFFFFF",
          fontFamily: "Poppins",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            <b>NCINGA pvt Ltd</b>{" "}
            <small>
              <br />
              Help Desk Chat Bot <br /> P.O. Box 856 Colombo 01, Sri Lanka
              <br /> <br />
            </small>
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
