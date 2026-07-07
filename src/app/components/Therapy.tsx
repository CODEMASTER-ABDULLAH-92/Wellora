// // // "use client";
// // // import { useSelector } from "react-redux";
// // // import { selectDark } from "../../lib/features/theme/themeSlice";
// // // import Image, { StaticImageData } from "next/image";
// // // import { ArrowRight } from "lucide-react";
// // // import couple from "../../../public/couple.avif";
// // // import family from "../../../public/family.avif";
// // // import individual from "../../../public/individual.avif";

// // // interface CardItem {
// // //   image_url: StaticImageData;
// // //   heading: string;
// // //   explanation: string;
// // // }

// // // const CARD_DATA: CardItem[] = [
// // //   {
// // //     image_url: individual,
// // //     heading: "Individual Therapy",
// // //     explanation:
// // //       "One-on-one sessions tailored to your pace — whether you're working through anxiety, burnout, or simply want to understand yourself better.",
// // //   },
// // //   {
// // //     image_url: couple,
// // //     heading: "Couple Therapy",
// // //     explanation:
// // //       "Rebuild trust, improve communication, and navigate life's challenges together with guidance from a certified relationship therapist.",
// // //   },
// // //   {
// // //     image_url: family,
// // //     heading: "Family Therapy",
// // //     explanation:
// // //       "Strengthen bonds, resolve conflict, and create a home where every member feels heard, valued, and supported.",
// // //   },
// // // ];

// // // export default function Therapy() {
// // //   const dark = useSelector(selectDark);

// // //   const bg        = dark ? "bg-[#0a0a0a]"       : "bg-[#faf9f5]";
// // //   const text       = dark ? "text-[#ece9e4]"      : "text-[#201f1c]";
// // //   const muted      = dark ? "text-[#8c8b84]"      : "text-[#6b6960]";
// // //   const border     = dark ? "border-white/[0.08]" : "border-black/[0.07]";
// // //   const cardBg     = dark ? "bg-[#131211]"        : "bg-white";
// // //   const cardHover  = dark ? "hover:border-[#cc785c]/40" : "hover:border-[#cc785c]/50";

// // //   return (
// // //     <>
// // //       <style>{`
// // //         @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap');
// // //         .font-display { font-family: 'Fraunces', Georgia, serif; }
// // //         .font-body    { font-family: 'Inter', -apple-system, sans-serif; }
// // //         .therapy-card { transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; }
// // //         .therapy-card:hover { transform: translateY(-6px); }
// // //         .therapy-card:hover .card-img { transform: scale(1.04); }
// // //         .card-img { transition: transform 0.4s ease; }
// // //         @media (prefers-reduced-motion: reduce) {
// // //           .therapy-card, .card-img { transition: none !important; transform: none !important; }
// // //         }
// // //       `}</style>

// // //       <section className={`font-body ${bg} py-20 sm:py-28 px-4 sm:px-6 transition-colors duration-500`}>
// // //         <div className="max-w-5xl mx-auto">

// // //           {/* Section header */}
// // //           <div className="text-center mb-12 sm:mb-16">
// // //             <span className={`inline-block text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#cc785c] mb-4`}>
// // //               Therapy Services
// // //             </span>
// // //             <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-[-0.02em] ${text}`}>
// // //               Find the care that{" "}
// // //               <span
// // //                 style={{
// // //                   WebkitBackgroundClip: "text",
// // //                   WebkitTextFillColor: "transparent",
// // //                   backgroundImage: "linear-gradient(135deg,#cc785c 0%,#e8956d 40%,#b5613e 100%)",
// // //                   backgroundClip: "text",
// // //                 }}
// // //               >
// // //                 fits your life.
// // //               </span>
// // //             </h2>
// // //             <p className={`mt-4 text-base sm:text-lg max-w-xl mx-auto leading-relaxed ${muted}`}>
// // //               Every path is different. Our licensed therapists meet you exactly where you are.
// // //             </p>
// // //           </div>

