"use client";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectDark } from "../../lib/features/theme/themeSlice";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Users,
  Star,
  CheckCircle,
  Play,
  FileText,
  Award,
  BookOpen,
  Code,
  ChevronDown,
  ChevronUp,
  Shield,
  Video,
  Download,
  MessageCircle,
  RefreshCw,
  Database,
  GitBranch,
  Layers,
  Binary,
  Brain,
  Server,
  Cloud,
  Network,
  Cpu,
  HardDrive,
  Zap,
  Lock,
  Globe,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Flame,
  Trophy,
  GraduationCap,
  Briefcase,
  LayoutDashboard,
  Settings,
  Menu,
  X,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  XCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  UserPlus,
  BookMarked,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: string[];
  duration: string;
  icon: React.ReactNode;
}

interface CourseData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice?: number;
  hours: number;
  lessons: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  modules: Module[];
  whatYouWillLearn: string[];
  requirements: string[];
  targetAudience: string[];
  features: {
    icon: React.ReactNode;
    label: string;
    description: string;
  }[];
  instructor: {
    name: string;
    title: string;
    image: string;
    bio: string;
    students: number;
    rating: number;
    courses: number;
  };
  reviews: {
    name: string;
    rating: number;
    date: string;
    comment: string;
    avatar: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

// ─── Course Data ──────────────────────────────────────────────────────────

const SYSTEM_DESIGN_COURSE: CourseData = {
  id: "system-design",
  title: "Complete System Design Masterclass",
  subtitle: "From Basics to Advanced - Master HLD & LLD",
  description: "Master both High Level Design (HLD) and Low Level Design (LLD) with comprehensive coverage of system design principles, design patterns, and real-world case studies. Learn to design scalable, reliable, and maintainable systems like a senior engineer at FAANG companies.",
  price: 19,
  originalPrice: 99,
  hours: 45,
  lessons: 180,
  level: "Advanced",
  modules: [
    {
      id: "01",
      title: "Basics of Low Level Design",
      description: "Foundation of Object-Oriented Programming and Design",
      duration: "4h",
      icon: <Database className="w-5 h-5" />,
      lessons: [
        "Introduction to OOP concepts",
        "Core principles of OOPs",
        "Operator overloading",
        "Class diagram as a Visual Tool",
        "Procedural vs OO Programming",
      ],
    },
    {
      id: "02",
      title: "Understanding Constructors",
      description: "Master constructors and their types in OOP",
      duration: "2.5h",
      icon: <Layers className="w-5 h-5" />,
      lessons: [
        "Default and Parameterized Constructor",
        "Copy Constructor",
        "this Keyword and Operations",
      ],
    },
    {
      id: "03",
      title: "UML Diagrams & Types",
      description: "Visual modeling with UML diagrams",
      duration: "3h",
      icon: <BarChart3 className="w-5 h-5" />,
      lessons: [
        "Introduction to UML & Object Diagram",
        "Activity Diagram, Sequence Diagram",
        "State Diagram",
      ],
    },
    {
      id: "04",
      title: "Core Design Principles",
      description: "Essential software design principles",
      duration: "3.5h",
      icon: <Shield className="w-5 h-5" />,
      lessons: [
        "SOLID & GRASP",
        "DRY & KISS",
      ],
    },
    {
      id: "05",
      title: "Advance LLD & Use Cases",
      description: "Deep dive into SOLID principles and advanced design",
      duration: "5h",
      icon: <Target className="w-5 h-5" />,
      lessons: [
        "What are SOLID principles?",
        "Single Responsibility & Open/Closed Principle",
        "Liskov Substitution & Interface Segregation Principle",
        "Dependency Inversion",
      ],
    },
    {
      id: "06",
      title: "Design Patterns",
      description: "Master essential design patterns for software architecture",
      duration: "8h",
      icon: <GitBranch className="w-5 h-5" />,
      lessons: [
        "Strategy Pattern",
        "Observer Pattern",
        "Factory Pattern",
        "Abstract Factory Pattern",
        "Singleton Pattern",
        "Command Pattern",
        "Proxy Pattern",
        "Bridge Pattern",
        "Template method Pattern",
        "Composite Pattern",
        "Iterator Pattern",
      ],
    },
    {
      id: "07",
      title: "Case Studies & Contests",
      description: "Real-world system design case studies",
      duration: "3h",
      icon: <Trophy className="w-5 h-5" />,
      lessons: [
        "Movie Ticket Booking System",
        "Airline Booking System",
      ],
    },
    {
      id: "08",
      title: "High Level Design - Basics",
      description: "Foundation of system design and architecture",
      duration: "3h",
      icon: <Server className="w-5 h-5" />,
      lessons: [
        "Introduction to System Design",
        "System Design Basics",
        "Zero to Infinity Intro",
        "Client Server Architecture",
      ],
    },
    {
      id: "09",
      title: "System Design Components - Domain Name System",
      description: "Understanding DNS and its role in system design",
      duration: "2.5h",
      icon: <Globe className="w-5 h-5" />,
      lessons: [
        "Introduction to DNS",
        "Request Routing",
        "DNS Cache",
        "DNS in Action: Route53",
      ],
    },
    {
      id: "10",
      title: "System Design Components - Load Balancer",
      description: "Load balancing strategies and algorithms",
      duration: "3h",
      icon: <Network className="w-5 h-5" />,
      lessons: [
        "Introduction and Types of Load Balancers",
        "Scaling Load Balancers",
        "Load Balancing Algorithms",
      ],
    },
    {
      id: "11",
      title: "System Design Components - Scaling",
      description: "Scaling strategies for distributed systems",
      duration: "2h",
      icon: <TrendingUp className="w-5 h-5" />,
      lessons: [
        "Introduction to Scaling",
        "Types of Scaling",
      ],
    },
    {
      id: "12",
      title: "Exploring Database Architecture",
      description: "Understanding database systems and their architectures",
      duration: "3.5h",
      icon: <Database className="w-5 h-5" />,
      lessons: [
        "High level introduction to databases",
        "Relational Databases",
        "Non Relational Databases",
        "Comparing Relational and Non Relational Databases",
      ],
    },
    {
      id: "13",
      title: "Database Replication",
      description: "Database replication strategies and topologies",
      duration: "3h",
      icon: <HardDrive className="w-5 h-5" />,
      lessons: [
        "Introduction to Database Replication",
        "Types of Replication",
        "Multi Leader Replication Topology",
        "Leaderless Replication Topology",
      ],
    },
    {
      id: "14",
      title: "Database Sharding",
      description: "Sharding strategies for horizontal scaling",
      duration: "4h",
      icon: <Cpu className="w-5 h-5" />,
      lessons: [
        "Introduction - Database Sharding",
        "Sharding Strategies",
        "Rebalancing",
        "Consistent Hashing",
        "Production Implementations",
      ],
    },
    {
      id: "15",
      title: "Database Indexing",
      description: "Understanding database indexing and optimization",
      duration: "3.5h",
      icon: <Binary className="w-5 h-5" />,
      lessons: [
        "Introduction and Types of Indexes",
        "Advantages",
        "B+ Tree",
        "Internal working of B tree",
        "Explain Plan",
      ],
    },
    {
      id: "16",
      title: "Advance High Level Design",
      description: "Advanced HLD concepts with message brokers",
      duration: "3h",
      icon: <Cloud className="w-5 h-5" />,
      lessons: [
        "Introduction to Queueing Systems",
        "Issues and Types of Message Brokers",
        "Message Brokers in Action: SQS + SNS",
      ],
    },
    {
      id: "17",
      title: "Caching",
      description: "Caching strategies and implementations",
      duration: "3h",
      icon: <Zap className="w-5 h-5" />,
      lessons: [
        "Introduction - Caching",
        "Cache types",
        "Cache Invalidation",
        "Cache Eviction Policy",
      ],
    },
    {
      id: "18",
      title: "System Design Framework",
      description: "Complete framework for approaching system design",
      duration: "4h",
      icon: <LayoutDashboard className="w-5 h-5" />,
      lessons: [
        "System Design Framework",
        "Framework and Requirement Gathering",
        "High Level Design",
        "Back of the envelope estimates",
        "Detail Design and Wrap Up",
      ],
    },
    {
      id: "19",
      title: "Design Problems",
      description: "Solve real-world system design problems",
      duration: "5h",
      icon: <Target className="w-5 h-5" />,
      lessons: [
        "Design a Rate Limiter",
        "Designing Object Store",
        "Designing Twitter",
        "Design a tiny URL generator",
      ],
    },
  ],
  whatYouWillLearn: [
    "Master both High Level Design (HLD) and Low Level Design (LLD)",
    "Understand and apply SOLID, GRASP, DRY, and KISS principles",
    "Design scalable and reliable distributed systems",
    "Implement 11 essential design patterns",
    "Master database architecture, replication, sharding, and indexing",
    "Design real-world systems like Twitter, Rate Limiter, and Tiny URL",
    "Understand load balancing, caching, and DNS",
    "Build complete system design skills for FAANG interviews",
  ],
  requirements: [
    "Intermediate programming knowledge (any language)",
    "Basic understanding of data structures and algorithms",
    "Some experience with software development",
    "A computer with internet connection",
    "Eagerness to learn system design concepts",
  ],
  targetAudience: [
    "Software engineers preparing for senior engineering interviews",
    "Developers aiming to transition to FAANG companies",
    "System design enthusiasts",
    "Anyone looking to build scalable applications",
    "Architects and tech leads",
  ],
  features: [
    {
      icon: <Video className="w-5 h-5" />,
      label: "45 Hours of Video Content",
      description: "Comprehensive video lectures covering HLD and LLD",
    },
    {
      icon: <Code className="w-5 h-5" />,
      label: "180+ Lessons",
      description: "Structured learning from basics to advanced concepts",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: "Design Diagrams",
      description: "UML, sequence, and architecture diagrams included",
    },
    {
      icon: <Download className="w-5 h-5" />,
      label: "Downloadable Resources",
      description: "Cheat sheets, templates, and design documents",
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: "Community Discussion",
      description: "Discuss designs and get feedback from peers",
    },
    {
      icon: <RefreshCw className="w-5 h-5" />,
      label: "Lifetime Updates",
      description: "Course content updated with new industry trends",
    },
    {
      icon: <Award className="w-5 h-5" />,
      label: "Certificate of Completion",
      description: "Showcase your system design expertise",
    },
  ],
  instructor: {
    name: "Dr. Sarah Chen",
    title: "Senior Software Architect at Google, Ex-Amazon",
    image: "https://ui-avatars.com/api/?name=Sarah+Chen&background=cc785c&color=fff&size=100",
    bio: "Dr. Sarah Chen is a Senior Software Architect at Google with 12+ years of experience. She has designed and built large-scale distributed systems at Amazon and Google. She has conducted 1000+ system design interviews and mentored hundreds of engineers to senior roles.",
    students: 42318,
    rating: 4.9,
    courses: 12,
  },
  reviews: [
    {
      name: "Alex Johnson",
      rating: 5,
      date: "1 week ago",
      comment: "This course is incredible! The LLD and HLD coverage is comprehensive. I just landed a senior role at a FAANG company, and this course was instrumental in my preparation.",
      avatar: "https://ui-avatars.com/api/?name=Alex+Johnson&background=6b6960&color=fff&size=50",
    },
    {
      name: "Maria Garcia",
      rating: 5,
      date: "2 weeks ago",
      comment: "Finally found a course that covers both HLD and LLD in depth. The design patterns section alone is worth the price. Highly recommended for anyone preparing for senior interviews.",
      avatar: "https://ui-avatars.com/api/?name=Maria+Garcia&background=6b6960&color=fff&size=50",
    },
    {
      name: "James Wilson",
      rating: 5,
      date: "1 month ago",
      comment: "The database sharding and indexing modules were exceptional. Sarah explains complex concepts in a simple, understandable way. This course gave me the confidence to handle any design problem.",
      avatar: "https://ui-avatars.com/api/?name=James+Wilson&background=6b6960&color=fff&size=50",
    },
    {
      name: "Priya Patel",
      rating: 4,
      date: "3 weeks ago",
      comment: "Excellent course content! The case studies on Movie Booking and Airline Booking systems were particularly helpful. Would love to see more real-world examples.",
      avatar: "https://ui-avatars.com/api/?name=Priya+Patel&background=6b6960&color=fff&size=50",
    },
  ],
  faqs: [
    {
      question: "Is this course for beginners?",
      answer: "This course covers both HLD and LLD from basics to advanced. While some programming experience is recommended, we start from the fundamentals and progressively build up to advanced concepts.",
    },
    {
      question: "How long do I have access to the course?",
      answer: "You get lifetime access to all course materials, including any future updates and additions. New design problems are added regularly.",
    },
    {
      question: "What's the difference between HLD and LLD?",
      answer: "HLD (High Level Design) focuses on system architecture, components, and interactions at a macro level. LLD (Low Level Design) focuses on detailed implementation, class diagrams, and component-level design. This course covers both in depth.",
    },
    {
      question: "Will I get a certificate?",
      answer: "Yes, you'll receive a verified certificate of completion that you can add to your LinkedIn profile and resume.",
    },
    {
      question: "Are there practice problems included?",
      answer: "Yes, the course includes design problems, case studies, and contests to practice your skills. You'll work on designing real-world systems like Twitter, Rate Limiter, and Tiny URL.",
    },
  ],
};

// ─── FAQ Accordion ────────────────────────────────────────────────────────────

function FAQItem({ question, answer, dark }: { question: string; answer: string; dark: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="border rounded-xl overflow-hidden transition-all duration-200"
      style={{
        borderColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)",
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-200"
        style={{
          background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)",
        }}
      >
        <span className={`font-medium text-sm ${dark ? "text-[#ece9e4]" : "text-[#201f1c]"}`}>
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className={`w-4 h-4 ${dark ? "text-[#8c8b84]" : "text-[#6b6960]"}`} />
        ) : (
          <ChevronDown className={`w-4 h-4 ${dark ? "text-[#8c8b84]" : "text-[#6b6960]"}`} />
        )}
      </button>
      {isOpen && (
        <div className="px-5 pb-4">
          <p className={`text-sm leading-relaxed ${dark ? "text-[#8c8b84]" : "text-[#6b6960]"}`}>
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Module Accordion ──────────────────────────────────────────────────────────

function ModuleItem({ module, dark }: { module: Module; dark: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const border = dark ? "border-white/[0.08]" : "border-black/[0.07]";
  const text = dark ? "text-[#ece9e4]" : "text-[#201f1c]";
  const muted = dark ? "text-[#8c8b84]" : "text-[#6b6960]";
  const hoverBg = dark ? "hover:bg-white/[0.06]" : "hover:bg-black/[0.045]";

  return (
    <div
      className="border rounded-xl overflow-hidden transition-all duration-200"
      style={{
        borderColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)",
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-200 ${hoverBg}`}
      >
        <div className="flex items-center gap-3">
          <span className="text-[#cc785c]">{module.icon}</span>
          <div>
            <span className={`font-medium text-sm ${text}`}>
              {module.id}. {module.title}
            </span>
            <p className={`text-xs ${muted}`}>{module.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs ${muted}`}>{module.duration}</span>
          {isOpen ? (
            <ChevronUp className={`w-4 h-4 ${muted}`} />
          ) : (
            <ChevronDown className={`w-4 h-4 ${muted}`} />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="px-5 pb-4 pt-1">
          <div className="space-y-1">
            {module.lessons.map((lesson, index) => (
              <div key={index} className="flex items-center gap-3 py-1.5">
                <Play className="w-3 h-3 text-[#cc785c]" />
                <span className={`text-sm ${muted}`}>{lesson}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

interface CoursePageProps {
  params?: {
    courseId?: string;
  };
}

export default function SystemDesignCourse({ params }: CoursePageProps) {
  const dark = useSelector(selectDark);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState<string>("overview");

  const course = SYSTEM_DESIGN_COURSE;

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

  const border = dark ? "border-white/[0.08]" : "border-black/[0.07]";
  const text = dark ? "text-[#ece9e4]" : "text-[#201f1c]";
  const muted = dark ? "text-[#8c8b84]" : "text-[#6b6960]";
  const mutedLight = dark ? "text-[#6b6a62]" : "text-[#8c8b84]";
  const bg = dark ? "bg-[#0a0a0a]" : "bg-[#faf9f5]";
  const cardBg = dark ? "bg-[#131211]" : "bg-white";

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

        .gradient-text {
          background: linear-gradient(135deg, #cc785c 0%, #e8956d 40%, #b5613e 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: #cc785c;
        }

        .sticky-nav {
          position: sticky;
          top: 76px;
          z-index: 10;
        }

        .nav-link {
          transition: all 0.2s ease;
          position: relative;
          cursor: pointer;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: #cc785c;
          transform: scaleX(0);
          transition: transform 0.2s ease;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          transform: scaleX(1);
        }

        .feature-card {
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-4px);
          border-color: rgba(204,120,92,0.3) !important;
        }

        .module-count {
          background: linear-gradient(135deg, rgba(204,120,92,0.1), rgba(181,97,62,0.05));
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
        className={`font-body ${bg} py-8 sm:py-12 px-4 sm:px-6 transition-colors duration-500 min-h-screen`}
      >
        <div className="max-w-7xl mx-auto">
          {/* ── Header ── */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-8">
            {/* Course Info */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className={`text-xs font-semibold tracking-[0.15em] uppercase ${muted}`}>
                  {course.level}
                </span>
                <span className={`text-xs ${muted}`}>•</span>
                <span className={`text-xs font-semibold tracking-[0.15em] uppercase text-[#cc785c]`}>
                  HLD & LLD
                </span>
              </div>

              <h1
                className={`font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-[-0.02em] mb-3 ${text}`}
                style={{ animation: "fadeSlideUp 0.6s ease-out both" }}
              >
                {course.title}
              </h1>

              <h2
                className={`text-lg sm:text-xl font-medium mb-4 ${muted}`}
                style={{ animation: "fadeSlideUp 0.7s ease-out 0.1s both" }}
              >
                {course.subtitle}
              </h2>

              <p
                className={`text-sm sm:text-base leading-relaxed max-w-2xl ${muted} mb-6`}
                style={{ animation: "fadeSlideUp 0.7s ease-out 0.2s both" }}
              >
                {course.description}
              </p>

              {/* Stats */}
              <div
                className="flex flex-wrap items-center gap-4 sm:gap-6"
                style={{ animation: "fadeSlideUp 0.7s ease-out 0.3s both" }}
              >
                <div className="flex items-center gap-2">
                  <Clock className={`w-4 h-4 ${mutedLight}`} />
                  <span className={`text-sm ${muted}`}>{course.hours} hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className={`w-4 h-4 ${mutedLight}`} />
                  <span className={`text-sm ${muted}`}>{course.lessons} lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className={`w-4 h-4 ${mutedLight}`} />
                  <span className={`text-sm ${muted}`}>{course.instructor.students.toLocaleString()}+ enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className={`w-4 h-4 text-[#cc785c] fill-[#cc785c]`} />
                  <span className={`text-sm ${muted}`}>{course.instructor.rating}/5 rating</span>
                </div>
              </div>
            </div>

            {/* Price Card */}
            <div
              className="lg:w-80 shrink-0 rounded-2xl p-6"
              style={{
                border: border,
                background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
              }}
            >
              <div className="flex items-baseline gap-2 mb-2">
                <span className={`font-display text-3xl font-bold ${text}`}>
                  ${course.price}
                </span>
                {course.originalPrice && (
                  <span className={`text-sm line-through ${mutedLight}`}>
                    ${course.originalPrice}
                  </span>
                )}
              </div>
              <p className={`text-xs ${muted} mb-4`}>
                One-time payment · Lifetime access
              </p>
              <Link
                href={`/checkout?course=${course.id}`}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-[0_8px_24px_-6px_rgba(204,120,92,0.4)] hover:shadow-[0_12px_32px_-6px_rgba(204,120,92,0.5)]"
                style={{
                  background: "linear-gradient(135deg, #cc785c 0%, #b5613e 100%)",
                }}
              >
                Enroll Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="mt-3 text-center">
                <span className={`text-[10px] ${mutedLight}`}>
                  🔒 30-day money-back guarantee
                </span>
              </div>
            </div>
          </div>

          {/* ── Navigation Tabs ── */}
          <div
            className={`sticky-nav ${bg} border-b ${border} mb-8 overflow-x-auto`}
            style={{ paddingTop: 4 }}
          >
            <div className="flex items-center gap-6 sm:gap-8 whitespace-nowrap">
              {[
                { id: "overview", label: "Overview" },
                { id: "curriculum", label: "Curriculum" },
                { id: "modules", label: "Modules" },
                { id: "instructor", label: "Instructor" },
                { id: "reviews", label: "Reviews" },
                { id: "faqs", label: "FAQs" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`nav-link py-3 text-sm font-medium ${activeSection === tab.id ? "active text-[#cc785c]" : muted}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Content ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview Section */}
              {activeSection === "overview" && (
                <>
                  <div>
                    <h3 className={`font-display text-xl font-semibold mb-4 ${text}`}>
                      What you'll learn
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {course.whatYouWillLearn.map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[#cc785c] shrink-0 mt-0.5" />
                          <span className={`text-sm ${muted}`}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className={`font-display text-xl font-semibold mb-4 ${text}`}>
                      Requirements
                    </h3>
                    <ul className="space-y-2">
                      {course.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#cc785c] mt-2 shrink-0" />
                          <span className={`text-sm ${muted}`}>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className={`font-display text-xl font-semibold mb-4 ${text}`}>
                      Course features
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {course.features.map((feature, index) => (
                        <div
                          key={index}
                          className="feature-card flex items-start gap-3 p-3 rounded-xl"
                          style={{
                            border: border,
                            background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)",
                          }}
                        >
                          <span className="text-[#cc785c] shrink-0">{feature.icon}</span>
                          <div>
                            <h4 className={`text-sm font-semibold ${text}`}>{feature.label}</h4>
                            <p className={`text-xs ${muted}`}>{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className={`font-display text-xl font-semibold mb-4 ${text}`}>
                      Who this course is for
                    </h3>
                    <ul className="space-y-2">
                      {course.targetAudience.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#cc785c] mt-2 shrink-0" />
                          <span className={`text-sm ${muted}`}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {/* Curriculum Section */}
              {activeSection === "curriculum" && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`font-display text-xl font-semibold ${text}`}>
                      Course curriculum
                    </h3>
                    <span className={`text-sm ${muted}`}>{course.lessons} lessons</span>
                  </div>
                  <div className="space-y-3">
                    {course.modules.map((module, index) => (
                      <ModuleItem key={index} module={module} dark={dark} />
                    ))}
                  </div>
                </div>
              )}

              {/* Modules Section */}
              {activeSection === "modules" && (
                <div>
                  <h3 className={`font-display text-xl font-semibold mb-4 ${text}`}>
                    All Modules ({course.modules.length})
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {course.modules.map((module, index) => (
                      <div
                        key={index}
                        className={`p-5 rounded-xl border ${border} ${cardBg} transition-all duration-200 hover:border-[#cc785c]/30`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[#cc785c]/10 flex items-center justify-center text-[#cc785c] shrink-0">
                            {module.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <h4 className={`font-semibold ${text}`}>
                                {module.id}. {module.title}
                              </h4>
                              <span className={`text-xs ${muted}`}>{module.duration}</span>
                            </div>
                            <p className={`text-sm ${muted} mt-1`}>{module.description}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {module.lessons.slice(0, 4).map((lesson, idx) => (
                                <span
                                  key={idx}
                                  className={`text-[10px] px-2 py-0.5 rounded-full ${dark ? "bg-white/5 text-[#8c8b84]" : "bg-black/5 text-[#6b6960]"}`}
                                >
                                  {lesson}
                                </span>
                              ))}
                              {module.lessons.length > 4 && (
                                <span className={`text-[10px] px-2 py-0.5 rounded-full ${muted}`}>
                                  +{module.lessons.length - 4} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Instructor Section */}
              {activeSection === "instructor" && (
                <div>
                  <div className="flex items-start gap-4">
                    <img
                      src={course.instructor.image}
                      alt={course.instructor.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div>
                      <h3 className={`font-display text-xl font-semibold ${text}`}>
                        {course.instructor.name}
                      </h3>
                      <p className={`text-sm ${muted} mb-2`}>{course.instructor.title}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-[#cc785c]" />
                          <span className={muted}>{course.instructor.students.toLocaleString()} students</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-[#cc785c] fill-[#cc785c]" />
                          <span className={muted}>{course.instructor.rating} rating</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5 text-[#cc785c]" />
                          <span className={muted}>{course.instructor.courses} courses</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className={`text-sm leading-relaxed ${muted} mt-4`}>
                    {course.instructor.bio}
                  </p>
                </div>
              )}

              {/* Reviews Section */}
              {activeSection === "reviews" && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`font-display text-xl font-semibold ${text}`}>
                      Student reviews
                    </h3>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-[#cc785c] fill-[#cc785c]" />
                      <span className={`font-semibold ${text}`}>{course.instructor.rating}</span>
                      <span className={muted}>({course.reviews.length} reviews)</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {course.reviews.map((review, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-xl"
                        style={{
                          border: border,
                          background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)",
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <span className={`font-medium ${text}`}>{review.name}</span>
                              <div className="flex items-center gap-1">
                                {Array.from({ length: review.rating }).map((_, i) => (
                                  <Star key={i} className="w-3.5 h-3.5 text-[#cc785c] fill-[#cc785c]" />
                                ))}
                              </div>
                            </div>
                            <span className={`text-xs ${mutedLight}`}>{review.date}</span>
                            <p className={`text-sm ${muted} mt-1`}>{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs Section */}
              {activeSection === "faqs" && (
                <div>
                  <h3 className={`font-display text-xl font-semibold mb-4 ${text}`}>
                    Frequently asked questions
                  </h3>
                  <div className="space-y-3">
                    {course.faqs.map((faq, index) => (
                      <FAQItem key={index} {...faq} dark={dark} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div
                className="p-4 rounded-xl text-center"
                style={{
                  border: border,
                  background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)",
                }}
              >
                <Shield className="w-8 h-8 text-[#cc785c] mx-auto mb-2" />
                <h4 className={`font-semibold text-sm ${text}`}>30-Day Money-Back Guarantee</h4>
                <p className={`text-xs ${muted} mt-1`}>
                  Not satisfied? Get a full refund within 30 days.
                </p>
              </div>

              <div
                className="p-4 rounded-xl"
                style={{
                  border: border,
                  background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)",
                }}
              >
                <h4 className={`font-semibold text-sm ${text} mb-3`}>This course includes</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Play className="w-4 h-4 text-[#cc785c]" />
                    <span className={muted}>{course.hours} hours on-demand video</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4 text-[#cc785c]" />
                    <span className={muted}>{course.lessons} lectures</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Download className="w-4 h-4 text-[#cc785c]" />
                    <span className={muted}>Downloadable resources</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="w-4 h-4 text-[#cc785c]" />
                    <span className={muted}>Certificate of completion</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MessageCircle className="w-4 h-4 text-[#cc785c]" />
                    <span className={muted}>Community access</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-[#cc785c]" />
                    <span className={muted}>Lifetime access</span>
                  </div>
                </div>
              </div>

              <div className="module-count p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-xs ${muted}`}>Modules</p>
                    <p className={`text-lg font-display font-semibold ${text}`}>{course.modules.length}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${muted}`}>Lessons</p>
                    <p className={`text-lg font-display font-semibold ${text}`}>{course.lessons}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${muted}`}>Duration</p>
                    <p className={`text-lg font-display font-semibold ${text}`}>{course.hours}h</p>
                  </div>
                </div>
              </div>

              <div className="lg:hidden">
                <Link
                  href={`/checkout?course=${course.id}`}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-[0_8px_24px_-6px_rgba(204,120,92,0.4)]"
                  style={{
                    background: "linear-gradient(135deg, #cc785c 0%, #b5613e 100%)",
                  }}
                >
                  Enroll Now - ${course.price}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}