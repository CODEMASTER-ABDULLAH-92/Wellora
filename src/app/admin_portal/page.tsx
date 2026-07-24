"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectDark } from "../../lib/features/theme/themeSlice";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Code,
  Database,
  Layers,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  UserPlus,
  BookMarked,
  Award,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Globe,
  Shield,
  Star,
  MessageCircle,
  Bell,
  Download,
  Upload,
  RefreshCw,
  MoreVertical,
  Copy,
  ExternalLink,
  Zap,
  Crown,
  Target,
  Flame,
  Trophy,
  GraduationCap,
  Briefcase,
  FileText,
  GitBranch,
  Binary,
  Brain,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "instructor" | "admin";
  status: "active" | "inactive" | "suspended";
  enrolled: number;
  completed: number;
  joinDate: string;
  lastActive: string;
  avatar: string;
}

interface Course {
  id: string;
  title: string;
  category: string;
  instructor: string;
  students: number;
  rating: number;
  price: number;
  status: "published" | "draft" | "archived";
  lessons: number;
  duration: string;
  created: string;
  revenue: number;
  icon: React.ReactNode;
}

interface RevenueData {
  month: string;
  revenue: number;
  students: number;
}

interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  type: "enrollment" | "purchase" | "course" | "user" | "system";
}

// ─── Static Data ──────────────────────────────────────────────────────────

const USERS: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "student",
    status: "active",
    enrolled: 4,
    completed: 2,
    joinDate: "2024-01-15",
    lastActive: "2 hours ago",
    avatar: "https://ui-avatars.com/api/?name=John+Doe&background=cc785c&color=fff&size=50",
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah@example.com",
    role: "instructor",
    status: "active",
    enrolled: 12,
    completed: 8,
    joinDate: "2023-11-20",
    lastActive: "1 day ago",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Chen&background=cc785c&color=fff&size=50",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "student",
    status: "inactive",
    enrolled: 2,
    completed: 0,
    joinDate: "2024-02-01",
    lastActive: "2 weeks ago",
    avatar: "https://ui-avatars.com/api/?name=Mike+Johnson&background=cc785c&color=fff&size=50",
  },
  {
    id: "4",
    name: "Emma Wilson",
    email: "emma@example.com",
    role: "admin",
    status: "active",
    enrolled: 0,
    completed: 0,
    joinDate: "2023-10-05",
    lastActive: "5 hours ago",
    avatar: "https://ui-avatars.com/api/?name=Emma+Wilson&background=cc785c&color=fff&size=50",
  },
  {
    id: "5",
    name: "Alex Rivera",
    email: "alex@example.com",
    role: "student",
    status: "suspended",
    enrolled: 1,
    completed: 0,
    joinDate: "2024-03-10",
    lastActive: "1 month ago",
    avatar: "https://ui-avatars.com/api/?name=Alex+Rivera&background=cc785c&color=fff&size=50",
  },
];

const COURSES: Course[] = [
  {
    id: "arrays",
    title: "Complete Arrays Mastery",
    category: "Data Structures",
    instructor: "Dr. Sarah Chen",
    students: 15432,
    rating: 4.9,
    price: 9,
    status: "published",
    lessons: 87,
    duration: "12h",
    created: "2024-01-10",
    revenue: 138888,
    icon: <Database className="w-5 h-5" />,
  },
  {
    id: "linked-lists",
    title: "Complete Linked Lists",
    category: "Data Structures",
    instructor: "Dr. Sarah Chen",
    students: 12345,
    rating: 4.8,
    price: 9,
    status: "published",
    lessons: 72,
    duration: "10h",
    created: "2024-01-20",
    revenue: 111105,
    icon: <GitBranch className="w-5 h-5" />,
  },
  {
    id: "stacks-queues",
    title: "Stacks & Queues Deep Dive",
    category: "Data Structures",
    instructor: "Dr. Sarah Chen",
    students: 10000,
    rating: 4.7,
    price: 9,
    status: "published",
    lessons: 58,
    duration: "8h",
    created: "2024-02-01",
    revenue: 90000,
    icon: <Layers className="w-5 h-5" />,
  },
  {
    id: "trees-graphs",
    title: "Trees & Graphs Masterclass",
    category: "Advanced",
    instructor: "Dr. Sarah Chen",
    students: 8750,
    rating: 4.8,
    price: 9,
    status: "draft",
    lessons: 104,
    duration: "15h",
    created: "2024-02-15",
    revenue: 0,
    icon: <Binary className="w-5 h-5" />,
  },
  {
    id: "dp",
    title: "Dynamic Programming Pro",
    category: "Advanced",
    instructor: "Dr. Sarah Chen",
    students: 9500,
    rating: 4.9,
    price: 9,
    status: "published",
    lessons: 96,
    duration: "14h",
    created: "2024-03-01",
    revenue: 85500,
    icon: <Brain className="w-5 h-5" />,
  },
];