// // //           {/* Cards grid */}
// // //           <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
// // //             {CARD_DATA.map(({ image_url, heading, explanation }, index) => (
// // //               <div
// // //                 key={heading}
// // //                 className={`therapy-card group flex flex-col rounded-2xl sm:rounded-3xl border ${border} ${cardHover} ${cardBg} overflow-hidden`}
// // //                 style={{
// // //                   boxShadow: dark
// // //                     ? "0 8px 32px -8px rgba(0,0,0,0.6)"
// // //                     : "0 8px 32px -8px rgba(0,0,0,0.08)",
// // //                 }}
// // //               >
// // //                 {/* Image */}
// // //                 <div className="relative w-full aspect-[4/3] overflow-hidden">
// // //                   <Image
// // //                     src={image_url}
// // //                     alt={heading}
// // //                     fill
// // //                     className="card-img object-cover"
// // //                     sizes="(max-width: 640px) 100vw, 33vw"
// // //                   />
// // //                   {/* Subtle gradient overlay */}
// // //                   <div
// // //                     className="absolute inset-0"
// // //                     style={{
// // //                       background:
// // //                         "linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 60%)",
// // //                     }}
// // //                   />
// // //                   {/* Index badge */}
// // //                   <span
// // //                     className="absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold text-white"
// // //                     style={{ background: "rgba(204,120,92,0.85)", backdropFilter: "blur(4px)" }}
// // //                   >
// // //                     {String(index + 1).padStart(2, "0")}
// // //                   </span>
// // //                 </div>

// // //                 {/* Content */}
// // //                 <div className="flex flex-col flex-1 p-5 sm:p-6 gap-3">
// // //                   <h3 className={`font-display text-lg sm:text-xl font-semibold leading-snug ${text}`}>
// // //                     {heading}
// // //                   </h3>
// // //                   <p className={`text-sm leading-relaxed ${muted} flex-1`}>
// // //                     {explanation}
// // //                   </p>
// // //                   <a
// // //                     href="/book"
// // //                     className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#cc785c] hover:gap-2.5 transition-all duration-200 no-underline mt-1 group/link"
// // //                   >
// // //                     Book a session
// // //                     <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" />
// // //                   </a>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </section>
// // //     </>
// // //   );
// // // }


// // "use client";
// // import { useEffect, useRef } from "react";
// // import { useSelector } from "react-redux";
// // import { selectDark } from "../../lib/features/theme/themeSlice";
// // import Image, { StaticImageData } from "next/image";
// // import { ArrowRight } from "lucide-react";
// // import couple from "../../../public/couple.avif";
// // import family from "../../../public/family.avif";
// // import individual from "../../../public/individual.avif";

// // interface CardItem {
// //   image_url: StaticImageData;
// //   heading: string;
// //   explanation: string;
// // }

// // const CARD_DATA: CardItem[] = [
// //   {
// //     image_url: individual,
// //     heading: "Individual Therapy",
// //     explanation:
// //       "One-on-one sessions tailored to your pace — whether you're working through anxiety, burnout, or simply want to understand yourself better.",
// //   },
// //   {
// //     image_url: couple,
// //     heading: "Couple Therapy",
// //     explanation:
// //       "Rebuild trust, improve communication, and navigate life's challenges together with guidance from a certified relationship therapist.",
// //   },
// //   {
// //     image_url: family,
// //     heading: "Family Therapy",
// //     explanation:
// //       "Strengthen bonds, resolve conflict, and create a home where every member feels heard, valued, and supported.",
// //   },
// // ];

// // export default function Therapy() {
// //   const dark = useSelector(selectDark);
// //   const sectionRef = useRef<HTMLElement>(null);

// //   // Intersection Observer — triggers animations only when section enters viewport
// //   useEffect(() => {
// //     const section = sectionRef.current;
// //     if (!section) return;

// //     const observer = new IntersectionObserver(
// //       ([entry]) => {
// //         if (entry.isIntersecting) {
// //           section.classList.add("in-view");
// //           observer.disconnect();
// //         }
// //       },
// //       { threshold: 0.12 }
// //     );

