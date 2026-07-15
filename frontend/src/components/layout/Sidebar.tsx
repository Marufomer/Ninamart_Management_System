import {
  LayoutDashboard,
  Package,
  Grid3X3,
  Warehouse,
  Plus,
  ShoppingCart,
  RotateCcw,
  Percent,
  UserCheck,
  Shield,
  FileText,
  BarChart3,
  Star,
  PieChart,
  Store,
  UserCog,
  Activity,
  Database,
  Bell,
  ChevronDown,
  ChevronsLeft,
  X,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { navGroups } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";
import AdminProfileLink from "./AdminProfileLink";

const iconMap: Record<string, LucideIcon> = {
  package: Package,
  grid: Grid3X3,
  warehouse: Warehouse,
  plus: Plus,
  shoppingCart: ShoppingCart,
  rotateCcw: RotateCcw,
  percent: Percent,
  userCheck: UserCheck,
  shield: Shield,
  fileText: FileText,
  barChart: BarChart3,
  star: Star,
  pieChart: PieChart,
  store: Store,
  userCog: UserCog,
  activity: Activity,
  database: Database,
  bell: Bell,
};

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  isMobile: boolean;
  onToggle: () => void;
  onNavClick: () => void;
}

export default function Sidebar({
  collapsed,
  mobileOpen,
  isMobile,
  onToggle,
  onNavClick,
}: SidebarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const showLabels = isMobile || !collapsed;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition sm:py-2 ${
      isActive
        ? "bg-gradient-to-r from-indigo-500 to-purple-600 font-medium text-white shadow-md"
        : "text-slate-300 hover:bg-sidebar-hover hover:text-white active:bg-sidebar-hover"
    }`;

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen flex-col bg-sidebar transition-transform duration-300 ease-in-out ${
        isMobile
          ? `w-[280px] max-w-[85vw] ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`
          : `${collapsed ? "w-[72px]" : "w-[260px]"} translate-x-0`
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
              <p className="truncate text-[10px] tracking-wider text-slate-400">
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

      <div className="px-3 pb-2">
        <NavLink
          to="/dashboard"
          end
          onClick={onNavClick}
          className={navLinkClass}
        >
          <LayoutDashboard className="h-[18px] w-[18px] shrink-0" />
          {showLabels && <span>Dashboard</span>}
        </NavLink>
      </div>

      <nav className="flex-1 overflow-y-auto overscroll-contain px-3 py-2">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-4">
            {showLabels && (
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {group.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = iconMap[item.icon] || Package;
                return (
                  <li key={item.name}>
                    <NavLink
                      to={item.path}
                      onClick={onNavClick}
                      title={!showLabels ? item.name : undefined}
                      className={navLinkClass}
                    >
                      <Icon className="h-[18px] w-[18px] shrink-0" />
                      {showLabels && <span className="truncate">{item.name}</span>}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-slate-700/50 p-3">
        <AdminProfileLink
          onClick={onNavClick}
          className="flex w-full items-center gap-3 rounded-xl p-2 transition hover:bg-sidebar-hover"
        >
          <img
            src={user?.avatar ?? "https://i.pravatar.cc/40?img=68"}
            alt={user?.name ?? "Admin"}
            className="h-9 w-9 shrink-0 rounded-full ring-2 ring-indigo-500/30"
          />
          {showLabels && (
            <>
              <div className="min-w-0 flex-1 overflow-hidden text-left">
                <p className="truncate text-sm font-medium text-white">
                  {user?.name ?? "Admin"}
                </p>
                <p className="truncate text-[11px] text-slate-400">
                  {user?.title ?? "Super Administrator"}
                </p>
              </div>
              <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
            </>
          )}
        </AdminProfileLink>
        <button
          onClick={handleLogout}
          className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] text-slate-400 transition hover:bg-sidebar-hover hover:text-white"
        >
          <LogOut className="h-[18px] w-[18px] shrink-0" />
          {showLabels && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
