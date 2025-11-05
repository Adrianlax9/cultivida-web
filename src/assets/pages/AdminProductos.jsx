// src/assets/pages/AdminProductos.jsx
import { useEffect, useState } from "react";
import api from "../../Api";
import { useAuth } from "../../context/AuthContext";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  stock: "",
  imageUrl: "",
  active: true,
  // 👇 NUEVOS CAMPOS
  infoShort: "",
  infoBullets: "",
};

export default function AdminProductos() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/products/all");
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setMsg("No se pudo cargar la lista de productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  if (!user || user.role !== "admin") {
    return (
      <div className="p-8 text-center text-red-600 font-semibold">
        Acceso denegado (admin requerido)
      </div>
    );
  }

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const onEdit = (p) => {
    setEditingId(p.id);
    setForm({
      name: p.name || "",
      description: p.description || "",
      price: p.price ?? "",
      stock: p.stock ?? "",
      imageUrl: p.imageUrl || "",
      active: p.active ?? true,
      // 👇 NUEVOS CAMPOS
      infoShort: p.infoShort || "",
      infoBullets: p.infoBullets || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onCancel = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        // infoShort y infoBullets ya van en form ✅
      };

      if (editingId) {
        await api.put(`/products/${editingId}`, payload);
        setMsg("Producto actualizado ✅");
      } else {
        await api.post("/products", payload);
        setMsg("Producto creado ✅");
      }

      setForm(emptyForm);
      setEditingId(null);
      await load();
    } catch (err) {
      console.error(err);
      setMsg(err.response?.data?.msg || "Error guardando producto");
    }
  };

  const onDelete = async (id) => {
    if (!confirm("¿Eliminar este producto?")) return;
    try {
      await api.delete(`/products/${id}`);
      setMsg("Producto eliminado 🗑️");
      await load();
    } catch (err) {
      console.error(err);
      setMsg(err.response?.data?.msg || "Error eliminando producto");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <h1 className="text-2xl font-bold text-green-700 mb-4">
            Admin de Productos 🛠️
          </h1>

          {msg && (
            <div className="mb-4 text-sm text-center bg-yellow-100 text-yellow-800 border border-yellow-300 rounded p-2">
              {msg}
            </div>
          )}

          {/* FORMULARIO */}
          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Nombre *</label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                className="w-full border rounded p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Precio *</label>
              <input
                name="price"
                type="number"
                min="0"
                value={form.price}
                onChange={onChange}
                className="w-full border rounded p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Stock *</label>
              <input
                name="stock"
                type="number"
                min="0"
                value={form.stock}
                onChange={onChange}
                className="w-full border rounded p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Imagen (URL)</label>
              <input
                name="imageUrl"
                value={form.imageUrl}
                onChange={onChange}
                className="w-full border rounded p-2"
                placeholder="/images/KLECHE.png"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Descripción</label>
              <textarea
                name="description"
                value={form.description}
                onChange={onChange}
                rows={3}
                className="w-full border rounded p-2"
              />
            </div>

            {/* 👇👇 AQUÍ VAN TUS DOS CAMPOS NUEVOS 👇👇 */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-green-800 mt-2">
                Resumen corto
              </label>
              <textarea
                name="infoShort"
                value={form.infoShort || ""}
                onChange={onChange}
                rows={2}
                placeholder="Resumen que aparecerá en la ventana Info +"
                className="mt-1 w-full border rounded-lg p-2 text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-green-800 mt-2">
                Puntos clave (uno por línea)
              </label>
              <textarea
                name="infoBullets"
                value={form.infoBullets || ""}
                onChange={onChange}
                rows={4}
                placeholder={`Ejemplo:\n• Fermentación natural\n• Probióticos vivos\n• Ideal para el desayuno`}
                className="mt-1 w-full border rounded-lg p-2 text-sm"
              />
            </div>
            {/* 👆👆 FIN CAMPOS NUEVOS 👆👆 */}

            <div className="md:col-span-2 flex items-center gap-2">
              <input
                id="active"
                type="checkbox"
                name="active"
                checked={form.active}
                onChange={onChange}
              />
              <label htmlFor="active" className="text-sm">
                Activo (visible en tienda)
              </label>
            </div>

            <div className="md:col-span-2 flex gap-3 justify-end">
              {editingId ? (
                <>
                  <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 rounded border"
                  >
                    Cancelar
                  </button>
                  <button className="px-4 py-2 rounded bg-green-600 text-white">
                    Actualizar
                  </button>
                </>
              ) : (
                <button className="px-4 py-2 rounded bg-green-600 text-white">
                  Crear
                </button>
              )}
            </div>
          </form>
        </div>

        {/* LISTADO */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold text-green-700 mb-4">Listado</h2>
          {loading ? (
            <p className="animate-pulse text-gray-600">Cargando…</p>
          ) : items.length === 0 ? (
            <p className="text-gray-600">No hay productos.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-green-100 text-green-900">
                    <th className="px-3 py-2">ID</th>
                    <th className="px-3 py-2">Nombre</th>
                    <th className="px-3 py-2">Precio</th>
                    <th className="px-3 py-2">Stock</th>
                    <th className="px-3 py-2">Activo</th>
                    <th className="px-3 py-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((p) => (
                    <tr key={p.id} className="border-b last:border-0">
                      <td className="px-3 py-2">#{p.id}</td>
                      <td className="px-3 py-2">{p.name}</td>
                      <td className="px-3 py-2">
                        ${Number(p.price).toLocaleString()}
                      </td>
                      <td className="px-3 py-2">{p.stock}</td>
                      <td className="px-3 py-2">{p.active ? "Sí" : "No"}</td>
                      <td className="px-3 py-2 space-x-2">
                        <button
                          onClick={() => onEdit(p)}
                          className="px-2 py-1 text-sm bg-yellow-200 hover:bg-yellow-300 rounded"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => onDelete(p.id)}
                          className="px-2 py-1 text-sm bg-red-200 hover:bg-red-300 rounded"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
