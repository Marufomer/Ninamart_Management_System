import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
} from "recharts";
import AdminPageShell from "../../components/admin/AdminPageShell";
import { salesChartData } from "../../data/mockData";
import { adminRoutes } from "../../data/adminRoutes";

const COLORS = ["#6366f1", "#10b981", "#f59e0b"];

const paymentData = [
  { name: "Mobile Money (Telebirr)", value: 52000, color: "#6366f1" },
  { name: "Cash", value: 24000, color: "#10b981" },
  { name: "Card Payments", value: 6450, color: "#f59e0b" },
];

export default function AdminRevenueAnalytics() {
  return (
    <AdminPageShell
      title="Revenue Analytics"
      description={adminRoutes.revenueAnalytics.description}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Graph display */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-slate-800">Sales Trend Analysis</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesChartData} margin={{ left: -10, right: 5 }}>
                <defs>
                  <linearGradient id="analyticsSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f8fafc" vertical={false} />
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={40} />
                <Tooltip
                  contentStyle={{ borderRadius: "12px", border: "1px solid #f1f5f9", fontSize: "12px" }}
                  formatter={(val) => [`Br ${val}`, "Sales"]}
                />
                <Area type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={2.5} fill="url(#analyticsSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment breakdown */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-800">Payment Modes</h3>
            <div className="h-[120px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie data={paymentData} cx="55%" cy="50%" innerRadius={35} outerRadius={50} paddingAngle={4} dataKey="value">
                    {paymentData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => `Br ${Number(v).toLocaleString()}`} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-1.5 mt-2">
            {paymentData.map((mode) => (
              <div key={mode.name} className="flex items-center justify-between text-xs text-slate-650">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: mode.color }} />
                  <span>{mode.name}</span>
                </div>
                <span className="font-semibold text-slate-800">Br {mode.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminPageShell>
  );
}
