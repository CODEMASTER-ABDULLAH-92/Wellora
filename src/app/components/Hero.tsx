"use client";
import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectDark } from "../../lib/features/theme/themeSlice";
import {
  Heart, Star, Shield, Zap, ArrowRight, Play, X, Video,
} from "lucide-react";

// ─── Static data ──────────────────────────────────────────────────────────────

const STATS = [
  { value: "50K+", label: "Patients Helped", icon: Heart },
  { value: "98%",  label: "Satisfaction Rate", icon: Star },
  { value: "200+", label: "Verified Doctors", icon: Shield },
  { value: "24/7", label: "AI Support", icon: Zap },
];

const TRUST_BADGES = [
  "HIPAA Compliant",
  "ISO 27001 Certified",
  "AMA Accredited",
];

const AMBIENT_CARDS = [
  { emoji: "🧠", title: "Mental Clarity",  sub: "Session complete",   pos: { top: "18%",    left: "-8%" } },
  { emoji: "💤", title: "Sleep Score",     sub: "8.2 hrs · Excellent", pos: { bottom: "15%", left: "-6%" } },
  { emoji: "🥗", title: "Nutrition Plan",  sub: "Updated for you",    pos: { top: "12%",    right: "-7%" } },
];

const SIDEBAR_ITEMS = ["Dashboard", "Therapy", "Nutrition", "Wellness", "Medical"];

const METRICS = [
  { label: "Heart Rate",     value: "72 bpm", delta: "↑ 2%" },
  { label: "Sleep Quality",  value: "8.2 hrs", delta: "Excellent" },
  { label: "Stress Level",   value: "Low",     delta: "↓ 18%" },
];

// ─── Particle canvas ──────────────────────────────────────────────────────────

