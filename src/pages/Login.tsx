import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import LoginForm from "../components/LoginScreenComponent/loginForm";
// import Box from "@mui/material/Box";
// import BgVideo from "../assets/Help Desk (1000 x 1000 px).mp4";
import LoginCover from "../assets/LoginCover.png";

const defaultTheme = createTheme();

export default function Login() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ minWidth: "100vw" }}>
        <CssBaseline />
        <Grid
          container
          spacing={2}
          size={{ xs: 12, sm: 8, md: 6 }}
          sx={{
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* <Box
            component="video"
            autoPlay
            muted
            loop
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
            }}
          >
            <source src={BgVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </Box> */}
          <img src={LoginCover} alt="LoginCover" style={{ height: "100vh" }} />
        </Grid>
        <Grid
          size={{ xs: 12, sm: 8, md: 6 }}
          component={Paper}
          elevation={6}
          square
          sx={{
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <LoginForm />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
