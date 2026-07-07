import { cn } from "@/lib/utils";

// Skeleton brand Y viện: shimmer kem/cát tiết chế (không xám lạnh), tôn reduced-motion.
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse bg-sand/50 motion-reduce:animate-none", className)}
      {...props}
    />
  );
}

export { Skeleton };
