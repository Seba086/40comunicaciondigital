import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

const siteUrl = "https://40comunicaciondigital.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "40 Comunicación Digital | Presencia digital que se hace ver",
  description:
    "40 Comunicación Digital: diseño web, contenido, SEO, branding, producción audiovisual, podcasting, campañas ADS y desarrollo de software. Construimos su presencia digital en Tandil y Argentina.",
  keywords: [
    "agencia comunicación digital",
    "diseño web Tandil",
    "SEO",
    "branding",
    "producción audiovisual",
    "podcasting",
    "campañas ADS",
    "desarrollo web",
    "apps mobile",
    "Tandil",
    "Buenos Aires",
  ],
  authors: [{ name: "40 Comunicación Digital" }],
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "40 Comunicación Digital",
    description:
      "Si usted es bueno en lo que hace, nosotros lo ayudamos a mostrarlo. Diseñamos y desarrollamos la presencia digital de su negocio.",
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName: "40 Comunicación Digital",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "40 Comunicación Digital",
  description:
    "Agencia de comunicación digital especializada en diseño web, SEO, branding, producción audiovisual, podcasting, campañas ADS y desarrollo de software.",
  telephone: "+5492494673903",
  email: "nicolas.rielo@40comunicaciondigital.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tandil",
    addressRegion: "Buenos Aires",
    addressCountry: "AR",
  },
  url: siteUrl,
  serviceType: [
    "Diseño Web",
    "SEO",
    "Branding",
    "Producción Audiovisual",
    "Campañas ADS",
    "Desarrollo de Software",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={dmSans.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
