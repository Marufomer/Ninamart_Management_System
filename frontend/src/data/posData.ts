export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  sku: string;
  color?: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export const categories = [
  "All",
  "Phones",
  "Laptops",
  "TV & Audio",
  "Accessories",
  "Wearables",
];

export const products: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    price: 145000,
    stock: 12,
    category: "Phones",
    sku: "SKU-IP15PM",
    color: "Natural Titanium",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200&h=200&fit=crop",
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra",
    price: 128000,
    stock: 8,
    category: "Phones",
    sku: "SKU-SGS24U",
    color: "Titanium Gray",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e55182fa?w=200&h=200&fit=crop",
  },
  {
    id: "3",
    name: "MacBook Air M2",
    price: 115000,
    stock: 5,
    category: "Laptops",
    sku: "SKU-MBA-M2",
    color: "Midnight",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop",
  },
  {
    id: "4",
    name: "Dell XPS 15",
    price: 98000,
    stock: 6,
    category: "Laptops",
    sku: "SKU-DXPS15",
    color: "Platinum Silver",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=200&h=200&fit=crop",
  },
  {
    id: "5",
    name: "Sony Bravia 55\" OLED",
    price: 89000,
    stock: 4,
    category: "TV & Audio",
    sku: "SKU-SBR55",
    image: "https://images.unsplash.com/photo-1593359677878-a4bb92f829d1?w=200&h=200&fit=crop",
  },
  {
    id: "6",
    name: "AirPods Pro 2",
    price: 12500,
    stock: 25,
    category: "Accessories",
    sku: "SKU-APP2",
    color: "White",
    image: "https://images.unsplash.com/photo-1606220588913-b3aac4be2d2f?w=200&h=200&fit=crop",
  },
  {
    id: "7",
    name: "Apple Watch Series 9",
    price: 32000,
    stock: 15,
    category: "Wearables",
    sku: "SKU-AWS9",
    color: "Starlight",
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=200&h=200&fit=crop",
  },
  {
    id: "8",
    name: "Samsung Galaxy Buds2",
    price: 8500,
    stock: 20,
    category: "Accessories",
    sku: "SKU-SGB2",
    color: "Graphite",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop",
  },
  {
    id: "9",
    name: "iPad Pro 12.9\"",
    price: 78000,
    stock: 7,
    category: "Laptops",
    sku: "SKU-IPADP",
    color: "Space Gray",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop",
  },
  {
    id: "10",
    name: "JBL Flip 6 Speaker",
    price: 6500,
    stock: 18,
    category: "TV & Audio",
    sku: "SKU-JBLF6",
    color: "Blue",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop",
  },
];

export const recentTransactions = [
  {
    invoice: "INV-20260712-005",
    customer: "Abebe Kebede",
    items: "iPhone 15 Pro Max x 1",
    total: "Br 145,000.00",
    time: "10:30 AM",
    status: "Paid",
  },
  {
    invoice: "INV-20260712-004",
    customer: "Sara Mohammed",
    items: "AirPods Pro 2 x 2",
    total: "Br 25,000.00",
    time: "10:15 AM",
    status: "Paid",
  },
  {
    invoice: "INV-20260712-003",
    customer: "John Smith",
    items: "MacBook Air M2 x 1",
    total: "Br 115,000.00",
    time: "09:45 AM",
    status: "Paid",
  },
  {
    invoice: "INV-20260712-002",
    customer: "Walk-in Customer",
    items: "Samsung Galaxy Buds2 x 1",
    total: "Br 8,500.00",
    time: "09:30 AM",
    status: "Paid",
  },
];

export const defaultCart: CartItem[] = [
  { ...products[0], quantity: 1 },
  { ...products[5], quantity: 2 },
  { ...products[6], quantity: 1 },
];

export const TAX_RATE = 0.15;
export const TODAY_TARGET = 500000;
export const TODAY_SALES = 241500;

export function formatCurrency(amount: number): string {
  return `Br ${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
