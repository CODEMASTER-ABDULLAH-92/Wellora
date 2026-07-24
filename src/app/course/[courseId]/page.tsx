"use client";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectDark } from "../../../lib/features/theme/themeSlice";
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
  TrendingUp,
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
  topics: string[];
  curriculum: {
    section: string;
    lessons: string[];
  }[];
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

// ─── Course Data Map ──────────────────────────────────────────────────────────

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
    curriculum: [
      {
        section: "1. Array Fundamentals",
        lessons: [
          "Introduction to Arrays",
          "Memory Layout & Access Patterns",
          "Array Operations - Insert, Delete, Search",
          "Time & Space Complexity Analysis",
          "Practice Problems - Basics",
        ],
      },
      {
        section: "2. Two-Pointer Technique",
        lessons: [
          "Understanding Two-Pointer Pattern",
          "Pair Sum Problems",
          "Triplet Sum & 3Sum",
          "Container with Most Water",
          "Trapping Rain Water",
          "Practice Problems - Two Pointer",
        ],
      },
      {
        section: "3. Sliding Window Pattern",
        lessons: [
          "Fixed vs Variable Size Windows",
          "Maximum/Minimum Subarray Sum",
          "Longest Substring Without Repeating",
          "Count Occurrences of Anagrams",
          "Practice Problems - Sliding Window",
        ],
      },
      {
        section: "4. Advanced Patterns",
        lessons: [
          "Prefix Sum & Difference Arrays",
          "Kadane's Algorithm - Maximum Subarray",
          "Dutch National Flag Algorithm",
          "Cyclic Sort Pattern",
          "Merge Intervals Pattern",
          "Practice Problems - Advanced",
        ],
      },
      {
        section: "5. Matrix & 2D Arrays",
        lessons: [
          "Matrix Traversal Techniques",
          "Rotate Matrix Problems",
          "Spiral Matrix Patterns",
          "Search in 2D Matrix",
          "Practice Problems - Matrix",
        ],
      },
      {
        section: "6. Interview Preparation",
        lessons: [
          "Top 50 Array Interview Questions",
          "Mock Interview - Arrays",
          "FAANG Array Problems",
          "Final Assessment",
          "Course Completion Project",
        ],
      },
    ],
    whatYouWillLearn: [
      "Master all array operations and their time complexities",
      "Implement two-pointer and sliding window techniques",
      "Solve any subarray/subsequence problem",
      "Handle matrix and 2D array problems efficiently",
      "Apply prefix sum and difference arrays",
      "Recognize and apply 10+ array problem patterns",
      "Write optimized code with O(n) solutions",
      "Crack any array interview question",
    ],
    requirements: [
      "Basic programming knowledge (any language)",
      "Understanding of loops and conditionals",
      "A computer with internet connection",
      "Desire to learn and practice",
    ],
    targetAudience: [
      "Software engineers preparing for coding interviews",
      "Computer science students",
      "Developers transitioning to FAANG companies",
      "Anyone wanting to master data structures",
    ],
    features: [
      {
        icon: <Video className="w-5 h-5" />,
        label: "12 Hours of Video Content",
        description: "Comprehensive video lectures with real-world examples",
      },
      {
        icon: <Code className="w-5 h-5" />,
        label: "87 Practice Problems",
        description: "Curated problems with solutions and explanations",
      },
      {
        icon: <Download className="w-5 h-5" />,
        label: "Downloadable Resources",
        description: "Code snippets, cheatsheets, and interview guides",
      },
      {
        icon: <MessageCircle className="w-5 h-5" />,
        label: "Community Discussion",
        description: "Ask questions and learn with fellow students",
      },
      {
        icon: <RefreshCw className="w-5 h-5" />,
        label: "Lifetime Updates",
        description: "Course content updated regularly with new problems",
      },
      {
        icon: <Award className="w-5 h-5" />,
        label: "Certificate of Completion",
        description: "Showcase your skills to employers",
      },
    ],
    instructor: {
      name: "Dr. Sarah Chen",
      title: "Senior Software Engineer at Google, Ex-Facebook",
      image: "https://ui-avatars.com/api/?name=Sarah+Chen&background=cc785c&color=fff&size=100",
      bio: "Dr. Sarah Chen is a Senior Software Engineer at Google with 10+ years of experience. She has conducted 500+ technical interviews and helped 1000+ engineers land their dream jobs at FAANG companies.",
      students: 15432,
      rating: 4.9,
      courses: 8,
    },
    reviews: [
      {
        name: "Alex Johnson",
        rating: 5,
        date: "2 weeks ago",
        comment: "This course completely transformed my understanding of arrays. The sliding window section alone was worth the entire price!",
        avatar: "https://ui-avatars.com/api/?name=Alex+Johnson&background=6b6960&color=fff&size=50",
      },
      {
        name: "Maria Garcia",
        rating: 5,
        date: "1 month ago",
        comment: "Sarah explains complex concepts so simply. I went from struggling with array problems to solving them in minutes.",
        avatar: "https://ui-avatars.com/api/?name=Maria+Garcia&background=6b6960&color=fff&size=50",
      },
    ],
    faqs: [
      {
        question: "How long do I have access to the course?",
        answer: "You get lifetime access to all course materials, including any future updates and additions.",
      },
      {
        question: "What programming languages are used?",
        answer: "The course primarily uses Python, but the concepts apply to any language.",
      },
      {
        question: "Is this course for beginners?",
        answer: "Yes! The course starts from the basics and gradually progresses to advanced topics.",
      },
      {
        question: "Will I get a certificate?",
        answer: "Yes, you'll receive a verified certificate of completion.",
      },
    ],
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
    curriculum: [
      {
        section: "1. Linked List Fundamentals",
        lessons: [
          "Introduction to Linked Lists",
          "Singly Linked List Implementation",
          "Doubly Linked List Implementation",
          "Circular Linked List Implementation",
        ],
      },
      {
        section: "2. Essential Operations",
        lessons: [
          "Insertion & Deletion",
          "Reversing a Linked List",
          "Finding Middle Node",
          "Detecting Cycles",
        ],
      },
      {
        section: "3. Advanced Operations",
        lessons: [
          "Merging Two Sorted Lists",
          "Sorting a Linked List",
          "LRU Cache Implementation",
          "Clone a Linked List with Random Pointers",
          "Practice Problems - Advanced",
        ],
      },
    ],
    whatYouWillLearn: [
      "Master all linked list operations",
      "Implement singly, doubly, and circular lists",
      "Detect and remove cycles efficiently",
      "Reverse linked lists using iterative and recursive approaches",
      "Merge and sort linked lists",
      "Design and implement LRU cache",
      "Solve interview problems with confidence",
    ],
    requirements: [
      "Basic programming knowledge",
      "Understanding of pointers/references",
      "A computer with internet connection",
    ],
    targetAudience: [
      "Software engineers preparing for interviews",
      "Computer science students",
      "Developers learning data structures",
    ],
    features: [
      {
        icon: <Video className="w-5 h-5" />,
        label: "10 Hours of Video Content",
        description: "Comprehensive video lectures with real-world examples",
      },
      {
        icon: <Code className="w-5 h-5" />,
        label: "72 Practice Problems",
        description: "Curated problems with solutions and explanations",
      },
      {
        icon: <Download className="w-5 h-5" />,
        label: "Downloadable Resources",
        description: "Code snippets and cheat sheets",
      },
      {
        icon: <MessageCircle className="w-5 h-5" />,
        label: "Community Discussion",
        description: "Ask questions and learn with fellow students",
      },
      {
        icon: <RefreshCw className="w-5 h-5" />,
        label: "Lifetime Updates",
        description: "Course content updated regularly",
      },
      {
        icon: <Award className="w-5 h-5" />,
        label: "Certificate of Completion",
        description: "Showcase your skills to employers",
      },
    ],
    instructor: {
      name: "Dr. Sarah Chen",
      title: "Senior Software Engineer at Google, Ex-Facebook",
      image: "https://ui-avatars.com/api/?name=Sarah+Chen&background=cc785c&color=fff&size=100",
      bio: "Dr. Sarah Chen is a Senior Software Engineer at Google with 10+ years of experience. She has conducted 500+ technical interviews and helped 1000+ engineers land their dream jobs at FAANG companies.",
      students: 12345,
      rating: 4.8,
      courses: 8,
    },
    reviews: [
      {
        name: "John Doe",
        rating: 5,
        date: "1 week ago",
        comment: "Excellent course! The LRU cache section was particularly helpful.",
        avatar: "https://ui-avatars.com/api/?name=John+Doe&background=6b6960&color=fff&size=50",
      },
    ],
    faqs: [
      {
        question: "Is this course for beginners?",
        answer: "Yes, it starts from basics and gradually progresses to advanced topics.",
      },
      {
        question: "Will I get a certificate?",
        answer: "Yes, you'll receive a verified certificate of completion.",
      },
      {
        question: "How long do I have access?",
        answer: "You get lifetime access to all course materials.",
      },
    ],
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
    curriculum: [
      {
        section: "1. Stack Fundamentals",
        lessons: [
          "Introduction to Stacks",
          "Stack Implementation",
          "Stack Operations",
          "Practice Problems - Basics",
        ],
      },
      {
        section: "2. Queue Fundamentals",
        lessons: [
          "Introduction to Queues",
          "Queue Implementation",
          "Queue Operations",
          "Practice Problems - Basics",
        ],
      },
      {
        section: "3. Advanced Patterns",
        lessons: [
          "Monotonic Stack",
          "Expression Evaluation",
          "Sliding Window Maximum",
          "Next Greater Element",
          "Practice Problems - Advanced",
        ],
      },
    ],
    whatYouWillLearn: [
      "Master stack and queue operations",
      "Implement monotonic stack patterns",
      "Solve expression evaluation problems",
      "Design data structures using stacks and queues",
      "Implement queue using stacks and vice versa",
      "Solve sliding window problems efficiently",
    ],
    requirements: [
      "Basic programming knowledge",
      "Understanding of arrays",
      "A computer with internet connection",
    ],
    targetAudience: [
      "Software engineers preparing for interviews",
      "Computer science students",
      "Developers learning data structures",
    ],
    features: [
      {
        icon: <Video className="w-5 h-5" />,
        label: "8 Hours of Video Content",
        description: "Comprehensive video lectures with real-world examples",
      },
      {
        icon: <Code className="w-5 h-5" />,
        label: "58 Practice Problems",
        description: "Curated problems with solutions and explanations",
      },
      {
        icon: <Download className="w-5 h-5" />,
        label: "Downloadable Resources",
        description: "Code snippets and cheat sheets",
      },
      {
        icon: <Award className="w-5 h-5" />,
        label: "Certificate of Completion",
        description: "Showcase your skills to employers",
      },
    ],
    instructor: {
      name: "Dr. Sarah Chen",
      title: "Senior Software Engineer at Google, Ex-Facebook",
      image: "https://ui-avatars.com/api/?name=Sarah+Chen&background=cc785c&color=fff&size=100",
      bio: "Dr. Sarah Chen is a Senior Software Engineer at Google with 10+ years of experience. She has conducted 500+ technical interviews and helped 1000+ engineers land their dream jobs at FAANG companies.",
      students: 10000,
      rating: 4.7,
      courses: 8,
    },
    reviews: [
      {
        name: "Jane Smith",
        rating: 5,
        date: "2 days ago",
        comment: "Great course on stacks and queues! The monotonic stack section was eye-opening.",
        avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=6b6960&color=fff&size=50",
      },
    ],
    faqs: [
      {
        question: "Is this course for beginners?",
        answer: "Some prior programming knowledge is recommended.",
      },
      {
        question: "Will I get a certificate?",
        answer: "Yes, you'll receive a verified certificate of completion.",
      },
    ],
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
    curriculum: [
      {
        section: "1. Tree Fundamentals",
        lessons: [
          "Introduction to Trees",
          "Binary Trees",
          "Binary Search Trees",
          "Tree Traversals",
        ],
      },
      {
        section: "2. Advanced Trees",
        lessons: [
          "AVL Trees",
          "Red-Black Trees",
          "Segment Trees",
          "Trie Data Structure",
        ],
      },
      {
        section: "3. Graph Algorithms",
        lessons: [
          "BFS & DFS",
          "Topological Sorting",
          "Dijkstra's Algorithm",
          "Bellman-Ford Algorithm",
          "Prim's & Kruskal's Algorithm",
        ],
      },
    ],
    whatYouWillLearn: [
      "Master binary trees and BSTs",
      "Implement balanced trees (AVL, Red-Black)",
      "Solve tree traversal problems",
      "Implement BFS and DFS",
      "Solve graph problems efficiently",
      "Understand shortest path algorithms",
    ],
    requirements: [
      "Intermediate programming knowledge",
      "Understanding of recursion",
      "A computer with internet connection",
    ],
    targetAudience: [
      "Software engineers preparing for interviews",
      "Computer science students",
      "Developers learning data structures",
    ],
    features: [
      {
        icon: <Video className="w-5 h-5" />,
        label: "15 Hours of Video Content",
        description: "Comprehensive video lectures with real-world examples",
      },
      {
        icon: <Code className="w-5 h-5" />,
        label: "104 Practice Problems",
        description: "Curated problems with solutions and explanations",
      },
      {
        icon: <Award className="w-5 h-5" />,
        label: "Certificate of Completion",
        description: "Showcase your skills to employers",
      },
    ],
    instructor: {
      name: "Dr. Sarah Chen",
      title: "Senior Software Engineer at Google, Ex-Facebook",
      image: "https://ui-avatars.com/api/?name=Sarah+Chen&background=cc785c&color=fff&size=100",
      bio: "Dr. Sarah Chen is a Senior Software Engineer at Google with 10+ years of experience. She has conducted 500+ technical interviews and helped 1000+ engineers land their dream jobs at FAANG companies.",
      students: 8750,
      rating: 4.8,
      courses: 8,
    },
    reviews: [
      {
        name: "Alice Johnson",
        rating: 5,
        date: "1 week ago",
        comment: "The graph algorithms section was incredible. Dijkstra's algorithm finally makes sense!",
        avatar: "https://ui-avatars.com/api/?name=Alice+Johnson&background=6b6960&color=fff&size=50",
      },
    ],
    faqs: [
      {
        question: "Is this course for beginners?",
        answer: "This is an advanced course. Prior knowledge of basic data structures is required.",
      },
      {
        question: "Will I get a certificate?",
        answer: "Yes, you'll receive a verified certificate of completion.",
      },
    ],
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
    curriculum: [
      {
        section: "1. DP Fundamentals",
        lessons: [
          "Introduction to DP",
          "Memoization",
          "Tabulation",
          "Practice Problems - Basics",
        ],
      },
      {
        section: "2. Classic DP Problems",
        lessons: [
          "Knapsack Problems",
          "Longest Common Subsequence",
          "Edit Distance",
          "Matrix Chain Multiplication",
          "Practice Problems - Intermediate",
        ],
      },
      {
        section: "3. Advanced DP Patterns",
        lessons: [
          "DP on Trees",
          "DP on Graphs",
          "Bitmask DP",
          "Digit DP",
          "Practice Problems - Advanced",
        ],
      },
    ],
    whatYouWillLearn: [
      "Master memoization and tabulation",
      "Solve knapsack problems efficiently",
      "Implement LCS and edit distance",
      "Apply DP on trees and graphs",
      "Understand advanced DP patterns",
    ],
    requirements: [
      "Intermediate programming knowledge",
      "Understanding of recursion",
      "A computer with internet connection",
    ],
    targetAudience: [
      "Software engineers preparing for interviews",
      "Computer science students",
      "Developers learning data structures",
    ],
    features: [
      {
        icon: <Video className="w-5 h-5" />,
        label: "14 Hours of Video Content",
        description: "Comprehensive video lectures with real-world examples",
      },
      {
        icon: <Code className="w-5 h-5" />,
        label: "96 Practice Problems",
        description: "Curated problems with solutions and explanations",
      },
      {
        icon: <Award className="w-5 h-5" />,
        label: "Certificate of Completion",
        description: "Showcase your skills to employers",
      },
    ],
    instructor: {
      name: "Dr. Sarah Chen",
      title: "Senior Software Engineer at Google, Ex-Facebook",
      image: "https://ui-avatars.com/api/?name=Sarah+Chen&background=cc785c&color=fff&size=100",
      bio: "Dr. Sarah Chen is a Senior Software Engineer at Google with 10+ years of experience. She has conducted 500+ technical interviews and helped 1000+ engineers land their dream jobs at FAANG companies.",
      students: 9500,
      rating: 4.9,
      courses: 8,
    },
    reviews: [
      {
        name: "Bob Wilson",
        rating: 5,
        date: "3 days ago",
        comment: "Finally DP makes sense! The knapsack section was particularly helpful.",
        avatar: "https://ui-avatars.com/api/?name=Bob+Wilson&background=6b6960&color=fff&size=50",
      },
    ],
    faqs: [
      {
        question: "Is this course for beginners?",
        answer: "This is an advanced course. Prior knowledge of basic data structures is required.",
      },
      {
        question: "Will I get a certificate?",
        answer: "Yes, you'll receive a verified certificate of completion.",
      },
    ],
  },
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