// //     observer.observe(section);
// //     return () => observer.disconnect();
// //   }, []);

// //   const bg       = dark ? "bg-[#0a0a0a]"       : "bg-[#faf9f5]";
// //   const text      = dark ? "text-[#ece9e4]"      : "text-[#201f1c]";
// //   const muted     = dark ? "text-[#8c8b84]"      : "text-[#6b6960]";
// //   const border    = dark ? "border-white/[0.08]" : "border-black/[0.07]";
// //   const cardBg    = dark ? "bg-[#131211]"        : "bg-white";

// //   return (
// //     <>
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap');
// //         .font-display { font-family: 'Fraunces', Georgia, serif; }
// //         .font-body    { font-family: 'Inter', -apple-system, sans-serif; }

// //         /* ── Keyframes ── */
// //         @keyframes fadeSlideDown {
// //           from { opacity: 0; transform: translateY(-14px); }
// //           to   { opacity: 1; transform: translateY(0); }
// //         }
// //         @keyframes fadeSlideUp {
// //           from { opacity: 0; transform: translateY(24px); }
// //           to   { opacity: 1; transform: translateY(0); }
// //         }
// //         @keyframes cardReveal {
// //           from { opacity: 0; transform: translateY(44px) scale(0.96); }
// //           to   { opacity: 1; transform: translateY(0) scale(1); }
// //         }
// //         @keyframes badgePop {
// //           0%   { opacity: 0; transform: scale(0.5); }
// //           70%  { transform: scale(1.18); }
// //           100% { opacity: 1; transform: scale(1); }
// //         }
// //         @keyframes lineGrow {
// //           from { width: 0; opacity: 0; }
// //           to   { width: 48px; opacity: 1; }
// //         }
// //         @keyframes shimmer {
// //           0%   { background-position: -200% center; }
// //           100% { background-position: 200% center; }
// //         }
// //         @keyframes glowPulse {
// //           0%, 100% { box-shadow: 0 0 0 0 rgba(204,120,92,0); }
// //           50%       { box-shadow: 0 0 20px 3px rgba(204,120,92,0.22); }
// //         }

// //         /* ── Shimmer gradient text ── */
// //         .therapy-gradient-text {
// //           background: linear-gradient(135deg, #cc785c 0%, #e8956d 40%, #b5613e 100%);
// //           background-size: 200% auto;
// //           -webkit-background-clip: text;
// //           -webkit-text-fill-color: transparent;
// //           background-clip: text;
// //         }
// //         .in-view .therapy-gradient-text {
// //           animation: shimmer 3.5s linear 0.8s infinite;
// //         }

// //         /* ── Eyebrow pill ── */
// //         .therapy-eyebrow {
// //           opacity: 0;
// //           transform: translateY(-14px);
// //         }
// //         .in-view .therapy-eyebrow {
// //           animation: fadeSlideDown 0.55s ease-out 0.05s both;
// //         }

// //         /* ── Headline ── */
// //         .therapy-headline {
// //           opacity: 0;
// //           transform: translateY(24px);
// //         }
// //         .in-view .therapy-headline {
// //           animation: fadeSlideUp 0.65s ease-out 0.18s both;
// //         }

// //         /* ── Subheading ── */
// //         .therapy-sub {
// //           opacity: 0;
// //           transform: translateY(20px);
// //         }
// //         .in-view .therapy-sub {
// //           animation: fadeSlideUp 0.65s ease-out 0.3s both;
// //         }

// //         /* ── Divider line ── */
// //         .therapy-divider {
// //           width: 0;
// //           opacity: 0;
// //         }
// //         .in-view .therapy-divider {
// //           animation: lineGrow 0.5s ease-out 0.46s both;
// //         }

// //         /* ── Cards ── */
// //         .therapy-card {
// //           opacity: 0;
// //           transform: translateY(44px) scale(0.96);
// //           transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
// //         }
// //         .in-view .therapy-card:nth-child(1) {
// //           animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.42s both;
// //         }
// //         .in-view .therapy-card:nth-child(2) {
// //           animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.58s both;
// //         }
// //         .in-view .therapy-card:nth-child(3) {
// //           animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.74s both;
// //         }

