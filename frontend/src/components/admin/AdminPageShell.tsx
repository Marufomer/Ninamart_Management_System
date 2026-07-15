import type { ReactNode } from "react";

interface AdminPageShellProps {
  title: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
}

export default function AdminPageShell({
  title,
  description,
  children,
  action,
}: AdminPageShellProps) {
  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-800 sm:text-xl">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          )}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
