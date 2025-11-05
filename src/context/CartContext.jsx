import { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Estructura del carrito:
  // items = [{ id, name, price, imageUrl, quantity }]
  const [items, setItems] = useState([]);

  // ➕ Agregar una unidad de un producto al carrito
  //    product debe tener { id, name, price, imageUrl }
  const addToCart = (product) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx !== -1) {
        // si ya existe, subimos quantity
        const clone = [...prev];
        clone[idx] = {
          ...clone[idx],
          quantity: clone[idx].quantity + 1,
        };
        return clone;
      }

      // si no existía, lo agregamos con quantity = 1
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: Number(product.price),
          imageUrl: product.imageUrl || "",
          quantity: 1,
        },
      ];
    });
  };

  // ➖ Disminuir una unidad
  const decreaseFromCart = (productId) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === productId);
      if (idx === -1) return prev;

      const current = prev[idx];
      if (current.quantity <= 1) {
        // si queda en 0, lo quitamos
        return prev.filter((p) => p.id !== productId);
      }

      const clone = [...prev];
      clone[idx] = {
        ...clone[idx],
        quantity: current.quantity - 1,
      };
      return clone;
    });
  };

  // 🗑 eliminar producto por completo
  const removeItem = (productId) => {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  };

  // 🧼 limpiar todo el carrito (lo usamos cuando se hace el pedido)
  const clear = () => {
    setItems([]);
  };

  // número total de unidades
  const count = useMemo(() => {
    return items.reduce((acc, it) => acc + it.quantity, 0);
  }, [items]);

  // subtotal en plata
  const total = useMemo(() => {
    return items.reduce(
      (acc, it) => acc + Number(it.price) * Number(it.quantity),
      0
    );
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,         // <- SUMAR 1 unidad
        decreaseFromCart,  // <- RESTAR 1 unidad
        removeItem,        // <- BORRAR de una
        clear,             // <- VACIAR carrito
        count,             // <- CANTIDAD total
        total,             // <- SUBTOTAL dinero
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
