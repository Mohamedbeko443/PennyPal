import { Routes, Route } from "react-router-dom";
import Login from '../pages/login/Login';
import Register from '../pages/register/Register'
import Home from '../pages/home/Home'
import ProtectedRoutes from './ProtectedRoutes'


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
    </Routes>
  )
}
