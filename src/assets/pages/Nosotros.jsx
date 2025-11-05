// src/assets/pages/Nosotros.jsx
import { motion } from "framer-motion";

export default function Nosotros() {
  return (
    <div className="bg-gradient-to-b from-white via-green-50/60 to-white text-gray-800">
      {/* ===== HERO ===== */}
      
<section
  className="relative h-[60vh] bg-cover bg-center flex flex-col items-center justify-center text-center"
  style={{ backgroundImage: "url('/images/nosotros-hero.jpg')" }}
>
  {/* Capa verde translúcida */}
  <div className="absolute inset-0 bg-green-900/40"></div>

  <div className="relative z-10 text-white px-6">
    {/* Título animado */}
    <motion.h1
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="text-5xl sm:text-6xl font-extrabold drop-shadow-lg"
    >
      Sobre Nosotros <span className="inline-block">🌿</span>
    </motion.h1>

    {/* Subtítulo animado */}
    <motion.p
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
      className="mt-4 text-lg sm:text-xl font-medium text-white/90 max-w-2xl mx-auto leading-relaxed"
    >
      En <span className="font-bold text-yellow-300">Cultivida</span> creemos en el poder de la naturaleza
      para cuidar tu bienestar.
    </motion.p>

    {/* Línea decorativa animada */}
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "120px", opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
      className="mt-6 h-1 bg-yellow-400 rounded-full mx-auto"
    ></motion.div>
  </div>
</section>

      {/* ===== HISTORIA ===== */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-green-800 mb-6">Nuestra Historia</h2>
          <p className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
            <strong>Cultivida</strong> nació en <strong>Cúcuta, Norte de Santander</strong>, como una pequeña iniciativa
            dedicada a ofrecer productos naturales que promueven el bienestar digestivo y general.
            Desde nuestros inicios, nos hemos comprometido con la producción artesanal de <em>kéfir</em> y otros
            probióticos 100% orgánicos, elaborados sin conservantes, colorantes ni aditivos químicos.
            Hoy, gracias a la confianza de nuestros clientes, hemos expandido nuestra presencia con
            <strong> ventas en línea a todo el país</strong>, manteniendo siempre la calidad, frescura y valores
            naturales que nos caracterizan.
          </p>
        </motion.div>
      </section>

      {/* ===== MISIÓN Y VISIÓN ===== */}
      <section className="bg-green-50/70 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          {/* Misión */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8 ring-1 ring-green-900/10"
          >
            <h3 className="text-2xl font-bold text-green-700 mb-4">🌱 Misión</h3>
            <p className="text-gray-700 leading-relaxed">
              Ofrecer probióticos naturales y saludables que fortalezcan el bienestar integral de las personas,
              utilizando procesos artesanales sostenibles y materias primas orgánicas.
              Buscamos fomentar hábitos de vida saludables y una conexión más consciente con la naturaleza.
            </p>
          </motion.div>

          {/* Visión */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8 ring-1 ring-green-900/10"
          >
            <h3 className="text-2xl font-bold text-green-700 mb-4">🌿 Visión</h3>
            <p className="text-gray-700 leading-relaxed">
              Ser una empresa líder en la producción y distribución de probióticos orgánicos en Colombia,
              reconocida por su calidad, innovación y compromiso con la salud natural.
              Nuestro propósito es que <strong>Cultivida</strong> sea sinónimo de bienestar, confianza y sostenibilidad.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== EQUIPO ===== */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h3 className="text-3xl font-bold text-green-800 mb-8">Nuestro Equipo 💚</h3>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center items-center gap-8"
        >
          <img
            src="/images/equipo-cultivida.jpg"
            alt="Equipo Cultivida"
            className="w-60 h-60 object-cover rounded-2xl shadow-lg ring-1 ring-green-900/10 hover:scale-105 transition-transform"
          />
          <p className="max-w-lg text-gray-700 leading-relaxed text-left sm:text-justify">
            Nuestro equipo está conformado por personas apasionadas por la salud y la sostenibilidad.
            Trabajamos cada día para ofrecer productos auténticos, llenos de vida, que respetan tanto a las
            personas como al planeta. En <strong>Cultivida</strong>, creemos que el bienestar se cultiva desde adentro.
          </p>
        </motion.div>
      </section>

      {/* ===== FRASE FINAL ===== */}
   
<section className="bg-green-600 py-5 sm:py-3 text-center text-white text-base relative ">
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="text-2xl sm:text-3xl italic font-semibold"
  >
    “Cuidamos tu salud desde la naturaleza 🌿”
  </motion.p>
</section>

{/* ===== ESPACIADO ENTRE SECCIONES ===== */}
<div className="h-5 sm:h-5 bg-transparent"></div>



    </div>
  );
}
