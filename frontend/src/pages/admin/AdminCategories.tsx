import { useState, useMemo } from "react";
import { Grid3X3, Plus } from "lucide-react";
import AdminPageShell from "../../components/admin/AdminPageShell";
import { adminCategories } from "../../data/adminPagesData";
import { adminRoutes } from "../../data/adminRoutes";

export default function AdminCategories() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState(adminCategories);
  const [newName, setNewName] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    if (!q) return categories;
    return categories.filter((c) => c.name.toLowerCase().includes(q));
  }, [categories, searchQuery]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setCategories((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        name: newName.trim(),
        products: 0,
        status: "Active" as const,
      },
    ]);
    setNewName("");
    setMessage("Category added successfully");
    setTimeout(() => setMessage(null), 2500);
  };

  return (
    <AdminPageShell
      title="Categories"
      description={adminRoutes.categories.description}
      action={
        <span className="inline-flex items-center gap-2 rounded-xl bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600">
          <Grid3X3 className="h-4 w-4" />
          {categories.length} categories
        </span>
      }
    >
      <form onSubmit={handleAdd} className="mb-4 flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New category name..."
          className="w-full max-w-xs rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </button>
      </form>
      {message && <p className="mb-4 text-sm text-emerald-600">{message}</p>}

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search categories..."
        className="mb-4 w-full max-w-md rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((cat) => (
          <div
            key={cat.id}
            className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-slate-800">{cat.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{cat.products} products</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600">
                {cat.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </AdminPageShell>
  );
}
