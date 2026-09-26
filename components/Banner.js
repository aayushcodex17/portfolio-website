"use client";

import { useEffect, useRef, useState } from "react";
import { seedCandles, tickCandles, toGrid } from "@/lib/candles";
import { prefersReducedMotion } from "@/lib/motion";

const COLS = 52;
const ROWS = 9;
const TICK_MS = 450;

const CELL = {
  up: "bg-accent",
  down: "bg-down",
  wick: "bg-muted-fg/45",
};

export default function Banner() {
  const ref = useRef(null);
  const [candles, setCandles] = useState(() => seedCandles(COLS, 7));

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let visible = true;
    let tick = 0;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(ref.current);
    // Let the intro animation finish before the market starts moving.
    let interval;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        if (!visible || document.hidden) return;
        tick++;
        setCandles((prev) => tickCandles(prev, tick));
      }, TICK_MS);
    }, 1600);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  const grid = toGrid(candles, ROWS);

  return (
    <div ref={ref} aria-hidden="true" className="flex justify-end gap-1 overflow-hidden px-4 py-4 sm:justify-between">
      {candles.map((candle, x) => (
        // Outer: one-time slide-in (staggered for the first frame). Inner: pulse on the forming candle.
        <div key={candle.id} className="candle shrink-0" style={{ "--c": candle.id < COLS ? candle.id : 0 }}>
          <div className={`flex flex-col gap-1 ${x === COLS - 1 ? "live-candle" : ""}`}>
            {grid[x].map((kind, y) => (
              <span key={y} className={`size-2.5 rounded-[2px] transition-colors duration-300 ${kind ? CELL[kind] : "bg-cell"}`} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
