// "use client";
// import { useEffect, useRef } from "react";
// import { useSelector } from "react-redux";
// import { selectDark } from "../../lib/features/theme/themeSlice";
// import { ArrowRight } from "lucide-react";

// interface NutritionCard {
//   icon: string;
//   tag: string;
//   heading: string;
//   explanation: string;
//   pill: string;
//   ctaLabel: string;
// }

// const NUTRITION_CARDS: NutritionCard[] = [
//   {
//     icon: "🤖",
//     tag: "AI-Powered",
//     heading: "AI Meal Plan",
//     explanation:
//       "Your personal AI chef — generates weekly meal plans that adapt to your caloric needs, allergies, and food preferences automatically.",
//     pill: "✦ Personalised daily",
//     ctaLabel: "Explore",
//   },
//   {
//     icon: "🥗",
//     tag: "Certified",
//     heading: "Diet Program",
//     explanation:
//       "Choose from medically reviewed programs — keto, Mediterranean, plant-based, and more — each guided by a registered dietitian.",
//     pill: "✦ 12+ programs",
//     ctaLabel: "Browse",
//   },
//   {
//     icon: "📊",
//     tag: "Real-time",
//     heading: "Track Nutrition",
//     explanation:
//       "Log meals in seconds and watch your macros, vitamins, and hydration update in real time — with smart suggestions when you're off track.",
//     pill: "✦ 2M+ food database",
//     ctaLabel: "Start tracking",
//   },
//   {
//     icon: "👨‍🍳",
//     tag: "Curated",
//     heading: "Healthy Recipes",
//     explanation:
//       "Discover hundreds of nutritionist-approved recipes filtered by prep time, cuisine, and your current diet plan — with full macro breakdowns.",
//     pill: "✦ New weekly drops",
//     ctaLabel: "View recipes",
//   },
// ];

// export default function Diet() {
//   const dark = useSelector(selectDark);
//   const sectionRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const section = sectionRef.current;
//     if (!section) return;
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           section.classList.add("in-view");
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.1 }
//     );
//     observer.observe(section);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap');
//         .font-display { font-family: 'Fraunces', Georgia, serif; }
//         .font-body    { font-family: 'Inter', -apple-system, sans-serif; }

//         @keyframes fadeSlideDown {
//           from { opacity: 0; transform: translateY(-14px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes fadeSlideUp {
//           from { opacity: 0; transform: translateY(28px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes cardReveal {
//           from { opacity: 0; transform: translateY(44px) scale(0.96); }
//           to   { opacity: 1; transform: translateY(0) scale(1); }
//         }
//         @keyframes lineGrow {
//           from { width: 0; opacity: 0; }
//           to   { width: 48px; opacity: 1; }
//         }
//         @keyframes shimmer {
//           0%   { background-position: -200% center; }
//           100% { background-position: 200% center; }
//         }
//         @keyframes glowPulse {
//           0%, 100% { box-shadow: 0 0 0 0 rgba(204,120,92,0); }
//           50%       { box-shadow: 0 0 20px 3px rgba(204,120,92,0.22); }
//         }
//         @keyframes iconFloat {
//           0%, 100% { transform: translateY(0); }
//           50%       { transform: translateY(-5px); }
//         }

//         /* ── Gradient text ── */
//         .diet-gradient-text {
//           background: linear-gradient(135deg, #cc785c 0%, #e8956d 40%, #b5613e 100%);
//           background-size: 200% auto;
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           color: #cc785c;
//         }
//         .in-view .diet-gradient-text {
//           animation: shimmer 3.5s linear 0.8s infinite;
//         }

//         /* ── Header animations ── */
//         .diet-eyebrow  { opacity: 0; transform: translateY(-14px); }
//         .diet-headline { opacity: 0; transform: translateY(28px); }
//         .diet-sub      { opacity: 0; transform: translateY(20px); }
//         .diet-divider  { width: 0; opacity: 0; }

//         .in-view .diet-eyebrow  { animation: fadeSlideDown 0.55s ease-out 0.05s both; }
//         .in-view .diet-headline { animation: fadeSlideUp 0.65s ease-out 0.18s both; }
//         .in-view .diet-sub      { animation: fadeSlideUp 0.65s ease-out 0.30s both; }
//         .in-view .diet-divider  { animation: lineGrow    0.50s ease-out 0.46s both; }

//         /* ── Card stagger ── */
//         .diet-card {
//           opacity: 0;
//           transform: translateY(44px) scale(0.96);
//           transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
//           position: relative;
//           overflow: hidden;
//         }
//         .in-view .diet-card:nth-child(1) { animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.42s both; }
//         .in-view .diet-card:nth-child(2) { animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.54s both; }
//         .in-view .diet-card:nth-child(3) { animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.66s both; }
//         .in-view .diet-card:nth-child(4) { animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.78s both; }

