import KPICards from "../components/dashboard/KPICards";
import SalesOverview from "../components/dashboard/SalesOverview";
import TodaysSales from "../components/dashboard/TodaysSales";
import LowStockAlerts from "../components/dashboard/LowStockAlerts";
import InventoryStatus from "../components/dashboard/InventoryStatus";
import BestSellingProducts from "../components/dashboard/BestSellingProducts";
import RecentActivities from "../components/dashboard/RecentActivities";
import StaffPerformance from "../components/dashboard/StaffPerformance";
import QuickActions from "../components/dashboard/QuickActions";
import TodaysSummary from "../components/dashboard/TodaysSummary";

export default function Dashboard() {
  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Row 1: KPI Cards */}
      <KPICards />

      {/* Row 2: Sales Overview + Today's Sales + Low Stock */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 xl:grid-cols-12">
        <div className="lg:col-span-1 xl:col-span-5">
          <SalesOverview />
        </div>
        <div className="lg:col-span-1 xl:col-span-5">
          <TodaysSales />
        </div>
        <div className="lg:col-span-2 xl:col-span-2">
          <LowStockAlerts />
        </div>
      </div>

      {/* Row 3: Inventory + Best Selling + Activities */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        <InventoryStatus />
        <BestSellingProducts />
        <RecentActivities />
      </div>

      {/* Row 4: Staff Performance + Quick Actions + Summary */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 xl:grid-cols-12">
        <div className="xl:col-span-5">
          <StaffPerformance />
        </div>
        <div className="xl:col-span-4">
          <QuickActions />
        </div>
        <div className="xl:col-span-3">
          <TodaysSummary />
        </div>
      </div>
    </div>
  );
}
