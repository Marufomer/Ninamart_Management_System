import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NinaLogo from "./NinaLogo";

export default function StaffPageTransition() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen min-w-0 flex-1 flex-col">
      {loading && (
        <div className="absolute inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-white/95 backdrop-blur-sm">
          <NinaLogo size="lg" animated variant="pulse" />
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-800">NinaMart</p>
            <p className="mt-1 text-xs text-slate-400">Loading page...</p>
          </div>
        </div>
      )}
      <div
        className={`flex min-h-screen min-w-0 flex-1 flex-col transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`}
      >
        <Outlet />
      </div>
    </div>
  );
}
