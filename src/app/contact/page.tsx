"use client";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectDark } from "../../lib/features/theme/themeSlice";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle,
  AlertCircle,
  User,
  MessageCircle,
  Building,
  Globe,
  Clock,
//   Instagram,
//   Twitter,
//   Linkedin,
//   Youtube,
//   Github,
  ArrowLeft,
  Sparkles,
  Zap,
  Shield,
  Heart,
  Users,
  BookOpen,
  Code,
  Database,
  Layers,
  Brain,
  Award,
  Target,
  Trophy,
  Flame,
  Crown,
  Star,
  MessageSquare,
  Headphones,
  HelpCircle,
  FileText,
  PenLine,
  Presentation,
  Library,
  Gift,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

// ─── Static Data ──────────────────────────────────────────────────────────

const FAQS: FAQItem[] = [
  {
    category: "General",
    question: "What is Algo.Design?",
    answer: "Algo.Design is a comprehensive learning platform that helps software engineers master Data Structures, Algorithms, and System Design. We offer expert-curated courses, practice problems, mock interviews, and a supportive community to help you crack technical interviews at top companies.",
  },
  {
    category: "General",
    question: "Who is this platform for?",
    answer: "Our platform is designed for software engineers preparing for technical interviews, computer science students, developers transitioning to FAANG companies, and anyone who wants to master DSA and System Design concepts.",
  },
  {
    category: "General",
    question: "How do I get started?",
    answer: "Simply browse our courses, select the one that matches your goals, and enroll. You'll get instant access to all course materials, including video lectures, practice problems, and downloadable resources.",
  },
  {
    category: "Courses",
    question: "What courses do you offer?",
    answer: "We offer comprehensive courses on Data Structures (Arrays, Linked Lists, Trees, Graphs, etc.), Algorithms (Sorting, Searching, DP, etc.), System Design (HLD, LLD, Design Patterns, etc.), and Interview Preparation (Mock Interviews, Coding Challenges, etc.).",
  },
  {
    category: "Courses",
    question: "How long do I have access to a course?",
    answer: "You get lifetime access to all course materials, including any future updates and additions. You can learn at your own pace and revisit the content anytime.",
  },
  {
    category: "Courses",
    question: "What programming languages are used?",
    answer: "Our courses primarily use Python, but the concepts apply to any programming language. We also provide code examples in Java, C++, and JavaScript for most topics.",
  },
  {
    category: "Payment",
    question: "How much do the courses cost?",
    answer: "Each course is priced at just $9, which is a fraction of the cost of traditional bootcamps. We also offer bundles at special prices. All courses come with a 30-day money-back guarantee.",
  },
  {
    category: "Payment",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. All payments are processed securely through our payment partners.",
  },
  {
    category: "Payment",
    question: "Is there a money-back guarantee?",
    answer: "Yes! We offer a 30-day money-back guarantee. If you're not satisfied with any course for any reason, we'll give you a full refund. No questions asked.",
  },
  {
    category: "Community",
    question: "How do I join the community?",
    answer: "Once you enroll in a course, you'll get access to our community forums, discussion groups, and study sessions. You can connect with fellow learners, share your progress, and get help from instructors and peers.",
  },
  {
    category: "Community",
    question: "Are there live sessions or events?",
    answer: "Yes! We regularly host live webinars, Q&A sessions, mock interviews, and study sessions. Check our events page for upcoming sessions and recordings of past events.",
  },
  {
    category: "Technical",
    question: "What are the system requirements?",
    answer: "You just need a computer with an internet connection and a modern web browser. All our content is available online, and you can learn from anywhere, anytime.",
  },
];

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Dr. Sarah Chen",
    role: "Chief Instructor & Founder",
    bio: "Former Senior Software Engineer at Google and Amazon with 12+ years of experience. Conducted 1000+ technical interviews and helped 5000+ engineers land their dream jobs.",
    image: "https://ui-avatars.com/api/?name=Sarah+Chen&background=cc785c&color=fff&size=150&font-size=0.5",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    name: "Alex Thompson",
    role: "Head of Curriculum",
    bio: "Former Engineering Manager at Facebook with expertise in distributed systems and algorithms. Passionate about making complex concepts accessible to everyone.",
    image: "https://ui-avatars.com/api/?name=Alex+Thompson&background=cc785c&color=fff&size=150&font-size=0.5",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    name: "Maya Patel",
    role: "Senior Instructor",
    bio: "Former Senior Software Engineer at Microsoft with deep expertise in data structures and algorithms. Has mentored 1000+ students to successful careers in tech.",
    image: "https://ui-avatars.com/api/?name=Maya+Patel&background=cc785c&color=fff&size=150&font-size=0.5",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
];

