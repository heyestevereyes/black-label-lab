"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY = {
  nombre: "",
  apellido: "",
  correo: "",
  mensaje: "",
  permiso: false,
};

// Inputs comparten estilos; se centraliza para no repetir la cadena.
const FIELD =
  "w-full bg-black/60 border border-white/20 rounded-md px-4 py-3 " +
  "font-mono text-[13px] text-white placeholder:text-white/35 " +
  "focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent " +
  "transition-colors";

const LABEL =
  "block font-mono text-[10px] uppercase tracking-[0.18em] text-white/50 mb-2";

export default function ContactSection() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  function update<K extends keyof typeof EMPTY>(
    key: K,
    value: (typeof EMPTY)[K]
  ) {
    setForm((f) => ({ ...f, [key]: value }));
    if (status === "error") setStatus("idle");
  }

  function validate() {
    if (
      !form.nombre.trim() ||
      !form.apellido.trim() ||
      !form.correo.trim() ||
      !form.mensaje.trim()
    ) {
      return "Completa todos los campos.";
    }
    if (!EMAIL_RE.test(form.correo.trim())) {
      return "Escribe un correo electrónico válido.";
    }
    if (!form.permiso) {
      return "Necesitamos tu permiso para contactarte.";
    }
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const problem = validate();
    if (problem) {
      setStatus("error");
      setMessage(problem);
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setStatus("error");
        setMessage(data?.error ?? "No pudimos enviar el mensaje. Intenta de nuevo.");
        return;
      }

      setStatus("success");
      setMessage("¡Mensaje enviado! Te contactaremos pronto.");
      setForm(EMPTY);
    } catch {
      setStatus("error");
      setMessage("No pudimos conectar con el servidor. Revisa tu conexión.");
    }
  }

  const loading = status === "loading";

  return (
    <section id="contacto" className="bg-black px-6 py-16 lg:py-24 overflow-hidden">
      <div className="relative mx-auto max-w-[1600px]">

        {/* Título de fondo. Mismo display condensado que el wordmark.
            Medido, no estimado: "CONTACTO" ocupa 273.7px por cada 100px de
            font-size, así que 30vw lo deja en ~82% del viewport. El tope real
            no es el viewport sino la caja de contenido (viewport - 48px de
            px-6), que a 375px es solo el 87% del ancho — por eso 30vw y no
            un valor mayor: es lo que evita que una palabra sin puntos de
            corte se desborde en móvil.
            leading-[0.8] recorta el espacio muerto sobre y bajo las mayúsculas
            para que la tarjeta pueda solaparse sin chocar con las letras. */}
        <h2
          className="font-hero uppercase text-white leading-[0.8] tracking-normal
                     text-[clamp(3rem,30vw,36rem)] select-none"
        >
          Contacto
        </h2>

        {/* Tarjeta: centrada, con tope de 1200px. En móvil/tablet se apila
            debajo del título; a partir de lg sube para solaparlo. */}
        <div
          className="relative z-10 mt-8 mx-auto w-full max-w-[1200px]
                     lg:mt-0 lg:-translate-y-[18%]
                     bg-[#111111] border border-accent rounded-lg
                     p-6 sm:p-8"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent mb-6">
            Contáctanos
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nombre" className={LABEL}>
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  maxLength={100}
                  autoComplete="given-name"
                  className={FIELD}
                  value={form.nombre}
                  onChange={(e) => update("nombre", e.target.value)}
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="apellido" className={LABEL}>
                  Apellido
                </label>
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  required
                  maxLength={100}
                  autoComplete="family-name"
                  className={FIELD}
                  value={form.apellido}
                  onChange={(e) => update("apellido", e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="correo" className={LABEL}>
                Correo electrónico
              </label>
              <input
                id="correo"
                name="correo"
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                className={FIELD}
                value={form.correo}
                onChange={(e) => update("correo", e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="mt-5 flex items-start gap-3">
              <input
                id="permiso"
                name="permiso"
                type="checkbox"
                className="mt-0.5 h-4 w-4 shrink-0 accent-[#FF6B1A]
                           focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-0"
                checked={form.permiso}
                onChange={(e) => update("permiso", e.target.checked)}
                disabled={loading}
              />
              <label
                htmlFor="permiso"
                className="font-mono text-[11px] leading-relaxed text-white/70"
              >
                Doy permiso a Black Label de contactarme a este correo.
              </label>
            </div>

            <div className="mt-5">
              <label htmlFor="mensaje" className={LABEL}>
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                required
                rows={5}
                maxLength={5000}
                placeholder="Escribe tu mensaje aquí"
                className={`${FIELD} resize-y min-h-[120px]`}
                value={form.mensaje}
                onChange={(e) => update("mensaje", e.target.value)}
                disabled={loading}
              />
            </div>

            <p className="mt-4 font-mono text-[10px] leading-relaxed text-white/40">
              Este sitio está protegido y sujeto a nuestra política de
              privacidad.
            </p>

            {/* Texto oscuro sobre naranja: blanco sobre #FF6B1A da 2.85:1
                y no pasa AA; #141414 sobre el mismo naranja da 6.47:1. */}
            <button
              type="submit"
              disabled={loading}
              className="mt-6 inline-flex items-center gap-2 rounded-md
                         bg-accent px-7 py-3.5 min-h-[44px]
                         font-mono text-[11px] uppercase tracking-[0.18em] text-ink
                         hover:opacity-90 transition-opacity
                         disabled:opacity-60 disabled:cursor-not-allowed
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-white
                         focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {loading ? "Enviando..." : "Enviar"}
              {!loading && <span aria-hidden>→</span>}
            </button>

            {/* Un solo contenedor vivo para ambos estados, para que los
                lectores de pantalla anuncien el resultado del envío. */}
            {message && (
              <p
                role={status === "error" ? "alert" : "status"}
                className={`mt-4 font-mono text-[11px] leading-relaxed ${
                  status === "error" ? "text-accent" : "text-white"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
