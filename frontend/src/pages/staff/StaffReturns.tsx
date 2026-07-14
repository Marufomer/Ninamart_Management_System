import { useState, useMemo } from "react";
import { RotateCcw, Clock, CheckCircle, XCircle, Plus } from "lucide-react";
import StaffHeader from "../../components/staff/StaffHeader";
import { useStaffLayout } from "../../context/StaffLayoutContext";
import {
  returnRequests,
  returnReasons,
  formatCurrency,
  type ReturnRequest,
  type ReturnStatus,
} from "../../data/staffReturnsData";

const statusStyles: Record<
  ReturnStatus,
  { bg: string; text: string; icon: typeof Clock }
> = {
  Pending: { bg: "bg-amber-50", text: "text-amber-700", icon: Clock },
  Approved: { bg: "bg-emerald-50", text: "text-emerald-700", icon: CheckCircle },
  Rejected: { bg: "bg-red-50", text: "text-red-700", icon: XCircle },
};

export default function StaffReturns() {
  const { handleMenuClick } = useStaffLayout();
  const [searchQuery, setSearchQuery] = useState("");
  const [requests, setRequests] = useState<ReturnRequest[]>(returnRequests);
  const [showForm, setShowForm] = useState(false);
  const [invoice, setInvoice] = useState("");
  const [product, setProduct] = useState("");
  const [reason, setReason] = useState(returnReasons[0]);
  const [notes, setNotes] = useState("");

  const filteredRequests = useMemo(() => {
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

  const pendingCount = requests.filter((r) => r.status === "Pending").length;
  const approvedCount = requests.filter((r) => r.status === "Approved").length;
  const rejectedCount = requests.filter((r) => r.status === "Rejected").length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invoice.trim() || !product.trim()) return;

    const newRequest: ReturnRequest = {
      id: `RET-${String(requests.length + 45).padStart(4, "0")}`,
      invoice: invoice.trim(),
      product: product.trim(),
      customer: "Walk-in Customer",
      reason,
      amount: 0,
      date: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      status: "Pending",
    };

    setRequests((prev) => [newRequest, ...prev]);
    setInvoice("");
    setProduct("");
    setReason(returnReasons[0]);
    setNotes("");
    setShowForm(false);
  };

  return (
    <div className="flex min-h-screen min-w-0 flex-1 flex-col">
      <StaffHeader
        onMenuClick={handleMenuClick}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        title="Returns (Request)"
        titleShort="Returns"
        searchPlaceholder="Search returns by ID, invoice or product..."
        showScanIcon={false}
      />

      <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          <div className="mb-4 grid grid-cols-3 gap-3">
            {(
              [
                { label: "Pending", count: pendingCount, style: statusStyles.Pending },
                { label: "Approved", count: approvedCount, style: statusStyles.Approved },
                { label: "Rejected", count: rejectedCount, style: statusStyles.Rejected },
              ] as const
            ).map(({ label, count, style }) => {
              const Icon = style.icon;
              return (
                <div
                  key={label}
                  className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:p-4"
                >
                  <div
                    className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg ${style.bg} ${style.text}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-[11px] text-slate-500">{label}</p>
                  <p className="text-lg font-bold text-slate-800">{count}</p>
                </div>
              );
            })}
          </div>

          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-700">
              Return Requests
            </h3>
            <button
              onClick={() => setShowForm((prev) => !prev)}
              className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:brightness-110"
            >
              <Plus className="h-3.5 w-3.5" />
              New Request
            </button>
          </div>

          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="mb-4 rounded-xl border border-indigo-100 bg-white p-4 shadow-sm"
            >
              <h4 className="mb-3 text-sm font-semibold text-slate-800">
                Submit Return Request
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[11px] font-medium text-slate-500">
                    Invoice Number
                  </label>
                  <input
                    type="text"
                    value={invoice}
                    onChange={(e) => setInvoice(e.target.value)}
                    placeholder="e.g. INV-2024-0847"
                    required
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-medium text-slate-500">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    placeholder="e.g. iPhone 15 Pro Max"
                    required
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-medium text-slate-500">
                    Reason
                  </label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value as typeof reason)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  >
                    {returnReasons.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-medium text-slate-500">
                    Additional Notes
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Optional details..."
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
                >
                  Submit Request
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-4 py-3">Return ID</th>
                    <th className="px-4 py-3">Invoice</th>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Reason</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-12 text-center text-slate-400">
                        <RotateCcw className="mx-auto mb-2 h-8 w-8 opacity-40" />
                        No return requests found
                      </td>
                    </tr>
                  ) : (
                    filteredRequests.map((request) => {
                      const style = statusStyles[request.status];
                      const StatusIcon = style.icon;
                      return (
                        <tr
                          key={request.id}
                          className="border-b border-slate-50 transition hover:bg-slate-50/50"
                        >
                          <td className="px-4 py-3 font-mono text-xs font-semibold text-indigo-600">
                            {request.id}
                          </td>
                          <td className="px-4 py-3 font-mono text-xs text-slate-500">
                            {request.invoice}
                          </td>
                          <td className="px-4 py-3 font-medium text-slate-800">
                            {request.product}
                          </td>
                          <td className="px-4 py-3 text-slate-600">
                            {request.customer}
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-500">
                            {request.reason}
                          </td>
                          <td className="px-4 py-3 font-semibold text-slate-700">
                            {request.amount > 0
                              ? formatCurrency(request.amount)
                              : "—"}
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-400">
                            {request.date}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${style.bg} ${style.text}`}
                            >
                              <StatusIcon className="h-3 w-3" />
                              {request.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </div>
  );
}
