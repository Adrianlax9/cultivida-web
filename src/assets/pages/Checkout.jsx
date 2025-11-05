import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import api from "../../Api";

export default function Checkout() {
  const { items, total, clear } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    address: "",
    city: "",
    phone: "",
    notes: "",
  });

  const [msg, setMsg] = useState("");

  // regla de envío según ciudad
  function calcularEnvio(cityName) {
    if (!cityName) return 0;
    const c = cityName.trim().toLowerCase();

    if (c === "pasto") return 4000;
    if (c === "bogota" || c === "bogotá") return 8000;
    if (c === "cali") return 7000;
    if (c === "medellin" || c === "medellín") return 7000;

    return 12000; // otras ciudades
  }

  const shippingCost = useMemo(() => {
    return calcularEnvio(form.city);
  }, [form.city]);

  const grandTotal = useMemo(() => {
    return Number(total) + Number(shippingCost);
  }, [total, shippingCost]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (items.length === 0) {
      setMsg("Tu carrito está vacío");
      return;
    }

    if (!form.address || !form.city || !form.phone) {
      setMsg("Por favor completa dirección, ciudad y teléfono");
      return;
    }

    try {
      const payload = {
        address: form.address,
        city: form.city,
        phone: form.phone,
        notes: form.notes,
        shippingCost: shippingCost,
        subtotal: total,
        totalToPay: grandTotal,
        items: items.map((it) => ({
          productId: it.id,
          quantity: it.quantity,
        })),
      };

      const { data } = await api.post("/orders", payload);

      setMsg("🎉 Pedido creado con éxito");
      clear(); // vacía el carrito
      navigate(`/orden/${data.order.id}`);
    } catch (err) {
      console.error("Error creando orden:", err);
      if (err.response) {
        setMsg(err.response.data?.msg || "Error creando la orden");
      } else {
        setMsg("Error de conexión con el servidor");
      }
    }
  };

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* RESUMEN DEL CARRITO */}
        <section className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Resumen del carrito 🛒
          </h2>

          {items.length === 0 ? (
            <p className="text-gray-500">No hay productos en el carrito.</p>
          ) : (
            <ul className="space-y-3">
              {items.map((it) => (
                <li key={it.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {it.imageUrl && (
                      <img
                        src={it.imageUrl}
                        alt={it.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div>
                      <p className="font-semibold">{it.name}</p>
                      <p className="text-sm text-gray-500">
                        x{it.quantity} · ${Number(it.price).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="font-semibold">
                    ${(it.price * it.quantity).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="border-t mt-4 pt-4 space-y-1 text-right text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal productos:</span>
              <span className="font-semibold">
                ${Number(total).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Domicilio ({form.city || "sin ciudad"}):</span>
              <span className="font-semibold">
                ${Number(shippingCost).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-lg font-bold text-green-700 pt-2 border-t">
              <span>Total a pagar:</span>
              <span>${Number(grandTotal).toLocaleString()}</span>
            </div>
          </div>
        </section>

        {/* FORMULARIO DE ENVÍO */}
        <section className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Datos de envío 📦
          </h2>

          {msg && (
            <div className="mb-3 text-sm font-semibold text-center bg-yellow-100 text-yellow-800 border border-yellow-300 rounded p-2">
              {msg}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-left text-sm font-medium">
                Ciudad / Municipio *
              </label>
              <input
                name="city"
                value={form.city}
                onChange={onChange}
                className="w-full border rounded p-2"
                placeholder="Ej: Pasto, Bogotá..."
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Usamos esto para calcular el domicilio automáticamente.
              </p>
            </div>

            <div>
              <label className="block text-left text-sm font-medium">
                Dirección exacta *
              </label>
              <input
                name="address"
                value={form.address}
                onChange={onChange}
                className="w-full border rounded p-2"
                placeholder="Calle #, barrio, punto de referencia"
                required
              />
            </div>

            <div>
              <label className="block text-left text-sm font-medium">
                Teléfono de contacto *
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={onChange}
                className="w-full border rounded p-2"
                placeholder="Celular / WhatsApp"
                required
              />
            </div>

            <div>
              <label className="block text-left text-sm font-medium">
                Notas al repartidor (opcional)
              </label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={onChange}
                rows={3}
                className="w-full border rounded p-2"
                placeholder="Ej: tocar el timbre negro / dejar en portería / etc."
              />
            </div>

            <button
              type="submit"
              disabled={items.length === 0}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md disabled:opacity-50"
            >
              Confirmar pedido
            </button>

            <p className="text-[11px] text-gray-500 mt-2 text-center">
              Aún no procesamos pago en línea. Te contactaremos al teléfono
              que dejas para coordinar entrega y pago ✨.
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}
