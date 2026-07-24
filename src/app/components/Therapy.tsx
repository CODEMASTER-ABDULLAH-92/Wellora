// "use client";
// import { useEffect, useRef } from "react";
// import { useSelector } from "react-redux";
// import { selectDark } from "../../lib/features/theme/themeSlice";
// import Image, { StaticImageData } from "next/image";
// import { ArrowRight } from "lucide-react";
// import systemDesign from "../../../public/system-design.avif";
// import algorithms from "../../../public/algorithms.avif";
// import datastructures from "../../../public/datastructures.avif";

// interface CardItem {
//   image_url: StaticImageData;
//   heading: string;
//   explanation: string;
// }

// const CARD_DATA: CardItem[] = [
//   {
//     image_url: datastructures,
//     heading: "Data Structures",
//     explanation:
//       "Master arrays, linked lists, trees, graphs, and advanced structures — understand how to choose the right data structure for every problem.",
//   },
//   {
//     image_url: algorithms,
//     heading: "Algorithm Design",
//     explanation:
//       "Learn sorting, searching, dynamic programming, greedy algorithms, and graph traversal — optimize for time and space complexity like a pro.",
//   },
//   {
//     image_url: systemDesign,
//     heading: "System Architecture",
//     explanation:
//       "Design scalable, reliable, and maintainable systems. Study load balancing, caching, database sharding, and microservices patterns from FAANG engineers.",
//   },
// ];

// export default function LearningPaths() {
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
//       { threshold: 0.12 }
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
//           from { opacity: 0; transform: translateY(24px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes cardReveal {
//           from { opacity: 0; transform: translateY(44px) scale(0.96); }
//           to   { opacity: 1; transform: translateY(0) scale(1); }
//         }
//         @keyframes badgePop {
//           0%   { opacity: 0; transform: scale(0.5); }
//           70%  { transform: scale(1.18); }
//           100% { opacity: 1; transform: scale(1); }
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

//         .learning-gradient-text {
//           background: linear-gradient(135deg, #cc785c 0%, #e8956d 40%, #b5613e 100%);
//           background-size: 200% auto;
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           color: #cc785c; /* fallback */
//         }
//         .in-view .learning-gradient-text {
//           animation: shimmer 3.5s linear 0.8s infinite;
//         }

//         .learning-eyebrow { opacity: 0; transform: translateY(-14px); }
//         .in-view .learning-eyebrow { animation: fadeSlideDown 0.55s ease-out 0.05s both; }

//         .learning-headline { opacity: 0; transform: translateY(24px); }
//         .in-view .learning-headline { animation: fadeSlideUp 0.65s ease-out 0.18s both; }

//         .learning-sub { opacity: 0; transform: translateY(20px); }
//         .in-view .learning-sub { animation: fadeSlideUp 0.65s ease-out 0.3s both; }

//         .learning-divider { width: 0; opacity: 0; }
//         .in-view .learning-divider { animation: lineGrow 0.5s ease-out 0.46s both; }

//         .learning-card {
//           opacity: 0;
//           transform: translateY(44px) scale(0.96);
//           transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
//         }
//         .in-view .learning-card:nth-child(1) { animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.42s both; }
//         .in-view .learning-card:nth-child(2) { animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.58s both; }
//         .in-view .learning-card:nth-child(3) { animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.74s both; }

//         .learning-card:hover {
//           transform: translateY(-8px) !important;
//           border-color: rgba(204,120,92,0.48) !important;
//           box-shadow: 0 28px 60px -12px rgba(204,120,92,0.2), 0 8px 24px -8px rgba(0,0,0,0.1) !important;
//         }
//         .learning-card:hover .card-img-inner { transform: scale(1.05); }
//         .learning-card:hover .cta-arrow      { transform: translateX(4px); }
//         .learning-card:hover .card-cta       { gap: 8px; }

//         .card-img-inner { transition: transform 0.45s ease; }

