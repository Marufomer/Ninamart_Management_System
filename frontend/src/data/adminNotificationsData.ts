export type AdminNotificationType = "order" | "stock" | "return" | "system" | "staff";

export interface AdminNotification {
  id: string;
  type: AdminNotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export const adminNotificationFilters = [
  "All",
  "Unread",
  "Orders",
  "Stock",
  "Returns",
  "Staff",
  "System",
] as const;

export type AdminNotificationFilter = (typeof adminNotificationFilters)[number];

export const adminNotifications: AdminNotification[] = [
  {
    id: "1",
    type: "stock",
    title: "Critical low stock",
    message: "MacBook Pro 14\" has only 2 units remaining. Immediate restock recommended.",
    time: "3 min ago",
    read: false,
  },
  {
    id: "2",
    type: "order",
    title: "High-value sale",
    message: "Invoice INV-001 for Br 65,000 (MacBook Air) completed by Omar.",
    time: "15 min ago",
    read: false,
  },
  {
    id: "3",
    type: "return",
    title: "Return pending approval",
    message: "Return request RET-0089 for iPhone 15 Pro requires admin review.",
    time: "30 min ago",
    read: false,
  },
  {
    id: "4",
    type: "staff",
    title: "New staff login",
    message: "Sara Ali logged in from POS terminal #2.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "5",
    type: "stock",
    title: "Inventory update",
    message: "AirPods Pro 2 restocked — 50 units added to inventory.",
    time: "2 hours ago",
    read: true,
  },
  {
    id: "6",
    type: "system",
    title: "Daily backup completed",
    message: "Automated backup finished successfully at 6:00 AM.",
    time: "4 hours ago",
    read: true,
  },
];

export interface AdminMessage {
  id: string;
  from: string;
  subject: string;
  preview: string;
  time: string;
  read: boolean;
  avatar: string;
}

export const adminMessages: AdminMessage[] = [
  {
    id: "1",
    from: "Ahmed Hassan",
    subject: "End of shift report",
    preview: "Today's sales total: Br 28,450 across 18 orders. One return processed.",
    time: "10 min ago",
    read: false,
    avatar: "https://i.pravatar.cc/40?img=12",
  },
  {
    id: "2",
    from: "Sara Ali",
    subject: "Stock discrepancy",
    preview: "Found a mismatch in Samsung Galaxy S24 count during inventory check.",
    time: "45 min ago",
    read: false,
    avatar: "https://i.pravatar.cc/40?img=5",
  },
  {
    id: "3",
    from: "Omar Khalid",
    subject: "Customer complaint",
    preview: "Customer reported issue with AirPods Pro purchased yesterday.",
    time: "2 hours ago",
    read: false,
    avatar: "https://i.pravatar.cc/40?img=33",
  },
  {
    id: "4",
    from: "System",
    subject: "Weekly report ready",
    preview: "Your weekly sales report for the past 7 days is available.",
    time: "Yesterday",
    read: true,
    avatar: "https://i.pravatar.cc/40?img=68",
  },
];
