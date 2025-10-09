import { cn } from "@/lib/utils";
import { forwardRef, LabelHTMLAttributes } from "react";

const Label = forwardRef<
  HTMLLabelElement,
  LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn("block text-sm font-bold text-fg-primary", className)}
      {...props}
    />
  );
});

Label.displayName = "Label";

export default Label;
