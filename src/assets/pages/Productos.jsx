// src/assets/pages/Productos.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Api";
import { useCart } from "../../context/CartContext";
import ProductInfo from "../../components/ProductInfo"; // 👈 nuevo

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // estado del modal
  const [infoOpen, setInfoOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { data } = await api.get("/products");
        if (alive) setProductos(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        if (alive) setErr("No se pudieron cargar los productos.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // si aún quieres navegar a /catalogo, puedes dejarlo:
  const handleComprar = (p) =>
    navigate("/catalogo", { state: { producto: p } });

  const openInfo = (p) => {
    setActiveProduct(p);
    setInfoOpen(true);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="animate-pulse">Cargando productos…</p>
      </div>
    );

  if (err)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{err}</p>
      </div>
    );

  const money = (v) => `$${Number(v).toLocaleString()}`;

  return (
    <div className="bg-green-50 min-h-screen py-16">
      <div className="text-center px-6">
        <h1 className="text-4xl font-bold text-green-700 mb-2">
          Nuestros Productos 🥛
        </h1>
        <p className="text-gray-600 mb-10">
          Elaborados con ingredientes 100% naturales.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
        {productos.map((p) => (
          <article
            key={p.id}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition-all overflow-hidden"
          >
            <img
              src={
                p.imageUrl?.startsWith("http")
                  ? p.imageUrl
                  : p.imageUrl || "/images/KLECHE.png"
              }
              alt={p.name}
              className="h-56 w-full object-cover"
              loading="lazy"
            />
            <div className="p-6 text-center">
              <h3 className="text-2xl font-semibold text-green-700">
                {p.name}
              </h3>
              <p className="text-gray-600 mt-2">{p.description}</p>
              <p className="text-lg font-bold text-green-800 mt-4">
                {money(p.price)}
              </p>

              <div className="mt-4 flex justify-center gap-3">
                <button
                  onClick={() =>
                    addToCart({
                      id: p.id,
                      name: p.name,
                      price: p.price,
                      imageUrl: p.imageUrl,
                    })
                  }
                  className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-semibold px-5 py-2 rounded-full"
                >
                  Agregar al carrito
                </button>

                {/* Cambiamos Info+ para abrir el modal */}
                <button
                  onClick={() => openInfo(p)}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-full"
                >
                  Info +
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Modal reutilizable */}
      <ProductInfo
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        product={activeProduct}
      />
    </div>
  );
}
