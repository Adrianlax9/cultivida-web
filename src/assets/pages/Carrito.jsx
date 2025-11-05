import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function Carrito() {
  const {
    items,
    total,
    addToCart,
    decreaseFromCart,
    removeItem,
  } = useCart();

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        Tu carrito 🛒
      </h1>

      {items.length === 0 ? (
        <div className="text-center bg-white rounded-xl shadow p-8">
          <p className="text-gray-600 mb-4">
            Tu carrito está vacío.
          </p>
          <Link
            to="/productos"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md"
          >
            Ver productos
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow divide-y">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between p-4 gap-4"
              >
                {/* INFO PRODUCTO */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 rounded object-cover border"
                    />
                  )}

                  <div>
                    <p className="font-semibold text-green-700">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      ${Number(item.price).toLocaleString()} c/u
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-red-500 hover:text-red-700 mt-1"
                    >
                      🗑 Quitar
                    </button>
                  </div>
                </div>

                {/* CONTROLES DE CANTIDAD */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseFromCart(item.id)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold w-8 h-8 rounded-full flex items-center justify-center"
                  >
                    -
                  </button>

                  <span className="min-w-[2rem] text-center font-semibold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => addToCart(item)}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center"
                  >
                    +
                  </button>
                </div>

                {/* SUBTOTAL POR ITEM */}
                <div className="text-right font-semibold text-green-800 w-full sm:w-auto">
                  ${(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* RESUMEN FINAL + IR A PAGAR */}
          <div className="mt-8 bg-white rounded-xl shadow p-6">
            <div className="flex justify-between text-lg font-semibold text-green-800">
              <span>Subtotal productos:</span>
              <span>${Number(total).toLocaleString()}</span>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              El domicilio se calcula en el siguiente paso según tu ciudad 🏍️
            </p>

            <div className="mt-6 text-right">
              <Link
                to="/checkout"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md"
              >
                Ir a pagar →
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
