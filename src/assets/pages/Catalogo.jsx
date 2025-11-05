import { useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Catalogo() {
  const { state } = useLocation();
  const producto = state?.producto;
  const { add } = useCart();

  if (!producto) return <div className="p-10 text-center">No se seleccionó ningún producto.</div>;

  return (
    <div className="p-8">
      {/* ...tu contenido */}
      <button onClick={() => add(producto, 1)} className="mt-4 bg-yellow-400 text-green-900 px-5 py-2 rounded-full">
        Agregar al carrito
      </button>
    </div>
  );
}
