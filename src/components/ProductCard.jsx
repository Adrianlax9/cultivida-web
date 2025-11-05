import { useState } from "react";
import ProductInfo from "../../components/ProductInfo"; // ajusta la ruta

function ProductCard({ product, onAdd }) {
  const [openInfo, setOpenInfo] = useState(false);

  return (
    <div className="rounded-2xl bg-white shadow ring-1 ring-black/5 p-5">
      {/* ... tu imagen, nombre, precio, etc ... */}

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => onAdd(product)}
          className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-green-900 font-semibold px-4 py-2 rounded-full shadow"
        >
          Agregar al carrito
        </button>

        <button
          onClick={() => setOpenInfo(true)}
          className="px-4 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold"
        >
          Info +
        </button>
      </div>

      <ProductInfo
        open={openInfo}
        onClose={() => setOpenInfo(false)}
        product={product}
      />
    </div>
  );
}

export default ProductCard;
