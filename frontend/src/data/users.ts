export type UserRole = "admin" | "staff";

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  name: string;
  title: string;
  avatar: string;
}

export type AuthUser = Omit<User, "password">;

export const users: User[] = [
  {
    id: "1",
    email: "admin@ninamart.com",
    password: "admin123",
    role: "admin",
    name: "Admin",
    title: "Super Administrator",
    avatar: "https://i.pravatar.cc/40?img=68",
  },
  {
    id: "2",
    email: "ahmed@ninamart.com",
    password: "staff123",
    role: "staff",
    name: "Ahmed Hassan",
    title: "Sales Staff",
    avatar: "https://i.pravatar.cc/40?img=12",
  },
];

export function authenticate(
  email: string,
  password: string
): User | null {
  const user = users.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  return user ?? null;
}

const PASSWORD_OVERRIDES_KEY = "ninamart_password_overrides";

export function getStoredPassword(userId: string, fallback: string): string {
  try {
    const stored = localStorage.getItem(PASSWORD_OVERRIDES_KEY);
    if (!stored) return fallback;
    const overrides = JSON.parse(stored) as Record<string, string>;
    return overrides[userId] ?? fallback;
  } catch {
    return fallback;
  }
}

export function setStoredPassword(userId: string, password: string): void {
  try {
    const stored = localStorage.getItem(PASSWORD_OVERRIDES_KEY);
    const overrides = stored
      ? (JSON.parse(stored) as Record<string, string>)
      : {};
    overrides[userId] = password;
    localStorage.setItem(PASSWORD_OVERRIDES_KEY, JSON.stringify(overrides));
  } catch {
    /* ignore storage errors */
  }
}

export function verifyPassword(userId: string, password: string): boolean {
  const user = users.find((u) => u.id === userId);
  if (!user) return false;
  const currentPassword = getStoredPassword(userId, user.password);
  return currentPassword === password;
}

export function findUserByEmail(email: string, excludeId?: string): boolean {
  return users.some(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() &&
      u.id !== excludeId
  );
}
