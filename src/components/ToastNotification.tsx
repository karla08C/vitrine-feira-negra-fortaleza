import React, { useState, useEffect } from "react";
import { CircleCheck, X } from "lucide-react";
import { ToastInfo } from "../types";

interface ToastNotificationProps {
  toast: ToastInfo | null;
  onFechar: () => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ toast, onFechar }) => {
  const [saindo, setSaindo] = useState(false);

  useEffect(() => {
    if (!toast) return;
    setSaindo(false);
    const timer = setTimeout(() => {
      setSaindo(true);
      setTimeout(onFechar, 280);
    }, 4200);
    return () => clearTimeout(timer);
  }, [toast, onFechar]);

  function fecharComAnimacao() {
    setSaindo(true);
    setTimeout(onFechar, 200);
  }

  if (!toast) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] w-[92%] max-w-md pointer-events-auto">
      <div
        className={`flex items-start gap-3 bg-card rounded-2xl border border-border shadow-2xl px-5 py-4 ${
          saindo ? "animate-toast-out" : "animate-toast-in"
        }`}
      >
        <div className="shrink-0 w-9 h-9 rounded-full bg-[hsl(16_60%_38%_/_0.12)] flex items-center justify-center">
          <CircleCheck className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-foreground leading-tight">{toast.titulo}</p>
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{toast.mensagem}</p>
        </div>
        <button
          id="toast-close-btn"
          onClick={fecharComAnimacao}
          className="shrink-0 w-7 h-7 rounded-full hover:bg-secondary flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Fechar aviso"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};
