"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectDark } from "../../lib/features/theme/themeSlice";
import Link from "next/link";
import {
  User,
  Settings,
  LogOut,
  Home,
  BookOpen,
  Code,
  Database,
  Layers,
  TrendingUp,
  Clock,
  Calendar,
  Award,
  BarChart3,
  Play,
  CheckCircle,
  Star,
  Users,
  MessageCircle,
  Bell,
  Search,
  Filter,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Menu,
  X,
  FileText,
  GitBranch,
  Binary,
  Brain,
  Target,
  Flame,
  Trophy,
  BookMarked,
  GraduationCap,
  Activity,
  PieChart,
  TrendingDown,
  Zap,
  Crown,
  Briefcase,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

interface CourseProgress {
  id: string;
  title: string;
  icon: React.ReactNode;
  progress: number;
  lessonsCompleted: number;
  totalLessons: number;
  lastAccessed: string;
  status: "in-progress" | "completed" | "not-started";
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  unlockedAt?: string;
}

interface ActivityItem {
  id: string;
  type: "course" | "achievement" | "practice" | "system";
  title: string;
  description: string;
  timestamp: string;
  icon: React.ReactNode;
}

// ─── Static Data ──────────────────────────────────────────────────────────

const RECENT_COURSES: CourseProgress[] = [
  {
    id: "arrays",
    title: "Complete Arrays Mastery",
    icon: <Database className="w-5 h-5" />,
    progress: 78,
    lessonsCompleted: 68,
    totalLessons: 87,
    lastAccessed: "2 hours ago",
    status: "in-progress",
  },
  {
    id: "linked-lists",
    title: "Complete Linked Lists",
    icon: <GitBranch className="w-5 h-5" />,
    progress: 45,
    lessonsCompleted: 32,
    totalLessons: 72,
    lastAccessed: "Yesterday",
    status: "in-progress",
  },
  {
    id: "stacks-queues",
    title: "Stacks & Queues Deep Dive",
    icon: <Layers className="w-5 h-5" />,
    progress: 100,
    lessonsCompleted: 58,
    totalLessons: 58,
    lastAccessed: "3 days ago",
    status: "completed",
  },
];

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "1",
    title: "First Blood",
    description: "Completed your first lesson",
    icon: <Trophy className="w-6 h-6" />,
    unlocked: true,
    unlockedAt: "2 weeks ago",
  },
  {
    id: "2",
    title: "Array Master",
    description: "Completed the Arrays course",
    icon: <Database className="w-6 h-6" />,
    unlocked: false,
  },
  {
    id: "3",
    title: "Algorithm Ace",
    description: "Solved 50 algorithm problems",
    icon: <Code className="w-6 h-6" />,
    unlocked: true,
    unlockedAt: "1 week ago",
  },
  {
    id: "4",
    title: "System Designer",
    description: "Designed your first system",
    icon: <Layers className="w-6 h-6" />,
    unlocked: false,
  },
  {
    id: "5",
    title: "Problem Solver",
    description: "Completed 100 practice problems",
    icon: <Target className="w-6 h-6" />,
    unlocked: false,
  },
  {
    id: "6",
    title: "Community Star",
    description: "Helped 10 fellow learners",
    icon: <Star className="w-6 h-6" />,
    unlocked: false,
  },
];

const ACTIVITIES: ActivityItem[] = [
  {
    id: "1",
    type: "course",
    title: "Completed a lesson",
    description: 'Finished "Two-Pointer Technique" in Arrays course',
    timestamp: "2 hours ago",
    icon: <CheckCircle className="w-4 h-4 text-emerald-500" />,
  },
  {
    id: "2",
    type: "practice",
    title: "Solved a problem",
    description: "Solved 'Container with Most Water' in 12 minutes",
    timestamp: "4 hours ago",
    icon: <Code className="w-4 h-4 text-blue-500" />,
  },
  {
    id: "3",
    type: "achievement",
    title: "Earned achievement",
    description: 'Unlocked "Algorithm Ace" badge',
    timestamp: "1 day ago",
    icon: <Award className="w-4 h-4 text-amber-500" />,
  },
  {
    id: "4",
    type: "system",
    title: "System design review",
    description: "Submitted 'Design Twitter' for review",
    timestamp: "3 days ago",
    icon: <Layers className="w-4 h-4 text-purple-500" />,
  },
  {
    id: "5",
    type: "course",
    title: "Started a new course",
    description: "Enrolled in 'Trees & Graphs Masterclass'",
    timestamp: "5 days ago",
    icon: <BookOpen className="w-4 h-4 text-green-500" />,
  },
];

