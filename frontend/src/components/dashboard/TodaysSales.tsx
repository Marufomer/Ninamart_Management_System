import { todaysSales } from "../../data/mockData";

const statusStyles: Record<string, string> = {
  Paid: "bg-emerald-100 text-emerald-700",
  Cash: "bg-orange-100 text-orange-700",
};

export default function TodaysSales() {
  const totalSales = "Br 82,450";

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:p-5">
      <h3 className="mb-3 text-sm font-semibold text-slate-800 sm:mb-4">
        Today&apos;s Sales
      </h3>

      {/* Mobile card view */}
      <div className="space-y-3 md:hidden">
        {todaysSales.map((sale) => (
          <div
            key={sale.invoice}
            className="rounded-lg border border-slate-100 p-3 transition hover:bg-slate-50/50"
          >
            <div className="mb-2 flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-semibold text-indigo-600">{sale.invoice}</p>
                <p className="text-xs text-slate-600">{sale.customer}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusStyles[sale.status]}`}
              >
                {sale.status}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-800">{sale.product}</p>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
              <span>Qty: {sale.qty}</span>
              <span>{sale.staff}</span>
              <span>{sale.time}</span>
              <span className="font-bold text-slate-800">{sale.total}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table view */}
      <div className="-mx-3 hidden overflow-x-auto px-3 sm:-mx-5 sm:px-5 md:block">
        <table className="w-full min-w-[640px] text-left">
          <thead>
            <tr className="border-b border-slate-100">
              {["Invoice", "Customer", "Product", "Qty", "Total", "Staff", "Time", "Status"].map(
                (col) => (
                  <th
                    key={col}
                    className="whitespace-nowrap pb-2 pr-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400"
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {todaysSales.map((sale) => (
              <tr
                key={sale.invoice}
                className="border-b border-slate-50 transition hover:bg-slate-50/50"
              >
                <td className="whitespace-nowrap py-2.5 pr-2 text-xs font-medium text-indigo-600">
                  {sale.invoice}
                </td>
                <td className="whitespace-nowrap py-2.5 pr-2 text-xs text-slate-600">
                  {sale.customer}
                </td>
                <td className="py-2.5 pr-2 text-xs text-slate-700">{sale.product}</td>
                <td className="whitespace-nowrap py-2.5 pr-2 text-xs text-slate-600">
                  {sale.qty}
                </td>
                <td className="whitespace-nowrap py-2.5 pr-2 text-xs font-semibold text-slate-800">
                  {sale.total}
                </td>
                <td className="whitespace-nowrap py-2.5 pr-2 text-xs text-slate-600">
                  {sale.staff}
                </td>
                <td className="whitespace-nowrap py-2.5 pr-2 text-xs text-slate-500">
                  {sale.time}
                </td>
                <td className="py-2.5">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusStyles[sale.status]}`}
                  >
                    {sale.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
        <span className="text-xs font-medium text-slate-500">Total Sales</span>
        <span className="text-sm font-bold text-indigo-600">{totalSales}</span>
      </div>
    </div>
  );
}
