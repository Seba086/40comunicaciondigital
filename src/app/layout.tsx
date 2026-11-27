import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Diseño web, SEO y marketing digital en Tandil | 40CD",
  description:
    "Agencia de comunicación digital en Tandil: diseño de páginas web, tiendas online, SEO, redes sociales e IA para ventas. Pymes de Argentina y España.",
  keywords: [
    "agencia comunicación digital",
    "diseño web Tandil",
    "SEO",
    "branding",
    "producción audiovisual",
    "podcasting",
    "campañas ADS",
    "desarrollo web",
    "tiendas online",
    "gestión de redes sociales",
    "IA para ventas",
    "apps mobile",
    "Tandil",
    "Buenos Aires",
  ],
  authors: [{ name: "40 Comunicación Digital" }],
  openGraph: {
    title: "40 Comunicación Digital · Diseño web, SEO y contenidos desde Tandil",
    description:
      "Si usted es bueno en lo que hace, nosotros lo ayudamos a mostrarlo. Diseñamos y desarrollamos la presencia digital de su negocio.",
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName: "40 Comunicación Digital",
  },
  twitter: {
    card: "summary_large_image",
    title: "40 Comunicación Digital · Diseño web, SEO y contenidos desde Tandil",
    description:
      "Si usted es bueno en lo que hace, nosotros lo ayudamos a mostrarlo. Diseñamos y desarrollamos la presencia digital de su negocio.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "40 Comunicación Digital",
  description:
    "Agencia de comunicación digital en Tandil especializada en diseño de páginas web, tiendas online, SEO, redes sociales e inteligencia artificial para ventas.",
  telephone: "+5492494673903",
  email: "nicolas.rielo@40comunicaciondigital.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tandil",
    addressRegion: "Buenos Aires",
    addressCountry: "AR",
  },
  url: siteUrl,
  areaServed: [
    { "@type": "Country", name: "Argentina" },
    { "@type": "Country", name: "España" },
  ],
  serviceType: [
    "Diseño de páginas web",
    "Tiendas online",
    "SEO y posicionamiento",
    "Gestión de redes sociales",
    "IA para ventas y CRM",
    "Producción Audiovisual",
    "Software y apps a medida",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={dmSans.variable} suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-EV39VPR2WE" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EV39VPR2WE');
            `,
          }}
        />
        {/* Next's metadata resolver normalizes away the slash on the homepage URL. */}
        <link rel="canonical" href={siteUrl} />
      </head>
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
