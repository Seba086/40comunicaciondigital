type TitleSegment = { text: string; accent?: boolean };

export const heroSlides: {
  eyebrow: string;
  titleLines: TitleSegment[][];
  intro: string;
  image: string;
  imageAlt: string;
}[] = [
  {
    eyebrow: "Agencia de comunicación digital · Tandil, Argentina",
    titleLines: [
      [{ text: "Su negocio" }],
      [{ text: "merece" }],
      [{ text: "ser visto", accent: true }],
    ],
    intro:
      "Si usted es bueno en lo que hace, nosotros lo ayudamos a mostrarlo. Diseñamos y desarrollamos la presencia digital de su negocio.",
    image: "/imagenes/NicoRielo.avif",
    imageAlt: "Nico Rielo, CEO de 40 Comunicación Digital",
  },
  {
    eyebrow: "Servicio 01 · Diseño y desarrollo web",
    titleLines: [
      [{ text: "Su " }, { text: "negocio", accent: true }],
      [{ text: "empieza" }],
      [{ text: "en la " }, { text: "web", accent: true }],
    ],
    intro:
      "Sitios que representan su negocio con la seriedad que merece, desde la arquitectura hasta el código.",
    image: "/imagenes/hero-service-web.avif",
    imageAlt: "Diseño y desarrollo web",
  },
  {
    eyebrow: "Servicio 02 · Contenido estratégico",
    titleLines: [
      [{ text: "Su historia" }],
      [{ text: "tiene algo", accent: true }],
      [{ text: "que decir", accent: true }],
    ],
    intro:
      "Texto, audio y video estratégico para encontrar el mensaje correcto, en el formato correcto.",
    image: "/imagenes/hero-service-content.avif",
    imageAlt: "Contenido estratégico",
  },
  {
    eyebrow: "Servicio 03 · SEO y posicionamiento",
    titleLines: [
      [{ text: "Hacerlo " }, { text: "bien", accent: true }],
      [{ text: "también es" }],
      [{ text: "aparecer", accent: true }],
    ],
    intro:
      "Trabajamos para que quienes lo buscan, y quienes todavía no saben que lo necesitan, lo encuentren primero.",
    image: "/imagenes/hero-service-seo.avif",
    imageAlt: "SEO y posicionamiento",
  },
];

export const rotatingProof = [
  "de principio a fin.",
  "que convierte ideas en impacto.",
  "que hace visible lo valioso.",
  "que acompaña su crecimiento.",
] as const;

export const services = [
  {
    number: "01",
    title: "Diseño y desarrollo web",
    description:
      "Sitios que representan su negocio con la seriedad que merece. Desde la arquitectura de información hasta el código: experiencias digitales que convierten visitantes en clientes.",
  },
  {
    number: "02",
    title: "Contenido estratégico",
    description:
      "Texto, audio y video estratégico para todas las plataformas. Notas, guiones, reels, newsletters y posteos: el mensaje correcto, en el formato correcto, en el lugar correcto.",
  },
  {
    number: "03",
    title: "SEO y posicionamiento",
    description:
      "Google, Instagram, YouTube. Trabajamos para que quienes lo buscan, y quienes todavía no saben que lo necesitan, lo encuentren a usted primero.",
  },
  {
    number: "04",
    title: "Podcasting y YouTube",
    description:
      "Gestión integral de canales: producción, edición, publicación y crecimiento de audiencia. Su voz, con alcance real y comunidad que crece.",
  },
  {
    number: "05",
    title: "Producción audiovisual",
    description:
      "Filmación, edición y postproducción profesional. Corporativo, publicitario o editorial: traducimos su identidad en imágenes que impactan y quedan.",
  },
  {
    number: "06",
    title: "Prensa y comunicación",
    description:
      "Gacetillas, gestión de medios y relaciones institucionales. Lo ponemos en los lugares donde su industria presta atención.",
  },
  {
    number: "07",
    title: "Branding y marketing digital",
    description:
      "Identidad visual, tono de marca, estrategia y gestión de redes. Construimos marcas que se recuerdan y comunidades que convierten.",
  },
  {
    number: "08",
    title: "Campañas ADS",
    description:
      "Meta Ads, Google Ads, YouTube Ads. Cada peso invertido tiene que trabajar. Campañas con objetivo claro y medición real.",
  },
  {
    number: "09",
    title: "Software web",
    description:
      "Plataformas e-learning, e-commerce, intranets y sistemas a medida. La infraestructura digital que su negocio necesita para escalar sin límites.",
  },
  {
    number: "10",
    title: "Aplicaciones mobile",
    description:
      "Apps iOS y Android pensadas desde el usuario. Diseño, desarrollo y lanzamiento: su negocio en el bolsillo de sus clientes.",
  },
  {
    number: "11",
    title: "Analítica y estrategia",
    description:
      "No alcanza con estar: hay que medir. Configuramos dashboards, analizamos datos y tomamos decisiones basadas en resultados reales.",
  },
  {
    number: "12",
    title: "Consultoría digital",
    description:
      "Para quienes necesitan un diagnóstico antes de actuar. Auditamos su presencia digital y trazamos la hoja de ruta más eficiente para crecer.",
  },
] as const;

export const tickerItems = [
  "Diseño Web",
  "SEO & Posicionamiento",
  "Producción Audiovisual",
  "Branding",
  "Campañas ADS",
  "Podcasting",
  "Desarrollo de Software",
  "Apps Mobile",
  "Prensa Digital",
  "Consultoría Digital",
] as const;

