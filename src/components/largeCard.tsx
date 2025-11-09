"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { forwardRef, Ref } from "react";
import { Skeleton } from "./skeleton";
import CustomImage from "./CustomImage";

type LargeCardProps = {
  href: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
  className?: string;
  type?: "default" | "loading";
};

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
      type = "default",
      ...props
    },
    ref
  ) => {
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
        <div className="w-full aspect-square relative rounded-xl overflow-hidden">
          <CustomImage src={imageSrc} alt={imageAlt} className="rounded-xl" />
        </div>
        <div className="w-full h-fit flex flex-col justify-center items-start text-sm">
          <span className="text-fg-primary">{title}</span>
          {subtitle && (
            <span className="text-fg-secondary text-xs">{subtitle}</span>
          )}
        </div>
      </Link>
    );
  }
);

LargeCard.displayName = "LargeCard";

export default LargeCard;
