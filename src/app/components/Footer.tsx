"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectDark } from "../../lib/features/theme/themeSlice";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  Code,
  Database,
  Layers,
  Brain,
  Award,
  BookOpen,
  Users,
  Calendar,
  Star,
  ArrowRight,
//   Github,
//   Twitter,
//   Linkedin,
//   Youtube,
//   Instagram,
  GitBranch,
  Binary,
  TrendingUp,
  Cpu,
  Server,
  Cloud,
  Shield,
  Zap,
  Clock,
  Target,
  Trophy,
  GraduationCap,
  Briefcase,
  MessageCircle,
  HelpCircle,
  FileText,
  PenLine,
  Presentation,
  Library,
  Gift,
  Sparkles,
  Crown,
  Flame,
} from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
  isPopular?: boolean;
  isNew?: boolean;
}

interface FooterSection {
  title: string;
  icon?: React.ReactNode;
  links: FooterLink[];
}

const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Data Structures",
    icon: <Database className="w-4 h-4" />,
    links: [
      { label: "Arrays Mastery", href: "/course/arrays", isPopular: true },
      { label: "Linked Lists Complete", href: "/course/linked-lists" },
      { label: "Stacks & Queues Deep Dive", href: "/course/stacks-queues" },
      { label: "Trees & Graphs Masterclass", href: "/course/trees-graphs", isPopular: true },
      { label: "Dynamic Programming Pro", href: "/course/dynamic-programming", isPopular: true },
      { label: "Hash Tables Deep Dive", href: "/course/hash-tables" },
      { label: "Heaps & Priority Queues", href: "/course/heaps" },
      { label: "Tries & Advanced Trees", href: "/course/tries" },
    ],
  },
  {
    title: "Algorithms",
    icon: <Code className="w-4 h-4" />,
    links: [
      { label: "Sorting Algorithms", href: "/course/sorting-algorithms" },
      { label: "Searching Algorithms", href: "/course/searching-algorithms" },
      { label: "Graph Algorithms", href: "/course/graph-algorithms", isPopular: true },
      { label: "Greedy Algorithms", href: "/course/greedy-algorithms" },
      { label: "Divide & Conquer", href: "/course/divide-conquer" },
      { label: "Backtracking", href: "/course/backtracking" },
      { label: "Dynamic Programming", href: "/course/dynamic-programming", isPopular: true },
      { label: "String Algorithms", href: "/course/string-algorithms" },
    ],
  },
  {
    title: "System Design",
    icon: <Server className="w-4 h-4" />,
    links: [
      { label: "System Design Masterclass", href: "/course/system-design", isPopular: true, isNew: true },
      { label: "Low Level Design", href: "/course/low-level-design" },
      { label: "High Level Design", href: "/course/high-level-design" },
      { label: "Design Patterns", href: "/course/design-patterns", isPopular: true },
      { label: "Database Architecture", href: "/course/database-architecture" },
      { label: "Microservices Design", href: "/course/microservices" },
      { label: "Cloud Architecture", href: "/course/cloud-architecture" },
      { label: "API Design", href: "/course/api-design" },
    ],
  },
  {
    title: "Practice & Interview",
    icon: <Target className="w-4 h-4" />,
    links: [
      { label: "LeetCode Patterns", href: "/practice/leetcode-patterns", isPopular: true },
      { label: "Mock Interviews", href: "/practice/interviews", isPopular: true },
      { label: "Coding Challenges", href: "/practice/challenges" },
      { label: "System Design Problems", href: "/practice/system-design-problems" },
      { label: "Behavioral Questions", href: "/practice/behavioral" },
      { label: "Company-Specific Prep", href: "/practice/company-prep" },
      { label: "Contest Problems", href: "/practice/contests" },
      { label: "Daily Challenges", href: "/practice/daily", isNew: true },
    ],
  },
  {
    title: "Resources",
    icon: <Library className="w-4 h-4" />,
    links: [
      { label: "Learning Library", href: "/resources/library" },
      { label: "Blog & Insights", href: "/resources/blog" },
      { label: "Video Lectures", href: "/resources/lectures", isPopular: true },
      { label: "Cheat Sheets", href: "/resources/cheatsheets" },
      { label: "Interview Guides", href: "/resources/interview-guides" },
      { label: "Research Papers", href: "/resources/papers" },
      { label: "Community Discussions", href: "/community/discussions" },
      { label: "Webinars", href: "/resources/webinars" },
    ],
  },
  {
    title: "Community",
    icon: <Users className="w-4 h-4" />,
    links: [
      { label: "Discussion Forums", href: "/community/forums" },
      { label: "Study Groups", href: "/community/groups" },
      { label: "Success Stories", href: "/community/stories" },
      { label: "Events & Meetups", href: "/community/events" },
      { label: "Mentorship Program", href: "/community/mentorship" },
      { label: "Hackathons", href: "/community/hackathons" },
      { label: "Open Source", href: "/community/opensource" },
      { label: "Alumni Network", href: "/community/alumni" },
    ],
  },
];

