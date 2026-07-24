"use client";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectDark } from "../../lib/features/theme/themeSlice";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Users,
  Star,
  CheckCircle,
  Code,
  Database,
  Layers,
  GitBranch,
  Binary,
  ChevronRight,
  Sparkles,
  Zap,
  TrendingUp,
  Gift,
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  hours: number;
  lessons: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  icon: React.ReactNode;
  topics: string[];
  popular?: boolean;
  comparison: string;
}

const COURSES: Course[] = [
  {
    id: "arrays",
    title: "Complete Arrays Mastery",
    description: "Master arrays from basics to advanced — understand memory layout, two-pointer techniques, sliding window, and every array problem pattern used in FAANG interviews.",
    price: 9,
    originalPrice: 49,
    hours: 12,
    lessons: 87,
    level: "Beginner",
    icon: <Database className="w-6 h-6" />,
    topics: [
      "Array memory representation",
      "Two-pointer technique",
      "Sliding window pattern",
      "Prefix sum & difference arrays",
      "Matrix problems",
      "Subarray & subsequence problems",
      "Dutch national flag algorithm",
      "Kadane's algorithm",
    ],
    popular: true,
    comparison: "Less than a pizza party for your team 🍕",
  },
  {
    id: "linked-lists",
    title: "Linked Lists Complete",
    description: "Master singly, doubly, and circular linked lists — understand pointers, recursion, and every linked list pattern from reversing to detecting cycles.",
    price: 9,
    originalPrice: 49,
    hours: 10,
    lessons: 72,
    level: "Beginner",
    icon: <GitBranch className="w-6 h-6" />,
    topics: [
      "Singly linked lists",
      "Doubly linked lists",
      "Circular linked lists",
      "Reverse a linked list",
      "Detect & remove cycles",
      "Merge & sort lists",
      "LRU cache design",
      "Interview patterns",
    ],
    comparison: "Cheaper than your girlfriend's SIM card 💅",
  },
  {
    id: "stacks-queues",
    title: "Stacks & Queues Deep Dive",
    description: "Learn stack and queue implementations, monotonic stack patterns, and solve complex problems like expression evaluation and sliding window maximum.",
    price: 9,
    originalPrice: 44,
    hours: 8,
    lessons: 58,
    level: "Intermediate",
    icon: <Layers className="w-6 h-6" />,
    topics: [
      "Stack implementation",
      "Queue implementation",
      "Monotonic stack",
      "Expression evaluation",
      "Sliding window maximum",
      "Design min stack",
      "Implement queue using stacks",
      "Next greater element",
    ],
    comparison: "Less than a date at a fancy restaurant 🍽️",
  },
  {
    id: "trees-graphs",
    title: "Trees & Graphs Masterclass",
    description: "Master binary trees, BSTs, AVL trees, and graph algorithms — from BFS/DFS to topological sorting and Dijkstra's algorithm.",
    price: 9,
    originalPrice: 59,
    hours: 15,
    lessons: 104,
    level: "Advanced",
    icon: <Binary className="w-6 h-6" />,
    topics: [
      "Binary trees & BST",
      "Tree traversals",
      "AVL & Red-Black trees",
      "BFS & DFS",
      "Topological sorting",
      "Dijkstra's algorithm",
      "Graph coloring",
      "Interview patterns",
    ],
    popular: true,
    comparison: "Cheaper than a therapy session 🧠",
  },
  {
    id: "dynamic-programming",
    title: "Dynamic Programming Pro",
    description: "Master DP patterns — from memoization to tabulation, solve knapsack, LCS, edit distance, and every DP problem pattern for interviews.",
    price: 9,
    originalPrice: 54,
    hours: 14,
    lessons: 96,
    level: "Advanced",
    icon: <TrendingUp className="w-6 h-6" />,
    topics: [
      "Memoization & tabulation",
      "Knapsack problems",
      "Longest common subsequence",
      "Edit distance",
      "Matrix chain multiplication",
      "DP on trees",
      "DP on graphs",
      "Advanced DP patterns",
    ],
    comparison: "Less than a pizza party for your team 🍕",
  },
  {
    id: "oop",
    title: "Object-Oriented Programming",
    description: "Master OOP principles — encapsulation, inheritance, polymorphism, and design patterns used in real-world software engineering.",
    price: 9,
    originalPrice: 44,
    hours: 9,
    lessons: 65,
    level: "Intermediate",
    icon: <Code className="w-6 h-6" />,
    topics: [
      "Classes & objects",
      "Encapsulation",
      "Inheritance & polymorphism",
      "Abstract classes & interfaces",
      "Design patterns",
      "SOLID principles",
      "UML diagrams",
      "Interview problems",
    ],
    comparison: "Cheaper than your daily coffee habit ☕",
  },
];

