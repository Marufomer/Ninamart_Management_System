// ─── Types ───────────────────────────────────────────────────────────────────

export type AdminNotifType = "order" | "stock" | "return" | "system" | "staff";
export type StaffNotifType = "order" | "stock" | "return" | "system";

export interface AdminNotif {
  id: string;
  type: AdminNotifType;
  title: string;
  message: string;
  time: string; // ISO string
  read: boolean;
}

export interface StaffNotif {
  id: string;
  staffId: string; // which staff member this belongs to
  type: StaffNotifType;
  title: string;
  message: string;
  time: string; // ISO string
  read: boolean;
}

// ─── Storage Keys ─────────────────────────────────────────────────────────────

const ADMIN_KEY = "ninamart_admin_notifs";
const STAFF_KEY = "ninamart_staff_notifs";

// ─── Default Seed Data ────────────────────────────────────────────────────────

const defaultAdminNotifs: AdminNotif[] = [
  {
    id: "an-1",
    type: "stock",
    title: "Critical low stock",
    message: 'MacBook Pro 14" has only 2 units remaining. Immediate restock recommended.',
    time: new Date(Date.now() - 3 * 60000).toISOString(),
    read: false,
  },
  {
    id: "an-2",
    type: "order",
    title: "High-value sale",
    message: "Invoice INV-001 for Br 65,000 (MacBook Air) completed by Omar.",
    time: new Date(Date.now() - 15 * 60000).toISOString(),
    read: false,
  },
  {
    id: "an-3",
    type: "return",
    title: "Return pending approval",
    message: "Return request RET-0089 for iPhone 15 Pro requires admin review.",
    time: new Date(Date.now() - 30 * 60000).toISOString(),
    read: false,
  },
  {
    id: "an-4",
    type: "staff",
    title: "New staff login",
    message: "Sara Ali logged in from POS terminal #2.",
    time: new Date(Date.now() - 60 * 60000).toISOString(),
    read: false,
  },
  {
    id: "an-5",
    type: "stock",
    title: "Inventory restocked",
    message: "AirPods Pro 2 restocked — 50 units added to inventory.",
    time: new Date(Date.now() - 120 * 60000).toISOString(),
    read: true,
  },
  {
    id: "an-6",
    type: "system",
    title: "Daily backup completed",
    message: "Automated backup finished successfully at 6:00 AM.",
    time: new Date(Date.now() - 240 * 60000).toISOString(),
    read: true,
  },
];

const defaultStaffNotifs: StaffNotif[] = [
  {
    id: "sn-1",
    staffId: "2",
    type: "order",
    title: "Sale completed",
    message: "Invoice INV-20260712-005 for Br 145,000 was processed successfully.",
    time: new Date(Date.now() - 5 * 60000).toISOString(),
    read: false,
  },
  {
    id: "sn-2",
    staffId: "2",
    type: "stock",
    title: "Low stock alert",
    message: "MacBook Air M2 is down to 5 units. Consider restocking soon.",
    time: new Date(Date.now() - 20 * 60000).toISOString(),
    read: false,
  },
  {
    id: "sn-3",
    staffId: "2",
    type: "return",
    title: "Return approved",
    message: "Return RET-0041 for Samsung Galaxy S24 Ultra has been approved by admin.",
    time: new Date(Date.now() - 60 * 60000).toISOString(),
    read: false,
  },
  {
    id: "sn-4",
    staffId: "2",
    type: "system",
    title: "Shift reminder",
    message: "Your shift ends in 2 hours. Please complete pending transactions.",
    time: new Date(Date.now() - 120 * 60000).toISOString(),
    read: true,
  },
  // Broadcast to all staff (staffId = "all")
  {
    id: "sn-b1",
    staffId: "all",
    type: "stock",
    title: "New product added",
    message: "Sony WH-1000XM5 Headphones has been added to the catalog.",
    time: new Date(Date.now() - 180 * 60000).toISOString(),
    read: true,
  },
  {
    id: "sn-b2",
    staffId: "all",
    type: "stock",
    title: "Low stock alert — All Staff",
    message: "Sony Bravia 55\" OLED is critically low (4 units). Please inform customers of possible delays.",
    time: new Date(Date.now() - 200 * 60000).toISOString(),
    read: true,
  },
];

// ─── Admin Notification Helpers ───────────────────────────────────────────────

export function getAdminNotifs(): AdminNotif[] {
  try {
    const raw = localStorage.getItem(ADMIN_KEY);
    if (!raw) {
      localStorage.setItem(ADMIN_KEY, JSON.stringify(defaultAdminNotifs));
      return defaultAdminNotifs;
    }
    return JSON.parse(raw) as AdminNotif[];
  } catch {
    return defaultAdminNotifs;
  }
}

