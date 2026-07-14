import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Search, Bell, Calendar, ScanLine, ShoppingCart } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import StaffProfileLink from "./StaffProfileLink";

interface StaffHeaderProps {
  onMenuClick: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  title?: string;
  titleShort?: string;
  searchPlaceholder?: string;
  showScanIcon?: boolean;
  cartCount?: number;
  onCartClick?: () => void;
  showCartButton?: boolean;
}

export default function StaffHeader({
  onMenuClick,
  searchQuery,
  onSearchChange,
  title = "New Sale (POS)",
  titleShort = "POS",
  searchPlaceholder = "Search products by name, barcode or SKU...",
  showScanIcon = true,
  cartCount = 0,
  onCartClick,
  showCartButton = false,
}: StaffHeaderProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const date = now.toLocaleDateString("en-GB", {
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
      setDateTime(`${date}, ${time}`);
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white">
      <div className="flex h-14 items-center gap-2 px-3 sm:h-[60px] sm:gap-3 sm:px-4 lg:px-5">
        <button
          onClick={onMenuClick}
          className="shrink-0 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <h2 className="min-w-0 truncate text-sm font-semibold text-slate-800 sm:text-base">
          <span className="sm:hidden">{titleShort}</span>
          <span className="hidden sm:inline">{title}</span>
        </h2>

        <div className="mx-auto hidden max-w-lg flex-1 md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className={`w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 ${showScanIcon ? "pr-10" : "pr-4"}`}
            />
            {showScanIcon && (
              <ScanLine className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            )}
          </div>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
          {showCartButton && (
            <button
              onClick={onCartClick}
              className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 lg:hidden"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          <button
            onClick={() => navigate("/staff/notifications")}
            className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
            aria-label="View notifications"
          >
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[9px] font-bold text-white">
              3
            </span>
          </button>

          <div className="hidden items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 xl:flex">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-[11px] font-medium text-slate-600">{dateTime}</span>
          </div>

          <StaffProfileLink className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-1.5 py-1 sm:gap-2 sm:px-2">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="h-7 w-7 rounded-full"
            />
            <div className="hidden min-w-0 md:block text-left">
              <p className="truncate text-[11px] font-semibold text-slate-700">
                Staff: {user?.name}
              </p>
              <p className="text-[10px] text-slate-400">Cashier</p>
            </div>
          </StaffProfileLink>
        </div>
      </div>

      {/* Mobile / tablet search */}
      <div className="border-t border-slate-100 px-3 py-2.5 md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className={`w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 ${showScanIcon ? "pr-10" : "pr-4"}`}
          />
          {showScanIcon && (
            <ScanLine className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          )}
        </div>
      </div>
    </header>
  );
}
