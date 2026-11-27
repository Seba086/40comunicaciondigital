import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { formatContactEmail } from "@/lib/contact-email";
import { getDb } from "@/lib/db";

const contactSchema = z.object({ nombre: z.string().trim().min(2).max(120), email: z.string().trim().email().max(180), empresa: z.string().trim().max(180).optional().default(""), servicio: z.string().trim().max(120).optional().default(""), mensaje: z.string().trim().max(3000).optional().default("") });

const contactInbox = "nicolas.rielo@40comunicaciondigital.com";
const contactCopy = "nfseba@gmail.com";

async function notifyContact(contact: z.infer<typeof contactSchema>) {
  const password = process.env.CONTACT_SMTP_PASSWORD;
  if (!password) {
    console.warn("Contact saved; email notification is not configured");
    return;
  }

  const mail = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: contactInbox, pass: password.replace(/\s/g, "") },
    connectionTimeout: 5000,
    greetingTimeout: 5000,
    socketTimeout: 10000,
  });

  const result = await mail.sendMail({
    from: { name: "40 Comunicación Digital", address: contactInbox },
    to: contactInbox,
    cc: contactCopy,
    replyTo: contact.email,
    subject: "Nueva consulta desde el sitio de 40 Comunicación Digital",
    textEncoding: "base64",
    ...formatContactEmail(contact),
  });
  if (result.rejected.length) {
    console.error("Contact saved; SMTP rejected a notification recipient");
  }
}

export async function POST(request: Request) {
  try {
    const contact = contactSchema.parse(await request.json());
    const db = getDb();
    await db.execute("INSERT INTO contact_submissions (name, email, company, service, message) VALUES (?, ?, ?, ?, ?)", [contact.nombre, contact.email, contact.empresa, contact.servicio, contact.mensaje]);
    try {
      await notifyContact(contact);
    } catch (error) {
      const code = error instanceof Error && "code" in error ? error.code : undefined;
      console.error("Contact saved; email notification failed", code);
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact submission failed", error);
    return NextResponse.json({ ok: false, error: "No se pudo procesar el mensaje." }, { status: 400 });
  }
}
