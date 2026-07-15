import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  Bell,
  MessageSquare,
  Sun,
  Moon,
  ChevronDown,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import AdminProfileLink from "./AdminProfileLink";
import {
  getAdminRouteTitle,
  getAdminRouteTitleShort,
} from "../../data/adminRoutes";
import { getUnreadCount } from "../../utils/messageStorage";
import { getAdminUnreadCount } from "../../utils/notificationStorage";

interface HeaderProps {
  onMenuClick: () => void;
  mobileOpen: boolean;
}

export default function Header({ onMenuClick, mobileOpen }: HeaderProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dateTime, setDateTime] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const title = getAdminRouteTitle(location.pathname);
  const titleShort = getAdminRouteTitleShort(location.pathname);
  const unreadNotifications = getAdminUnreadCount();
  const unreadMessages = getUnreadCount("admin");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const formatted = now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        weekday: "short",
      });
      const time = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setDateTime(`${formatted}, ${time}`);
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;

    if (q.includes("product")) {
      navigate("/dashboard/products");
    } else if (q.includes("staff")) {
      navigate("/dashboard/staff");
    } else if (q.includes("sale") || q.includes("invoice")) {
      navigate("/dashboard/sales");
    } else if (q.includes("inventory") || q.includes("stock")) {
      navigate("/dashboard/inventory");
    } else {
      navigate("/dashboard/products");
    }
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="flex h-14 items-center gap-2 px-3 sm:h-[68px] sm:gap-4 sm:px-4 lg:px-6">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label={mobileOpen ? "Close menu" : "Toggle menu"}
            aria-expanded={mobileOpen}
          >
            <Menu className="h-5 w-5" />
          </button>
          <h2 className="truncate text-base font-semibold text-slate-800 sm:text-lg">
            <span className="sm:hidden">{titleShort}</span>
            <span className="hidden sm:inline">{title}</span>
          </h2>
        </div>

        <form
          onSubmit={handleSearch}
          className="mx-auto hidden min-w-0 max-w-xl flex-1 md:block"
        >
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, invoices, staff..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 transition focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 sm:py-2.5"
            />
          </div>
        </form>

        <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-2">
          <button
            onClick={() => setSearchOpen((prev) => !prev)}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 md:hidden"
            aria-label="Toggle search"
          >
            {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </button>

          <button
            onClick={() => navigate("/dashboard/notifications")}
            className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
            aria-label="View notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadNotifications > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white sm:h-[18px] sm:w-[18px] sm:text-[10px]">
                {unreadNotifications}
              </span>
            )}
          </button>

          <button
            onClick={() => navigate("/dashboard/messages")}
            className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
            aria-label="View messages"
          >
            <MessageSquare className="h-5 w-5" />
            {unreadMessages > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white sm:h-[18px] sm:w-[18px] sm:text-[10px]">
                {unreadMessages}
              </span>
            )}
          </button>

          <div className="hidden items-center rounded-xl border border-slate-200 bg-slate-50 px-2 py-1.5 xl:flex">
            <span className="whitespace-nowrap text-xs font-medium text-slate-600">
              {dateTime}
            </span>
          </div>

          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="hidden rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 sm:block"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={darkMode ? "Light mode (preview)" : "Dark mode (preview)"}
          >
            {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>

          <AdminProfileLink className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-1.5 py-1 transition hover:bg-slate-50 sm:gap-2 sm:px-2">
            <img
              src={user?.avatar ?? "https://i.pravatar.cc/32?img=68"}
              alt={user?.name ?? "Admin"}
              className="h-7 w-7 rounded-full sm:h-8 sm:w-8"
            />
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-slate-700">
                {user?.name ?? "Admin"}
              </p>
              <p className="text-[10px] text-slate-400">
                {user?.title ?? "Super Administrator"}
              </p>
            </div>
            <ChevronDown className="hidden h-3.5 w-3.5 text-slate-400 md:block" />
          </AdminProfileLink>
        </div>
      </div>

      {searchOpen && (
        <form
          onSubmit={handleSearch}
          className="border-t border-slate-100 px-3 pb-3 pt-2 md:hidden"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, invoices, staff..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </form>
      )}
    </header>
  );
}
