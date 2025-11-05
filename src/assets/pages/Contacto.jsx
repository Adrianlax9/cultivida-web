import { useState } from "react";
import { motion } from "framer-motion";
import api from "../../Api"; // Usa tu cliente Axios ya configurado

export default function Contacto() {
  // Datos de contacto / redes
  const EMAIL = "cultividaprobioticos@gmail.com";
  const WHATSAPP = "573203089063"; // sin + ni espacios
  const waLink = `https://wa.me/${WHATSAPP}?text=Hola%20Cultivida,%20quisiera%20más%20información%20😊`;

  const socials = [
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@kfir.artesanal.cc?_r=1&_t=ZS-9150VHop6iW",
      bg: "bg-black hover:bg-neutral-800",
      icon: TikTokIcon,
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/share/1K8R1xLzdf/",
      bg: "bg-[#1877F2] hover:bg-[#1669d6]",
      icon: FacebookIcon,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/kefirartesanalcultivida?igsh=MWk5YzUyNWllMzZsaA==",
      bg: "bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] hover:opacity-90",
      icon: InstagramIcon,
    },
    {
      name: "WhatsApp",
      href: waLink,
      bg: "bg-[#25D366] hover:bg-[#1ebe58]",
      icon: WhatsAppIcon,
    },
  ];

  // Estado del formulario (tu backend ya lo recibe en /api/contact)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    hp: "", // honeypot anti-spam
  });
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState("");
  const [err, setErr] = useState("");

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.name.trim()) return "Por favor ingresa tu nombre.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "Email no válido.";
    if (!form.message.trim() || form.message.trim().length < 10)
      return "El mensaje debe tener al menos 10 caracteres.";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setOk("");
    setErr("");

    const v = validate();
    if (v) return setErr(v);
    if (form.hp) return; // si el honeypot viene lleno => probable bot

    try {
      setSending(true);
      await api.post("/contact", {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
      });
      setOk("¡Gracias! Tu mensaje fue enviado. Te contactaremos pronto.");
      setForm({ name: "", email: "", phone: "", message: "", hp: "" });
    } catch (e) {
      console.error(e);
      setErr("No pudimos enviar el mensaje. Intenta de nuevo.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="bg-white text-gray-800">
      {/* HERO */}
      <div className="max-w-6xl mx-auto px-6 pt-12">
        <motion.h1
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-4xl font-extrabold text-green-700 text-center"
        >
          Contáctanos <span className="inline-block">📞</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.45 }}
          className="text-center text-gray-600 mt-3 max-w-2xl mx-auto"
        >
          Escríbenos para hacer tu pedido o resolver cualquier duda. Estamos
          listos para ayudarte.
        </motion.p>
      </div>

      {/* 2 COLUMNAS */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* IZQUIERDA: Formulario + Info + Redes */}
        <div className="space-y-6">
          {/* FORMULARIO */}
          <Card>
            <h2 className="text-xl font-bold text-green-800">Escríbenos</h2>
            <p className="text-gray-600 text-sm">
              Completa el formulario y te contactaremos en breve.
            </p>

            {ok && (
              <div className="mt-4 rounded-lg bg-green-50 text-green-800 px-4 py-3">
                {ok}
              </div>
            )}
            {err && (
              <div className="mt-4 rounded-lg bg-red-50 text-red-700 px-4 py-3">
                {err}
              </div>
            )}

            <form onSubmit={onSubmit} className="mt-5 space-y-4">
              {/* honeypot invisible */}
              <input
                type="text"
                name="hp"
                value={form.hp}
                onChange={onChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Nombre">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    required
                    placeholder="Tu nombre"
                    className="mt-1 w-full rounded-lg border-gray-300 focus:ring-green-600 focus:border-green-600"
                  />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    required
                    placeholder="tunombre@email.com"
                    className="mt-1 w-full rounded-lg border-gray-300 focus:ring-green-600 focus:border-green-600"
                  />
                </Field>
              </div>

              <Field label="Teléfono (opcional)">
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  placeholder="+57 320 000 0000"
                  className="mt-1 w-full rounded-lg border-gray-300 focus:ring-green-600 focus:border-green-600"
                />
              </Field>

              <Field label="Mensaje">
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  required
                  rows={5}
                  placeholder="Cuéntanos cómo podemos ayudarte…"
                  className="mt-1 w-full rounded-lg border-gray-300 focus:ring-green-600 focus:border-green-600"
                />
              </Field>

              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-lg shadow"
                >
                  {sending ? "Enviando…" : "Enviar"}
                </button>
              </div>
            </form>
          </Card>

          {/* INFO (Email / WhatsApp / Ubicación) */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Card>
              <div className="flex items-start gap-3">
                <MailIcon className="h-6 w-6 text-green-700 shrink-0" />
                <div>
                  <p className="font-semibold text-green-800">Email</p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-sm text-gray-700 underline hover:text-green-700"
                  >
                    {EMAIL}
                  </a>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start gap-3">
                <WhatsAppIcon className="h-6 w-6 text-green-700 shrink-0" />
                <div>
                  <p className="font-semibold text-green-800">WhatsApp</p>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener"
                    className="text-sm text-gray-700 underline hover:text-green-700"
                  >
                    +57 320 308 9063
                  </a>
                  <p className="text-xs text-gray-500 mt-1">
                    Atención de lunes a domingo, 6:00 a. m. – 10:00 p. m.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* REDES SOCIALES */}
          <Card>
            <p className="font-semibold text-green-800 mb-3">
              Síguenos en redes
            </p>
            <div className="flex flex-wrap gap-3">
              {socials.map(({ name, href, bg, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener"
                  aria-label={name}
                  className={`inline-flex items-center gap-2 text-white px-4 py-2 rounded-full shadow ${bg} transition`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{name}</span>
                </a>
              ))}
            </div>
          </Card>
        </div>

        {/* DERECHA: MAPA */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl overflow-hidden shadow ring-1 ring-black/5"
        >
          <iframe
            title="Ubicación Cultivida"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.1594455054434!2d-72.50284082592472!3d7.913826292089194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e664501d35295c1%3A0x12774e943d182333!2sCULTIVIDA%20K%C3%A9fir%20Artesanal%20en%20C%C3%BAcuta!5e0!3m2!1ses!2sco!4v1730593326483!5m2!1ses!2sco"
            className="w-full h-[520px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>

      {/* CTA FINAL */}
      <div className="pb-12">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto px-6"
        >
          <div className="rounded-2xl bg-green-50 border shadow p-6 sm:p-8 text-center">
            <h3 className="text-xl font-bold text-green-800">
              ¿Listo para tu pedido?
            </h3>
            <p className="text-gray-600 mt-1">
              Escríbenos para hacer tu pedido o resolver cualquier duda. Estamos
              listos para ayudarte.
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 mt-4 bg-[#25D366] hover:bg-[#1ebe58] text-white font-semibold px-5 py-2.5 rounded-full shadow transition"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Hablar por WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Pequeños helpers UI ---------- */
function Card({ children }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">{children}</div>
  );
}
function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-green-900">{label}</span>
      {children}
    </label>
  );
}

/* ---------- Iconos (inline SVG, sin dependencias) ---------- */
function MailIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 2v.01L12 12 4 6.01V6h16ZM4 18V8l8 6 8-6v10H4Z" />
    </svg>
  );
}
function PinIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5Z" />
    </svg>
  );
}
function WhatsAppIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor">
      <path d="M19.11 17.26c-.28-.14-1.66-.82-1.92-.91-.26-.1-.45-.14-.64.14-.19.28-.74.91-.9 1.09-.17.19-.33.21-.61.07-.28-.14-1.17-.43-2.23-1.37-.82-.73-1.38-1.62-1.54-1.89-.16-.28-.02-.43.12-.57.12-.12.28-.33.42-.5.14-.17.19-.28.28-.47.09-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.11-.23-.56-.47-.48-.64-.49-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.36-.26.28-1 1-1 2.43 0 1.43 1.03 2.8 1.17 2.99.14.19 2.02 3.08 4.9 4.31.69.3 1.23.48 1.65.61.69.22 1.31.19 1.8.12.55-.08 1.66-.68 1.89-1.34.23-.66.23-1.23.16-1.34-.07-.11-.26-.19-.54-.33z" />
      <path d="M26.88 5.12A13.9 13.9 0 0 0 16 1a14 14 0 0 0-12.2 20.86L2 31l9.29-2.73A14 14 0 1 0 26.88 5.12zM16 27a11 11 0 1 1 0-22 11 11 0 0 1 0 22z" />
    </svg>
  );
}
function FacebookIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M22 12.07C22 6.48 17.52 2 11.93 2 6.35 2 1.87 6.48 1.87 12.07c0 4.87 3.56 8.92 8.22 9.83v-6.95H7.9v-2.88h2.19V9.99c0-2.16 1.29-3.35 3.26-3.35.94 0 1.92.17 1.92.17v2.1h-1.08c-1.07 0-1.41.66-1.41 1.34v1.61h2.4l-.38 2.88h-2.02V21.9c4.66-.91 8.22-4.96 8.22-9.83Z" />
    </svg>
  );
}
function InstagramIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.96.24 2.65.52a5.3 5.3 0 0 1 1.92 1.25 5.3 5.3 0 0 1 1.25 1.92c.28.69.47 1.48.52 2.65.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.96-.52 2.65a5.3 5.3 0 0 1-1.25 1.92 5.3 5.3 0 0 1-1.92 1.25c-.69.28-1.48.47-2.65.52-1.27.06-1.65.07-4.85.07s-3.51-.01-4.85-.07c-1.17-.05-1.96-.24-2.65-.52a5.3 5.3 0 0 1-1.92-1.25 5.3 5.3 0 0 1-1.25-1.92c-.28-.69-.47-1.48-.52-2.65C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.24-1.96.52-2.65a5.3 5.3 0 0 1 1.25-1.92 5.3 5.3 0 0 1 1.92-1.25c.69-.28 1.48-.47 2.65-.52C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.14 0-3.51.01-4.75.07-1.02.05-1.58.22-1.95.37-.49.19-.84.42-1.21.79-.37.37-.6.72-.79 1.21-.15.37-.32.93-.37 1.95-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.05 1.02.22 1.58.37 1.95.19.49.42.84.79 1.21.37.37.72.6 1.21.79.37.15.93.32 1.95.37 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c1.02-.05 1.58-.22 1.95-.37.49-.19.84-.42 1.21-.79.37-.37.6-.72.79-1.21.15-.37.32-.93.37-1.95.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.05-1.02-.22-1.58-.37-1.95-.19-.49-.42-.84-.79-1.21a3.5 3.5 0 0 0-1.21-.79c-.37-.15-.93-.32-1.95-.37-1.24-.06-1.61-.07-4.75-.07Zm0 3.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5Zm0 1.8a2.95 2.95 0 1 0 0 5.9 2.95 2.95 0 0 0 0-5.9Zm5.05-.97a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
    </svg>
  );
}
function TikTokIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="currentColor">
      <path d="M31.5 8.1c1.8 2.6 4.5 4.5 7.6 5.2v5.3c-2.7-.06-5.3-.94-7.6-2.46v12.3c0 6.6-5.4 11.9-12 11.5-5.9-.39-10.7-5.2-11.1-11.2-.5-7 5-12.8 11.8-12.8.75 0 1.48.08 2.2.23v5.73a7 7 0 1 0 3.9 6.27V4h5.4v4.1Z" />
    </svg>
  );
}
