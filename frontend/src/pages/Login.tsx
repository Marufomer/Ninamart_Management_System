import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import NinaLogo from "../components/staff/NinaLogo";
import loginHero from "../assets/login-hero.png";

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = login(email, password);

    if (!result.success) {
      setLoading(false);
      setError(result.error ?? "Login failed");
      return;
    }

    setRedirecting(true);
    setTimeout(() => {
      navigate(result.user?.role === "admin" ? "/dashboard" : "/staff/pos");
    }, 900);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#eef0f8] p-4 sm:p-6">
      {redirecting && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-white/95 backdrop-blur-sm">
          <NinaLogo size="lg" animated variant="pulse" />
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-800">Welcome back!</p>
            <p className="mt-1 text-xs text-slate-400">Opening your dashboard...</p>
          </div>
        </div>
      )}
      <div className="flex w-full max-w-[1080px] overflow-hidden rounded-[28px] bg-white shadow-[0_8px_60px_rgba(99,102,241,0.12)]">
        {/* Left Panel — Branding + Hero Image */}
        <div className="relative hidden w-[50%] flex-col overflow-hidden lg:flex">
          {/* Lavender gradient background with decorative circles */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#e8eaf6] via-[#ede9fe] to-[#f0f0ff]" />
          <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-indigo-200/30 blur-2xl" />
          <div className="absolute -right-10 top-1/3 h-48 w-48 rounded-full bg-purple-200/25 blur-2xl" />
          <div className="absolute bottom-20 left-1/4 h-32 w-32 rounded-full bg-blue-200/20 blur-xl" />

          {/* Top content */}
          <div className="relative z-10 px-10 pt-10">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-lg font-bold text-white shadow-lg shadow-indigo-300/40">
                N
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">NinaMart</h1>
                <p className="text-[10px] font-semibold tracking-[0.15em] text-slate-500">
                  SHOP SMART, LIVE BETTER
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-[1.85rem] font-bold leading-[1.25] text-slate-800">
                Manage Your Business
                <br />
                Smarter
              </h2>
              <p className="mt-3 max-w-[300px] text-[13px] leading-relaxed text-slate-500">
                All-in-one inventory, sales and staff management for your
                growing store.
              </p>
            </div>
          </div>

          {/* Hero image at bottom */}
          <div className="relative z-10 mt-auto flex flex-1 items-end">
            <img
              src={loginHero}
              alt="NinaMart dashboard preview"
              className="w-full object-cover object-bottom"
            />
          </div>
        </div>

        {/* Right Panel — Login Form */}
        <div className="flex w-full flex-col justify-center px-8 py-12 sm:px-12 lg:w-[50%] lg:px-14 lg:py-14">
          {/* Mobile logo */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-base font-bold text-white">
              N
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800">NinaMart</h1>
              <p className="text-[9px] font-semibold tracking-widest text-slate-500">
                SHOP SMART, LIVE BETTER
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-[1.65rem] font-bold text-slate-800">
              Welcome Back
            </h2>
            <p className="mt-1.5 text-sm text-slate-500">
              Sign in to your NinaMart account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-[18px]">
            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="youremail@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-white py-[13px] pl-11 pr-4 text-sm text-slate-700 placeholder:text-slate-400 transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  required
                />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs font-medium text-blue-600 transition hover:text-blue-700"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-white py-[13px] pl-11 pr-11 text-sm text-slate-700 placeholder:text-slate-400 transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-[17px] w-[17px]" />
                  ) : (
                    <Eye className="h-[17px] w-[17px]" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-[13px] text-sm font-semibold text-white shadow-md shadow-indigo-200/60 transition hover:brightness-110 active:scale-[0.98] disabled:opacity-70"
            >
              <LogIn className="h-[17px] w-[17px]" />
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400">or</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-[13px] text-sm font-medium text-slate-700 transition hover:bg-slate-50 active:scale-[0.98]"
          >
            <GoogleIcon />
            Sign in with Google
          </button>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <a
              href="#"
              className="font-semibold text-indigo-600 transition hover:text-indigo-700"
            >
              Contact Admin
            </a>
          </p>

          {/* <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <p className="mb-2 text-xs font-semibold text-slate-600">Demo Credentials</p>
            <div className="space-y-1 text-[11px] text-slate-500">
              <p><span className="font-medium text-slate-700">Admin:</span> admin@ninamart.com / admin123</p>
              <p><span className="font-medium text-slate-700">Staff:</span> ahmed@ninamart.com / staff123</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
