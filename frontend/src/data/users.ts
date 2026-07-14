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
