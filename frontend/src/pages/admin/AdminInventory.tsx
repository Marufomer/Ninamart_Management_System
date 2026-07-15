import { useState, useMemo } from "react";
import { AlertTriangle, Package, RefreshCw, Search, History, ShieldAlert, User } from "lucide-react";
import AdminPageShell from "../../components/admin/AdminPageShell";
import { useAuth } from "../../context/AuthContext";
import { products, formatCurrency } from "../../data/posData";
import { inventoryTransactions } from "../../data/inventoryTransactions";
import { adminRoutes } from "../../data/adminRoutes";
import RestockModal from "../../components/admin/RestockModal";

export default function AdminInventory() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"inventory" | "history">("inventory");

  // Stock levels state
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "low" | "out">("all");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // History filtering state
  const [historySearch, setHistorySearch] = useState("");
  const [historySupplierFilter, setHistorySupplierFilter] = useState("");

  // Role validation: Enforce Admin check
  if (!user || user.role !== "admin") {
    return (
      <div className="flex h-[75vh] flex-col items-center justify-center text-center p-6">
        <div className="rounded-full bg-red-50 p-4 text-red-550 mb-4 animate-bounce">
          <ShieldAlert className="h-14 w-14" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">403 - Forbidden</h1>
        <p className="mt-2 text-sm text-slate-500 max-w-md">
          Role validation failed. You do not have permissions to access inventory management or make stock adjustments.
        </p>
      </div>
    );
  }

  // Handle restock success callback
  const handleRestockSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  // Dynamic KPI Calculations
  const inStockCount = products.filter((p) => p.stock > 5).length;
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;
  const totalStockCount = products.reduce((sum, p) => sum + p.stock, 0);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q);
      const matchFilter =
        filter === "all" ||
        (filter === "low" && p.stock > 0 && p.stock <= 5) ||
        (filter === "out" && p.stock === 0);
      return matchSearch && matchFilter;
    });
  }, [searchQuery, filter, refreshTrigger]);

  // Filtered transactions list
  const filteredTransactions = useMemo(() => {
    return inventoryTransactions.filter((tx) => {
      const q = historySearch.toLowerCase();
      const matchSearch =
        !q ||
        tx.productName.toLowerCase().includes(q) ||
        tx.invoiceNumber.toLowerCase().includes(q) ||
        tx.id.toLowerCase().includes(q);
      const matchSupplier =
        !historySupplierFilter ||
        tx.supplier === historySupplierFilter;
      return matchSearch && matchSupplier;
    });
  }, [historySearch, historySupplierFilter, refreshTrigger]);

  // Extract unique suppliers from transactions for the filter dropdown
  const uniqueSuppliers = useMemo(() => {
    return Array.from(new Set(inventoryTransactions.map((tx) => tx.supplier)));
  }, [refreshTrigger]);

  return (
    <AdminPageShell
      title="Inventory Management"
      description={adminRoutes.inventory.description}
    >
      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200 mb-5">
        <button
          onClick={() => setActiveTab("inventory")}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition cursor-pointer ${
            activeTab === "inventory"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <Package className="h-4 w-4" />
          Stock Levels
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition cursor-pointer ${
            activeTab === "history"
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <History className="h-4 w-4" />
          Restock History
        </button>
      </div>

      {activeTab === "inventory" ? (
        <>
          {/* Inventory Stats Row */}
          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
              <div className="mb-2 h-2.5 w-8 rounded-full bg-emerald-500" />
              <p className="text-[11px] text-slate-550 font-medium">In Stock Items</p>
              <p className="text-lg font-bold text-slate-800">{inStockCount}</p>
            </div>
            <button
              onClick={() => setFilter("low")}
              className="rounded-xl border border-slate-100 bg-white p-4 text-left shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <div className="mb-2 h-2.5 w-8 rounded-full bg-amber-500" />
              <p className="text-[11px] text-slate-550 font-medium">Low Stock Items</p>
              <p className="text-lg font-bold text-slate-800">{lowStockCount}</p>
            </button>
            <button
              onClick={() => setFilter("out")}
              className="rounded-xl border border-slate-100 bg-white p-4 text-left shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <div className="mb-2 h-2.5 w-8 rounded-full bg-red-500" />
              <p className="text-[11px] text-slate-550 font-medium">Out of Stock</p>
              <p className="text-lg font-bold text-slate-800">{outOfStockCount}</p>
            </button>
            <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
              <div className="mb-2 flex h-4 items-center text-indigo-650">
                <Package className="h-4.5 w-4.5" />
              </div>
              <p className="text-[11px] text-slate-550 font-medium">Total Units Stocked</p>
              <p className="text-lg font-bold text-slate-800">{totalStockCount.toLocaleString()}</p>
            </div>
          </div>

          {/* Filters & Actions */}
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stock list by product name or SKU..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm focus:border-indigo-300 focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              {(["all", "low", "out"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                    filter === f
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 text-slate-650 hover:bg-slate-200"
                  }`}
                >
                  {f === "all" ? "All" : f === "low" ? "Low Stock" : "Out of Stock"}
                </button>
              ))}
            </div>
          </div>

          {/* Current Stock Levels Table */}
          <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-55/80 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">SKU</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Available Stock</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-12 text-center text-slate-405">
                        <Search className="mx-auto mb-2 h-8 w-8 opacity-30" />
                        No inventory matches found
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
                              className="h-10 w-10 rounded-lg object-cover ring-1 ring-slate-100"
                            />
                            <span className="font-semibold text-slate-800">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-slate-500">{product.sku}</td>
                        <td className="px-4 py-3 font-medium text-slate-700">{formatCurrency(product.price)}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-1 font-bold ${
                              product.stock <= 5 ? "text-red-500" : "text-slate-700"
                            }`}
                          >
                            {product.stock <= 5 && <AlertTriangle className="h-3.5 w-3.5" />}
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedProductId(product.id);
                              setShowRestockModal(true);
                            }}
                            className="inline-flex items-center gap-1 rounded-lg border border-indigo-200 px-3 py-1.5 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50 cursor-pointer"
                          >
                            <RefreshCw className="h-3 w-3" />
                            Restock
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* History Page filtering */}
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
                placeholder="Search history by product name, invoice, or ID..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm focus:border-indigo-300 focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <select
                  value={historySupplierFilter}
                  onChange={(e) => setHistorySupplierFilter(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-indigo-350 focus:outline-none"
                >
                  <option value="">All Suppliers</option>
                  {uniqueSuppliers.map((sup) => (
                    <option key={sup} value={sup}>
                      {sup}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Restock History Table */}
          <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-55/80 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-4 py-3">Tx ID</th>
                    <th className="px-4 py-3">Product Name</th>
                    <th className="px-4 py-3">Supplier</th>
                    <th className="px-4 py-3">Qty Added</th>
                    <th className="px-4 py-3">Stock Changes</th>
                    <th className="px-4 py-3">Purchase Price</th>
                    <th className="px-4 py-3">Total Value</th>
                    <th className="px-4 py-3">Invoice #</th>
                    <th className="px-4 py-3">Authorized By</th>
                    <th className="px-4 py-3">Date & Time</th>
                    <th className="px-4 py-3">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.length === 0 ? (
                    <tr>
                      <td colSpan={11} className="px-4 py-12 text-center text-slate-405">
                        <History className="mx-auto mb-2 h-8 w-8 opacity-30" />
                        No stock adjustment records found
                      </td>
                    </tr>
                  ) : (
                    filteredTransactions.map((tx) => (
                      <tr
                        key={tx.id}
                        className="border-b border-slate-50 text-slate-750 transition hover:bg-slate-50/50"
                      >
                        <td className="px-4 py-3 font-semibold text-indigo-650">{tx.id}</td>
                        <td className="px-4 py-3 font-semibold text-slate-800">{tx.productName}</td>
                        <td className="px-4 py-3">{tx.supplier}</td>
                        <td className="px-4 py-3 font-bold text-emerald-650">+{tx.qtyAdded}</td>
                        <td className="px-4 py-3 text-xs text-slate-500">
                          {tx.prevStock} → <span className="font-semibold text-slate-700">{tx.currentStock}</span>
                        </td>
                        <td className="px-4 py-3 font-medium text-slate-750">{formatCurrency(tx.purchasePrice)}</td>
                        <td className="px-4 py-3 font-bold text-slate-800">
                          {formatCurrency(tx.purchasePrice * tx.qtyAdded)}
                        </td>
                        <td className="px-4 py-3 font-mono text-xs">{tx.invoiceNumber}</td>
                        <td className="px-4 py-3">
                          <span className="flex items-center gap-1 text-xs">
                            <User className="h-3.5 w-3.5 text-slate-400" />
                            {tx.adminName}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-500 text-xs">
                          {tx.date} <span className="text-slate-400">{tx.time}</span>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-500 max-w-[150px] truncate" title={tx.notes}>
                          {tx.notes || "-"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {selectedProductId && (
        <RestockModal
          open={showRestockModal}
          productId={selectedProductId}
          onClose={() => {
            setShowRestockModal(false);
            setSelectedProductId(null);
          }}
          onSuccess={handleRestockSuccess}
        />
      )}
    </AdminPageShell>
  );
}
