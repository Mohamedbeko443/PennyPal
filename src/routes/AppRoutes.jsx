import { Routes, Route } from "react-router-dom";
import Login from '../pages/login/Login';
import Register from '../pages/register/Register'
import Home from '../pages/home/Home'


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
    </Routes>
  )
}
