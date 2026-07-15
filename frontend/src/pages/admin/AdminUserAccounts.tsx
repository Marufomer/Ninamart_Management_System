import { useState } from "react";
import { UserCheck, Search, Key, Shield, UserX, AlertCircle } from "lucide-react";
import AdminPageShell from "../../components/admin/AdminPageShell";
import { adminUserAccounts } from "../../data/adminPagesData";
import { adminRoutes } from "../../data/adminRoutes";

export default function AdminUserAccounts() {
  const [users, setUsers] = useState(adminUserAccounts);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" }
          : u
      )
    );
  };

  const handleResetPassword = (name: string) => {
    setMessage(`Password reset link sent to ${name}'s email.`);
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <AdminPageShell
      title="User Accounts"
      description={adminRoutes.userAccounts.description}
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search accounts..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-700 focus:border-indigo-300 focus:outline-none"
          />
        </div>
      </div>

      {message && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-indigo-50 p-3 text-xs font-semibold text-indigo-750">
          <AlertCircle className="h-4 w-4 shrink-0 text-indigo-500" />
          <span>{message}</span>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                <th className="px-4 py-3">Account User</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Account Status</th>
                <th className="px-4 py-3 text-right">Settings</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-slate-50 transition hover:bg-slate-50/50"
                >
                  <td className="px-4 py-3 font-semibold text-slate-800">{u.name}</td>
                  <td className="px-4 py-3 text-slate-650">{u.email}</td>
                  <td className="px-4 py-3 text-slate-600">
                    <span className="flex items-center gap-1.5 text-xs">
                      <Shield className="h-3.5 w-3.5 text-slate-400" />
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                        u.status === "Active"
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => handleResetPassword(u.name)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-650 hover:text-indigo-850 cursor-pointer"
                      >
                        <Key className="h-3.5 w-3.5" />
                        Reset Pass
                      </button>
                      <button
                        onClick={() => toggleStatus(u.id)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-red-500 cursor-pointer"
                      >
                        {u.status === "Active" ? <UserX className="h-3.5 w-3.5" /> : <UserCheck className="h-3.5 w-3.5" />}
                        {u.status === "Active" ? "Suspend" : "Activate"}
                      </button>
                    </div>
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
