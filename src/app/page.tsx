"use client";

import Image from "next/image";
import {
  ArrowUp,
  ArrowUpRight,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Code2,
  Compass,
  Mic,
  Megaphone,
  MessageCircle,
  Menu,
  Newspaper,
  Palette,
  PenTool,
  Search,
  Smartphone,
  Target,
  Terminal,
  Video,
  Wrench,
  X,
} from "lucide-react";
import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { placeholderLogos } from "@/components/PlaceholderLogos";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  clients,
  heroSlides,
  pillars,
  rotatingProof,
  services,
  tickerItems,
} from "@/lib/content";

const serviceIcons = [Code2, PenTool, Search, Mic, Video, Newspaper, Palette, Megaphone, Terminal, Smartphone, BarChart3, Compass];
const pillarIcons = [Target, Wrench, MessageCircle, BarChart3];

const techyLines = [
  { left: 4, top: 8, height: 42, delay: 0, duration: 5200 },
  { left: 11, top: 40, height: 30, delay: 900, duration: 4600 },
  { left: 18, top: 12, height: 55, delay: 1800, duration: 5800 },
  { left: 25, top: 55, height: 24, delay: 400, duration: 4200 },
  { left: 33, top: 5, height: 36, delay: 2400, duration: 5000 },
  { left: 41, top: 30, height: 48, delay: 1200, duration: 6000 },
  { left: 49, top: 15, height: 28, delay: 3000, duration: 4400 },
  { left: 57, top: 48, height: 40, delay: 600, duration: 5400 },
  { left: 65, top: 8, height: 32, delay: 2100, duration: 4800 },
  { left: 72, top: 35, height: 50, delay: 300, duration: 5600 },
  { left: 80, top: 18, height: 26, delay: 1500, duration: 4300 },
  { left: 87, top: 45, height: 38, delay: 2700, duration: 5200 },
  { left: 94, top: 10, height: 44, delay: 900, duration: 5900 },
  { left: 60, top: 60, height: 22, delay: 1900, duration: 4100 },
];

