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
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />
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
            <Route path="profile" element={<StaffProfile />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
