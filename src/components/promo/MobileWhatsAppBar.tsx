import CtaButton from "@/components/promo/CtaButton";

/**
 * Barra fija inferior con WhatsApp, solo por debajo de md. El layout le
 * reserva su altura con padding inferior para que no tape el footer.
 * env(safe-area-inset-bottom) la separa de la barra de gestos del iPhone.
 */
export default function MobileWhatsAppBar({ label }: { label: string }) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[#141414]/10 bg-[#eeefef]/90
                 px-4 pt-3 backdrop-blur-md [-webkit-backdrop-filter:blur(12px)] md:hidden"
      style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
    >
      <CtaButton tipo="whatsapp" seccion="barra_movil" label={label} variant="whatsapp" className="w-full" />
    </div>
  );
}
