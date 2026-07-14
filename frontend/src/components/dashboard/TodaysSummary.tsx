import {
  DollarSign,
  ShoppingBag,
  Package,
  RotateCcw,
  Tag,
} from "lucide-react";
import { todaysSummary } from "../../data/mockData";

const iconMap: Record<string, React.ReactNode> = {
  dollarSign: <DollarSign className="h-4 w-4" />,
  shoppingBag: <ShoppingBag className="h-4 w-4" />,
  package: <Package className="h-4 w-4" />,
  rotateCcw: <RotateCcw className="h-4 w-4" />,
  tag: <Tag className="h-4 w-4" />,
};

export default function TodaysSummary() {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:p-5">
      <h3 className="mb-3 text-sm font-semibold text-slate-800 sm:mb-4">
        Today&apos;s Summary
      </h3>
      <div className="space-y-2 sm:space-y-3">
        {todaysSummary.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-2 rounded-lg border border-slate-50 p-2.5 transition hover:bg-slate-50 sm:p-3"
          >
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg sm:h-9 sm:w-9 ${item.bg} ${item.color}`}
              >
                {iconMap[item.icon]}
              </div>
              <span className="truncate text-xs font-medium text-slate-600">
                {item.label}
              </span>
            </div>
            <span className={`shrink-0 text-xs font-bold sm:text-sm ${item.color}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