// //         /* ── Card hover lift ── */
// //         .therapy-card:hover {
// //           transform: translateY(-8px) !important;
// //           border-color: rgba(204,120,92,0.48) !important;
// //           box-shadow: 0 28px 60px -12px rgba(204,120,92,0.2), 0 8px 24px -8px rgba(0,0,0,0.1) !important;
// //         }
// //         .therapy-card:hover .card-img-inner { transform: scale(1.05); }
// //         .therapy-card:hover .cta-arrow      { transform: translateX(4px); }
// //         .therapy-card:hover .card-cta       { gap: 8px; letter-spacing: 0.01em; }

// //         /* ── Image zoom ── */
// //         .card-img-inner { transition: transform 0.45s ease; }

// //         /* ── Badge pop (staggered after card reveal) ── */
// //         .therapy-badge { opacity: 0; }
// //         .in-view .therapy-card:nth-child(1) .therapy-badge {
// //           animation: badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.92s both;
// //         }
// //         .in-view .therapy-card:nth-child(2) .therapy-badge {
// //           animation: badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) 1.08s both;
// //         }
// //         .in-view .therapy-card:nth-child(3) .therapy-badge {
// //           animation: badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) 1.24s both;
// //         }

// //         /* ── Pulsing dot ── */
// //         .eyebrow-pulse { animation: glowPulse 2.4s ease-in-out infinite; }

// //         /* ── CTA transition ── */
// //         .card-cta { transition: gap 0.2s ease, letter-spacing 0.2s ease; }
// //         .cta-arrow { transition: transform 0.2s ease; }

// //         @media (prefers-reduced-motion: reduce) {
// //           *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
// //         }
// //       `}</style>

// //       <section
// //         ref={sectionRef}
// //         className={`font-body ${bg} py-20 sm:py-28 px-4 sm:px-6 transition-colors duration-500`}
// //       >
// //         <div className="max-w-5xl mx-auto">

// //           {/* ── Section header ── */}
// //           <div className="text-center mb-12 sm:mb-16">

// //             {/* Eyebrow */}
// //             <div className="therapy-eyebrow inline-flex items-center gap-2 mb-5">
// //               <span
// //                 className="eyebrow-pulse w-1.5 h-1.5 rounded-full bg-[#cc785c] inline-block"
// //               />
// //               <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#cc785c]">
// //                 Therapy Services
// //               </span>
// //             </div>

// //             {/* Headline */}
// //             <h2
// //               className={`therapy-headline font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-[-0.02em] ${text} mb-4`}
// //             >
// //               Find the care that{" "}
// //               <span className="therapy-gradient-text">fits your life.</span>
// //             </h2>

// //             {/* Sub */}
// //             <p className={`therapy-sub text-base sm:text-lg leading-relaxed max-w-xl mx-auto ${muted} mb-6`}>
// //               Every path is different. Our licensed therapists meet you exactly where you are.
// //             </p>

// //             {/* Accent divider */}
// //             <div
// //               className="therapy-divider h-0.5 rounded-full mx-auto"
// //               style={{ background: "linear-gradient(90deg,#cc785c,transparent)" }}
// //             />
// //           </div>

