import { Shield, Users, Check, Lock } from "lucide-react";
import AdminPageShell from "../../components/admin/AdminPageShell";
import { adminRoles } from "../../data/adminPagesData";
import { adminRoutes } from "../../data/adminRoutes";

export default function AdminRoles() {
  return (
    <AdminPageShell
      title="Roles & Permissions"
      description={adminRoutes.roles.description}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {adminRoles.map((role) => (
          <div
            key={role.id}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Shield className="h-5 w-5" />
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
                  <Users className="h-3 w-3" />
                  {role.users} active
                </span>
              </div>
              <h3 className="font-bold text-slate-800 text-base">{role.name}</h3>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Permissions
              </p>
              <div className="mt-2 space-y-1.5">
                {role.permissions.split(", ").map((perm, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                    <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>{perm}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Lock className="h-3 w-3" />
                {role.id === "1" ? "System Locked" : "Editable"}
              </span>
              <button
                disabled={role.id === "1"}
                className={`font-semibold cursor-pointer ${
                  role.id === "1"
                    ? "text-slate-300 cursor-not-allowed"
                    : "text-indigo-600 hover:text-indigo-800"
                }`}
              >
                Manage Permissions
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminPageShell>
  );
}
