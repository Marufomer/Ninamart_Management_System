import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DollarSign, ShoppingBag, Package, RotateCcw, Tag, Calendar } from "lucide-react";
import AdminPageShell from "../../components/admin/AdminPageShell";
import { todaysSummary, todaysSales, salesChartData } from "../../data/mockData";
import { adminRoutes } from "../../data/adminRoutes";

const icons: Record<string, typeof DollarSign> = {
  dollarSign: DollarSign,
  shoppingBag: ShoppingBag,
  package: Package,
  rotateCcw: RotateCcw,
  tag: Tag,
};

export default function AdminDailyReport() {
  const todayStr = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <AdminPageShell
      title="Daily Sales Report"
      description={adminRoutes.dailyReport.description}
      action={
        <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 sm:text-sm">
          <Calendar className="h-4 w-4 text-slate-400" />
          {todayStr}
        </span>
      }
    >
      {/* Summary KPI Row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        {todaysSummary.map((item) => {
          const Icon = icons[item.icon] || DollarSign;
          return (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${item.bg} ${item.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-[11px] font-medium text-slate-400">{item.label}</p>
              <p className="mt-1 text-lg font-bold text-slate-800">{item.value}</p>
            </div>
          );
        })}
      </div>

      {/* Hourly Sales Progression Graph */}
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
        <h3 className="mb-4 text-sm font-semibold text-slate-800">Hourly Sales (Today)</h3>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesChartData} margin={{ left: -10, right: 5 }}>
              <defs>
                <linearGradient id="dailySalesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f8fafc" vertical={false} />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                width={40}
                tickFormatter={(v) => `Br ${v}`}
              />
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "1px solid #f1f5f9", fontSize: "12px" }}
                formatter={(val) => [`Br ${val}`, "Revenue"]}
              />
              <Area type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={2.5} fill="url(#dailySalesGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Today's Transactions list */}
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
        <h3 className="mb-3 text-sm font-semibold text-slate-800">Today's Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                <th className="pb-3 pr-2">Invoice</th>
                <th className="pb-3 pr-2">Customer</th>
                <th className="pb-3 pr-2">Product</th>
                <th className="pb-3 pr-2">Qty</th>
                <th className="pb-3 pr-2">Total</th>
                <th className="pb-3 pr-2">Staff</th>
                <th className="pb-3 pr-2">Time</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {todaysSales.map((sale) => (
                <tr key={sale.invoice} className="border-b border-slate-50 text-slate-700 last:border-b-0 hover:bg-slate-50/40">
                  <td className="py-2.5 font-semibold text-indigo-600">{sale.invoice}</td>
                  <td className="py-2.5">{sale.customer}</td>
                  <td className="py-2.5">{sale.product}</td>
                  <td className="py-2.5 font-medium">{sale.qty}</td>
                  <td className="py-2.5 font-semibold">{sale.total}</td>
                  <td className="py-2.5 text-slate-500">{sale.staff}</td>
                  <td className="py-2.5 text-slate-400">{sale.time}</td>
                  <td className="py-2.5 text-right">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        sale.status === "Paid" ? "bg-emerald-100 text-emerald-600" : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {sale.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminPageShell>
  );
}
