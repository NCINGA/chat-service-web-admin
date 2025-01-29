import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HarvestIQ from "../../assets/feLogo.png";
import Grid from "@mui/material/Grid2";


const dummyCredentials = [{ email: "demo@gmail.com", password: "12345" }];


const LoginForm = () => {

  const [email, setEmail] = useState("demo@gmail.com");
    const [password, setPassword] = useState("12345");
    const navigate = useNavigate();
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      const isValid = dummyCredentials.some(
        (credential) =>
          credential.email === email && credential.password === password
      );
  
      if (isValid) {
        navigate("/user");
      } else {
        alert("Incorrect email or password");
      }
    };
  
  return (
    <Box
            sx={{
              width: "80%",
              maxWidth: "400px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
              justifyContent: "center",
              
            }}
          >
            <img
              src={HarvestIQ}
              alt="logo"
              style={{
                width: "20vw",
                maxWidth: "150px",
                paddingBottom: "20px",
                objectFit: "contain",
              }}
            />

            <Typography
              component="h1"
              variant="h5"
              style={{ fontFamily: "Poppins, sans-serif", color: "#40BFB4" }}
            >
              Welcome to Admin Dashboard
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{
                mt: 1,
                width: "100%",
                padding: "40px",
                backdropFilter: "blur(100px)",
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  "& label": {
                    color: "#40BFB4",
                  },
                  "& label.Mui-focused": {
                    color: "#40BFB4",
                  },
                  "& .MuiInput-underline:before": {
                    borderBottomColor: "#40BFB4",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#40BFB4",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#40BFB4",
                    },
                    "&:hover fieldset": {
                      borderColor: "#40BFB4",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#40BFB4",
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  "& label": {
                    color: "#40BFB4",
                  },
                  "& label.Mui-focused": {
                    color: "#40BFB4",
                  },
                  "& .MuiInput-underline:before": {
                    borderBottomColor: "#40BFB4",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#40BFB4",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#40BFB4",
                    },
                    "&:hover fieldset": {
                      borderColor: "#40BFB4",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#40BFB4",
                    },
                  },
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox value="remember" sx={{ color: "#F68D3D" }} />
                }
                label="Remember me"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    color: "#F68D3D",
                  },
                }}
              />
              <Button
                type="submit"
                variant="outlined"
                fullWidth
                sx={{
                  mt: 3,
                  mb: 2,
                  fontFamily: "Poppins, sans-serif",
                  borderColor: "#ffffff",
                  backgroundColor: "#40BFB4",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "#ffffff",
                    color: "#40BFB4",
                    borderColor: "#40BFB4",
                  },
                }}
              >
                Login
              </Button>
              <Grid container spacing={2}>
                
              </Grid>
            </Box>
          </Box>
  )
}
export default LoginForm