import { SearchX } from "lucide-react";

export const EmptyDataResponse = ({
  title,
  message,
}: {
  title: string;
  message: string;
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[260px] p-8 border border-dashed rounded-xl bg-rose-50/10 dark:bg-rose-950/5 border-rose-200/50">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-950/40">
        <SearchX className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground text-center max-w-sm">
        {message}
      </p>
    </div>
  );
};

