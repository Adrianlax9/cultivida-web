import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Registro() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await register(form);         // crea usuario
      setMsg("Cuenta creada. Ahora puedes iniciar sesión.");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setMsg("No se pudo registrar.");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-green-50 py-16">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Crear cuenta</h1>
      <form onSubmit={onSubmit} className="bg-white shadow rounded-2xl p-6 w-80 space-y-4">
        <input name="name" placeholder="Nombre" value={form.name} onChange={onChange}
               className="border rounded p-2 w-full"/>
        <input name="email" type="email" placeholder="Correo" value={form.email} onChange={onChange}
               className="border rounded p-2 w-full"/>
        <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={onChange}
               className="border rounded p-2 w-full"/>
        {msg && <p className="text-sm">{msg}</p>}
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded w-full">
          Registrarse
        </button>
      </form>
    </div>
  );
}
