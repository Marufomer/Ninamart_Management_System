import { ShoppingCart, Package, RotateCcw, Plus } from "lucide-react";
import { recentActivities } from "../../data/mockData";

const typeIcons: Record<string, { icon: React.ReactNode; bg: string }> = {
  sale: { icon: <ShoppingCart className="h-3 w-3" />, bg: "bg-emerald-100 text-emerald-600" },
  restock: { icon: <Package className="h-3 w-3" />, bg: "bg-blue-100 text-blue-600" },
  add: { icon: <Plus className="h-3 w-3" />, bg: "bg-purple-100 text-purple-600" },
  return: { icon: <RotateCcw className="h-3 w-3" />, bg: "bg-orange-100 text-orange-600" },
};

export default function RecentActivities() {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:p-5">
      <h3 className="mb-3 text-sm font-semibold text-slate-800 sm:mb-4">
        Recent Activities
      </h3>
      <div className="relative space-y-0">
        <div className="absolute bottom-2 left-[15px] top-2 w-px bg-slate-200" />
        {recentActivities.map((activity, index) => {
          const typeInfo = typeIcons[activity.type] || typeIcons.sale;
          return (
            <div key={index} className="relative flex gap-2 pb-3 last:pb-0 sm:gap-3 sm:pb-4">
              <div
                className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full sm:h-[30px] sm:w-[30px] ${typeInfo.bg}`}
              >
                {typeInfo.icon}
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-xs leading-relaxed text-slate-700">
                  <span className="font-semibold">{activity.user}</span>{" "}
                  {activity.action}
                </p>
                <p className="mt-0.5 text-[10px] text-slate-400">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
