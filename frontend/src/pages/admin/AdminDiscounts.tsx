import { useState, useMemo } from "react";
import { Percent, Plus } from "lucide-react";
import AdminPageShell from "../../components/admin/AdminPageShell";
import { adminDiscounts } from "../../data/adminPagesData";
import { adminRoutes } from "../../data/adminRoutes";

export default function AdminDiscounts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [discounts, setDiscounts] = useState(adminDiscounts);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    if (!q) return discounts;
    return discounts.filter(
      (d) =>
        d.name.toLowerCase().includes(q) || d.code.toLowerCase().includes(q)
    );
  }, [discounts, searchQuery]);

  const toggleStatus = (id: string) => {
    setDiscounts((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: d.status === "Active" ? "Expired" : "Active" }
          : d
      )
    );
  };

  return (
    <AdminPageShell
      title="Discounts"
      description={adminRoutes.discounts.description}
      action={
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white"
        >
          <Plus className="h-4 w-4" />
          New Discount
        </button>
      }
    >
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search discounts..."
        className="mb-4 w-full max-w-md rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((discount) => (
          <div
            key={discount.id}
            className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
          >
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                <Percent className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">{discount.name}</h3>
                <p className="text-xs text-slate-400">Code: {discount.code}</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-indigo-600">{discount.discount}</p>
            <p className="mt-1 text-xs text-slate-500">Expires: {discount.expires}</p>
            <button
              type="button"
              onClick={() => toggleStatus(discount.id)}
              className={`mt-3 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                discount.status === "Active"
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {discount.status}
            </button>
          </div>
        ))}
      </div>
    </AdminPageShell>
  );
}
