"use client";

import { useRef, useState } from "react";

const HEAT = ["bg-cell", "bg-heat-1", "bg-heat-2", "bg-heat-3", "bg-heat-4"];
const level = (n) => (n === 0 ? 0 : n === 1 ? 1 : n <= 3 ? 2 : n <= 5 ? 3 : 4);
const dateFormat = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
// Weeks shown on small screens, counted back from today.
const MOBILE_WEEKS = 26;

export default function SubmissionHeatmap({ weeks, labels }) {
  const wrap = useRef(null);
  const [tip, setTip] = useState(null);

  function onPointerOver(event) {
    const cell = event.target.closest("[data-date]");
    if (!cell) return setTip(null);
    const box = wrap.current.getBoundingClientRect();
    const rect = cell.getBoundingClientRect();
    const x = rect.left + rect.width / 2 - box.left;
    setTip({
      x: Math.min(Math.max(x, 90), box.width - 90),
      y: rect.top - box.top,
      date: cell.dataset.date,
      count: Number(cell.dataset.count),
    });
  }

  return (
    <div ref={wrap} className="relative" onPointerOver={onPointerOver} onPointerLeave={() => setTip(null)}>
      <div className="flex justify-end sm:justify-between">
        {weeks.map((week, i) => (
          <div key={i} className={`flex-col ${i < weeks.length - MOBILE_WEEKS ? "hidden sm:flex" : "flex"}`} style={{ "--c": i }}>
            <span className="relative h-4">
              <span className="absolute top-0 left-px text-[11px] whitespace-nowrap text-muted-fg">{labels[i]}</span>
            </span>
            {week.map((day, d) =>
              day ? (
                // The outer span is the hit area (cell + gap); the inner one is the painted cell.
                <span key={d} data-date={day.date} data-count={day.count} className="group p-[1.5px]">
                  <span
                    className={`heat-cell block size-2.5 rounded-[2px] ${HEAT[level(day.count)]} group-hover:outline group-hover:outline-1 group-hover:outline-offset-1 group-hover:outline-fg`}
                  />
                </span>
              ) : (
                <span key={d} className="size-[13px]" />
              ),
            )}
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-end gap-1 text-xs text-muted-fg" aria-hidden="true">
        Less
        {HEAT.map((cls) => (
          <span key={cls} className={`size-2.5 rounded-[2px] ${cls}`} />
        ))}
        More
      </div>
      {tip && (
        <div
          role="tooltip"
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-md border border-line bg-bg px-2.5 py-1.5 text-xs whitespace-nowrap shadow-lg"
          style={{ left: tip.x, top: tip.y - 6 }}
        >
          <span className="font-semibold text-fg">
            {tip.count} submission{tip.count === 1 ? "" : "s"}
          </span>
          <span className="ml-1.5 text-muted-fg">{dateFormat.format(new Date(tip.date))}</span>
        </div>
      )}
    </div>
  );
}
