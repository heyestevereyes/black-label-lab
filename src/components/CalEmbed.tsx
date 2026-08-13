"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

const NAMESPACE = "tengo-un-proyecto-nuevo";
const CAL_LINK = "esteve-reyes-cgtomq/tengo-un-proyecto-nuevo";

export default function CalEmbed() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: NAMESPACE });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    // Mismo negro que ContactSection para que las dos secciones se lean
    // como un solo bloque, sin corte visual entre ellas.
    <section id="agendar" className="bg-black px-6 py-16 lg:py-24">
      {/* text-accent, no text-muted: el gris #6B6B6B sobre negro da 3.94:1 y
          no pasa AA en texto pequeño. El naranja da 7.37:1 y además repite
          el color de la etiqueta "Contáctanos" de la sección anterior. */}
      <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
        Agenda una llamada
      </h2>

      {/* min-height en vez de altura fija: Cal.com cambia de layout según el
          ancho, y con una altura cerrada el calendario quedaría recortado en
          móvil.
          overflow-y-auto (no scroll) para que la barra vertical solo aparezca
          si hace falta; overflow-x-hidden + max-w-full contienen al iframe
          para que no empuje el ancho de la página. */}
      <div
        className="mt-8 min-h-[560px] w-full max-w-full overflow-x-hidden
                   overflow-y-auto lg:min-h-[600px]"
      >
        <Cal
          namespace={NAMESPACE}
          calLink={CAL_LINK}
          style={{ width: "100%", height: "100%", overflow: "auto" }}
          config={{ layout: "month_view", theme: "auto" }}
        />
      </div>
    </section>
  );
}
