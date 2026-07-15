export interface AdminStaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
  sales: string;
  avatar: string;
}

export const adminStaffMembers: AdminStaffMember[] = [
  {
    id: "2",
    name: "Ahmed Hassan",
    email: "ahmed@ninamart.com",
    role: "Sales Staff",
    status: "Active",
    sales: "Br 28,450",
    avatar: "https://i.pravatar.cc/40?img=12",
  },
  {
    id: "3",
    name: "Sara Ali",
    email: "sara@ninamart.com",
    role: "Sales Staff",
    status: "Active",
    sales: "Br 24,800",
    avatar: "https://i.pravatar.cc/40?img=5",
  },
  {
    id: "4",
    name: "Omar Khalid",
    email: "omar@ninamart.com",
    role: "Sales Staff",
    status: "Active",
    sales: "Br 18,200",
    avatar: "https://i.pravatar.cc/40?img=33",
  },
  {
    id: "5",
    name: "Fatima Noor",
    email: "fatima@ninamart.com",
    role: "Cashier",
    status: "Inactive",
    sales: "Br 11,000",
    avatar: "https://i.pravatar.cc/40?img=9",
  },
];

export const adminCategories = [
  { id: "1", name: "Phones", products: 24, status: "Active" },
  { id: "2", name: "Laptops", products: 18, status: "Active" },
  { id: "3", name: "TV & Audio", products: 12, status: "Active" },
  { id: "4", name: "Accessories", products: 45, status: "Active" },
  { id: "5", name: "Wearables", products: 8, status: "Active" },
];

export const adminDiscounts = [
  { id: "1", name: "Summer Sale 10%", code: "SUMMER10", discount: "10%", status: "Active", expires: "Aug 31, 2026" },
  { id: "2", name: "New Customer 5%", code: "WELCOME5", discount: "5%", status: "Active", expires: "Dec 31, 2026" },
  { id: "3", name: "Clearance 20%", code: "CLEAR20", discount: "20%", status: "Expired", expires: "Jun 30, 2026" },
];

export const adminRoles = [
  { id: "1", name: "Super Administrator", users: 1, permissions: "Full access" },
  { id: "2", name: "Sales Staff", users: 3, permissions: "POS, Products view, Returns" },
  { id: "3", name: "Cashier", users: 1, permissions: "POS only" },
  { id: "4", name: "Inventory Manager", users: 0, permissions: "Products, Inventory, Suppliers" },
];

export const adminActivityLogs = [
  { id: "1", user: "Admin", action: "Updated store settings", time: "10 min ago", type: "settings" },
  { id: "2", user: "Ahmed Hassan", action: "Completed sale INV-001", time: "25 min ago", type: "sale" },
  { id: "3", user: "Admin", action: "Added new product MacBook Pro", time: "1 hour ago", type: "product" },
  { id: "4", user: "Sara Ali", action: "Processed return RET-0089", time: "2 hours ago", type: "return" },
  { id: "5", user: "System", action: "Automated backup completed", time: "4 hours ago", type: "system" },
];

export const adminUserAccounts = [
  { id: "1", name: "Admin", email: "admin@ninamart.com", role: "Super Administrator", status: "Active" },
  { id: "2", name: "Ahmed Hassan", email: "ahmed@ninamart.com", role: "Sales Staff", status: "Active" },
  { id: "3", name: "Sara Ali", email: "sara@ninamart.com", role: "Sales Staff", status: "Active" },
  { id: "4", name: "Omar Khalid", email: "omar@ninamart.com", role: "Sales Staff", status: "Active" },
];
