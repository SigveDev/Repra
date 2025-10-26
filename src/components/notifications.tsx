"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01StrokeStandard } from "@hugeicons-pro/core-stroke-standard";

type NotificationOptions = {
  icon?: React.ReactNode;
  header?: string;
  content?: React.ReactNode;
  duration?: number; // milliseconds. 0 = sticky
};

type NotificationItem = NotificationOptions & {
  id: string;
};

type NotificationContextShape = {
  showNotification: (opts: NotificationOptions) => string;
  removeNotification: (id: string) => void;
};

const NotificationContext = createContext<NotificationContextShape | null>(
  null
);

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error("useNotification must be used within NotificationProvider");
  return ctx;
}

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<NotificationItem[]>([]);

  const removeNotification = useCallback((id: string) => {
    setItems((s) => s.filter((i) => i.id !== id));
  }, []);

  const showNotification = useCallback((opts: NotificationOptions) => {
    const id = `${Date.now().toString(36)}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;
    const item: NotificationItem = { id, ...opts };
    // newest on top
    setItems((s) => [item, ...s]);

    // set a default duration value on the item object (NotificationCard
    // will manage the actual countdown so we don't schedule a provider-level timer)
    if (opts.duration === undefined) opts.duration = 4000;

    return id;
  }, []);

  const ctx = useMemo(
    () => ({ showNotification, removeNotification }),
    [showNotification, removeNotification]
  );

  return (
    <NotificationContext.Provider value={ctx}>
      {children}

      {/* Notification container */}
      <div className="fixed top-4 left-1/2 z-[99999] w-full max-w-screen-sm -translate-x-1/2 px-4 pointer-events-none">
        <div className="flex flex-col items-center gap-3">
          <AnimatePresence initial={false}>
            {items.map((it) => (
              <NotificationCard
                key={it.id}
                item={it}
                onClose={() => removeNotification(it.id)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </NotificationContext.Provider>
  );
};

const NotificationCard: React.FC<{
  item: NotificationItem;
  onClose: () => void;
}> = ({ item, onClose }) => {
  const [expanded, setExpanded] = useState(false);
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const [canToggle, setCanToggle] = React.useState(false);

  // Timer refs for auto-dismiss so we can pause/resume when expanded
  const timerRef = React.useRef<number | null>(null);
  const startTimeRef = React.useRef<number>(0);
  const remainingRef = React.useRef<number | null>(
    item.duration === undefined ? 4000 : item.duration
  );

  // Measure overflow and update when content changes or resizes
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const check = () => {
      // Detect vertical overflow (multi-line) OR horizontal overflow (single-line truncate)
      const verticalOverflow = el.scrollHeight > el.clientHeight + 1;
      const horizontalOverflow = el.scrollWidth > el.clientWidth + 1;
      const overflow = verticalOverflow || horizontalOverflow;
      if (overflow) setCanToggle(true); // once overflowing, allow toggle (keeps button visible while expanded)
    };

    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    window.addEventListener("resize", check);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", check);
    };
  }, [item.content]);

  // Start the timer on mount (if duration > 0) and handle cleanup
  useEffect(() => {
    const duration = item.duration === undefined ? 4000 : item.duration;
    if (duration <= 0) return;

    // start if not expanded
    if (!expanded) {
      startTimeRef.current = Date.now();
      remainingRef.current = remainingRef.current ?? duration;
      timerRef.current = window.setTimeout(() => {
        timerRef.current = null;
        onClose();
      }, remainingRef.current ?? duration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current as number);
        const elapsed = Date.now() - startTimeRef.current;
        remainingRef.current = Math.max(
          0,
          (remainingRef.current ?? duration) - elapsed
        );
        timerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pause/resume timer on expand toggle
  useEffect(() => {
    const duration = item.duration === undefined ? 4000 : item.duration;
    if (duration <= 0) return;

    if (expanded) {
      // pause
      if (timerRef.current) {
        clearTimeout(timerRef.current as number);
        const elapsed = Date.now() - startTimeRef.current;
        remainingRef.current = Math.max(
          0,
          (remainingRef.current ?? duration) - elapsed
        );
        timerRef.current = null;
      }
    } else {
      // resume
      if (!timerRef.current && (remainingRef.current ?? 0) > 0) {
        startTimeRef.current = Date.now();
        timerRef.current = window.setTimeout(() => {
          timerRef.current = null;
          onClose();
        }, remainingRef.current ?? duration);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);

  // ensure cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current as number);
        timerRef.current = null;
      }
    };
  }, []);

  return (
    <motion.div
      layout
      initial={{ y: -24, opacity: 0, scale: 0.98 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: -12, opacity: 0, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 700, damping: 30 }}
      className="pointer-events-auto w-full"
    >
      <div className="w-full backdrop-blur-sm border border-fg-tertiary bg-bg-secondary rounded-xl shadow-lg p-3 flex items-start gap-3">
        <div className="flex-1 min-w-0">
          {item.header ? (
            <div className="text-lg font-semibold truncate flex flex-row gap-2">
              {item.icon}
              {item.header}
            </div>
          ) : null}
          <div
            ref={contentRef}
            className={`text-base mt-1 text-fg-secondary ${
              expanded ? "whitespace-normal" : "truncate"
            }`}
            style={{ maxHeight: expanded ? undefined : 40 }}
          >
            {item.content}
          </div>
          {canToggle || expanded ? (
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={() => setExpanded((s) => !s)}
                className="text-xs text-primary font-semibold"
              >
                {expanded ? "Show less" : "Show more"}
              </button>
            </div>
          ) : null}
        </div>

        <div className="ml-2 flex-shrink-0 self-start">
          <button
            onClick={onClose}
            aria-label="Dismiss notification"
            className="text-sm text-fg-secondary/80"
          >
            <HugeiconsIcon icon={Cancel01StrokeStandard} className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationProvider;
