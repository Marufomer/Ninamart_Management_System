import { useState } from "react";
import { Activity, Search, Settings, ShoppingCart, PlusCircle, RotateCcw, Database } from "lucide-react";
import AdminPageShell from "../../components/admin/AdminPageShell";
import { adminActivityLogs } from "../../data/adminPagesData";
import { adminRoutes } from "../../data/adminRoutes";

const icons: Record<string, typeof Settings> = {
  settings: Settings,
  sale: ShoppingCart,
  product: PlusCircle,
  return: RotateCcw,
  system: Database,
};

const colors: Record<string, string> = {
  settings: "bg-indigo-50 text-indigo-650",
  sale: "bg-emerald-50 text-emerald-650",
  product: "bg-purple-50 text-purple-655",
  return: "bg-amber-50 text-amber-650",
  system: "bg-slate-50 text-slate-650",
};

export default function AdminActivityLogs() {
  const [search, setSearch] = useState("");

  const filtered = adminActivityLogs.filter(
    (log) =>
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminPageShell
      title="Activity Logs"
      description={adminRoutes.activityLogs.description}
    >
      <div className="mb-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search activity logs..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-700 focus:border-indigo-300 focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-2.5">
        {filtered.map((log) => {
          const Icon = icons[log.type] || Activity;
          const style = colors[log.type] || "bg-slate-100 text-slate-600";
          return (
            <div
              key={log.id}
              className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${style}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800">
                  {log.user}{" "}
                  <span className="font-normal text-slate-500">{log.action}</span>
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">{log.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </AdminPageShell>
  );
}
