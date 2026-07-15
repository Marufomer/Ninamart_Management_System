export interface InventoryTransaction {
  id: string;
  productId: string;
  productName: string;
  prevStock: number;
  qtyAdded: number;
  currentStock: number;
  supplier: string;
  purchasePrice: number;
  invoiceNumber: string;
  adminName: string;
  date: string;
  time: string;
  notes?: string;
}

export const suppliers = [
  "Apple Authorized Distributor",
  "Samsung Electronics East Africa",
  "Dell Inc. Wholesale",
  "Sony Global Trade",
  "JBL Harman Logistics",
  "Global Tech Import Plc",
];

export const inventoryTransactions: InventoryTransaction[] = [
  {
    id: "TX-1001",
    productId: "3",
    productName: "MacBook Air M2",
    prevStock: 2,
    qtyAdded: 3,
    currentStock: 5,
    supplier: "Apple Authorized Distributor",
    purchasePrice: 95000,
    invoiceNumber: "SUP-INV-8891",
    adminName: "Admin",
    date: "2026-07-14",
    time: "12:30 PM",
    notes: "Initial restock for inventory testing.",
  },
  {
    id: "TX-1002",
    productId: "5",
    productName: "Sony Bravia 55\" OLED",
    prevStock: 2,
    qtyAdded: 2,
    currentStock: 4,
    supplier: "Sony Global Trade",
    purchasePrice: 72000,
    invoiceNumber: "SUP-INV-9921",
    adminName: "Admin",
    date: "2026-07-13",
    time: "02:15 PM",
    notes: "Restocked display model replacement.",
  },
];