// //           {/* ── Cards ── */}
// //           <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
// //             {CARD_DATA.map(({ image_url, heading, explanation }, index) => (
// //               <div
// //                 key={heading}
// //                 className={`therapy-card flex flex-col rounded-2xl sm:rounded-3xl border ${border} ${cardBg} overflow-hidden`}
// //                 style={{
// //                   boxShadow: dark
// //                     ? "0 8px 32px -8px rgba(0,0,0,0.55)"
// //                     : "0 8px 32px -8px rgba(0,0,0,0.07)",
// //                 }}
// //               >
// //                 {/* Image */}
// //                 <div className="relative w-full aspect-[4/3] overflow-hidden">
// //                   <Image
// //                     src={image_url}
// //                     alt={heading}
// //                     fill
// //                     className="card-img-inner object-cover"
// //                     sizes="(max-width: 640px) 100vw, 33vw"
// //                   />
// //                   {/* Gradient overlay */}
// //                   <div
// //                     className="absolute inset-0 pointer-events-none"
// //                     style={{
// //                       background:
// //                         "linear-gradient(to top, rgba(0,0,0,0.2) 0%, transparent 55%)",
// //                     }}
// //                   />
// //                   {/* Numbered badge */}
// //                   <span
// //                     className="therapy-badge absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
// //                     style={{
// //                       background: "rgba(204,120,92,0.88)",
// //                       backdropFilter: "blur(6px)",
// //                     }}
// //                   >
// //                     {String(index + 1).padStart(2, "0")}
// //                   </span>
// //                 </div>

// //                 {/* Body */}
// //                 <div className="flex flex-col flex-1 p-5 sm:p-6 gap-3">
// //                   <h3 className={`font-display text-lg sm:text-xl font-semibold leading-snug ${text}`}>
// //                     {heading}
// //                   </h3>
// //                   <p className={`text-sm leading-relaxed ${muted} flex-1`}>
// //                     {explanation}
// //                   </p>
// //                   <a
// //                     href="/book"
// //                     className="card-cta inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#cc785c] no-underline mt-1"
// //                   >
// //                     Book a session
// //                     <ArrowRight className="cta-arrow w-3.5 h-3.5" />
// //                   </a>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //         </div>
// //       </section>
// //     </>
// //   );
// // }



// "use client";
// import { useEffect, useRef } from "react";
// import { useSelector } from "react-redux";
// import { selectDark } from "../../lib/features/theme/themeSlice";
// import Image, { StaticImageData } from "next/image";
// import { ArrowRight } from "lucide-react";
// import couple from "../../../public/couple.avif";
// import family from "../../../public/family.avif";
// import individual from "../../../public/individual.avif";

// interface CardItem {
//   image_url: StaticImageData;
//   heading: string;
//   explanation: string;
// }

// const CARD_DATA: CardItem[] = [
//   {
//     image_url: individual,
//     heading: "Individual Therapy",
//     explanation:
//       "One-on-one sessions tailored to your pace — whether you're working through anxiety, burnout, or simply want to understand yourself better.",
//   },
//   {
//     image_url: couple,
//     heading: "Couple Therapy",
//     explanation:
//       "Rebuild trust, improve communication, and navigate life's challenges together with guidance from a certified relationship therapist.",
//   },
//   {
//     image_url: family,
//     heading: "Family Therapy",
//     explanation:
//       "Strengthen bonds, resolve conflict, and create a home where every member feels heard, valued, and supported.",
//   },
// ];

// export default function Therapy() {
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

//         .therapy-gradient-text {
//           background: linear-gradient(135deg, #cc785c 0%, #e8956d 40%, #b5613e 100%);
//           background-size: 200% auto;
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           color: #cc785c; /* fallback */
//         }
//         .in-view .therapy-gradient-text {
//           animation: shimmer 3.5s linear 0.8s infinite;
//         }

//         .therapy-eyebrow { opacity: 0; transform: translateY(-14px); }
//         .in-view .therapy-eyebrow { animation: fadeSlideDown 0.55s ease-out 0.05s both; }

//         .therapy-headline { opacity: 0; transform: translateY(24px); }
//         .in-view .therapy-headline { animation: fadeSlideUp 0.65s ease-out 0.18s both; }

//         .therapy-sub { opacity: 0; transform: translateY(20px); }
//         .in-view .therapy-sub { animation: fadeSlideUp 0.65s ease-out 0.3s both; }

//         .therapy-divider { width: 0; opacity: 0; }
//         .in-view .therapy-divider { animation: lineGrow 0.5s ease-out 0.46s both; }

