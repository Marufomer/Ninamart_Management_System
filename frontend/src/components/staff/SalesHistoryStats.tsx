import {
  DollarSign,
  Receipt,
  Package,
  TrendingUp,
  TrendingDown,
  Percent,
  RotateCcw,
} from "lucide-react";
import { salesHistoryStats } from "../../data/salesHistoryData";

const iconComponents: Record<string, React.ReactNode> = {
  sales: <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />,
  transactions: <Receipt className="h-4 w-4 sm:h-5 sm:w-5" />,
  items: <Package className="h-4 w-4 sm:h-5 sm:w-5" />,
  avgOrder: <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />,
  discounts: <Percent className="h-4 w-4 sm:h-5 sm:w-5" />,
  returns: <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5" />,
};

export default function SalesHistoryStats() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-6">
      {salesHistoryStats.map((card) => (
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
            {card.trendUp ? (
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-400" />
            )}
          </div>
          <p className="mt-2 text-[11px] font-medium text-slate-500 sm:mt-3 sm:text-xs">
            {card.title}
          </p>
          <p className="mt-0.5 text-base font-bold text-slate-800 sm:mt-1 sm:text-lg">
            {card.value}
          </p>
          <p
            className={`mt-0.5 text-[10px] font-medium sm:mt-1 sm:text-[11px] ${
              card.trendUp ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {card.trend}
          </p>
        </div>
      ))}
    </div>
  );
}
