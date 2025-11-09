"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { forwardRef, AnchorHTMLAttributes, ReactNode, Ref } from "react";
import { Skeleton } from "./skeleton";
import CustomImage from "./CustomImage";

type ListCardProps = {
  href: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
  style?: "default" | "profile";
  type?: "default" | "loading";
  state?: "default" | "active" | "disabled";
  className?: string;
  children?: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const ListCard = forwardRef<HTMLAnchorElement | HTMLDivElement, ListCardProps>(
  (
    {
      href,
      imageSrc,
      imageAlt,
      title,
      subtitle,
      style = "default",
      type = "default",
      state = "default",
      className,
      children,
      ...props
    },
    ref
  ) => {
    if (type === "loading") {
      return (
        <div
          ref={ref as unknown as Ref<HTMLDivElement>}
          className={cn(
            "w-full h-14 flex-shrink-0 flex flex-row gap-3 items-center",
            className
          )}
          aria-busy
        >
          <div className="h-full aspect-square relative rounded-sm">
            <Skeleton
              className={`w-full h-full ${
                style === "profile" ? "rounded-full" : "rounded-sm"
              }`}
            />
          </div>

          <div className="w-full h-fit flex flex-col justify-center items-start text-sm">
            <Skeleton className="h-4 w-40 rounded-md mb-1" />
            <Skeleton className="h-3 w-28 rounded-md" />
          </div>
        </div>
      );
    }

    return (
      <Link
        href={href}
        className={cn(
          "w-full h-14 flex-shrink-0 flex flex-row gap-3 items-center",
          className
        )}
        ref={ref as unknown as Ref<HTMLAnchorElement>}
        {...props}
      >
        <div className="h-full aspect-square relative rounded-sm">
          <CustomImage
            src={imageSrc}
            alt={imageAlt}
            className={`${
              style === "profile" ? "rounded-full" : "rounded-sm"
            } ${
              state === "disabled"
                ? "opacity-50 grayscale"
                : state === "active"
                ? "border-2 border-primary"
                : ""
            }`}
          />
        </div>
        <div className="w-full h-fit flex flex-col justify-center items-start text-sm">
          <span
            className={
              state === "active" || state === "default"
                ? "text-fg-primary"
                : "text-fg-secondary"
            }
          >
            {title}
          </span>
          {subtitle && (
            <span
              className={`text-xs ${
                state === "active" || state === "default"
                  ? "text-fg-secondary"
                  : "text-fg-tertiary"
              }`}
            >
              {subtitle}
            </span>
          )}
          {children}
        </div>
      </Link>
    );
  }
);

ListCard.displayName = "ListCard";

export default ListCard;
