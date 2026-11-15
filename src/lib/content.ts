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
      "Si usted es bueno en lo que hace, nosotros lo ayudamos a mostrarlo. Diseñamos su página web, lo posicionamos en Google y gestionamos sus redes, para pymes e instituciones de Argentina y España.",
    image: "/imagenes/hero-dashboard.webp",
    imageAlt: "Monitor con paneles de analítica digital en una oficina",
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
    title: "Diseño de páginas web",
    description:
      "Diseño web profesional para empresas e instituciones. Desde la arquitectura de la información hasta el código: sitios rápidos, claros y pensados para convertir visitas en consultas.",
  },
  {
    number: "02",
    title: "Tiendas online",
    description:
      "Creamos su tienda online a medida, con Mercado Pago, envíos y catálogo fácil de administrar. Ideal para quienes ya probaron una plataforma genérica y necesitan crecer.",
  },
  {
    number: "03",
    title: "SEO y posicionamiento",
    description:
      "Posicionamiento SEO en Google y en las respuestas de la inteligencia artificial (ChatGPT, Gemini). Auditoría, SEO técnico, contenidos y SEO local para que lo encuentren quienes ya lo están buscando.",
  },
  {
    number: "04",
    title: "Gestión de redes sociales",
    description:
      "Gestión de redes con estrategia: planificación, diseño, redacción y publicación. Instagram, Facebook y LinkedIn trabajando para su negocio, con métricas claras cada mes.",
  },
  {
    number: "05",
    title: "IA para ventas y CRM",
    description:
      "Ordenamos su proceso comercial con un CRM y sumamos inteligencia artificial donde de verdad ahorra tiempo: chatbots de WhatsApp, respuestas automáticas y seguimiento de clientes. Empezamos por lo que su negocio puede medir.",
  },
  {
    number: "06",
    title: "Contenido y prensa",
    description:
      "Notas, guiones, newsletters, gacetillas y gestión de medios. El mensaje correcto, en el formato correcto y en los lugares donde su industria presta atención.",
  },
  {
    number: "07",
    title: "Producción audiovisual",
    description:
      "Filmación, edición y postproducción. Videos corporativos, publicitarios e institucionales que traducen su identidad en imágenes.",
  },
  {
    number: "08",
    title: "Podcast y YouTube",
    description:
      "Producción de podcast para empresas y gestión integral de canales: grabación, edición, publicación y crecimiento de audiencia.",
  },
  {
    number: "09",
    title: "Branding e identidad",
    description:
      "Identidad visual y tono de marca para que su negocio se reconozca y se recuerde en cada punto de contacto.",
  },
  {
    number: "10",
    title: "Campañas Ads",
    description:
      "Meta Ads, Google Ads y YouTube Ads con objetivo claro y medición real. Cada peso invertido tiene que trabajar.",
  },
  {
    number: "11",
    title: "Software y apps a medida",
    description:
      "Plataformas e-learning, intranets, sistemas y apps iOS/Android. La infraestructura digital que su negocio necesita para escalar.",
  },
  {
    number: "12",
    title: "Consultoría y analítica",
    description:
      "Auditamos su presencia digital, configuramos tableros de medición y trazamos la hoja de ruta más eficiente para crecer.",
  },
] as const;

export const tickerItems = [
  "Diseño de páginas web",
  "Tiendas online",
  "SEO & Posicionamiento",
  "Gestión de redes sociales",
  "IA para ventas y CRM",
  "Producción Audiovisual",
  "Branding",
  "Campañas ADS",
  "Podcasting",
  "Software y apps a medida",
  "Contenido y prensa",
  "Consultoría y analítica",
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
      "Cada servicio lo trabaja un especialista de nuestro equipo, sin intermediarios ni promesas vacías.",
  },
  {
    title: "Comunicación como responsabilidad",
    description:
      "Lo que se dice, cómo se dice y dónde se dice importa. Tratamos su marca con el cuidado que se merece.",
  },
  {
    title: "Resultados medibles",
    description:
      "Visibilidad, consultas y ventas. Cada acción tiene un objetivo claro y un informe mensual para evaluarlo.",
  },
] as const;

export const clients = [
  {
    name: "Facultad de Ciencias Económicas — UNICEN",
    tag: "Prensa · Comunicación institucional",
    url: "https://www.econ.unicen.edu.ar/",
    urlLabel: "econ.unicen.edu.ar",
    description:
      "Económicas UNICEN es una institución de referencia en Tandil y la región. Producimos los contenidos de prensa y comunicación institucional de su blog, y traducimos la actividad universitaria en información clara y relevante.",
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
      "El organismo que nuclea, regula y representa a los escribanos bonaerenses. Gestionamos su comunicación institucional en redes sociales y acercamos la actividad notarial a la comunidad con claridad y profesionalismo.",
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
      "Taller de reparación de patinetes eléctricos y venta de repuestos en Madrid, España. Trabajamos su posicionamiento SEO para que quienes buscan una solución lo encuentren primero.",
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
      "Plataforma de formación especializada en BIM y transformación digital para arquitectura y construcción, con presencia en más de 20 países. Gestionamos su estrategia de posicionamiento SEO a escala internacional.",
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
      "Correduría de seguros especializada en coberturas para arquitectos y el sector de la construcción. Trabajamos su posicionamiento SEO para conectarla con los profesionales que necesitan exactamente lo que ofrece.",
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
      "Soluciones avanzadas para la optimización de biogás, con tecnología orientada a la eliminación de H2S. Acompañamos su presencia digital con una estrategia SEO orientada a un mercado de alta especialización.",
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
      "Software de control horario para empresas, que permite gestionar el registro de jornada laboral en cumplimiento con la normativa vigente. Trabajamos su estrategia SEO frente a empresas que buscan este tipo de solución.",
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
      "Consultor de ventas y creador de contenido especializado en escalar negocios digitales de infoproductores y agencias. Trabajamos su posicionamiento en plataformas, la creación de contenido y la edición de sus videos.",
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
      "Plataforma colaborativa que conecta vecinos para mejorar la seguridad del barrio, con alertas en tiempo real. Acompañamos su crecimiento con posicionamiento en plataformas, contenido y edición de videos.",
    featured: false,
    image: "/imagenes/client-alerta-comunidad.avif",
    logo: "/imagenes/carousel/alerta-comunidad.webp",
  },
] as const;
