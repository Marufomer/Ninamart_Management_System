export const kpiCards = [
  {
    title: "Today's Revenue",
    value: "Br 82,450.00",
    trend: "+18.6% vs Yesterday",
    trendUp: true,
    icon: "revenue",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    title: "Today's Orders",
    value: "65",
    trend: "+12.3% vs Yesterday",
    trendUp: true,
    icon: "orders",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Products Sold",
    value: "128",
    trend: "+15.2% vs Yesterday",
    trendUp: true,
    icon: "products",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Low Stock Products",
    value: "23",
    trend: "View All",
    trendUp: false,
    isLink: true,
    icon: "lowstock",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    title: "Available Inventory",
    value: "1,245",
    trend: "Products in stock",
    trendUp: false,
    icon: "inventory",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
  },
  {
    title: "Staff Working Today",
    value: "18",
    trend: "View Attendance",
    trendUp: false,
    isLink: true,
    icon: "staff",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
  },
];

export const salesChartData = [
  { time: "12 AM", sales: 1200 },
  { time: "2 AM", sales: 800 },
  { time: "4 AM", sales: 600 },
  { time: "6 AM", sales: 1500 },
  { time: "8 AM", sales: 4200 },
  { time: "10 AM", sales: 7800 },
  { time: "12 PM", sales: 6500 },
  { time: "2 PM", sales: 8200 },
  { time: "4 PM", sales: 9100 },
  { time: "6 PM", sales: 7500 },
  { time: "8 PM", sales: 5800 },
  { time: "10 PM", sales: 3200 },
  { time: "12 AM", sales: 1800 },
];

export const salesOverviewStats = [
  { label: "Revenue", value: "Br 82,450", color: "text-indigo-600" },
  { label: "Orders", value: "65", color: "text-blue-600" },
  { label: "Profit", value: "Br 24,735", color: "text-emerald-600" },
  { label: "Avg. Order Value", value: "Br 1,268", color: "text-purple-600" },
];

export const todaysSales = [
  { invoice: "INV-001", customer: "John Doe", product: "iPhone 15 Pro", qty: 1, total: "Br 45,000", staff: "Ahmed", time: "10:30 AM", status: "Paid" },
  { invoice: "INV-002", customer: "Sarah M.", product: "Samsung S24", qty: 1, total: "Br 38,500", staff: "Sara", time: "10:15 AM", status: "Paid" },
  { invoice: "INV-003", customer: "Mike R.", product: "AirPods Pro", qty: 2, total: "Br 12,000", staff: "Ahmed", time: "09:45 AM", status: "Cash" },
  { invoice: "INV-004", customer: "Lisa K.", product: "MacBook Air", qty: 1, total: "Br 65,000", staff: "Omar", time: "09:30 AM", status: "Paid" },
  { invoice: "INV-005", customer: "David W.", product: "iPad Pro", qty: 1, total: "Br 28,000", staff: "Sara", time: "09:00 AM", status: "Paid" },
];

