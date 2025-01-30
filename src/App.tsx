import './App.css'
import Login from './pages/Login'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import UserManagement from './pages/userManagement'

function App() {
  return (
    <BrowserRouter>
     <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<UserManagement/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
