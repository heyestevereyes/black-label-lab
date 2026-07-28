"use client";

import { useState, useEffect } from "react";

const WORDS = [
  "Sitios Web",
  "Identidad de Marca",
  "Creación de Contenido",
  "Animación",
];

export default function RotatingWord({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Se normaliza el índice al renderizar: aunque el estado quede fuera de
  // rango (p. ej. al cambiar la lista con Fast Refresh), nunca se pinta vacío.
  const word = WORDS[index % WORDS.length] ?? WORDS[0];

  return <span className={className}>{word}</span>;
}
