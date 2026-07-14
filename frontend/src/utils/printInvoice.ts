import { products, TAX_RATE, type CartItem } from "../data/posData";
import type { SalesTransaction } from "../data/salesHistoryData";

export interface InvoiceLineItem {
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceData {
  invoiceNo: string;
  date: string;
  time: string;
  staff: string;
  customer: string;
  phone?: string;
  items: InvoiceLineItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: string;
  amountPaid: number;
  change: number;
}

const LINE_WIDTH = 53;
const DIVIDER = "-".repeat(LINE_WIDTH);

export function formatReceiptAmount(amount: number): string {
  return `Br${amount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

function padRight(str: string, len: number): string {
  return str.length > len ? str.slice(0, len) : str + " ".repeat(len - str.length);
}

function padLeft(str: string, len: number): string {
  return str.length > len ? str.slice(0, len) : " ".repeat(len - str.length) + str;
}

function centerText(text: string): string {
  const pad = Math.max(0, Math.floor((LINE_WIDTH - text.length) / 2));
  return " ".repeat(pad) + text;
}

function formatLineItem(name: string, qty: number, price: number, total: number): string {
  return (
    padRight(name, 24) +
    padLeft(String(qty), 6) +
    padLeft(formatReceiptAmount(price), 11) +
    padLeft(formatReceiptAmount(total), 11)
  );
}

function formatLabelValue(label: string, value: string): string {
  return `${label.padEnd(11)}: ${value}`;
}

export function buildInvoiceText(data: InvoiceData): string {
  const lines: string[] = [
    DIVIDER,
    centerText("NinaMart"),
    centerText("Electronics Store Invoice"),
    DIVIDER,
    "",
    formatLabelValue("Invoice No", data.invoiceNo),
    formatLabelValue("Date", data.date),
    formatLabelValue("Time", data.time),
    "",
    formatLabelValue("Staff", data.staff),
    formatLabelValue("Customer", data.customer),
    "",
    DIVIDER,
    padRight("Product", 24) +
      padLeft("Qty", 6) +
      padLeft("Price", 11) +
      padLeft("Total", 11),
    DIVIDER,
  ];

  for (const item of data.items) {
    lines.push(
      formatLineItem(
        item.name,
        item.quantity,
        item.unitPrice,
        item.unitPrice * item.quantity
      )
    );
  }

  lines.push(
    DIVIDER,
    "",
    padLeft(`Subtotal${" ".repeat(20)}${formatReceiptAmount(data.subtotal)}`, LINE_WIDTH),
    padLeft(`Tax (15%)${" ".repeat(18)}${formatReceiptAmount(data.tax)}`, LINE_WIDTH),
    padLeft(`Discount${" ".repeat(19)}${formatReceiptAmount(data.discount)}`, LINE_WIDTH),
    DIVIDER,
    padLeft(`Total${" ".repeat(22)}${formatReceiptAmount(data.total)}`, LINE_WIDTH),
    "",
    `Payment Method: ${data.paymentMethod}`,
    formatLabelValue("Amount Paid", formatReceiptAmount(data.amountPaid)),
    formatLabelValue("Change", formatReceiptAmount(data.change)),
    "",
    centerText("Thank you for shopping with NinaMart!"),
    DIVIDER
  );

  return lines.join("\n");
}

function splitDateTime(dateTime: string): { date: string; time: string } {
  const parts = dateTime.split(",").map((s) => s.trim());
  return { date: parts[0] || dateTime, time: parts[1] || "" };
}

function findProductPrice(name: string): number | undefined {
  const normalized = name.toLowerCase();
  const product = products.find(
    (p) =>
      p.name.toLowerCase() === normalized ||
      normalized.includes(p.name.toLowerCase()) ||
      p.name.toLowerCase().includes(normalized)
  );
  return product?.price;
}

export function parseTransactionItems(
  itemsStr: string
): { name: string; quantity: number }[] {
  return itemsStr.split(",").map((part) => {
    const match = part.trim().match(/^(.+?)\s+x\s+(\d+)$/i);
    if (match) {
      return { name: match[1].trim(), quantity: parseInt(match[2], 10) };
    }
    return { name: part.trim(), quantity: 1 };
  });
}

export function buildInvoiceFromTransaction(tx: SalesTransaction): InvoiceData {
  const { date, time } = splitDateTime(tx.dateTime);

  const items: InvoiceLineItem[] = tx.lineItems
    ? tx.lineItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      }))
    : parseTransactionItems(tx.items).map(({ name, quantity }) => {
        const unitPrice =
          findProductPrice(name) ?? Math.round(tx.totalAmount / quantity);
        return { name, quantity, unitPrice };
      });

  const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const discount = tx.discount ?? 0;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax - discount;
  const amountPaid = tx.amountPaid ?? total;
  const change = tx.change ?? Math.max(0, amountPaid - total);

  return {
    invoiceNo: tx.invoice,
    date,
    time,
    staff: tx.soldBy,
    customer: tx.customer,
    phone: tx.phone,
    items,
    subtotal,
    tax,
    discount,
    total,
    paymentMethod: tx.paymentMethod,
    amountPaid,
    change,
  };
}

export function buildInvoiceFromCart(params: {
  cart: CartItem[];
  customerName: string;
  customerPhone: string;
  staff: string;
  paymentMethod: string;
  amountReceived: number;
  discount?: number;
  invoiceNo?: string;
}): InvoiceData {
  const now = new Date();
  const date = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const time = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const invoiceNo =
    params.invoiceNo ??
    `INV-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(Math.floor(Math.random() * 900) + 100)}`;

  const items: InvoiceLineItem[] = params.cart.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    unitPrice: item.price,
  }));

  const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const discount = params.discount ?? 0;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax - discount;
  const amountPaid = params.amountReceived;
  const change = Math.max(0, amountPaid - total);

  const customer =
    params.customerName.trim() || "Walk-in Customer";

  return {
    invoiceNo,
    date,
    time,
    staff: params.staff,
    customer,
    phone: params.customerPhone.trim() || undefined,
    items,
    subtotal,
    tax,
    discount,
    total,
    paymentMethod: params.paymentMethod,
    amountPaid,
    change,
  };
}

export function printInvoice(data: InvoiceData, autoPrint = true): void {
  const text = buildInvoiceText(data);
  const printWindow = window.open("", "_blank", "width=400,height=700");

  if (!printWindow) {
    alert("Please allow pop-ups to print the invoice.");
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Invoice ${data.invoiceNo}</title>
        <style>
          @media print {
            body { margin: 0; }
          }
          body {
            font-family: "Courier New", Courier, monospace;
            font-size: 12px;
            line-height: 1.4;
            padding: 16px;
            max-width: 360px;
            margin: 0 auto;
            white-space: pre;
          }
        </style>
      </head>
      <body>${text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</body>
    </html>
  `);
  printWindow.document.close();

  if (autoPrint) {
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
  }
}

export function previewInvoice(data: InvoiceData): void {
  printInvoice(data, false);
}
