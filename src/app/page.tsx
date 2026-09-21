"use client";

import Image from "next/image";
import { ArrowUpRight, ChevronRight, Menu, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

const services = [
  ["01", "Diseño y desarrollo web", "Sitios que representan su negocio con la seriedad que merece."],
  ["02", "Contenido estratégico", "Texto, audio y video para el mensaje correcto, en el lugar correcto."],
  ["03", "SEO y posicionamiento", "Trabajamos para que quienes lo buscan lo encuentren a usted primero."],
  ["04", "Podcasting y YouTube", "Producción, edición y crecimiento de audiencia para su voz."],
  ["05", "Producción audiovisual", "Filmación, edición y postproducción que traducen su identidad."],
  ["06", "Prensa y comunicación", "Gacetillas, medios y relaciones institucionales con propósito."],
  ["07", "Branding y marketing", "Identidad visual, tono de marca y comunidades que convierten."],
  ["08", "Campañas ADS", "Cada peso invertido tiene un objetivo claro y medición real."],
  ["09", "Software web", "Plataformas, e-commerce y sistemas a medida para escalar."],
  ["10", "Aplicaciones mobile", "Diseño y desarrollo de apps pensadas desde el usuario."],
  ["11", "Analítica y estrategia", "Dashboards, datos y decisiones basadas en resultados reales."],
  ["12", "Consultoría digital", "Un diagnóstico y una hoja de ruta eficiente para crecer."],
];

const projects = [
  { name: "Facultad de Ciencias Económicas", tag: "Prensa e institucional", detail: "UNICEN · Tandil", tone: "project-dark" },
  { name: "Patín Reparage", tag: "SEO y posicionamiento", detail: "Movilidad urbana · España", tone: "project-orange" },
  { name: "Editeca", tag: "SEO internacional", detail: "Formación BIM · 20 países", tone: "project-light" },
  { name: "David Casero", tag: "YouTube y contenido", detail: "Ventas high ticket", tone: "project-ink" },
  { name: "Alerta Comunidad", tag: "Plataforma y contenido", detail: "Seguridad colaborativa", tone: "project-paper" },
  { name: "Controla Tus Horas", tag: "SEO y estrategia", detail: "Software de control horario", tone: "project-dark" },
];

const heroSlides = [
  { eyebrow: "Agencia de comunicación digital · Tandil, Argentina", title: <>Su negocio<br /><span>merece</span><br />ser visto.</>, intro: "Si usted es bueno en lo que hace, nosotros lo ayudamos a mostrarlo. Diseñamos y desarrollamos la presencia digital de su negocio.", label: "La estrategia", note: "empieza por escuchar.", image: true },
  { eyebrow: "Servicio 01 · Diseño y desarrollo web", title: <>Su negocio<br /><span>empieza</span><br />en la web.</>, intro: "Sitios que representan su negocio con la seriedad que merece, desde la arquitectura hasta el código.", label: "Diseño que", note: "trabaja para usted.", image: false },
  { eyebrow: "Servicio 02 · Contenido estratégico", title: <>Su historia<br /><span>tiene</span><br />algo que decir.</>, intro: "Texto, audio y video estratégico para encontrar el mensaje correcto, en el formato correcto.", label: "Contenido con", note: "algo para decir.", image: false },
  { eyebrow: "Servicio 03 · SEO y posicionamiento", title: <>Hacerlo bien<br /><span>también es</span><br />aparecer.</>, intro: "Trabajamos para que quienes lo buscan, y quienes todavía no saben que lo necesitan, lo encuentren primero.", label: "Que lo bueno", note: "se encuentre.", image: false },
];

const rotatingProof = ["de principio a fin.", "que convierte ideas en impacto.", "que hace visible lo valioso.", "que acompaña su crecimiento."];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [slide, setSlide] = useState(0);
  const [proofPhrase, setProofPhrase] = useState(0);
  const [counter, setCounter] = useState(0);
  const [counterFlicker, setCounterFlicker] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % projects.length), 3200);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setHeroSlide((current) => (current + 1) % heroSlides.length), 6000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const phraseTimer = window.setInterval(() => setProofPhrase((current) => (current + 1) % rotatingProof.length), 3000);
    let current = 0;
    const countTimer = window.setInterval(() => {
      current = Math.min(40, current + 2);
      setCounter(current);
      if (current === 40) {
        window.clearInterval(countTimer);
        setCounterFlicker(true);
      }
    }, 55);
    return () => {
      window.clearInterval(phraseTimer);
      window.clearInterval(countTimer);
    };
  }, []);

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error("Request failed");
      event.currentTarget.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="40 Comunicación Digital, inicio">
          <Image src="/imagenes/40CD%20Logo%20B%26N-transparente.png" alt="40 Comunicación Digital" width={58} height={58} priority />
        </a>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Navegación principal">
          <a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a>
          <a href="#proyectos" onClick={() => setMenuOpen(false)}>Proyectos</a>
          <a href="#nosotros" onClick={() => setMenuOpen(false)}>Nosotros</a>
          <a className="nav-cta" href="#contacto" onClick={() => setMenuOpen(false)}>Hablemos <ArrowUpRight size={15} /></a>
        </nav>
        <button className="menu-toggle" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <section className="hero section-wrap" id="inicio" aria-roledescription="carousel" aria-label="Servicios destacados">
        <div className="hero-progress" aria-label="Seleccionar slide del hero">{heroSlides.map((item, index) => <button key={item.eyebrow} className={index === heroSlide ? "active" : ""} aria-label={`Mostrar ${item.eyebrow}`} aria-current={index === heroSlide} onClick={() => setHeroSlide(index)}><span /></button>)}</div>
        <div className="hero-copy">
          <p className="kicker"><span className="kicker-dot" /> {heroSlides[heroSlide].eyebrow}</p>
          <h1 key={heroSlide} className="hero-title">{heroSlides[heroSlide].title}</h1>
          <p key={`intro-${heroSlide}`} className="hero-intro hero-copy-enter">{heroSlides[heroSlide].intro}</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#contacto">Cantar las 40 <ArrowUpRight size={17} /></a>
            <a className="text-link" href="#proyectos">Ver proyectos <ChevronRight size={16} /></a>
          </div>
        </div>
        <div className={`hero-portrait ${heroSlides[heroSlide].image ? "hero-portrait-image" : "hero-portrait-service"}`}>
          {heroSlides[heroSlide].image ? <Image src="/imagenes/NicoRielo.png" alt="Nico Rielo, CEO de 40 Comunicación Digital" fill priority sizes="(max-width: 900px) 90vw, 48vw" /> : <div className="service-hero-art"><span>40</span><strong>{heroSlides[heroSlide].eyebrow.split(" · ")[1]}</strong><small>Una mirada integral para que su presencia digital haga su trabajo.</small></div>}
          <div className="portrait-note"><span>0{heroSlide + 1}</span><strong>{heroSlides[heroSlide].label}<br />{heroSlides[heroSlide].note}</strong></div>
          <div className="portrait-brand">40<span>CD</span></div>
        </div>
      </section>

      <section className="proof-strip"><div className="section-wrap proof-inner"><span>Una presencia digital</span><strong key={proofPhrase} className="proof-phrase">{rotatingProof[proofPhrase]}</strong><span className={counterFlicker ? "proof-mark is-flickering" : "proof-mark"}>{counter}</span></div></section>

      <section className="section-wrap manifesto" id="nosotros">
        <div className="section-topline"><span>01</span><span>La filosofía</span></div>
        <div className="manifesto-grid">
          <h2>Si a usted<br />le va bien,<br /><em>a nosotros</em><br />nos va bien.</h2>
          <div className="manifesto-body">
            <p>En <strong>40 Comunicación Digital</strong> apostamos por el negocio de nuestros clientes. Jugamos a largo plazo con el fin de potenciar los proyectos de quienes confían en nosotros.</p>
            <p>El conocimiento técnico y del negocio lo tiene usted. Nosotros lo ayudamos a desarrollarlo y potenciarlo con las últimas herramientas digitales.</p>
            <a className="circle-link" href="#contacto" aria-label="Conocer más sobre 40 Comunicación Digital"><ArrowUpRight size={21} /></a>
          </div>
        </div>
      </section>

      <section className="services section-wrap" id="servicios">
        <div className="section-topline"><span>02</span><span>Lo que hacemos</span></div>
        <div className="services-heading"><h2>Todo lo que su marca<br /><em>necesita para avanzar.</em></h2><p>Una mirada integral: estrategia, creatividad y tecnología en el mismo equipo.</p></div>
        <div className="services-grid">{services.map(([number, title, description]) => <article className="service-card" key={number}><span className="service-number">{number}</span><h3>{title}</h3><p>{description}</p><ArrowUpRight className="service-arrow" size={18} /></article>)}</div>
      </section>

      <section className="projects" id="proyectos">
        <div className="section-wrap projects-head"><div className="section-topline"><span>03</span><span>Proyectos en los que apostamos</span></div><h2>Trabajo que<br /><em>habla por sí solo.</em></h2><p>Una selección de marcas, instituciones y productos digitales que acompañamos en el camino.</p></div>
        <div className="project-window"><div className="project-track" style={{ transform: `translateX(calc(-${slide} * (min(78vw, 520px) + 16px)))` }}>{projects.concat(projects).map((project, index) => <article className={`project-card ${project.tone}`} key={`${project.name}-${index}`}><div className="project-symbol">{String(index % projects.length + 1).padStart(2, "0")}</div><div className="project-info"><span>{project.tag}</span><h3>{project.name}</h3><p>{project.detail}</p></div><ArrowUpRight size={20} /></article>)}</div></div>
        <div className="project-controls section-wrap"><div className="project-dots">{projects.map((project, index) => <button key={project.name} className={index === slide ? "active" : ""} aria-label={`Ver proyecto ${index + 1}`} onClick={() => setSlide(index)} />)}</div><span>Deslice para explorar <ChevronRight size={16} /></span></div>
      </section>

      <section className="section-wrap about-band"><div className="about-image"><Image src="/imagenes/Nico_perfil.png" alt="Nicolás Rielo" fill sizes="(max-width: 800px) 90vw, 40vw" /></div><div className="about-copy"><div className="section-topline"><span>04</span><span>Quiénes somos</span></div><h2>Detrás de cada<br /><em>buena idea.</em></h2><p>Nicolás Rielo fundó 40CD para hacer algo simple y difícil: entender de verdad qué hace valioso a un negocio, y encontrar la forma más clara de contarlo.</p><a className="text-link" href="#contacto">Conversemos sobre su proyecto <ArrowUpRight size={16} /></a></div></section>

      <section className="contact-section" id="contacto"><div className="section-wrap contact-grid"><div><div className="section-topline"><span>05</span><span>Contacto</span></div><h2>Es hora de<br /><em>golpear la mesa.</em></h2><p>Cuéntenos su proyecto. Sin compromiso, sin vueltas. Si podemos ayudarlo a crecer, lo vamos a decir con claridad.</p><div className="contact-details"><a href="mailto:nicolas.rielo@40comunicaciondigital.com">nicolas.rielo@40comunicaciondigital.com</a><a href="https://wa.me/5492494673903" target="_blank" rel="noreferrer">+54 9 249 467-3903</a><span>Tandil · Buenos Aires · Argentina</span></div></div><form className="contact-form" onSubmit={submitContact}><div className="form-row"><label>Nombre<input name="nombre" required placeholder="Su nombre" /></label><label>Email<input name="email" type="email" required placeholder="su@email.com" /></label></div><label>Empresa o proyecto<input name="empresa" placeholder="¿En qué está trabajando?" /></label><label>¿Qué necesita?<select name="servicio" defaultValue=""><option value="" disabled>Seleccione una opción</option>{services.map(([, title]) => <option key={title}>{title}</option>)}<option>Más de uno / No sé por dónde empezar</option></select></label><label>Mensaje<textarea name="mensaje" placeholder="Cuéntenos brevemente su proyecto..." rows={4} /></label><button className="button button-dark form-submit" disabled={status === "loading"}>{status === "loading" ? "Enviando..." : "Enviar mensaje"} <ArrowUpRight size={17} /></button>{status === "success" && <p className="form-message success">Mensaje recibido. Nos ponemos en contacto pronto.</p>}{status === "error" && <p className="form-message error">No pudimos enviar el mensaje. Escríbanos por WhatsApp.</p>}</form></div></section>

      <footer className="footer section-wrap"><Image src="/imagenes/40CD%20Logo%20W-transparente.png" alt="40 Comunicación Digital" width={64} height={64} /><div><p>© 2026 40 Comunicación Digital</p><p>Diseñamos presencia. Construimos futuro.</p></div><a href="#inicio" aria-label="Volver al inicio"><ArrowUpRight size={18} /></a></footer>
    </main>
  );
}
