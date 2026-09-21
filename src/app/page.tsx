"use client";

import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  clientTones,
  clients,
  heroSlides,
  pillars,
  rotatingProof,
  services,
  tickerItems,
} from "@/lib/content";

export default function Home() {
  const reducedMotion = useReducedMotion();

  const [menuOpen, setMenuOpen] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [proofPhrase, setProofPhrase] = useState(0);
  const [counter, setCounter] = useState(0);
  const [counterFlicker, setCounterFlicker] = useState(false);
  const [activeClient, setActiveClient] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => setHeroSlide((current) => (current + 1) % heroSlides.length), 6000);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
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
  }, [reducedMotion]);

  useEffect(() => {
    const root = trackRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.findIndex((el) => el === entry.target);
            if (index !== -1) setActiveClient(index);
          }
        });
      },
      { root, threshold: 0.6 }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => {
      if (pausedRef.current) return;
      const next = (activeClient + 1) % clients.length;
      cardRefs.current[next]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    }, 4500);
    return () => window.clearInterval(timer);
  }, [activeClient, reducedMotion]);

  function goToClient(index: number) {
    const wrapped = (index + clients.length) % clients.length;
    cardRefs.current[wrapped]?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "start",
    });
  }

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Request failed");
      event.currentTarget.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const slide = heroSlides[heroSlide];

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="40 Comunicación Digital, inicio">
          <Image src="/imagenes/40CD%20Logo%20B%26N-transparente.png" alt="40 Comunicación Digital" width={52} height={52} priority />
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
        <span className="hero-ghost" aria-hidden="true">40</span>
        <div className="hero-progress" role="group" aria-label="Seleccionar slide del hero">
          {heroSlides.map((item, index) => (
            <button
              key={item.eyebrow}
              className={index === heroSlide ? "active" : ""}
              aria-label={`Mostrar ${item.eyebrow}`}
              aria-current={index === heroSlide}
              onClick={() => setHeroSlide(index)}
            >
              <span />
            </button>
          ))}
        </div>
        <div className="hero-copy">
          <p className="kicker"><span className="kicker-dot" /> {slide.eyebrow}</p>
          <h1 key={heroSlide} className="hero-title">
            {slide.titleLines.map((line, index) => (
              <span key={line} className={index === slide.highlight ? "hero-title-accent" : undefined} style={{ animationDelay: `${index * 90}ms` }}>
                {line}
                {index < slide.titleLines.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p key={`intro-${heroSlide}`} className="hero-intro hero-copy-enter">{slide.intro}</p>
          <div className="hero-actions hero-actions-enter">
            <a className="button button-dark" href="#contacto">Cantar las 40 <ArrowUpRight size={17} /></a>
            <a className="text-link" href="#proyectos">Ver proyectos <ChevronRight size={16} /></a>
          </div>
        </div>
        <div key={`portrait-${heroSlide}`} className={`hero-portrait ${slide.image ? "hero-portrait-image" : "hero-portrait-service"}`}>
          {slide.image ? (
            <Image src="/imagenes/NicoRielo.png" alt="Nico Rielo, CEO de 40 Comunicación Digital" fill priority sizes="(max-width: 900px) 90vw, 48vw" />
          ) : (
            <div className="service-hero-art">
              <span>40</span>
              <strong>{slide.eyebrow.split(" · ")[1]}</strong>
              <small>Una mirada integral para que su presencia digital haga su trabajo.</small>
            </div>
          )}
          <div className="portrait-note"><span>0{heroSlide + 1}</span><strong>{slide.label}<br />{slide.note}</strong></div>
          <div className="portrait-brand">40<span>CD</span></div>
        </div>
      </section>

      <section className="proof-strip">
        <div className="section-wrap proof-inner">
          <span>Una presencia digital</span>
          <strong key={proofPhrase} className="proof-phrase">{rotatingProof[proofPhrase]}</strong>
          <span className={counterFlicker && !reducedMotion ? "proof-mark is-flickering" : "proof-mark"}>{reducedMotion ? 40 : counter}</span>
        </div>
      </section>

      <section className="section-wrap manifesto" id="nosotros-filosofia">
        <Reveal className="section-topline"><span>01</span><span>La filosofía</span></Reveal>
        <div className="manifesto-grid">
          <Reveal as="div"><h2>Si a usted<br />le va bien,<br /><em>a nosotros</em><br />nos va bien.</h2></Reveal>
          <Reveal as="div" delay={80} className="manifesto-body">
            <p>En <strong>40 Comunicación Digital</strong> apostamos por el negocio de nuestros clientes. Jugamos a largo plazo con el fin de potenciar los proyectos de quienes confían en nosotros.</p>
            <p>El conocimiento técnico y del negocio lo tiene usted. Nosotros lo ayudamos a desarrollarlo y potenciarlo con las últimas herramientas digitales.</p>
            <a className="circle-link" href="#contacto" aria-label="Conocer más sobre 40 Comunicación Digital"><ArrowUpRight size={21} /></a>
          </Reveal>
        </div>
      </section>

      <section className="services section-wrap" id="servicios">
        <Reveal className="section-topline"><span>02</span><span>Lo que hacemos</span></Reveal>
        <Reveal as="div" delay={60} className="services-heading">
          <h2>Todo lo que su marca<br /><em>necesita para avanzar.</em></h2>
          <p>Una mirada integral: estrategia, creatividad y tecnología en el mismo equipo.</p>
        </Reveal>
        <div className="services-grid">
          {services.map((service, index) => (
            <Reveal as="article" key={service.number} delay={(index % 3) * 70} className="service-card">
              <span className="service-number">{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ArrowUpRight className="service-arrow" size={18} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="why-section" aria-labelledby="why-heading">
        <div className="ticker" aria-hidden="true">
          <div className={reducedMotion ? "ticker-track is-paused" : "ticker-track"}>
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <span className="ticker-item" key={`${item}-${index}`}>{item}<span className="ticker-dot" /></span>
            ))}
          </div>
        </div>
        <div className="section-wrap why-inner">
          <Reveal className="section-topline on-dark"><span>03</span><span>Por qué 40CD</span></Reveal>
          <div className="why-grid">
            <Reveal as="div"><h2 id="why-heading">Jugamos<br />a largo<br /><em>plazo.</em></h2></Reveal>
            <ul className="pillars">
              {pillars.map((pillar, index) => (
                <Reveal as="li" key={pillar.title} delay={index * 80} className="pillar">
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="projects" id="proyectos">
        <div className="section-wrap projects-head">
          <Reveal className="section-topline"><span>04</span><span>Proyectos en los que apostamos</span></Reveal>
          <Reveal as="div" delay={60}>
            <h2>Trabajo que<br /><em>habla por sí solo.</em></h2>
            <p>Marcas, instituciones y productos digitales reales que acompañamos en el camino.</p>
          </Reveal>
        </div>
        <div className="project-window">
          <div
            className="project-track"
            ref={trackRef}
            onMouseEnter={() => (pausedRef.current = true)}
            onMouseLeave={() => (pausedRef.current = false)}
            onFocus={() => (pausedRef.current = true)}
            onBlur={() => (pausedRef.current = false)}
            onTouchStart={() => (pausedRef.current = true)}
            onTouchEnd={() => (pausedRef.current = false)}
          >
            {clients.map((client, index) => (
              <article
                key={client.name}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`project-card tone-${clientTones[index % clientTones.length]}`}
              >
                <div className="project-card-top">
                  <span className="project-symbol">{String(index + 1).padStart(2, "0")}</span>
                  {client.featured && <span className="project-badge">Caso insignia</span>}
                </div>
                <div className="project-info">
                  <span className="project-tag">{client.tag}</span>
                  <h3>{client.name}</h3>
                  <p>{client.description}</p>
                </div>
                <a className="project-link" href={client.url} target="_blank" rel="noreferrer">
                  {client.urlLabel} <ArrowUpRight size={15} />
                </a>
              </article>
            ))}
          </div>
        </div>
        <div className="project-controls section-wrap">
          <div className="project-dots">
            {clients.map((client, index) => (
              <button
                key={client.name}
                className={index === activeClient ? "active" : ""}
                aria-label={`Ver ${client.name}`}
                onClick={() => goToClient(index)}
              />
            ))}
          </div>
          <div className="project-arrows">
            <button aria-label="Proyecto anterior" onClick={() => goToClient(activeClient - 1)}><ChevronLeft size={16} /></button>
            <button aria-label="Proyecto siguiente" onClick={() => goToClient(activeClient + 1)}><ChevronRight size={16} /></button>
          </div>
        </div>
      </section>

      <section className="section-wrap about-band" id="nosotros">
        <Reveal as="div" className="about-image">
          <Image src="/imagenes/Nico_perfil.png" alt="Nicolás Rielo" fill sizes="(max-width: 800px) 90vw, 40vw" />
        </Reveal>
        <Reveal as="div" delay={80} className="about-copy">
          <div className="section-topline"><span>05</span><span>Quiénes somos</span></div>
          <h2>Detrás de cada<br /><em>buena idea.</em></h2>
          <p>Nicolás Rielo fundó 40CD para hacer algo simple y difícil: entender de verdad qué hace valioso a un negocio, y encontrar la forma más clara de contarlo.</p>
          <a className="text-link" href="#contacto">Conversemos sobre su proyecto <ArrowUpRight size={16} /></a>
        </Reveal>
      </section>

      <section className="statement">
        <span className="statement-ghost" aria-hidden="true">40</span>
        <Reveal className="statement-inner">
          <h2>Es hora de<br /><em>golpear la mesa.</em></h2>
          <p>Hoy la batalla es en la web y en las redes. Si usted es bueno en lo que hace, le falta una sola cosa: que lo vean.</p>
          <a className="button button-light" href="#contacto">Cantar las 40 <ArrowUpRight size={17} /></a>
        </Reveal>
      </section>

      <section className="contact-section" id="contacto">
        <div className="section-wrap contact-grid">
          <Reveal as="div">
            <div className="section-topline"><span>06</span><span>Contacto</span></div>
            <h2>Hablemos<br /><em>de su proyecto.</em></h2>
            <p>Cuéntenos su proyecto. Sin compromiso, sin vueltas. Si podemos ayudarlo a crecer, lo vamos a decir con claridad.</p>
            <div className="contact-details">
              <a href="mailto:nicolas.rielo@40comunicaciondigital.com">nicolas.rielo@40comunicaciondigital.com</a>
              <a href="https://wa.me/5492494673903" target="_blank" rel="noreferrer">+54 9 249 467-3903</a>
              <span>Tandil · Buenos Aires · Argentina</span>
            </div>
          </Reveal>
          <Reveal as="div" delay={100}>
            <form className="contact-form" onSubmit={submitContact}>
              <div className="form-row">
                <label>Nombre<input name="nombre" required placeholder="Su nombre" /></label>
                <label>Email<input name="email" type="email" required placeholder="su@email.com" /></label>
              </div>
              <label>Empresa o proyecto<input name="empresa" placeholder="¿En qué está trabajando?" /></label>
              <label>
                ¿Qué necesita?
                <select name="servicio" defaultValue="">
                  <option value="" disabled>Seleccione una opción</option>
                  {services.map((service) => (
                    <option key={service.number}>{service.title}</option>
                  ))}
                  <option>Más de uno / No sé por dónde empezar</option>
                </select>
              </label>
              <label>Mensaje<textarea name="mensaje" placeholder="Cuéntenos brevemente su proyecto..." rows={4} /></label>
              <button className="button button-dark form-submit" disabled={status === "loading"}>
                {status === "loading" ? "Enviando..." : "Enviar mensaje"} <ArrowUpRight size={17} />
              </button>
              {status === "success" && <p className="form-message success">Mensaje recibido. Nos ponemos en contacto pronto.</p>}
              {status === "error" && <p className="form-message error">No pudimos enviar el mensaje. Escríbanos por WhatsApp.</p>}
            </form>
          </Reveal>
        </div>
      </section>

      <footer className="footer">
        <div className="section-wrap footer-inner">
          <Image src="/imagenes/40CD%20Logo%20W-transparente.png" alt="40 Comunicación Digital" width={56} height={56} />
          <div>
            <p>© 2026 40 Comunicación Digital</p>
            <p>Diseñamos presencia. Construimos futuro.</p>
          </div>
          <a href="#inicio" aria-label="Volver al inicio"><ArrowUpRight size={18} /></a>
        </div>
      </footer>
    </main>
  );
}