//         .learning-badge { opacity: 0; }
//         .in-view .learning-card:nth-child(1) .learning-badge { animation: badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.92s both; }
//         .in-view .learning-card:nth-child(2) .learning-badge { animation: badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) 1.08s both; }
//         .in-view .learning-card:nth-child(3) .learning-badge { animation: badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) 1.24s both; }

//         .eyebrow-pulse { animation: glowPulse 2.4s ease-in-out infinite; }
//         .card-cta { transition: gap 0.2s ease; }
//         .cta-arrow { transition: transform 0.2s ease; }

//         @media (prefers-reduced-motion: reduce) {
//           *, *::before, *::after {
//             animation-duration: 0.01ms !important;
//             transition-duration: 0.01ms !important;
//           }
//         }
//       `}</style>

//       <section
//         ref={sectionRef}
//         className={`font-body ${dark ? "bg-[#0a0a0a]" : "bg-[#faf9f5]"} py-20 sm:py-28 px-4 sm:px-6 transition-colors duration-500`}
//       >
//         <div className="max-w-5xl mx-auto">

//           {/* ── Header ── */}
//           <div className="text-center mb-12 sm:mb-16">
//             <div className="learning-eyebrow inline-flex items-center gap-2 mb-5">
//               <span className="eyebrow-pulse w-1.5 h-1.5 rounded-full bg-[#cc785c] inline-block" />
//               <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#cc785c]">
//                 DSA & System Design
//               </span>
//             </div>

//             <h2
//               className="learning-headline font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-[-0.02em] mb-4"
//               style={{ color: dark ? "#ece9e4" : "#201f1c" }}
//             >
//               Master the fundamentals <br />
//               <span className="learning-gradient-text">of top-tier engineering.</span>
//             </h2>

//             <p
//               className="learning-sub text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-6"
//               style={{ color: dark ? "#8c8b84" : "#6b6960" }}
//             >
//               Every path is different. Our expert-curated content meets you exactly where you are
//               on your journey to becoming a world-class engineer.
//             </p>

//             <div
//               className="learning-divider h-0.5 rounded-full mx-auto"
//               style={{ background: "linear-gradient(90deg,#cc785c,transparent)" }}
//             />
//           </div>

//           {/* ── Cards ── */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
//             {CARD_DATA.map(({ image_url, heading, explanation }, index) => (
//               <div
//                 key={heading}
//                 className="learning-card flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden"
//                 style={{
//                   border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.07)",
//                   background: dark ? "#131211" : "#ffffff",
//                   boxShadow: dark
//                     ? "0 8px 32px -8px rgba(0,0,0,0.55)"
//                     : "0 8px 32px -8px rgba(0,0,0,0.09)",
//                 }}
//               >
//                 {/* Image */}
//                 <div className="relative w-full aspect-[4/3] overflow-hidden">
//                   <Image
//                     src={image_url}
//                     alt={heading}
//                     fill
//                     className="card-img-inner object-cover"
//                     sizes="(max-width: 640px) 100vw, 33vw"
//                   />
//                   <div
//                     className="absolute inset-0 pointer-events-none"
//                     style={{
//                       background: "linear-gradient(to top, rgba(0,0,0,0.22) 0%, transparent 55%)",
//                     }}
//                   />
//                   <span
//                     className="learning-badge absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
//                     style={{
//                       background: "rgba(204,120,92,0.88)",
//                       backdropFilter: "blur(6px)",
//                     }}
//                   >
//                     {String(index + 1).padStart(2, "0")}
//                   </span>
//                 </div>

