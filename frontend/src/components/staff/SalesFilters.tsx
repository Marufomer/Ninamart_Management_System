import { Calendar, User, Search } from "lucide-react";

export interface SalesFilterValues {
  dateRange: string;
  paymentMethod: string;
  status: string;
  customer: string;
  invoice: string;
}

interface SalesFiltersProps {
  filters: SalesFilterValues;
  onChange: (filters: SalesFilterValues) => void;
  onFilter: () => void;
  onReset: () => void;
}

export const defaultSalesFilters: SalesFilterValues = {
  dateRange: "",
  paymentMethod: "All Methods",
  status: "All Status",
  customer: "",
  invoice: "",
};

export default function SalesFilters({
  filters,
  onChange,
  onFilter,
  onReset,
}: SalesFiltersProps) {
  const update = (key: keyof SalesFilterValues, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:items-end">
        <div>
          <label className="mb-1.5 block text-[11px] font-medium text-slate-500">
            Date Range
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={filters.dateRange}
              onChange={(e) => update("dateRange", e.target.value)}
              placeholder="Select date range"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-700 placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-[11px] font-medium text-slate-500">
            Payment Method
          </label>
          <select
            value={filters.paymentMethod}
            onChange={(e) => update("paymentMethod", e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-3 pr-8 text-xs text-slate-700 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            <option>All Methods</option>
            <option>Cash</option>
            <option>Card</option>
            <option>Mobile Money</option>
            <option>Bank Transfer</option>
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-[11px] font-medium text-slate-500">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => update("status", e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-3 pr-8 text-xs text-slate-700 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            <option>All Status</option>
            <option>Paid</option>
            <option>Returned</option>
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-[11px] font-medium text-slate-500">
            Customer
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={filters.customer}
              onChange={(e) => update("customer", e.target.value)}
              placeholder="Search customer"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-700 placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-[11px] font-medium text-slate-500">
            Invoice #
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={filters.invoice}
              onChange={(e) => update("invoice", e.target.value)}
              placeholder="Search invoice"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-700 placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        <div className="flex gap-2 sm:col-span-2 lg:col-span-1 xl:col-span-1">
          <button
            onClick={onFilter}
            className="flex-1 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:brightness-110"
          >
            Filter
          </button>
          <button
            onClick={onReset}
            className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
