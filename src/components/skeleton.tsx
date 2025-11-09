import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "relative overflow-hidden rounded-md isolate",
        "bg-[color:theme(colors.bg-primary)]",
        className
      )}
      {...props}
    >
      {/* first shimmer */}
      <div
        className={cn(
          "absolute inset-0",
          "bg-[linear-gradient(115deg,transparent_20%,rgba(255,255,255,0.12)_50%,transparent_80%)]",
          "bg-[length:200%_100%] bg-no-repeat",
          "animate-[shimmer_3s_linear_infinite]"
        )}
      />

      {/* second shimmer — delayed & offset slightly */}
      <div
        className={cn(
          "absolute inset-0",
          "bg-[linear-gradient(115deg,transparent_15%,rgba(255,255,255,0.12)_45%,transparent_75%)]",
          "bg-[length:200%_100%] bg-no-repeat",
          "animate-[shimmer_3s_linear_infinite]",
          "[animation-delay:1.5s]"
        )}
      />
    </div>
  );
}

export { Skeleton };
