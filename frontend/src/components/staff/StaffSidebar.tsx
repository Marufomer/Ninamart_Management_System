import { NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  History,
  BarChart3,
  Package,
  Users,
  RotateCcw,
  LogOut,
  ChevronsLeft,
  X,
  type LucideIcon,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navItems: { name: string; icon: LucideIcon; path: string }[] = [
  { name: "POS (New Sale)", icon: ShoppingCart, path: "/staff/pos" },
  { name: "Sales History", icon: History, path: "/staff/sales" },
  { name: "My Performance", icon: BarChart3, path: "/staff/performance" },
  { name: "Products", icon: Package, path: "/staff/products" },
  { name: "Customers", icon: Users, path: "/staff/customers" },
  { name: "Returns (Request)", icon: RotateCcw, path: "/staff/returns" },
];

interface StaffSidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  isMobile: boolean;
  onToggle: () => void;
  onNavClick: () => void;
}

export default function StaffSidebar({
  collapsed,
  mobileOpen,
  isMobile,
  onToggle,
  onNavClick,
}: StaffSidebarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const showLabels = isMobile || !collapsed;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen flex-col bg-sidebar transition-transform duration-300 ease-in-out ${
        isMobile
          ? `w-[280px] max-w-[85vw] ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`
          : `${collapsed ? "w-[72px]" : "w-[240px]"} translate-x-0`
      }`}
    >
      <div className="flex items-center justify-between px-4 py-4 sm:py-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-lg font-bold text-white shadow-lg">
            N
          </div>
          {showLabels && (
            <div className="min-w-0">
              <h1 className="truncate text-base font-bold text-white">NinaMart</h1>
              <p className="truncate text-[9px] tracking-wider text-slate-400">
                SHOP SMART, LIVE BETTER
              </p>
            </div>
          )}
        </div>
        {showLabels && (
          <button
            onClick={onToggle}
            className="shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-sidebar-hover hover:text-white"
            aria-label={isMobile ? "Close menu" : "Collapse sidebar"}
          >
            {isMobile ? <X className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto overscroll-contain px-3 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/staff/pos"}
              onClick={onNavClick}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-md"
                    : "text-slate-300 hover:bg-sidebar-hover hover:text-white"
                }`
              }
            >
              <Icon className="h-[18px] w-[18px] shrink-0" />
              {showLabels && <span className="truncate">{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-slate-700/50 p-3">
        <div className="mb-2 flex items-center gap-3 rounded-xl bg-sidebar-hover/50 p-2.5">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="h-9 w-9 shrink-0 rounded-full ring-2 ring-emerald-500/40"
          />
          {showLabels && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{user?.name}</p>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <p className="truncate text-[11px] text-slate-400">
                  {user?.title} · Online
                </p>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] text-slate-400 transition hover:bg-sidebar-hover hover:text-white"
        >
          <LogOut className="h-[18px] w-[18px] shrink-0" />
          {showLabels && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
