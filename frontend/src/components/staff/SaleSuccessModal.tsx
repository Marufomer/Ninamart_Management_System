import { CheckCircle2 } from "lucide-react";
import NinaLogo from "./NinaLogo";

interface SaleSuccessModalProps {
  open: boolean;
  invoiceNo: string;
  total: string;
  onClose: () => void;
}

export default function SaleSuccessModal({
  open,
  invoiceNo,
  total,
  onClose,
}: SaleSuccessModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">
        <div className="mx-auto mb-4 flex justify-center">
          <div className="relative">
            <NinaLogo size="md" animated variant="pulse" />
            <CheckCircle2 className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-white text-emerald-500" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-slate-800">Sale Completed!</h3>
        <p className="mt-1 text-sm text-slate-500">
          Transaction processed successfully
        </p>
        <div className="mt-4 rounded-xl bg-emerald-50 p-3">
          <p className="text-[11px] text-emerald-600">Invoice</p>
          <p className="font-mono text-sm font-semibold text-emerald-800">
            {invoiceNo}
          </p>
          <p className="mt-1 text-lg font-bold text-emerald-700">{total}</p>
        </div>
        <button
          onClick={onClose}
          className="mt-5 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-110"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
