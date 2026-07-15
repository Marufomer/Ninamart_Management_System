import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import {
  AdminLayoutProvider,
  useAdminLayout,
} from "../../context/AdminLayoutContext";

function MainLayoutShell() {
  const {
    sidebarCollapsed,
    mobileMenuOpen,
    isMobile,
    closeMobileMenu,
    toggleSidebar,
    handleMenuClick,
    contentOffsetClass,
  } = useAdminLayout();

  return (
    <div className="min-h-screen bg-slate-50">
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      <Sidebar
        collapsed={isMobile ? false : sidebarCollapsed}
        mobileOpen={mobileMenuOpen}
        isMobile={isMobile}
        onToggle={toggleSidebar}
        onNavClick={closeMobileMenu}
      />

      <div
        className={`min-w-0 transition-all duration-300 ${contentOffsetClass}`}
      >
        <Header onMenuClick={handleMenuClick} mobileOpen={mobileMenuOpen} />
        <main className="p-3 sm:p-4 lg:p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function MainLayout() {
  return (
    <AdminLayoutProvider>
      <MainLayoutShell />
    </AdminLayoutProvider>
  );
}
