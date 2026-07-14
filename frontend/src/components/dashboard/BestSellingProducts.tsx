import { bestSellingProducts } from "../../data/mockData";

export default function BestSellingProducts() {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:p-5">
      <h3 className="mb-3 text-sm font-semibold text-slate-800 sm:mb-4">
        Best Selling Products
      </h3>
      <div className="space-y-2 sm:space-y-3">
        {bestSellingProducts.map((product, index) => (
          <div
            key={product.name}
            className="flex items-center gap-2 rounded-lg p-2 transition hover:bg-slate-50 sm:gap-3"
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-500 sm:h-6 sm:w-6">
              {index + 1}
            </span>
            <img
              src={product.image}
              alt={product.name}
              className="h-9 w-9 shrink-0 rounded-lg object-cover sm:h-10 sm:w-10"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-slate-700">
                {product.name}
              </p>
              <p className="text-[11px] text-slate-400">
                {product.sold} sold · Stock: {product.stock}
              </p>
            </div>
            <p className="shrink-0 text-[11px] font-bold text-indigo-600 sm:text-xs">
              {product.revenue}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
