// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user } = useAuth();

  // Si no hay usuario autenticado, redirige a /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario, renderiza el contenido protegido
  return children;
}
