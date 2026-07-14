import { useEffect, useState } from "react";
import NinaLogo from "./NinaLogo";

interface SaleLoadingModalProps {
  open: boolean;
  onComplete?: () => void;
  duration?: number;
}

const STEPS = [
  "Validating sale details...",
  "Processing payment...",
  "Generating invoice...",
  "Finalizing transaction...",
];

export default function SaleLoadingModal({
  open,
  onComplete,
  duration = 2400,
}: SaleLoadingModalProps) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (!open) {
      setStepIndex(0);
      return;
    }

    const stepInterval = setInterval(() => {
      setStepIndex((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, duration / STEPS.length);

    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, duration);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(completeTimer);
    };
  }, [open, duration, onComplete]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="flex w-full max-w-xs flex-col items-center rounded-2xl bg-white px-8 py-10 shadow-2xl">
        <NinaLogo size="lg" animated variant="spin" />
        <p className="mt-5 text-sm font-semibold text-slate-800">
          Processing Sale
        </p>
        <p className="mt-1 text-xs text-slate-400">{STEPS[stepIndex]}</p>
        <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500 ease-out"
            style={{
              width: `${((stepIndex + 1) / STEPS.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
