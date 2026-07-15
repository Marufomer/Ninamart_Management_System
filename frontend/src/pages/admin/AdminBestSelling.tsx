import { Star, TrendingUp, Sparkles } from "lucide-react";
import AdminPageShell from "../../components/admin/AdminPageShell";
import { bestSellingProducts } from "../../data/mockData";
import { adminRoutes } from "../../data/adminRoutes";

export default function AdminBestSelling() {
  return (
    <AdminPageShell
      title="Best Selling Products"
      description={adminRoutes.bestSelling.description}
      action={
        <span className="inline-flex items-center gap-1.5 rounded-xl bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">
          <Sparkles className="h-4 w-4 text-amber-500" />
          Top Performers
        </span>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Star className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Top Product</p>
              <h4 className="text-base font-bold text-slate-800">iPhone 15 Pro</h4>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Top Category</p>
              <h4 className="text-base font-bold text-slate-800">Phones & Tablets</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3">Units Sold</th>
                <th className="px-4 py-3">Revenue Generated</th>
                <th className="px-4 py-3">Current Stock</th>
                <th className="px-4 py-3">Stock Status</th>
              </tr>
            </thead>
            <tbody>
              {bestSellingProducts.map((product, idx) => (
                <tr
                  key={idx}
                  className="border-b border-slate-55 transition hover:bg-slate-50/50"
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-12 w-12 rounded-lg object-cover ring-2 ring-indigo-50"
                      />
                      <div>
                        <p className="font-semibold text-slate-800">{product.name}</p>
                        <p className="text-[10px] text-indigo-500 font-semibold uppercase tracking-wide">
                          Rank #{idx + 1}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-bold text-slate-700">{product.sold} units</td>
                  <td className="px-4 py-3.5 font-bold text-indigo-600">{product.revenue}</td>
                  <td className="px-4 py-3.5 font-semibold text-slate-650">{product.stock}</td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                        product.stock <= 15
                          ? "bg-amber-100 text-amber-600"
                          : "bg-emerald-100 text-emerald-600"
                      }`}
                    >
                      {product.stock <= 15 ? "Low Stock Risk" : "In Stock"}
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
