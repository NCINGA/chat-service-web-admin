// import React, { useState, FormEvent } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import HarvestIQ from "../../assets/bg.webp";
// import Grid from "@mui/material/Grid";

// const SignupForm: React.FC = () => {
//   // TypeScript types for the state variables
//   const [name, setName] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [confirmPassword, setConfirmPassword] = useState<string>("");
//   const navigate = useNavigate();

//   const handleSubmit = (event: FormEvent) => {
//     event.preventDefault();
    
//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }
    
//     alert("Signup Successful!");
//     navigate("/dashboard");
//   };

//   return (
//     <Box
//       sx={{
//         width: "80%",
//         maxWidth: "400px",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         height: "100%",
//         justifyContent: "center",
//       }}
//     >
//       <img
//         src={HarvestIQ}
//         alt="logo"
//         style={{
//           width: "20vw",
//           maxWidth: "150px",
//           paddingBottom: "5px",
          
//         }}
//       />
//       <Typography
//         component="h1"
//         variant="h5"
//         style={{ fontFamily: "Poppins, sans-serif", color: "#40BFB4" }}
//       >
//         Create Your Account
//       </Typography>
//       <Box
//         component="form"
//         noValidate
//         onSubmit={handleSubmit}
//         sx={{
//           mt: 1,
//           width: "100%",
//           padding: "10px",
//           backdropFilter: "blur(100px)",
//         }}
//       >
//         <TextField
//           margin="normal"
//           required
//           fullWidth
//           id="name"
//           label="Full Name"
//           name="name"
//           autoComplete="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           sx={{
//             "& label": { color: "#40BFB4" },
//             "& .MuiOutlinedInput-root fieldset": { borderColor: "#40BFB4" },
//             "& .MuiInputBase-root": { fontSize: "1rem" }, // Fix for magnification
//           }}
//         />
//         <TextField
//           margin="normal"
//           required
//           fullWidth
//           id="email"
//           label="Email Address"
//           name="email"
//           autoComplete="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           sx={{
//             "& label": { color: "#40BFB4" },
//             "& .MuiOutlinedInput-root fieldset": { borderColor: "#40BFB4" },
//             "& .MuiInputBase-root": { fontSize: "1rem" }, // Fix for magnification
//           }}
//         />
//         <TextField
//           margin="normal"
//           required
//           fullWidth
//           name="password"
//           label="Password"
//           type="password"
//           id="password"
//           autoComplete="new-password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           sx={{
//             "& label": { color: "#40BFB4" },
//             "& .MuiOutlinedInput-root fieldset": { borderColor: "#40BFB4" },
//             "& .MuiInputBase-root": { fontSize: "1rem" }, // Fix for magnification
//           }}
//         />
//         <TextField
//           margin="normal"
//           required
//           fullWidth
//           name="confirmPassword"
//           label="Confirm Password"
//           type="password"
//           id="confirmPassword"
//           autoComplete="new-password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           sx={{
//             "& label": { color: "#40BFB4" },
//             "& .MuiOutlinedInput-root fieldset": { borderColor: "#40BFB4" },
//             "& .MuiInputBase-root": { fontSize: "1rem" }, // Fix for magnification
//           }}
//         />
//         <FormControlLabel
//           control={<Checkbox value="agree" sx={{ color: "#F68D3D" }} />}
//           label="I agree to the Terms and Conditions"
//           sx={{ "& .MuiFormControlLabel-label": { color: "#F68D3D" } }}
//         />
//         <Button
//           type="submit"
//           variant="outlined"
//           fullWidth
//           sx={{
//             mt: 3,
//             mb: 2,
//             fontFamily: "Poppins, sans-serif",
//             borderColor: "#ffffff",
//             backgroundColor: "#40BFB4",
//             color: "#ffffff",
//             "&:hover": {
//               backgroundColor: "#ffffff",
//               color: "#40BFB4",
//               borderColor: "#40BFB4",
//             },
//           }}
//         >
//           Sign Up
//         </Button>
//         <Grid container spacing={2}></Grid>
//       </Box>
//     </Box>
//   );
// };

// export default SignupForm;
