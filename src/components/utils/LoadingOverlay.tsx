import { Loader2 } from "lucide-react";

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/70 h-screen">
      <Loader2 className="h-10 w-10 animate-spin text-white" />

      <p className="mt-4 text-lg font-medium text-white">
        Memuat...
      </p>

      <p className="mt-1 text-sm text-white/70">
        Mohon tunggu sebentar.
      </p>
    </div>
  );
}