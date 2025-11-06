import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { forwardRef, AnchorHTMLAttributes, ReactNode, Ref } from "react";
import { Skeleton } from "./skeleton";

type LargeCardProps = {
  href: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
  className?: string;
  children?: ReactNode;
  type?: "default" | "loading";
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const LargeCard = forwardRef<
  HTMLAnchorElement | HTMLDivElement,
  LargeCardProps
>(
  (
    {
      href,
      imageSrc,
      imageAlt,
      title,
      subtitle,
      className,
      children,
      type = "default",
      ...props
    },
    ref
  ) => {
    // render a non-interactive div while loading, otherwise render the Link
    if (type === "loading") {
      return (
        <div
          ref={ref as unknown as Ref<HTMLDivElement>}
          className={cn(
            "w-40 h-fit flex-shrink-0 flex flex-col gap-0.5",
            className
          )}
          aria-busy
        >
          <div className="w-full aspect-square relative rounded-xl">
            <Skeleton className="w-full h-full rounded-xl" />
          </div>

          <div className="w-full h-fit flex flex-col justify-center items-start text-sm">
            <Skeleton className="h-4 w-28 rounded-md mb-1" />
            <Skeleton className="h-3 w-20 rounded-md" />
          </div>
        </div>
      );
    }

    return (
      <Link
        href={href}
        className={cn(
          "w-40 h-fit flex-shrink-0 flex flex-col gap-0.5",
          className
        )}
        ref={ref as unknown as Ref<HTMLAnchorElement>}
        {...props}
      >
        <div className="w-full aspect-square relative rounded-xl">
          <Image
            loader={() => imageSrc}
            src={imageSrc}
            alt={imageAlt}
            className="rounded-xl object-cover"
            fill
            priority
            unoptimized
          />
        </div>
        <div className="w-full h-fit flex flex-col justify-center items-start text-sm">
          <span className="text-fg-primary">{title}</span>
          {subtitle && (
            <span className="text-fg-secondary text-xs">{subtitle}</span>
          )}
          {children}
        </div>
      </Link>
    );
  }
);

LargeCard.displayName = "LargeCard";

export default LargeCard;
