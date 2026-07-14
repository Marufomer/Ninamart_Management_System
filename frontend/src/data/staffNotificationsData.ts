export type NotificationType = "order" | "stock" | "return" | "system";

export interface StaffNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export const notificationFilters = ["All", "Unread", "Orders", "Stock", "Returns", "System"] as const;
export type NotificationFilter = (typeof notificationFilters)[number];

export const staffNotifications: StaffNotification[] = [
  {
    id: "1",
    type: "order",
    title: "New sale completed",
    message: "Invoice INV-2024-0847 for Br 12,450 was processed successfully.",
    time: "5 min ago",
    read: false,
  },
  {
    id: "2",
    type: "stock",
    title: "Low stock alert",
    message: "MacBook Air M2 is down to 5 units. Consider restocking soon.",
    time: "20 min ago",
    read: false,
  },
  {
    id: "3",
    type: "return",
    title: "Return request approved",
    message: "Return RET-0041 for Samsung Galaxy S24 Ultra has been approved by admin.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "4",
    type: "system",
    title: "Shift reminder",
    message: "Your shift ends in 2 hours. Please complete pending transactions.",
    time: "2 hours ago",
    read: true,
  },
  {
    id: "5",
    type: "order",
    title: "Payment received",
    message: "Mobile payment of Br 8,200 received for invoice INV-2024-0843.",
    time: "3 hours ago",
    read: true,
  },
  {
    id: "6",
    type: "stock",
    title: "Stock updated",
    message: "AirPods Pro 2 stock increased to 25 units after delivery.",
    time: "Yesterday",
    read: true,
  },
  {
    id: "7",
    type: "return",
    title: "Return request pending",
    message: "Return RET-0042 for iPhone 15 Pro Max is awaiting admin review.",
    time: "Yesterday",
    read: true,
  },
  {
    id: "8",
    type: "system",
    title: "System maintenance",
    message: "Scheduled maintenance tonight 11 PM – 12 AM. POS will remain available.",
    time: "2 days ago",
    read: true,
  },
];