// const SOCIAL_LINKS = [
//   { icon: Github, href: "https://github.com", label: "GitHub", color: "hover:text-[#333]" },
//   { icon: Twitter, href: "https://twitter.com", label: "Twitter", color: "hover:text-[#1DA1F2]" },
//   { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", color: "hover:text-[#0A66C2]" },
//   { icon: Youtube, href: "https://youtube.com", label: "YouTube", color: "hover:text-[#FF0000]" },
//   { icon: Instagram, href: "https://instagram.com", label: "Instagram", color: "hover:text-[#E4405F]" },
// ];

const QUICK_STATS = [
  { icon: Code, label: "Problems", value: "2,000+" },
  { icon: Database, label: "Data Structures", value: "50+" },
  { icon: Layers, label: "System Designs", value: "100+" },
  { icon: Award, label: "Success Rate", value: "94%" },
  { icon: Users, label: "Active Students", value: "50,000+" },
  { icon: Star, label: "Avg. Rating", value: "4.9/5" },
];

// ─── Footer Section Component ─────────────────────────────────────────────

function FooterSectionComponent({ section, dark }: { section: FooterSection; dark: boolean }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const text = dark ? "text-[#ece9e4]" : "text-[#201f1c]";
  const muted = dark ? "text-[#8c8b84]" : "text-[#6b6960]";
  const border = dark ? "border-white/[0.08]" : "border-black/[0.07]";

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className={`border-b ${border} py-2`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between py-2"
        >
          <div className="flex items-center gap-2">
            <span className="text-[#cc785c]">{section.icon}</span>
            <span className={`font-semibold text-sm ${text}`}>{section.title}</span>
          </div>
          <span className={muted}>{isOpen ? "−" : "+"}</span>
        </button>
        {isOpen && (
          <ul className="space-y-2 pb-3">
            {section.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`flex items-center justify-between text-sm ${muted} hover:text-[#cc785c] transition-colors duration-200 py-1`}
                >
                  <span>{link.label}</span>
                  {(link.isPopular || link.isNew) && (
                    <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${
                      link.isPopular ? "bg-[#cc785c]/10 text-[#cc785c]" : "bg-emerald-500/10 text-emerald-500"
                    }`}>
                      {link.isPopular ? "Popular" : "New"}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[#cc785c]">{section.icon}</span>
        <h4 className={`text-sm font-semibold ${text}`}>
          {section.title}
        </h4>
      </div>
      <ul className="space-y-2.5">
        {section.links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className={`flex items-center justify-between text-sm ${muted} hover:text-[#cc785c] transition-colors duration-200 group`}
            >
              <span>{link.label}</span>
              {(link.isPopular || link.isNew) && (
                <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                  link.isPopular ? "bg-[#cc785c]/10 text-[#cc785c]" : "bg-emerald-500/10 text-emerald-500"
                }`}>
                  {link.isPopular ? "🔥 Popular" : "✨ New"}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Main Footer Component ──────────────────────────────────────────────────

export default function Footer() {
  const dark = useSelector(selectDark);

  const border = dark ? "border-white/[0.08]" : "border-black/[0.07]";
  const text = dark ? "text-[#ece9e4]" : "text-[#201f1c]";
  const muted = dark ? "text-[#8c8b84]" : "text-[#6b6960]";
  const mutedLight = dark ? "text-[#6b6a62]" : "text-[#8c8b84]";
  const hoverBg = dark ? "hover:bg-white/[0.06]" : "hover:bg-black/[0.045]";
  const bg = dark ? "bg-[#0a0a0a]" : "bg-[#faf9f5]";
  const cardBg = dark ? "bg-[#131211]" : "bg-white";

  return (
    <footer
      className={`font-body ${bg} border-t ${border} transition-colors duration-500`}
    >
      {/* ── Main Footer ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        
        {/* Top Section - Brand + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 mb-12 pb-12 border-b ${border}">
          
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex flex-col gap-1 mb-4">
              <span className={`font-display text-2xl font-semibold tracking-tight ${text}`}>
                Algo.Design
              </span>
              <span className={`text-[11px] font-medium tracking-[0.18em] uppercase ${muted}`}>
                DSA & System Design
              </span>
            </Link>
            <p className={`text-sm leading-relaxed max-w-sm ${muted} mb-6`}>
              Master data structures, algorithms, and system design with expert-curated content,
              AI-powered feedback, and a community of top-tier engineers.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 mb-6">
              {/* {SOCIAL_LINKS.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-10 h-10 rounded-xl border ${border} flex items-center justify-center ${hoverBg} transition-all duration-200 hover:scale-110 hover:border-[#cc785c]/30 ${color}`}
                >
                  <Icon className={`w-4 h-4 ${muted} transition-colors duration-200`} />
                </a>
              ))} */}
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className={`w-4 h-4 ${mutedLight}`} />
                <span className={muted}>support@algodesign.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className={`w-4 h-4 ${mutedLight}`} />
                <span className={muted}>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className={`w-4 h-4 ${mutedLight}`} />
                <span className={muted}>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="w-5 h-5 text-[#cc785c]" />
              <h3 className={`text-sm font-semibold ${text}`}>
                Get Free Resources
              </h3>
            </div>
            <p className={`text-sm ${muted} mb-4`}>
              Subscribe to get weekly DSA problems, system design insights, interview tips, 
              and exclusive discounts delivered to your inbox.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Handle newsletter signup
              }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                placeholder="Enter your email"
                required
                className={`flex-1 px-4 py-2.5 rounded-xl border ${border} ${bg} ${text} text-sm focus:outline-none focus:ring-2 focus:ring-[#cc785c]/40 transition-all duration-200`}
                style={{
                  background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                }}
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-[0_8px_24px_-6px_rgba(204,120,92,0.4)] hover:shadow-[0_12px_32px_-6px_rgba(204,120,92,0.5)]"
                style={{
                  background: "linear-gradient(135deg, #cc785c 0%, #b5613e 100%)",
                }}
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            <p className={`text-[10px] ${mutedLight} mt-2 flex items-center gap-1`}>
              <Shield className="w-3 h-3" />
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* ── Footer Sections Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 lg:gap-6 mb-12">
          {FOOTER_SECTIONS.map((section) => (
            <FooterSectionComponent key={section.title} section={section} dark={dark} />
          ))}
        </div>

        {/* ── Quick Stats & Trust Badges ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12 pb-12 border-b ${border}">
          {QUICK_STATS.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className={`flex items-center gap-3 p-3 rounded-xl border ${border} ${cardBg} transition-all duration-200 hover:border-[#cc785c]/30 hover:scale-[1.02]`}
              style={{
                background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)",
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-[#cc785c]/10 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-[#cc785c]" />
              </div>
              <div>
                <div className={`text-sm font-semibold ${text}`}>{value}</div>
                <div className={`text-[10px] ${muted}`}>{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom Section ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className={`text-xs ${mutedLight}`}>
            &copy; {new Date().getFullYear()} Algo.Design. All rights reserved.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link
              href="/about"
              className={`text-xs ${mutedLight} hover:text-[#cc785c] transition-colors duration-200`}
            >
              About
            </Link>
            <Link
              href="/careers"
              className={`text-xs ${mutedLight} hover:text-[#cc785c] transition-colors duration-200`}
            >
              Careers
            </Link>
            <Link
              href="/contact"
              className={`text-xs ${mutedLight} hover:text-[#cc785c] transition-colors duration-200`}
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className={`text-xs ${mutedLight} hover:text-[#cc785c] transition-colors duration-200`}
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className={`text-xs ${mutedLight} hover:text-[#cc785c] transition-colors duration-200`}
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              className={`text-xs ${mutedLight} hover:text-[#cc785c] transition-colors duration-200`}
            >
              Cookies
            </Link>
            <div className={`flex items-center gap-2 text-xs ${mutedLight}`}>
              <span>Built with</span>
              <span className="text-[#cc785c]">♥</span>
              <span>for engineers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}