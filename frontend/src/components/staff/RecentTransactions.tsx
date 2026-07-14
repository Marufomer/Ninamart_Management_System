import { recentTransactions } from "../../data/posData";

export default function RecentTransactions() {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-800">
          Recent Transactions
        </h3>
        <a
          href="#"
          className="shrink-0 text-xs font-medium text-indigo-600 hover:underline"
        >
          View All Sales
        </a>
      </div>

      {/* Mobile card layout */}
      <div className="space-y-2.5 md:hidden">
        {recentTransactions.map((tx) => (
          <div
            key={tx.invoice}
            className="rounded-lg border border-slate-100 p-3"
          >
            <div className="mb-2 flex items-start justify-between gap-2">
              <span className="text-[11px] font-medium text-indigo-600">
                {tx.invoice}
              </span>
              <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                {tx.status}
              </span>
            </div>
            <p className="text-xs font-medium text-slate-700">{tx.customer}</p>
            <p className="mt-0.5 text-[11px] text-slate-500">{tx.items}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">{tx.total}</span>
              <span className="text-[11px] text-slate-400">{tx.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[600px] text-left">
          <thead>
            <tr className="border-b border-slate-100">
              {["Invoice", "Customer", "Items", "Total", "Time", "Status"].map(
                (col) => (
                  <th
                    key={col}
                    className="pb-2 pr-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400"
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map((tx) => (
              <tr
                key={tx.invoice}
                className="border-b border-slate-50 hover:bg-slate-50/50"
              >
                <td className="py-2 pr-3 text-[11px] font-medium text-indigo-600">
                  {tx.invoice}
                </td>
                <td className="py-2 pr-3 text-[11px] text-slate-600">
                  {tx.customer}
                </td>
                <td className="py-2 pr-3 text-[11px] text-slate-600">
                  {tx.items}
                </td>
                <td className="py-2 pr-3 text-[11px] font-semibold text-slate-800">
                  {tx.total}
                </td>
                <td className="py-2 pr-3 text-[11px] text-slate-500">
                  {tx.time}
                </td>
                <td className="py-2">
                  <span className="inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
