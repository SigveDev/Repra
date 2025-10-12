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
          className="rounded-sm"
          fill
          priority
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
  )
);

ListCard.displayName = "ListCard";

export default ListCard;
