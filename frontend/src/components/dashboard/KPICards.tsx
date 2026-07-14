import {
  DollarSign,
  ShoppingBag,
  Package,
  AlertTriangle,
  Boxes,
  Users,
  TrendingUp,
} from "lucide-react";
import { kpiCards } from "../../data/mockData";

const iconComponents: Record<string, React.ReactNode> = {
  revenue: <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />,
  orders: <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />,
  products: <Package className="h-4 w-4 sm:h-5 sm:w-5" />,
  lowstock: <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />,
  inventory: <Boxes className="h-4 w-4 sm:h-5 sm:w-5" />,
  staff: <Users className="h-4 w-4 sm:h-5 sm:w-5" />,
};

export default function KPICards() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-6">
      {kpiCards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm transition hover:shadow-md sm:p-4"
        >
          <div className="flex items-start justify-between">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-xl sm:h-10 sm:w-10 ${card.iconBg} ${card.iconColor}`}
            >
              {iconComponents[card.icon]}
            </div>
            {card.trendUp && (
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            )}
          </div>
          <p className="mt-2 text-[11px] font-medium text-slate-500 sm:mt-3 sm:text-xs">
            {card.title}
          </p>
          <p className="mt-0.5 text-lg font-bold text-slate-800 sm:mt-1 sm:text-xl">
            {card.value}
          </p>
          <p
            className={`mt-0.5 text-[10px] font-medium sm:mt-1 sm:text-[11px] ${
              card.isLink
                ? "cursor-pointer text-indigo-600 hover:underline"
                : card.trendUp
                  ? "text-emerald-600"
                  : "text-slate-400"
            }`}
          >
            {card.trend}
          </p>
        </div>
      ))}
    </div>
  );
}