// ─── Sidebar Navigation ──────────────────────────────────────────────────

const SIDEBAR_NAV = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "courses", label: "My Courses", icon: BookOpen, badge: 4 },
  { id: "practice", label: "Practice", icon: Code, badge: 12 },
  { id: "achievements", label: "Achievements", icon: Award, badge: 3 },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "community", label: "Community", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
];

// ─── Main Component ──────────────────────────────────────────────────────

export default function Dashboard() {
  const dark = useSelector(selectDark);
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    // Close mobile sidebar on resize to desktop
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const border = dark ? "border-white/[0.08]" : "border-black/[0.07]";
  const text = dark ? "text-[#ece9e4]" : "text-[#201f1c]";
  const muted = dark ? "text-[#8c8b84]" : "text-[#6b6960]";
  const mutedLight = dark ? "text-[#6b6a62]" : "text-[#8c8b84]";
  const bg = dark ? "bg-[#0a0a0a]" : "bg-[#faf9f5]";
  const cardBg = dark ? "bg-[#131211]" : "bg-white";
  const hoverBg = dark ? "hover:bg-white/[0.06]" : "hover:bg-black/[0.045]";
  const activeBg = dark ? "bg-white/[0.08]" : "bg-black/[0.06]";

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-500 flex`}>
      {/* ─── Mobile Sidebar Overlay ─── */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* ─── Sidebar ─── */}
      <aside
        className={`
          fixed lg:sticky top-[76px] h-[calc(100vh-76px)] z-40
          transition-all duration-300 ease-out
          ${cardBg} border-r ${border}
          ${sidebarOpen ? "w-64" : "w-20"}
          ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col shrink-0 overflow-y-auto
        `}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`hidden lg:flex items-center justify-center w-full py-4 border-b ${border} ${hoverBg} transition-colors`}
        >
          {sidebarOpen ? (
            <Menu className={`w-5 h-5 ${muted}`} />
          ) : (
            <Menu className={`w-5 h-5 ${muted}`} />
          )}
        </button>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          {SIDEBAR_NAV.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-2.5 transition-all duration-200
                  ${sidebarOpen ? "justify-start" : "justify-center"}
                  ${isActive ? activeBg : hoverBg}
                  ${isActive ? "text-[#cc785c]" : text}
                `}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-[#cc785c]" : muted}`} />
                {sidebarOpen && (
                  <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
                )}
                {sidebarOpen && item.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#cc785c] text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className={`border-t ${border} p-4`}>
          <div className={`flex items-center gap-3 ${sidebarOpen ? "" : "justify-center"}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#cc785c] to-[#b5613e] flex items-center justify-center text-white font-semibold text-sm shrink-0">
              JD
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${text} truncate`}>John Doe</p>
                <p className={`text-xs ${muted} truncate`}>john@example.com</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ─── Mobile Header ─── */}
      <div className={`lg:hidden fixed top-[76px] left-0 right-0 z-30 border-b ${border} ${cardBg} px-4 py-3`}>
        <div className="flex items-center justify-between">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className={`p-2 rounded-xl ${hoverBg}`}
          >
            <Menu className={`w-5 h-5 ${text}`} />
          </button>
          <h2 className={`font-display text-lg font-semibold ${text}`}>Dashboard</h2>
          <button className={`p-2 rounded-xl ${hoverBg}`}>
            <Bell className={`w-5 h-5 ${muted}`} />
          </button>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <main className="flex-1 lg:ml-0 px-4 sm:px-6 py-4 lg:py-6 pb-20 lg:pb-6 mt-16 lg:mt-0">
        <div className="max-w-7xl mx-auto">
          {/* ── Overview Tab ── */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Welcome Section */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className={`font-display text-2xl sm:text-3xl font-semibold ${text}`}>
                    Welcome back, John! 👋
                  </h1>
                  <p className={`text-sm ${muted} mt-1`}>
                    You're on a 12-day learning streak. Keep it going!
                  </p>
                </div>
                <Link
                  href="/practice"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-[0_8px_24px_-6px_rgba(204,120,92,0.4)]"
                  style={{
                    background: "linear-gradient(135deg, #cc785c 0%, #b5613e 100%)",
                  }}
                >
                  <Target className="w-4 h-4" />
                  Continue Learning
                </Link>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                <div className={`p-4 rounded-xl border ${border} ${cardBg}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="w-4 h-4 text-[#cc785c]" />
                    <span className={`text-xs ${muted}`}>Courses</span>
                  </div>
                  <p className={`font-display text-xl font-semibold ${text}`}>4</p>
                  <p className={`text-xs ${muted}`}>2 in progress</p>
                </div>
                <div className={`p-4 rounded-xl border ${border} ${cardBg}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Code className="w-4 h-4 text-[#cc785c]" />
                    <span className={`text-xs ${muted}`}>Problems</span>
                  </div>
                  <p className={`font-display text-xl font-semibold ${text}`}>47</p>
                  <p className={`text-xs ${muted}`}>34 solved</p>
                </div>
                <div className={`p-4 rounded-xl border ${border} ${cardBg}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-[#cc785c]" />
                    <span className={`text-xs ${muted}`}>Hours</span>
                  </div>
                  <p className={`font-display text-xl font-semibold ${text}`}>24</p>
                  <p className={`text-xs ${muted}`}>This month</p>
                </div>
                <div className={`p-4 rounded-xl border ${border} ${cardBg}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Flame className="w-4 h-4 text-[#cc785c]" />
                    <span className={`text-xs ${muted}`}>Streak</span>
                  </div>
                  <p className={`font-display text-xl font-semibold ${text}`}>12</p>
                  <p className={`text-xs ${muted}`}>Days</p>
                </div>
                <div className={`p-4 rounded-xl border ${border} ${cardBg}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-4 h-4 text-[#cc785c]" />
                    <span className={`text-xs ${muted}`}>Achievements</span>
                  </div>
                  <p className={`font-display text-xl font-semibold ${text}`}>3</p>
                  <p className={`text-xs ${muted}`}>of 6 unlocked</p>
                </div>
              </div>

              {/* Recent Courses & Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Courses */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className={`font-display text-lg font-semibold ${text}`}>
                      Recent Courses
                    </h2>
                    <Link href="/courses" className={`text-sm ${muted} hover:text-[#cc785c] transition-colors`}>
                      View All
                    </Link>
                  </div>

                  <div className="space-y-3">
                    {RECENT_COURSES.map((course) => (
                      <div
                        key={course.id}
                        className={`p-4 rounded-xl border ${border} ${cardBg} transition-all duration-200 hover:border-[#cc785c]/30`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#cc785c]/10 flex items-center justify-center text-[#cc785c] shrink-0">
                            {course.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h3 className={`font-medium text-sm ${text} truncate`}>
                                {course.title}
                              </h3>
                              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${
                                course.status === "completed"
                                  ? "bg-emerald-500/10 text-emerald-500"
                                  : course.status === "in-progress"
                                  ? "bg-amber-500/10 text-amber-500"
                                  : "bg-gray-500/10 text-gray-500"
                              }`}>
                                {course.status === "completed" ? "✓ Completed" : course.status === "in-progress" ? "In Progress" : "Not Started"}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 mt-1">
                              <div className="flex-1">
                                <div className="flex items-center justify-between text-xs">
                                  <span className={muted}>{course.progress}%</span>
                                  <span className={muted}>{course.lessonsCompleted}/{course.totalLessons} lessons</span>
                                </div>
                                <div className="w-full h-1.5 rounded-full bg-black/5 dark:bg-white/5 mt-1">
                                  <div
                                    className="h-full rounded-full bg-gradient-to-r from-[#cc785c] to-[#b5613e] transition-all duration-500"
                                    style={{ width: `${course.progress}%` }}
                                  />
                                </div>
                              </div>
                              <span className={`text-[10px] ${mutedLight} whitespace-nowrap`}>
                                {course.lastAccessed}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className={`font-display text-lg font-semibold ${text}`}>
                      Activity
                    </h2>
                    <span className={`text-[10px] ${muted}`}>Recent</span>
                  </div>

                  <div className={`p-4 rounded-xl border ${border} ${cardBg} max-h-[400px] overflow-y-auto`}>
                    <div className="space-y-4">
                      {ACTIVITIES.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                            {activity.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${text}`}>{activity.title}</p>
                            <p className={`text-xs ${muted} truncate`}>{activity.description}</p>
                            <p className={`text-[10px] ${mutedLight} mt-0.5`}>{activity.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements Preview */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`font-display text-lg font-semibold ${text}`}>
                    Achievements
                  </h2>
                  <Link href="/achievements" className={`text-sm ${muted} hover:text-[#cc785c] transition-colors`}>
                    View All
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {ACHIEVEMENTS.slice(0, 6).map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-xl border ${border} ${cardBg} text-center transition-all duration-200 ${
                        achievement.unlocked
                          ? "hover:border-[#cc785c]/30"
                          : "opacity-50 grayscale"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                        achievement.unlocked
                          ? "bg-[#cc785c]/10 text-[#cc785c]"
                          : "bg-black/5 dark:bg-white/5 text-[#6b6a62]"
                      }`}>
                        {achievement.icon}
                      </div>
                      <p className={`text-[11px] font-medium ${achievement.unlocked ? text : muted}`}>
                        {achievement.title}
                      </p>
                      {achievement.unlocked && achievement.unlockedAt && (
                        <p className={`text-[9px] ${mutedLight} mt-0.5`}>{achievement.unlockedAt}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── My Courses Tab ── */}
          {activeTab === "courses" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className={`font-display text-2xl font-semibold ${text}`}>My Courses</h1>
                  <p className={`text-sm ${muted} mt-1`}>Track your progress across all courses</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className={`p-2 rounded-xl ${hoverBg}`}>
                    <Filter className={`w-4 h-4 ${muted}`} />
                  </button>
                  <button className={`p-2 rounded-xl ${hoverBg}`}>
                    <Search className={`w-4 h-4 ${muted}`} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {RECENT_COURSES.map((course) => (
                  <div
                    key={course.id}
                    className={`p-6 rounded-xl border ${border} ${cardBg} transition-all duration-200 hover:border-[#cc785c]/30`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#cc785c]/10 flex items-center justify-center text-[#cc785c] shrink-0">
                          {course.icon}
                        </div>
                        <div>
                          <h3 className={`font-semibold ${text}`}>{course.title}</h3>
                          <p className={`text-xs ${muted}`}>{course.lessonsCompleted}/{course.totalLessons} lessons</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full shrink-0 ${
                        course.status === "completed"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : course.status === "in-progress"
                          ? "bg-amber-500/10 text-amber-500"
                          : "bg-gray-500/10 text-gray-500"
                      }`}>
                        {course.status === "completed" ? "Completed" : course.status === "in-progress" ? "In Progress" : "Not Started"}
                      </span>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className={muted}>Progress</span>
                        <span className={muted}>{course.progress}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-black/5 dark:bg-white/5">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#cc785c] to-[#b5613e] transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${mutedLight}`}>Last accessed: {course.lastAccessed}</span>
                      <Link
                        href={`/course/${course.id}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-[#cc785c] hover:text-[#b5613e] transition-colors"
                      >
                        Continue
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Practice Tab ── */}
          {activeTab === "practice" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className={`font-display text-2xl font-semibold ${text}`}>Practice</h1>
                  <p className={`text-sm ${muted} mt-1`}>Sharpen your skills with coding problems</p>
                </div>
                <Link
                  href="/practice/new"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-[0_8px_24px_-6px_rgba(204,120,92,0.4)]"
                  style={{
                    background: "linear-gradient(135deg, #cc785c 0%, #b5613e 100%)",
                  }}
                >
                  <Target className="w-4 h-4" />
                  New Problem
                </Link>
              </div>

              <div className={`p-6 rounded-xl border ${border} ${cardBg}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl bg-emerald-500/10`}>
                    <Code className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${text}`}>Daily Challenge</h3>
                    <p className={`text-sm ${muted}`}>Solve today's problem and earn bonus points</p>
                  </div>
                  <Link
                    href="/practice/daily"
                    className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-[#cc785c] hover:text-[#b5613e] transition-colors"
                  >
                    Start Challenge
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { difficulty: "Easy", count: 12, color: "text-emerald-500" },
                    { difficulty: "Medium", count: 18, color: "text-amber-500" },
                    { difficulty: "Hard", count: 4, color: "text-red-500" },
                  ].map((item) => (
                    <div key={item.difficulty} className={`flex items-center justify-between p-3 rounded-xl border ${border}`}>
                      <span className={`text-sm font-medium ${item.color}`}>{item.difficulty}</span>
                      <span className={`text-sm ${muted}`}>{item.count} problems</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Two Sum", difficulty: "Easy", completed: true, time: "5 min" },
                  { name: "Valid Parentheses", difficulty: "Easy", completed: true, time: "8 min" },
                  { name: "Container with Most Water", difficulty: "Medium", completed: false, time: "15 min" },
                  { name: "Trapping Rain Water", difficulty: "Hard", completed: false, time: "25 min" },
                ].map((problem, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border ${border} ${cardBg} transition-all duration-200 hover:border-[#cc785c]/30`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          problem.difficulty === "Easy" ? "bg-emerald-500" :
                          problem.difficulty === "Medium" ? "bg-amber-500" : "bg-red-500"
                        }`} />
                        <span className={`text-sm font-medium ${text}`}>{problem.name}</span>
                      </div>
                      {problem.completed ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Link
                          href={`/practice/${problem.name.toLowerCase().replace(/ /g, "-")}`}
                          className="text-[10px] font-medium px-3 py-1 rounded-full bg-[#cc785c]/10 text-[#cc785c] hover:bg-[#cc785c]/20 transition-colors"
                        >
                          Solve
                        </Link>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`text-xs ${muted}`}>{problem.difficulty}</span>
                      <span className={`text-xs ${muted}`}>⏱ {problem.time}</span>
                      {problem.completed && (
                        <span className={`text-xs text-emerald-500`}>✓ Completed</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Achievements Tab ── */}
          {activeTab === "achievements" && (
            <div className="space-y-6">
              <div>
                <h1 className={`font-display text-2xl font-semibold ${text}`}>Achievements</h1>
                <p className={`text-sm ${muted} mt-1`}>Track your progress and unlock new badges</p>
              </div>

              <div className={`p-6 rounded-xl border ${border} ${cardBg}`}>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {ACHIEVEMENTS.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-xl border ${border} text-center transition-all duration-200 ${
                        achievement.unlocked
                          ? "hover:border-[#cc785c]/30"
                          : "opacity-60 grayscale"
                      }`}
                    >
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                        achievement.unlocked
                          ? "bg-[#cc785c]/10 text-[#cc785c]"
                          : "bg-black/5 dark:bg-white/5 text-[#6b6a62]"
                      }`}>
                        {achievement.icon}
                      </div>
                      <h4 className={`text-sm font-medium ${achievement.unlocked ? text : muted}`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-xs ${muted} mt-1`}>{achievement.description}</p>
                      {achievement.unlocked && achievement.unlockedAt && (
                        <p className={`text-[10px] ${mutedLight} mt-2`}>Unlocked {achievement.unlockedAt}</p>
                      )}
                      {!achievement.unlocked && (
                        <p className={`text-[10px] ${mutedLight} mt-2`}>🔒 Locked</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Analytics Tab ── */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div>
                <h1 className={`font-display text-2xl font-semibold ${text}`}>Analytics</h1>
                <p className={`text-sm ${muted} mt-1`}>View your learning statistics and progress</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-6 rounded-xl border ${border} ${cardBg}`}>
                  <h3 className={`font-semibold ${text} mb-4`}>Course Progress</h3>
                  <div className="space-y-4">
                    {RECENT_COURSES.map((course) => (
                      <div key={course.id}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className={muted}>{course.title}</span>
                          <span className={text}>{course.progress}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-black/5 dark:bg-white/5">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#cc785c] to-[#b5613e] transition-all duration-500"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`p-6 rounded-xl border ${border} ${cardBg}`}>
                  <h3 className={`font-semibold ${text} mb-4`}>Problem Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className={`text-2xl font-display font-semibold ${text}`}>34</p>
                      <p className={`text-xs ${muted}`}>Solved</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-2xl font-display font-semibold ${text}`}>13</p>
                      <p className={`text-xs ${muted}`}>Remaining</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-2xl font-display font-semibold text-emerald-500`}>72%</p>
                      <p className={`text-xs ${muted}`}>Success Rate</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-2xl font-display font-semibold ${text}`}>12m</p>
                      <p className={`text-xs ${muted}`}>Avg. Time</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-xl border ${border} ${cardBg}`}>
                <h3 className={`font-semibold ${text} mb-4`}>Learning Activity</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className={`text-sm ${muted}`}>Last 7 days</p>
                    <p className={`text-2xl font-display font-semibold ${text}`}>6 hours</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                    <span className={`text-sm text-emerald-500`}>+23%</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-4">
                  {[40, 65, 45, 80, 70, 55, 90].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t transition-all duration-500"
                        style={{
                          height: `${height}%`,
                          minHeight: "20px",
                          maxHeight: "80px",
                          background: height > 70 ? "linear-gradient(180deg, #cc785c, #b5613e)" : "rgba(204,120,92,0.3)",
                        }}
                      />
                      <span className={`text-[8px] ${mutedLight}`}>{["M","T","W","T","F","S","S"][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Community Tab ── */}
          {activeTab === "community" && (
            <div className="space-y-6">
              <div>
                <h1 className={`font-display text-2xl font-semibold ${text}`}>Community</h1>
                <p className={`text-sm ${muted} mt-1`}>Connect with fellow learners</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-6 rounded-xl border ${border} ${cardBg}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-6 h-6 text-[#cc785c]" />
                    <h3 className={`font-semibold ${text}`}>Discussion Forums</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      { topic: "Help with Two Sum problem", replies: 12, time: "2 hours ago" },
                      { topic: "System Design: Twitter clone", replies: 8, time: "5 hours ago" },
                      { topic: "DP vs Greedy - when to use?", replies: 15, time: "1 day ago" },
                    ].map((discussion, index) => (
                      <div key={index} className={`p-3 rounded-xl border ${border}`}>
                        <p className={`text-sm font-medium ${text}`}>{discussion.topic}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className={`text-xs ${muted}`}>💬 {discussion.replies} replies</span>
                          <span className={`text-xs ${muted}`}>{discussion.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`p-6 rounded-xl border ${border} ${cardBg}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <Star className="w-6 h-6 text-[#cc785c]" />
                    <h3 className={`font-semibold ${text}`}>Top Learners</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "Alice Johnson", points: 2450, badge: "🏆" },
                      { name: "Bob Smith", points: 2180, badge: "🥈" },
                      { name: "Charlie Brown", points: 1890, badge: "🥉" },
                    ].map((learner, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{learner.badge}</span>
                          <span className={`text-sm ${text}`}>{learner.name}</span>
                        </div>
                        <span className={`text-sm ${muted}`}>{learner.points} pts</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Settings Tab ── */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div>
                <h1 className={`font-display text-2xl font-semibold ${text}`}>Settings</h1>
                <p className={`text-sm ${muted} mt-1`}>Manage your account preferences</p>
              </div>

              <div className={`p-6 rounded-xl border ${border} ${cardBg}`}>
                <h3 className={`font-semibold ${text} mb-4`}>Profile Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${text} mb-1`}>Full Name</label>
                    <input
                      type="text"
                      value="John Doe"
                      className={`w-full px-4 py-2.5 rounded-xl border ${border} ${cardBg} ${text} focus:border-[#cc785c] outline-none transition-colors`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${text} mb-1`}>Email</label>
                    <input
                      type="email"
                      value="john@example.com"
                      className={`w-full px-4 py-2.5 rounded-xl border ${border} ${cardBg} ${text} focus:border-[#cc785c] outline-none transition-colors`}
                    />
                  </div>
                  <button
                    className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-[0_8px_24px_-6px_rgba(204,120,92,0.4)]"
                    style={{
                      background: "linear-gradient(135deg, #cc785c 0%, #b5613e 100%)",
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>

              <div className={`p-6 rounded-xl border ${border} ${cardBg}`}>
                <h3 className={`font-semibold ${text} mb-4`}>Account</h3>
                <div className="space-y-3">
                  <button className={`w-full text-left px-4 py-3 rounded-xl ${hoverBg} ${text} transition-colors`}>
                    Change Password
                  </button>
                  <button className={`w-full text-left px-4 py-3 rounded-xl ${hoverBg} ${text} transition-colors`}>
                    Notification Preferences
                  </button>
                  <button className={`w-full text-left px-4 py-3 rounded-xl ${hoverBg} text-red-500 transition-colors`}>
                    <span className="flex items-center gap-2">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}