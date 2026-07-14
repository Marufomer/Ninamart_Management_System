import { Target, Wallet } from "lucide-react";
import { TODAY_TARGET, TODAY_SALES, formatCurrency } from "../../data/posData";

export default function PosFooter() {
  const achievement = ((TODAY_SALES / TODAY_TARGET) * 100).toFixed(1);

  return (
    <footer className="border-t border-slate-200 bg-white px-3 py-3 sm:px-4 sm:py-2.5 lg:px-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="grid grid-cols-1 gap-2.5 sm:flex sm:flex-wrap sm:items-center sm:gap-4 lg:gap-6">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 shrink-0 text-indigo-500" />
            <span className="text-[11px] text-slate-500">Today&apos;s Target:</span>
            <span className="text-[11px] font-bold text-slate-800">
              {formatCurrency(TODAY_TARGET)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 shrink-0 text-emerald-500" />
            <span className="text-[11px] text-slate-500">Today&apos;s Sales:</span>
            <span className="text-[11px] font-bold text-emerald-600">
              {formatCurrency(TODAY_SALES)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500">Achievement</span>
            <div className="h-1.5 min-w-[5rem] flex-1 overflow-hidden rounded-full bg-slate-100 sm:w-24 sm:flex-none">
              <div
                className="h-full rounded-full bg-indigo-500"
                style={{ width: `${achievement}%` }}
              />
            </div>
            <span className="text-[11px] font-bold text-indigo-600">{achievement}%</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] text-slate-500">
              <span className="hidden sm:inline">Last Login: </span>
              12 Jul 2026, 08:45 AM
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] font-medium text-emerald-600">
              Active Session
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
