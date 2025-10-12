import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { forwardRef, AnchorHTMLAttributes, ReactNode } from "react";

type LargeCardProps = {
  href: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
  className?: string;
  children?: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const LargeCard = forwardRef<HTMLAnchorElement, LargeCardProps>(
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
        "w-40 h-fit flex-shrink-0 flex flex-col gap-0.5",
        className
      )}
      ref={ref}
      {...props}
    >
      <div className="w-full aspect-square relative rounded-xl">
        <Image
          src={imageSrc}
          alt={imageAlt}
          className="rounded-xl"
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

LargeCard.displayName = "LargeCard";

export default LargeCard;