export default function DSAPage() {
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
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Fraunces', Georgia, serif; }
        .font-body { font-family: 'Inter', -apple-system, sans-serif; }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(44px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        .gradient-text {
          background: linear-gradient(135deg, #cc785c 0%, #e8956d 40%, #b5613e 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: #cc785c;
        }

        .course-card {
          opacity: 0;
          transform: translateY(44px) scale(0.96);
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
          overflow: hidden;
        }

        .course-card::before {
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

        .course-card:hover::before {
          transform: scaleX(1);
        }

        .in-view .course-card:nth-child(1) { animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
        .in-view .course-card:nth-child(2) { animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s both; }
        .in-view .course-card:nth-child(3) { animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.3s both; }
        .in-view .course-card:nth-child(4) { animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.4s both; }
        .in-view .course-card:nth-child(5) { animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.5s both; }
        .in-view .course-card:nth-child(6) { animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.6s both; }

        .course-card:hover {
          transform: translateY(-8px) !important;
          border-color: rgba(204,120,92,0.48) !important;
        }

        .topic-tag {
          transition: all 0.2s ease;
        }

        .topic-tag:hover {
          transform: translateY(-2px);
          background: rgba(204,120,92,0.2) !important;
        }

        .comparison-text {
          font-style: italic;
          background: linear-gradient(90deg, #cc785c, #e8956d);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
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
        className={`font-body ${dark ? "bg-[#0a0a0a]" : "bg-[#faf9f5]"} py-16 sm:py-20 px-4 sm:px-6 transition-colors duration-500 min-h-screen`}
      >
        <div className="max-w-7xl mx-auto">
          {/* ── Header ── */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#cc785c] animate-pulse inline-block" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#cc785c]">
                Master DSA
              </span>
            </div>

            <h1
              className={`font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-[-0.02em] mb-4 ${dark ? "text-[#ece9e4]" : "text-[#201f1c]"}`}
              style={{ animation: "fadeSlideUp 0.6s ease-out both" }}
            >
              Complete Data Structures & <br />
              <span className="gradient-text">Algorithm Courses</span>
            </h1>

            <p
              className={`text-base sm:text-lg leading-relaxed max-w-2xl mx-auto ${dark ? "text-[#8c8b84]" : "text-[#6b6960]"}`}
              style={{ animation: "fadeSlideUp 0.7s ease-out 0.1s both" }}
            >
              Master every data structure and algorithm pattern used in top-tier interviews.
              Each course is designed to take you from zero to interview-ready.
            </p>
          </div>

          {/* ── Courses Grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {COURSES.map((course) => (
              <div
                key={course.id}
                className="course-card flex flex-col rounded-2xl sm:rounded-3xl p-6 sm:p-7"
                style={{
                  border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.07)",
                  background: dark ? "#131211" : "#ffffff",
                  boxShadow: dark
                    ? "0 8px 32px -8px rgba(0,0,0,0.55)"
                    : "0 8px 32px -8px rgba(0,0,0,0.09)",
                }}
              >
                {/* Popular Badge */}
                {course.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase text-white"
                      style={{
                        background: "linear-gradient(135deg, #cc785c, #b5613e)",
                      }}
                    >
                      <Sparkles className="w-3 h-3" />
                      Popular
                    </span>
                  </div>
                )}

                {/* Icon & Level */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                    style={{
                      background: dark ? "rgba(204,120,92,0.15)" : "rgba(204,120,92,0.10)",
                      color: "#cc785c",
                    }}
                  >
                    {course.icon}
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${dark ? "bg-white/5 text-[#8c8b84]" : "bg-black/5 text-[#6b6960]"}`}
                  >
                    {course.level}
                  </span>
                </div>

                {/* Title & Description */}
                <h3
                  className={`font-display text-xl font-semibold leading-snug mb-2 ${dark ? "text-[#ece9e4]" : "text-[#201f1c]"}`}
                >
                  {course.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed flex-1 mb-4 ${dark ? "text-[#8c8b84]" : "text-[#6b6960]"}`}
                >
                  {course.description}
                </p>

                {/* Topics */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {course.topics.slice(0, 4).map((topic) => (
                    <span
                      key={topic}
                      className={`topic-tag text-[10px] px-2 py-1 rounded-full ${dark ? "bg-white/5 text-[#8c8b84]" : "bg-black/5 text-[#6b6960]"}`}
                    >
                      {topic}
                    </span>
                  ))}
                  {course.topics.length > 4 && (
                    <span className={`text-[10px] px-2 py-1 rounded-full ${dark ? "text-[#6b6a62]" : "text-[#8c8b84]"}`}>
                      +{course.topics.length - 4} more
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className={`flex items-center gap-4 pt-3 pb-3 border-t ${dark ? "border-white/[0.06]" : "border-black/[0.06]"}`}>
                  <div className="flex items-center gap-1.5">
                    <Clock className={`w-3.5 h-3.5 ${dark ? "text-[#6b6a62]" : "text-[#8c8b84]"}`} />
                    <span className={`text-xs ${dark ? "text-[#8c8b84]" : "text-[#6b6960]"}`}>
                      {course.hours}h
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className={`w-3.5 h-3.5 ${dark ? "text-[#6b6a62]" : "text-[#8c8b84]"}`} />
                    <span className={`text-xs ${dark ? "text-[#8c8b84]" : "text-[#6b6960]"}`}>
                      {course.lessons} lessons
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className={`w-3.5 h-3.5 ${dark ? "text-[#6b6a62]" : "text-[#8c8b84]"}`} />
                    <span className={`text-xs ${dark ? "text-[#8c8b84]" : "text-[#6b6960]"}`}>
                      4.9/5
                    </span>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between mt-4 pt-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-display text-2xl font-bold ${dark ? "text-[#ece9e4]" : "text-[#201f1c]"}`}>
                      ${course.price}
                    </span>
                    {course.originalPrice && (
                      <span className={`text-sm line-through ${dark ? "text-[#6b6a62]" : "text-[#8c8b84]"}`}>
                        ${course.originalPrice}
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/course/${course.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] active:scale-95 shadow-[0_8px_24px_-6px_rgba(204,120,92,0.4)] hover:shadow-[0_12px_32px_-6px_rgba(204,120,92,0.5)]"
                    style={{
                      background: "linear-gradient(135deg, #cc785c 0%, #b5613e 100%)",
                    }}
                  >
                    Enroll Now
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Comparison Text */}
                <div className="mt-3 pt-3 border-t border-dashed" style={{
                  borderColor: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                }}>
                  <p className="text-[11px] font-medium text-center comparison-text">
                    {course.comparison}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Bottom CTA Section ── */}
          <div
            className="mt-16 sm:mt-20 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
            style={{
              background: dark
                ? "linear-gradient(135deg, rgba(204,120,92,0.1), rgba(181,97,62,0.05))"
                : "linear-gradient(135deg, rgba(204,120,92,0.08), rgba(181,97,62,0.03))",
              border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.07)",
            }}
          >
            <div className="relative z-10">
              <Gift className="w-12 h-12 text-[#cc785c] mx-auto mb-4" />
              <h2 className={`font-display text-2xl sm:text-3xl font-semibold mb-3 ${dark ? "text-[#ece9e4]" : "text-[#201f1c]"}`}>
                Get All Courses at a Special Price
              </h2>
              <p className={`text-sm sm:text-base max-w-xl mx-auto mb-6 ${dark ? "text-[#8c8b84]" : "text-[#6b6960]"}`}>
                Enroll in all 6 courses and save 60%. Complete DSA masterclass bundle includes
                everything you need to crack any technical interview.
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className={`text-3xl font-display font-bold ${dark ? "text-[#ece9e4]" : "text-[#201f1c]"}`}>
                  $49
                </div>
                <div className={`text-lg line-through ${dark ? "text-[#6b6a62]" : "text-[#8c8b84]"}`}>
                  $119
                </div>
                <Link
                  href="/bundle"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] active:scale-95 shadow-[0_8px_24px_-6px_rgba(204,120,92,0.4)] hover:shadow-[0_12px_32px_-6px_rgba(204,120,92,0.5)]"
                  style={{
                    background: "linear-gradient(135deg, #cc785c 0%, #b5613e 100%)",
                  }}
                >
                  Buy Bundle
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* ── Learn More Section ── */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div
              className="p-6 rounded-2xl text-center"
              style={{
                border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.07)",
                background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
              }}
            >
              <div className="w-12 h-12 rounded-full bg-[#cc785c]/10 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-[#cc785c]" />
              </div>
              <h3 className={`font-semibold text-sm mb-1 ${dark ? "text-[#ece9e4]" : "text-[#201f1c]"}`}>
                100% Practical
              </h3>
              <p className={`text-xs ${dark ? "text-[#8c8b84]" : "text-[#6b6960]"}`}>
                Hands-on coding exercises and real interview problems
              </p>
            </div>

            <div
              className="p-6 rounded-2xl text-center"
              style={{
                border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.07)",
                background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
              }}
            >
              <div className="w-12 h-12 rounded-full bg-[#cc785c]/10 flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-[#cc785c]" />
              </div>
              <h3 className={`font-semibold text-sm mb-1 ${dark ? "text-[#ece9e4]" : "text-[#201f1c]"}`}>
                Lifetime Access
              </h3>
              <p className={`text-xs ${dark ? "text-[#8c8b84]" : "text-[#6b6960]"}`}>
                Learn at your own pace with lifetime course access
              </p>
            </div>

            <div
              className="p-6 rounded-2xl text-center"
              style={{
                border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.07)",
                background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
              }}
            >
              <div className="w-12 h-12 rounded-full bg-[#cc785c]/10 flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-[#cc785c]" />
              </div>
              <h3 className={`font-semibold text-sm mb-1 ${dark ? "text-[#ece9e4]" : "text-[#201f1c]"}`}>
                Community Support
              </h3>
              <p className={`text-xs ${dark ? "text-[#8c8b84]" : "text-[#6b6960]"}`}>
                Join 2,000+ engineers learning together
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}