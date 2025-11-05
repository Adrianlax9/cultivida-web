import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form.email, form.password);
      navigate("/"); // al inicio
    } catch (err) {
      setError("Credenciales inválidas");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-green-50 py-16">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Iniciar Sesión</h1>
      <form onSubmit={onSubmit} className="bg-white shadow rounded-2xl p-6 w-80 space-y-4">
        <input name="email" type="email" placeholder="Correo electrónico" value={form.email}
               onChange={onChange} className="border rounded p-2 w-full"/>
        <input name="password" type="password" placeholder="Contraseña" value={form.password}
               onChange={onChange} className="border rounded p-2 w-full"/>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded w-full">
          Entrar
        </button>
      </form>
    </div>
  );
}
