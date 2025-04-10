import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import UserManagement from "./pages/userManagement";
import ConfigUI from "./pages/configuration";
import { CssBaseline } from "@mui/material";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql/apploClient";
import AuditLog from "./pages/AuditLog";
import Home from "./pages/Home";

const Layout = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <Header />
      <div style={{ flex: 1, paddingBottom: "50px" }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/user" element={<UserManagement />} />
            <Route path="/configuration" element={<ConfigUI />} />
            <Route path="/auditlog" element={<AuditLog />} />
          </Route>
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
