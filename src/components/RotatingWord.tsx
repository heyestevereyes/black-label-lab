"use client";

import { useState, useEffect } from "react";

const WORDS = ["Brands", "Products", "Websites", "Apps", "Tech", "Film"];

export default function RotatingWord({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return <span className={className}>{WORDS[index]}</span>;
}
