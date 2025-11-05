import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="animate-pulse text-gray-600">Cargando...</p>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    // si NO es admin, lo mandamos al inicio
    return <Navigate to="/" replace />;
  }

  return children;
}
