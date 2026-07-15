import { useState, useMemo } from "react";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import AdminPageShell from "../../components/admin/AdminPageShell";
import {
  returnRequests,
  formatCurrency,
  type ReturnRequest,
  type ReturnStatus,
} from "../../data/staffReturnsData";
import { adminRoutes } from "../../data/adminRoutes";

const statusStyles: Record<
  ReturnStatus,
  { bg: string; text: string; icon: typeof Clock }
> = {
  Pending: { bg: "bg-amber-50", text: "text-amber-700", icon: Clock },
  Approved: { bg: "bg-emerald-50", text: "text-emerald-700", icon: CheckCircle },
  Rejected: { bg: "bg-red-50", text: "text-red-700", icon: XCircle },
};

export default function AdminReturns() {
  const [searchQuery, setSearchQuery] = useState("");
  const [requests, setRequests] = useState<ReturnRequest[]>(returnRequests);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    if (!q) return requests;
    return requests.filter(
      (r) =>
        r.id.toLowerCase().includes(q) ||
        r.invoice.toLowerCase().includes(q) ||
        r.product.toLowerCase().includes(q) ||
        r.customer.toLowerCase().includes(q)
    );
  }, [requests, searchQuery]);

  const updateStatus = (id: string, status: ReturnStatus) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  return (
    <AdminPageShell
      title="Returns"
      description={adminRoutes.returns.description}
    >
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search return requests..."
        className="mb-4 w-full max-w-md rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
      />

      <div className="space-y-3">
        {filtered.map((request) => {
          const style = statusStyles[request.status];
          const StatusIcon = style.icon;
          return (
            <div
              key={request.id}
              className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800">{request.id}</span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${style.bg} ${style.text}`}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {request.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">
                    {request.product} — {request.invoice}
                  </p>
                  <p className="text-xs text-slate-400">
                    {request.customer} · {request.reason} · {request.date}
                  </p>
                </div>
                {request.status === "Pending" && (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => updateStatus(request.id, "Approved")}
                      className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => updateStatus(request.id, "Rejected")}
                      className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                    >
                      Reject
                    </button>
                  </div>
                )}
                {request.amount > 0 && (
                  <p className="text-sm font-semibold text-slate-700">
                    {formatCurrency(request.amount)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </AdminPageShell>
  );
}
