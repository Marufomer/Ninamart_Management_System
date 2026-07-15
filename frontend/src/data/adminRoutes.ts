export interface AdminRouteMeta {
  path: string;
  title: string;
  titleShort?: string;
  description?: string;
}

export const adminRoutes: Record<string, AdminRouteMeta> = {
  dashboard: {
    path: "/dashboard",
    title: "Dashboard",
    titleShort: "Dashboard",
  },
  products: {
    path: "/dashboard/products",
    title: "Products",
    description: "Manage your product catalog, pricing, and availability.",
  },
  categories: {
    path: "/dashboard/categories",
    title: "Categories",
    description: "Organize products into categories for easier browsing.",
  },
  inventory: {
    path: "/dashboard/inventory",
    title: "Inventory",
    description: "Track stock levels, restock products, and monitor warehouse status.",
  },
  addProduct: {
    path: "/dashboard/add-product",
    title: "Add Product",
    description: "Add a new product to your store catalog.",
  },
  sales: {
    path: "/dashboard/sales",
    title: "Sales",
    description: "View and manage all sales transactions.",
  },
  returns: {
    path: "/dashboard/returns",
    title: "Returns",
    description: "Process and track customer return requests.",
  },
  discounts: {
    path: "/dashboard/discounts",
    title: "Discounts",
    description: "Create and manage promotional discounts.",
  },
  staff: {
    path: "/dashboard/staff",
    title: "Staff",
    description: "Manage staff members and their access.",
  },
  roles: {
    path: "/dashboard/roles",
    title: "Roles & Permissions",
    description: "Configure user roles and permission levels.",
  },
  dailyReport: {
    path: "/dashboard/daily-report",
    title: "Daily Report",
    description: "Summary of today's sales, orders, and performance.",
  },
  monthlyReport: {
    path: "/dashboard/monthly-report",
    title: "Monthly Report",
    description: "Monthly overview of revenue, orders, and trends.",
  },
  bestSelling: {
    path: "/dashboard/best-selling",
    title: "Best Selling Products",
    description: "Top performing products by sales volume and revenue.",
  },
  revenueAnalytics: {
    path: "/dashboard/revenue-analytics",
    title: "Revenue Analytics",
    description: "Detailed revenue breakdown and analytics.",
  },
  storeSettings: {
    path: "/dashboard/store-settings",
    title: "Store Settings",
    description: "Configure store name, address, and business details.",
  },
  userAccounts: {
    path: "/dashboard/user-accounts",
    title: "User Accounts",
    description: "Manage admin and staff user accounts.",
  },
  activityLogs: {
    path: "/dashboard/activity-logs",
    title: "Activity Logs",
    description: "Audit trail of system activities and changes.",
  },
  backup: {
    path: "/dashboard/backup",
    title: "Backup",
    description: "Backup and restore store data.",
  },
  notifications: {
    path: "/dashboard/notifications",
    title: "Notifications",
    description: "System alerts, stock warnings, and updates.",
  },
  messages: {
    path: "/dashboard/messages",
    title: "Messages",
    description: "Internal messages and team communications.",
  },
  profile: {
    path: "/dashboard/profile",
    title: "My Profile",
    titleShort: "Profile",
    description: "Manage your admin profile and account settings.",
  },
};

export function getAdminRouteTitle(pathname: string): string {
  const match = Object.values(adminRoutes)
    .filter((r) => r.path !== "/dashboard")
    .sort((a, b) => b.path.length - a.path.length)
    .find((r) => pathname.startsWith(r.path));

  if (match) return match.title;
  return adminRoutes.dashboard.title;
}

export function getAdminRouteTitleShort(pathname: string): string {
  const match = Object.values(adminRoutes)
    .filter((r) => r.path !== "/dashboard")
    .sort((a, b) => b.path.length - a.path.length)
    .find((r) => pathname.startsWith(r.path));

  if (match) return match.titleShort ?? match.title;
  return adminRoutes.dashboard.titleShort ?? "Dashboard";
}