//         .therapy-card {
//           opacity: 0;
//           transform: translateY(44px) scale(0.96);
//           transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
//         }
//         .in-view .therapy-card:nth-child(1) { animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.42s both; }
//         .in-view .therapy-card:nth-child(2) { animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.58s both; }
//         .in-view .therapy-card:nth-child(3) { animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.74s both; }

//         .therapy-card:hover {
//           transform: translateY(-8px) !important;
//           border-color: rgba(204,120,92,0.48) !important;
//           box-shadow: 0 28px 60px -12px rgba(204,120,92,0.2), 0 8px 24px -8px rgba(0,0,0,0.1) !important;
//         }
//         .therapy-card:hover .card-img-inner { transform: scale(1.05); }
//         .therapy-card:hover .cta-arrow      { transform: translateX(4px); }
//         .therapy-card:hover .card-cta       { gap: 8px; }

//         .card-img-inner { transition: transform 0.45s ease; }

//         .therapy-badge { opacity: 0; }
//         .in-view .therapy-card:nth-child(1) .therapy-badge { animation: badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.92s both; }
//         .in-view .therapy-card:nth-child(2) .therapy-badge { animation: badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) 1.08s both; }
//         .in-view .therapy-card:nth-child(3) .therapy-badge { animation: badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) 1.24s both; }

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
//             <div className="therapy-eyebrow inline-flex items-center gap-2 mb-5">
//               <span className="eyebrow-pulse w-1.5 h-1.5 rounded-full bg-[#cc785c] inline-block" />
//               <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#cc785c]">
//                 Therapy Services
//               </span>
//             </div>

//             <h2
//               className="therapy-headline font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-[-0.02em] mb-4"
//               style={{ color: dark ? "#ece9e4" : "#201f1c" }}
//             >
//               Find the care that{" "}
//               <span className="therapy-gradient-text">fits your life.</span>
//             </h2>

//             <p
//               className="therapy-sub text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-6"
//               style={{ color: dark ? "#8c8b84" : "#6b6960" }}
//             >
//               Every path is different. Our licensed therapists meet you exactly where you are.
//             </p>

//             <div
//               className="therapy-divider h-0.5 rounded-full mx-auto"
//               style={{ background: "linear-gradient(90deg,#cc785c,transparent)" }}
//             />
//           </div>

//           {/* ── Cards ── */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
//             {CARD_DATA.map(({ image_url, heading, explanation }, index) => (
//               <div
//                 key={heading}
//                 className="therapy-card flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden"
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
//                     className="therapy-badge absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
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
//                     href="/book"
//                     className="card-cta inline-flex items-center gap-1.5 text-[13px] font-semibold no-underline mt-1"
//                     style={{ color: "#cc785c" }}
//                   >
//                     Book a session
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
import Image, { StaticImageData } from "next/image";
import { ArrowRight } from "lucide-react";
import couple from "../../../public/couple.avif";
import family from "../../../public/family.avif";
import individual from "../../../public/individual.avif";

interface CardItem {
  image_url: StaticImageData;
  heading: string;
  explanation: string;
}

const CARD_DATA: CardItem[] = [
  {
    image_url: individual,
    heading: "Individual Therapy",
    explanation:
      "One-on-one sessions tailored to your pace — whether you're working through anxiety, burnout, or simply want to understand yourself better.",
  },
  {
    image_url: couple,
    heading: "Couple Therapy",
    explanation:
      "Rebuild trust, improve communication, and navigate life's challenges together with guidance from a certified relationship therapist.",
  },
  {
    image_url: family,
    heading: "Family Therapy",
    explanation:
      "Strengthen bonds, resolve conflict, and create a home where every member feels heard, valued, and supported.",
  },
];

