import { staffPerformance } from "../../data/mockData";

const statusColors: Record<string, string> = {
  Excellent: "bg-emerald-100 text-emerald-700",
  "Very Good": "bg-blue-100 text-blue-700",
  Good: "bg-indigo-100 text-indigo-700",
  Average: "bg-orange-100 text-orange-700",
};

const barColors: Record<string, string> = {
  Excellent: "bg-emerald-500",
  "Very Good": "bg-blue-500",
  Good: "bg-indigo-500",
  Average: "bg-orange-500",
};

export default function StaffPerformance() {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:p-5">
      <h3 className="mb-3 text-sm font-semibold text-slate-800 sm:mb-4">
        Staff Performance
      </h3>

      {/* Mobile card view */}
      <div className="space-y-3 md:hidden">
        {staffPerformance.map((staff) => (
          <div
            key={staff.name}
            className="rounded-lg border border-slate-100 p-3"
          >
            <div className="flex items-center gap-3">
              <img
                src={staff.avatar}
                alt={staff.name}
                className="h-10 w-10 rounded-full"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-700">
                  {staff.name}
                </p>
                <p className="text-xs font-semibold text-slate-800">{staff.sales}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColors[staff.status]}`}
              >
                {staff.status}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px]">
              <div>
                <p className="text-slate-400">Orders</p>
                <p className="font-semibold text-slate-700">{staff.orders}</p>
              </div>
              <div>
                <p className="text-slate-400">Items</p>
                <p className="font-semibold text-slate-700">{staff.items}</p>
              </div>
              <div>
                <p className="text-slate-400">Returns</p>
                <p className="font-semibold text-slate-700">{staff.returns}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${barColors[staff.status]}`}
                  style={{ width: `${staff.performance}%` }}
                />
              </div>
              <span className="text-[10px] font-semibold text-slate-600">
                {staff.performance}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table view */}
      <div className="-mx-3 hidden overflow-x-auto px-3 sm:-mx-5 sm:px-5 md:block">
        <table className="w-full min-w-[600px] text-left">
          <thead>
            <tr className="border-b border-slate-100">
              {["Staff", "Sales", "Orders", "Items", "Returns", "Performance", "Status"].map(
                (col) => (
                  <th
                    key={col}
                    className="whitespace-nowrap pb-2 pr-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400"
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {staffPerformance.map((staff) => (
              <tr
                key={staff.name}
                className="border-b border-slate-50 transition hover:bg-slate-50/50"
              >
                <td className="py-3 pr-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={staff.avatar}
                      alt={staff.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="whitespace-nowrap text-xs font-medium text-slate-700">
                      {staff.name}
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap py-3 pr-3 text-xs font-semibold text-slate-800">
                  {staff.sales}
                </td>
                <td className="whitespace-nowrap py-3 pr-3 text-xs text-slate-600">
                  {staff.orders}
                </td>
                <td className="whitespace-nowrap py-3 pr-3 text-xs text-slate-600">
                  {staff.items}
                </td>
                <td className="whitespace-nowrap py-3 pr-3 text-xs text-slate-600">
                  {staff.returns}
                </td>
                <td className="py-3 pr-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${barColors[staff.status]}`}
                        style={{ width: `${staff.performance}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-600">
                      {staff.performance}%
                    </span>
                  </div>
                </td>
                <td className="py-3">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColors[staff.status]}`}
                  >
                    {staff.status}
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
