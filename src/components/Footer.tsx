import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="#535557">
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
        component="footer"
        sx={{
          py: 1, 
          height: "75px", 
          display: "flex",
          alignItems: "center", 
          justifyContent: "center", 
          textAlign: "center",
          backgroundColor: "#40BFB4",
          color: "#FFFFFF",
          fontFamily: "Poppins",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2">
            <b>NCINGA pvt Ltd</b> | Help Desk Chat Bot
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
