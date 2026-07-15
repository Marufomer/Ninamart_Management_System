import { useState, useMemo } from "react";
import { UserCheck, Search, Plus, UserX, Trash2 } from "lucide-react";
import AdminPageShell from "../../components/admin/AdminPageShell";
import { adminStaffMembers, type AdminStaffMember } from "../../data/adminPagesData";
import { adminRoutes } from "../../data/adminRoutes";

export default function AdminStaff() {
  const [searchQuery, setSearchQuery] = useState("");
  const [staffList, setStaffList] = useState<AdminStaffMember[]>(adminStaffMembers);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("Sales Staff");
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredStaff = useMemo(() => {
    const q = searchQuery.toLowerCase();
    if (!q) return staffList;
    return staffList.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.role.toLowerCase().includes(q)
    );
  }, [staffList, searchQuery]);

  const toggleStatus = (id: string) => {
    setStaffList((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" }
          : s
      )
    );
  };

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const newStaff: AdminStaffMember = {
      id: String(staffList.length + 2),
      name: newName.trim(),
      email: newEmail.trim(),
      role: newRole,
      status: "Active",
      sales: "Br 0.00",
      avatar: `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 70)}`,
    };

    setStaffList((prev) => [...prev, newStaff]);
    setNewName("");
    setNewEmail("");
    setNewRole("Sales Staff");
    setShowAddForm(false);
  };

  const deleteStaff = (id: string) => {
    setStaffList((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <AdminPageShell
      title="Staff Management"
      description={adminRoutes.staff.description}
      action={
        <button
          onClick={() => setShowAddForm((prev) => !prev)}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:brightness-110 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          {showAddForm ? "Cancel" : "Add Staff"}
        </button>
      }
    >
      {showAddForm && (
        <form
          onSubmit={handleAddStaff}
          className="mb-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm max-w-xl space-y-4"
        >
          <h3 className="font-semibold text-slate-800 text-sm">Add New Staff Member</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="e.g. john@ninamart.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-600 mb-1">Role</label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
              >
                <option value="Sales Staff">Sales Staff</option>
                <option value="Cashier">Cashier</option>
                <option value="Inventory Manager">Inventory Manager</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 cursor-pointer"
          >
            Create Account
          </button>
        </form>
      )}

      <div className="mb-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search staff by name, email or role..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-700 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3">Staff Profile</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Sales Generated</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((staff) => (
                <tr
                  key={staff.id}
                  className="border-b border-slate-50 transition hover:bg-slate-50/50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={staff.avatar}
                        alt={staff.name}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-500/10"
                      />
                      <span className="font-medium text-slate-800">{staff.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{staff.email}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-lg bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600">
                      {staff.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-800">{staff.sales}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleStatus(staff.id)}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold cursor-pointer ${
                        staff.status === "Active"
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-amber-100 text-amber-600"
                      }`}
                    >
                      {staff.status}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => toggleStatus(staff.id)}
                        className="p-1 text-slate-400 hover:text-indigo-600 cursor-pointer"
                        title={staff.status === "Active" ? "Deactivate" : "Activate"}
                      >
                        {staff.status === "Active" ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => deleteStaff(staff.id)}
                        className="p-1 text-slate-400 hover:text-red-500 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
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
