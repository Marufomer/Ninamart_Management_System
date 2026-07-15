import { useState } from "react";
import { Database, Plus, RefreshCw, Download, CheckCircle } from "lucide-react";
import AdminPageShell from "../../components/admin/AdminPageShell";
import { adminRoutes } from "../../data/adminRoutes";

interface BackupItem {
  id: string;
  filename: string;
  size: string;
  date: string;
  status: "Completed" | "Failed";
}

export default function AdminBackup() {
  const [backups, setBackups] = useState<BackupItem[]>([
    { id: "1", filename: "backup_ninamart_2026-07-14_120000.sql", size: "12.4 MB", date: "Today, 12:00 PM", status: "Completed" },
    { id: "2", filename: "backup_ninamart_2026-07-13_120000.sql", size: "12.3 MB", date: "Yesterday, 12:00 PM", status: "Completed" },
    { id: "3", filename: "backup_ninamart_2026-07-12_120000.sql", size: "12.1 MB", date: "12 Jul 2026, 12:00 PM", status: "Completed" },
  ]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleCreateBackup = () => {
    setLoading(true);
    setTimeout(() => {
      const now = new Date();
      const dateString = now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      const newBackup: BackupItem = {
        id: String(backups.length + 1),
        filename: `backup_ninamart_manual_${now.toISOString().split("T")[0]}.sql`,
        size: "12.5 MB",
        date: `${dateString}, ${timeString}`,
        status: "Completed",
      };

      setBackups((prev) => [newBackup, ...prev]);
      setLoading(false);
      setMessage("Database backup created successfully.");
      setTimeout(() => setMessage(null), 3000);
    }, 1500);
  };

  const handleRestore = (filename: string) => {
    setMessage(`Successfully restored database from ${filename}`);
    setTimeout(() => setMessage(null), 4000);
  };

  return (
    <AdminPageShell
      title="System Backup"
      description={adminRoutes.backup.description}
      action={
        <button
          onClick={handleCreateBackup}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:brightness-110 disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          Create Backup
        </button>
      }
    >
      {message && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3.5 text-xs font-semibold text-emerald-800">
          <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
          <span>{message}</span>
        </div>
      )}

      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm space-y-4">
        <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
          <Database className="h-5 w-5 text-indigo-500" />
          Available Backups
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                <th className="pb-3">Backup File Name</th>
                <th className="pb-3">Size</th>
                <th className="pb-3">Created At</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {backups.map((b) => (
                <tr key={b.id} className="border-b border-slate-50 last:border-b-0 text-slate-700 hover:bg-slate-50/30">
                  <td className="py-3 font-semibold text-slate-800">{b.filename}</td>
                  <td className="py-3 text-slate-600">{b.size}</td>
                  <td className="py-3 text-slate-500">{b.date}</td>
                  <td className="py-3">
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => handleRestore(b.filename)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-650 hover:text-indigo-850 cursor-pointer"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                        Restore
                      </button>
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-700"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download
                      </a>
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
