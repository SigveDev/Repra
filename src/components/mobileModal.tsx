"use client";

import React, {
  forwardRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { motion, PanInfo, useDragControls } from "framer-motion";
import { createPortal } from "react-dom";

interface MobileModalProps {
  children: ReactNode;
  className?: string;
  open?: boolean;
  onRequestClose?: () => void;
  onRequestOpen?: () => void;
}

interface TriggerProps {
  children: ReactNode;
  setOpen?: (v: boolean) => void;
}

export const Trigger = ({ children, setOpen }: TriggerProps) => {
  return (
    <div onClick={() => setOpen?.(true)} className="inline-block">
      {children}
    </div>
  );
};
Trigger.displayName = "MobileModal.Trigger";

interface ContentInjectedProps {
  open?: boolean;
  setOpen?: (v: boolean) => void;
  requestClose?: () => void;
  className?: string;
}

interface ContentProps extends ContentInjectedProps {
  children: ReactNode;
}

export const Content = forwardRef<HTMLDivElement, ContentProps>(
  ({ children, className, open = false, /* setOpen, */ requestClose }, ref) => {
    const sheetRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [mounted, setMounted] = useState(false);
    const dragControls = useDragControls();

    useEffect(() => void setMounted(true), []);

    useEffect(() => {
      if (open) document.body.style.overflow = "hidden";
      else document.body.style.overflow = "";
      return () => {
        document.body.style.overflow = "";
      };
    }, [open]);

    // global swipe detection
    const gestureRef = useRef({ tracking: false, startY: 0, startTime: 0 });
    useEffect(() => {
      if (!open) return;
      const g = gestureRef.current;
      const onPointerDown = (e: PointerEvent) => {
        if (!e.isPrimary) return;
        g.tracking = true;
        g.startY = e.clientY;
        g.startTime = Date.now();
      };
      const onPointerUp = (e: PointerEvent) => {
        if (!g.tracking) return;
        g.tracking = false;
        const deltaY = e.clientY - g.startY;
        const dt = Math.max(1, Date.now() - g.startTime);
        const velocity = (deltaY / dt) * 1000;
        if (deltaY > 120 || velocity > 800) {
          requestClose?.();
        }
      };
      document.addEventListener("pointerdown", onPointerDown);
      document.addEventListener("pointerup", onPointerUp);
      return () => {
        document.removeEventListener("pointerdown", onPointerDown);
        document.removeEventListener("pointerup", onPointerUp);
      };
    }, [open, requestClose]);

    if (!mounted) return null;

    const handleDragEnd = (_: unknown, info: PanInfo) => {
      const offsetY = info.offset.y;
      const velocityY = info.velocity.y;
      if (offsetY > 120 || velocityY > 800) requestClose?.();
    };

    const modal = (
      <div
        ref={containerRef}
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-[9999] flex items-end justify-center",
          !open && "pointer-events-none"
        )}
      >
        <div
          onClick={() => requestClose?.()}
          className={cn(
            "absolute inset-0 bg-black/40 transition-opacity",
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none",
            "z-0"
          )}
        />

        <motion.div
          ref={(node) => {
            sheetRef.current = node;
            // forward ref
            if (typeof ref === "function") ref(node as HTMLDivElement | null);
            else if (ref)
              (ref as React.MutableRefObject<HTMLDivElement | null>).current =
                node;
          }}
          role="dialog"
          aria-modal="true"
          className={cn(
            "w-full max-w-full bg-bg-secondary rounded-3xl shadow-none border-0 mb-[var(--mobile-menu-height)] z-10",
            className
          )}
          initial={{ y: "100%", opacity: 0 }}
          animate={open ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
          transition={{ type: "tween", duration: 0.18 }}
          drag={"y"}
          dragDirectionLock
          dragControls={dragControls}
          dragListener={false}
          dragConstraints={containerRef}
          dragElastic={0.25}
          dragMomentum={true}
          onDragEnd={handleDragEnd}
          onClick={(e) => e.stopPropagation()}
          style={{ maxHeight: "85vh" }}
        >
          <div className="px-4 py-4 overflow-y-auto">{children}</div>
        </motion.div>
      </div>
    );

    return createPortal(modal, document.body);
  }
);
Content.displayName = "MobileModal.Content";

const MobileModal: React.FC<MobileModalProps> & {
  Trigger: React.FC<TriggerProps>;
  Content: typeof Content;
} = ({
  children,
  className,
  open: controlledOpen,
  onRequestClose,
  onRequestOpen,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? !!controlledOpen : internalOpen;

  const requestOpen = () => {
    if (isControlled) onRequestOpen?.();
    else setInternalOpen(true);
  };

  const requestClose = () => {
    if (isControlled) onRequestClose?.();
    else setInternalOpen(false);
  };

  const setOpen = (v: boolean) => (v ? requestOpen() : requestClose());

  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    const el = child as React.ReactElement;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const typeAny = (el.type as any) || {};
    if (el.type === Trigger || typeAny.displayName === "MobileModal.Trigger") {
      return React.cloneElement(el, { setOpen } as any);
    }
    if (el.type === Content || typeAny.displayName === "MobileModal.Content") {
      return React.cloneElement(el, { open, setOpen, requestClose } as any);
    }
    /* eslint-enable @typescript-eslint/no-explicit-any */
    return el;
  });

  return <div className={cn("", className)}>{enhancedChildren}</div>;
};

MobileModal.Trigger = Trigger;
MobileModal.Content = Content;

export default MobileModal;
