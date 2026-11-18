import type { ReactNode } from "react";

/**
 * Barra fija inferior, solo por debajo de md, con un botón a todo el ancho:
 * WhatsApp en la landing y Download CV en el portafolio. El layout le
 * reserva su altura con padding inferior para que no tape el footer.
 * env(safe-area-inset-bottom) la separa de la barra de gestos del iPhone.
 */
export default function MobileActionBar({ children }: { children: ReactNode }) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[#141414]/10 bg-[#eeefef]/90
                 px-4 pt-3 backdrop-blur-md [-webkit-backdrop-filter:blur(12px)] md:hidden"
      style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
    >
      {children}
    </div>
  );
}
