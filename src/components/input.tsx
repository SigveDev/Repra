import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes } from "react";

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  const hasValueProp = Object.prototype.hasOwnProperty.call(props, "value");
  const controlledValue = hasValueProp ? props.value ?? "" : undefined;
  const rest = { ...(props as InputHTMLAttributes<HTMLInputElement>) };
  delete (rest as Partial<InputHTMLAttributes<HTMLInputElement>>).value;
  return (
    <input
      ref={ref}
      className={cn(
        "w-full h-10 p-3 text-fg-secondary placeholder:text-fg-secondary/70 rounded-lg bg-bg-secondary/50",
        className
      )}
      {...rest}
      value={controlledValue}
    />
  );
});

Input.displayName = "Input";

export default Input;
