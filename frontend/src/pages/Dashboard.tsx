import { useState } from "react";
import KPICards from "../components/dashboard/KPICards";
import SalesOverview from "../components/dashboard/SalesOverview";
import TodaysSales from "../components/dashboard/TodaysSales";
import LowStockAlerts from "../components/dashboard/LowStockAlerts";
import InventoryStatus from "../components/dashboard/InventoryStatus";
import BestSellingProducts from "../components/dashboard/BestSellingProducts";
import RecentActivities from "../components/dashboard/RecentActivities";
import QuickActions from "../components/dashboard/QuickActions";
import TodaysSummary from "../components/dashboard/TodaysSummary";
import AdminLoadingModal from "../components/admin/AdminLoadingModal";

export default function Dashboard() {
  const [showLoading, setShowLoading] = useState(true);

  return (
    <>
      <AdminLoadingModal open={showLoading} onComplete={() => setShowLoading(false)} />
      <div className="space-y-4 sm:space-y-5">
      {/* Row 1: KPI Cards */}
      <KPICards />

      {/* Row 2: Sales Overview + Today's Sales */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
        <SalesOverview />
        <TodaysSales />
      </div>

      {/* Row 3: Low Stock Alerts + Inventory Status */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
        <LowStockAlerts />
        <InventoryStatus />
      </div>

      {/* Row 4: Best Selling Products + Recent Activities */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
        <BestSellingProducts />
        <RecentActivities />
      </div>

      {/* Row 5: Quick Actions + Today's Summary */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <QuickActions />
        </div>
        <div className="lg:col-span-5">
          <TodaysSummary />
        </div>
      </div>
    </div>
    </>
  );
}
