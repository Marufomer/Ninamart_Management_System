import { useState, useMemo, useEffect } from "react";
import {
  Bell,
  ShoppingBag,
  Package,
  RotateCcw,
  Info,
  CheckCheck,
  Users,
  Trash2,
} from "lucide-react";
import AdminPageShell from "../../components/admin/AdminPageShell";
import { adminRoutes } from "../../data/adminRoutes";
import {
  getAdminNotifs,
  markAdminNotifRead,
  markAllAdminNotifsRead,
  deleteAdminNotif,
  formatNotifTime,
  type AdminNotif,
  type AdminNotifType,
} from "../../utils/notificationStorage";

const typeIcons: Record<AdminNotifType, typeof Bell> = {
  order: ShoppingBag,
  stock: Package,
  return: RotateCcw,
  system: Info,
  staff: Users,
};

const typeColors: Record<AdminNotifType, string> = {
  order: "bg-blue-100 text-blue-600",
  stock: "bg-orange-100 text-orange-600",
  return: "bg-purple-100 text-purple-600",
  system: "bg-slate-100 text-slate-600",
  staff: "bg-teal-100 text-teal-600",
};

const typeLabels: Record<AdminNotifType, string> = {
  order: "Sale",
  stock: "Stock",
  return: "Return",
  system: "System",
  staff: "Staff",
};

const FILTERS = ["All", "Unread", "Orders", "Stock", "Returns", "Staff", "System"] as const;
type Filter = (typeof FILTERS)[number];

const filterTypeMap: Partial<Record<Filter, AdminNotifType>> = {
  Orders: "order",
  Stock: "stock",
  Returns: "return",
  Staff: "staff",
  System: "system",
};

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState<AdminNotif[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  // Load from storage on mount
  useEffect(() => {
    setNotifications(getAdminNotifs());
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = useMemo(() => {
    return notifications.filter((n) => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        n.title.toLowerCase().includes(q) ||
        n.message.toLowerCase().includes(q);
      const matchFilter =
        activeFilter === "All" ||
        (activeFilter === "Unread" && !n.read) ||
        filterTypeMap[activeFilter] === n.type;
      return matchSearch && matchFilter;
    });
  }, [notifications, searchQuery, activeFilter]);

  const handleMarkRead = (id: string) => {
    setNotifications(markAdminNotifRead(id));
  };

  const handleMarkAllRead = () => {
    setNotifications(markAllAdminNotifsRead());
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setNotifications(deleteAdminNotif(id));
  };

  return (
    <AdminPageShell
      title="Notifications"
      description={adminRoutes.notifications.description}
      action={
        unreadCount > 0 ? (
          <button
            onClick={handleMarkAllRead}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 sm:text-sm"
          >
            <CheckCheck className="h-4 w-4" />
            Mark all as read
          </button>
        ) : undefined
      }
    >
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search notifications..."
          className="w-full max-w-md rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              activeFilter === filter
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {filter}
            {filter === "Unread" && unreadCount > 0 && (
              <span className="ml-1.5 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] text-white">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-2">
        {filteredNotifications.length === 0 ? (
          <div className="rounded-xl border border-slate-100 bg-white p-8 text-center shadow-sm">
            <Bell className="mx-auto mb-3 h-10 w-10 text-slate-300" />
            <p className="text-sm text-slate-500">No notifications found</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => {
            const Icon = typeIcons[notification.type];
            return (
              <div
                key={notification.id}
                onClick={() => handleMarkRead(notification.id)}
                className={`group flex w-full cursor-pointer items-start gap-3 rounded-xl border p-4 text-left shadow-sm transition hover:shadow-md ${
                  notification.read
                    ? "border-slate-100 bg-white"
                    : "border-indigo-100 bg-indigo-50/40"
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${typeColors[notification.type]}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`font-semibold ${notification.read ? "text-slate-700" : "text-slate-900"}`}>
                        {notification.title}
                      </p>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${typeColors[notification.type]}`}>
                        {typeLabels[notification.type]}
                      </span>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      {!notification.read && (
                        <span className="h-2 w-2 rounded-full bg-indigo-600" />
                      )}
                      <button
                        onClick={(e) => handleDelete(e, notification.id)}
                        className="rounded-lg p-1 text-slate-300 opacity-0 transition hover:bg-slate-100 hover:text-red-500 group-hover:opacity-100"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="mt-0.5 text-sm text-slate-500">{notification.message}</p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    {formatNotifTime(notification.time)}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </AdminPageShell>
  );
}