const REVENUE_DATA: RevenueData[] = [
  { month: "Jan", revenue: 45000, students: 120 },
  { month: "Feb", revenue: 52000, students: 145 },
  { month: "Mar", revenue: 48000, students: 130 },
  { month: "Apr", revenue: 61000, students: 168 },
  { month: "May", revenue: 55000, students: 152 },
  { month: "Jun", revenue: 67000, students: 185 },
];

const RECENT_ACTIVITIES: Activity[] = [
  {
    id: "1",
    user: "John Doe",
    action: "enrolled in",
    target: "Complete Arrays Mastery",
    timestamp: "2 hours ago",
    type: "enrollment",
  },
  {
    id: "2",
    user: "Sarah Chen",
    action: "published",
    target: "Dynamic Programming Pro",
    timestamp: "5 hours ago",
    type: "course",
  },
  {
    id: "3",
    user: "Mike Johnson",
    action: "purchased",
    target: "Complete Linked Lists",
    timestamp: "1 day ago",
    type: "purchase",
  },
  {
    id: "4",
    user: "Emma Wilson",
    action: "updated",
    target: "User permissions",
    timestamp: "2 days ago",
    type: "user",
  },
  {
    id: "5",
    user: "Alex Rivera",
    action: "completed",
    target: "Stacks & Queues Deep Dive",
    timestamp: "3 days ago",
    type: "enrollment",
  },
];

// ─── Admin Sidebar ──────────────────────────────────────────────────────

const ADMIN_NAV = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users, badge: 5 },
  { id: "courses", label: "Courses", icon: BookOpen, badge: 4 },
  { id: "revenue", label: "Revenue", icon: DollarSign },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

// ─── Main Component ──────────────────────────────────────────────────────

