import { categories, type Product, formatCurrency } from "../../data/posData";

interface CategoryFiltersProps {
  active: string;
  onChange: (cat: string) => void;
}

export default function CategoryFilters({ active, onChange }: CategoryFiltersProps) {
  return (
    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-thin sm:flex-wrap sm:overflow-visible">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition sm:px-4 ${
            active === cat
              ? "bg-indigo-600 text-white shadow-sm"
              : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:text-indigo-600"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-slate-400">
        No products found
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {products.map((product) => (
        <button
          key={product.id}
          onClick={() => onAddToCart(product)}
          className="group rounded-xl border border-slate-100 bg-white p-2.5 text-left shadow-sm transition hover:border-indigo-200 hover:shadow-md active:scale-[0.98] sm:p-3"
        >
          <div className="mb-2 flex h-20 items-center justify-center overflow-hidden rounded-lg bg-slate-50 sm:h-24">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain p-1 transition group-hover:scale-105"
            />
          </div>
          <p className="line-clamp-2 text-[11px] font-semibold leading-tight text-slate-800 sm:text-xs">
            {product.name}
          </p>
          <p className="mt-0.5 text-xs font-bold text-indigo-600 sm:text-sm">
            {formatCurrency(product.price)}
          </p>
          <p className="mt-0.5 text-[10px] font-medium text-emerald-600">
            In Stock: {product.stock}
          </p>
        </button>
      ))}
    </div>
  );
}
