import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BgImgLogin from "../assets/bg.png";
import Grid from "@mui/material/Grid2";
import LoginForm from "../components/LoginScreenComponent/loginForm";
// import SignupForm from "../components/LoginScreenComponent/signupform";
// import { Tabs, Tab } from "@mui/material";
import { SetStateAction, useState } from "react";

const defaultTheme = createTheme();

export default function Login() {
  const [selectedTab, setSelectedTab] = useState(0);

  // const handleTabChange = (_event: any, newValue: SetStateAction<number>) => {
    // setSelectedTab(newValue);
  // };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ minWidth: "100vw" }}>
        <CssBaseline />
        <Grid
          container
          spacing={2}
          size={{ xs: 12, sm: 8, md: 6 }}
          sx={{
            backgroundImage: `url(${BgImgLogin})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
          }}
        />
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
          {/* Tabs to toggle between Login and Signup */}
          {/* <Tabs value={selectedTab} onChange={handleTabChange} aria-label="login-signup-tabs" >
            <Tab label="Login" />
            <Tab label="Signup" />
          </Tabs> */}
          <LoginForm/>

          {/* Conditional rendering based on selectedTab */}
          {/* // {selectedTab === 0 ? <LoginForm /> : <SignupForm />} */}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
