import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  salesSummaryItems,
  paymentMethodData,
  topSellingProducts,
  TOTAL_SALES_AMOUNT,
} from "../../data/salesHistoryData";
import { formatCurrency } from "../../data/posData";

export default function SalesSummaryPanel() {
  return (
    <div className="space-y-4">
      {/* Sales Summary */}
      <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:p-4">
        <h3 className="mb-3 text-sm font-semibold text-slate-800">
          Sales Summary
        </h3>
        <div className="space-y-2.5">
          {salesSummaryItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between"
            >
              <span className="text-xs text-slate-500">{item.label}</span>
              <span
                className={`text-xs font-semibold ${
                  item.highlight ? "text-indigo-600" : "text-slate-800"
                }`}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sales by Payment Method */}
      <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:p-4">
        <h3 className="mb-3 text-sm font-semibold text-slate-800">
          Sales by Payment Method
        </h3>
        <div className="relative mx-auto h-[160px] w-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={paymentMethodData}
                cx="50%"
                cy="50%"
                innerRadius="55%"
                outerRadius="80%"
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {paymentMethodData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-sm font-bold text-slate-800">
              {formatCurrency(TOTAL_SALES_AMOUNT).replace(".00", "")}
            </p>
          </div>
        </div>
        <div className="mt-3 space-y-2">
          {paymentMethodData.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between gap-2"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="truncate text-xs text-slate-600">
                  {item.name}
                </span>
              </div>
              <span className="shrink-0 text-xs font-semibold text-slate-700">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:p-4">
        <h3 className="mb-3 text-sm font-semibold text-slate-800">
          Top Selling Products
        </h3>
        <div className="space-y-2.5">
          {topSellingProducts.map((product, index) => (
            <div
              key={product.name}
              className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-slate-50"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-500">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-slate-700">
                  {product.name}
                </p>
                <p className="text-[10px] text-slate-400">
                  {product.sold} sold
                </p>
              </div>
              <p className="shrink-0 text-[11px] font-bold text-indigo-600">
                {product.revenue}
              </p>
            </div>
          ))}
        </div>
        <button className="mt-3 w-full rounded-lg border border-slate-200 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50">
          View All Products
        </button>
      </div>
    </div>
  );
}