//         /* ── Top accent line ── */
//         .diet-card::before {
//           content: '';
//           position: absolute; top: 0; left: 0; right: 0; height: 2px;
//           background: linear-gradient(90deg, #cc785c, #e8956d);
//           transform: scaleX(0);
//           transform-origin: left;
//           transition: transform 0.35s ease;
//         }
//         .diet-card:hover::before { transform: scaleX(1); }

//         /* ── Card hover lift ── */
//         .diet-card:hover {
//           transform: translateY(-7px) !important;
//           border-color: rgba(204,120,92,0.42) !important;
//           box-shadow: 0 24px 52px -12px rgba(204,120,92,0.18),
//                       0 8px 24px -8px rgba(0,0,0,0.08) !important;
//         }
//         .diet-card:hover .diet-icon { animation: iconFloat 1.8s ease-in-out infinite; }
//         .diet-card:hover .diet-cta-arrow { transform: translateX(4px); }

//         /* ── Icon ── */
//         .diet-icon { transition: background 0.25s ease; }
//         .diet-card:hover .diet-icon { background: rgba(204,120,92,0.18) !important; }

//         /* ── CTA arrow ── */
//         .diet-cta-arrow { transition: transform 0.2s ease; }

//         /* ── Pulse dot ── */
//         .diet-pulse { animation: glowPulse 2.4s ease-in-out infinite; }

//         @media (prefers-reduced-motion: reduce) {
//           *, *::before, *::after {
//             animation-duration: 0.01ms !important;
//             transition-duration: 0.01ms !important;
//           }
//         }
//       `}</style>

//       <section
//         ref={sectionRef}
//         className="font-body py-20 sm:py-28 px-4 sm:px-6 transition-colors duration-500"
//         style={{ background: dark ? "#0a0a0a" : "#faf9f5" }}
//       >
//         <div className="max-w-5xl mx-auto">

//           {/* ── Header ── */}
//           <div className="text-center mb-12 sm:mb-16">

//             {/* Eyebrow */}
//             <div className="diet-eyebrow inline-flex items-center gap-2 mb-5">
//               <span className="diet-pulse w-1.5 h-1.5 rounded-full bg-[#cc785c] inline-block" />
//               <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#cc785c]">
//                 Nutrition &amp; Diet
//               </span>
//             </div>

//             {/* Headline */}
//             <h2
//               className="diet-headline font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-[-0.02em] mb-4"
//               style={{ color: dark ? "#ece9e4" : "#201f1c" }}
//             >
//               Eat smarter,{" "}
//               <span className="diet-gradient-text">feel better.</span>
//             </h2>

//             {/* Sub */}
//             <p
//               className="diet-sub text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-6"
//               style={{ color: dark ? "#8c8b84" : "#6b6960" }}
//             >
//               Science-backed nutrition plans designed around your body, goals, and taste — not a generic template.
//             </p>

//             {/* Divider */}
//             <div
//               className="diet-divider h-0.5 rounded-full mx-auto"
//               style={{ background: "linear-gradient(90deg, #cc785c, transparent)" }}
//             />
//           </div>

//           {/* ── 2×2 Grid ── */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
//             {NUTRITION_CARDS.map(({ icon, tag, heading, explanation, pill, ctaLabel }) => (
//               <div
//                 key={heading}
//                 className="diet-card flex flex-col gap-4 rounded-2xl sm:rounded-3xl p-6 sm:p-7"
//                 style={{
//                   border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.07)",
//                   background: dark ? "#131211" : "#ffffff",
//                   boxShadow: dark
//                     ? "0 8px 32px -8px rgba(0,0,0,0.55)"
//                     : "0 8px 32px -8px rgba(0,0,0,0.07)",
//                 }}
//               >
//                 {/* Top row */}
//                 <div className="flex items-start justify-between">
//                   <div
//                     className="diet-icon w-12 h-12 rounded-2xl flex items-center justify-center text-[22px] shrink-0"
//                     style={{ background: "rgba(204,120,92,0.10)" }}
//                   >
//                     {icon}
//                   </div>
//                   <span
//                     className="text-[10px] font-semibold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full"
//                     style={{
//                       color: "#cc785c",
//                       background: "rgba(204,120,92,0.10)",
//                     }}
//                   >
//                     {tag}
//                   </span>
//                 </div>

