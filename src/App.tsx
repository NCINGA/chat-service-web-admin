import './App.css'
import Login from './pages/Login'
import { UserManagement } from './pages/userManagement'
import { BrowserRouter, Route,Routes } from 'react-router-dom'

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
