import { X, CheckCircle2 } from "lucide-react";
import { type CartItem, formatCurrency, TAX_RATE } from "../../data/posData";

type PaymentMethod = "cash" | "card" | "mobile" | "bank";

const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  cash: "Cash",
  card: "Card",
  mobile: "Mobile Money",
  bank: "Bank Transfer",
};

interface SaleConfirmModalProps {
  open: boolean;
  cart: CartItem[];
  customerName: string;
  customerPhone: string;
  paymentMethod: PaymentMethod;
  amountReceived: number;
  staffName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function SaleConfirmModal({
  open,
  cart,
  customerName,
  customerPhone,
  paymentMethod,
  amountReceived,
  staffName,
  onClose,
  onConfirm,
}: SaleConfirmModalProps) {
  if (!open) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  const change = Math.max(0, amountReceived - total);
  const itemCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const displayCustomer = customerName.trim() || "Walk-in Customer";

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h3 className="text-base font-semibold text-slate-800">
              Confirm Sale Details
            </h3>
            <p className="text-xs text-slate-400">
              Please verify the information below is correct
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="mb-4 rounded-xl bg-slate-50 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Customer
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {displayCustomer}
            </p>
            {customerPhone.trim() && (
              <p className="text-xs text-slate-500">{customerPhone}</p>
            )}
            <p className="mt-2 text-[11px] text-slate-400">
              Staff: <span className="font-medium text-slate-600">{staffName}</span>
            </p>
          </div>

          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Items ({itemCount})
          </p>
          <div className="mb-4 max-h-40 space-y-2 overflow-y-auto">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2"
              >
                <div className="min-w-0 flex-1 pr-2">
                  <p className="truncate text-xs font-medium text-slate-800">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {formatCurrency(item.price)} × {item.quantity}
                  </p>
                </div>
                <p className="text-xs font-semibold text-indigo-600">
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-1.5 rounded-xl border border-slate-100 p-3 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Tax (15%)</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-2 font-semibold text-slate-800">
              <span>Total Payable</span>
              <span className="text-indigo-600">{formatCurrency(total)}</span>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg bg-indigo-50 p-2.5">
              <p className="text-[10px] text-indigo-500">Payment</p>
              <p className="font-semibold text-indigo-700">
                {PAYMENT_LABELS[paymentMethod]}
              </p>
            </div>
            <div className="rounded-lg bg-emerald-50 p-2.5">
              <p className="text-[10px] text-emerald-500">Change</p>
              <p className="font-semibold text-emerald-700">
                {formatCurrency(change)}
              </p>
            </div>
          </div>

          {paymentMethod === "cash" && (
            <div className="mt-2 rounded-lg bg-slate-50 p-2.5 text-xs">
              <span className="text-slate-500">Amount Received: </span>
              <span className="font-semibold text-slate-800">
                {formatCurrency(amountReceived)}
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-2 border-t border-slate-100 px-5 py-4">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Go Back
          </button>
          <button
            onClick={onConfirm}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-2.5 text-sm font-semibold text-white shadow-md transition hover:brightness-110"
          >
            <CheckCircle2 className="h-4 w-4" />
            Submit Sale
          </button>
        </div>
      </div>
    </div>
  );
}
