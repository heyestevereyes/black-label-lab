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
    <section id="agendar" className="bg-surface px-6 py-16 lg:py-24">
      <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
        Agenda una llamada
      </h2>

      {/* min-height en vez de altura fija: Cal.com cambia de layout según el
          ancho, y con una altura cerrada el calendario quedaría recortado en
          móvil. El overflow-scroll replica el estilo del embed original. */}
      <div className="mt-8 min-h-[560px] w-full overflow-scroll lg:min-h-[600px]">
        <Cal
          namespace={NAMESPACE}
          calLink={CAL_LINK}
          style={{ width: "100%", height: "100%", overflow: "scroll" }}
          config={{ layout: "month_view", theme: "auto" }}
        />
      </div>
    </section>
  );
}
