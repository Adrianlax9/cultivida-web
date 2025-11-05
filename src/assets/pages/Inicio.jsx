import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../Api";

export default function Inicio() {
  // ===== Slides del HERO =====
  const slides = useMemo(
    () => [
      { src: "/images/hero1.jpg", title: "Kéfir artesanal, 100% natural", subtitle: "Probióticos vivos para tu bienestar mental y físico." },
      { src: "/images/hero2.jpg", title: "Sabor que cuida tu salud", subtitle: "Frutas reales, fermentación controlada, cero químicos." },
      { src: "/images/hero3.jpg", title: "Frescura hecha a mano", subtitle: "Producido por pequeños emprendedores locales." },
      { src: "/images/hero4.jpg", title: "Energía y equilibrio", subtitle: "Una rutina diaria que se siente desde adentro." },
      { src: "/images/hero5.jpg", title: "Para toda la familia", subtitle: "Opciones en agua y leche, sin conservantes." },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const DURATION = 5000;

  // Precarga
  useEffect(() => {
    slides.forEach((s) => {
      const img = new Image();
      img.src = s.src;
    });
  }, [slides]);

  // Autoplay con pausa por hover
  useEffect(() => {
    let timer;
    if (!isHovered) {
      timer = setInterval(() => {
        setIndex((i) => (i + 1) % slides.length);
      }, DURATION);
    }
    return () => clearInterval(timer);
  }, [isHovered, slides.length]);

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);
  const active = slides[index];

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleKey = (e) => {
    if (e.key === "ArrowLeft") { setIsHovered(true); prev(); }
    if (e.key === "ArrowRight") { setIsHovered(true); next(); }
  };

  // ===== Testimonios (desde la API) =====
  const [testimonios, setTestimonios] = useState([]);
  const [tIndex, setTIndex] = useState(0);
  const [tHover, setTHover] = useState(false);
  const T_DURATION = 5000;

  // Carga de opiniones reales
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/reviews?limit=12");
        setTestimonios(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("No se pudieron cargar opiniones", e);
        setTestimonios([]);
      }
    })();
  }, []);

  // Autoplay testimonios con pausa por hover
  useEffect(() => {
    if (testimonios.length === 0) return;
    let t;
    if (!tHover) {
      t = setInterval(() => setTIndex((i) => (i + 1) % testimonios.length), T_DURATION);
    }
    return () => clearInterval(t);
  }, [tHover, testimonios.length]);

  // Navegación testimonios
  const tPrev = () => {
    if (testimonios.length === 0) return;
    setTIndex((i) => (i - 1 + testimonios.length) % testimonios.length);
  };
  const tNext = () => {
    if (testimonios.length === 0) return;
    setTIndex((i) => (i + 1) % testimonios.length);
  };

  // Swipe táctil (móvil)
  const touchStartX = useRef(null);
  const onTouchStart = (e) => { touchStartX.current = e.changedTouches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx > 40) tPrev();
    if (dx < -40) tNext();
    touchStartX.current = null;
  };

  return (
    <div className="bg-white text-gray-800">
      {/* ===== HERO ===== */}
      <section
        className="relative bg-cover bg-center h-[80vh] flex items-center justify-center overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        tabIndex={0}
        onKeyDown={handleKey}
        role="region"
        aria-label="Carrusel de promociones"
      >
        {/* Imágenes (cross-fade + Ken Burns) */}
        <div className="absolute inset-0">
          {slides.map((s, i) => (
            <div
              key={s.src}
              className={`hero-slide ${i === index ? "is-active" : ""}`}
              style={{ backgroundImage: `url('${s.src}')` }}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} de ${slides.length}`}
            />
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Contenido: texto + botón anclado abajo */}
        <div className="relative z-10 h-full flex flex-col justify-between items-center text-center text-white px-6 py-10">
          <div className="mt-auto mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 animate-fadeInDown">
              {active.title}
            </h1>
            <p className="text-base sm:text-lg mb-6 max-w-2xl mx-auto animate-fadeInUp">
              {active.subtitle}
            </p>
          </div>

          <div className="mb-12 animate-slideUp">
            <Link
              to="/productos"
              className="relative bg-yellow-400 hover:bg-yellow-500 text-green-900 font-semibold px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 animate-pulseGlow"
            >
              Ver productos
            </Link>
          </div>
        </div>

        {/* Flechas HERO */}
        <button
          type="button"
          onClick={() => { setIsHovered(true); prev(); }}
          className="hero-arrow left-3"
          aria-label="Anterior"
        >
          {/* chevron izquierda */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M12.78 15.53a.75.75 0 01-1.06 0l-5-5a.75.75 0 010-1.06l5-5a.75.75 0 111.06 1.06L8.31 10l4.47 4.47a.75.75 0 010 1.06z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => { setIsHovered(true); next(); }}
          className="hero-arrow right-3"
          aria-label="Siguiente"
        >
          {/* chevron derecha */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M7.22 4.47a.75.75 0 011.06 0l5 5a.75.75 0 010 1.06l-5 5a.75.75 0 11-1.06-1.06L11.69 10 7.22 5.53a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Dots HERO */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setIsHovered(true); setIndex(i); }}
              className={`h-2.5 w-2.5 rounded-full border border-white transition ${
                index === i ? "bg-white" : "bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Ir al slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ===== Beneficios ===== */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-10 px-6">
          <Benefit icon="🌿" title="100% natural" text="Ingredientes reales, sin conservantes." />
          <Benefit icon="🚚" title="Entrega local" text="Domicilio rápido en tu ciudad." />
          <Benefit icon="🧪" title="Probióticos vivos" text="Fermentación controlada y fresca." />
          <Benefit icon="💳" title="Pago seguro" text="Contraentrega o medios electrónicos." />
        </div>
      </section>

      {/* ===== Video ===== */}
      
<section className="py-16 text-center bg-green-50">
  <h2 className="text-3xl font-bold text-green-700 mb-8">
    Conoce más sobre Cultivida 🎥
  </h2>

  <div className="max-w-3xl mx-auto px-4">
    <div className="relative w-full pb-[100%] overflow-hidden rounded-2xl shadow-lg">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        controls
        muted
        loop
      >
        <source src="/videos/inicio3.mp4" type="video/mp4" />
        Tu navegador no soporta la reproducción de video.
      </video>
    </div>
  </div>
</section>


      {/* ===== Testimonios (Carrusel con datos reales) ===== */}
      <section
        className="py-16 bg-gradient-to-b from-green-50 to-white"
        onMouseEnter={() => setTHover(true)}
        onMouseLeave={() => setTHover(false)}
      >
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          Lo que dicen nuestros clientes 💬
        </h2>

        <div
          className="relative max-w-3xl mx-auto px-6"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="region"
          aria-label="Carrusel de testimonios"
        >
          {testimonios.length === 0 ? (
            <div className="bg-white rounded-2xl shadow p-6 text-center text-gray-600 border">
              Aún no hay opiniones. ¡Sé el primero en opinar desde tu perfil! ✨
            </div>
          ) : (
            testimonios.map((t, i) => (
              <article
                key={i}
                className={`t-card ${i === tIndex ? "is-active" : ""}`}
                aria-hidden={i !== tIndex}
              >
                <img
                  src={`/images/user${(i % 4) + 1}.jpg`} // avatar de relleno
                  alt={t.name}
                  className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-green-500"
                  onError={(e) => (e.currentTarget.src = "/images/logo1.jpg")}
                />
                <p className="text-gray-700 italic mb-3 text-center">“{t.message}”</p>

                {/* Estrellas (si viene rating) */}
                <div className="flex justify-center gap-1 text-yellow-500 mb-2" aria-label={`${t.rating || 5} estrellas`}>
                  {Array.from({ length: 5 }).map((_, k) => (
                    <span key={k}>{k < (t.rating || 5) ? "★" : "☆"}</span>
                  ))}
                </div>

                <p className="font-semibold text-green-800 text-center">{t.name}</p>
                <p className="text-sm text-gray-500 text-center">{t.city || ""}</p>
              </article>
            ))
          )}

          {/* Flechas Testimonios */}
          {testimonios.length > 1 && (
            <>
              <button
                type="button"
                className="t-arrow left-3"
                aria-label="Anterior testimonio"
                onClick={tPrev}
              >
                ‹
              </button>
              <button
                type="button"
                className="t-arrow right-3"
                aria-label="Siguiente testimonio"
                onClick={tNext}
              >
                ›
              </button>
            </>
          )}

          {/* Dots Testimonios */}
          {testimonios.length > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              {testimonios.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTIndex(i)}
                  aria-label={`Ir al testimonio ${i + 1}`}
                  className={`h-2.5 w-2.5 rounded-full border border-green-600 transition ${
                    tIndex === i ? "bg-green-600" : "bg-green-200 hover:bg-green-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function Benefit({ icon, title, text }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
      <div className="text-3xl leading-none select-none">{icon}</div>
      <div>
        <p className="font-semibold text-green-800">{title}</p>
        <p className="text-sm text-gray-600">{text}</p>
      </div>
    </div>
  );
}
