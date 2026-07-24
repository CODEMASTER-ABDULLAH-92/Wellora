"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectDark } from "../../lib/features/theme/themeSlice";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  CreditCard,
  Lock,
  Shield,
  Zap,
  Star,
  Clock,
  Users,
  FileText,
  Award,
  BookOpen,
  Code,
  Database,
  GitBranch,
  Layers,
  Binary,
  TrendingUp,
  DollarSign,
  Calendar,
  Mail,
  User,
  Phone,
  MapPin,
  ChevronRight,
  AlertCircle,
  Gift,
  Sparkles,
  Crown,
  Check,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

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
  icon: React.ReactNode;
  whatYouWillLearn: string[];
  instructor: {
    name: string;
    title: string;
    image: string;
    rating: number;
    students: number;
  };
}

// ─── Course Data ──────────────────────────────────────────────────────────

const COURSE_DATA: Record<string, CourseData> = {
  arrays: {
    id: "arrays",
    title: "Complete Arrays Mastery",
    subtitle: "From Zero to Interview-Ready in 12 Hours",
    description: "Master arrays from basics to advanced — understand memory layout, two-pointer techniques, sliding window, and every array problem pattern used in FAANG interviews.",
    price: 9,
    originalPrice: 49,
    hours: 12,
    lessons: 87,
    level: "Beginner",
    icon: <Database className="w-8 h-8" />,
    whatYouWillLearn: [
      "Master all array operations and their time complexities",
      "Implement two-pointer and sliding window techniques",
      "Solve any subarray/subsequence problem",
      "Handle matrix and 2D array problems efficiently",
      "Apply prefix sum and difference arrays",
      "Recognize and apply 10+ array problem patterns",
    ],
    instructor: {
      name: "Dr. Sarah Chen",
      title: "Senior Software Engineer at Google, Ex-Facebook",
      image: "https://ui-avatars.com/api/?name=Sarah+Chen&background=cc785c&color=fff&size=100",
      rating: 4.9,
      students: 15432,
    },
  },
  "linked-lists": {
    id: "linked-lists",
    title: "Complete Linked Lists",
    subtitle: "Master Linked Lists in 10 Hours",
    description: "Master singly, doubly, and circular linked lists — understand pointers, recursion, and every linked list pattern from reversing to detecting cycles.",
    price: 9,
    originalPrice: 49,
    hours: 10,
    lessons: 72,
    level: "Beginner",
    icon: <GitBranch className="w-8 h-8" />,
    whatYouWillLearn: [
      "Master all linked list operations",
      "Implement singly, doubly, and circular lists",
      "Detect and remove cycles efficiently",
      "Reverse linked lists using iterative and recursive approaches",
      "Merge and sort linked lists",
      "Design and implement LRU cache",
    ],
    instructor: {
      name: "Dr. Sarah Chen",
      title: "Senior Software Engineer at Google, Ex-Facebook",
      image: "https://ui-avatars.com/api/?name=Sarah+Chen&background=cc785c&color=fff&size=100",
      rating: 4.8,
      students: 12345,
    },
  },
  "stacks-queues": {
    id: "stacks-queues",
    title: "Stacks & Queues Deep Dive",
    subtitle: "Master Stacks and Queues in 8 Hours",
    description: "Learn stack and queue implementations, monotonic stack patterns, and solve complex problems like expression evaluation and sliding window maximum.",
    price: 9,
    originalPrice: 44,
    hours: 8,
    lessons: 58,
    level: "Intermediate",
    icon: <Layers className="w-8 h-8" />,
    whatYouWillLearn: [
      "Master stack and queue operations",
      "Implement monotonic stack patterns",
      "Solve expression evaluation problems",
      "Design data structures using stacks and queues",
      "Implement queue using stacks and vice versa",
      "Solve sliding window problems efficiently",
    ],
    instructor: {
      name: "Dr. Sarah Chen",
      title: "Senior Software Engineer at Google, Ex-Facebook",
      image: "https://ui-avatars.com/api/?name=Sarah+Chen&background=cc785c&color=fff&size=100",
      rating: 4.7,
      students: 10000,
    },
  },
  "trees-graphs": {
    id: "trees-graphs",
    title: "Trees & Graphs Masterclass",
    subtitle: "Master Trees and Graphs in 15 Hours",
    description: "Master binary trees, BSTs, AVL trees, and graph algorithms — from BFS/DFS to topological sorting and Dijkstra's algorithm.",
    price: 9,
    originalPrice: 59,
    hours: 15,
    lessons: 104,
    level: "Advanced",
    icon: <Binary className="w-8 h-8" />,
    whatYouWillLearn: [
      "Master binary trees and BSTs",
      "Implement balanced trees (AVL, Red-Black)",
      "Solve tree traversal problems",
      "Implement BFS and DFS",
      "Solve graph problems efficiently",
      "Understand shortest path algorithms",
    ],
    instructor: {
      name: "Dr. Sarah Chen",
      title: "Senior Software Engineer at Google, Ex-Facebook",
      image: "https://ui-avatars.com/api/?name=Sarah+Chen&background=cc785c&color=fff&size=100",
      rating: 4.8,
      students: 8750,
    },
  },
  "dynamic-programming": {
    id: "dynamic-programming",
    title: "Dynamic Programming Pro",
    subtitle: "Master DP in 14 Hours",
    description: "Master DP patterns — from memoization to tabulation, solve knapsack, LCS, edit distance, and every DP problem pattern for interviews.",
    price: 9,
    originalPrice: 54,
    hours: 14,
    lessons: 96,
    level: "Advanced",
    icon: <TrendingUp className="w-8 h-8" />,
    whatYouWillLearn: [
      "Master memoization and tabulation",
      "Solve knapsack problems efficiently",
      "Implement LCS and edit distance",
      "Apply DP on trees and graphs",
      "Understand advanced DP patterns",
    ],
    instructor: {
      name: "Dr. Sarah Chen",
      title: "Senior Software Engineer at Google, Ex-Facebook",
      image: "https://ui-avatars.com/api/?name=Sarah+Chen&background=cc785c&color=fff&size=100",
      rating: 4.9,
      students: 9500,
    },
  },
};

