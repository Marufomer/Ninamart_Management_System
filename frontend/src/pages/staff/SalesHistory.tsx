import { useState, useMemo } from "react";
import StaffHeader from "../../components/staff/StaffHeader";
import SalesHistoryStats from "../../components/staff/SalesHistoryStats";
import SalesFilters, {
  defaultSalesFilters,
  type SalesFilterValues,
} from "../../components/staff/SalesFilters";
import SalesTransactionsTable from "../../components/staff/SalesTransactionsTable";
import SalesSummaryPanel from "../../components/staff/SalesSummaryPanel";
import { useStaffLayout } from "../../context/StaffLayoutContext";
import { salesTransactions } from "../../data/salesHistoryData";

export default function SalesHistory() {
  const { handleMenuClick } = useStaffLayout();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<SalesFilterValues>(defaultSalesFilters);
  const [appliedFilters, setAppliedFilters] =
    useState<SalesFilterValues>(defaultSalesFilters);

  const filteredTransactions = useMemo(() => {
    return salesTransactions.filter((tx) => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        tx.invoice.toLowerCase().includes(q) ||
        tx.customer.toLowerCase().includes(q) ||
        tx.items.toLowerCase().includes(q) ||
        tx.phone.includes(q);

      const matchPayment =
        appliedFilters.paymentMethod === "All Methods" ||
        tx.paymentMethod === appliedFilters.paymentMethod;

      const matchStatus =
        appliedFilters.status === "All Status" ||
        tx.status === appliedFilters.status;

      const matchCustomer =
        !appliedFilters.customer ||
        tx.customer
          .toLowerCase()
          .includes(appliedFilters.customer.toLowerCase());

      const matchInvoice =
        !appliedFilters.invoice ||
        tx.invoice
          .toLowerCase()
          .includes(appliedFilters.invoice.toLowerCase());

      return (
        matchSearch &&
        matchPayment &&
        matchStatus &&
        matchCustomer &&
        matchInvoice
      );
    });
  }, [searchQuery, appliedFilters]);

  return (
    <div className="flex min-h-screen min-w-0 flex-1 flex-col">
      <StaffHeader
        onMenuClick={handleMenuClick}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        title="Sales History"
        titleShort="Sales"
        searchPlaceholder="Search invoices, customers, products..."
      />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex min-w-0 flex-1 flex-col overflow-y-auto p-3 sm:p-4">
          <div className="mb-4">
            <SalesHistoryStats />
          </div>

          <div className="mb-4">
            <SalesFilters
              filters={filters}
              onChange={setFilters}
              onFilter={() => setAppliedFilters({ ...filters })}
              onReset={() => {
                setFilters(defaultSalesFilters);
                setAppliedFilters(defaultSalesFilters);
              }}
            />
          </div>

          <SalesTransactionsTable transactions={filteredTransactions} />
        </div>

        <div className="hidden w-[320px] shrink-0 overflow-y-auto border-l border-slate-200 bg-slate-50 p-3 lg:block lg:w-[360px] lg:p-4">
          <SalesSummaryPanel />
        </div>
      </div>
    </div>
  );
}