export default function AdminPortal() {
  const dark = useSelector(selectDark);
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
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

  // Calculate totals
  const totalStudents = USERS.filter(u => u.role === "student").length;
  const totalInstructors = USERS.filter(u => u.role === "instructor").length;
  const totalRevenue = COURSES.reduce((sum, c) => sum + c.revenue, 0);
  const totalCourses = COURSES.filter(c => c.status === "published").length;

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
        <div className={`flex items-center justify-between p-4 border-b ${border}`}>
          {sidebarOpen ? (
            <span className={`font-display text-lg font-semibold ${text}`}>Admin Panel</span>
          ) : (
            <span className={`font-display text-lg font-semibold ${text}`}>A</span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`hidden lg:flex p-1 rounded-lg ${hoverBg}`}
          >
            {sidebarOpen ? (
              <ChevronLeft className={`w-4 h-4 ${muted}`} />
            ) : (
              <ChevronRight className={`w-4 h-4 ${muted}`} />
            )}
          </button>
        </div>

        <nav className="flex-1 py-4">
          {ADMIN_NAV.map((item) => {
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

        <div className={`border-t ${border} p-4`}>
          <div className={`flex items-center gap-3 ${sidebarOpen ? "" : "justify-center"}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#cc785c] to-[#b5613e] flex items-center justify-center text-white font-semibold text-sm shrink-0">
              A
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${text} truncate`}>Admin User</p>
                <p className={`text-xs ${muted} truncate`}>admin@algodesign.com</p>
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
          <h2 className={`font-display text-lg font-semibold ${text}`}>Admin</h2>
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className={`font-display text-2xl sm:text-3xl font-semibold ${text}`}>
                    Admin Dashboard
                  </h1>
                  <p className={`text-sm ${muted} mt-1`}>
                    Welcome back! Here's what's happening with your platform.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${border} ${cardBg} ${text} text-sm font-medium ${hoverBg} transition-colors`}>
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-[0_8px_24px_-6px_rgba(204,120,92,0.4)]"
                    style={{
                      background: "linear-gradient(135deg, #cc785c 0%, #b5613e 100%)",
                    }}
                  >
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className={`p-4 rounded-xl border ${border} ${cardBg}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs ${muted}`}>Total Revenue</span>
                    <DollarSign className="w-4 h-4 text-emerald-500" />
                  </div>
                  <p className={`font-display text-xl font-semibold ${text}`}>
                    ${(totalRevenue / 1000).toFixed(1)}k
                  </p>
                  <p className={`text-xs ${muted}`}>+12.5% this month</p>
                </div>
                <div className={`p-4 rounded-xl border ${border} ${cardBg}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs ${muted}`}>Students</span>
                    <Users className="w-4 h-4 text-blue-500" />
                  </div>
                  <p className={`font-display text-xl font-semibold ${text}`}>
                    {totalStudents}
                  </p>
                  <p className={`text-xs ${muted}`}>+24 this month</p>
                </div>
                <div className={`p-4 rounded-xl border ${border} ${cardBg}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs ${muted}`}>Courses</span>
                    <BookOpen className="w-4 h-4 text-purple-500" />
                  </div>
                  <p className={`font-display text-xl font-semibold ${text}`}>
                    {totalCourses}
                  </p>
                  <p className={`text-xs ${muted}`}>2 in draft</p>
                </div>
                <div className={`p-4 rounded-xl border ${border} ${cardBg}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs ${muted}`}>Active Users</span>
                    <Activity className="w-4 h-4 text-amber-500" />
                  </div>
                  <p className={`font-display text-xl font-semibold ${text}`}>
                    {USERS.filter(u => u.status === "active").length}
                  </p>
                  <p className={`text-xs ${muted}`}>92% engagement</p>
                </div>
              </div>

              {/* Charts & Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-2">
                  <div className={`p-6 rounded-xl border ${border} ${cardBg}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`font-semibold ${text}`}>Revenue Overview</h3>
                      <span className={`text-xs ${muted}`}>Last 6 months</span>
                    </div>
                    <div className="h-48 flex items-end gap-2">
                      {REVENUE_DATA.map((item) => {
                        const maxRevenue = Math.max(...REVENUE_DATA.map(d => d.revenue));
                        const height = (item.revenue / maxRevenue) * 100;
                        return (
                          <div key={item.month} className="flex-1 flex flex-col items-center gap-1">
                            <div
                              className="w-full rounded-t transition-all duration-500"
                              style={{
                                height: `${height}%`,
                                minHeight: "20px",
                                maxHeight: "180px",
                                background: height > 70 ? "linear-gradient(180deg, #cc785c, #b5613e)" : "rgba(204,120,92,0.3)",
                              }}
                            />
                            <span className={`text-[10px] ${mutedLight}`}>{item.month}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className={`text-xs ${muted}`}>Total: ${REVENUE_DATA.reduce((sum, d) => sum + d.revenue, 0).toLocaleString()}</span>
                      <span className={`text-xs ${muted}`}>Avg: ${Math.round(REVENUE_DATA.reduce((sum, d) => sum + d.revenue, 0) / REVENUE_DATA.length).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className={`p-6 rounded-xl border ${border} ${cardBg}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`font-semibold ${text}`}>Recent Activity</h3>
                    <span className={`text-[10px] ${muted}`}>Live</span>
                  </div>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {RECENT_ACTIVITIES.slice(0, 4).map((activity) => (
                      <div key={activity.id} className="flex items-start gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          activity.type === "enrollment" ? "bg-blue-500/10 text-blue-500" :
                          activity.type === "purchase" ? "bg-emerald-500/10 text-emerald-500" :
                          activity.type === "course" ? "bg-purple-500/10 text-purple-500" :
                          "bg-amber-500/10 text-amber-500"
                        }`}>
                          {activity.type === "enrollment" && <UserPlus className="w-3 h-3" />}
                          {activity.type === "purchase" && <DollarSign className="w-3 h-3" />}
                          {activity.type === "course" && <BookOpen className="w-3 h-3" />}
                          {activity.type === "user" && <Users className="w-3 h-3" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs ${text}`}>
                            <span className="font-medium">{activity.user}</span>
                            <span className={muted}> {activity.action} </span>
                            <span className="font-medium">{activity.target}</span>
                          </p>
                          <p className={`text-[10px] ${mutedLight}`}>{activity.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Add Course", icon: Plus, color: "text-blue-500" },
                  { label: "Manage Users", icon: Users, color: "text-emerald-500" },
                  { label: "View Reports", icon: BarChart3, color: "text-purple-500" },
                  { label: "Settings", icon: Settings, color: "text-amber-500" },
                ].map((action) => (
                  <button
                    key={action.label}
                    className={`p-4 rounded-xl border ${border} ${cardBg} ${hoverBg} transition-all duration-200 text-center`}
                  >
                    <action.icon className={`w-6 h-6 ${action.color} mx-auto mb-2`} />
                    <span className={`text-xs font-medium ${text}`}>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Users Tab ── */}
          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className={`font-display text-2xl font-semibold ${text}`}>Users</h1>
                  <p className={`text-sm ${muted} mt-1`}>Manage all users on the platform</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${muted}`} />
                    <input
                      type="text"
                      placeholder="Search users..."
                      className={`pl-10 pr-4 py-2 rounded-xl border ${border} ${cardBg} ${text} text-sm focus:border-[#cc785c] outline-none transition-colors w-40 sm:w-56`}
                    />
                  </div>
                  <button className={`p-2 rounded-xl border ${border} ${hoverBg}`}>
                    <Filter className={`w-4 h-4 ${muted}`} />
                  </button>
                  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-[0_8px_24px_-6px_rgba(204,120,92,0.4)]"
                    style={{
                      background: "linear-gradient(135deg, #cc785c 0%, #b5613e 100%)",
                    }}
                  >
                    <UserPlus className="w-4 h-4" />
                    Add User
                  </button>
                </div>
              </div>

              {/* Users Table */}
              <div className={`rounded-xl border ${border} ${cardBg} overflow-x-auto`}>
                <table className="w-full">
                  <thead className={`border-b ${border}`}>
                    <tr className="text-left text-xs font-semibold uppercase tracking-wider">
                      <th className={`px-4 py-3 ${muted}`}>User</th>
                      <th className={`px-4 py-3 ${muted}`}>Role</th>
                      <th className={`px-4 py-3 ${muted}`}>Status</th>
                      <th className={`px-4 py-3 ${muted}`}>Enrolled</th>
                      <th className={`px-4 py-3 ${muted}`}>Completed</th>
                      <th className={`px-4 py-3 ${muted}`}>Last Active</th>
                      <th className={`px-4 py-3 ${muted}`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {USERS.map((user) => (
                      <tr key={user.id} className={`border-b ${border} ${hoverBg} transition-colors`}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                            <div>
                              <p className={`text-sm font-medium ${text}`}>{user.name}</p>
                              <p className={`text-xs ${muted}`}>{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            user.role === "admin" ? "bg-purple-500/10 text-purple-500" :
                            user.role === "instructor" ? "bg-blue-500/10 text-blue-500" :
                            "bg-emerald-500/10 text-emerald-500"
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            user.status === "active" ? "bg-emerald-500/10 text-emerald-500" :
                            user.status === "inactive" ? "bg-amber-500/10 text-amber-500" :
                            "bg-red-500/10 text-red-500"
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className={`px-4 py-3 text-sm ${text}`}>{user.enrolled}</td>
                        <td className={`px-4 py-3 text-sm ${text}`}>{user.completed}</td>
                        <td className={`px-4 py-3 text-sm ${muted}`}>{user.lastActive}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button className={`p-1 rounded-lg ${hoverBg}`}>
                              <Eye className="w-4 h-4 ${muted}" />
                            </button>
                            <button className={`p-1 rounded-lg ${hoverBg}`}>
                              <Edit className="w-4 h-4 ${muted}" />
                            </button>
                            <button className={`p-1 rounded-lg ${hoverBg}`}>
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Courses Tab ── */}
          {activeTab === "courses" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className={`font-display text-2xl font-semibold ${text}`}>Courses</h1>
                  <p className={`text-sm ${muted} mt-1`}>Manage all courses on the platform</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${muted}`} />
                    <input
                      type="text"
                      placeholder="Search courses..."
                      className={`pl-10 pr-4 py-2 rounded-xl border ${border} ${cardBg} ${text} text-sm focus:border-[#cc785c] outline-none transition-colors w-40 sm:w-56`}
                    />
                  </div>
                  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-[0_8px_24px_-6px_rgba(204,120,92,0.4)]"
                    style={{
                      background: "linear-gradient(135deg, #cc785c 0%, #b5613e 100%)",
                    }}
                  >
                    <Plus className="w-4 h-4" />
                    Add Course
                  </button>
                </div>
              </div>

              {/* Courses Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {COURSES.map((course) => (
                  <div
                    key={course.id}
                    className={`p-6 rounded-xl border ${border} ${cardBg} transition-all duration-200 hover:border-[#cc785c]/30`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#cc785c]/10 flex items-center justify-center text-[#cc785c]">
                          {course.icon}
                        </div>
                        <div>
                          <h3 className={`font-semibold ${text}`}>{course.title}</h3>
                          <p className={`text-xs ${muted}`}>{course.category}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${
                        course.status === "published" ? "bg-emerald-500/10 text-emerald-500" :
                        course.status === "draft" ? "bg-amber-500/10 text-amber-500" :
                        "bg-red-500/10 text-red-500"
                      }`}>
                        {course.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div>
                        <p className={`text-xs ${muted}`}>Students</p>
                        <p className={`text-sm font-medium ${text}`}>{course.students.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${muted}`}>Rating</p>
                        <p className={`text-sm font-medium ${text}`}>⭐ {course.rating}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${muted}`}>Lessons</p>
                        <p className={`text-sm font-medium ${text}`}>{course.lessons}</p>
                      </div>
                      <div>
                        <p className={`text-xs ${muted}`}>Revenue</p>
                        <p className={`text-sm font-medium ${text}`}>${course.revenue.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t ${border}">
                      <div className="flex items-center gap-3">
                        <span className={`text-xs ${muted}`}>${course.price}</span>
                        <span className={`text-xs ${muted}`}>•</span>
                        <span className={`text-xs ${muted}`}>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className={`p-1 rounded-lg ${hoverBg}`}>
                          <Eye className="w-4 h-4 ${muted}" />
                        </button>
                        <button className={`p-1 rounded-lg ${hoverBg}`}>
                          <Edit className="w-4 h-4 ${muted}" />
                        </button>
                        <button className={`p-1 rounded-lg ${hoverBg}`}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Revenue Tab ── */}
          {activeTab === "revenue" && (
            <div className="space-y-6">
              <div>
                <h1 className={`font-display text-2xl font-semibold ${text}`}>Revenue</h1>
                <p className={`text-sm ${muted} mt-1`}>Track platform earnings and growth</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className={`p-6 rounded-xl border ${border} ${cardBg}`}>
                  <p className={`text-sm ${muted}`}>Total Revenue</p>
                  <p className={`font-display text-3xl font-bold ${text} mt-1`}>
                    ${(totalRevenue / 1000).toFixed(1)}k
                  </p>
                  <p className={`text-xs text-emerald-500 mt-1`}>↑ 12.5% from last month</p>
                </div>
                <div className={`p-6 rounded-xl border ${border} ${cardBg}`}>
                  <p className={`text-sm ${muted}`}>Revenue This Month</p>
                  <p className={`font-display text-3xl font-bold ${text} mt-1`}>
                    ${Math.round(REVENUE_DATA[REVENUE_DATA.length - 1].revenue).toLocaleString()}
                  </p>
                  <p className={`text-xs text-emerald-500 mt-1`}>↑ 8.3% from last month</p>
                </div>
                <div className={`p-6 rounded-xl border ${border} ${cardBg}`}>
                  <p className={`text-sm ${muted}`}>Average Revenue</p>
                  <p className={`font-display text-3xl font-bold ${text} mt-1`}>
                    ${Math.round(REVENUE_DATA.reduce((sum, d) => sum + d.revenue, 0) / REVENUE_DATA.length).toLocaleString()}
                  </p>
                  <p className={`text-xs ${muted} mt-1`}>per month</p>
                </div>
              </div>

              {/* Revenue Table */}
              <div className={`rounded-xl border ${border} ${cardBg} overflow-x-auto`}>
                <table className="w-full">
                  <thead className={`border-b ${border}`}>
                    <tr className="text-left text-xs font-semibold uppercase tracking-wider">
                      <th className={`px-4 py-3 ${muted}`}>Month</th>
                      <th className={`px-4 py-3 ${muted}`}>Revenue</th>
                      <th className={`px-4 py-3 ${muted}`}>New Students</th>
                      <th className={`px-4 py-3 ${muted}`}>Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {REVENUE_DATA.map((item) => (
                      <tr key={item.month} className={`border-b ${border}`}>
                        <td className={`px-4 py-3 text-sm font-medium ${text}`}>{item.month}</td>
                        <td className={`px-4 py-3 text-sm ${text}`}>${item.revenue.toLocaleString()}</td>
                        <td className={`px-4 py-3 text-sm ${text}`}>{item.students}</td>
                        <td className="px-4 py-3 text-sm">
                          {item.month !== REVENUE_DATA[0].month && (
                            <span className="text-emerald-500">↑ 8.3%</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Analytics Tab ── */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div>
                <h1 className={`font-display text-2xl font-semibold ${text}`}>Analytics</h1>
                <p className={`text-sm ${muted} mt-1`}>Deep insights into platform performance</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-6 rounded-xl border ${border} ${cardBg}`}>
                  <h3 className={`font-semibold ${text} mb-4`}>User Growth</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${muted}`}>Total Students</span>
                      <span className={`font-semibold ${text}`}>{totalStudents}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${muted}`}>Total Instructors</span>
                      <span className={`font-semibold ${text}`}>{totalInstructors}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${muted}`}>Active Users</span>
                      <span className={`font-semibold ${text}`}>{USERS.filter(u => u.status === "active").length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${muted}`}>Engagement Rate</span>
                      <span className={`font-semibold text-emerald-500`}>92%</span>
                    </div>
                  </div>
                </div>

                <div className={`p-6 rounded-xl border ${border} ${cardBg}`}>
                  <h3 className={`font-semibold ${text} mb-4`}>Course Performance</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${muted}`}>Most Popular</span>
                      <span className={`font-semibold ${text}`}>Arrays Mastery</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${muted}`}>Highest Rated</span>
                      <span className={`font-semibold ${text}`}>DP Pro (4.9)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${muted}`}>Most Revenue</span>
                      <span className={`font-semibold ${text}`}>Arrays Mastery</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${muted}`}>Completion Rate</span>
                      <span className={`font-semibold text-emerald-500`}>68%</span>
                    </div>
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
                <p className={`text-sm ${muted} mt-1`}>Manage platform settings and preferences</p>
              </div>

              <div className={`p-6 rounded-xl border ${border} ${cardBg}`}>
                <h3 className={`font-semibold ${text} mb-4`}>General Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${text} mb-1`}>Platform Name</label>
                    <input
                      type="text"
                      value="Algo.Design"
                      className={`w-full px-4 py-2.5 rounded-xl border ${border} ${cardBg} ${text} focus:border-[#cc785c] outline-none transition-colors`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${text} mb-1`}>Default Currency</label>
                    <select className={`w-full px-4 py-2.5 rounded-xl border ${border} ${cardBg} ${text} focus:border-[#cc785c] outline-none transition-colors`}>
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                    </select>
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
                <h3 className={`font-semibold ${text} mb-4`}>Admin Account</h3>
                <div className="space-y-3">
                  <button className={`w-full text-left px-4 py-3 rounded-xl ${hoverBg} ${text} transition-colors`}>
                    Change Password
                  </button>
                  <button className={`w-full text-left px-4 py-3 rounded-xl ${hoverBg} ${text} transition-colors`}>
                    Two-Factor Authentication
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

// ─── Missing ChevronLeft import ──────────────────────────────────────

// Add this to your imports or use the one from lucide-react
function ChevronLeft(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}