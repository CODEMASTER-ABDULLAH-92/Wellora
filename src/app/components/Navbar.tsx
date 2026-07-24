"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { selectDark, toggleTheme } from "../../lib/features/theme/themeSlice";
import {
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  User,
  Code,
  Home,
  Users,
  Sparkles,
  Target,
  Activity,
  Database,
  Layers,
  Calendar,
  Video,
  FileText,
  Wind,
  Brain,
  Waves,
  Star,
  CalendarDays,
  Library,
  PenLine,
  Presentation,
  Award,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

interface DropItem {
  label: string;
  sub: string;
  href: string;
  icon: LucideIcon;
}

interface NavLink {
  label: string;
  href?: string;
  badge?: number;
  icon?: LucideIcon;
  dropdown?: DropItem[];
}

const NAV: NavLink[] = [
  {
    label: "DSA",
    dropdown: [
      { label: "Data Structures", sub: "Arrays, Trees, Graphs & more", href: "/dsa/structures", icon: Database },
      { label: "Algorithms", sub: "Sorting, Searching, DP & more", href: "/dsa/algorithms", icon: Code },
      { label: "Problem Solving", sub: "Curated LeetCode problems", href: "/dsa/problems", icon: Target },
      { label: "Pattern Recognition", sub: "14 essential coding patterns", href: "/dsa/patterns", icon: Sparkles },
    ],
  },
  {
    label: "System Design",
    dropdown: [
      { label: "Architecture Fundamentals", sub: "Scalability & reliability basics", href: "/design/fundamentals", icon: Home },
      { label: "Distributed Systems", sub: "Microservices & cloud patterns", href: "/design/distributed", icon: Layers },
      { label: "Case Studies", sub: "FAANG system designs", href: "/design/case-studies", icon: Activity },
      { label: "Design Problems", sub: "Design Twitter, Uber & more", href: "/design/problems", icon: Database },
    ],
  },
  {
    label: "Practice",
    dropdown: [
      { label: "Coding Challenges", sub: "Daily problem sets", href: "/practice/challenges", icon: Code },
      { label: "Mock Interviews", sub: "Real interview simulations", href: "/practice/interviews", icon: Video },
      { label: "Competitions", sub: "Weekly coding contests", href: "/practice/competitions", icon: Award },
      { label: "Performance Analytics", sub: "Track your progress", href: "/practice/analytics", icon: Activity },
    ],
  },
  {
    label: "AI Mentor",
    href: "/mentor",
    badge: 2,
  },
  {
    label: "Community",
    dropdown: [
      { label: "Study Groups", sub: "Learn with peers", href: "/community/groups", icon: Users },
      { label: "Success Stories", sub: "Hear from top engineers", href: "/community/stories", icon: Star },
      { label: "Events & Webinars", sub: "Live learning sessions", href: "/community/events", icon: CalendarDays },
    ],
  },
  {
    label: "Resources",
    dropdown: [
      { label: "Learning Library", sub: "Articles & guides", href: "/resources/library", icon: Library },
      { label: "Blog & Insights", sub: "Tech trends & tips", href: "/resources/blog", icon: PenLine },
      { label: "Video Lectures", sub: "Recorded sessions", href: "/resources/lectures", icon: Presentation },
      { label: "Certifications", sub: "Professional courses", href: "/resources/certifications", icon: Award },
    ],
  },
  {
    label: "Notifications",
    href: "/notifications",
    badge: 5,
  },
];

export default function Navbar() {
  // ✅ Redux — replaces: const [dark, setDark] = useState(true)
  const dark     = useSelector(selectDark);
  const dispatch = useDispatch();

  // Local UI state (these stay local — they're navbar-only concerns)
  const [openDrop,   setOpenDrop]   = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExp,  setMobileExp]  = useState<string | null>(null);
  const [scrolled,   setScrolled]   = useState(false);
  const [pill,       setPill]       = useState({ left: 0, width: 0, opacity: 0 });

  const navRef   = useRef<HTMLElement>(null);
  const listRef  = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenDrop(null);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpenDrop(null); setMobileOpen(false); }
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // ✅ Sync <html> background on theme change so no flash between sections
  useEffect(() => {
    document.documentElement.style.background = dark ? "#0a0a0a" : "#faf9f5";
  }, [dark]);

  const movePill = useCallback((label: string) => {
    const el   = itemRefs.current[label];
    const list = listRef.current;
    if (!el || !list) return;
    const er = el.getBoundingClientRect();
    const lr = list.getBoundingClientRect();
    setPill({ left: er.left - lr.left, width: er.width, opacity: 1 });
  }, []);

  const hidePill = useCallback(() => setPill((p) => ({ ...p, opacity: 0 })), []);

  // ── Design tokens (unchanged) ──────────────────────────────────────────────
  const bg          = dark ? "bg-[#0a0a0a]"                               : "bg-[#faf9f5]";
  const glassBg     = dark ? "bg-[#0a0a0a]/72 backdrop-blur-2xl"          : "bg-[#faf9f5]/72 backdrop-blur-2xl";
  const border      = dark ? "border-white/[0.08]"                         : "border-black/[0.07]";
  const text        = dark ? "text-[#ece9e4]"                              : "text-[#201f1c]";
  const muted       = dark ? "text-[#8c8b84]"                              : "text-[#8a887f]";
  const hoverBg     = dark ? "hover:bg-white/[0.06]"                       : "hover:bg-black/[0.045]";
  const activeBg    = dark ? "bg-white/[0.06]"                             : "bg-black/[0.045]";
  const dropBg      = dark ? "bg-[#131211]/95"                             : "bg-white/95";
  const mobileBg    = dark ? "bg-[#0a0a0a]/97"                             : "bg-[#faf9f5]/97";
  const shadowDrop  = dark
    ? "shadow-[0_20px_60px_-12px_rgba(0,0,0,0.85)]"
    : "shadow-[0_20px_60px_-12px_rgba(0,0,0,0.16)]";
  const chipBg      = dark ? "bg-[#cc785c]/15"                             : "bg-[#cc785c]/10";
  const chipText    = "text-[#cc785c]";
  const ringFocus   = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cc785c]/60";
  const pillColor   = dark ? "rgba(255,255,255,0.06)"                      : "rgba(0,0,0,0.045)";
  const ctaGradient = "linear-gradient(135deg, #cc785c 0%, #b5613e 100%)";
  const navHeight   = scrolled ? 64 : 76;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Fraunces', Georgia, 'Times New Roman', serif; }
        .font-body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
        @keyframes dropIn     { from { opacity: 0; transform: translate(-50%, -6px) scale(0.97); } to { opacity: 1; transform: translate(-50%, 0) scale(1); } }
        @keyframes fadeSlide  { from { opacity: 0; transform: translateX(-6px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeIn     { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <nav
        ref={navRef}
        className={`font-body fixed top-0 left-0 right-0 z-50 w-full border-b ${border} transition-all duration-500 ${
          scrolled ? glassBg : bg
        }`}
      >
        <div
          className="max-w-350 mx-auto px-6 flex items-center gap-1 transition-[height] duration-500 ease-out"
          style={{ height: navHeight }}
        >
          {/* ── Brand Logo ── */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="flex flex-col leading-tight">
              <span className={`font-display text-[17px] font-semibold tracking-tight ${dark ? "text-white" : "text-[#161513]"}`}>
                Algo.Design
              </span>
              <span className={`text-[10px] font-medium tracking-[0.18em] uppercase ${muted}`}>
                DSA & System Design
              </span>
            </div>
          </Link>

          {/* ── Desktop Navigation ── */}
          <ul
            ref={listRef}
            onMouseLeave={hidePill}
            className="hidden xl:flex items-center list-none flex-1 relative"
          >
            <div
              aria-hidden="true"
              className="absolute top-1/2 -translate-y-1/2 h-10 rounded-xl pointer-events-none transition-all duration-300 ease-out"
              style={{ left: pill.left, width: pill.width, opacity: pill.opacity, background: pillColor }}
            />

            {NAV.map((item) => (
              <li
                key={item.label}
                className="relative z-10"
                ref={(el) => { itemRefs.current[item.label] = el; }}
                onMouseEnter={() => movePill(item.label)}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13.5px] font-medium ${text} transition-colors duration-150 whitespace-nowrap ${ringFocus}`}
                  >
                    {item.icon && <item.icon className={`w-3.5 h-3.5 ${muted}`} strokeWidth={2} />}
                    {item.label}
                    {item.badge && (
                      <span className="relative ml-0.5 flex h-4 w-4 shrink-0">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-[#cc785c] opacity-60 animate-ping" />
                        <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#cc785c] text-white text-[9px] font-bold">
                          {item.badge}
                        </span>
                      </span>
                    )}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => setOpenDrop(openDrop === item.label ? null : item.label)}
                      aria-haspopup="true"
                      aria-expanded={openDrop === item.label}
                      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[13.5px] font-medium ${text} transition-colors duration-500 whitespace-nowrap border-none bg-transparent cursor-pointer ${ringFocus}`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-3.5 h-3.5 ${muted} transition-transform duration-300 ${
                          openDrop === item.label ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>

                    {openDrop === item.label && item.dropdown && (
                      <div
                        role="menu"
                        className={`absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 ${dropBg} backdrop-blur-xl border ${border} rounded-2xl p-2 min-w-75 ${shadowDrop} z-50`}
                        style={{ animation: "dropIn 0.2s ease-out both" }}
                      >
                        {item.dropdown.map((d, i) => (
                          <Link
                            key={d.label}
                            href={d.href}
                            role="menuitem"
                            onClick={() => setOpenDrop(null)}
                            style={{ animation: `fadeSlide 0.25s ease-out ${i * 0.04}s both` }}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${hoverBg} transition-colors duration-150 no-underline group/item`}
                          >
                            <span className={`flex items-center justify-center w-9 h-9 rounded-lg shrink-0 ${chipBg}`}>
                              <d.icon className={`w-4.5 h-4.5 ${chipText}`} strokeWidth={2} />
                            </span>
                            <span className="flex flex-col gap-0.5 min-w-0">
                              <span className={`text-[13.5px] font-medium ${text}`}>{d.label}</span>
                              <span className={`text-[11.5px] ${muted} truncate`}>{d.sub}</span>
                            </span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 ${muted} -rotate-90 ml-auto opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200 shrink-0`}
                            />
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>

          {/* ── Right Controls ── */}
          <div className="flex items-center gap-2.5 ml-auto shrink-0">

            {/* ✅ Theme toggle — dispatches to Redux instead of local setState */}
            <button
              onClick={() => dispatch(toggleTheme())}
              aria-label="Toggle theme"
              className={`relative w-10 h-10 rounded-xl border ${border} overflow-hidden ${hoverBg} transition-all duration-200 cursor-pointer bg-transparent hover:scale-105 active:scale-95 ${ringFocus}`}
            >
              <Sun
                className={`absolute inset-0 m-auto w-[18px] h-[18px] text-[#cc785c] transition-all duration-500 ${
                  dark ? "opacity-0 -rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
                }`}
              />
              <Moon
                className={`absolute inset-0 m-auto w-[18px] h-[18px] text-[#cc785c] transition-all duration-500 ${
                  dark ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"
                }`}
              />
            </button>

            {/* Profile */}
            <Link
              href="/profile"
              className={`w-10 h-10 rounded-xl border ${border} flex items-center justify-center ${hoverBg} transition-all duration-200 hover:scale-105 active:scale-95 bg-transparent ${ringFocus}`}
            >
              <User className={`w-[18px] h-[18px] ${text}`} strokeWidth={1.8} />
            </Link>

            {/* CTA Button */}
            <Link
              href="/practice"
              className={`hidden lg:flex items-center gap-1.5 pl-5 pr-4 py-2.5 rounded-full text-[13.5px] font-semibold text-white transition-all duration-200 hover:scale-[1.03] active:scale-95 whitespace-nowrap no-underline shadow-[0_8px_24px_-6px_rgba(204,120,92,0.55)] hover:shadow-[0_10px_32px_-6px_rgba(204,120,92,0.7)] group ${ringFocus}`}
              style={{ background: ctaGradient }}
            >
              Start Practice
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className={`xl:hidden w-10 h-10 rounded-xl border ${border} flex items-center justify-center ${text} ${hoverBg} bg-transparent cursor-pointer transition-all duration-200 hover:scale-105 ${ringFocus}`}
            >
              {mobileOpen ? <X className="w-[18px] h-[18px]" /> : <Menu className="w-[18px] h-[18px]" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div
          className={`xl:hidden fixed left-0 right-0 bottom-0 z-40 ${mobileBg} backdrop-blur-2xl overflow-y-auto flex flex-col gap-1 px-4 py-4 pb-10`}
          style={{ top: navHeight, animation: "fadeIn 0.2s ease-out" }}
          role="navigation"
          aria-label="Mobile navigation"
        >
          {NAV.map((item, idx) => (
            <div key={item.label} style={{ animation: `fadeSlideUp 0.3s ease-out ${idx * 0.05}s both` }}>
              {item.href ? (
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-medium ${text} ${hoverBg} transition-all duration-150 no-underline`}
                >
                  {item.icon && <item.icon className={`w-4.5 h-4.5 ${muted}`} />}
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="w-6 h-6 rounded-full bg-[#cc785c] text-white text-[11px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => setMobileExp(mobileExp === item.label ? null : item.label)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-medium ${text} bg-transparent border-none cursor-pointer transition-colors duration-150 ${
                      mobileExp === item.label ? activeBg : ""
                    }`}
                  >
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 ${muted} transition-transform duration-300 ${
                        mobileExp === item.label ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  <div
                    className="grid transition-all duration-300 ease-out"
                    style={{ gridTemplateRows: mobileExp === item.label ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div className="pl-4 flex flex-col gap-0.5 mt-1 pb-1">
                        {item.dropdown?.map((d) => (
                          <Link
                            key={d.label}
                            href={d.href}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl ${text} ${hoverBg} text-sm transition-all duration-150 no-underline`}
                          >
                            <span className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ${chipBg}`}>
                              <d.icon className={`w-4 h-4 ${chipText}`} />
                            </span>
                            <span className="flex flex-col">
                              <span className="font-medium text-[14px]">{d.label}</span>
                              <span className={`text-xs ${muted}`}>{d.sub}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}

          {/* Mobile CTA */}
          <Link
            href="/practice"
            onClick={() => setMobileOpen(false)}
            className="mt-6 py-4 rounded-2xl text-center text-[15px] font-semibold text-white no-underline block transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-[0_8px_24px_-6px_rgba(204,120,92,0.55)]"
            style={{ background: ctaGradient }}
          >
            Start Practicing Now
          </Link>

          {/* ✅ Mobile theme toggle — also dispatches to Redux */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className={`py-3.5 mt-2 rounded-2xl border ${border} bg-transparent text-sm font-medium ${text} flex items-center justify-center gap-2 cursor-pointer transition-all duration-150 hover:scale-[1.01]`}
          >
            {dark ? <Sun className="w-4 h-4 text-[#cc785c]" /> : <Moon className="w-4 h-4 text-[#cc785c]" />}
            {dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </div>
      )}
    </>
  );
}