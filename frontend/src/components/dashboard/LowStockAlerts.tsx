import { AlertTriangle } from "lucide-react";
import { lowStockProducts } from "../../data/mockData";

export default function LowStockAlerts() {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:p-5">
      <div className="mb-3 flex items-center gap-2 sm:mb-4">
        <AlertTriangle className="h-4 w-4 text-orange-500" />
        <h3 className="text-sm font-semibold text-slate-800">Low Stock Alerts</h3>
      </div>
      <div className="space-y-2 sm:space-y-3">
        {lowStockProducts.map((product) => (
          <div
            key={product.name}
            className="flex items-center gap-2 rounded-lg border border-slate-50 p-2 transition hover:bg-slate-50 sm:gap-3"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-9 w-9 shrink-0 rounded-lg object-cover sm:h-10 sm:w-10"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-slate-700">
                {product.name}
              </p>
              <p className="text-[11px] font-semibold text-red-500">
                Remaining: {product.remaining}
              </p>
            </div>
            <button className="shrink-0 rounded-lg border border-indigo-200 px-2 py-1 text-[10px] font-semibold text-indigo-600 transition hover:bg-indigo-50 sm:px-2.5">
              Restock
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