function ParticleCanvas({ dark }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W = (canvas.width  = canvas.offsetWidth);
    let H = (canvas.height = canvas.offsetHeight);
    const onResize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    const pts = Array.from({ length: 60 }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r:  Math.random() * 1.5 + 0.5,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const dotAlpha  = dark ? 0.35 : 0.20;
      const lineAlpha = dark ? 0.12 : 0.07;

      for (const p of pts) {
        p.x = (p.x + p.vx + W) % W;
        p.y = (p.y + p.vy + H) % H;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(204,120,92,${dotAlpha})`;
        ctx.fill();
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(204,120,92,${lineAlpha * (1 - d / 100)})`;
            ctx.lineWidth   = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [dark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

// ─── Dashboard mockup ─────────────────────────────────────────────────────────

function DashboardMockup({ dark }) {
  const border      = dark ? "border-white/[0.08]"      : "border-black/[0.07]";
  const text        = dark ? "text-[#ece9e4]"           : "text-[#201f1c]";
  const muted       = dark ? "text-[#8c8b84]"           : "text-[#6b6960]";
  const cardBg      = dark ? "bg-white/[0.04]"          : "bg-black/[0.03]";
  const cardBgStr   = dark ? "bg-[#131211]/80"          : "bg-white/80";

  return (
    <div
      className={`relative w-full rounded-3xl border ${border} ${cardBgStr} backdrop-blur-xl overflow-hidden`}
      style={{
        boxShadow: dark
          ? "0 40px 120px -20px rgba(0,0,0,0.8), 0 0 0 0.5px rgba(255,255,255,0.06)"
          : "0 40px 120px -20px rgba(0,0,0,0.12), 0 0 0 0.5px rgba(0,0,0,0.06)",
      }}
    >
      {/* Browser chrome */}
      <div className={`flex items-center gap-2 px-5 py-3.5 border-b ${border}`}>
        <div className="flex gap-1.5">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <div className={`flex-1 mx-4 px-3 py-1 rounded-lg text-[11px] ${muted} border ${border} ${cardBg} text-center`}>
          orva.health/dashboard
        </div>
        <div className="flex gap-2">
          <div className={`w-6 h-6 rounded-md ${cardBg} border ${border}`} />
          <div className={`w-6 h-6 rounded-md ${cardBg} border ${border}`} />
        </div>
      </div>

      {/* Content grid */}
      <div className="p-6 grid grid-cols-12 gap-4">

        {/* Sidebar */}
        <div className="col-span-3 flex flex-col gap-3">
          <div className={`p-3 rounded-2xl ${cardBg} border ${border}`}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#cc785c] to-[#b5613e] flex items-center justify-center text-white text-xs font-bold shrink-0">
                A
              </div>
              <div>
                <div className={`text-[12px] font-medium ${text}`}>Alex Morgan</div>
                <div className={`text-[10px] ${muted}`}>Premium Member</div>
              </div>
            </div>
            {SIDEBAR_ITEMS.map((item, i) => (
              <div
                key={item}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] font-medium mb-0.5 ${
                  i === 0 ? "bg-[#cc785c]/15 text-[#cc785c]" : muted
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${i === 0 ? "bg-[#cc785c]" : "bg-transparent"}`} />
                {item}
              </div>
            ))}
          </div>

          {/* Goal progress */}
          <div className={`p-3 rounded-2xl ${cardBg} border ${border}`}>
            <div className={`text-[10px] font-semibold uppercase tracking-widest ${muted} mb-2`}>Today's Goal</div>
            <div className={`text-[13px] font-semibold ${text} mb-1`}>Stay Mindful</div>
            <div className={`w-full h-1.5 rounded-full mb-1 ${dark ? "bg-white/10" : "bg-black/10"}`}>
              <div className="h-full rounded-full bg-gradient-to-r from-[#cc785c] to-[#e8956d]" style={{ width: "68%" }} />
            </div>
            <div className={`text-[10px] ${muted}`}>68% complete</div>
          </div>
        </div>

        {/* Main panel */}
        <div className="col-span-9 flex flex-col gap-4">

          {/* Metric cards */}
          <div className="grid grid-cols-3 gap-3">
            {METRICS.map(({ label, value, delta }) => (
              <div key={label} className={`p-3 rounded-2xl ${cardBg} border ${border}`}>
                <div className={`text-[10px] ${muted} mb-1`}>{label}</div>
                <div className={`text-[15px] font-semibold font-display ${text}`}>{value}</div>
                <div className="text-[10px] text-emerald-400 font-medium">{delta}</div>
              </div>
            ))}
          </div>

          {/* Wellness trend chart */}
          <div className={`p-4 rounded-2xl ${cardBg} border ${border}`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`text-[12px] font-semibold ${text}`}>Wellness Trend</div>
              <div className={`text-[10px] ${muted}`}>Last 7 days</div>
            </div>
            <svg viewBox="0 0 400 80" className="w-full h-16">
              <defs>
                <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#cc785c" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#cc785c" stopOpacity="0"   />
                </linearGradient>
              </defs>
              <path
                d="M0,60 C40,50 80,30 120,35 S200,20 240,15 S320,25 400,10"
                fill="none" stroke="#cc785c" strokeWidth="2" strokeLinecap="round"
              />
              <path
                d="M0,60 C40,50 80,30 120,35 S200,20 240,15 S320,25 400,10 L400,80 L0,80 Z"
                fill="url(#wg)"
              />
              {[0, 80, 160, 240, 320, 400].map((x, i) => (
                <circle key={x} cx={x} cy={[60, 50, 30, 35, 25, 10][i]} r="3" fill="#cc785c" />
              ))}
            </svg>
          </div>

          {/* Upcoming session */}
          <div className={`flex items-center gap-4 p-4 rounded-2xl ${cardBg} border ${border}`}>
            <div className="w-10 h-10 rounded-xl bg-[#cc785c]/15 flex items-center justify-center shrink-0">
              <Video className="w-4.5 h-4.5 text-[#cc785c]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-[12px] font-semibold ${text}`}>Therapy Session with Dr. Sarah Chen</div>
              <div className={`text-[10px] ${muted}`}>Today · 3:00 PM · 50 min</div>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#cc785c]/15 text-[#cc785c] text-[10px] font-semibold whitespace-nowrap">
              Join Now
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

export default function HeroSection() {
  // ✅ Reads theme from Redux — no prop drilling needed
  const dark = useSelector(selectDark);
  const [videoVisible, setVideoVisible] = useState(false);

  // Apply body background on theme change
  useEffect(() => {
    document.documentElement.style.background = dark ? "#0a0a0a" : "#faf9f5";
  }, [dark]);

  // Token aliases
  const bg         = dark ? "bg-[#0a0a0a]"         : "bg-[#faf9f5]";
  const text        = dark ? "text-[#ece9e4]"        : "text-[#201f1c]";
  const muted       = dark ? "text-[#8c8b84]"        : "text-[#6b6960]";
  const border      = dark ? "border-white/[0.08]"   : "border-black/[0.07]";
  const cardBg      = dark ? "bg-white/[0.04]"       : "bg-black/[0.03]";
  const cardBgStr   = dark ? "bg-[#131211]/80"       : "bg-white/80";
  const pillBg      = dark
    ? "bg-[#cc785c]/[0.12] border-[#cc785c]/20"
    : "bg-[#cc785c]/[0.08] border-[#cc785c]/15";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', Georgia, serif; }
        .font-body    { font-family: 'Inter', -apple-system, sans-serif; }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float0 { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-10px)} }
        @keyframes float1 { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-8px)}  }
        @keyframes float2 { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-12px)} }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; }
        }
      `}</style>

      <section
        className={`font-body relative min-h-screen ${bg} overflow-hidden flex flex-col items-center justify-center transition-colors duration-500`}
        style={{ paddingTop: 120, paddingBottom: 80 }}
      >
        {/* Particle background */}
        <ParticleCanvas dark={dark} />

        {/* Radial warm glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: dark
              ? "radial-gradient(ellipse 70% 50% at 50% 20%, rgba(204,120,92,0.08) 0%, transparent 70%)"
              : "radial-gradient(ellipse 70% 50% at 50% 20%, rgba(204,120,92,0.06) 0%, transparent 70%)",
          }}
        />

        {/* ── Content ── */}
        <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-5xl mx-auto w-full">

          {/* Eyebrow pill */}
          <span
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-widest uppercase mb-8 ${pillBg} text-[#cc785c]`}
            style={{ animation: "fadeSlideUp 0.6s ease-out both" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#cc785c] animate-pulse inline-block" />
            AI-Powered Health &amp; Wellness Platform
          </span>

          {/* Headline */}
          <h1
            className={`font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.06] tracking-[-0.02em] ${text} mb-6`}
            style={{ animation: "fadeSlideUp 0.7s ease-out 0.1s both" }}
          >
            Your health journey,
            <br />
            <span
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundImage: "linear-gradient(135deg,#cc785c 0%,#e8956d 40%,#b5613e 100%)",
                backgroundClip: "text",
              }}
            >
              guided by AI.
            </span>
          </h1>

          {/* Sub-headline */}
          <p
            className={`text-lg sm:text-xl leading-relaxed max-w-2xl ${muted} mb-10`}
            style={{ animation: "fadeSlideUp 0.7s ease-out 0.2s both" }}
          >
            Orva combines expert therapists, certified nutritionists, and verified doctors — all
            amplified by an AI that learns your rhythms, so every recommendation feels like it was
            made just for you.
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row items-center gap-3 mb-14"
            style={{ animation: "fadeSlideUp 0.7s ease-out 0.3s both" }}
          >
            <a
              href="/book"
              className="flex items-center gap-2 pl-6 pr-5 py-3.5 rounded-full text-[15px] font-semibold text-white no-underline transition-all duration-200 hover:scale-[1.03] active:scale-95 group shadow-[0_12px_32px_-8px_rgba(204,120,92,0.6)] hover:shadow-[0_16px_40px_-8px_rgba(204,120,92,0.75)]"
              style={{ background: "linear-gradient(135deg,#cc785c 0%,#b5613e 100%)" }}
            >
              Start Your Journey
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <button
              onClick={() => setVideoVisible(true)}
              className={`flex items-center gap-2.5 px-5 py-3.5 rounded-full text-[15px] font-medium ${text} border ${border} ${cardBg} backdrop-blur-sm hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer bg-transparent`}
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#cc785c]/20 shrink-0">
                <Play className="w-3 h-3 text-[#cc785c] fill-current translate-x-px" />
              </span>
              Watch How It Works
            </button>
          </div>

          {/* Trust badges */}
          <div
            className="flex flex-wrap items-center justify-center gap-3 mb-16"
            style={{ animation: "fadeSlideUp 0.7s ease-out 0.4s both" }}
          >
            {TRUST_BADGES.map((b) => (
              <span
                key={b}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-[11.5px] font-medium ${muted} ${border} ${cardBg}`}
              >
                <Shield className="w-3 h-3 text-[#cc785c]" />
                {b}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl mb-16"
            style={{ animation: "fadeSlideUp 0.7s ease-out 0.5s both" }}
          >
            {STATS.map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className={`flex flex-col items-center gap-1 py-5 px-4 rounded-2xl border ${border} ${cardBg} backdrop-blur-sm transition-all duration-200 hover:scale-[1.03]`}
              >
                <Icon className="w-[18px] h-[18px] text-[#cc785c] mb-1" strokeWidth={1.8} />
                <span className={`font-display text-2xl font-semibold ${text}`}>{value}</span>
                <span className={`text-[11px] font-medium tracking-wide uppercase ${muted}`}>{label}</span>
              </div>
            ))}
          </div>

          {/* Dashboard mockup + floating cards */}
          <div
            className="relative w-full max-w-4xl"
            style={{ animation: "fadeSlideUp 0.9s ease-out 0.6s both" }}
          >
            <DashboardMockup dark={dark} />

            {/* Floating ambient cards */}
            {AMBIENT_CARDS.map(({ emoji, title, sub, pos }, i) => (
              <div
                key={title}
                className={`absolute ${cardBgStr} backdrop-blur-xl border ${border} rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl`}
                style={{
                  ...pos,
                  animation: `float${i} 4s ease-in-out ${i * 1.2}s infinite`,
                  minWidth: 160,
                }}
              >
                <span className="text-xl" role="img" aria-label={title}>{emoji}</span>
                <div>
                  <div className={`text-[12px] font-semibold ${text}`}>{title}</div>
                  <div className={`text-[10px] ${muted}`}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video modal */}
      {videoVisible && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setVideoVisible(false)}
        >
          <div
            className={`relative w-full max-w-3xl rounded-3xl overflow-hidden border ${border}`}
            style={{ aspectRatio: "16/9", background: "#0a0a0a" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#cc785c]/20 flex items-center justify-center">
                <Play className="w-8 h-8 text-[#cc785c] fill-current translate-x-0.5" />
              </div>
              <p className="text-white/60 text-sm">Video preview · 2 min 30 sec</p>
            </div>
            <button
              onClick={() => setVideoVisible(false)}
              aria-label="Close video"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center cursor-pointer border-none"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}