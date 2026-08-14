"use client";

import { useEffect, useState } from "react";

/**
 * Nombre de marca y frases: NO se traducen. El array es el mismo en /es
 * y en /en a propósito, por eso vive aquí y no en messages/.
 */
const PHRASES = [
  "Studio",
  "que una marca",
  "Humanos",
  "Disruptivos",
  "que un website",
] as const;

const INTERVAL_MS = 2600;

export default function RotatingPhrase() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const id = setInterval(() => {
      if (reduced.matches) {
        // Sin animación: se cambia la frase de golpe.
        setIndex((i) => (i + 1) % PHRASES.length);
        return;
      }
      // Se desvanece, se cambia el texto oculto y se vuelve a mostrar,
      // para que no se vea el salto entre frases de distinto largo.
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % PHRASES.length);
        setVisible(true);
      }, 320);
    }, INTERVAL_MS);

    return () => clearInterval(id);
  }, []);

  // El índice se normaliza al renderizar: aunque quede fuera de rango
  // (por ejemplo al editar la lista en caliente) nunca se pinta vacío.
  const phrase = PHRASES[index % PHRASES.length] ?? PHRASES[0];

  return (
    <p
      // aria-live off: es decorativo y anunciarlo cada 2.6s sería ruido
      // constante para un lector de pantalla.
      aria-hidden
      className="font-satoshi font-bold text-accent leading-[0.9] tracking-tight
                 text-[clamp(2.5rem,13vw,11rem)] select-none"
    >
      <span
        className={`inline-block transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {phrase}
      </span>
    </p>
  );
}
