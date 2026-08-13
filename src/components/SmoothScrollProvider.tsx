"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Scroll suave global con Lenis.
 *
 * No envuelve el contenido en ningún nodo extra: Lenis actúa sobre el
 * scroll de la ventana, así que el provider solo monta la instancia y
 * devuelve children tal cual, sin alterar el layout.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Respeta a quien pida menos animación por accesibilidad: para esas
    // personas el scroll nativo es lo correcto.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
