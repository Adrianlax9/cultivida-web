import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../Api";

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data);
      } catch (err) {
        console.error(err);
        setMsg("No se pudo cargar la orden");
      }
    })();
  }, [id]);

  if (msg) return <div className="p-6">{msg}</div>;
  if (!order) return <div className="p-6">Cargando...</div>;

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold text-green-700 mb-4">Orden #{order.id}</h1>
        <p className="text-sm text-gray-600 mb-4">
          Estado: <b>{order.status}</b> · Total: <b>${Number(order.total).toLocaleString()}</b>
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Dirección: {order.address} · Tel: {order.phone}
        </p>

        <h2 className="text-xl font-semibold mb-2">Items</h2>
        <ul className="space-y-2">
          {order.items?.map((it) => (
            <li key={it.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {it.imageUrl && <img src={it.imageUrl} className="w-10 h-10 rounded object-cover" />}
                <div>
                  <p className="font-medium">{it.name}</p>
                  <p className="text-xs text-gray-500">x{it.quantity} · ${Number(it.price).toLocaleString()}</p>
                </div>
              </div>
              <div className="font-semibold">
                ${(it.price * it.quantity).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
