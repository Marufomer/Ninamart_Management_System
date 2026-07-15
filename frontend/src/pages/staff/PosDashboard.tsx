import { useState, useMemo, useEffect, useCallback } from "react";
import { ShoppingCart, X, RotateCcw } from "lucide-react";
import StaffHeader from "../../components/staff/StaffHeader";
import CategoryFilters, { ProductGrid } from "../../components/staff/ProductGrid";
import RecentTransactions from "../../components/staff/RecentTransactions";
import CartPanel from "../../components/staff/CartPanel";
import PosFooter from "../../components/staff/PosFooter";
import SaleConfirmModal from "../../components/staff/SaleConfirmModal";
import SaleLoadingModal from "../../components/staff/SaleLoadingModal";
import SaleSuccessModal from "../../components/staff/SaleSuccessModal";
import { useIsMobile } from "../../hooks/useMediaQuery";
import { useAuth } from "../../context/AuthContext";
import { useStaffLayout } from "../../context/StaffLayoutContext";
import {
  products,
  defaultCart,
  recentTransactions as initialTransactions,
  type Product,
  type CartItem,
  type RecentTransaction,
  formatCurrency,
  TAX_RATE,
} from "../../data/posData";
import {
  buildInvoiceFromCart,
  printInvoice,
  type InvoiceData,
} from "../../utils/printInvoice";
import {
  pushAdminNotif,
  broadcastStaffNotif,
  LOW_STOCK_THRESHOLD,
} from "../../utils/notificationStorage";

interface HeldSale {
  id: string;
  cart: CartItem[];
  paymentMethod: "cash" | "card" | "mobile" | "bank";
  amountReceived: number;
  customerName: string;
  customerPhone: string;
  heldAt: string;
}