const CONTACT_INFO = [
  {
    icon: <Mail className="w-5 h-5" />,
    title: "Email",
    details: ["support@algodesign.com", "hello@algodesign.com"],
    link: "mailto:support@algodesign.com",
  },
  {
    icon: <Phone className="w-5 h-5" />,
    title: "Phone",
    details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
    link: "tel:+15551234567",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    title: "Office",
    details: ["123 Tech Park, Suite 100", "San Francisco, CA 94105"],
    link: "https://maps.google.com",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Working Hours",
    details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat - Sun: Closed"],
    link: null,
  },
];

// ─── FAQ Accordion ──────────────────────────────────────────────────────────

function FAQItemComponent({ faq, dark }: { faq: FAQItem; dark: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const border = dark ? "border-white/[0.08]" : "border-black/[0.07]";
  const text = dark ? "text-[#ece9e4]" : "text-[#201f1c]";
  const muted = dark ? "text-[#8c8b84]" : "text-[#6b6960]";
  const hoverBg = dark ? "hover:bg-white/[0.06]" : "hover:bg-black/[0.045]";

  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-200 ${border}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-200 ${hoverBg}`}
      >
        <span className={`font-medium text-sm ${text}`}>{faq.question}</span>
        <span className={`text-2xl font-light ${muted} ${isOpen ? "rotate-180" : ""} transition-transform duration-200`}>
          {isOpen ? "−" : "+"}
        </span>
      </button>
      {isOpen && (
        <div className="px-5 pb-4">
          <p className={`text-sm leading-relaxed ${muted}`}>{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ContactPage() {
  const dark = useSelector(selectDark);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const formRef = useRef<HTMLFormElement>(null);

  const categories = ["All", ...new Set(FAQS.map(f => f.category))];
  const filteredFAQs = activeCategory === "All" 
    ? FAQS 
    : FAQS.filter(f => f.category === activeCategory);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSuccess(true);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      category: "general",
    });

    // Reset success message after 5 seconds
    setTimeout(() => setSuccess(false), 5000);
  };

  const border = dark ? "border-white/[0.08]" : "border-black/[0.07]";
  const text = dark ? "text-[#ece9e4]" : "text-[#201f1c]";
  const muted = dark ? "text-[#8c8b84]" : "text-[#6b6960]";
  const mutedLight = dark ? "text-[#6b6a62]" : "text-[#8c8b84]";
  const bg = dark ? "bg-[#0a0a0a]" : "bg-[#faf9f5]";
  const cardBg = dark ? "bg-[#131211]" : "bg-white";
  const inputBg = dark ? "bg-white/[0.04]" : "bg-black/[0.02]";
  const hoverBg = dark ? "hover:bg-white/[0.06]" : "hover:bg-black/[0.045]";

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-500`}>
      {/* ─── Hero Section ─── */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#cc785c]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#b5613e]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#cc785c] animate-pulse inline-block" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#cc785c]">
              Get in Touch
            </span>
          </div>

          <h1 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-[-0.02em] mb-4 ${text}`}>
            We'd Love to Hear <br />
            <span
              style={{
                background: "linear-gradient(135deg, #cc785c 0%, #e8956d 40%, #b5613e 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              From You
            </span>
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed max-w-2xl mx-auto ${muted}`}>
            Have questions about our courses? Need help with something? Looking to partner with us?
            We're here to help. Reach out and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* ─── Contact Information ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CONTACT_INFO.map((info) => (
            <div
              key={info.title}
              className={`p-6 rounded-2xl border ${border} ${cardBg} transition-all duration-200 hover:border-[#cc785c]/30 hover:-translate-y-1`}
            >
              <div className="w-12 h-12 rounded-xl bg-[#cc785c]/10 flex items-center justify-center text-[#cc785c] mb-4">
                {info.icon}
              </div>
              <h3 className={`font-semibold text-sm ${text} mb-2`}>{info.title}</h3>
              {info.details.map((detail, index) => (
                <p key={index} className={`text-sm ${muted}`}>{detail}</p>
              ))}
              {info.link && (
                <Link
                  href={info.link}
                  className="inline-flex items-center gap-1 text-xs text-[#cc785c] hover:text-[#b5613e] transition-colors mt-2"
                >
                  Contact
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── Contact Form & Info ─── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className={`lg:col-span-2 rounded-2xl border ${border} ${cardBg} p-6 sm:p-8`}>
            <h2 className={`font-display text-2xl font-semibold ${text} mb-6`}>
              Send Us a Message
            </h2>

            {success && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-6 animate-fadeIn">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  Message sent successfully! We'll get back to you within 24 hours.
                </p>
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${text} mb-1.5`}>
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.name ? "text-red-500" : muted}`} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 outline-none ${inputBg} ${text} ${
                        errors.name
                          ? "border-red-500 focus:border-red-500"
                          : border + " focus:border-[#cc785c]"
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="flex items-center gap-1 text-red-500 text-xs mt-1.5">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className={`block text-sm font-medium ${text} mb-1.5`}>
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.email ? "text-red-500" : muted}`} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 outline-none ${inputBg} ${text} ${
                        errors.email
                          ? "border-red-500 focus:border-red-500"
                          : border + " focus:border-[#cc785c]"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="flex items-center gap-1 text-red-500 text-xs mt-1.5">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${text} mb-1.5`}>
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${border} ${inputBg} ${text} focus:border-[#cc785c] outline-none transition-colors`}
                >
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium ${text} mb-1.5`}>
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none ${inputBg} ${text} ${
                    errors.subject
                      ? "border-red-500 focus:border-red-500"
                      : border + " focus:border-[#cc785c]"
                  }`}
                />
                {errors.subject && (
                  <p className="flex items-center gap-1 text-red-500 text-xs mt-1.5">
                    <AlertCircle className="w-3 h-3" />
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium ${text} mb-1.5`}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help..."
                  rows={5}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none ${inputBg} ${text} resize-none ${
                    errors.message
                      ? "border-red-500 focus:border-red-500"
                      : border + " focus:border-[#cc785c]"
                  }`}
                />
                {errors.message && (
                  <p className="flex items-center gap-1 text-red-500 text-xs mt-1.5">
                    <AlertCircle className="w-3 h-3" />
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-[0_8px_24px_-6px_rgba(204,120,92,0.4)] hover:shadow-[0_12px_32px_-6px_rgba(204,120,92,0.5)] disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  background: loading
                    ? "linear-gradient(135deg, #cc785c 0%, #b5613e 100%)"
                    : "linear-gradient(135deg, #cc785c 0%, #b5613e 100%)",
                }}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className={`text-center text-xs ${mutedLight}`}>
                We'll respond within 24 hours. Your information is safe with us.
              </p>
            </form>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <div className={`rounded-2xl border ${border} ${cardBg} p-6`}>
              <h3 className={`font-semibold ${text} mb-4`}>Quick Links</h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/about" className={`text-sm ${muted} hover:text-[#cc785c] transition-colors flex items-center gap-2`}>
                    <ArrowRight className="w-3 h-3 text-[#cc785c]" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/dsa" className={`text-sm ${muted} hover:text-[#cc785c] transition-colors flex items-center gap-2`}>
                    <ArrowRight className="w-3 h-3 text-[#cc785c]" />
                    Browse Courses
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className={`text-sm ${muted} hover:text-[#cc785c] transition-colors flex items-center gap-2`}>
                    <ArrowRight className="w-3 h-3 text-[#cc785c]" />
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className={`text-sm ${muted} hover:text-[#cc785c] transition-colors flex items-center gap-2`}>
                    <ArrowRight className="w-3 h-3 text-[#cc785c]" />
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/community" className={`text-sm ${muted} hover:text-[#cc785c] transition-colors flex items-center gap-2`}>
                    <ArrowRight className="w-3 h-3 text-[#cc785c]" />
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            {/* <div className={`rounded-2xl border ${border} ${cardBg} p-6`}>
              <h3 className={`font-semibold ${text} mb-4`}>Connect With Us</h3>
              <div className="flex items-center gap-3">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-xl border ${border} flex items-center justify-center ${hoverBg} transition-all duration-200 hover:scale-110 hover:border-[#cc785c]/30`}
                >
                  <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-xl border ${border} flex items-center justify-center ${hoverBg} transition-all duration-200 hover:scale-110 hover:border-[#cc785c]/30`}
                >
                  <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-xl border ${border} flex items-center justify-center ${hoverBg} transition-all duration-200 hover:scale-110 hover:border-[#cc785c]/30`}
                >
                  <Github className="w-4 h-4 text-[#333]" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-xl border ${border} flex items-center justify-center ${hoverBg} transition-all duration-200 hover:scale-110 hover:border-[#cc785c]/30`}
                >
                  <Youtube className="w-4 h-4 text-[#FF0000]" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-xl border ${border} flex items-center justify-center ${hoverBg} transition-all duration-200 hover:scale-110 hover:border-[#cc785c]/30`}
                >
                  <Instagram className="w-4 h-4 text-[#E4405F]" />
                </a>
              </div>
            </div> */}

            <div className={`rounded-2xl border ${border} ${cardBg} p-6 bg-gradient-to-r from-[#cc785c]/10 to-[#b5613e]/10`}>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#cc785c]" />
                <h3 className={`font-semibold ${text}`}>Need Quick Help?</h3>
              </div>
              <p className={`text-sm ${muted} mb-4`}>
                Check out our FAQ section for answers to common questions.
              </p>
              <Link
                href="#faq"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#cc785c] hover:text-[#b5613e] transition-colors"
              >
                View FAQs
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Team Section ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="text-center mb-12">
          <h2 className={`font-display text-2xl sm:text-3xl font-semibold ${text} mb-3`}>
            Meet Our Team
          </h2>
          <p className={`text-sm sm:text-base ${muted} max-w-2xl mx-auto`}>
            We're passionate about helping engineers succeed in their careers.
          </p>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.name}
              className={`p-6 rounded-2xl border ${border} ${cardBg} text-center transition-all duration-200 hover:border-[#cc785c]/30 hover:-translate-y-1`}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className={`font-semibold ${text}`}>{member.name}</h3>
              <p className={`text-sm text-[#cc785c] font-medium mb-2`}>{member.role}</p>
              <p className={`text-sm ${muted} mb-4`}>{member.bio}</p>
              <div className="flex items-center justify-center gap-2">
                {member.social.twitter && (
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg border ${border} ${hoverBg} transition-all duration-200 hover:scale-110`}
                  >
                    <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                  </a>
                )}
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg border ${border} ${hoverBg} transition-all duration-200 hover:scale-110`}
                  >
                    <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                  </a>
                )}
                {member.social.github && (
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg border ${border} ${hoverBg} transition-all duration-200 hover:scale-110`}
                  >
                    <Github className="w-4 h-4 text-[#333]" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div> */}
      </section>

      {/* ─── FAQ Section ─── */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <HelpCircle className="w-5 h-5 text-[#cc785c]" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#cc785c]">
              FAQs
            </span>
          </div>
          <h2 className={`font-display text-2xl sm:text-3xl font-semibold ${text} mb-3`}>
            Frequently Asked Questions
          </h2>
          <p className={`text-sm ${muted}`}>
            Find answers to the most common questions about our platform.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                activeCategory === category
                  ? "text-white bg-[#cc785c] shadow-[0_4px_16px_-4px_rgba(204,120,92,0.4)]"
                  : dark
                  ? "text-[#8c8b84] border border-white/[0.08] hover:text-[#ece9e4]"
                  : "text-[#6b6960] border border-black/[0.07] hover:text-[#201f1c]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQs */}
        <div className="space-y-3">
          {filteredFAQs.map((faq) => (
            <FAQItemComponent key={faq.question} faq={faq} dark={dark} />
          ))}
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div
          className="relative rounded-3xl p-8 sm:p-12 text-center overflow-hidden"
          style={{
            background: dark
              ? "linear-gradient(135deg, rgba(204,120,92,0.15), rgba(181,97,62,0.08))"
              : "linear-gradient(135deg, rgba(204,120,92,0.08), rgba(181,97,62,0.04))",
            border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.07)",
          }}
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#cc785c]/5 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#b5613e]/5 rounded-full blur-2xl" />

          <div className="relative">
            <Gift className="w-12 h-12 text-[#cc785c] mx-auto mb-4" />
            <h2 className={`font-display text-2xl sm:text-3xl font-semibold ${text} mb-3`}>
              Start Your Learning Journey Today
            </h2>
            <p className={`text-sm sm:text-base ${muted} max-w-xl mx-auto mb-6`}>
              Join 50,000+ engineers mastering DSA and System Design. Get lifetime access to all courses.
            </p>
            <Link
              href="/dsa"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] active:scale-95 shadow-[0_8px_24px_-6px_rgba(204,120,92,0.4)] hover:shadow-[0_12px_32px_-6px_rgba(204,120,92,0.5)]"
              style={{
                background: "linear-gradient(135deg, #cc785c 0%, #b5613e 100%)",
              }}
            >
              Browse Courses
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}