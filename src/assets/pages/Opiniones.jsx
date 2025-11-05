import { useState } from "react";
import api from "../../Api";
import { useAuth } from "../../context/AuthContext";

export default function Opiniones() {
  const { user, token } = useAuth();
  const [message, setMessage] = useState("");
  const [city, setCity] = useState("");
  const [rating, setRating] = useState(5);
  const [ok, setOk] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setOk(""); setErr("");
    try {
      await api.post(
        "/reviews",
        { message, rating, city },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOk("¡Gracias por tu opinión! 🎉");
      setMessage(""); setCity(""); setRating(5);
    } catch (e) {
      console.error(e);
      setErr(e?.response?.data?.msg || "No se pudo enviar tu opinión");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow p-6 max-w-md text-center">
          <p className="text-gray-700 mb-4">Debes iniciar sesión para dejar tu opinión.</p>
          <a className="text-green-700 font-semibold underline" href="/login">Ingresar</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-green-700 mb-4">Deja tu opinión 💬</h1>

        {ok && <div className="mb-4 text-green-700 bg-green-50 border border-green-200 rounded p-3">{ok}</div>}
        {err && <div className="mb-4 text-red-700 bg-red-50 border border-red-200 rounded p-3">{err}</div>}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Ciudad (opcional)</label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Ej. Bogotá"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Calificación</label>
            <div className="flex gap-1">
              {[1,2,3,4,5].map(v => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setRating(v)}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center ${
                    rating >= v ? "bg-yellow-400 text-green-900" : "bg-white"
                  }`}
                  aria-label={`${v} estrellas`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Tu opinión</label>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border rounded px-3 py-2 min-h-[120px]"
              placeholder="¿Cómo te ha ido con Cultivida?"
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
