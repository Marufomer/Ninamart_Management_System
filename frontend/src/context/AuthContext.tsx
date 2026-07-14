import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import {
  authenticate,
  findUserByEmail,
  getStoredPassword,
  setStoredPassword,
  users,
  verifyPassword,
  type AuthUser,
} from "../data/users";

interface AuthContextType {
  user: AuthUser | null;
  login: (
    email: string,
    password: string
  ) => { success: boolean; error?: string; user?: AuthUser };
  logout: () => void;
  updateProfile: (updates: {
    name?: string;
    email?: string;
    avatar?: string;
  }) => { success: boolean; error?: string };
  changePassword: (
    currentPassword: string,
    newPassword: string
  ) => { success: boolean; error?: string };
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);
const STORAGE_KEY = "ninamart_auth";

function mergeStoredUser(stored: AuthUser): AuthUser {
  const base = users.find((u) => u.id === stored.id);
  if (!base) return stored;
  return {
    ...base,
    ...stored,
    role: base.role,
    title: stored.title || base.title,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? mergeStoredUser(JSON.parse(stored) as AuthUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = useCallback((email: string, password: string) => {
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (!found) {
      return { success: false, error: "Invalid email or password" };
    }
    const validPassword = getStoredPassword(found.id, found.password);
    if (validPassword !== password) {
      return { success: false, error: "Invalid email or password" };
    }
    const { password: _, ...safeUser } = found;
    setUser(safeUser);
    return { success: true, user: safeUser };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateProfile = useCallback(
    (updates: { name?: string; email?: string; avatar?: string }) => {
      if (!user) {
        return { success: false, error: "Not authenticated" };
      }

      if (updates.email && findUserByEmail(updates.email, user.id)) {
        return { success: false, error: "Email is already in use" };
      }

      setUser((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          ...updates,
        };
      });

      return { success: true };
    },
    [user]
  );

  const changePassword = useCallback(
    (currentPassword: string, newPassword: string) => {
      if (!user) {
        return { success: false, error: "Not authenticated" };
      }

      if (newPassword.length < 6) {
        return { success: false, error: "New password must be at least 6 characters" };
      }

      if (!verifyPassword(user.id, currentPassword)) {
        return { success: false, error: "Current password is incorrect" };
      }

      setStoredPassword(user.id, newPassword);
      return { success: true };
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateProfile,
        changePassword,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
