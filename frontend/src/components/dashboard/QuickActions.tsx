import { useNavigate } from "react-router-dom";
import {
  Package,
  UserPlus,
  ShoppingCart,
  ClipboardList,
  Settings,
  FileText,
} from "lucide-react";
import { quickActions } from "../../data/mockData";

const iconMap: Record<string, React.ReactNode> = {
  package: <Package className="h-5 w-5 sm:h-6 sm:w-6" />,
  userPlus: <UserPlus className="h-5 w-5 sm:h-6 sm:w-6" />,
  shoppingCart: <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />,
  clipboard: <ClipboardList className="h-5 w-5 sm:h-6 sm:w-6" />,
  settings: <Settings className="h-5 w-5 sm:h-6 sm:w-6" />,
  fileText: <FileText className="h-5 w-5 sm:h-6 sm:w-6" />,
};

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:p-5">
      <h3 className="mb-3 text-sm font-semibold text-slate-800 sm:mb-4">
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={() => navigate(action.path)}
            className={`flex flex-col items-center gap-1.5 rounded-xl ${action.bg} p-3 transition hover:scale-[1.02] hover:shadow-md active:scale-[0.98] cursor-pointer sm:gap-2 sm:p-4`}
          >
            <span className={action.iconColor}>{iconMap[action.icon]}</span>
            <span className="text-center text-[10px] font-semibold leading-tight text-slate-700 sm:text-[11px]">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