export const pillars = [
  {
    title: "Apostamos por su negocio",
    description:
      "No vendemos servicios sueltos. Entendemos su industria, su objetivo y diseñamos la estrategia digital que lo lleva ahí.",
  },
  {
    title: "Conocimiento técnico real",
    description:
      "Cada servicio está respaldado por profesionales especializados. Sin intermediarios ni promesas vacías.",
  },
  {
    title: "Comunicación como responsabilidad",
    description:
      "Lo que se dice, cómo se dice y dónde se dice importa. Tratamos su marca con el cuidado que se merece.",
  },
  {
    title: "Resultados medibles",
    description:
      "Visibilidad, autoridad, conversiones. Cada acción tiene un objetivo claro y métricas para evaluarlo.",
  },
] as const;

export const clients = [
  {
    name: "Facultad de Ciencias Económicas — UNICEN",
    tag: "Prensa · Comunicación institucional",
    url: "https://www.econ.unicen.edu.ar/",
    urlLabel: "econ.unicen.edu.ar",
    description:
      "La Facultad de Ciencias Económicas de la Universidad Nacional del Centro de la Provincia de Buenos Aires es una institución de referencia en Tandil y la región. Para 40CD, generamos el contenido de prensa y comunicación institucional de su blog, traduciendo la actividad universitaria en información clara y relevante.",
    featured: true,
    image: "/imagenes/economicas-bg.avif",
    logo: "/imagenes/carousel/economicas.webp",
  },
  {
    name: "Colegio de Escribanos de la Pcia. de Bs. As. — Delegación Tandil",
    tag: "Comunicación institucional · Redes sociales",
    url: "https://www.colescba.org.ar/portal/",
    urlLabel: "colescba.org.ar",
    description:
      "El organismo que nuclea, regula y representa a los escribanos bonaerenses. 40CD gestiona su comunicación institucional en redes sociales, acercando la actividad notarial a la comunidad con claridad y profesionalismo.",
    featured: false,
    image: "/imagenes/client-colegio-escribanos.avif",
    logo: "/imagenes/carousel/colegio-escribanos.webp",
  },
  {
    name: "Patín Reparage",
    tag: "SEO · Posicionamiento en buscadores",
    url: "https://patinreparage.com/",
    urlLabel: "patinreparage.com",
    description:
      "Taller especializado en reparación profesional de patinetes eléctricos y venta de repuestos, referencia en movilidad urbana en España. 40CD trabaja su posicionamiento SEO para que quienes buscan una solución lo encuentren primero.",
    featured: false,
    image: "/imagenes/client-patin.avif",
    logo: "/imagenes/carousel/patin-reparage.webp",
  },
  {
    name: "Editeca",
    tag: "SEO internacional · Posicionamiento",
    url: "https://editeca.com/",
    urlLabel: "editeca.com",
    description:
      "Plataforma de formación especializada en BIM y transformación digital para arquitectura y construcción, con presencia en más de 20 países. 40CD gestiona su estrategia de posicionamiento SEO a escala internacional.",
    featured: false,
    image: "/imagenes/client-editeca.avif",
    logo: "/imagenes/carousel/editeca.webp",
  },
  {
    name: "Sofise",
    tag: "SEO · Posicionamiento en buscadores",
    url: "https://sofise.es/",
    urlLabel: "sofise.es",
    description:
      "Correduría de seguros especializada en coberturas para arquitectos y el sector de la construcción. 40CD trabaja su posicionamiento SEO para conectar a Sofise con los profesionales que necesitan exactamente lo que ofrecen.",
    featured: false,
    image: "/imagenes/client-sofise.avif",
    logo: "/imagenes/carousel/sofise.webp",
  },
  {
    name: "Calpech",
    tag: "SEO · Posicionamiento en buscadores",
    url: "https://www.calpech.com/",
    urlLabel: "calpech.com",
    description:
      "Soluciones avanzadas para la optimización de biogás, con tecnología orientada a la eliminación de H2S. 40CD acompaña su presencia digital con una estrategia SEO orientada a un mercado de alta especialización.",
    featured: false,
    image: "/imagenes/client-calpech.avif",
    logo: "/imagenes/carousel/calpech.webp",
  },
  {
    name: "Controla Tus Horas",
    tag: "SEO y estrategia",
    url: "https://www.controlatushoras.com/",
    urlLabel: "controlatushoras.com",
    description:
      "Software de control horario para empresas, que permite gestionar el registro de jornada laboral en cumplimiento con la normativa vigente. 40CD trabaja su estrategia SEO frente a empresas que buscan este tipo de solución.",
    featured: false,
    image: "/imagenes/client-controla-horas.avif",
    logo: "/imagenes/carousel/controlatushoras.webp",
  },
  {
    name: "David Casero",
    tag: "YouTube y contenido",
    url: "https://www.youtube.com/@davidcaseroventashighticket",
    urlLabel: "YouTube — David Casero",
    description:
      "Consultor de ventas y creador de contenido especializado en escalar negocios digitales de infoproductores y agencias. 40CD trabaja su posicionamiento en plataformas, la creación de contenido y la edición de sus videos.",
    featured: false,
    image: "/imagenes/client-davidcasero.avif",
    logo: null,
  },
  {
    name: "Alerta Comunidad",
    tag: "Plataforma y contenido",
    url: "https://alertacomunidad.com/",
    urlLabel: "alertacomunidad.com",
    description:
      "Plataforma colaborativa que conecta vecinos para mejorar la seguridad del barrio, con alertas en tiempo real. 40CD acompaña su crecimiento con posicionamiento en plataformas, contenido y edición de videos.",
    featured: false,
    image: "/imagenes/client-alerta-comunidad.avif",
    logo: "/imagenes/carousel/alerta-comunidad.webp",
  },
] as const;
