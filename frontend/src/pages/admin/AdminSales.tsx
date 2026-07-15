import { useState, useMemo } from "react";
import { Search, Eye, Printer, CalendarDays } from "lucide-react";
import AdminPageShell from "../../components/admin/AdminPageShell";
import { salesTransactions } from "../../data/salesHistoryData";
import { adminRoutes } from "../../data/adminRoutes";
import { printInvoice, previewInvoice, buildInvoiceFromTransaction } from "../../utils/printInvoice";
import { formatCurrency } from "../../data/posData";

type DateFilterType = "today" | "previous" | "custom";

const paymentStyles: Record<string, string> = {
  Cash: "bg-emerald-50 text-emerald-700",
  Card: "bg-purple-50 text-purple-700",
  "Mobile Money": "bg-orange-50 text-orange-700",
  "Bank Transfer": "bg-blue-50 text-blue-700",
};

export default function AdminSales() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<DateFilterType>("today");
  const [customDate, setCustomDate] = useState("");

  // Helper to format HTML date picker value (YYYY-MM-DD) to mock transaction format (DD MMM YYYY)
  const formatInputDate = (dateStr: string): string => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, "0");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const filtered = useMemo(() => {
    return salesTransactions.filter((tx) => {
      // 1. Search Query filter
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        tx.invoice.toLowerCase().includes(q) ||
        tx.customer.toLowerCase().includes(q) ||
        tx.items.toLowerCase().includes(q) ||
        tx.soldBy.toLowerCase().includes(q);

      if (!matchSearch) return false;

      // 2. Date Filter
      // Today is "14 Jul 2026" based on the activity logs / context
      const todayStr = "14 Jul 2026";
      const isToday = tx.dateTime.startsWith(todayStr);

      if (dateFilter === "today") {
        return isToday;
      } else if (dateFilter === "previous") {
        return !isToday;
      } else if (dateFilter === "custom") {
        const targetDate = formatInputDate(customDate);
        return !targetDate || tx.dateTime.startsWith(targetDate);
      }

      return true;
    });
  }, [searchQuery, dateFilter, customDate]);

  const totalRevenue = useMemo(() => {
    return filtered.reduce((sum, tx) => sum + tx.totalAmount, 0);
  }, [filtered]);

  const handlePrint = (tx: typeof salesTransactions[0]) => {
    printInvoice(buildInvoiceFromTransaction(tx));
  };

  const handleView = (tx: typeof salesTransactions[0]) => {
    previewInvoice(buildInvoiceFromTransaction(tx));
  };

  return (
    <AdminPageShell
      title="Sales Transactions"
      description={adminRoutes.sales.description}
      action={
        <div className="rounded-xl border border-slate-100 bg-white px-4 py-2 shadow-sm text-right">
          <p className="text-[10px] text-slate-500 font-medium">Filtered Sales Total</p>
          <p className="text-base font-bold text-indigo-600">
            {formatCurrency(totalRevenue)}
          </p>
        </div>
      }
    >
      {/* Filters and Search Bar */}
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search invoice, customer, items or staff..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm focus:border-indigo-300 focus:outline-none"
          />
        </div>

        {/* Date Filter Tabs */}
        <div className="flex gap-2">
          {(["today", "previous", "custom"] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setDateFilter(filter)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                dateFilter === filter
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {filter === "today" ? "Current (Today)" : filter === "previous" ? "Previous Sales" : "Custom Date"}
            </button>
          ))}
        </div>

        {/* Custom Date Input */}
        {dateFilter === "custom" && (
          <div className="relative flex items-center">
            <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-450" />
            <input
              type="date"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white py-1.5 pl-10 pr-3 text-xs text-slate-700 focus:border-indigo-350 focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* Sales Transactions Table */}
      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-55/80 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3">Invoice No</th>
                <th className="px-4 py-3">Date & Time</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Items Sold</th>
                <th className="px-4 py-3">Total Value</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Sold By</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-slate-405">
                    <Search className="mx-auto mb-2 h-8 w-8 opacity-30" />
                    No sales matching the filter criteria found
                  </td>
                </tr>
              ) : (
                filtered.map((tx) => (
                  <tr
                    key={tx.invoice}
                    className="border-b border-slate-50 text-slate-750 transition hover:bg-slate-50/50"
                  >
                    <td className="px-4 py-3 font-semibold text-indigo-650">{tx.invoice}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">{tx.dateTime}</td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-slate-800">{tx.customer}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{tx.phone}</p>
                    </td>
                    <td className="px-4 py-3 text-xs max-w-[200px] truncate" title={tx.items}>
                      {tx.items}
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-800">{formatCurrency(tx.totalAmount)}</td>
                    <td className="px-4 py-3 text-xs">
                      <span className={`rounded-full px-2 py-0.5 font-semibold ${paymentStyles[tx.paymentMethod] || "bg-slate-100 text-slate-600"}`}>
                        {tx.paymentMethod}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-650">{tx.soldBy}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${tx.status === "Paid" ? "bg-emerald-100 text-emerald-650" : "bg-red-105 text-red-600"}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => handleView(tx)}
                          className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-650 cursor-pointer"
                          title="View Invoice"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handlePrint(tx)}
                          className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-655 cursor-pointer"
                          title="Print Invoice"
                        >
                          <Printer className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminPageShell>
  );
}
