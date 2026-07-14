import { useNavigate } from "react-router-dom";
import type { MouseEvent, ReactNode } from "react";

interface StaffProfileLinkProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function StaffProfileLink({
  children,
  className = "",
  onClick,
}: StaffProfileLinkProps) {
  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.();
    navigate("/staff/profile");
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
