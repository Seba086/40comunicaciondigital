const htmlEntities: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => htmlEntities[character]);
}

export function formatContactEmail(contact: {
  nombre: string;
  email: string;
  empresa: string;
  servicio: string;
  mensaje: string;
}) {
  const fields = [
    ["Nombre", contact.nombre],
    ["Email", contact.email],
    ["Empresa o proyecto", contact.empresa || "Sin indicar"],
    ["Servicio", contact.servicio || "Sin indicar"],
  ];
  const message = contact.mensaje || "Sin mensaje";
  const replyUrl = `mailto:${encodeURIComponent(contact.email).replace("%40", "@")}`;
  const details = fields.map(([label, value]) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #ececee">
        <p style="margin:0 0 4px;color:#52525b;font-size:13px">${label}</p>
        <p style="margin:0;color:#18181b;font-size:16px;line-height:1.5;overflow-wrap:anywhere">${escapeHtml(value)}</p>
      </td>
    </tr>`).join("");

  return {
    text: [...fields.map(([label, value]) => `${label}: ${value}`), "", "Mensaje:", message].join("\n"),
    html: `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Nueva consulta web</title>
</head>
<body style="margin:0;background-color:#f4f4f5;color:#18181b;font-family:Arial,sans-serif">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f4f5">
    <tr>
      <td align="center" style="padding:24px 12px">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;border:1px solid #ececee;border-radius:24px;background-color:#ffffff">
          <tr>
            <td style="padding:28px;background-color:#09090b;border-radius:24px 24px 0 0;color:#ffffff;border-bottom:4px solid #ff5a00">
              <p style="margin:0 0 12px;color:#d4d4d8;font-size:13px;font-weight:700">40 Comunicación Digital</p>
              <h1 style="margin:0;font-size:32px;line-height:1.2">Nueva consulta web</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 28px 28px">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">${details}</table>
              <div style="margin:24px 0;padding:16px;border-radius:14px;background-color:#f4f4f5">
                <h2 style="margin:0 0 8px;font-size:16px">Mensaje</h2>
                <p style="margin:0;font-size:16px;line-height:1.6;overflow-wrap:anywhere">${escapeHtml(message).replace(/\r\n?|\n/g, "<br>")}</p>
              </div>
              <a href="${replyUrl}" style="display:inline-block;padding:12px 16px;border-radius:14px;background-color:#09090b;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none">Responder consulta</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  };
}
