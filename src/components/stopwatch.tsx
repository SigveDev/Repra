import React, { useState, useEffect } from "react";

interface StopwatchProps {
  startDate: string; // ISO date string
}

export default function Stopwatch({ startDate }: StopwatchProps) {
  const [elapsed, setElapsed] = useState("00:00:00");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const start = new Date(startDate);
      const diff = now.getTime() - start.getTime();

      if (diff < 0) {
        setElapsed("00:00:00");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const formatted = [
        hours.toString().padStart(2, "0"),
        minutes.toString().padStart(2, "0"),
        seconds.toString().padStart(2, "0"),
      ].join(":");

      setElapsed(formatted);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return <>{elapsed}</>;
}
