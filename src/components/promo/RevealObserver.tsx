"use client";

import { useEffect } from "react";

/**
 * Entrada suave al hacer scroll para todo lo que lleve `data-reveal`.
 * Un solo observador para toda la página, así las secciones siguen siendo
 * componentes de servidor.
 *
 * El estado oculto vive en promo.css, solo dentro de
 * `prefers-reduced-motion: no-preference` y solo con la clase `js` en
 * <html>, que este componente pone. Sin JS o con movimiento reducido todo
 * se ve desde el inicio.
 */
export default function RevealObserver() {
  useEffect(() => {
    document.documentElement.classList.add("js");
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-in", "");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
