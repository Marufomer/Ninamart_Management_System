import { useState } from "react";
import {
  Eye,
  Printer,
  MoreVertical,
  Banknote,
  CreditCard,
  Smartphone,
  Building2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { formatCurrency } from "../../data/posData";
import type { SalesTransaction } from "../../data/salesHistoryData";
import {
  buildInvoiceFromTransaction,
  printInvoice,
  previewInvoice,
} from "../../utils/printInvoice";

const paymentStyles: Record<
  string,
  { bg: string; text: string; icon: React.ReactNode }
> = {
  Cash: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    icon: <Banknote className="h-3 w-3" />,
  },
  Card: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    icon: <CreditCard className="h-3 w-3" />,
  },
  "Mobile Money": {
    bg: "bg-orange-50",
    text: "text-orange-700",
    icon: <Smartphone className="h-3 w-3" />,
  },
  "Bank Transfer": {
    bg: "bg-blue-50",
    text: "text-blue-700",
    icon: <Building2 className="h-3 w-3" />,
  },
};

const statusStyles: Record<string, string> = {
  Paid: "bg-emerald-100 text-emerald-700",
  Returned: "bg-red-100 text-red-700",
};

interface SalesTransactionsTableProps {
  transactions: SalesTransaction[];
}

export default function SalesTransactionsTable({
  transactions,
}: SalesTransactionsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalEntries = transactions.length;
  const totalPages = Math.ceil(totalEntries / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalEntries);
  const paginatedData = transactions.slice(startIndex, endIndex);

  const handlePrint = (tx: SalesTransaction) => {
    printInvoice(buildInvoiceFromTransaction(tx));
  };

  const handleView = (tx: SalesTransaction) => {
    previewInvoice(buildInvoiceFromTransaction(tx));
  };

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-800 sm:mb-4">
        Sales Transactions ({totalEntries})
      </h3>

      {/* Mobile card layout */}
      <div className="space-y-2.5 lg:hidden">
        {paginatedData.map((tx) => (
          <div
            key={tx.invoice}
            className="rounded-lg border border-slate-100 p-3"
          >
            <div className="mb-2 flex items-start justify-between gap-2">
              <span className="text-[11px] font-medium text-indigo-600">
                {tx.invoice}
              </span>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusStyles[tx.status]}`}
              >
                {tx.status}
              </span>
            </div>
            <p className="text-xs font-medium text-slate-700">{tx.customer}</p>
            <p className="text-[10px] text-slate-400">{tx.phone}</p>
            <p className="mt-1 text-[11px] text-slate-500">{tx.items}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                {formatCurrency(tx.totalAmount)}
              </span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${paymentStyles[tx.paymentMethod].bg} ${paymentStyles[tx.paymentMethod].text}`}
              >
                {paymentStyles[tx.paymentMethod].icon}
                {tx.paymentMethod}
              </span>
            </div>
            <p className="mt-1 text-[10px] text-slate-400">{tx.dateTime}</p>
            <div className="mt-2 flex items-center gap-1 border-t border-slate-50 pt-2">
              <button
                onClick={() => handleView(tx)}
                className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="View invoice"
              >
                <Eye className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => handlePrint(tx)}
                className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Print invoice"
              >
                <Printer className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[900px] text-left">
          <thead>
            <tr className="border-b border-slate-100">
              {[
                "Invoice No",
                "Date & Time",
                "Customer",
                "Items",
                "Total Amount",
                "Payment Method",
                "Sold By",
                "Status",
                "Action",
              ].map((col) => (
                <th
                  key={col}
                  className="pb-2.5 pr-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((tx) => (
              <tr
                key={tx.invoice}
                className="border-b border-slate-50 hover:bg-slate-50/50"
              >
                <td className="py-2.5 pr-3 text-[11px] font-medium text-indigo-600">
                  {tx.invoice}
                </td>
                <td className="py-2.5 pr-3 text-[11px] text-slate-500">
                  {tx.dateTime}
                </td>
                <td className="py-2.5 pr-3">
                  <p className="text-[11px] font-medium text-slate-700">
                    {tx.customer}
                  </p>
                  <p className="text-[10px] text-slate-400">{tx.phone}</p>
                </td>
                <td className="max-w-[180px] py-2.5 pr-3 text-[11px] text-slate-600">
                  {tx.items}
                </td>
                <td className="py-2.5 pr-3 text-[11px] font-semibold text-slate-800">
                  {formatCurrency(tx.totalAmount)}
                </td>
                <td className="py-2.5 pr-3">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${paymentStyles[tx.paymentMethod].bg} ${paymentStyles[tx.paymentMethod].text}`}
                  >
                    {paymentStyles[tx.paymentMethod].icon}
                    {tx.paymentMethod}
                  </span>
                </td>
                <td className="py-2.5 pr-3 text-[11px] text-slate-600">
                  {tx.soldBy}
                </td>
                <td className="py-2.5 pr-3">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusStyles[tx.status]}`}
                  >
                    {tx.status}
                  </span>
                </td>
                <td className="py-2.5">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleView(tx)}
                      className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                      aria-label="View invoice"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handlePrint(tx)}
                      className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                      aria-label="Print invoice"
                    >
                      <Printer className="h-3.5 w-3.5" />
                    </button>
                    <button
                      className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                      aria-label="More options"
                    >
                      <MoreVertical className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-3 sm:flex-row">
        <p className="text-[11px] text-slate-500">
          Showing {startIndex + 1} to {endIndex} of {totalEntries} entries
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Back
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`flex h-7 w-7 items-center justify-center rounded-lg text-[11px] font-medium transition ${
                currentPage === page
                  ? "bg-indigo-600 text-white"
                  : "border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Forward
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="rounded-lg border border-slate-200 bg-white py-1.5 pl-2 pr-6 text-[11px] text-slate-600 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
            <option value={50}>50 / page</option>
          </select>
        </div>
      </div>
    </div>
  );
}
