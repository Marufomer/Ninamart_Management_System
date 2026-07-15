import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { salesChartData, salesOverviewStats } from "../../data/mockData";

const timeRanges = ["Today", "Week", "Month", "Year"];

const weeklySalesData = [
  { time: "Mon", sales: 45000 },
  { time: "Tue", sales: 52000 },
  { time: "Wed", sales: 49000 },
  { time: "Thu", sales: 63000 },
  { time: "Fri", sales: 58000 },
  { time: "Sat", sales: 74000 },
  { time: "Sun", sales: 69000 },
];

const monthlySalesData = [
  { time: "Week 1", sales: 180000 },
  { time: "Week 2", sales: 220000 },
  { time: "Week 3", sales: 210000 },
  { time: "Week 4", sales: 245000 },
];

const yearlySalesData = [
  { time: "Jan", sales: 540000 },
  { time: "Feb", sales: 620000 },
  { time: "Mar", sales: 710000 },
  { time: "Apr", sales: 680500 },
  { time: "May", sales: 840000 },
  { time: "Jun", sales: 950000 },
  { time: "Jul", sales: 890000 },
  { time: "Aug", sales: 910000 },
  { time: "Sep", sales: 870000 },
  { time: "Oct", sales: 960000 },
  { time: "Nov", sales: 1050000 },
  { time: "Dec", sales: 1200000 },
];

export default function SalesOverview() {
  const [activeRange, setActiveRange] = useState("Today");

  const getChartData = () => {
    switch (activeRange) {
      case "Week":
        return weeklySalesData;
      case "Month":
        return monthlySalesData;
      case "Year":
        return yearlySalesData;
      case "Today":
      default:
        return salesChartData;
    }
  };

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-sm font-semibold text-slate-800">Sales Overview</h3>
        <div className="flex gap-1 self-start overflow-x-auto rounded-lg bg-slate-100 p-0.5">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={`shrink-0 rounded-md px-2.5 py-1 text-[11px] font-medium transition sm:px-3 sm:text-xs ${
                activeRange === range
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[180px] sm:h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={getChartData()} margin={{ left: -10, right: 5 }}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              width={35}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                fontSize: "12px",
              }}
              formatter={(value) => [`Br ${Number(value).toLocaleString()}`, "Sales"]}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#6366f1"
              strokeWidth={2.5}
              fill="url(#salesGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 sm:grid-cols-4">
        {salesOverviewStats.map((stat) => (
          <div key={stat.label} className="text-center sm:text-center">
            <p className="text-[10px] text-slate-500 sm:text-[11px]">{stat.label}</p>
            <p className={`mt-0.5 text-xs font-bold sm:text-sm ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
