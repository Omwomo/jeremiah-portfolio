import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Contact"];

const SKILLS = [
  // Scientific Visualization & Simulation
  { name: "ParaView", level: 88, category: "Visualization" },
  { name: "Python (NumPy / SciPy / Matplotlib)", level: 90, category: "Visualization" },
  { name: "Computational Physics Modeling", level: 87, category: "Visualization" },
  { name: "MATLAB", level: 82, category: "Visualization" },
  // Physics & Mathematics
  { name: "Thermal-Hydraulic & Heat Transfer", level: 88, category: "Physics" },
  { name: "Mechanics & Structural Analysis", level: 85, category: "Physics" },
  { name: "Electromagnetism", level: 83, category: "Physics" },
  { name: "Quantum Mechanics", level: 78, category: "Physics" },
  { name: "Differential Equations & Numerical Methods", level: 86, category: "Physics" },
  // Engineering & Lab
  { name: "Structural Performance Data Analysis", level: 80, category: "Engineering" },
  { name: "Oscilloscopes & Signal Generators", level: 75, category: "Engineering" },
  { name: "Circuit Testing & Verification", level: 74, category: "Engineering" },
  // Tools & Communication
  { name: "LaTeX Technical Reporting", level: 82, category: "Tools" },
  { name: "Microsoft Excel (Advanced)", level: 78, category: "Tools" },
  { name: "Data Analysis & Research Summaries", level: 85, category: "Tools" },
];

const PROJECTS = [
  {
    title: "Heat Diffusion in Layered Materials — Senior Project",
    employer: "University of Oklahoma",
    description:
      "Built Python-based computational models to study heat diffusion patterns across layered material systems. Visualized thermal gradient propagation and presented findings to a faculty review panel. Directly applicable to ParaView-based scientific visualization workflows.",
    tags: ["Python", "Heat Diffusion", "Computational Modeling", "ParaView", "NumPy"],
    image: null,
    placeholder: "🌡️",
    note: "Add image: /images/heat-diffusion.jpg",
  },
  {
    title: "Thermal Modeling Simulations",
    employer: "University of Oklahoma — Research Lab",
    description:
      "Ran thermal simulation models and performed systematic analysis of output datasets, comparing model predictions against laboratory measurements to validate accuracy. Contributed findings to internal research summaries and faculty presentations.",
    tags: ["MATLAB", "Thermal Simulation", "Data Validation", "Research"],
    image: null,
    placeholder: "📊",
    note: "Add image: /images/thermal-sim.jpg",
  },
  {
    title: "Structural Performance Review — Boeing Internship",
    employer: "Boeing, Oklahoma City",
    description:
      "Assisted Boeing engineering teams in reviewing structural performance data and verifying mechanical tolerance calculations. Supported documentation updates and internal tracking systems — gaining hands-on exposure to aerospace-grade engineering standards.",
    tags: ["Structural Analysis", "Boeing", "Aerospace", "Engineering"],
    image: null,
    placeholder: "✈️",
    note: "Add image: /images/boeing.jpg",
  },
  {
    title: "Physics Curriculum Development & Tutoring",
    employer: "University Academic Support Services",
    description:
      "Designed structured problem-solving approaches to tutor students in mechanics and electromagnetism over two years. Broke down complex multi-step physics problems into clear, logical workflows — a skill directly transferable to explaining and validating AI-generated scientific content.",
    tags: ["Physics", "Mechanics", "Electromagnetism", "Communication"],
    image: null,
    placeholder: "⚡",
    note: "Add image: /images/tutoring.jpg",
  },
];

