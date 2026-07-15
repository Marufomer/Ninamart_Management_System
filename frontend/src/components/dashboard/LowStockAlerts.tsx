import { useState, useMemo } from "react";
import { AlertTriangle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { products } from "../../data/posData";
import RestockModal from "../admin/RestockModal";

export default function LowStockAlerts() {
  const { user } = useAuth();
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Dynamically compute low stock products (re-runs when refreshTrigger updates)
  const lowStockList = useMemo(() => products.filter((p) => p.stock <= 5), [refreshTrigger]);

  const handleOpenRestock = (productId: string) => {
    setSelectedProductId(productId);
    setShowModal(true);
  };

  const handleRestockSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <>
      <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:p-5">
        <div className="mb-3 flex items-center gap-2 sm:mb-4">
          <AlertTriangle className="h-4 w-4 text-orange-500" />
          <h3 className="text-sm font-semibold text-slate-800">Low Stock Alerts</h3>
        </div>
        <div className="space-y-2 sm:space-y-3">
          {lowStockList.length === 0 ? (
            <p className="text-xs text-slate-450 py-4 text-center">No low stock alerts</p>
          ) : (
            lowStockList.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-2 rounded-lg border border-slate-50 p-2 transition hover:bg-slate-50 sm:gap-3"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-9 w-9 shrink-0 rounded-lg object-cover sm:h-10 sm:w-10"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-slate-700">
                    {product.name}
                  </p>
                  <p className="text-[11px] font-semibold text-red-500">
                    Remaining: {product.stock}
                  </p>
                </div>
                {/* Admin-only restock trigger */}
                {user?.role === "admin" && (
                  <button
                    onClick={() => handleOpenRestock(product.id)}
                    className="shrink-0 rounded-lg border border-indigo-200 px-2 py-1 text-[10px] font-semibold text-indigo-600 transition hover:bg-indigo-50 cursor-pointer sm:px-2.5"
                  >
                    Restock
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {selectedProductId && (
        <RestockModal
          open={showModal}
          productId={selectedProductId}
          onClose={() => {
            setShowModal(false);
            setSelectedProductId(null);
          }}
          onSuccess={handleRestockSuccess}
        />
      )}
    </>
  );
}