// ─── Main Component ──────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const dark = useSelector(selectDark);
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("course") || "arrays";

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const course = COURSE_DATA[courseId];

  useEffect(() => {
    if (!course) {
      router.push("/dsa");
    }
  }, [course, router]);

  if (!course) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Invalid card number";
    }
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Use MM/YY format";
    }
    if (!formData.cvv.trim()) {
      newErrors.cvv = "CVV is required";
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "Invalid CVV";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setLoading(false);
    setSuccess(true);

    // Redirect after success
    setTimeout(() => {
      router.push(`/course/${courseId}`);
    }, 2000);
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
    <div className={`min-h-screen ${bg} transition-colors duration-500 py-8 sm:py-12 px-4 sm:px-6`}>
      <div className="max-w-6xl mx-auto">
        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href={`/course/${courseId}`}
            className={`inline-flex items-center gap-2 text-sm ${muted} hover:text-[#cc785c] transition-colors duration-200`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Course
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span className={`text-xs ${muted}`}>Secure Checkout</span>
          </div>
        </div>

        {/* ── Success Message ── */}
        {success && (
          <div className="mb-8 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>
            <h2 className={`font-display text-2xl font-semibold ${text} mb-2`}>
              Payment Successful! 🎉
            </h2>
            <p className={`text-sm ${muted}`}>
              You're now enrolled in {course.title}. Redirecting to your course...
            </p>
          </div>
        )}

        {/* ── Main Content ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* ── Checkout Form ── */}
          <div className="lg:col-span-2">
            <div className={`rounded-2xl border ${border} ${cardBg} p-6 sm:p-8`}>
              <h2 className={`font-display text-2xl font-semibold ${text} mb-6`}>
                Complete Your Purchase
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className={`block text-sm font-medium ${text} mb-1.5`}>
                    Full Name
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

                {/* Email */}
                <div>
                  <label className={`block text-sm font-medium ${text} mb-1.5`}>
                    Email Address
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

                {/* Card Number */}
                <div>
                  <label className={`block text-sm font-medium ${text} mb-1.5`}>
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.cardNumber ? "text-red-500" : muted}`} />
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 outline-none ${inputBg} ${text} ${
                        errors.cardNumber
                          ? "border-red-500 focus:border-red-500"
                          : border + " focus:border-[#cc785c]"
                      }`}
                      onInput={(e) => {
                        const target = e.target as HTMLInputElement;
                        target.value = target.value
                          .replace(/\s/g, "")
                          .replace(/(\d{4})/g, "$1 ")
                          .trim();
                      }}
                    />
                  </div>
                  {errors.cardNumber && (
                    <p className="flex items-center gap-1 text-red-500 text-xs mt-1.5">
                      <AlertCircle className="w-3 h-3" />
                      {errors.cardNumber}
                    </p>
                  )}
                </div>

                {/* Expiry & CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${text} mb-1.5`}>
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none ${inputBg} ${text} ${
                        errors.expiryDate
                          ? "border-red-500 focus:border-red-500"
                          : border + " focus:border-[#cc785c]"
                      }`}
                      onInput={(e) => {
                        const target = e.target as HTMLInputElement;
                        let value = target.value.replace(/\D/g, "");
                        if (value.length > 2) {
                          value = value.slice(0, 2) + "/" + value.slice(2, 4);
                        }
                        target.value = value;
                      }}
                    />
                    {errors.expiryDate && (
                      <p className="flex items-center gap-1 text-red-500 text-xs mt-1.5">
                        <AlertCircle className="w-3 h-3" />
                        {errors.expiryDate}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${text} mb-1.5`}>
                      CVV
                    </label>
                    <input
                      type="password"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength={4}
                      className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none ${inputBg} ${text} ${
                        errors.cvv
                          ? "border-red-500 focus:border-red-500"
                          : border + " focus:border-[#cc785c]"
                      }`}
                    />
                    {errors.cvv && (
                      <p className="flex items-center gap-1 text-red-500 text-xs mt-1.5">
                        <AlertCircle className="w-3 h-3" />
                        {errors.cvv}
                      </p>
                    )}
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                  <Lock className="w-4 h-4 text-emerald-500" />
                  <span className={`text-xs ${muted}`}>
                    Your payment is secure and encrypted. We never store your card details.
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || success}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-[0_8px_24px_-6px_rgba(204,120,92,0.4)] hover:shadow-[0_12px_32px_-6px_rgba(204,120,92,0.5)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100`}
                  style={{
                    background: loading || success
                      ? "linear-gradient(135deg, #cc785c 0%, #b5613e 100%)"
                      : "linear-gradient(135deg, #cc785c 0%, #b5613e 100%)",
                  }}
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing Payment...
                    </>
                  ) : success ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Purchase Complete!
                    </>
                  ) : (
                    <>
                      Pay ${course.price}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#cc785c]" />
                <span className={`text-xs ${muted}`}>256-bit Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#cc785c]" />
                <span className={`text-xs ${muted}`}>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#cc785c]" />
                <span className={`text-xs ${muted}`}>Instant Access</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#cc785c]" />
                <span className={`text-xs ${muted}`}>30-Day Guarantee</span>
              </div>
            </div>
          </div>

          {/* ── Order Summary ── */}
          <div className="lg:col-span-1">
            <div className={`sticky top-24 rounded-2xl border ${border} ${cardBg} p-6`}>
              <h3 className={`font-display text-lg font-semibold ${text} mb-4`}>
                Order Summary
              </h3>

              {/* Course Preview */}
              <div className="flex items-start gap-3 pb-4 border-b ${border}">
                <div className="w-12 h-12 rounded-xl bg-[#cc785c]/10 flex items-center justify-center text-[#cc785c] shrink-0">
                  {course.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`font-semibold text-sm ${text} truncate`}>
                    {course.title}
                  </h4>
                  <p className={`text-xs ${muted} truncate`}>{course.subtitle}</p>
                </div>
              </div>

              {/* Course Details */}
              <div className="space-y-2 py-4 border-b ${border}">
                <div className="flex items-center justify-between text-sm">
                  <span className={muted}>Level</span>
                  <span className={text}>{course.level}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className={muted}>Duration</span>
                  <span className={text}>{course.hours} hours</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className={muted}>Lessons</span>
                  <span className={text}>{course.lessons}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className={muted}>Students</span>
                  <span className={text}>{course.instructor.students.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className={muted}>Rating</span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className={text}>{course.instructor.rating}</span>
                  </span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="py-4 border-b ${border}">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className={muted}>Course Price</span>
                  <span className={text}>${course.price}</span>
                </div>
                {course.originalPrice && (
                  <div className="flex items-center justify-between text-sm">
                    <span className={muted}>Original Price</span>
                    <span className={`text-sm line-through ${mutedLight}`}>
                      ${course.originalPrice}
                    </span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className={`font-semibold ${text}`}>Total</span>
                  <span className={`font-display text-2xl font-bold ${text}`}>
                    ${course.price}
                  </span>
                </div>

                {/* Bonus */}
                <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10 mb-4">
                  <Gift className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className={`text-xs font-semibold ${text}`}>Bonus Included</p>
                    <p className={`text-[10px] ${muted}`}>
                      Downloadable resources, code snippets, and lifetime updates
                    </p>
                  </div>
                </div>

                {/* Guarantee */}
                <div className="flex items-center gap-2 text-center">
                  <Shield className="w-4 h-4 text-[#cc785c] shrink-0" />
                  <span className={`text-[10px] ${muted}`}>
                    30-day money-back guarantee. No questions asked.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}