import { useEffect } from "react";

function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timer = window.setTimeout(onClose, 3200);
    return () => window.clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) {
    return null;
  }

  const tone =
    toast.type === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : "border-rose-200 bg-rose-50 text-rose-700";

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50 w-[min(92vw,24rem)]">
      <div className={`rounded-2xl border px-3 py-2 shadow-xl sm:px-4 sm:py-3 ${tone}`}>
        <p className="text-xs sm:text-sm font-semibold">{toast.title}</p>
        <p className="mt-1 text-xs sm:text-sm">{toast.message}</p>
      </div>
    </div>
  );
}

export default Toast;
