import { toast } from "sonner";

export const showSuccess = (
  message: string,
  reload?: boolean,
  navigate?: string,
) => {
  toast.success(message, {
    duration: 3000,
    onAutoClose: () => {
      if (navigate !== "" && navigate !== undefined) {
        window.location.href = navigate as string;
        return;
      }
      if (!reload) return;
      window.location.reload();
    },
  });
};

export const showError = (message: string, reload?: boolean) => {
  toast.error(message, {
    duration: 3000,
    style: {
      backgroundColor: "#ef4444",
      color: "#fff",
    },
    onAutoClose: () => {
      if (!reload) return;
      window.location.reload();
    },
  });
};
