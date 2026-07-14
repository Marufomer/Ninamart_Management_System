import StaffSidebar from "./StaffSidebar";
import StaffPageTransition from "./StaffPageTransition";
import {
  StaffLayoutProvider,
  useStaffLayout,
} from "../../context/StaffLayoutContext";

function StaffLayoutShell() {
  const {
    sidebarCollapsed,
    mobileMenuOpen,
    isMobile,
    closeMobileMenu,
    toggleSidebar,
    contentOffsetClass,
  } = useStaffLayout();

  return (
    <div className="flex min-h-screen bg-slate-50">
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      <StaffSidebar
        collapsed={isMobile ? false : sidebarCollapsed}
        mobileOpen={mobileMenuOpen}
        isMobile={isMobile}
        onToggle={toggleSidebar}
        onNavClick={closeMobileMenu}
      />

      <div
        className={`relative flex min-h-screen min-w-0 flex-1 flex-col transition-all duration-300 ${contentOffsetClass}`}
      >
        <StaffPageTransition />
      </div>
    </div>
  );
}

export default function StaffLayout() {
  return (
    <StaffLayoutProvider>
      <StaffLayoutShell />
    </StaffLayoutProvider>
  );
}
