import { useState, useEffect, useMemo } from "react";
import { Package, AlertTriangle, Layers, Search } from "lucide-react";
import StaffHeader from "../../components/staff/StaffHeader";
import CategoryFilters from "../../components/staff/ProductGrid";
import { useStaffLayout } from "../../context/StaffLayoutContext";
import { products, formatCurrency } from "../../data/posData";

export default function StaffProducts() {
  const { handleMenuClick } = useStaffLayout();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory =
        activeCategory === "All" || p.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const lowStockCount = products.filter((p) => p.stock <= 5).length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

  return (
    <div className="flex min-h-screen min-w-0 flex-1 flex-col">
      <StaffHeader
        onMenuClick={handleMenuClick}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        title="Products Catalog"
        titleShort="Products"
        searchPlaceholder="Search products by name, SKU or category..."
        showScanIcon={false}
      />

      <div className="flex-1 overflow-y-auto p-3 sm:p-4">
        <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:p-4">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
              <Package className="h-4 w-4" />
            </div>
            <p className="text-[11px] text-slate-500">Total Products</p>
            <p className="text-lg font-bold text-slate-800">{products.length}</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:p-4">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <p className="text-[11px] text-slate-500">Low Stock</p>
            <p className="text-lg font-bold text-slate-800">{lowStockCount}</p>
          </div>
          <div className="col-span-2 rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:col-span-1 sm:p-4">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
              <Layers className="h-4 w-4" />
            </div>
            <p className="text-[11px] text-slate-500">Total Units in Stock</p>
            <p className="text-lg font-bold text-slate-800">{totalStock}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="mb-2 text-xs font-semibold text-slate-500">
            Filter by Category
          </p>
          <CategoryFilters active={activeCategory} onChange={setActiveCategory} />
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
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-slate-400">
                      <Search className="mx-auto mb-2 h-8 w-8 opacity-40" />
                      No products found
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-slate-50 transition hover:bg-slate-50/50"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-10 w-10 rounded-lg bg-slate-50 object-contain p-0.5"
                          />
                          <div>
                            <p className="font-medium text-slate-800">
                              {product.name}
                            </p>
                            {product.color && (
                              <p className="text-[11px] text-slate-400">
                                {product.color}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-slate-500">
                        {product.sku}
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-indigo-600">
                        {formatCurrency(product.price)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-sm font-semibold ${
                            product.stock <= 5
                              ? "text-orange-600"
                              : "text-emerald-600"
                          }`}
                        >
                          {product.stock}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
