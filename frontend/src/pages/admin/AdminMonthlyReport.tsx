import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, DollarSign, ShoppingBag } from "lucide-react";
import AdminPageShell from "../../components/admin/AdminPageShell";
import { adminRoutes } from "../../data/adminRoutes";

const monthlyData = [
  { month: "Jan", revenue: 540000, profit: 162000, orders: 420 },
  { month: "Feb", revenue: 620000, profit: 186000, orders: 490 },
  { month: "Mar", revenue: 710000, profit: 213000, orders: 580 },
  { month: "Apr", revenue: 680000, profit: 204000, orders: 530 },
  { month: "May", revenue: 840000, profit: 252000, orders: 660 },
  { month: "Jun", revenue: 950000, profit: 285000, orders: 740 },
  { month: "Jul", revenue: 890000, profit: 267000, orders: 690 },
];

export default function AdminMonthlyReport() {
  const [selectedYear, setSelectedYear] = useState("2026");

  return (
    <AdminPageShell
      title="Monthly Sales Report"
      description={adminRoutes.monthlyReport.description}
      action={
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        >
          <option value="2026">Year 2026</option>
          <option value="2025">Year 2025</option>
        </select>
      }
    >
      {/* Overview stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">YTD Revenue</p>
              <h4 className="text-lg font-bold text-slate-800">Br 5,230,000</h4>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
            <TrendingUp className="h-4 w-4" />
            <span>+14.2% vs previous year</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">YTD Profit</p>
              <h4 className="text-lg font-bold text-slate-800">Br 1,569,000</h4>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
            <TrendingUp className="h-4 w-4" />
            <span>+15.5% vs previous year</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Total Orders YTD</p>
              <h4 className="text-lg font-bold text-slate-800">4,110</h4>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
            <TrendingUp className="h-4 w-4" />
            <span>+9.8% vs previous year</span>
          </div>
        </div>
      </div>

      {/* Monthly chart comparison */}
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
        <h3 className="mb-4 text-sm font-semibold text-slate-800">Revenue & Profit Breakdown</h3>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ left: -10, right: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f8fafc" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                width={50}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "1px solid #f1f5f9", fontSize: "12px" }}
                formatter={(val) => [`Br ${Number(val).toLocaleString()}`]}
              />
              <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
              <Bar dataKey="revenue" name="Total Revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              <Bar dataKey="profit" name="Net Profit" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly breakdown table */}
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
        <h3 className="mb-3 text-sm font-semibold text-slate-800">Monthly breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                <th className="pb-3">Month</th>
                <th className="pb-3">Orders</th>
                <th className="pb-3">Gross Revenue</th>
                <th className="pb-3">Net Profit</th>
                <th className="pb-3 text-right">Profit Margin</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((data) => {
                const margin = ((data.profit / data.revenue) * 100).toFixed(0);
                return (
                  <tr key={data.month} className="border-b border-slate-50 text-slate-700 last:border-b-0 hover:bg-slate-50/40">
                    <td className="py-2.5 font-semibold text-slate-850">{data.month}</td>
                    <td className="py-2.5 font-medium">{data.orders}</td>
                    <td className="py-2.5 font-semibold text-indigo-650">Br {data.revenue.toLocaleString()}</td>
                    <td className="py-2.5 font-semibold text-emerald-650">Br {data.profit.toLocaleString()}</td>
                    <td className="py-2.5 text-right font-medium text-slate-500">{margin}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminPageShell>
  );
}
