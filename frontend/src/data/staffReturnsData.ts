export type ReturnStatus = "Pending" | "Approved" | "Rejected";

export interface ReturnRequest {
  id: string;
  invoice: string;
  product: string;
  customer: string;
  reason: string;
  amount: number;
  date: string;
  status: ReturnStatus;
}

export const returnReasons = [
  "Defective product",
  "Wrong item received",
  "Customer changed mind",
  "Damaged during delivery",
  "Other",
] as const;

export const returnRequests: ReturnRequest[] = [
  {
    id: "RET-0041",
    invoice: "INV-2024-0835",
    product: "Samsung Galaxy S24 Ultra",
    customer: "Ahmed Hassan",
    reason: "Defective product",
    amount: 128000,
    date: "Jul 12, 2026",
    status: "Approved",
  },
  {
    id: "RET-0042",
    invoice: "INV-2024-0840",
    product: "iPhone 15 Pro Max",
    customer: "Sara Ali",
    reason: "Customer changed mind",
    amount: 145000,
    date: "Jul 13, 2026",
    status: "Pending",
  },
  {
    id: "RET-0043",
    invoice: "INV-2024-0828",
    product: "AirPods Pro 2",
    customer: "Omar Khalid",
    reason: "Wrong item received",
    amount: 12500,
    date: "Jul 10, 2026",
    status: "Rejected",
  },
  {
    id: "RET-0044",
    invoice: "INV-2024-0845",
    product: "Sony Bravia 55\" OLED",
    customer: "Fatima Noor",
    reason: "Damaged during delivery",
    amount: 89000,
    date: "Jul 14, 2026",
    status: "Pending",
  },
];

export function formatCurrency(amount: number): string {
  return `Br ${amount.toLocaleString("en-US")}`;
}
