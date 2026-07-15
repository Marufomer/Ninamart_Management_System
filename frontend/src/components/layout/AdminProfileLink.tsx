import { useNavigate } from "react-router-dom";
import type { MouseEvent, ReactNode } from "react";

interface AdminProfileLinkProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function AdminProfileLink({
  children,
  className = "",
  onClick,
}: AdminProfileLinkProps) {
  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.();
    navigate("/dashboard/profile");
    event.currentTarget.blur();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`cursor-pointer transition hover:opacity-90 ${className}`}
      aria-label="Go to profile"
    >
      {children}
    </button>
  );
}
