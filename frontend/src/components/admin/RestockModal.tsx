import { useState, useEffect } from "react";
import { X, CheckCircle, AlertTriangle, ShieldAlert } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { products } from "../../data/posData";
import { suppliers, inventoryTransactions } from "../../data/inventoryTransactions";
import { adminActivityLogs } from "../../data/adminPagesData";

interface RestockModalProps {
  open: boolean;
  productId: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function RestockModal({
  open,
  productId,
  onClose,
  onSuccess,
}: RestockModalProps) {
  const { user } = useAuth();
  const product = products.find((p) => p.id === productId);

  const [supplier, setSupplier] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [invoice, setInvoice] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Default date to today's date in YYYY-MM-DD
  useEffect(() => {
    if (open) {
      const today = new Date().toISOString().split("T")[0];
      setDate(today);
      // Reset state
      setSupplier("");
      setQty("");
      setPrice("");
      setInvoice("");
      setNotes("");
      setError(null);
      setSuccess(null);
    }
  }, [open]);

  if (!open) return null;

  // Role validation simulation: Enforce Admin check
  if (!user || user.role !== "admin") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl text-center">
          <ShieldAlert className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-lg font-bold text-slate-800">403 - Access Denied</h3>
          <p className="mt-2 text-sm text-slate-500">
            Only administrators are authorized to access restock operations.
          </p>
          <button
            onClick={onClose}
            className="mt-5 rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validate fields
    if (!supplier) {
      setError("Please select a supplier.");
      return;
    }
    const quantity = parseInt(qty, 10);
    if (isNaN(quantity) || quantity <= 0) {
      setError("Quantity received must be a positive integer greater than 0.");
      return;
    }
    const purchasePrice = parseFloat(price);
    if (isNaN(purchasePrice) || purchasePrice <= 0) {
      setError("Purchase price must be a positive number greater than 0.");
      return;
    }
    if (!invoice.trim()) {
      setError("Please enter the supplier invoice number.");
      return;
    }
    if (!date) {
      setError("Please select a purchase date.");
      return;
    }

    const prevStock = product.stock;
    const currentStock = prevStock + quantity;

    // Mutate the product stock count
    product.stock = currentStock;

    // Create transaction log
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const transaction = {
      id: `TX-${Date.now().toString().slice(-4)}`,
      productId: product.id,
      productName: product.name,
      prevStock,
      qtyAdded: quantity,
      currentStock,
      supplier,
      purchasePrice,
      invoiceNumber: invoice.trim(),
      adminName: user.name,
      date,
      time: timeStr,
      notes: notes.trim() || undefined,
    };

    inventoryTransactions.unshift(transaction);

    // Create activity log
    adminActivityLogs.unshift({
      id: String(adminActivityLogs.length + 1),
      user: user.name,
      action: `restocked ${quantity} units of ${product.name} (Inv: ${invoice.trim()})`,
      time: "Just now",
      type: "system",
    });

    setSuccess("Inventory restocked successfully!");
    onSuccess?.();

    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl transition-all sm:p-6 my-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <h3 className="text-base font-bold text-slate-800 sm:text-lg">Restock Product</h3>
        <p className="mt-1 text-xs text-slate-400">Increase inventory stock levels securely.</p>

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-55/70 p-3 text-xs font-semibold text-red-750">
            <AlertTriangle className="h-4 w-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-800">
            <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Product Name</label>
              <input
                type="text"
                readOnly
                value={product.name}
                className="w-full rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Current Stock</label>
              <input
                type="text"
                readOnly
                value={product.stock}
                className="w-full rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Supplier *</label>
              <select
                required
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-55 px-3 py-2 text-xs text-slate-700 focus:border-indigo-350 focus:bg-white focus:outline-none"
              >
                <option value="">Select Supplier</option>
                {suppliers.map((sup) => (
                  <option key={sup} value={sup}>
                    {sup}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Supplier Invoice # *</label>
              <input
                type="text"
                required
                value={invoice}
                onChange={(e) => setInvoice(e.target.value)}
                placeholder="e.g. INV-2026-990"
                className="w-full rounded-xl border border-slate-200 bg-slate-55 px-3 py-2 text-xs text-slate-700 focus:border-indigo-355 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Quantity Received *</label>
              <input
                type="number"
                required
                min="1"
                step="1"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                placeholder="e.g. 10"
                className="w-full rounded-xl border border-slate-200 bg-slate-55 px-3 py-2 text-xs text-slate-700 focus:border-indigo-355 focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Purchase Price (Br) *</label>
              <input
                type="number"
                required
                min="0.01"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 45000"
                className="w-full rounded-xl border border-slate-200 bg-slate-55 px-3 py-2 text-xs text-slate-700 focus:border-indigo-355 focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Purchase Date *</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-55 px-3 py-2 text-xs text-slate-700 focus:border-indigo-355 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Optional Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add additional purchase or delivery comments..."
              rows={2}
              className="w-full rounded-xl border border-slate-200 bg-slate-55 p-3 text-xs text-slate-700 focus:border-indigo-355 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:brightness-110 cursor-pointer"
            >
              Confirm Restock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
