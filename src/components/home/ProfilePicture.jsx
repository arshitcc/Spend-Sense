import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfilePicture({ src, alt, size = 150, isLoading = false }) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-full overflow-hidden",
        `w-[${size}px] h-[${size}px]`
      )}
      style={{ width: size, height: size }}
    >
      {isLoading ? (
        <Skeleton className="w-full h-full rounded-full" />
      ) : (
        <img
          src={src}
          alt={alt}
          className="object-cover w-full h-full"
          style={{ borderRadius: "50%" }}
        />
      )}
    </div>
  );
}
