"use client";

import Image from "next/image";
import {
  ArrowUp,
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  Mic,
  Megaphone,
  MessageCircle,
  Menu,
  Newspaper,
  Palette,
  Search,
  SendHorizontal,
  Smartphone,
  Target,
  Terminal,
  Video,
  Wrench,
  X,
} from "lucide-react";
import { FormEvent, MouseEvent, PointerEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";
import { placeholderLogos } from "@/components/PlaceholderLogos";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { isContactFieldValid, type ContactFieldName } from "@/lib/contact-schema";
import {
  clients,
  heroSlides,
  pillars,
  rotatingProof,
  services,
  tickerItems,
} from "@/lib/content";

const serviceIcons = [Code2, Smartphone, Search, Megaphone, Terminal, Newspaper, Video, Mic, Palette, Target, Wrench, BarChart3];
const pillarIcons = [Target, Wrench, MessageCircle, BarChart3];
const marqueeLogos = clients.filter((client) => client.logo);
const pillarImages = [
  "/imagenes/pillar-apuesta.avif",
  "/imagenes/pillar-tecnico.avif",
  "/imagenes/pillar-comunicacion.avif",
  "/imagenes/hero-service-seo.avif",
];

const nodeGroups = [
  { left: 3, top: 12, delay: 0, duration: 6200, points: [[8, 42], [34, 12], [54, 46]] },
  { left: 13, top: 56, delay: 700, duration: 5200, points: [[6, 10], [40, 30]] },
  { left: 23, top: 18, delay: 1500, duration: 5800, points: [[10, 45], [36, 8], [58, 38]] },
  { left: 32, top: 62, delay: 300, duration: 4800, points: [[5, 15], [30, 42]] },
  { left: 41, top: 8, delay: 2200, duration: 6400, points: [[12, 30], [38, 55], [60, 20]] },
  { left: 50, top: 46, delay: 1000, duration: 5000, points: [[8, 8], [32, 34]] },
  { left: 59, top: 20, delay: 2800, duration: 5600, points: [[10, 50], [35, 14], [58, 42]] },
  { left: 68, top: 58, delay: 500, duration: 4600, points: [[6, 20], [30, 46]] },
  { left: 77, top: 12, delay: 1900, duration: 6100, points: [[9, 42], [33, 10], [56, 38]] },
  { left: 87, top: 42, delay: 900, duration: 5300, points: [[7, 12], [28, 36]] },
  { left: 94, top: 20, delay: 2400, duration: 4900, points: [[6, 34], [26, 10]] },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/40comunicaciondigital/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://ar.linkedin.com/in/nicol%C3%A1s-rielo-1a859848",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <line x1="7.5" y1="10" x2="7.5" y2="16.5" />
        <circle cx="7.5" cy="7" r="0.35" fill="currentColor" stroke="none" />
        <path d="M11.5 16.5V10" />
        <path d="M11.5 12.8c0-1.55 1.2-2.8 2.6-2.8s2.4 1 2.4 2.9v3.6" />
      </svg>
    ),
  },
];

