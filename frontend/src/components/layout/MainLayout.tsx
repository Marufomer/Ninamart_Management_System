import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useIsMobile } from "../../hooks/useMediaQuery";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!isMobile) setMobileOpen(false);
  }, [isMobile]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleMenuClick = () => {
    if (isMobile) {
      setMobileOpen((prev) => !prev);
    } else {
      setCollapsed((prev) => !prev);
    }
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      <Sidebar
        collapsed={isMobile ? false : collapsed}
        mobileOpen={mobileOpen}
        isMobile={isMobile}
        onToggle={() => (isMobile ? closeMobile() : setCollapsed((prev) => !prev))}
        onNavClick={closeMobile}
      />

      <div
        className={`min-w-0 transition-all duration-300 ${
          isMobile ? "ml-0" : collapsed ? "ml-[72px]" : "ml-[260px]"
        }`}
      >
        <Header
          onMenuClick={handleMenuClick}
          mobileOpen={mobileOpen}
        />
        <main className="p-3 sm:p-4 lg:p-5">{children}</main>
      </div>
    </div>
  );
}
