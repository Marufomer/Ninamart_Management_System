import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useIsMobile } from "../hooks/useMediaQuery";

interface AdminLayoutContextType {
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
  isMobile: boolean;
  handleMenuClick: () => void;
  closeMobileMenu: () => void;
  toggleSidebar: () => void;
  contentOffsetClass: string;
}

const AdminLayoutContext = createContext<AdminLayoutContextType | null>(null);

export function AdminLayoutProvider({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobile) setMobileMenuOpen(false);
  }, [isMobile]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleMenuClick = useCallback(() => {
    if (isMobile) {
      setMobileMenuOpen((prev) => !prev);
    } else {
      setSidebarCollapsed((prev) => !prev);
    }
  }, [isMobile]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      closeMobileMenu();
    } else {
      setSidebarCollapsed((prev) => !prev);
    }
  }, [isMobile, closeMobileMenu]);

  const contentOffsetClass = isMobile
    ? "ml-0"
    : sidebarCollapsed
      ? "ml-[72px]"
      : "ml-[260px]";

  return (
    <AdminLayoutContext.Provider
      value={{
        sidebarCollapsed,
        mobileMenuOpen,
        isMobile,
        handleMenuClick,
        closeMobileMenu,
        toggleSidebar,
        contentOffsetClass,
      }}
    >
      {children}
    </AdminLayoutContext.Provider>
  );
}

export function useAdminLayout() {
  const ctx = useContext(AdminLayoutContext);
  if (!ctx) {
    throw new Error("useAdminLayout must be used within AdminLayoutProvider");
  }
  return ctx;
}
