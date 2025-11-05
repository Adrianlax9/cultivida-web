import { useEffect, useState } from "react";
import api from "../../Api";
import { useAuth } from "../../context/AuthContext";

export default function AdminOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  // cargar todas las órdenes
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders"); // GET /api/orders (solo admin)
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setMsg("No se pudieron cargar las órdenes");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // cambiar estado de una orden
  const updateStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      // actualizamos localmente sin volver a pedir toda la lista
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId
            ? {
                ...o,
                status: newStatus,
              }
            : o
        )
      );
      setMsg("Estado actualizado ✅");
    } catch (err) {
      console.error(err);
      setMsg("Error actualizando el estado");
    }
  };

  const money = (v) => `$${Number(v).toLocaleString()}`;

  if (!user || user.role !== "admin") {
    return (
      <div className="p-8 text-center text-red-600 font-semibold">
        Acceso denegado. Se requiere rol administrador.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p className="animate-pulse text-gray-600">Cargando órdenes…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-green-700 mb-4">
          Panel de Pedidos 📦
        </h1>

        {msg && (
          <div className="mb-4 text-sm text-center bg-yellow-100 text-yellow-800 border border-yellow-300 rounded p-2">
            {msg}
          </div>
        )}

        {orders.length === 0 ? (
          <p className="text-gray-600 text-center">No hay pedidos aún.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr className="bg-green-100 text-green-900">
                  <th className="px-3 py-2">ID</th>
                  <th className="px-3 py-2">Cliente</th>
                  <th className="px-3 py-2">Contacto</th>
                  <th className="px-3 py-2">Envío</th>
                  <th className="px-3 py-2">Total</th>
                  <th className="px-3 py-2">Estado</th>
                  <th className="px-3 py-2">Items</th>
                  <th className="px-3 py-2">Creada</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((o) => (
                  <tr
                    key={o.id}
                    className="border-b last:border-0 hover:bg-green-50"
                  >
                    {/* ID */}
                    <td className="px-3 py-2 font-semibold text-green-700">
                      #{o.id}
                    </td>

                    {/* CLIENTE */}
                    <td className="px-3 py-2">
                      <div className="font-medium">
                        {o.user?.name || "Cliente"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {o.user?.email || ""}
                      </div>
                    </td>

                    {/* CONTACTO */}
                    <td className="px-3 py-2 text-xs">
                      <div className="text-gray-800">{o.phone}</div>
                      <div className="text-gray-500">{o.address}</div>
                      <div className="text-gray-500">{o.city}</div>
                      {o.notes && (
                        <div className="text-[11px] text-gray-400 italic">
                          {o.notes}
                        </div>
                      )}
                    </td>

                    {/* ENVÍO Y TOTAL */}
                    <td className="px-3 py-2 text-xs">
                      <div>Envío: {money(o.shippingCost)}</div>
                      <div>Subtotal: {money(o.subtotal)}</div>
                    </td>

                    <td className="px-3 py-2 font-bold text-green-800">
                      {money(o.total)}
                    </td>

                    {/* ESTADO (editable) */}
                    <td className="px-3 py-2">
                      <select
                        className="border rounded px-2 py-1 text-sm"
                        value={o.status}
                        onChange={(e) =>
                          updateStatus(o.id, e.target.value)
                        }
                      >
                        <option value="pending">pending</option>
                        <option value="paid">paid</option>
                        <option value="shipped">shipped</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                    </td>

                    {/* ITEMS COMPRADOS */}
                    <td className="px-3 py-2 text-xs">
                      {Array.isArray(o.items) && o.items.length > 0 ? (
                        <ul className="list-disc pl-4 space-y-1">
                          {o.items.map((it) => (
                            <li key={it.id}>
                              <div className="font-medium text-green-700">
                                {it.name}
                              </div>
                              <div className="text-gray-600">
                                {it.quantity} x {money(it.price)}
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-gray-400 italic">
                          (sin ítems)
                        </span>
                      )}
                    </td>

                    {/* FECHA */}
                    <td className="px-3 py-2 text-xs text-gray-500">
                      {new Date(o.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
