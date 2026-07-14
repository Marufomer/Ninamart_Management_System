import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { inventoryData } from "../../data/mockData";

const total = inventoryData.reduce((sum, item) => sum + item.value, 0);

export default function InventoryStatus() {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:p-5">
      <h3 className="mb-3 text-sm font-semibold text-slate-800 sm:mb-4">
        Inventory Status
      </h3>
      <div className="relative mx-auto h-[160px] w-[160px] sm:h-[180px] sm:w-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={inventoryData}
              cx="50%"
              cy="50%"
              innerRadius="55%"
              outerRadius="80%"
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
            >
              {inventoryData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-base font-bold text-slate-800 sm:text-lg">
            {total.toLocaleString()}
          </p>
          <p className="text-[10px] text-slate-400">Total Products</p>
        </div>
      </div>
      <div className="mt-3 space-y-2 sm:mt-4">
        {inventoryData.map((item) => (
          <div key={item.name} className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="truncate text-xs text-slate-600">{item.name}</span>
            </div>
            <span className="shrink-0 text-xs font-semibold text-slate-700">
              {item.value.toLocaleString()} (
              {((item.value / total) * 100).toFixed(1)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
