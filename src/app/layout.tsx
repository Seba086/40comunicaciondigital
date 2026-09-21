import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "40 Comunicación Digital | Presencia digital que se hace ver",
  description: "Diseño web, contenido, SEO, branding, producción audiovisual y desarrollo de software desde Tandil para Argentina.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body className={`${geist.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}