//                 {/* Title */}
//                 <h3
//                   className="font-display text-lg sm:text-xl font-semibold leading-snug"
//                   style={{ color: dark ? "#ece9e4" : "#201f1c" }}
//                 >
//                   {heading}
//                 </h3>

//                 {/* Description */}
//                 <p
//                   className="text-sm leading-relaxed flex-1"
//                   style={{ color: dark ? "#8c8b84" : "#6b6960" }}
//                 >
//                   {explanation}
//                 </p>

//                 {/* Footer */}
//                 <div
//                   className="flex items-center justify-between pt-4"
//                   style={{
//                     borderTop: dark
//                       ? "1px solid rgba(255,255,255,0.07)"
//                       : "1px solid rgba(0,0,0,0.06)",
//                   }}
//                 >
//                   <span
//                     className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full"
//                     style={{
//                       color: dark ? "#8c8b84" : "#6b6960",
//                       background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
//                     }}
//                   >
//                     {pill}
//                   </span>
//                   <a
//                     href="/nutrition"
//                     className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold no-underline"
//                     style={{ color: "#cc785c" }}
//                   >
//                     {ctaLabel}
//                     <ArrowRight className="diet-cta-arrow w-3.5 h-3.5" />
//                   </a>
//                 </div>
//               </div>
//             ))}
//           </div>

//         </div>
//       </section>
//     </>
//   );
// }




"use client";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectDark } from "../../lib/features/theme/themeSlice";
import { ArrowRight } from "lucide-react";

interface LearningCard {
  icon: string;
  tag: string;
  heading: string;
  explanation: string;
  pill: string;
  ctaLabel: string;
}

const LEARNING_CARDS: LearningCard[] = [
  {
    icon: "🏗️",
    tag: "System Design",
    heading: "Scalable Architecture",
    explanation:
      "Master distributed systems, microservices, and cloud-native patterns used at FAANG — from load balancing to database sharding and caching strategies.",
    pill: "✦ 50+ design problems",
    ctaLabel: "Explore",
  },
  {
    icon: "📊",
    tag: "DSA Mastery",
    heading: "Algorithm Patterns",
    explanation:
      "Learn the 14 essential coding patterns — sliding window, two pointers, backtracking, DP, and more — to solve any LeetCode hard in under 30 minutes.",
    pill: "✦ 400+ curated problems",
    ctaLabel: "Practice",
  },
  {
    icon: "⚡",
    tag: "Optimization",
    heading: "Time & Space Complexity",
    explanation:
      "Understand Big O notation deeply, optimize your solutions, and learn to reason about performance trade-offs like a senior engineer at Google or Meta.",
    pill: "✦ 100+ complexity guides",
    ctaLabel: "Learn",
  },
  {
    icon: "🎯",
    tag: "Interview Prep",
    heading: "Mock Interviews",
    explanation:
      "Simulate real FAANG interviews with system design whiteboarding, DSA problem-solving, and behavioral rounds — complete with live feedback and scoring.",
    pill: "✦ 500+ mock sessions",
    ctaLabel: "Start practice",
  },
];

