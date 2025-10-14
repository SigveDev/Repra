"use client";

import Image from "next/image";
import Stopwatch from "./stopwatch";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AddCircleStrokeStandard,
  ArrowDown01StrokeStandard,
} from "@hugeicons-pro/core-stroke-standard";
import { useEffect, useState } from "react";
import { DateTimeStrokeRounded } from "@hugeicons-pro/core-stroke-rounded";
import { motion, useMotionValue, animate, type PanInfo } from "framer-motion";

function Player() {
  const [open, setOpen] = useState(false);
  const [startTime] = useState<Date>(new Date());
  const y = useMotionValue(0);

  useEffect(() => {
    const primaryDark = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-primary-dark")
      .trim();
    const defaultBackgroundColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-bg-primary")
      .trim();
    let metaThemeColor = document.querySelector("meta[name='theme-color']");
    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.setAttribute("name", "theme-color");
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute(
      "content",
      open ? primaryDark : defaultBackgroundColor
    );
  }, [open]);

  useEffect(() => {
    if (!open) {
      animate(y, 0, { duration: 0.12 });
    }
  }, [open, y]);

  return (
    <div>
      <motion.div
        aria-hidden={!open}
        className={`fixed h-screen w-full left-0 top-0 p-4 z-50 bg-primary-dark flex flex-col gap-4 transition-transform duration-100 ease-linear transform ${
          open
            ? "translate-y-0 pointer-events-auto"
            : "translate-y-full pointer-events-none"
        }`}
        style={{ top: 0, y }}
        drag={open ? "y" : false}
        dragConstraints={{ top: 0, bottom: 9999 }}
        dragDirectionLock
        onDragEnd={(event: PointerEvent, info: PanInfo) => {
          const THRESHOLD = 80;
          if (info.offset.y > THRESHOLD) {
            animate(y, window.innerHeight, { duration: 0.15 }).then(() => {
              y.set(0);
              setOpen(false);
            });
          } else {
            animate(y, 0, { duration: 0.12 });
          }
        }}
      >
        <div className="w-full h-14 flex justify-center items-center">
          <div className="w-fit h-fit flex justify-center items-center gap-2">
            <HugeiconsIcon
              icon={DateTimeStrokeRounded}
              size="1rem"
              className="text-fg-secondary"
            />
            <span className="text-sm">Push</span>
          </div>
        </div>
        <div className="w-full h-fit flex flex-col justify-center items-center">
          <h1
            className="text-fg-primary font-semibold text-6xl"
            style={{
              fontVariantNumeric: "tabular-nums",
              minWidth: "8ch",
              textAlign: "center",
            }}
          >
            <Stopwatch startDate={startTime.toISOString()} />
          </h1>
          <span className="text-fg-secondary text-sm">Elapsed Time</span>
        </div>
        <div className="w-fit h-fit fixed top-4 left-7">
          <button
            className="text-fg-secondary text-sm h-14 flex justify-center items-center"
            onClick={() => setOpen(false)}
          >
            <HugeiconsIcon
              icon={ArrowDown01StrokeStandard}
              className="w-6 h-6"
            />
          </button>
        </div>
      </motion.div>

      <div
        aria-hidden={open}
        className={`fixed h-[var(--mobile-player-height)] w-full left-0 bottom-[var(--mobile-menu-height)] px-2 z-40 ${
          open ? "pointer-events-none hidden" : "pointer-events-auto block"
        }`}
      >
        <button
          className="h-full w-full bg-primary-dark rounded-lg flex flex-row items-center justify-center text-fg-primary p-2 gap-2"
          onClick={() => setOpen(true)}
        >
          <div className="h-full aspect-square relative rounded-sm">
            <Image
              src="/images/fallback.webp"
              alt="Workout Image"
              className="rounded-sm"
              fill
            />
          </div>
          <div className="grow h-full flex flex-col justify-center items-start gap-1">
            <div className="text-fg-primary font-semibold text-sm leading-tight">
              <Stopwatch startDate={startTime.toISOString()} />
            </div>
            <div className="text-fg-secondary text-xs leading-tight font-bold">
              Push{" "}
              <span className="font-normal">&bull; Incline Dumbell Press</span>
            </div>
          </div>
          <div className="h-full w-fit flex justify-center items-center pr-3">
            <HugeiconsIcon
              icon={AddCircleStrokeStandard}
              className="w-8 h-8 text-fg-secondary"
            />
          </div>
        </button>
      </div>
    </div>
  );
}

export default Player;
