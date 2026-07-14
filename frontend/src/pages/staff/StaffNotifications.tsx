import { useState, useMemo } from "react";
import {
  Bell,
  ShoppingBag,
  Package,
  RotateCcw,
  Info,
  CheckCheck,
} from "lucide-react";
import StaffHeader from "../../components/staff/StaffHeader";
import { useStaffLayout } from "../../context/StaffLayoutContext";
import {
  staffNotifications,
  notificationFilters,
  type NotificationFilter,
  type NotificationType,
  type StaffNotification,
} from "../../data/staffNotificationsData";

const typeIcons: Record<NotificationType, typeof Bell> = {
  order: ShoppingBag,
  stock: Package,
  return: RotateCcw,
  system: Info,
};

const typeColors: Record<NotificationType, string> = {
  order: "bg-blue-100 text-blue-600",
  stock: "bg-orange-100 text-orange-600",
  return: "bg-purple-100 text-purple-600",
  system: "bg-slate-100 text-slate-600",
};

const filterTypeMap: Partial<Record<NotificationFilter, NotificationType>> = {
  Orders: "order",
  Stock: "stock",
  Returns: "return",
  System: "system",
};

export default function StaffNotifications() {
  const { handleMenuClick } = useStaffLayout();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>("All");
  const [notifications, setNotifications] =
    useState<StaffNotification[]>(staffNotifications);

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
        (filterTypeMap[activeFilter] === n.type);

      return matchSearch && matchFilter;
    });
  }, [notifications, searchQuery, activeFilter]);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="flex min-h-screen min-w-0 flex-1 flex-col">
      <StaffHeader
        onMenuClick={handleMenuClick}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        title="Notifications"
        titleShort="Alerts"
        searchPlaceholder="Search notifications..."
        showScanIcon={false}
      />

      <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <Bell className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {unreadCount} unread
                </p>
                <p className="text-[11px] text-slate-400">
                  {notifications.length} total notifications
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                Mark all as read
              </button>
            )}
          </div>

          <div className="mb-4 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {notificationFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  activeFilter === filter
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:text-indigo-600"
                }`}
              >
                {filter}
                {filter === "Unread" && unreadCount > 0 && (
                  <span className="ml-1.5 rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {filteredNotifications.length === 0 ? (
              <div className="rounded-xl border border-slate-100 bg-white py-16 text-center shadow-sm">
                <Bell className="mx-auto mb-3 h-10 w-10 text-slate-200" />
                <p className="text-sm text-slate-400">No notifications found</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => {
                const Icon = typeIcons[notification.type];
                return (
                  <button
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left shadow-sm transition hover:shadow-md ${
                      notification.read
                        ? "border-slate-100 bg-white"
                        : "border-indigo-100 bg-indigo-50/30"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${typeColors[notification.type]}`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={`text-sm font-semibold ${
                            notification.read
                              ? "text-slate-700"
                              : "text-slate-900"
                          }`}
                        >
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
                        )}
                      </div>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                        {notification.message}
                      </p>
                      <p className="mt-1.5 text-[10px] font-medium text-slate-400">
                        {notification.time}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
    </div>
  );
}