//                 {/* Body */}
//                 <div className="flex flex-col flex-1 p-5 sm:p-6 gap-3">
//                   <h3
//                     className="font-display text-lg sm:text-xl font-semibold leading-snug"
//                     style={{ color: dark ? "#ece9e4" : "#201f1c" }}
//                   >
//                     {heading}
//                   </h3>
//                   <p
//                     className="text-sm leading-relaxed flex-1"
//                     style={{ color: dark ? "#8c8b84" : "#6b6960" }}
//                   >
//                     {explanation}
//                   </p>
//                   <a
//                     href="/practice"
//                     className="card-cta inline-flex items-center gap-1.5 text-[13px] font-semibold no-underline mt-1"
//                     style={{ color: "#cc785c" }}
//                   >
//                     Start learning
//                     <ArrowRight className="cta-arrow w-3.5 h-3.5" />
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
import { ArrowRight, Database, Code, Layers } from "lucide-react";

interface CardItem {
  icon: React.ReactNode;
  heading: string;
  explanation: string;
}

const CARD_DATA: CardItem[] = [
  {
    icon: <Database className="w-8 h-8" strokeWidth={1.5} />,
    heading: "Data Structures",
    explanation:
      "Master arrays, linked lists, trees, graphs, and advanced structures — understand how to choose the right data structure for every problem.",
  },
  {
    icon: <Code className="w-8 h-8" strokeWidth={1.5} />,
    heading: "Algorithm Design",
    explanation:
      "Learn sorting, searching, dynamic programming, greedy algorithms, and graph traversal — optimize for time and space complexity like a pro.",
  },
  {
    icon: <Layers className="w-8 h-8" strokeWidth={1.5} />,
    heading: "System Architecture",
    explanation:
      "Design scalable, reliable, and maintainable systems. Study load balancing, caching, database sharding, and microservices patterns from FAANG engineers.",
  },
];