export default function Home() {
  const reducedMotion = useReducedMotion();

  const [menuOpen, setMenuOpen] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [proofPhrase, setProofPhrase] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [validContactFields, setValidContactFields] = useState<Partial<Record<ContactFieldName, boolean>>>({});
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showWhatsappTip, setShowWhatsappTip] = useState(false);
  const [headerShrunk, setHeaderShrunk] = useState(false);

  const proofRef = useRef<HTMLElement>(null);
  const statementGhostRef = useRef<HTMLSpanElement>(null);
  const projectTrackRef = useRef<HTMLDivElement>(null);
  const projectOffsetRef = useRef(0);
  const projectStepRef = useRef(0);
  const projectMoveRef = useRef<{ start: number; distance: number; startedAt: number } | null>(null);
  const projectPausedRef = useRef(false);
  const projectKeyboardFocusRef = useRef(false);
  const projectDragRef = useRef({ dragging: false, startX: 0, startOffset: 0, moved: 0, pointerId: -1 });

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => setHeroSlide((current) => (current + 1) % heroSlides.length), 6000);
    return () => window.clearInterval(timer);
  }, [heroSlide, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const phraseTimer = window.setInterval(() => setProofPhrase((current) => (current + 1) % rotatingProof.length), 3000);
    return () => window.clearInterval(phraseTimer);
  }, [reducedMotion]);

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

  useEffect(() => {
    function onScroll() {
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = pageHeight > 0 ? window.scrollY / pageHeight : 0;
      setHeaderShrunk(progress > 0.05);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const ghost = statementGhostRef.current;
    if (!ghost) return;
    let frame = 0;
    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const rect = ghost!.parentElement!.getBoundingClientRect();
        const offset = rect.top * 0.18;
        ghost!.style.transform = `translate(-50%, calc(-50% + ${offset.toFixed(1)}px))`;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  function handleWhySpotlight(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    event.currentTarget.style.setProperty("--spot-x", `${x}%`);
    event.currentTarget.style.setProperty("--spot-y", `${y}%`);
  }

  function resetWhySpotlight(event: MouseEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--spot-x", "50%");
    event.currentTarget.style.setProperty("--spot-y", "-20%");
  }

  useEffect(() => {
    const track = projectTrackRef.current;
    if (!track) return;
    const first = track.children[0];
    const second = track.children[1];
    const duplicate = track.children[clients.length];
    if (!first || !second || !duplicate) return;
    let cycleWidth = 0;
    const measure = () => {
      const start = first.getBoundingClientRect().left;
      projectStepRef.current = second.getBoundingClientRect().left - start;
      cycleWidth = duplicate.getBoundingClientRect().left - start;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    let frame = 0;
    let last = performance.now();
    const speed = 42;
    const loop = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      const move = projectMoveRef.current;
      if (move) {
        const progress = reducedMotion ? 1 : Math.min(Math.max(now - move.startedAt, 0) / 240, 1);
        projectOffsetRef.current = move.start + move.distance * (1 - (1 - progress) ** 3);
        if (progress === 1) projectMoveRef.current = null;
      } else if (!reducedMotion && !projectDragRef.current.dragging && !projectPausedRef.current && !projectKeyboardFocusRef.current) {
        projectOffsetRef.current -= (speed * dt) / 1000;
      }
      if (cycleWidth > 0) {
        projectOffsetRef.current = -(((-projectOffsetRef.current % cycleWidth) + cycleWidth) % cycleWidth);
      }
      track.style.transform = `translateX(${projectOffsetRef.current}px)`;
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  function moveProjects(direction: -1 | 1) {
    if (projectDragRef.current.dragging) return;
    projectMoveRef.current = {
      start: projectOffsetRef.current,
      distance: -direction * projectStepRef.current,
      startedAt: performance.now(),
    };
  }

  function handleProjectPointerDown(event: PointerEvent<HTMLDivElement>) {
    projectMoveRef.current = null;
    projectDragRef.current = { dragging: true, startX: event.clientX, startOffset: projectOffsetRef.current, moved: 0, pointerId: event.pointerId };
  }

  function handleProjectPointerMove(event: PointerEvent<HTMLDivElement>) {
    const drag = projectDragRef.current;
    if (!drag.dragging) return;
    const dx = event.clientX - drag.startX;
    projectDragRef.current.moved = Math.abs(dx);
    // Only claim pointer capture once we've confirmed this is a real drag, not a click/tap —
    // capturing immediately on pointerdown would retarget the eventual click to the track,
    // breaking normal link clicks inside the cards.
    if (projectDragRef.current.moved > 6) {
      const track = projectTrackRef.current;
      if (track && !track.classList.contains("is-dragging")) {
        track.setPointerCapture(event.pointerId);
        track.classList.add("is-dragging");
      }
      projectOffsetRef.current = drag.startOffset + dx;
    }
  }

  function handleProjectPointerUp(event: PointerEvent<HTMLDivElement>) {
    const drag = projectDragRef.current;
    if (!drag.dragging) return;
    const track = projectTrackRef.current;
    projectDragRef.current.dragging = false;
    track?.classList.remove("is-dragging");
    try {
      track?.releasePointerCapture(event.pointerId);
    } catch {
      // ignore
    }
  }

  function handleProjectClickCapture(event: React.MouseEvent<HTMLDivElement>) {
    if (projectDragRef.current.moved > 6) {
      event.preventDefault();
      event.stopPropagation();
    }
    projectDragRef.current.moved = 0;
  }

  function updateContactField(event: FormEvent<HTMLFormElement>) {
    const field = event.target;
    if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement)) return;
    const valid = field.validity.valid && isContactFieldValid(field.name, field.value);
    setValidContactFields((current) => {
      const name = field.name as ContactFieldName;
      return Boolean(current[name]) === valid ? current : { ...current, [name]: valid };
    });
  }

  function contactField(name: ContactFieldName, control: ReactNode) {
    return (
      <span className="contact-field" data-valid={validContactFields[name] === true}>
        {control}
        <Check className="contact-field-check" size={20} strokeWidth={2.5} aria-hidden="true" />
      </span>
    );
  }

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("loading");
    const payload = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Request failed");
      form.reset();
      setValidContactFields({});
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const slide = heroSlides[heroSlide];

  function renderProjectCard(client: (typeof clients)[number], index: number, keySuffix: string) {
    const placeholder = placeholderLogos[index % placeholderLogos.length];
    return (
      <article key={`${client.name}-${keySuffix}`} className="project-card project-card-media" aria-hidden={keySuffix === "b" ? true : undefined}>
        <Image src={client.image} alt="" fill sizes="(max-width: 800px) 82vw, 360px" className="project-card-bg" />
        <span className="project-card-scrim" aria-hidden="true" />
        <div className="project-card-top">
          {client.logo ? (
            <span className="project-logo project-logo-real">
              <Image src={client.logo} alt={client.name} width={112} height={32} />
            </span>
          ) : (
            <span className="project-logo" aria-hidden="true" title={`${placeholder.name} (logo provisorio)`}>{placeholder.mark}</span>
          )}
        </div>
        {client.featured && <span className="project-badge">Caso insignia</span>}
        <div className="project-info">
          <span className="project-tag">{client.tag}</span>
          <h3>{client.name}</h3>
          <div className="project-desc-wrap">
            <div className="project-desc-inner">
              <p className="project-desc">
                {client.description.split(" ").flatMap((word, wordIndex) => [
                  <span key={`w-${wordIndex}`} className="word" style={{ animationDelay: `${wordIndex * 18}ms` }}>
                    {word}
                  </span>,
                  " ",
                ])}
              </p>
            </div>
          </div>
        </div>
        <a className="button button-outline project-link" href={client.url} target="_blank" rel="noreferrer" tabIndex={keySuffix === "b" ? -1 : undefined}>
          {client.urlLabel} <ArrowUpRight size={15} />
        </a>
      </article>
    );
  }

  return (
    <main>
      <header className={headerShrunk ? "site-header is-shrunk" : "site-header"}>
        <div className="section-wrap header-inner">
          <a className="brand" href="#inicio" aria-label="40 Comunicación Digital, inicio">
            <Image src="/imagenes/40CD%20Logo%20B%26N-transparente.avif" alt="40 Comunicación Digital" width={73} height={73} priority />
          </a>
          <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Navegación principal">
            <a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a>
            <a href="#proyectos" onClick={() => setMenuOpen(false)}>Proyectos</a>
            <a href="#nosotros" onClick={() => setMenuOpen(false)}>Nosotros</a>
            <a className="button button-dark nav-cta" href="#contacto" onClick={() => setMenuOpen(false)}>Hablemos <ArrowUpRight size={15} /></a>
          </nav>
          <button className="menu-toggle" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <section className="hero" id="inicio" aria-roledescription="carousel" aria-label="Servicios destacados">
        <span className="hero-bg-gradient" aria-hidden="true" />
        <div className="hero-rings-clip" aria-hidden="true">
          <div className="hero-rings hero-rings-left">
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="hero-inner section-wrap">
          <div className="hero-copy">
            <h1 className="sr-only">Su negocio merece ser visto</h1>
            <p key={`eyebrow-${heroSlide}`} className="hero-eyebrow hero-copy-enter">{slide.eyebrow}</p>
            <p key={heroSlide} className="hero-title" aria-live="polite">
              {slide.titleLines.map((segments, index) => (
                <span className="hero-line-mask" key={index}>
                  <span className="hero-line-inner" style={{ animationDelay: `${index * 110}ms` }}>
                    {segments.map((segment, segIndex) => (
                      <span key={segIndex} className={segment.accent ? "hero-title-accent" : undefined}>
                        {segment.text}
                      </span>
                    ))}
                  </span>
                </span>
              ))}
            </p>
            <p key={`intro-${heroSlide}`} className="hero-intro hero-copy-enter">{slide.intro}</p>
            <div className="hero-actions hero-actions-enter">
              <a className="button button-dark" href="https://wa.me/5492494673903" target="_blank" rel="noreferrer">Cantar las 40 <ArrowUpRight size={17} /></a>
              <a className="button button-outline" href="#proyectos">Ver proyectos <ChevronRight size={16} aria-hidden="true" /></a>
            </div>
          </div>
          <div
            key={`portrait-${heroSlide}`}
            className="hero-portrait"
          >
            <div className="hero-portrait-inner" data-motion={["zoom-in", "pan-left", "zoom-out", "pan-right"][heroSlide]}>
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                priority
                sizes="(max-width: 900px) 90vw, 48vw"
                className={heroSlide === 0 ? "hero-dashboard-image" : undefined}
              />
            </div>
            <span className="hero-portrait-overlay" aria-hidden="true" />
            <span className="portrait-wipe" aria-hidden="true" />
          </div>
          <button
            className="hero-arrow hero-arrow-prev"
            aria-label="Slide anterior"
            onClick={() => setHeroSlide((heroSlide - 1 + heroSlides.length) % heroSlides.length)}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="hero-arrow hero-arrow-next"
            aria-label="Slide siguiente"
            onClick={() => setHeroSlide((heroSlide + 1) % heroSlides.length)}
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="hero-loadbar" aria-hidden="true">
          <span key={heroSlide} className="hero-loadbar-fill" />
        </div>
      </section>

      <section className="proof-strip" ref={proofRef}>
        <div className="proof-lines" aria-hidden="true">
          <svg width="0" height="0" style={{ position: "absolute" }}>
            <defs>
              <linearGradient id="nodeGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" style={{ stopColor: "var(--ember)" }} />
                <stop offset="100%" style={{ stopColor: "var(--iron)" }} />
              </linearGradient>
            </defs>
          </svg>
          {nodeGroups.map((group, index) => (
            <svg
              key={index}
              className="node-group"
              width="64"
              height="64"
              viewBox="0 0 64 64"
              style={{ left: `${group.left}%`, top: `${group.top}%` }}
            >
              {group.points.length > 1 && (
                <polyline
                  points={group.points.map((point) => point.join(",")).join(" ")}
                  fill="none"
                  stroke="url(#nodeGradient)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={100}
                  className="node-line"
                  style={{ animationDelay: `${group.delay}ms`, animationDuration: `${group.duration}ms` }}
                />
              )}
              {group.points.map((point, pointIndex) => (
                <circle
                  key={pointIndex}
                  cx={point[0]}
                  cy={point[1]}
                  r={pointIndex === 0 ? 3.2 : 2.2}
                  fill={pointIndex === 0 ? "var(--ember)" : "var(--iron)"}
                  className="node-dot"
                  style={{
                    animationDelay: `${group.delay + pointIndex * Math.round(group.duration * 0.2)}ms`,
                    animationDuration: `${group.duration}ms`,
                  }}
                />
              ))}
            </svg>
          ))}
        </div>
        <div className="section-wrap proof-inner">
          <span>Una presencia digital</span>
          <strong key={proofPhrase} className="proof-phrase">{rotatingProof[proofPhrase]}</strong>
        </div>
      </section>

      <section className="logos-marquee" aria-label="Marcas que confían en nosotros">
        <div className={reducedMotion ? "logos-track is-paused" : "logos-track"}>
          {[...marqueeLogos, ...marqueeLogos, ...marqueeLogos, ...marqueeLogos].map((client, index) => {
            const isDuplicate = index >= marqueeLogos.length;
            return (
              <span className="logo-item" key={`${client.name}-${index}`} title={isDuplicate ? undefined : client.name} aria-hidden={isDuplicate ? true : undefined}>
                <Image src={client.logo!} alt={isDuplicate ? "" : client.name} width={120} height={35} />
              </span>
            );
          })}
        </div>
      </section>

      <section className="manifesto" id="nosotros-filosofia">
        <span className="manifesto-ghost" aria-hidden="true">40</span>
        <div className="manifesto-client" aria-hidden="true">
          <Image src="/imagenes/happy-client.avif" alt="" width={620} height={696} />
        </div>
        <div className="section-wrap manifesto-inner">
          <div className="manifesto-grid">
            <Reveal as="div" className="manifesto-title"><SectionTitle lines={["Si a usted", "le va bien,", "a nosotros", "también"]} accentLines={[0, 1]} /></Reveal>
            <Reveal as="div" delay={80} className="manifesto-body">
              <p>En <strong>40 Comunicación Digital</strong> apostamos por el negocio de nuestros clientes y jugamos a largo plazo. El conocimiento de su industria lo tiene usted; nosotros sumamos estrategia, diseño, contenidos y las herramientas digitales —incluida la inteligencia artificial— para que ese valor se vea, se entienda y se venda.</p>
              <a className="circle-link" href="#contacto" aria-label="Conocer más sobre 40 Comunicación Digital">
                <span className="circle-link-ping" aria-hidden="true" />
                <ArrowUpRight size={21} />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="services section-wrap" id="servicios">
        <span className="services-collage" aria-hidden="true" />
        <Reveal as="div" delay={60} className="services-heading">
          <SectionTitle lines={["Servicios de comunicación digital", "para su negocio"]} accentLines={[1]} />
          <p><span className="full-copy">Estrategia, creatividad y tecnología en un mismo equipo: desde el diseño de su página web hasta la inteligencia artificial aplicada a sus ventas.</span><span className="compact-copy">Diseño web, contenidos e IA para potenciar sus ventas.</span></p>
        </Reveal>
        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];
            return (
              <Reveal as="article" key={service.number} delay={(index % 3) * 70} className="service-card">
                <span className="service-icon"><Icon size={18} /></span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section
        className="why-section"
        aria-labelledby="why-heading"
        onMouseMove={handleWhySpotlight}
        onMouseLeave={resetWhySpotlight}
      >
        <span className="why-gradient" aria-hidden="true" />
        <span className="why-texture" aria-hidden="true" />
        <div className="ticker" aria-hidden="true">
          <div className={reducedMotion ? "ticker-track is-paused" : "ticker-track"}>
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <span className="ticker-item" key={`${item}-${index}`}>{item}<span className="ticker-dot" /></span>
            ))}
          </div>
        </div>
        <div className="section-wrap why-inner">
          <div className="why-grid">
            <Reveal as="div" delay={40} className="why-heading">
              <SectionTitle id="why-heading" lines={["Jugamos", "a largo plazo"]} accentLines={[1]} />
            </Reveal>
            <div className="pillars-grid">
              {pillars.map((pillar, index) => {
                const Icon = pillarIcons[index % pillarIcons.length];
                return (
                  <Reveal as="article" key={pillar.title} delay={index * 90} className="pillar-card">
                    <Image src={pillarImages[index % pillarImages.length]} alt="" fill sizes="(max-width: 800px) 90vw, 320px" className="pillar-card-bg" />
                    <span className="pillar-card-scrim" aria-hidden="true" />
                    <div className="pillar-card-top">
                      <span className="pillar-icon"><Icon size={20} /></span>
                      <span className="pillar-index">{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="pillar-card-body">
                      <h3>{pillar.title}</h3>
                      <p>{pillar.description}</p>
                    </div>
                    <span className="pillar-arrow"><ArrowUpRight size={18} /></span>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="projects" id="proyectos">
        <div className="section-wrap projects-head">
          <Reveal as="div" delay={60}>
            <SectionTitle lines={["Trabajo que", "habla por sí solo"]} accentLines={[1]} />
            <p>Instituciones de Tandil y empresas de Argentina y España que acompañamos en su crecimiento digital.</p>
          </Reveal>
        </div>
        <div className="project-window" id="portfolio-clientes">
          <div
            className="project-track"
            ref={projectTrackRef}
            onPointerDown={handleProjectPointerDown}
            onPointerMove={handleProjectPointerMove}
            onPointerUp={handleProjectPointerUp}
            onPointerCancel={handleProjectPointerUp}
            onClickCapture={handleProjectClickCapture}
            onMouseEnter={() => (projectPausedRef.current = true)}
            onMouseLeave={() => (projectPausedRef.current = false)}
            onFocusCapture={(event) => {
              if (!event.target.matches(":focus-visible")) return;
              const card = event.target.closest(".project-card");
              const track = event.currentTarget;
              if (!card) return;
              projectKeyboardFocusRef.current = true;
              projectMoveRef.current = null;
              projectOffsetRef.current = track.getBoundingClientRect().left - card.getBoundingClientRect().left;
              track.style.transform = `translateX(${projectOffsetRef.current}px)`;
            }}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) projectKeyboardFocusRef.current = false;
            }}
          >
            {clients.map((client, index) => renderProjectCard(client, index, "a"))}
            {clients.map((client, index) => renderProjectCard(client, index, "b"))}
          </div>
        </div>
        <div className="project-controls">
          <button type="button" aria-label="Cliente anterior" aria-controls="portfolio-clientes" onClick={() => moveProjects(-1)}>
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Cliente siguiente" aria-controls="portfolio-clientes" onClick={() => moveProjects(1)}>
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </section>

      <section className="about-band" id="nosotros">
        <Reveal as="div" className="about-image">
          <Image src="/imagenes/team-about.avif" alt="Equipo de 40 Comunicación Digital en Tandil" fill sizes="(max-width: 800px) 100vw, 50vw" />
          <span className="about-image-overlay" aria-hidden="true" />
        </Reveal>
        <div className="section-wrap about-copy-wrap">
          <Reveal as="div" delay={80} className="about-copy">
            <SectionTitle lines={["Detrás de cada", "buena idea"]} accentLines={[1]} />
            <p>Somos un equipo de comunicación digital nacido en Tandil. Nos dedicamos a algo simple y difícil a la vez: entender de verdad qué hace valioso a un negocio y encontrar la forma más clara de contarlo. Reunimos estrategia, diseño, tecnología y producción de contenidos en un mismo equipo, y trabajamos con pymes e instituciones de Argentina y España con la cercanía de quien conoce su proyecto de punta a punta.</p>
            <p className="about-highlight"><span className="full-copy">Desde el interior, con casos de éxito en Argentina y España.</span><span className="compact-copy">Casos de éxito en Argentina y España.</span></p>
            <a className="button button-outline" href="#contacto">Conversemos sobre su proyecto <ArrowUpRight size={16} /></a>
          </Reveal>
        </div>
      </section>

      <section className="statement">
        <span className="statement-overlay" aria-hidden="true" />
        <span className="statement-ghost" ref={statementGhostRef} aria-hidden="true">40</span>
        <Reveal className="statement-inner">
          <SectionTitle lines={["Es hora de", "golpear la mesa"]} accentLines={[1]} />
          <p>Hoy la batalla es en la web y en las redes. Si usted es bueno en lo que hace, le falta una sola cosa: que lo vean.</p>
          <a className="button button-dark button-inverse" href="#contacto">Cantar las 40 <ArrowUpRight size={17} /></a>
        </Reveal>
      </section>

      <section className="contact-section" id="contacto">
        <div className="section-wrap contact-grid">
          <Reveal as="div">
            <SectionTitle lines={["Hablemos", "de su proyecto"]} accentLines={[1]} />
            <p>Cuéntenos su proyecto. Sin compromiso, sin vueltas. Si podemos ayudarlo a crecer, se lo vamos a decir con claridad. Trabajamos en forma presencial en Tandil y a distancia con toda Argentina y España.</p>
            <div className="contact-details">
              <a href="mailto:nicolas.rielo@40comunicaciondigital.com">nicolas.rielo@40comunicaciondigital.com</a>
              <a href="https://wa.me/5492494673903" target="_blank" rel="noreferrer">+54 9 249 467-3903</a>
              <span>Tandil · Buenos Aires · Argentina</span>
            </div>
            <a className="button button-dark contact-whatsapp" href="https://wa.me/5492494673903" target="_blank" rel="noreferrer">
              <MessageCircle size={18} aria-hidden="true" /> Escribinos por WhatsApp
            </a>
          </Reveal>
          <Reveal as="div" delay={100}>
            <form className="contact-form" onChange={updateContactField} onSubmit={submitContact}>
              <div className="form-row">
                <label>Nombre{contactField("nombre", <input name="nombre" required minLength={2} maxLength={120} placeholder="Su nombre" />)}</label>
                <label>Email{contactField("email", <input name="email" type="email" required maxLength={180} placeholder="su@email.com" />)}</label>
              </div>
              <label>Empresa o proyecto{contactField("empresa", <input name="empresa" required maxLength={180} placeholder="¿En qué está trabajando?" />)}</label>
              <label>
                ¿Qué necesita?
                {contactField("servicio", <select name="servicio" required defaultValue="">
                  <option value="" disabled>Seleccione una opción</option>
                  {services.map((service) => (
                    <option key={service.number}>{service.title}</option>
                  ))}
                  <option>Más de uno / No sé por dónde empezar</option>
                </select>)}
              </label>
              <label>Mensaje (opcional){contactField("mensaje", <textarea name="mensaje" maxLength={3000} placeholder="Cuéntenos brevemente su proyecto..." rows={4} />)}</label>
              <button type="submit" className="button button-dark form-submit" disabled={status === "loading"}>
                {status === "loading" ? "Enviando..." : "Enviar"} <SendHorizontal size={17} aria-hidden="true" />
              </button>
              {status === "success" && <p className="form-message success" role="status">Gracias por comunicarte con nosotros, te contestaremos a la brevedad.</p>}
              {status === "error" && <p className="form-message error">No pudimos enviar el mensaje. Escríbanos por WhatsApp.</p>}
            </form>
          </Reveal>
        </div>
      </section>

      <footer className="footer">
        <div className="section-wrap footer-inner">
          <Image src="/imagenes/40CD%20Logo%20W-transparente.avif" alt="40 Comunicación Digital" width={56} height={56} />
          <div>
            <p>© 2026 40 Comunicación Digital</p>
            <p>Diseñamos presencia. Construimos futuro.</p>
            <div className="footer-links">
              <a href={socialLinks[0].href} target="_blank" rel="noreferrer">Instagram</a>
              <a href={socialLinks[1].href} target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
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

      <div className="social-rail" aria-label="Redes sociales">
        {socialLinks.map((social) => (
          <a key={social.name} className="social-icon" href={social.href} aria-label={social.name} target="_blank" rel="noreferrer">
            {social.icon}
          </a>
        ))}
      </div>
    </main>
  );
}
