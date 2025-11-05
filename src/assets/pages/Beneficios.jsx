// src/assets/pages/Beneficios.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Beneficios() {
const sciItems = [
  {
    icon: "🧬",
    title: "Diversidad microbiana",
    text:
      "El kéfir puede favorecer una mayor diversidad de la microbiota intestinal y ayudar a modular el pH.",
  },
  {
    icon: "😌",
    title: "Confort digestivo",
    text:
      "En personas sensibles, su consumo regular se asocia con menor sensación de hinchazón y malestar.",
  },
  {
    icon: "🛡️",
    title: "Respuesta inmune",
    text:
      "Metabolitos de la fermentación contribuyen a mecanismos que apoyan la función del sistema inmune.",
  },
  {
    icon: "🌾",
    title: "Nutrientes bioactivos",
    text:
      "Aporta vitaminas del grupo B y péptidos/compuestos bioactivos propios del proceso fermentativo.",
  },
];


  return (
    <div className="bg-white text-gray-800">

      {/* ===== HERO () ===== */}
      

<section className="relative overflow-hidden">
  {/* Imagen de fondo con capa verde */}
  <div
    className="relative h-[70vh] bg-cover bg-center flex flex-col items-center justify-center text-center"
    style={{ backgroundImage: "url('/images/beneficio1.png')" }} //  imagen de fondo
  >
    <div className="absolute inset-0 bg-green-900/45"></div>

    <div className="relative z-10 text-white px-6">
      {/* Título animado */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-5xl sm:text-6xl font-extrabold drop-shadow-lg"
      >
        Beneficios del Kéfir artesanal
      </motion.h1>

      {/* Subtítulo animado */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        className="mt-4 text-lg sm:text-xl font-medium text-white/90 max-w-2xl mx-auto leading-relaxed"
      >
        Descubre cómo el kéfir puede apoyar tu salud intestinal, defensas y energía
        de forma natural.
      </motion.p>

      {/* Botón animado */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        className="mt-8"
      >
        <a
          href="/productos"
          className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold px-8 py-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
        >
          Ver productos
        </a>
      </motion.div>
    </div>

    {/* Línea amarilla animada */}
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "120px", opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 h-1 bg-yellow-400 rounded-full"
    ></motion.div>
  </div>

  {/* ===== Onda decorativa (SVG) ===== */}
  <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
    <svg
      className="relative block w-full h-[80px] sm:h-[100px]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86C626.27,1.32,684.86-3.39,743,1.75c84,7.54,167.09,34.31,251.09,43.3,63.85,6.8,127.85,2.45,190.81-9.31V120H0V97.35A600.21,600.21,0,0,0,321.39,56.44Z"
        fill="#ffffff"
      ></path>
    </svg>
  </div>
</section>



      {/* ===== BENEFICIOS PRINCIPALES ===== */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-6">
        <h2 className="text-3xl font-bold text-green-700 text-center">¿Por qué elegir kéfir?</h2>
        <p className="text-center text-gray-600 mt-2">
          Fermentado vivo, con probióticos naturales y un perfil nutricional que se siente.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10">
          <Card icon="🦠" title="Probióticos vivos">
            Aporta microorganismos beneficiosos que ayudan a equilibrar la microbiota intestinal.
          </Card>
          <Card icon="🛡️" title="Apoyo al sistema inmune">
            Un intestino sano se asocia con mejores defensas. Ideal en épocas de mayor exposición.
          </Card>
          <Card icon="⚡" title="Energía sostenida">
            Fermentación que mejora la biodisponibilidad de nutrientes; se nota en tu día a día.
          </Card>
          <Card icon="🌿" title="100% natural">
            Sin conservantes ni sabores artificiales. Elaborado artesanalmente con ingredientes reales.
          </Card>
          <Card icon="😌" title="Digestión más ligera">
            Suele ser mejor tolerado; muchas personas reportan menos hinchazón.
          </Card>
          <Card icon="🍶" title="Versátil y delicioso">
            En agua o leche, solo o con fruta. Perfecto para tu rutina de bienestar.
          </Card>
        </div>
      </section>

      {/* ===== CÓMO FUNCIONA (medias pequeñas y ordenadas) ===== */}
<section className="bg-gradient-to-b from-white to-green-50 py-16">
  <div className="max-w-6xl mx-auto px-6 space-y-14">
    <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-green-800">
      Cómo funciona el kéfir
    </h2>

    <Block
      reverse={false}
      media={
        <img
          src="/images/beneficio4.jpg"
          alt="Fermentación natural"
          onError={(e)=>{ e.currentTarget.src="/images/fallback.jpg"; }}
          className="w-[280px] sm:w-[320px] md:w-[360px] h-[200px] object-cover rounded-2xl shadow-lg ring-1 ring-black/5"

        />
      }
      title="Fermentación natural"
      text="Los gránulos de kéfir realizan un proceso de fermentación que transforma los azúcares en ácidos orgánicos, gases y compuestos bioactivos. Este proceso favorece el equilibrio natural de la flora intestinal y promueve una mejor digestión."
      badge="Paso 1"
    />

    <Block
      reverse={true}
      media={
        <img
          src="/images/beneficio2.jpg"
          alt="Probióticos y compuestos"
          onError={(e)=>{ e.currentTarget.src="/images/fallback.jpg"; }}
          className="w-[280px] sm:w-[320px] md:w-[360px] h-[200px] object-cover rounded-2xl shadow-lg ring-1 ring-black/5"

        />
      }
      title="Probióticos y compuestos"
      text="Durante la fermentación, el kéfir desarrolla una combinación única de bacterias y levaduras beneficiosas, junto con vitaminas, péptidos y otros nutrientes bioactivos.
Estos microorganismos ayudan a fortalecer el sistema digestivo y apoyan la función inmune del organismo."
      badge="Paso 2"
    />

    <Block
      reverse={false}
      media={
        <video
          className="w-[280px] sm:w-[320px] md:w-[360px] h-[200px] object-cover rounded-2xl shadow-lg ring-1 ring-black/5"

          controls
          muted
          playsInline
          poster="/images/step1.jpg"
        >
          <source src="/videos/beneficio1.mp4" type="video/mp4" />
          Tu navegador no soporta video.
        </video>
      }
      title="Tu rutina diaria"
      text="Incorporar kéfir a tu día a día es una forma sencilla de cuidar tu bienestar desde adentro.
Su consumo regular puede mejorar la digestión, aumentar los niveles de energía y promover un equilibrio intestinal duradero, como parte de un estilo de vida saludable."
      badge="Paso 3"
    />
  </div>
</section>


      {/* ===== BENEFICIOS VISUALES (tarjetas mini con imagen/video) ===== */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-green-800">
              Beneficios que se sienten día a día
            </h2>
            <p className="mt-3 text-gray-700">
              El kéfir puede apoyar tu digestión, energía y defensas. Al ser un fermentado vivo,
              su efecto se construye con el uso constante.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <MiniCard
              media={
                <img
                  src="/images/benef-energia.jpg"
                  alt="Energía natural"
                  className="h-20 w-20 object-cover rounded-full ring-2 ring-green-200"
                />
              }
              title="Energía natural"
              text="Biodisponibilidad de nutrientes y compuestos bioactivos para empezar mejor tu día."
            />
            <MiniCard
              media={
                <video
                  className="h-20 w-20 object-cover rounded-full ring-2 ring-green-200"
                  muted
                  loop
                  autoPlay
                  playsInline
                  poster="/images/benef-digestion.jpg"
                >
                  <source src="/videos/benef-digestion.mp4" type="video/mp4" />
                </video>
              }
              title="Digestión equilibrada"
              text="Probióticos vivos que ayudan a la microbiota y pueden reducir molestias como hinchazón."
            />
            <MiniCard
              media={
                <img
                  src="/images/benef-inmune.jpg"
                  alt="Sistema inmune"
                  className="h-20 w-20 object-cover rounded-full ring-2 ring-green-200"
                />
              }
              title="Apoyo a defensas"
              text="Un intestino sano se asocia con mejor respuesta inmune. Úsalo como parte de tu rutina."
            />
            <MiniCard
              media={
                <video
                  className="h-20 w-20 object-cover rounded-full ring-2 ring-green-200"
                  muted
                  loop
                  autoPlay
                  playsInline
                  poster="/images/benef-nutricion.jpg"
                >
                  <source src="/videos/benef-nutricion.mp4" type="video/mp4" />
                </video>
              }
              title="Nutrición real"
              text="Vitaminas del grupo B, péptidos y compuestos derivados de la fermentación artesanal."
            />
            <MiniCard
              media={
                <img
                  src="/images/benef-sabor.jpg"
                  alt="Sabor y variedad"
                  className="h-20 w-20 object-cover rounded-full ring-2 ring-green-200"
                />
              }
              title="Sabor y variedad"
              text="Agua o leche, natural o con frutas. Encuentra tu estilo y disfruta sin conservantes."
            />
            <MiniCard
              media={
                <video
                  className="h-20 w-20 object-cover rounded-full ring-2 ring-green-200"
                  muted
                  loop
                  autoPlay
                  playsInline
                  poster="/images/benef-rutina.jpg"
                >
                  <source src="/videos/benef-rutina.mp4" type="video/mp4" />
                </video>
              }
              title="Fácil de integrar"
              text="En desayunos, media mañana o post-entreno. La constancia marca la diferencia."
            />
          </div>

        
// ...

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.6 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="relative max-w-3xl mx-auto text-center mt-20 rounded-3xl shadow-md overflow-hidden"
>
  {/* Fondo animado con degradado */}
  <motion.div
    className="absolute inset-0 bg-gradient-to-br from-green-100 via-white to-green-50 opacity-90"
    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    style={{ backgroundSize: "200% 200%" }}
  />

  {/* Hoja decorativa flotante */}
  <motion.img
    src="/images/leaf-icon.png" // agrega una hojita PNG o SVG pequeña en /public/images/
    alt="Decoración hoja"
    className="absolute w-10 h-10 top-4 right-4 opacity-40"
    animate={{ y: [0, -6, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  />

  {/* Contenido */}
  <div className="relative z-10 p-8 sm:p-10">
    <p className="text-gray-800 leading-relaxed text-base text-left">
      <strong>La experiencia con el kéfir puede variar de una persona a otra.</strong><br />
      Para obtener los mejores resultados, comienza con porciones pequeñas 
      (100–150&nbsp;ml diarios) e incrementa gradualmente según tu tolerancia y bienestar.
    </p>

    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="text-gray-600 mt-5 text-sm italic text-left"
    >
      <strong>Importante:</strong> si estás embarazada, en periodo de lactancia o presentas alergias
      o condiciones médicas especiales, consulta con tu profesional de salud antes de incorporarlo
      regularmente en tu alimentación.
    </motion.p>
  </div>
</motion.div>
        </div>
      </section>

      {/* ===== RESPALDO CIENTÍFICO (interactivo) ===== */}

<section className="relative">
  {/* fondo sutil */}
  <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-green-50/40 to-white" />

  <div className="max-w-6xl mx-auto px-6 py-16">
    <div className="text-center mb-10">
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5 }}
        className="text-3xl sm:text-4xl font-extrabold text-green-800"
      >
        Beneficios respaldados por la ciencia
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-gray-600 mt-2"
      >
        Un resumen visual de hallazgos reportados en literatura científica sobre
        bebidas fermentadas tipo kéfir.
      </motion.p>
    </div>

    {/* tarjetas */}
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {sciItems.map((it, idx) => (
        <motion.article
          key={idx}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, delay: idx * 0.05 }}
          className="group h-full rounded-2xl border bg-white/90 p-5 shadow-sm ring-1 ring-black/5
                     hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          <div className="flex items-start gap-3">
            <div
              className="text-2xl grid place-items-center h-10 w-10 rounded-full
                         bg-green-100 text-green-700 ring-1 ring-green-600/10"
              aria-hidden
            >
              {it.icon}
            </div>
            <div>
              <h4 className="font-semibold text-green-800">{it.title}</h4>
              <p className="text-sm text-gray-700 mt-1">{it.text}</p>
            </div>
          </div>

          {/* barra de progreso decorativa al pasar el mouse */}
          <div className="mt-4 h-1.5 rounded-full bg-green-100 overflow-hidden">
            <div className="h-full w-0 bg-gradient-to-r from-green-500 to-emerald-400
                            group-hover:w-full transition-all duration-700" />
          </div>
        </motion.article>
      ))}
    </div>

    {/* aviso + referencias */}
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5 }}
      className="mt-10 rounded-2xl bg-green-50/60 p-5 ring-1 ring-green-900/5"
    >
      <p className="text-gray-700 text-sm">
        <strong>Nota:</strong> el kéfir no es un medicamento. Los efectos pueden
        variar según cada persona y sus hábitos de vida. Integra su consumo dentro
        de una alimentación equilibrada.
      </p>

      <details className="group mt-3">
        <summary className="cursor-pointer text-sm font-medium text-green-800 select-none flex items-center gap-2">
          Ver referencias sugeridas
          <span className="ml-1 text-gray-400 group-open:rotate-180 transition-transform">⌄</span>
        </summary>
        <ul className="mt-2 list-disc pl-5 text-sm text-gray-600 space-y-1">
          <li>Revisiones sobre microbiota y bebidas fermentadas tipo kéfir.</li>
          <li>Estudios observacionales de tolerancia digestiva en consumidores.</li>
          <li>Literatura sobre compuestos bioactivos derivados de fermentación.</li>
        </ul>
      </details>
    </motion.div>
  </div>
</section>

{/* ===== GALERÍA MIXTA (profesional, tamaño estándar) ===== */}
<section className="bg-white">
  <div className="max-w-6xl mx-auto px-6 py-12">
    <header className="text-center mb-10">
      <h3 className="text-3xl font-extrabold text-green-800">Descubre, mira y aprende</h3>
      <p className="mt-2 text-gray-600">
        Videos cortos e imágenes reales para entender mejor el kéfir y cómo integrarlo a tu rutina.
      </p>
    </header>

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <VideoCard
        src="/videos/beneficios-1.mp4"
        poster="/images/video-1-poster.jpg"
        caption="Kéfir y bienestar digestivo"
      />
      <ImageCard
        src="/images/galeria-1.jpg"
        caption="Cultivo artesanal"
      />
      <ImageCard
        src="/images/galeria-2.jpg"
        caption="Frutas reales"
      />
      <ImageCard
        src="/images/galeria-3.jpg"
        caption="Sin conservantes"
      />
      <VideoCard
        src="/videos/beneficios-2.mp4"
        poster="/images/video-2-poster.jpg"
        caption="Cómo incorporarlo a tu día"
      />
      <VideoCard
        src="/videos/beneficio-3.mp4"
        poster="/images/step3-poster.jpg"
        caption="Fermentación en 30s"
      />
    </div>
  </div>
</section>


      {/* ===== COMPARATIVA (tarjetas pro) ===== */}
<section className="relative">
  <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-green-50/40 to-white" />

  <div className="max-w-6xl mx-auto px-6 py-16">
    <div className="text-center mb-10">
      <h3 className="text-2xl sm:text-3xl font-extrabold text-green-800">
        Kéfir de agua vs. kéfir de leche
      </h3>
      <p className="text-gray-600 mt-2">
        Dos caminos, un mismo objetivo: bienestar. Elige el que mejor encaje con tu gusto y rutina.
      </p>
    </div>

    <div className="grid gap-6 lg:grid-cols-2">
      {/* Agua */}
      <article className="group rounded-2xl border bg-white/90 p-6 shadow-sm ring-1 ring-black/5 hover:shadow-md hover:-translate-y-0.5 transition-all">
        <header className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 grid place-items-center">
            💧
          </div>
          <div>
            <h4 className="font-semibold text-green-800 text-lg">Kéfir de agua</h4>
            <p className="text-sm text-gray-600">Refrescante, ligero y sin lactosa.</p>
          </div>
        </header>

        <ul className="space-y-3 text-sm">
          <FeatureRow ok label="Base: agua + azúcar de caña/fruta (se consume durante la fermentación)." />
          <FeatureRow ok label="Sabor: refrescante, burbujeo suave tipo bebida gasificada." />
          <FeatureRow ok label="0% lactosa: apto si evitas lácteos." />
          <FeatureRow neutral label="Ideal para hidratación y probióticos en el día." />
        </ul>

        <div className="mt-5 h-1.5 rounded-full bg-emerald-100 overflow-hidden">
          <div className="h-full w-0 bg-gradient-to-r from-emerald-500 to-green-500 group-hover:w-full transition-all duration-700" />
        </div>
      </article>

      {/* Leche */}
      <article className="group rounded-2xl border bg-white/90 p-6 shadow-sm ring-1 ring-black/5 hover:shadow-md hover:-translate-y-0.5 transition-all">
        <header className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-700 grid place-items-center">
            🥛
          </div>
          <div>
            <h4 className="font-semibold text-green-800 text-lg">Kéfir de leche</h4>
            <p className="text-sm text-gray-600">Cremoso, nutritivo y muy versátil.</p>
          </div>
        </header>

        <ul className="space-y-3 text-sm">
          <FeatureRow ok label="Base: leche (vaca, cabra o alternativas)." />
          <FeatureRow ok label="Sabor y textura: más cremoso, tipo yogur bebible." />
          <FeatureRow neutral label="Lactosa reducida por fermentación (puede quedar traza)." />
          <FeatureRow ok label="Ideal para desayunos/snacks con fruta, granola y miel." />
        </ul>

        <div className="mt-5 h-1.5 rounded-full bg-amber-100 overflow-hidden">
          <div className="h-full w-0 bg-gradient-to-r from-amber-500 to-orange-400 group-hover:w-full transition-all duration-700" />
        </div>
      </article>
    </div>

    {/* Mini leyenda */}
    <p className="text-xs text-gray-500 mt-6">
      * La elección depende de tus preferencias, tolerancia y objetivos. Ambos aportan probióticos cuando se consumen de forma constante.
    </p>
  </div>
</section>


      {/* ===== FAQs ===== */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold text-green-700 mb-6">Preguntas frecuentes</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <FAQ q="¿Cuánta cantidad puedo tomar al día?">
            Comienza con 100–150 ml y aumenta gradualmente hasta 200–300 ml según tolerancia y objetivos.
          </FAQ>
          <FAQ q="¿En cuánto tiempo noto efectos?">
            Muchas personas reportan mejoras digestivas entre 1 y 3 semanas con consumo constante.
          </FAQ>
          <FAQ q="¿Debo mantenerlo refrigerado?">
            Sí. Mantén el producto refrigerado y consúmelo dentro del tiempo recomendado en la etiqueta.
          </FAQ>
          <FAQ q="¿Puedo mezclarlo con frutas o miel?">
            ¡Claro! Es una forma deliciosa de variar sabores. Evita exceso de azúcar si buscas control calórico.
          </FAQ>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="text-center py-14">
        <h4 className="text-2xl font-bold text-green-700">¿Listo para probarlo?</h4>
        <p className="text-gray-600 mt-2">Explora nuestros sabores y formatos.</p>
        <Link
          to="/productos"
          className="inline-block mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow"
        >
          Ver catálogo
        </Link>
      </section>
    </div>
  );
}

/* ---------- Subcomponentes ---------- */

function Card({ icon, title, children }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition animate-fade-in-up">
      <div className="text-3xl">{icon}</div>
      <h4 className="mt-3 font-semibold text-green-800">{title}</h4>
      <p className="mt-1 text-gray-600 text-sm leading-relaxed">{children}</p>
    </div>
  );
}

function Block({ reverse, media, title, text, badge }) {
  // Validaciones para evitar que el bloque “desaparezca”
  const hasMedia = !!media;
  const safeTitle = title || "Título";
  const safeText  = text  || "Descripción pendiente.";
  const dir = reverse ? "sm:flex-row-reverse" : "sm:flex-row";

  return (
    <div className={`flex flex-col ${dir} items-center gap-8`} role="group">
      {/* Media con fallback visual si no carga */}
      <div className="flex-shrink-0">
        {hasMedia ? (
          media
        ) : (
          <div className="w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-2xl bg-gray-100 grid place-content-center text-gray-400">
            sin multimedia
          </div>
        )}
      </div>

      {/* Texto */}
      <div className="flex-1 text-center sm:text-left max-w-xl">
        {badge && (
          <span className="inline-block text-[11px] font-semibold uppercase bg-green-100 text-green-900 px-3 py-1 rounded-full mb-3 tracking-wide">
            {badge}
          </span>
        )}
        <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-2 leading-tight">
          {safeTitle}
        </h3>
        <p className="text-gray-700 text-[15px] leading-relaxed">
          {safeText}
        </p>
      </div>
    </div>
  );
}


function MiniCard({ media, title, text }) {
  return (
    <article className="rounded-2xl border bg-white/95 p-5 shadow-sm hover:shadow-md transition animate-fade-in-up">
      <div className="flex items-center gap-4">
        <div className="relative">{media}</div>
        <div>
          <h3 className="font-semibold text-green-800 text-base">{title}</h3>
          <p className="text-sm text-gray-600">{text}</p>
        </div>
      </div>
    </article>
  );
}

function ImageCard({ src, caption }) {
  return (
    <CardShell caption={caption}>
      <div className="relative aspect-video overflow-hidden">
        <img
          src={src}
          alt={caption}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transform transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </CardShell>
  );
}

function VideoCard({ src, poster, caption }) {
  return (
    <CardShell caption={caption}>
      <div className="relative aspect-video group">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          controls
          preload="metadata"
          poster={poster}
        >
          <source src={src} type="video/mp4" />
        </video>

        {/* Play overlay sutil al pasar el mouse */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="h-12 w-12 rounded-full bg-white/90 ring-1 ring-black/5 grid place-items-center">
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-green-700">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
    </CardShell>
  );
}

function Row({ label, a, b }) {
  return (
    <tr className="odd:bg-white even:bg-green-50/60">
      <td className="px-4 py-3 font-medium text-green-900">{label}</td>
      <td className="px-4 py-3">{a}</td>
      <td className="px-4 py-3">{b}</td>
    </tr>
  );
}

function FAQ({ q, children }) {
  return (
    <details className="group rounded-xl border bg-white p-4 hover:shadow-sm">
      <summary className="cursor-pointer list-none font-semibold text-green-800 flex items-center justify-between">
        {q}
        <span className="ml-3 text-gray-400 group-open:rotate-180 transition-transform">⌄</span>
      </summary>
      <p className="mt-2 text-gray-600 text-sm">{children}</p>
    </details>
  );
}
function FeatureRow({ ok, neutral, label }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className={`mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full text-xs
        ${ok ? "bg-green-100 text-green-700 ring-1 ring-green-600/10" : neutral ? "bg-gray-100 text-gray-600 ring-1 ring-gray-500/10" : "bg-red-100 text-red-600 ring-1 ring-red-600/10"}`}
        aria-hidden
      >
        {ok ? "✓" : neutral ? "•" : "✕"}
      </span>
      <span className="text-gray-700">{label}</span>
    </li>
  );
}




function CardShell({ children, caption }) {
  return (
    <figure className="rounded-2xl overflow-hidden bg-white ring-1 ring-black/5 shadow-sm hover:shadow-md transition-shadow">
      {children}
      <figcaption className="px-4 py-3 text-sm bg-green-50/70 border-t text-green-900">
        {caption}
      </figcaption>
    </figure>
  );
}