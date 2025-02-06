import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import UserManagement from "./pages/userManagement";
import ConfigUI from "./pages/configuration";
import { CssBaseline } from "@mui/material";

const Layout = () => {
  return (
    <>
      <CssBaseline />
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <div style={{ flex: 1, paddingBottom: "80px" }}> 
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/user" element={<UserManagement />} />
          <Route path="/configuration" element={<ConfigUI />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
