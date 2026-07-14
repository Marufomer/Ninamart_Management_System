import { useState, useMemo, useEffect } from "react";
import { ShoppingCart, X } from "lucide-react";
import StaffSidebar from "../../components/staff/StaffSidebar";
import StaffHeader from "../../components/staff/StaffHeader";
import CategoryFilters, { ProductGrid } from "../../components/staff/ProductGrid";
import RecentTransactions from "../../components/staff/RecentTransactions";
import CartPanel from "../../components/staff/CartPanel";
import PosFooter from "../../components/staff/PosFooter";
import { useIsMobile } from "../../hooks/useMediaQuery";
import {
  products,
  defaultCart,
  type Product,
  type CartItem,
  formatCurrency,
  TAX_RATE,
} from "../../data/posData";

export default function PosDashboard() {
  const isMobile = useIsMobile();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>(defaultCart);
  const [paymentMethod, setPaymentMethod] = useState<
    "cash" | "card" | "mobile" | "bank"
  >("cash");
  const [amountReceived, setAmountReceived] = useState(200000);

  useEffect(() => {
    if (!isMobile) setMobileMenuOpen(false);
  }, [isMobile]);

  useEffect(() => {
    const lockScroll = mobileMenuOpen || cartOpen;
    document.body.style.overflow = lockScroll ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen, cartOpen]);

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

  const handleMenuClick = () => {
    if (isMobile) {
      setMobileMenuOpen((prev) => !prev);
      setCartOpen(false);
    } else {
      setSidebarCollapsed((prev) => !prev);
    }
  };

  const cartPanelProps = {
    cart,
    paymentMethod,
    amountReceived,
    onPaymentMethodChange: setPaymentMethod,
    onAmountReceivedChange: setAmountReceived,
    onUpdateQty: updateQty,
    onRemove: removeItem,
    onClearAll: () => setCart([]),
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {cartOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setCartOpen(false)}
          aria-hidden="true"
        />
      )}

      <StaffSidebar
        collapsed={isMobile ? false : sidebarCollapsed}
        mobileOpen={mobileMenuOpen}
        isMobile={isMobile}
        onToggle={() =>
          isMobile ? setMobileMenuOpen(false) : setSidebarCollapsed((p) => !p)
        }
        onNavClick={() => setMobileMenuOpen(false)}
      />

      <div
        className={`flex min-h-screen min-w-0 flex-1 flex-col transition-all duration-300 ${
          isMobile ? "ml-0" : sidebarCollapsed ? "ml-[72px]" : "ml-[240px]"
        }`}
      >
        <StaffHeader
          onMenuClick={handleMenuClick}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          cartCount={cartItemCount}
          onCartClick={() => {
            setCartOpen((prev) => !prev);
            setMobileMenuOpen(false);
          }}
          showCartButton
        />

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
              <RecentTransactions />
            </div>
          </div>

          {/* Desktop cart sidebar */}
          <div className="hidden w-[320px] shrink-0 border-l border-slate-200 bg-slate-50 p-3 lg:block lg:w-[360px] lg:p-4">
            <CartPanel {...cartPanelProps} />
          </div>
        </div>

        <PosFooter />
      </div>

      {/* Mobile / tablet cart drawer */}
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

      {/* Floating cart button (mobile / tablet) */}
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
    </div>
  );
}
