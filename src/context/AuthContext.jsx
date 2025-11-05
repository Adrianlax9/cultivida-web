import { createContext, useContext, useEffect, useState } from "react";
import api from "../Api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);     // {id, name, email, role}
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // si hay token, opcional: podrías validar al backend /auth/me
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  };

  const register = async ({ name, email, password }) => {
    const { data } = await api.post("/auth/register", { name, email, password });
    return data; // luego puedes redirigir a /login
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
