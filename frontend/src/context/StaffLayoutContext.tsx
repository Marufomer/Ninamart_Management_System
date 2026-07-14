import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useIsMobile } from "../hooks/useMediaQuery";

interface StaffLayoutContextType {
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
  isMobile: boolean;
  handleMenuClick: () => void;
  closeMobileMenu: () => void;
  toggleSidebar: () => void;
  contentOffsetClass: string;
}

const StaffLayoutContext = createContext<StaffLayoutContextType | null>(null);

export function StaffLayoutProvider({ children }: { children: ReactNode }) {
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
      : "ml-[240px]";

  return (
    <StaffLayoutContext.Provider
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
    </StaffLayoutContext.Provider>
  );
}

export function useStaffLayout() {
  const ctx = useContext(StaffLayoutContext);
  if (!ctx) {
    throw new Error("useStaffLayout must be used within StaffLayoutProvider");
  }
  return ctx;
}
