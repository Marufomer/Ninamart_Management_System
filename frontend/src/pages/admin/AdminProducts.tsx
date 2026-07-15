import { useState, useMemo } from "react";
import { Package, AlertTriangle, Layers, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminPageShell from "../../components/admin/AdminPageShell";
import { products, formatCurrency } from "../../data/posData";
import { adminRoutes } from "../../data/adminRoutes";

export default function AdminProducts() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const lowStockCount = products.filter((p) => p.stock <= 5).length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

  return (
    <AdminPageShell
      title="Products"
      description={adminRoutes.products.description}
      action={
        <button
          onClick={() => navigate(adminRoutes.addProduct.path)}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:brightness-110"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      }
    >
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
            <Package className="h-4 w-4" />
          </div>
          <p className="text-[11px] text-slate-500">Total Products</p>
          <p className="text-lg font-bold text-slate-800">{products.length}</p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <p className="text-[11px] text-slate-500">Low Stock</p>
          <p className="text-lg font-bold text-slate-800">{lowStockCount}</p>
        </div>
        <div className="col-span-2 rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:col-span-1">
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
            <Layers className="h-4 w-4" />
          </div>
          <p className="text-[11px] text-slate-500">Total Units in Stock</p>
          <p className="text-lg font-bold text-slate-800">{totalStock}</p>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products by name, SKU or category..."
          className="w-full max-w-md rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-slate-50 transition hover:bg-slate-50/50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                      <span className="font-medium text-slate-700">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{product.sku}</td>
                  <td className="px-4 py-3 text-slate-500">{product.category}</td>
                  <td className="px-4 py-3 font-medium text-slate-700">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`font-semibold ${
                        product.stock <= 5 ? "text-red-500" : "text-slate-700"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                        product.stock === 0
                          ? "bg-red-100 text-red-600"
                          : product.stock <= 5
                            ? "bg-orange-100 text-orange-600"
                            : "bg-emerald-100 text-emerald-600"
                      }`}
                    >
                      {product.stock === 0
                        ? "Out of Stock"
                        : product.stock <= 5
                          ? "Low Stock"
                          : "In Stock"}
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