export default function Home() {
  const reducedMotion = useReducedMotion();

  const [menuOpen, setMenuOpen] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [proofPhrase, setProofPhrase] = useState(0);
  const [counter, setCounter] = useState(0);
  const [counterFlicker, setCounterFlicker] = useState(false);
  const [activeClient, setActiveClient] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showWhatsappTip, setShowWhatsappTip] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const pausedRef = useRef(false);
  const portraitInnerRef = useRef<HTMLDivElement>(null);
  const proofRef = useRef<HTMLElement>(null);

  function handlePortraitMove(event: MouseEvent<HTMLDivElement>) {
    if (reducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    const el = portraitInnerRef.current;
    if (el) el.style.transform = `translate3d(${(x * 12).toFixed(1)}px, ${(y * 10).toFixed(1)}px, 0) scale(1.06)`;
  }

  function resetPortraitMove() {
    const el = portraitInnerRef.current;
    if (el) el.style.transform = "translate3d(0, 0, 0) scale(1.06)";
  }

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
    const node = proofRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setShowScrollTop(entry.boundingClientRect.top < 0), { threshold: 0 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const showTimer = window.setTimeout(() => setShowWhatsappTip(true), 2000);
    const hideTimer = window.setTimeout(() => setShowWhatsappTip(false), 8000);
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  function scrollTrackTo(index: number, behavior: ScrollBehavior) {
    const track = trackRef.current;
    const card = cardRefs.current[index];
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior });
  }

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => {
      if (pausedRef.current) return;
      const next = (activeClient + 1) % clients.length;
      scrollTrackTo(next, "smooth");
    }, 4500);
    return () => window.clearInterval(timer);
  }, [activeClient, reducedMotion]);

  function goToClient(index: number) {
    const wrapped = (index + clients.length) % clients.length;
    scrollTrackTo(wrapped, reducedMotion ? "auto" : "smooth");
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
        <div className="section-wrap header-inner">
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
        </div>
      </header>

      <section className="hero section-wrap" id="inicio" aria-roledescription="carousel" aria-label="Servicios destacados">
        <span className="hero-ghost" aria-hidden="true">40</span>
        <div className="hero-copy">
          <p className="kicker"><span className="kicker-dot" /> {slide.eyebrow}</p>
          <h1 key={heroSlide} className="hero-title">
            {slide.titleLines.map((line, index) => (
              <span className="hero-line-mask" key={line}>
                <span
                  className={index === slide.highlight ? "hero-line-inner hero-title-accent" : "hero-line-inner"}
                  style={{ animationDelay: `${index * 110}ms` }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p key={`intro-${heroSlide}`} className="hero-intro hero-copy-enter">{slide.intro}</p>
          <div className="hero-actions hero-actions-enter">
            <a className="button button-dark" href="#contacto">Cantar las 40 <ArrowUpRight size={17} /></a>
            <a className="text-link" href="#proyectos">Ver proyectos <ChevronRight size={16} /></a>
          </div>
        </div>
        <div
          key={`portrait-${heroSlide}`}
          className="hero-portrait"
          onMouseMove={handlePortraitMove}
          onMouseLeave={resetPortraitMove}
        >
          <div className="hero-portrait-inner" ref={portraitInnerRef}>
            <Image src={slide.image} alt={slide.imageAlt} fill priority sizes="(max-width: 900px) 90vw, 48vw" />
          </div>
          <span className="portrait-wipe" aria-hidden="true" />
          <div className="portrait-brand">40<span>CD</span></div>
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
        </div>
      </section>

      <section className="proof-strip" ref={proofRef}>
        <div className="proof-lines" aria-hidden="true">
          {techyLines.map((line, index) => (
            <span
              key={index}
              className="tline"
              style={{
                left: `${line.left}%`,
                top: `${line.top}%`,
                height: `${line.height}%`,
                animationDelay: `${line.delay}ms`,
                animationDuration: `${line.duration}ms`,
              }}
            />
          ))}
        </div>
        <div className="section-wrap proof-inner">
          <span>Una presencia digital</span>
          <strong key={proofPhrase} className="proof-phrase">{rotatingProof[proofPhrase]}</strong>
          <span className={counterFlicker && !reducedMotion ? "proof-mark is-flickering" : "proof-mark"}>{reducedMotion ? 40 : counter}</span>
        </div>
      </section>

      <section className="logos-marquee" aria-label="Marcas que confían en nosotros">
        <div className={reducedMotion ? "logos-track is-paused" : "logos-track"}>
          {[...placeholderLogos, ...placeholderLogos].map((logo, index) => (
            <span className="logo-item" key={`${logo.name}-${index}`} title={logo.name}>
              {logo.mark}
            </span>
          ))}
        </div>
      </section>

      <section className="manifesto" id="nosotros-filosofia">
        <span className="manifesto-ghost" aria-hidden="true">40</span>
        <div className="section-wrap manifesto-inner">
          <div className="manifesto-grid">
            <Reveal as="div"><h2>Si a usted<br />le va bien,<br /><em>a nosotros</em><br />nos va bien</h2></Reveal>
            <Reveal as="div" delay={80} className="manifesto-body">
              <p>En <strong>40 Comunicación Digital</strong> apostamos por el negocio de nuestros clientes. Jugamos a largo plazo con el fin de potenciar los proyectos de quienes confían en nosotros.</p>
              <p>El conocimiento técnico y del negocio lo tiene usted. Nosotros lo ayudamos a desarrollarlo y potenciarlo con las últimas herramientas digitales.</p>
              <a className="circle-link" href="#contacto" aria-label="Conocer más sobre 40 Comunicación Digital"><ArrowUpRight size={21} /></a>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="services section-wrap" id="servicios">
        <Reveal as="div" delay={60} className="services-heading">
          <h2>Todo lo que su marca<br /><em>necesita para avanzar</em></h2>
          <p>Una mirada integral: estrategia, creatividad y tecnología en el mismo equipo.</p>
        </Reveal>
        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];
            return (
              <Reveal as="article" key={service.number} delay={(index % 3) * 70} className="service-card">
                <span className="service-icon"><Icon size={18} /></span>
                <span className="service-number">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="why-section" aria-labelledby="why-heading">
        <span className="why-gradient" aria-hidden="true" />
        <div className="ticker" aria-hidden="true">
          <div className={reducedMotion ? "ticker-track is-paused" : "ticker-track"}>
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <span className="ticker-item" key={`${item}-${index}`}>{item}<span className="ticker-dot" /></span>
            ))}
          </div>
        </div>
        <div className="section-wrap why-inner">
          <Reveal as="div" delay={40} className="why-heading">
            <h2 id="why-heading">Jugamos a largo <em>plazo</em></h2>
          </Reveal>
          <div className="pillars-grid">
            {pillars.map((pillar, index) => {
              const Icon = pillarIcons[index % pillarIcons.length];
              return (
                <Reveal as="article" key={pillar.title} delay={index * 90} className="pillar-card">
                  <div className="pillar-card-top">
                    <span className="pillar-icon"><Icon size={20} /></span>
                    <span className="pillar-index">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                  <ArrowUpRight className="pillar-arrow" size={18} />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="projects" id="proyectos">
        <div className="section-wrap projects-head">
          <Reveal as="div" delay={60}>
            <h2>Trabajo que<br /><em>habla por sí solo</em></h2>
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
            {clients.map((client, index) => {
              const logo = placeholderLogos[index % placeholderLogos.length];
              return (
                <article
                  key={client.name}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="project-card project-card-media"
                >
                  <Image src={client.image} alt="" fill sizes="(max-width: 800px) 82vw, 360px" className="project-card-bg" />
                  <span className="project-card-scrim" aria-hidden="true" />
                  <div className="project-card-top">
                    <span className="project-symbol">{String(index + 1).padStart(2, "0")}</span>
                    <span className="project-logo" aria-hidden="true" title={`${logo.name} (logo provisorio)`}>{logo.mark}</span>
                  </div>
                  {client.featured && <span className="project-badge">Caso insignia</span>}
                  <div className="project-info">
                    <span className="project-tag">{client.tag}</span>
                    <h3>{client.name}</h3>
                    <p>{client.description}</p>
                  </div>
                  <a className="project-link" href={client.url} target="_blank" rel="noreferrer">
                    {client.urlLabel} <ArrowUpRight size={15} />
                  </a>
                </article>
              );
            })}
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

      <section className="about-band" id="nosotros">
        <Reveal as="div" className="about-image">
          <Image src="/imagenes/footer-img.png" alt="Detrás de cada buena idea: el equipo de 40 Comunicación Digital planificando una estrategia" fill sizes="(max-width: 800px) 100vw, 50vw" />
        </Reveal>
        <div className="section-wrap about-copy-wrap">
          <Reveal as="div" delay={80} className="about-copy">
            <h2>Detrás de cada<br /><em>buena idea</em></h2>
            <p>Nicolás Rielo fundó 40CD para hacer algo simple y difícil: entender de verdad qué hace valioso a un negocio, y encontrar la forma más clara de contarlo.</p>
            <a className="text-link" href="#contacto">Conversemos sobre su proyecto <ArrowUpRight size={16} /></a>
          </Reveal>
        </div>
      </section>

      <section className="statement">
        <Image src="/imagenes/statement-city.jpg" alt="" fill sizes="100vw" className="statement-bg-img" />
        <span className="statement-overlay" aria-hidden="true" />
        <span className="statement-ghost" aria-hidden="true">40</span>
        <Reveal className="statement-inner">
          <h2>Es hora de<br /><em>golpear la mesa</em></h2>
          <p>Hoy la batalla es en la web y en las redes. Si usted es bueno en lo que hace, le falta una sola cosa: que lo vean.</p>
          <a className="button button-light" href="#contacto">Cantar las 40 <ArrowUpRight size={17} /></a>
        </Reveal>
      </section>

      <section className="contact-section" id="contacto">
        <div className="section-wrap contact-grid">
          <Reveal as="div">
            <h2>Hablemos<br /><em>de su proyecto</em></h2>
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
        </div>
      </footer>

      <button
        className={showScrollTop ? "scroll-top is-visible" : "scroll-top"}
        aria-label="Volver arriba"
        aria-hidden={!showScrollTop}
        tabIndex={showScrollTop ? 0 : -1}
        onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })}
      >
        <ArrowUp size={18} />
      </button>

      <div className="whatsapp-fab">
        <span className={showWhatsappTip ? "whatsapp-tip is-visible" : "whatsapp-tip"}>¿Hablamos?</span>
        <a
          className="whatsapp-button"
          href="https://wa.link/lridg0"
          target="_blank"
          rel="noreferrer"
          aria-label="Hablar por WhatsApp"
          onMouseEnter={() => setShowWhatsappTip(true)}
        >
          <MessageCircle size={26} fill="currentColor" strokeWidth={0} />
        </a>
      </div>
    </main>
  );
}
