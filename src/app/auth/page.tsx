"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectDark } from "../../lib/features/theme/themeSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  Sparkles,
} from "lucide-react";

export default function AuthPage() {
  const dark = useSelector(selectDark);
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setSuccess(false);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
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

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setSuccess(false);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock success
    setSuccess(true);
    setLoading(false);

    // Redirect after success
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  const border = dark ? "border-white/[0.08]" : "border-black/[0.07]";
  const text = dark ? "text-[#ece9e4]" : "text-[#201f1c]";
  const muted = dark ? "text-[#8c8b84]" : "text-[#6b6960]";
  const bg = dark ? "bg-[#0a0a0a]" : "bg-[#faf9f5]";
  const cardBg = dark ? "bg-[#131211]" : "bg-white";
  const inputBg = dark ? "bg-white/[0.04]" : "bg-black/[0.02]";
  const gradientText = "bg-gradient-to-r from-[#cc785c] to-[#b5613e] bg-clip-text text-transparent";

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${bg} px-4 py-12 sm:px-6 lg:px-8 transition-colors duration-500`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#cc785c]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#b5613e]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Back button */}
        <Link
          href="/"
          className={`inline-flex items-center gap-2 text-sm ${muted} hover:text-[#cc785c] transition-colors duration-200 mb-6`}
        >
          <ChevronLeft className="w-4 h-4" />
          Back to home
        </Link>

        {/* Main card */}
        <div
          className={`${cardBg} rounded-3xl shadow-2xl p-8 sm:p-10 border ${border} transition-all duration-500`}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#cc785c]/10 mb-4">
              <Sparkles className="w-7 h-7 text-[#cc785c]" />
            </div>
            <h1 className={`text-2xl sm:text-3xl font-display font-semibold ${text}`}>
              {isLogin ? "Welcome back" : "Create account"}
            </h1>
            <p className={`text-sm ${muted} mt-2`}>
              {isLogin
                ? "Sign in to continue your learning journey"
                : "Start mastering DSA & System Design today"}
            </p>
          </div>

          {/* Success message */}
          {success && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-6 animate-fadeIn">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
              <p className="text-sm text-emerald-600 dark:text-emerald-400">
                {isLogin ? "Login successful! Redirecting..." : "Account created successfully! Redirecting..."}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field - only for signup */}
            {!isLogin && (
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
                    placeholder="Enter your full name"
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
            )}

            {/* Email field */}
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

            {/* Password field */}
            <div>
              <label className={`block text-sm font-medium ${text} mb-1.5`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.password ? "text-red-500" : muted}`} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={isLogin ? "Enter your password" : "Create a password"}
                  className={`w-full pl-10 pr-12 py-3 rounded-xl border transition-all duration-200 outline-none ${inputBg} ${text} ${
                    errors.password
                      ? "border-red-500 focus:border-red-500"
                      : border + " focus:border-[#cc785c]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-[#cc785c] transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="flex items-center gap-1 text-red-500 text-xs mt-1.5">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm password - only for signup */}
            {!isLogin && (
              <div>
                <label className={`block text-sm font-medium ${text} mb-1.5`}>
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.confirmPassword ? "text-red-500" : muted}`} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 outline-none ${inputBg} ${text} ${
                      errors.confirmPassword
                        ? "border-red-500 focus:border-red-500"
                        : border + " focus:border-[#cc785c]"
                    }`}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="flex items-center gap-1 text-red-500 text-xs mt-1.5">
                    <AlertCircle className="w-3 h-3" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {/* Forgot password link - only for login */}
            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-[#cc785c] hover:text-[#b5613e] transition-colors duration-200"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-[0_8px_24px_-6px_rgba(204,120,92,0.4)] hover:shadow-[0_12px_32px_-6px_rgba(204,120,92,0.5)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100`}
              style={{
                background: loading
                  ? "linear-gradient(135deg, #cc785c 0%, #b5613e 100%)"
                  : "linear-gradient(135deg, #cc785c 0%, #b5613e 100%)",
              }}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isLogin ? "Signing in..." : "Creating account..."}
                </>
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${border}`} />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className={`px-3 ${cardBg} ${muted}`}>or continue with</span>
            </div>
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border ${border} ${inputBg} ${text} text-sm font-medium transition-all duration-200 hover:scale-[1.02] hover:border-[#cc785c]/30`}
            >

              GitHub
            </button>
            <button
              type="button"
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border ${border} ${inputBg} ${text} text-sm font-medium transition-all duration-200 hover:scale-[1.02] hover:border-[#cc785c]/30`}
            >

              Twitter
            </button>
          </div>

          {/* Toggle between login and signup */}
          <div className="text-center mt-6">
            <p className={`text-sm ${muted}`}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={toggleMode}
                className="ml-2 text-[#cc785c] font-semibold hover:text-[#b5613e] transition-colors duration-200"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>

          {/* Trust badge */}
          <div className="mt-6 pt-6 border-t border-dashed" style={{ borderColor: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}>
            <p className={`text-center text-[10px] ${muted}`}>
              🔒 Secure · 100% encrypted · No spam
            </p>
          </div>
        </div>

        {/* Features badge */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-[#cc785c]" />
            <span className={`text-xs ${muted}`}>Lifetime access</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-[#cc785c]" />
            <span className={`text-xs ${muted}`}>30-day guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-[#cc785c]" />
            <span className={`text-xs ${muted}`}>Community support</span>
          </div>
        </div>
      </div>
    </div>
  );
}