function saveAdminNotifs(notifs: AdminNotif[]): void {
  try {
    localStorage.setItem(ADMIN_KEY, JSON.stringify(notifs));
  } catch { /* ignore */ }
}

export function pushAdminNotif(notif: Omit<AdminNotif, "id" | "time" | "read">): void {
  const all = getAdminNotifs();
  all.unshift({
    ...notif,
    id: `an-${Date.now()}`,
    time: new Date().toISOString(),
    read: false,
  });
  saveAdminNotifs(all);
}

export function markAdminNotifRead(id: string): AdminNotif[] {
  const all = getAdminNotifs().map((n) => (n.id === id ? { ...n, read: true } : n));
  saveAdminNotifs(all);
  return all;
}

export function markAllAdminNotifsRead(): AdminNotif[] {
  const all = getAdminNotifs().map((n) => ({ ...n, read: true }));
  saveAdminNotifs(all);
  return all;
}

export function getAdminUnreadCount(): number {
  return getAdminNotifs().filter((n) => !n.read).length;
}

export function deleteAdminNotif(id: string): AdminNotif[] {
  const all = getAdminNotifs().filter((n) => n.id !== id);
  saveAdminNotifs(all);
  return all;
}

// ─── Staff Notification Helpers ───────────────────────────────────────────────

export function getStaffNotifs(staffId: string): StaffNotif[] {
  try {
    const raw = localStorage.getItem(STAFF_KEY);
    if (!raw) {
      localStorage.setItem(STAFF_KEY, JSON.stringify(defaultStaffNotifs));
      return defaultStaffNotifs.filter(
        (n) => n.staffId === staffId || n.staffId === "all"
      );
    }
    const all = JSON.parse(raw) as StaffNotif[];
    return all.filter((n) => n.staffId === staffId || n.staffId === "all");
  } catch {
    return defaultStaffNotifs.filter(
      (n) => n.staffId === staffId || n.staffId === "all"
    );
  }
}

function getAllStaffNotifs(): StaffNotif[] {
  try {
    const raw = localStorage.getItem(STAFF_KEY);
    if (!raw) {
      localStorage.setItem(STAFF_KEY, JSON.stringify(defaultStaffNotifs));
      return defaultStaffNotifs;
    }
    return JSON.parse(raw) as StaffNotif[];
  } catch {
    return defaultStaffNotifs;
  }
}

function saveStaffNotifs(notifs: StaffNotif[]): void {
  try {
    localStorage.setItem(STAFF_KEY, JSON.stringify(notifs));
  } catch { /* ignore */ }
}

/** Push a notification to a specific staff member */
export function pushStaffNotif(
  staffId: string,
  notif: Omit<StaffNotif, "id" | "staffId" | "time" | "read">
): void {
  const all = getAllStaffNotifs();
  all.unshift({
    ...notif,
    staffId,
    id: `sn-${Date.now()}`,
    time: new Date().toISOString(),
    read: false,
  });
  saveStaffNotifs(all);
}

/** Push a notification to ALL staff members (broadcast) */
export function broadcastStaffNotif(
  notif: Omit<StaffNotif, "id" | "staffId" | "time" | "read">
): void {
  const all = getAllStaffNotifs();
  all.unshift({
    ...notif,
    staffId: "all",
    id: `sn-${Date.now()}`,
    time: new Date().toISOString(),
    read: false,
  });
  saveStaffNotifs(all);
}

export function markStaffNotifRead(id: string, staffId: string): StaffNotif[] {
  const all = getAllStaffNotifs().map((n) =>
    n.id === id ? { ...n, read: true } : n
  );
  saveStaffNotifs(all);
  return all.filter((n) => n.staffId === staffId || n.staffId === "all");
}

export function markAllStaffNotifsRead(staffId: string): StaffNotif[] {
  const all = getAllStaffNotifs().map((n) =>
    n.staffId === staffId || n.staffId === "all" ? { ...n, read: true } : n
  );
  saveStaffNotifs(all);
  return all.filter((n) => n.staffId === staffId || n.staffId === "all");
}

export function getStaffUnreadCount(staffId: string): number {
  return getStaffNotifs(staffId).filter((n) => !n.read).length;
}

export function deleteStaffNotif(id: string, staffId: string): StaffNotif[] {
  const all = getAllStaffNotifs().filter((n) => n.id !== id);
  saveStaffNotifs(all);
  return all.filter((n) => n.staffId === staffId || n.staffId === "all");
}

// ─── Utility ──────────────────────────────────────────────────────────────────

export function formatNotifTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}

// ─── Low Stock Threshold ──────────────────────────────────────────────────────
export const LOW_STOCK_THRESHOLD = 5;