export default function PosDashboard() {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const { handleMenuClick, closeMobileMenu } = useStaffLayout();
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>(defaultCart);
  const [paymentMethod, setPaymentMethod] = useState<
    "cash" | "card" | "mobile" | "bank"
  >("cash");
  const [amountReceived, setAmountReceived] = useState(200000);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [transactions, setTransactions] =
    useState<RecentTransaction[]>(initialTransactions);
  const [heldSales, setHeldSales] = useState<HeldSale[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [completedInvoice, setCompletedInvoice] = useState<InvoiceData | null>(
    null
  );
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const lockScroll = cartOpen || showConfirm;
    document.body.style.overflow = lockScroll ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, showConfirm]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory =
        activeCategory === "All" || p.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const cartItemCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartSubtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartTotal = cartSubtotal + cartSubtotal * TAX_RATE;

  const resetSaleForm = useCallback(() => {
    setCart([]);
    setCustomerName("");
    setCustomerPhone("");
    setPaymentMethod("cash");
    setAmountReceived(0);
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    if (isMobile) setCartOpen(true);
  };

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.id !== id));
    } else {
      setCart((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
      );
    }
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const onMenuClick = () => {
    if (isMobile) setCartOpen(false);
    handleMenuClick();
  };

  const handleCompleteSaleClick = () => {
    if (cart.length === 0) return;
    const total = cartSubtotal + cartSubtotal * TAX_RATE;
    if (paymentMethod === "cash" && amountReceived < total) return;
    setShowConfirm(true);
    if (isMobile) setCartOpen(false);
  };

  const handleConfirmSale = () => {
    setShowConfirm(false);
    setShowLoading(true);
  };

  const handleSaleProcessed = useCallback(() => {
    const invoice = buildInvoiceFromCart({
      cart,
      customerName,
      customerPhone,
      staff: user?.name ?? "Staff",
      paymentMethod:
        paymentMethod === "cash"
          ? "Cash"
          : paymentMethod === "card"
            ? "Card"
            : paymentMethod === "mobile"
              ? "Mobile Money"
              : "Bank Transfer",
      amountReceived:
        paymentMethod === "cash" ? amountReceived : cartSubtotal + cartSubtotal * TAX_RATE,
    });

    const itemsSummary = cart
      .map((item) => `${item.name} x ${item.quantity}`)
      .join(", ");

    const newTransaction: RecentTransaction = {
      invoice: invoice.invoiceNo,
      customer: invoice.customer,
      items: itemsSummary,
      total: formatCurrency(invoice.total),
      time: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      status: "Paid",
    };

    setTransactions((prev) => [newTransaction, ...prev]);
    setCompletedInvoice(invoice);
    setShowLoading(false);
    setShowSuccess(true);
    printInvoice(invoice);
    resetSaleForm();
    setCartOpen(false);

    // ── Notify Admin of new sale ──────────────────────────────────────────
    const itemsSummaryShort = cart
      .slice(0, 2)
      .map((i) => `${i.name} x${i.quantity}`)
      .join(", ") + (cart.length > 2 ? ` +${cart.length - 2} more` : "");

    pushAdminNotif({
      type: "order",
      title: `New sale by ${user?.name ?? "Staff"}`,
      message: `${invoice.invoiceNo} · ${itemsSummaryShort} · Total: ${formatCurrency(invoice.total)} (${invoice.paymentMethod})`,
    });

    // ── Check for low stock after sale and broadcast to all staff ─────────
    cart.forEach((soldItem) => {
      const product = products.find((p) => p.id === soldItem.id);
      if (!product) return;
      const remainingStock = product.stock - soldItem.quantity;
      if (remainingStock <= LOW_STOCK_THRESHOLD && remainingStock >= 0) {
        // Alert Admin
        pushAdminNotif({
          type: "stock",
          title: `Low stock: ${product.name}`,
          message: `After sale by ${user?.name ?? "Staff"}, only ${remainingStock} unit${remainingStock !== 1 ? "s" : ""} of ${product.name} remain. Please restock soon.`,
        });
        // Alert All Staff
        broadcastStaffNotif({
          type: "stock",
          title: `Low stock alert: ${product.name}`,
          message: `${product.name} is now at ${remainingStock} unit${remainingStock !== 1 ? "s" : ""}. Inform customers of possible delays.`,
        });
      }
    });
  }, [
    cart,
    customerName,
    customerPhone,
    user?.name,
    paymentMethod,
    amountReceived,
    cartSubtotal,
    resetSaleForm,
  ]);

  const handleHoldSale = () => {
    if (cart.length === 0) return;

    const heldSale: HeldSale = {
      id: `HOLD-${Date.now()}`,
      cart: [...cart],
      paymentMethod,
      amountReceived,
      customerName,
      customerPhone,
      heldAt: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };

    setHeldSales((prev) => [heldSale, ...prev]);
    resetSaleForm();
    setCartOpen(false);
    setToast("Sale held successfully. You can restore it below.");
  };

  const restoreHeldSale = (held: HeldSale) => {
    setCart(held.cart);
    setPaymentMethod(held.paymentMethod);
    setAmountReceived(held.amountReceived);
    setCustomerName(held.customerName);
    setCustomerPhone(held.customerPhone);
    setHeldSales((prev) => prev.filter((s) => s.id !== held.id));
    setToast("Held sale restored to cart.");
    if (isMobile) setCartOpen(true);
  };

  const cartPanelProps = {
    cart,
    paymentMethod,
    amountReceived,
    customerName,
    customerPhone,
    staffName: user?.name ?? "Staff",
    onPaymentMethodChange: setPaymentMethod,
    onAmountReceivedChange: setAmountReceived,
    onCustomerNameChange: setCustomerName,
    onCustomerPhoneChange: setCustomerPhone,
    onUpdateQty: updateQty,
    onRemove: removeItem,
    onClearAll: () => setCart([]),
    onCompleteSale: handleCompleteSaleClick,
    onHoldSale: handleHoldSale,
    heldSalesCount: heldSales.length,
  };

  return (
    <>
      {cartOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setCartOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <StaffHeader
          onMenuClick={onMenuClick}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          cartCount={cartItemCount}
          onCartClick={() => {
            setCartOpen((prev) => !prev);
            closeMobileMenu();
          }}
          showCartButton
        />

        {heldSales.length > 0 && (
          <div className="border-b border-amber-100 bg-amber-50 px-3 py-2 sm:px-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-amber-700">
                Held Sales ({heldSales.length})
              </span>
              {heldSales.map((held) => (
                <button
                  key={held.id}
                  onClick={() => restoreHeldSale(held)}
                  className="flex items-center gap-1 rounded-lg border border-amber-200 bg-white px-2.5 py-1 text-[11px] font-medium text-amber-800 transition hover:bg-amber-100"
                >
                  <RotateCcw className="h-3 w-3" />
                  Restore · {held.heldAt} ({held.cart.length} items)
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-1 overflow-hidden">
          <div className="flex min-w-0 flex-1 flex-col overflow-y-auto p-3 pb-20 sm:p-4 lg:pb-4">
            <div className="mb-3">
              <p className="mb-2 text-xs font-semibold text-slate-500">
                Quick Product Search
              </p>
              <CategoryFilters
                active={activeCategory}
                onChange={setActiveCategory}
              />
            </div>

            <ProductGrid products={filteredProducts} onAddToCart={addToCart} />

            <div className="mt-4 shrink-0">
              <RecentTransactions transactions={transactions} />
            </div>
          </div>

          <div className="hidden w-[320px] shrink-0 border-l border-slate-200 bg-slate-50 p-3 lg:block lg:w-[360px] lg:p-4">
            <CartPanel {...cartPanelProps} />
          </div>
        </div>

        <PosFooter />
      </div>

      <div
        className={`fixed bottom-0 left-0 right-0 z-50 flex max-h-[92vh] flex-col rounded-t-2xl bg-slate-50 shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          cartOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
          <h3 className="text-sm font-semibold text-slate-800">
            Current Sale ({cart.length})
          </h3>
          <button
            onClick={() => setCartOpen(false)}
            className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4">
          <CartPanel {...cartPanelProps} embedded />
        </div>
      </div>

      {!cartOpen && cart.length > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-300/40 transition hover:brightness-110 active:scale-95 lg:hidden"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>
            {cartItemCount} items · {formatCurrency(cartTotal)}
          </span>
        </button>
      )}

      <SaleConfirmModal
        open={showConfirm}
        cart={cart}
        customerName={customerName}
        customerPhone={customerPhone}
        paymentMethod={paymentMethod}
        amountReceived={amountReceived}
        staffName={user?.name ?? "Staff"}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmSale}
      />

      <SaleLoadingModal
        open={showLoading}
        onComplete={handleSaleProcessed}
      />

      <SaleSuccessModal
        open={showSuccess}
        invoiceNo={completedInvoice?.invoiceNo ?? ""}
        total={
          completedInvoice ? formatCurrency(completedInvoice.total) : ""
        }
        onClose={() => {
          setShowSuccess(false);
          setCompletedInvoice(null);
        }}
      />

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[95] -translate-x-1/2 rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}
    </>
  );
}