export const lowStockProducts = [
  { name: "iPhone 15 Pro Max", remaining: 3, image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=80&h=80&fit=crop" },
  { name: "Samsung Galaxy S24", remaining: 5, image: "https://images.unsplash.com/photo-1610945265064-0e34e55182fa?w=80&h=80&fit=crop" },
  { name: "AirPods Pro 2", remaining: 8, image: "https://images.unsplash.com/photo-1606220588913-b3aac4be2d2f?w=80&h=80&fit=crop" },
  { name: "MacBook Pro 14\"", remaining: 2, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=80&h=80&fit=crop" },
  { name: "Sony WH-1000XM5", remaining: 4, image: "https://images.unsplash.com/photo-1618366712010-f8ae722c10b8?w=80&h=80&fit=crop" },
];

export const inventoryData = [
  { name: "In Stock", value: 1089, color: "#22c55e" },
  { name: "Low Stock", value: 133, color: "#f59e0b" },
  { name: "Out of Stock", value: 23, color: "#ef4444" },
];

export const bestSellingProducts = [
  { name: "iPhone 15 Pro", sold: 45, revenue: "Br 2,025,000", stock: 28, image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=60&h=60&fit=crop" },
  { name: "Samsung Galaxy S24", sold: 38, revenue: "Br 1,463,000", stock: 22, image: "https://images.unsplash.com/photo-1610945265064-0e34e55182fa?w=60&h=60&fit=crop" },
  { name: "AirPods Pro 2", sold: 62, revenue: "Br 372,000", stock: 45, image: "https://images.unsplash.com/photo-1606220588913-b3aac4be2d2f?w=60&h=60&fit=crop" },
  { name: "MacBook Air M3", sold: 18, revenue: "Br 1,170,000", stock: 12, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=60&h=60&fit=crop" },
  { name: "iPad Pro 12.9\"", sold: 24, revenue: "Br 672,000", stock: 15, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=60&h=60&fit=crop" },
];

export const recentActivities = [
  { user: "Ahmed", action: "sold iPhone 15 Pro", time: "2 min ago", type: "sale" },
  { user: "Sara", action: "sold Samsung Galaxy S24", time: "5 min ago", type: "sale" },
  { user: "Omar", action: "restocked AirPods Pro", time: "12 min ago", type: "restock" },
  { user: "Admin", action: "added new product MacBook Pro", time: "25 min ago", type: "add" },
  { user: "Ahmed", action: "processed return for INV-089", time: "35 min ago", type: "return" },
  { user: "Sara", action: "sold iPad Pro 12.9\"", time: "42 min ago", type: "sale" },
];

export const staffPerformance = [
  { name: "Ahmed Hassan", sales: "Br 28,450", orders: 18, items: 32, returns: 1, performance: 95, status: "Excellent", avatar: "https://i.pravatar.cc/40?img=12" },
  { name: "Sara Ali", sales: "Br 24,800", orders: 15, items: 28, returns: 0, performance: 88, status: "Very Good", avatar: "https://i.pravatar.cc/40?img=5" },
  { name: "Omar Khalid", sales: "Br 18,200", orders: 12, items: 22, returns: 2, performance: 72, status: "Good", avatar: "https://i.pravatar.cc/40?img=33" },
  { name: "Fatima Noor", sales: "Br 11,000", orders: 8, items: 15, returns: 1, performance: 55, status: "Average", avatar: "https://i.pravatar.cc/40?img=9" },
];

export const quickActions = [
  { label: "Add Product", icon: "package", bg: "bg-purple-50", iconColor: "text-purple-600" },
  { label: "Add Staff", icon: "userPlus", bg: "bg-blue-50", iconColor: "text-blue-600" },
  { label: "New Sale", icon: "shoppingCart", bg: "bg-emerald-50", iconColor: "text-emerald-600" },
  { label: "Purchase Order", icon: "clipboard", bg: "bg-orange-50", iconColor: "text-orange-600" },
  { label: "Stock Adjustment", icon: "settings", bg: "bg-pink-50", iconColor: "text-pink-600" },
  { label: "Generate Report", icon: "fileText", bg: "bg-indigo-50", iconColor: "text-indigo-600" },
];

export const todaysSummary = [
  { label: "Total Sales", value: "Br 82,450", icon: "dollarSign", color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "Total Orders", value: "65", icon: "shoppingBag", color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Total Items Sold", value: "128", icon: "package", color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Returns", value: "4", icon: "rotateCcw", color: "text-orange-600", bg: "bg-orange-50" },
  { label: "Discount Given", value: "Br 3,250", icon: "tag", color: "text-red-600", bg: "bg-red-50" },
];

export const navGroups = [
  {
    label: "Product Management",
    items: [
      { name: "Products", icon: "package" },
      { name: "Categories", icon: "grid" },
      { name: "Brands", icon: "tag" },
      { name: "Inventory", icon: "warehouse" },
      { name: "Suppliers", icon: "truck" },
    ],
  },
  {
    label: "Sales Management",
    items: [
      { name: "Sales", icon: "shoppingCart" },
      { name: "Orders", icon: "clipboardList" },
      { name: "Returns", icon: "rotateCcw" },
      { name: "Customers", icon: "users" },
      { name: "Discounts", icon: "percent" },
    ],
  },
  {
    label: "Staff Management",
    items: [
      { name: "Staff", icon: "userCheck" },
      { name: "Attendance", icon: "calendar" },
      { name: "Performance", icon: "trendingUp" },
      { name: "Roles & Permissions", icon: "shield" },
    ],
  },
  {
    label: "Reports",
    items: [
      { name: "Daily Report", icon: "fileText" },
      { name: "Monthly Report", icon: "barChart" },
      { name: "Best Selling Products", icon: "star" },
      { name: "Revenue Analytics", icon: "pieChart" },
    ],
  },
  {
    label: "Settings",
    items: [
      { name: "Store Settings", icon: "store" },
      { name: "User Accounts", icon: "userCog" },
      { name: "Activity Logs", icon: "activity" },
      { name: "Backup", icon: "database" },
      { name: "Notifications", icon: "bell" },
    ],
  },
];
