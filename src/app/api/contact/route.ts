import { NextResponse } from "next/server";
import { Resend } from "resend";
// Destino compartido con el footer: se cambia en un solo sitio.
import { CONTACT_EMAIL } from "@/data/site";

// Remitente y destino son la misma dirección. Resend exige que el dominio
// del remitente esté verificado en la cuenta (resend.com/domains); sin esa
// verificación el envío responde 403 aunque la clave sea válida.
const FROM_EMAIL = CONTACT_EMAIL;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { nombre: 100, apellido: 100, correo: 254, mensaje: 5000 };

/** Evita que el contenido del usuario se interprete como HTML en el correo. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Solicitud invalida." },
      { status: 400 }
    );
  }

  const {
    nombre = "",
    apellido = "",
    correo = "",
    mensaje = "",
    permiso = false,
  } = (body ?? {}) as Record<string, unknown>;

  const fields = { nombre, apellido, correo, mensaje };
  for (const [key, value] of Object.entries(fields)) {
    if (typeof value !== "string" || !value.trim()) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios." },
        { status: 400 }
      );
    }
    if (value.length > MAX[key as keyof typeof MAX]) {
      return NextResponse.json(
        { error: "Uno de los campos excede el largo permitido." },
        { status: 400 }
      );
    }
  }

  const email = String(correo).trim();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "El correo electronico no es valido." },
      { status: 400 }
    );
  }

  if (permiso !== true) {
    return NextResponse.json(
      { error: "Necesitamos tu permiso para contactarte." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No se filtra el detalle al cliente; queda en los logs del servidor.
    console.error("[contact] Falta RESEND_API_KEY en el entorno.");
    return NextResponse.json(
      { error: "El servicio de correo no esta disponible ahora mismo." },
      { status: 503 }
    );
  }

  const fullName = `${String(nombre).trim()} ${String(apellido).trim()}`;

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [CONTACT_EMAIL],
      replyTo: email,
      subject: `Nuevo mensaje de ${fullName}`,
      text: [
        `Nombre: ${fullName}`,
        `Correo: ${email}`,
        "",
        String(mensaje).trim(),
      ].join("\n"),
      html: [
        `<p><strong>Nombre:</strong> ${escapeHtml(fullName)}</p>`,
        `<p><strong>Correo:</strong> ${escapeHtml(email)}</p>`,
        `<p>${escapeHtml(String(mensaje).trim()).replace(/\n/g, "<br />")}</p>`,
      ].join(""),
    });

    if (error) {
      console.error("[contact] Resend devolvio un error:", error);
      return NextResponse.json(
        { error: "No pudimos enviar el mensaje. Intenta de nuevo." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, id: data?.id }, { status: 200 });
  } catch (err) {
    console.error("[contact] Fallo inesperado al enviar:", err);
    return NextResponse.json(
      { error: "No pudimos enviar el mensaje. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