export default function Therapy() {
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

        .therapy-gradient-text {
          background: linear-gradient(135deg, #cc785c 0%, #e8956d 40%, #b5613e 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: #cc785c; /* fallback */
        }
        .in-view .therapy-gradient-text {
          animation: shimmer 3.5s linear 0.8s infinite;
        }

        .therapy-eyebrow { opacity: 0; transform: translateY(-14px); }
        .in-view .therapy-eyebrow { animation: fadeSlideDown 0.55s ease-out 0.05s both; }

        .therapy-headline { opacity: 0; transform: translateY(24px); }
        .in-view .therapy-headline { animation: fadeSlideUp 0.65s ease-out 0.18s both; }

        .therapy-sub { opacity: 0; transform: translateY(20px); }
        .in-view .therapy-sub { animation: fadeSlideUp 0.65s ease-out 0.3s both; }

        .therapy-divider { width: 0; opacity: 0; }
        .in-view .therapy-divider { animation: lineGrow 0.5s ease-out 0.46s both; }

        .therapy-card {
          opacity: 0;
          transform: translateY(44px) scale(0.96);
          transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
        }
        .in-view .therapy-card:nth-child(1) { animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.42s both; }
        .in-view .therapy-card:nth-child(2) { animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.58s both; }
        .in-view .therapy-card:nth-child(3) { animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.74s both; }

        .therapy-card:hover {
          transform: translateY(-8px) !important;
          border-color: rgba(204,120,92,0.48) !important;
          box-shadow: 0 28px 60px -12px rgba(204,120,92,0.2), 0 8px 24px -8px rgba(0,0,0,0.1) !important;
        }
        .therapy-card:hover .card-img-inner { transform: scale(1.05); }
        .therapy-card:hover .cta-arrow      { transform: translateX(4px); }
        .therapy-card:hover .card-cta       { gap: 8px; }

        .card-img-inner { transition: transform 0.45s ease; }

        .therapy-badge { opacity: 0; }
        .in-view .therapy-card:nth-child(1) .therapy-badge { animation: badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.92s both; }
        .in-view .therapy-card:nth-child(2) .therapy-badge { animation: badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) 1.08s both; }
        .in-view .therapy-card:nth-child(3) .therapy-badge { animation: badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) 1.24s both; }

        .eyebrow-pulse { animation: glowPulse 2.4s ease-in-out infinite; }
        .card-cta { transition: gap 0.2s ease; }
        .cta-arrow { transition: transform 0.2s ease; }

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
            <div className="therapy-eyebrow inline-flex items-center gap-2 mb-5">
              <span className="eyebrow-pulse w-1.5 h-1.5 rounded-full bg-[#cc785c] inline-block" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#cc785c]">
                Therapy Services
              </span>
            </div>

            <h2
              className="therapy-headline font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-[-0.02em] mb-4"
              style={{ color: dark ? "#ece9e4" : "#201f1c" }}
            >
              Find the care that{" "}
              <span className="therapy-gradient-text">fits your life.</span>
            </h2>

            <p
              className="therapy-sub text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-6"
              style={{ color: dark ? "#8c8b84" : "#6b6960" }}
            >
              Every path is different. Our licensed therapists meet you exactly where you are.
            </p>

            <div
              className="therapy-divider h-0.5 rounded-full mx-auto"
              style={{ background: "linear-gradient(90deg,#cc785c,transparent)" }}
            />
          </div>

          {/* ── Cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {CARD_DATA.map(({ image_url, heading, explanation }, index) => (
              <div
                key={heading}
                className="therapy-card flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden"
                style={{
                  border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.07)",
                  background: dark ? "#131211" : "#ffffff",
                  boxShadow: dark
                    ? "0 8px 32px -8px rgba(0,0,0,0.55)"
                    : "0 8px 32px -8px rgba(0,0,0,0.09)",
                }}
              >
                {/* Image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={image_url}
                    alt={heading}
                    fill
                    className="card-img-inner object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.22) 0%, transparent 55%)",
                    }}
                  />
                  <span
                    className="therapy-badge absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                    style={{
                      background: "rgba(204,120,92,0.88)",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-5 sm:p-6 gap-3">
                  <h3
                    className="font-display text-lg sm:text-xl font-semibold leading-snug"
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
                    href="/book"
                    className="card-cta inline-flex items-center gap-1.5 text-[13px] font-semibold no-underline mt-1"
                    style={{ color: "#cc785c" }}
                  >
                    Book a session
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