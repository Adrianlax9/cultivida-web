// src/components/ProductInfo.jsx
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductInfo({ open, onClose, product }) {
  // Cerrar con ESC
  useEffect(() => {
    if (!open) return;
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open || !product) return null;

  const { name, imageUrl, price } = product;

  // 1) DESCRIPTION / SUMMARY (prioridad: info.summary -> infoShort -> description -> fallback)
  const summary =
    product?.info?.summary?.trim() ||
    product?.infoShort?.trim() ||
    product?.description?.trim() ||
    "Bebida probiótica viva, elaborada artesanalmente y pensada para tu bienestar diario.";

  // 2) BULLETS: si vienen en product.info.bullets (array), úsalo.
  //    Si vienen en product.infoBullets (string), separa por saltos de línea o "|"
  const bullets = Array.isArray(product?.info?.bullets) && product.info.bullets.length
    ? product.info.bullets
    : (product?.infoBullets
        ? product.infoBullets
            .split(/\r?\n|\|/g)
            .map((b) => b.replace(/^•?\s*/, "").trim())
            .filter(Boolean)
        : [
            "Probióticos vivos que apoyan la microbiota.",
            "Sabor natural, sin conservantes.",
            "Ideal para consumir frío, solo o con fruta.",
          ]);

  // 3) TAGS/CTA (opcionales si usas el esquema antiguo product.info)
  const tags = Array.isArray(product?.info?.tags) ? product.info.tags : [];
  const cta = product?.info?.cta; // { label, href } opcional

  return (
    <AnimatePresence>
      {/* FONDO */}
      <motion.div
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        aria-hidden="true"
      />
      {/* MODAL */}
      <motion.div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-[70] grid place-items-center px-4"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
      >
        <div
          className="w-full max-w-lg rounded-2xl bg-white shadow-xl ring-1 ring-black/5 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center gap-4 p-5 border-b">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="h-14 w-14 rounded-lg object-cover ring-1 ring-black/5"
              />
            ) : null}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-green-800">{name}</h3>
              {price != null && (
                <p className="text-sm text-gray-600">
                  {typeof price === "number"
                    ? price.toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                      })
                    : price}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-100 transition"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="p-5">
            <p className="text-gray-700">{summary}</p>

            {bullets.length > 0 && (
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                {bullets.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-0.5 text-green-600">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-800 ring-1 ring-green-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-5 border-t flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border hover:bg-gray-50"
            >
              Cerrar
            </button>
            {cta?.href && cta?.label && (
              <a
                href={cta.href}
                className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold"
              >
                {cta.label}
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