const TIMELINE = [
  {
    year: "2024",
    title: "B.S. Physics — University of Oklahoma",
    detail: "Dean's List · Senior Project: Heat Diffusion Modeling · Norman, OK",
    type: "education",
  },
  {
    year: "2023–2024",
    title: "Undergraduate Research Assistant",
    detail: "University of Oklahoma — Thermal modeling, simulation analysis & research reporting",
    type: "work",
  },
  {
    year: "2023",
    title: "Engineering Intern — Boeing",
    detail: "Oklahoma City, OK — Structural data review, tolerance verification & documentation",
    type: "work",
  },
  {
    year: "2022–2024",
    title: "Physics Tutor",
    detail: "University Academic Support Services — Mechanics & Electromagnetism",
    type: "education",
  },
];

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.12, ...options }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SkillBar({ skill, delay }) {
  const [ref, inView] = useInView();
  const catColor = {
    Visualization: "#f97316",
    Physics: "#fb923c",
    Engineering: "#fbbf24",
    Tools: "#a3a3a3",
  };
  const color = catColor[skill.category] || "#f97316";
  return (
    <div ref={ref} style={{ marginBottom: "1.1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-primary)" }}>
          {skill.name}
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color }}>
          {skill.level}%
        </span>
      </div>
      <div style={{ background: "rgba(255,255,255,0.06)", height: "3px", borderRadius: "2px", overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: inView ? `${skill.level}%` : "0%",
          background: `linear-gradient(90deg, ${color}, ${color}99)`,
          transition: `width 1.3s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
          borderRadius: "2px",
          boxShadow: `0 0 10px ${color}66`,
        }} />
      </div>
    </div>
  );
}

// Animated data-plot particle canvas
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const dots = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((d) => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249, 115, 22, ${d.opacity})`;
        ctx.fill();
      });
      // Draw connecting lines
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(249,115,22,${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

export default function App() {
  const [activeSection, setActiveSection] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      NAV_LINKS.forEach((link) => {
        const sec = document.getElementById(link.toLowerCase());
        if (!sec) return;
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) setActiveSection(link);
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", message: "" });
  };

  const categoryColors = { Visualization: "#f97316", Physics: "#fb923c", Engineering: "#fbbf24", Tools: "#a3a3a3" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@300;400;500;700&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --bg:       #0c0a08;
          --bg-2:     #111009;
          --surface:  #1a1712;
          --surface-2:#201e18;
          --accent:   #f97316;
          --accent-2: #fbbf24;
          --accent-3: #fb923c;
          --text-primary:   #f5f0e8;
          --text-secondary: #8a7f6e;
          --border:   rgba(249,115,22,0.12);
          --font-display: 'DM Serif Display', Georgia, serif;
          --font-mono:    'JetBrains Mono', monospace;
          --font-body:    'DM Sans', sans-serif;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          background: var(--bg);
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 16px;
          line-height: 1.75;
          overflow-x: hidden;
        }
        ::selection { background: var(--accent); color: #000; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--accent); }

        /* Subtle noise texture overlay */
        body::after {
          content: '';
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 9999; opacity: 0.4;
        }

        /* NAV */
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; justify-content: space-between; align-items: center;
          padding: 1.25rem 3rem;
          background: rgba(12,10,8,0.82);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
        }
        .nav-logo {
          font-family: var(--font-display);
          font-size: 1.2rem;
          color: var(--text-primary);
          letter-spacing: 0.01em;
        }
        .nav-logo span { color: var(--accent); }
        .nav-links { display: flex; gap: 2.5rem; list-style: none; }
        .nav-links button {
          background: none; border: none; cursor: pointer;
          font-family: var(--font-mono); font-size: 0.78rem;
          letter-spacing: 0.08em; color: var(--text-secondary);
          transition: color 0.2s; padding: 0;
        }
        .nav-links button:hover, .nav-links button.active { color: var(--accent); }
        .hamburger {
          display: none; flex-direction: column; gap: 5px;
          cursor: pointer; background: none; border: none;
        }
        .hamburger span { display: block; width: 22px; height: 1.5px; background: var(--accent); }
        .mobile-menu {
          display: none; position: fixed; top: 66px; left: 0; right: 0;
          background: rgba(12,10,8,0.97); border-bottom: 1px solid var(--border);
          flex-direction: column; z-index: 99; padding: 0.5rem 0;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu button {
          background: none; border: none; cursor: pointer;
          font-family: var(--font-mono); font-size: 0.9rem;
          color: var(--text-secondary); padding: 1rem 2rem; text-align: left;
        }
        .mobile-menu button:hover { color: var(--accent); }

        /* HERO */
        #home {
          min-height: 100vh; position: relative; overflow: hidden;
          display: flex; align-items: center;
        }
        .hero-inner {
          max-width: 1200px; margin: 0 auto;
          padding: 10rem 3rem 5rem;
          display: grid; grid-template-columns: 1.2fr 1fr;
          gap: 4rem; align-items: center; width: 100%;
        }
        .hero-eyebrow {
          font-family: var(--font-mono); font-size: 0.75rem;
          letter-spacing: 0.2em; color: var(--accent);
          text-transform: uppercase; margin-bottom: 1.5rem;
          display: flex; align-items: center; gap: 0.75rem;
        }
        .hero-eyebrow::before {
          content: ''; display: block; width: 32px; height: 1px;
          background: var(--accent);
        }
        h1.hero-name {
          font-family: var(--font-display);
          font-size: clamp(3rem, 6vw, 5.5rem);
          line-height: 1.05; font-weight: 400;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }
        h1.hero-name em {
          font-style: italic; color: var(--accent);
        }
        .hero-subtitle {
          font-family: var(--font-mono); font-size: 0.8rem;
          letter-spacing: 0.12em; color: var(--text-secondary);
          text-transform: uppercase; margin-bottom: 1.75rem;
        }
        .hero-desc {
          font-size: 1.05rem; color: var(--text-secondary);
          line-height: 1.85; margin-bottom: 2.5rem;
          font-weight: 300; max-width: 520px;
        }
        .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }

        .btn-fill {
          font-family: var(--font-mono); font-size: 0.78rem;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 0.8rem 1.8rem;
          background: var(--accent); color: #000;
          border: none; cursor: pointer; font-weight: 700;
          transition: all 0.25s;
        }
        .btn-fill:hover { background: var(--accent-2); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(249,115,22,0.35); }
        .btn-outline {
          font-family: var(--font-mono); font-size: 0.78rem;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 0.8rem 1.8rem;
          background: transparent; color: var(--accent);
          border: 1px solid rgba(249,115,22,0.4); cursor: pointer;
          transition: all 0.25s;
        }
        .btn-outline:hover { border-color: var(--accent); background: rgba(249,115,22,0.07); }

        /* Hero data card */
        .hero-card {
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 2rem;
          position: relative;
        }
        .hero-card::before {
          content: ''; position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--accent), var(--accent-2), transparent);
        }
        .data-row {
          display: flex; justify-content: space-between;
          align-items: center; padding: 0.75rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .data-row:last-child { border-bottom: none; }
        .data-label {
          font-family: var(--font-mono); font-size: 0.7rem;
          letter-spacing: 0.12em; color: var(--text-secondary); text-transform: uppercase;
        }
        .data-value {
          font-family: var(--font-mono); font-size: 0.82rem;
          color: var(--text-primary); text-align: right;
        }
        .data-value.highlight { color: var(--accent); }

        /* SECTION COMMONS */
        .section-inner {
          max-width: 1200px; margin: 0 auto; padding: 6rem 3rem;
        }
        .section-header { margin-bottom: 3.5rem; }
        .section-num {
          font-family: var(--font-mono); font-size: 0.7rem;
          letter-spacing: 0.2em; color: var(--accent);
          text-transform: uppercase; margin-bottom: 0.5rem;
        }
        .section-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 400; line-height: 1.1; color: var(--text-primary);
        }
        .section-title em { font-style: italic; color: var(--accent); }
        .rule {
          width: 48px; height: 1px;
          background: linear-gradient(90deg, var(--accent), transparent);
          margin-top: 1rem;
        }

        /* ABOUT */
        #about { background: var(--bg-2); }
        .about-layout {
          display: grid; grid-template-columns: 1fr 1.1fr;
          gap: 5rem; align-items: start;
        }
        .photo-frame {
          position: relative; aspect-ratio: 3/4; max-height: 480px;
        }
        .photo-frame::after {
          content: '';
          position: absolute; bottom: -16px; right: -16px;
          width: 80%; height: 80%;
          border: 1px solid rgba(249,115,22,0.25);
          pointer-events: none; z-index: 0;
        }
        .photo-inner {
          position: relative; z-index: 1;
          width: 100%; height: 100%; overflow: hidden;
          border: 1px solid var(--border);
        }
        .photo-inner img { width:100%; height:100%; object-fit: cover; filter: brightness(0.88) contrast(1.05) sepia(0.1); }
        .photo-placeholder {
          width:100%; height:100%; background: var(--surface);
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          gap:0.75rem; color: var(--text-secondary);
          font-family: var(--font-mono); font-size:0.72rem; letter-spacing:0.1em;
        }
        .photo-placeholder span:first-child { font-size:2.5rem; opacity:0.3; }

        .about-body p {
          color: var(--text-secondary); font-weight: 300;
          font-size: 1.05rem; line-height: 1.85; margin-bottom: 1.4rem;
        }
        .about-body p strong { color: var(--text-primary); font-weight: 500; }
        .about-body p em { color: var(--accent); font-style: normal; }

        /* Timeline */
        .timeline { margin-top: 2.5rem; }
        .tl-item {
          display: grid; grid-template-columns: 80px 1fr;
          gap: 1.25rem; margin-bottom: 1.5rem; position: relative;
        }
        .tl-item::before {
          content: ''; position: absolute;
          left: 80px; top: 10px; bottom: -1.5rem;
          width: 1px; background: var(--border);
        }
        .tl-item:last-child::before { display: none; }
        .tl-year {
          font-family: var(--font-mono); font-size: 0.7rem;
          color: var(--accent); letter-spacing: 0.05em;
          padding-top: 2px; text-align: right;
        }
        .tl-content { padding-left: 1.5rem; position: relative; }
        .tl-content::before {
          content: ''; position: absolute;
          left: 0; top: 7px; width: 7px; height: 7px;
          border-radius: 50%; border: 1px solid var(--accent);
          background: var(--bg-2);
        }
        .tl-title {
          font-size: 0.9rem; color: var(--text-primary);
          font-weight: 500; margin-bottom: 0.2rem;
        }
        .tl-detail {
          font-family: var(--font-mono); font-size: 0.72rem;
          color: var(--text-secondary); line-height: 1.5;
        }

        /* SKILLS */
        #skills { background: var(--bg); }
        .skills-layout {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 0 5rem;
        }
        .cat-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2.5rem; }
        .cat-chip {
          font-family: var(--font-mono); font-size: 0.7rem;
          letter-spacing: 0.1em; padding: 0.3rem 0.8rem;
          border: 1px solid; border-radius: 1px;
          text-transform: uppercase;
        }

        /* PROJECTS */
        #projects { background: var(--bg-2); }
        .projects-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        .proj-card {
          background: var(--surface); border: 1px solid var(--border);
          overflow: hidden; transition: transform 0.3s, box-shadow 0.3s;
          position: relative;
        }
        .proj-card::after {
          content: ''; position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--accent), var(--accent-2));
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.35s;
        }
        .proj-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.5); }
        .proj-card:hover::after { transform: scaleX(1); }
        .proj-img {
          width: 100%; height: 172px; object-fit: cover;
          filter: brightness(0.8) sepia(0.15);
        }
        .proj-img-ph {
          height: 172px; background: var(--surface-2);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 0.6rem; color: var(--text-secondary);
          font-family: var(--font-mono); font-size: 0.7rem;
          letter-spacing: 0.08em; border-bottom: 1px solid var(--border);
        }
        .proj-img-ph span:first-child { font-size: 2.2rem; opacity: 0.4; }
        .proj-body { padding: 1.5rem; }
        .proj-employer {
          font-family: var(--font-mono); font-size: 0.68rem;
          letter-spacing: 0.12em; color: var(--accent);
          text-transform: uppercase; margin-bottom: 0.4rem;
        }
        .proj-title {
          font-family: var(--font-display); font-size: 1.05rem;
          font-weight: 400; color: var(--text-primary);
          margin-bottom: 0.7rem; line-height: 1.3;
        }
        .proj-desc {
          font-size: 0.92rem; color: var(--text-secondary);
          line-height: 1.7; margin-bottom: 1rem; font-weight: 300;
        }
        .proj-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .tag {
          font-family: var(--font-mono); font-size: 0.66rem;
          letter-spacing: 0.06em; padding: 0.2rem 0.55rem;
          border: 1px solid rgba(249,115,22,0.25);
          color: var(--accent-3); background: rgba(249,115,22,0.05);
        }

        /* CONTACT */
        #contact { background: var(--bg); }
        .contact-layout {
          display: grid; grid-template-columns: 1fr 1.6fr;
          gap: 5rem; align-items: start;
        }
        .contact-blurb {
          font-size: 1rem; color: var(--text-secondary);
          font-weight: 300; line-height: 1.8; margin-bottom: 2rem;
        }
        .c-item { display: flex; gap: 1rem; margin-bottom: 1.5rem; align-items: flex-start; }
        .c-icon {
          width: 38px; height: 38px; background: var(--surface);
          border: 1px solid var(--border); display: flex;
          align-items: center; justify-content: center; flex-shrink: 0; font-size: 1rem;
        }
        .c-label {
          font-family: var(--font-mono); font-size: 0.68rem;
          letter-spacing: 0.15em; color: var(--text-secondary);
          text-transform: uppercase; margin-bottom: 0.2rem;
        }
        .c-value { font-size: 0.95rem; color: var(--text-primary); }
        .c-value a { color: var(--accent); text-decoration: none; }
        .c-value a:hover { text-decoration: underline; }

        .form { display: flex; flex-direction: column; gap: 1.1rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
        .form-label {
          font-family: var(--font-mono); font-size: 0.68rem;
          letter-spacing: 0.15em; color: var(--text-secondary); text-transform: uppercase;
        }
        .form-input, .form-textarea {
          background: var(--surface); border: 1px solid var(--border);
          color: var(--text-primary); font-family: var(--font-body);
          font-size: 0.95rem; padding: 0.8rem 1rem; outline: none;
          transition: border-color 0.2s; resize: vertical; font-weight: 300;
        }
        .form-input:focus, .form-textarea:focus {
          border-color: rgba(249,115,22,0.5);
          box-shadow: 0 0 0 2px rgba(249,115,22,0.08);
        }
        .form-textarea { min-height: 130px; }
        .form-btn {
          font-family: var(--font-mono); font-size: 0.78rem;
          letter-spacing: 0.15em; text-transform: uppercase;
          padding: 0.9rem; background: var(--accent); color: #000;
          border: none; cursor: pointer; font-weight: 700;
          transition: all 0.25s;
        }
        .form-btn:hover { background: var(--accent-2); box-shadow: 0 6px 20px rgba(249,115,22,0.3); }
        .form-btn.sent { background: #22c55e; color: #000; }

        /* FOOTER */
        footer {
          border-top: 1px solid var(--border);
          padding: 2rem 3rem; text-align: center;
          font-family: var(--font-mono); font-size: 0.7rem;
          color: var(--text-secondary); letter-spacing: 0.1em;
          position: relative; z-index: 1;
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          nav { padding: 1rem 1.5rem; }
          .nav-links { display: none; }
          .hamburger { display: flex; }
          .hero-inner { grid-template-columns: 1fr; padding: 8rem 1.5rem 4rem; gap: 2.5rem; }
          .about-layout { grid-template-columns: 1fr; gap: 2.5rem; }
          .photo-frame { max-height: 280px; aspect-ratio: 4/3; }
          .skills-layout { grid-template-columns: 1fr; gap: 0; }
          .projects-grid { grid-template-columns: 1fr; }
          .contact-layout { grid-template-columns: 1fr; gap: 3rem; }
          .section-inner { padding: 4rem 1.5rem; }
        }
        @media (max-width: 480px) {
          h1.hero-name { font-size: 2.6rem; }
        }
      `}</style>

      {/* NAV */}
      <nav>
        <div className="nav-logo">Jeremiah <span>Dixon</span></div>
        <ul className="nav-links">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <button className={activeSection === l ? "active" : ""} onClick={() => scrollTo(l)}>{l}</button>
            </li>
          ))}
        </ul>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map((l) => <button key={l} onClick={() => scrollTo(l)}>{l}</button>)}
      </div>

      {/* HERO */}
      <section id="home" style={{ background: "var(--bg)" }}>
        <ParticleCanvas />
        <div className="hero-inner" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ animation: "fadeUp 0.9s ease both" }}>
            <style>{`@keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }`}</style>
            <p className="hero-eyebrow">Physics · Computation · Visualization</p>
            <h1 className="hero-name">Jeremiah<br /><em>Dixon</em></h1>
            <p className="hero-subtitle">B.S. Physics · University of Oklahoma, 2024</p>
            <p className="hero-desc">
              Computational physicist and scientific visualization specialist with hands-on experience in thermal modeling, data analysis, and aerospace engineering support. Seeking to apply physics and data skills to cutting-edge AI research.
            </p>
            <div className="hero-actions">
              <button className="btn-fill" onClick={() => scrollTo("Projects")}>View Projects</button>
              <button className="btn-outline" onClick={() => scrollTo("Contact")}>Get In Touch</button>
            </div>
          </div>

          {/* Data card */}
          <div style={{ animation: "fadeUp 0.9s ease 0.2s both" }}>
            <div className="hero-card">
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--accent)", textTransform: "uppercase", marginBottom: "1rem" }}>
                // profile.data
              </p>
              {[
                ["Status", "Open to Opportunities", true],
                ["Location", "Oklahoma City, OK", false],
                ["Degree", "B.S. Physics, OU 2024", false],
                ["Internship", "Boeing · Summer 2023", false],
                ["Research", "OU Thermal Modeling Lab", false],
                ["Tools", "ParaView · Python · MATLAB", true],
                ["GPA Track", "Dean's List (multiple semesters)", false],
              ].map(([label, value, hl]) => (
                <div className="data-row" key={label}>
                  <span className="data-label">{label}</span>
                  <span className={`data-value${hl ? " highlight" : ""}`}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="section-inner">
          <FadeIn>
            <div className="section-header">
              <p className="section-num">// 01 · About</p>
              <h2 className="section-title">Who I <em>Am</em></h2>
              <div className="rule" />
            </div>
          </FadeIn>
          <div className="about-layout">
            <FadeIn>
              <div className="photo-frame">
                <div className="photo-inner">
                  {/* REPLACE: change false → true and set src="/images/profile.jpg" */}
                  {true ? (
                    <img src="/public/images/about_me.jpg" alt="Jeremiah Dixon" />
                  ) : (
                    <div className="photo-placeholder">
                      <span>👤</span>
                      <span style={{ fontSize: "0.62rem", opacity: 0.4 }}>src="/images/profile.jpg"</span>
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={150}>
              <div className="about-body">
                <p>
                  I'm a recent <strong>Physics graduate from the University of Oklahoma</strong> (2024) with a strong foundation in mechanics, electromagnetism, thermodynamics, and quantum mechanics — complemented by hands-on experience in computational modeling and scientific data analysis.
                </p>
                <p>
                  My senior project involved building <em>Python-based models</em> to study heat diffusion in layered materials, producing visualizations that were presented to a faculty review panel. This experience directly maps to <strong>ParaView-based scientific visualization</strong> workflows — rendering, analyzing, and communicating complex simulation datasets.
                </p>
                <p>
                  Through my <strong>Boeing internship</strong> and university research role, I've applied physics and programming to real engineering problems — from structural performance review to thermal simulation validation. I'm passionate about the intersection of <em>scientific computation</em> and emerging AI research.
                </p>
                <div className="timeline">
                  {TIMELINE.map((t, i) => (
                    <div className="tl-item" key={i}>
                      <div className="tl-year">{t.year}</div>
                      <div className="tl-content">
                        <div className="tl-title">{t.title}</div>
                        <div className="tl-detail">{t.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="section-inner">
          <FadeIn>
            <div className="section-header">
              <p className="section-num">// 02 · Expertise</p>
              <h2 className="section-title">Skills & <em>Tools</em></h2>
              <div className="rule" />
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="cat-chips">
              {Object.entries(categoryColors).map(([cat, color]) => (
                <span key={cat} className="cat-chip" style={{ borderColor: color, color }}>{cat}</span>
              ))}
            </div>
          </FadeIn>
          <div className="skills-layout">
            {SKILLS.map((s, i) => <SkillBar key={s.name} skill={s} delay={i * 70} />)}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="section-inner">
          <FadeIn>
            <div className="section-header">
              <p className="section-num">// 03 · Work</p>
              <h2 className="section-title">Key <em>Projects</em></h2>
              <div className="rule" />
            </div>
          </FadeIn>
          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="proj-card">
                  <div className="proj-body">
                    <p className="proj-employer">{p.employer}</p>
                    <h3 className="proj-title">{p.title}</h3>
                    <p className="proj-desc">{p.description}</p>
                    <div className="proj-tags">
                      {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="section-inner">
          <FadeIn>
            <div className="section-header">
              <p className="section-num">// 04 · Contact</p>
              <h2 className="section-title">Get In <em>Touch</em></h2>
              <div className="rule" />
            </div>
          </FadeIn>
          <div className="contact-layout">
            <FadeIn>
              <div>
                <p className="contact-blurb">
                  Interested in scientific visualization, AI research collaboration, or entry-level physics and engineering roles. Open to full-time positions and project-based opportunities.
                </p>
                <div className="c-item">
                  <div className="c-icon">✉️</div>
                  <div>
                    <div className="c-label">Email</div>
                    <div className="c-value"><a href="mailto:jeremiahdixon1121@outlook.com">jeremiahdixon1121@outlook.com</a></div>
                  </div>
                </div>
                <div className="c-item">
                  <div className="c-icon">📍</div>
                  <div>
                    <div className="c-label">Location</div>
                    <div className="c-value">1316 SW 81st Pl, Oklahoma City, OK 73159</div>
                  </div>
                </div>
                <div className="c-item">
                  <div className="c-icon">🎓</div>
                  <div>
                    <div className="c-label">Education</div>
                    <div className="c-value">B.S. Physics · University of Oklahoma · 2024</div>
                  </div>
                </div>
                <div className="c-item">
                  <div className="c-icon">🔭</div>
                  <div>
                    <div className="c-label">Focus Areas</div>
                    <div className="c-value">ParaView · Scientific Visualization · AI Research</div>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={150}>
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input className="form-input" type="text" required placeholder="Your name"
                    value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input className="form-input" type="email" required placeholder="your@email.com"
                    value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-textarea" required placeholder="Your message..."
                    value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                </div>
                <button className={`form-btn ${submitted ? "sent" : ""}`} type="submit">
                  {submitted ? "✓ Message Sent!" : "Send Message →"}
                </button>
              </form>
            </FadeIn>
          </div>
        </div>
      </section>

      <footer>
        <span>© 2025 JEREMIAH DIXON · PHYSICS GRADUATE · OKLAHOMA CITY, OK</span>
      </footer>
    </>
  );
}
