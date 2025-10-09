import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes } from "react";

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full h-10 p-3 text-fg-secondary/70 rounded-lg bg-bg-secondary/50",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;
