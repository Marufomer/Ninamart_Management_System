import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import MainLayout from "./components/layout/MainLayout";
import StaffLayout from "./components/staff/StaffLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PosDashboard from "./pages/staff/PosDashboard";
import SalesHistory from "./pages/staff/SalesHistory";
import StaffProducts from "./pages/staff/StaffProducts";
import StaffNotifications from "./pages/staff/StaffNotifications";
import StaffReturns from "./pages/staff/StaffReturns";
import StaffProfile from "./pages/staff/StaffProfile";
import StaffMessages from "./pages/staff/StaffMessages";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminAddProduct from "./pages/admin/AdminAddProduct";
import AdminInventory from "./pages/admin/AdminInventory";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminSales from "./pages/admin/AdminSales";
import AdminReturns from "./pages/admin/AdminReturns";
import AdminDiscounts from "./pages/admin/AdminDiscounts";
import AdminStaff from "./pages/admin/AdminStaff";
import AdminRoles from "./pages/admin/AdminRoles";
import AdminDailyReport from "./pages/admin/AdminDailyReport";
import AdminMonthlyReport from "./pages/admin/AdminMonthlyReport";
import AdminBestSelling from "./pages/admin/AdminBestSelling";
import AdminRevenueAnalytics from "./pages/admin/AdminRevenueAnalytics";
import AdminStoreSettings from "./pages/admin/AdminStoreSettings";
import AdminUserAccounts from "./pages/admin/AdminUserAccounts";
import AdminActivityLogs from "./pages/admin/AdminActivityLogs";
import AdminBackup from "./pages/admin/AdminBackup";
import AdminMessages from "./pages/admin/AdminMessages";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="inventory" element={<AdminInventory />} />
            <Route path="add-product" element={<AdminAddProduct />} />
            <Route path="sales" element={<AdminSales />} />
            <Route path="returns" element={<AdminReturns />} />
            <Route path="discounts" element={<AdminDiscounts />} />
            <Route path="staff" element={<AdminStaff />} />
            <Route path="roles" element={<AdminRoles />} />
            <Route path="daily-report" element={<AdminDailyReport />} />
            <Route path="monthly-report" element={<AdminMonthlyReport />} />
            <Route path="best-selling" element={<AdminBestSelling />} />
            <Route path="revenue-analytics" element={<AdminRevenueAnalytics />} />
            <Route path="store-settings" element={<AdminStoreSettings />} />
            <Route path="user-accounts" element={<AdminUserAccounts />} />
            <Route path="activity-logs" element={<AdminActivityLogs />} />
            <Route path="backup" element={<AdminBackup />} />
            <Route path="notifications" element={<AdminNotifications />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>
          <Route
            path="/staff"
            element={
              <ProtectedRoute allowedRoles={["staff"]}>
                <StaffLayout />
              </ProtectedRoute>
            }
          >
            <Route path="pos" element={<PosDashboard />} />
            <Route path="sales" element={<SalesHistory />} />
            <Route path="products" element={<StaffProducts />} />
            <Route path="notifications" element={<StaffNotifications />} />
            <Route path="returns" element={<StaffReturns />} />
            <Route path="messages" element={<StaffMessages />} />
            <Route path="profile" element={<StaffProfile />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
