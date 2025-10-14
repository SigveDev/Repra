import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { forwardRef, AnchorHTMLAttributes, ReactNode } from "react";

type ListCardProps = {
  href: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
  style?: "default" | "profile";
  state?: "default" | "active" | "disabled";
  className?: string;
  children?: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const ListCard = forwardRef<HTMLAnchorElement, ListCardProps>(
  (
    {
      href,
      imageSrc,
      imageAlt,
      title,
      subtitle,
      style = "default",
      state = "default",
      className,
      children,
      ...props
    },
    ref
  ) => (
    <Link
      href={href}
      className={cn(
        "w-full h-14 flex-shrink-0 flex flex-row gap-3 items-center",
        className
      )}
      ref={ref}
      {...props}
    >
      <div className="h-full aspect-square relative rounded-sm">
        <Image
          src={imageSrc}
          alt={imageAlt}
          className={`${style === "profile" ? "rounded-full" : "rounded-sm"} ${
            state === "disabled"
              ? "opacity-50 grayscale"
              : state === "active"
              ? "border-2 border-primary"
              : ""
          }`}
          fill
          priority
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
  )
);

ListCard.displayName = "ListCard";

export default ListCard;
