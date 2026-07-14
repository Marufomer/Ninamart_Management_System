import {
  Trash2,
  Minus,
  Plus,
  Banknote,
  CreditCard,
  Smartphone,
  Building2,
  CheckCircle2,
  Pause,
  Printer,
} from "lucide-react";
import {
  type CartItem,
  TAX_RATE,
  formatCurrency,
} from "../../data/posData";
import {
  buildInvoiceFromCart,
  printInvoice,
} from "../../utils/printInvoice";

type PaymentMethod = "cash" | "card" | "mobile" | "bank";

const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  cash: "Cash",
  card: "Card",
  mobile: "Mobile Money",
  bank: "Bank Transfer",
};

interface CartPanelProps {
  cart: CartItem[];
  paymentMethod: PaymentMethod;
  amountReceived: number;
  customerName: string;
  customerPhone: string;
  staffName: string;
  onPaymentMethodChange: (m: PaymentMethod) => void;
  onAmountReceivedChange: (amount: number) => void;
  onCustomerNameChange: (name: string) => void;
  onCustomerPhoneChange: (phone: string) => void;
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onClearAll: () => void;
  onCompleteSale: () => void;
  onHoldSale: () => void;
  heldSalesCount?: number;
  embedded?: boolean;
}

const paymentMethods: { id: PaymentMethod; label: string; icon: React.ReactNode }[] = [
  { id: "cash", label: "Cash", icon: <Banknote className="h-5 w-5" /> },
  { id: "card", label: "Card", icon: <CreditCard className="h-5 w-5" /> },
  { id: "mobile", label: "Mobile", icon: <Smartphone className="h-5 w-5" /> },
  { id: "bank", label: "Bank", icon: <Building2 className="h-5 w-5" /> },
];

export default function CartPanel({
  cart,
  paymentMethod,
  amountReceived,
  customerName,
  customerPhone,
  staffName,
  onPaymentMethodChange,
  onAmountReceivedChange,
  onCustomerNameChange,
  onCustomerPhoneChange,
  onUpdateQty,
  onRemove,
  onClearAll,
  onCompleteSale,
  onHoldSale,
  heldSalesCount = 0,
  embedded = false,
}: CartPanelProps) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 0;
  const tax = subtotal * TAX_RATE;
  const total = subtotal - discount + tax;
  const change = Math.max(0, amountReceived - total);
  const canComplete = cart.length > 0 && (paymentMethod !== "cash" || amountReceived >= total);

  const handlePrintInvoice = () => {
    if (cart.length === 0) return;
    printInvoice(
      buildInvoiceFromCart({
        cart,
        customerName,
        customerPhone,
        staff: staffName,
        paymentMethod: PAYMENT_LABELS[paymentMethod],
        amountReceived,
        discount,
      })
    );
  };

  return (
    <div
      className={`flex flex-col rounded-xl border border-slate-100 bg-white shadow-sm ${
        embedded ? "" : "h-full"
      }`}
    >
      {!embedded && (
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <h3 className="text-sm font-semibold text-slate-800">
            Current Sale ({cart.length})
          </h3>
          {cart.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-xs font-medium text-red-500 hover:underline"
            >
              Clear All
            </button>
          )}
        </div>
      )}

      {embedded && cart.length > 0 && (
        <div className="mb-3 flex justify-end px-1">
          <button
            onClick={onClearAll}
            className="text-xs font-medium text-red-500 hover:underline"
          >
            Clear All
          </button>
        </div>
      )}

      <div className={`overflow-y-auto px-4 py-2 ${embedded ? "max-h-[35vh] sm:max-h-[40vh]" : "flex-1"}`}>
        {cart.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-400">
            No items in cart
          </p>
        ) : (
          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-2.5 rounded-lg border border-slate-50 p-2"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-12 w-12 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-slate-800">
                    {item.name}
                  </p>
                  <p className="truncate text-[10px] text-slate-400">
                    {item.sku}
                    {item.color ? ` · ${item.color}` : ""}
                  </p>
                  <p className="text-xs font-bold text-indigo-600">
                    {formatCurrency(item.price)}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="flex items-center rounded-lg border border-slate-200">
                      <button
                        onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-slate-500 hover:bg-slate-50"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="min-w-[1.5rem] px-1 text-center text-xs font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-slate-500 hover:bg-slate-50"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-red-400 hover:text-red-600"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-slate-100 px-4 py-3">
        <div className="mb-3 space-y-2">
          <p className="text-[11px] font-semibold text-slate-600">Customer</p>
          <div>
            <label className="mb-1 block text-[11px] font-medium text-slate-600">
              Customer Name
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => onCustomerNameChange(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              placeholder="Enter customer name"
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-medium text-slate-600">
              Phone Number
            </label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => onCustomerPhoneChange(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              placeholder="09XX XXX XXXX"
            />
          </div>
        </div>

        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-red-500">
            <span>Discount</span>
            <span>{formatCurrency(discount)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Tax (15%)</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          <div className="flex justify-between border-t border-slate-100 pt-2">
            <span className="font-semibold text-slate-800">Total Payable</span>
            <span className="text-base font-bold text-indigo-600 sm:text-lg">
              {formatCurrency(total)}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <p className="mb-2 text-[11px] font-semibold text-slate-600">
            Payment Method
          </p>
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
            {paymentMethods.map((pm) => (
              <button
                key={pm.id}
                onClick={() => onPaymentMethodChange(pm.id)}
                className={`flex flex-col items-center gap-1 rounded-xl border py-2 text-[9px] font-medium transition sm:py-2.5 sm:text-[10px] ${
                  paymentMethod === pm.id
                    ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                    : "border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                {pm.icon}
                {pm.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <div>
            <label className="mb-1 block text-[11px] font-medium text-slate-600">
              Amount Received
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                Br
              </span>
              <input
                type="number"
                value={amountReceived || ""}
                onChange={(e) => onAmountReceivedChange(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm font-semibold text-slate-800 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-emerald-50 px-3 py-2">
            <span className="text-xs font-medium text-emerald-700">Change</span>
            <span className="text-base font-bold text-emerald-600">
              {formatCurrency(change)}
            </span>
          </div>
        </div>

        <button
          onClick={onCompleteSale}
          disabled={!canComplete}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CheckCircle2 className="h-4 w-4" />
          Complete Sale
        </button>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            onClick={onHoldSale}
            disabled={cart.length === 0}
            className="relative flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Pause className="h-3.5 w-3.5" />
            Hold Sale
            {heldSalesCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-white">
                {heldSalesCount}
              </span>
            )}
          </button>
          <button
            onClick={handlePrintInvoice}
            disabled={cart.length === 0}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Printer className="h-3.5 w-3.5" />
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
