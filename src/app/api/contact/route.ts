import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db";

const contactSchema = z.object({ nombre: z.string().trim().min(2).max(120), email: z.string().trim().email().max(180), empresa: z.string().trim().max(180).optional().default(""), servicio: z.string().trim().max(120).optional().default(""), mensaje: z.string().trim().max(3000).optional().default("") });

export async function POST(request: Request) {
  try {
    const contact = contactSchema.parse(await request.json());
    const db = getDb();
    await db.execute("INSERT INTO contact_submissions (name, email, company, service, message) VALUES (?, ?, ?, ?, ?)", [contact.nombre, contact.email, contact.empresa, contact.servicio, contact.mensaje]);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact submission failed", error);
    return NextResponse.json({ ok: false, error: "No se pudo procesar el mensaje." }, { status: 400 });
  }
}