// ─── Main Component ──────────────────────────────────────────────────────────

interface CoursePageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default function CoursePage({ params }: CoursePageProps) {
  const dark = useSelector(selectDark);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [courseId, setCourseId] = useState<string>("");
  const [course, setCourse] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Unwrap the params Promise
  useEffect(() => {
    const unwrapParams = async () => {
      try {
        const unwrapped = await params;
        const id = unwrapped.courseId;
        setCourseId(id);
        console.log("Course ID:", id);
        
        const foundCourse = COURSE_DATA[id];
        console.log("Course data:", foundCourse);
        setCourse(foundCourse || null);
      } catch (error) {
        console.error("Error loading course:", error);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };
    
    unwrapParams();
  }, [params]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#cc785c] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className={dark ? "text-[#ece9e4]" : "text-[#201f1c]"}>Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className={`text-2xl font-bold ${dark ? "text-[#ece9e4]" : "text-[#201f1c]"}`}>
          Course Not Found
        </h1>
        <p className={dark ? "text-[#8c8b84]" : "text-[#6b6960]"}>
          The course you're looking for doesn't exist.
        </p>
        <Link
          href="/dsa"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] active:scale-95 shadow-[0_8px_24px_-6px_rgba(204,120,92,0.4)]"
          style={{
            background: "linear-gradient(135deg, #cc785c 0%, #b5613e 100%)",
          }}
        >
          Browse Courses
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const border = dark ? "border-white/[0.08]" : "border-black/[0.07]";
  const text = dark ? "text-[#ece9e4]" : "text-[#201f1c]";
  const muted = dark ? "text-[#8c8b84]" : "text-[#6b6960]";
  const mutedLight = dark ? "text-[#6b6a62]" : "text-[#8c8b84]";
  const bg = dark ? "bg-[#0a0a0a]" : "bg-[#faf9f5]";

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
                <span className="text-[#cc785c]">{course.icon}</span>
                <span className={`text-xs font-semibold tracking-[0.15em] uppercase ${muted}`}>
                  {course.level}
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
                    {course.curriculum.map((section, index) => (
                      <div
                        key={index}
                        className="rounded-xl overflow-hidden"
                        style={{
                          border: border,
                          background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)",
                        }}
                      >
                        <div className="px-4 py-3 flex items-center justify-between">
                          <span className={`font-medium text-sm ${text}`}>{section.section}</span>
                          <span className={`text-xs ${muted}`}>{section.lessons.length} lessons</span>
                        </div>
                        <div className="px-4 pb-3 space-y-1">
                          {section.lessons.map((lesson, idx) => (
                            <div key={idx} className="flex items-center gap-3 py-1.5">
                              <Play className="w-3 h-3 text-[#cc785c]" />
                              <span className={`text-sm ${muted}`}>{lesson}</span>
                            </div>
                          ))}
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