export default function LearningPaths() {
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
      { threshold: 0.12 }
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
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(44px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes badgePop {
          0%   { opacity: 0; transform: scale(0.5); }
          70%  { transform: scale(1.18); }
          100% { opacity: 1; transform: scale(1); }
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
          50%       { transform: translateY(-6px); }
        }

        .learning-gradient-text {
          background: linear-gradient(135deg, #cc785c 0%, #e8956d 40%, #b5613e 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: #cc785c; /* fallback */
        }
        .in-view .learning-gradient-text {
          animation: shimmer 3.5s linear 0.8s infinite;
        }

        .learning-eyebrow { opacity: 0; transform: translateY(-14px); }
        .in-view .learning-eyebrow { animation: fadeSlideDown 0.55s ease-out 0.05s both; }

        .learning-headline { opacity: 0; transform: translateY(24px); }
        .in-view .learning-headline { animation: fadeSlideUp 0.65s ease-out 0.18s both; }

        .learning-sub { opacity: 0; transform: translateY(20px); }
        .in-view .learning-sub { animation: fadeSlideUp 0.65s ease-out 0.3s both; }

        .learning-divider { width: 0; opacity: 0; }
        .in-view .learning-divider { animation: lineGrow 0.5s ease-out 0.46s both; }

        .learning-card {
          opacity: 0;
          transform: translateY(44px) scale(0.96);
          transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
          position: relative;
          overflow: hidden;
        }

        /* Top accent line */
        .learning-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #cc785c, #e8956d);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }
        .learning-card:hover::before {
          transform: scaleX(1);
        }

        .in-view .learning-card:nth-child(1) { animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.42s both; }
        .in-view .learning-card:nth-child(2) { animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.58s both; }
        .in-view .learning-card:nth-child(3) { animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.74s both; }

        .learning-card:hover {
          transform: translateY(-8px) !important;
          border-color: rgba(204,120,92,0.48) !important;
          box-shadow: 0 28px 60px -12px rgba(204,120,92,0.2), 0 8px 24px -8px rgba(0,0,0,0.1) !important;
        }

        .learning-card:hover .learning-icon-wrapper {
          background: rgba(204,120,92,0.2) !important;
          transform: scale(1.05);
        }

        .learning-card:hover .learning-icon {
          animation: iconFloat 1.8s ease-in-out infinite;
        }

        .learning-card:hover .cta-arrow {
          transform: translateX(4px);
        }

        .learning-card:hover .card-cta {
          gap: 8px;
        }

        .learning-icon-wrapper {
          transition: all 0.3s ease;
        }

        .cta-arrow {
          transition: transform 0.2s ease;
        }

        .card-cta {
          transition: gap 0.2s ease;
        }

        .learning-badge {
          opacity: 0;
        }
        .in-view .learning-card:nth-child(1) .learning-badge { animation: badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.92s both; }
        .in-view .learning-card:nth-child(2) .learning-badge { animation: badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) 1.08s both; }
        .in-view .learning-card:nth-child(3) .learning-badge { animation: badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) 1.24s both; }

        .eyebrow-pulse {
          animation: glowPulse 2.4s ease-in-out infinite;
        }

        /* Gradient border glow */
        .learning-card::after {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(204,120,92,0.1), transparent 60%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .learning-card:hover::after {
          opacity: 1;
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className={`font-body ${dark ? "bg-[#0a0a0a]" : "bg-[#faf9f5]"} py-20 sm:py-28 px-4 sm:px-6 transition-colors duration-500`}
      >
        <div className="max-w-5xl mx-auto">

          {/* ── Header ── */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="learning-eyebrow inline-flex items-center gap-2 mb-5">
              <span className="eyebrow-pulse w-1.5 h-1.5 rounded-full bg-[#cc785c] inline-block" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#cc785c]">
                DSA & System Design
              </span>
            </div>

            <h2
              className="learning-headline font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-[-0.02em] mb-4"
              style={{ color: dark ? "#ece9e4" : "#201f1c" }}
            >
              Master the fundamentals <br />
              <span className="learning-gradient-text">of top-tier engineering.</span>
            </h2>

            <p
              className="learning-sub text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-6"
              style={{ color: dark ? "#8c8b84" : "#6b6960" }}
            >
              Every path is different. Our expert-curated content meets you exactly where you are
              on your journey to becoming a world-class engineer.
            </p>

            <div
              className="learning-divider h-0.5 rounded-full mx-auto"
              style={{ background: "linear-gradient(90deg,#cc785c,transparent)" }}
            />
          </div>

          {/* ── Cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {CARD_DATA.map(({ icon, heading, explanation }, index) => (
              <div
                key={heading}
                className="learning-card flex flex-col rounded-2xl sm:rounded-3xl p-6 sm:p-8"
                style={{
                  border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.07)",
                  background: dark ? "#131211" : "#ffffff",
                  boxShadow: dark
                    ? "0 8px 32px -8px rgba(0,0,0,0.55)"
                    : "0 8px 32px -8px rgba(0,0,0,0.09)",
                }}
              >
                {/* Icon */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="learning-icon-wrapper w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                    style={{
                      background: dark ? "rgba(204,120,92,0.12)" : "rgba(204,120,92,0.10)",
                      color: "#cc785c",
                    }}
                  >
                    <span className="learning-icon">{icon}</span>
                  </div>
                  <span
                    className="learning-badge w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                    style={{
                      background: "rgba(204,120,92,0.88)",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 gap-3">
                  <h3
                    className="font-display text-xl sm:text-2xl font-semibold leading-snug"
                    style={{ color: dark ? "#ece9e4" : "#201f1c" }}
                  >
                    {heading}
                  </h3>
                  <p
                    className="text-sm leading-relaxed flex-1"
                    style={{ color: dark ? "#8c8b84" : "#6b6960" }}
                  >
                    {explanation}
                  </p>
                  <a
                    href="/practice"
                    className="card-cta inline-flex items-center gap-1.5 text-[13px] font-semibold no-underline mt-2 pt-4"
                    style={{
                      color: "#cc785c",
                      borderTop: dark
                        ? "1px solid rgba(255,255,255,0.06)"
                        : "1px solid rgba(0,0,0,0.06)",
                    }}
                  >
                    Start learning
                    <ArrowRight className="cta-arrow w-3.5 h-3.5" />
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