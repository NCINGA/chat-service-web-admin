import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import UserManagement from "./pages/userManagement";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet /> {/* This renders the nested routes */}
      <Footer />
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