export default function Learning() {
  const dark = useSelector(selectDark);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("in-view");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', Georgia, serif; }
        .font-body    { font-family: 'Inter', -apple-system, sans-serif; }

        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(44px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes lineGrow {
          from { width: 0; opacity: 0; }
          to   { width: 48px; opacity: 1; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(204,120,92,0); }
          50%       { box-shadow: 0 0 20px 3px rgba(204,120,92,0.22); }
        }
        @keyframes iconFloat {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-5px); }
        }

        /* ── Gradient text ── */
        .learning-gradient-text {
          background: linear-gradient(135deg, #cc785c 0%, #e8956d 40%, #b5613e 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: #cc785c;
        }
        .in-view .learning-gradient-text {
          animation: shimmer 3.5s linear 0.8s infinite;
        }

        /* ── Header animations ── */
        .learning-eyebrow  { opacity: 0; transform: translateY(-14px); }
        .learning-headline { opacity: 0; transform: translateY(28px); }
        .learning-sub      { opacity: 0; transform: translateY(20px); }
        .learning-divider  { width: 0; opacity: 0; }

        .in-view .learning-eyebrow  { animation: fadeSlideDown 0.55s ease-out 0.05s both; }
        .in-view .learning-headline { animation: fadeSlideUp 0.65s ease-out 0.18s both; }
        .in-view .learning-sub      { animation: fadeSlideUp 0.65s ease-out 0.30s both; }
        .in-view .learning-divider  { animation: lineGrow    0.50s ease-out 0.46s both; }

        /* ── Card stagger ── */
        .learning-card {
          opacity: 0;
          transform: translateY(44px) scale(0.96);
          transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
          position: relative;
          overflow: hidden;
        }
        .in-view .learning-card:nth-child(1) { animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.42s both; }
        .in-view .learning-card:nth-child(2) { animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.54s both; }
        .in-view .learning-card:nth-child(3) { animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.66s both; }
        .in-view .learning-card:nth-child(4) { animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.78s both; }

        /* ── Top accent line ── */
        .learning-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, #cc785c, #e8956d);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }
        .learning-card:hover::before { transform: scaleX(1); }

        /* ── Card hover lift ── */
        .learning-card:hover {
          transform: translateY(-7px) !important;
          border-color: rgba(204,120,92,0.42) !important;
          box-shadow: 0 24px 52px -12px rgba(204,120,92,0.18),
                      0 8px 24px -8px rgba(0,0,0,0.08) !important;
        }
        .learning-card:hover .learning-icon { animation: iconFloat 1.8s ease-in-out infinite; }
        .learning-card:hover .learning-cta-arrow { transform: translateX(4px); }

        /* ── Icon ── */
        .learning-icon { transition: background 0.25s ease; }
        .learning-card:hover .learning-icon { background: rgba(204,120,92,0.18) !important; }

        /* ── CTA arrow ── */
        .learning-cta-arrow { transition: transform 0.2s ease; }

        /* ── Pulse dot ── */
        .learning-pulse { animation: glowPulse 2.4s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="font-body py-20 sm:py-28 px-4 sm:px-6 transition-colors duration-500"
        style={{ background: dark ? "#0a0a0a" : "#faf9f5" }}
      >
        <div className="max-w-5xl mx-auto">

          {/* ── Header ── */}
          <div className="text-center mb-12 sm:mb-16">

            {/* Eyebrow */}
            <div className="learning-eyebrow inline-flex items-center gap-2 mb-5">
              <span className="learning-pulse w-1.5 h-1.5 rounded-full bg-[#cc785c] inline-block" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#cc785c]">
                System Design &amp; DSA
              </span>
            </div>

            {/* Headline */}
            <h2
              className="learning-headline font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-[-0.02em] mb-4"
              style={{ color: dark ? "#ece9e4" : "#201f1c" }}
            >
              Think like a <br />
              <span className="learning-gradient-text">FAANG engineer.</span>
            </h2>

            {/* Sub */}
            <p
              className="learning-sub text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-6"
              style={{ color: dark ? "#8c8b84" : "#6b6960" }}
            >
              Master the fundamentals of scalable systems and algorithmic thinking — exactly what top-tier companies expect from their engineers.
            </p>

            {/* Divider */}
            <div
              className="learning-divider h-0.5 rounded-full mx-auto"
              style={{ background: "linear-gradient(90deg, #cc785c, transparent)" }}
            />
          </div>

          {/* ── 2×2 Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {LEARNING_CARDS.map(({ icon, tag, heading, explanation, pill, ctaLabel }) => (
              <div
                key={heading}
                className="learning-card flex flex-col gap-4 rounded-2xl sm:rounded-3xl p-6 sm:p-7"
                style={{
                  border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.07)",
                  background: dark ? "#131211" : "#ffffff",
                  boxShadow: dark
                    ? "0 8px 32px -8px rgba(0,0,0,0.55)"
                    : "0 8px 32px -8px rgba(0,0,0,0.07)",
                }}
              >
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div
                    className="learning-icon w-12 h-12 rounded-2xl flex items-center justify-center text-[22px] shrink-0"
                    style={{ background: "rgba(204,120,92,0.10)" }}
                  >
                    {icon}
                  </div>
                  <span
                    className="text-[10px] font-semibold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full"
                    style={{
                      color: "#cc785c",
                      background: "rgba(204,120,92,0.10)",
                    }}
                  >
                    {tag}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-display text-lg sm:text-xl font-semibold leading-snug"
                  style={{ color: dark ? "#ece9e4" : "#201f1c" }}
                >
                  {heading}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed flex-1"
                  style={{ color: dark ? "#8c8b84" : "#6b6960" }}
                >
                  {explanation}
                </p>

                {/* Footer */}
                <div
                  className="flex items-center justify-between pt-4"
                  style={{
                    borderTop: dark
                      ? "1px solid rgba(255,255,255,0.07)"
                      : "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <span
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full"
                    style={{
                      color: dark ? "#8c8b84" : "#6b6960",
                      background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                    }}
                  >
                    {pill}
                  </span>
                  <a
                    href="/learning"
                    className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold no-underline"
                    style={{ color: "#cc785c" }}
                  >
                    {ctaLabel}
                    <ArrowRight className="learning-cta-arrow w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}