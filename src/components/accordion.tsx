import { cn } from "@/lib/utils";
import React, { useState, ReactNode, HTMLAttributes, forwardRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01StrokeStandard } from "@hugeicons-pro/core-stroke-standard";

interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  header: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ header, children, className, defaultOpen = false, ...props }, ref) => {
    const [open, setOpen] = useState(defaultOpen);

    return (
      <div
        ref={ref}
        className={cn(
          "border-b-2 border-[var(--color-bg-secondary)]",
          className
        )}
        {...props}
      >
        <button
          type="button"
          className={cn(
            "w-full flex justify-between items-center py-4 text-left font-semibold text-fg-primary text-xl focus:outline-none"
          )}
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
        >
          <span>{header}</span>
          <span
            className={cn(
              "transition-transform text-fg-secondary",
              open && "rotate-90"
            )}
          >
            <HugeiconsIcon
              icon={ArrowRight01StrokeStandard}
              className="h-6 w-6"
            />
          </span>
        </button>
        <div
          className={cn(
            "transition-[max-height] duration-300",
            open ? "max-h-96 overflow-y-auto" : "max-h-0 overflow-hidden"
          )}
          aria-hidden={!open}
        >
          <div className="pb-4 w-full h-[calc(100%_-_1rem)] overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    );
  }
);

Accordion.displayName = "Accordion";

export default Accordion;
