"use client";

import { useEffect, useRef, useState } from "react";

const HEIGHT = 240;
const M = { top: 28, right: 44, bottom: 28, left: 44 };
const KNIGHT = 1850;
const DAY = 86_400_000;
const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
const monthFormat = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" });

function monthTicks(from, to) {
  const ticks = [];
  const d = new Date(from);
  let t = Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1);
  while (t <= to) {
    ticks.push(t);
    const n = new Date(t);
    t = Date.UTC(n.getUTCFullYear(), n.getUTCMonth() + 1, 1);
  }
  return ticks;
}

export default function RatingChart({ points }) {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const ratings = points.map((p) => p.rating);
  const peak = points.reduce((best, p, i) => (p.rating > points[best].rating ? i : best), 0);
  const last = points.length - 1;
  const lo = Math.floor((Math.min(...ratings) - 5) / 50) * 50;
  const hi = Math.ceil((Math.max(...ratings, KNIGHT) + 15) / 50) * 50;
  const pad = Math.max((points[last].t - points[0].t) * 0.03, 3 * DAY);
  const t0 = points[0].t - pad;
  const t1 = points[last].t + pad;
  const plotW = Math.max(width - M.left - M.right, 1);
  const x = (t) => M.left + ((t - t0) / (t1 - t0)) * plotW;
  const y = (r) => M.top + (1 - (r - lo) / (hi - lo)) * (HEIGHT - M.top - M.bottom);

  const yTicks = [];
  for (let v = lo; v <= hi; v += 50) yTicks.push(v);
  const xTicks = monthTicks(t0, t1).filter((_, i, all) => plotW >= 420 || i % 2 === (all.length - 1) % 2);
  const path = points.map((p, i) => `${i ? "L" : "M"}${x(p.t).toFixed(1)},${y(p.rating).toFixed(1)}`).join("");

  function onPointerMove(event) {
    const px = event.clientX - ref.current.getBoundingClientRect().left;
    let nearest = 0;
    points.forEach((p, i) => {
      if (Math.abs(x(p.t) - px) < Math.abs(x(points[nearest].t) - px)) nearest = i;
    });
    setActive(nearest);
  }

  function onKeyDown(event) {
    if (event.key === "ArrowLeft") setActive((i) => Math.max((i ?? last) - 1, 0));
    else if (event.key === "ArrowRight") setActive((i) => Math.min((i ?? 0) + 1, last));
    else if (event.key === "Escape") setActive(null);
    else return;
    event.preventDefault();
  }

  const a = active != null ? points[active] : null;
  const ax = a ? x(a.t) : 0;

  return (
    <div
      ref={ref}
      className="relative rounded-sm outline-offset-4 focus-visible:outline-2 focus-visible:outline-fg"
      style={{ height: HEIGHT }}
      tabIndex={0}
      role="group"
      aria-label={`Contest rating across ${points.length} contests: started at ${points[0].rating}, peaked at ${points[peak].rating}, now ${points[last].rating}. Use the arrow keys to step through contests.`}
      onPointerMove={onPointerMove}
      onPointerLeave={() => setActive(null)}
      onFocus={() => setActive((i) => i ?? last)}
      onBlur={() => setActive(null)}
      onKeyDown={onKeyDown}
    >
      {width > 0 && (
        <svg width={width} height={HEIGHT} className="block overflow-visible select-none" aria-hidden="true">
          {yTicks.map((v) => (
            <g key={v}>
              <line x1={M.left} x2={width - M.right} y1={y(v)} y2={y(v)} stroke="var(--line)" strokeWidth="1" />
              <text x={M.left - 8} y={y(v)} dy="0.32em" textAnchor="end" className="fill-muted-fg text-[11px] tabular-nums">
                {v}
              </text>
            </g>
          ))}
          {xTicks.map((t) => {
            const month = monthFormat.format(t);
            const label = month === "Jan" || t === xTicks[0] ? `${month} ’${String(new Date(t).getUTCFullYear()).slice(2)}` : month;
            return (
              <text key={t} x={x(t)} y={HEIGHT - 8} textAnchor="middle" className="fill-muted-fg text-[11px]">
                {label}
              </text>
            );
          })}

          {KNIGHT <= hi && (
            <g className="chart-fade">
              <line x1={M.left} x2={width - M.right} y1={y(KNIGHT)} y2={y(KNIGHT)} stroke="var(--muted-fg)" strokeOpacity="0.6" strokeDasharray="4 4" />
              <text x={width - M.right} y={y(KNIGHT) - 6} textAnchor="end" className="fill-muted-fg text-[11px]">
                Knight · {KNIGHT}
              </text>
            </g>
          )}

          {a && <line x1={ax} x2={ax} y1={M.top - 8} y2={HEIGHT - M.bottom} stroke="var(--muted-fg)" strokeOpacity="0.5" strokeWidth="1" />}

          <path d={path} pathLength="1" className="draw-line" fill="none" stroke="var(--chart)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
          {points.map((p, i) => (
            <circle
              key={p.t}
              className="pop"
              style={{ "--i": i }}
              cx={x(p.t)}
              cy={y(p.rating)}
              r={i === active ? 5.5 : 4}
              fill="var(--chart)"
              stroke="var(--bg)"
              strokeWidth="2"
            />
          ))}

          {/* Direct labels: the peak above its point, the latest value at the line's end. */}
          {peak !== last && (
            <text x={x(points[peak].t)} y={y(points[peak].rating) - 12} textAnchor="middle" className="chart-fade fill-fg text-xs font-medium">
              peak {points[peak].rating}
            </text>
          )}
          <text x={x(points[last].t) + 10} y={y(points[last].rating)} dy="0.32em" className="chart-fade fill-fg text-xs font-medium">
            {points[last].rating}
          </text>
        </svg>
      )}

      <span className="sr-only" aria-live="polite">
        {a ? `${a.title}, ${dateFormat.format(a.t)}: rating ${a.rating}, rank ${a.rank}, ${a.solved} of ${a.of} solved.` : ""}
      </span>

      {a && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 z-10 rounded-md border border-line bg-bg px-3 py-2 text-xs whitespace-nowrap shadow-lg"
          style={ax < width / 2 ? { left: ax + 12 } : { right: width - ax + 12 }}
        >
          <p className="flex items-center gap-2">
            <span className="h-0.5 w-3 rounded-full bg-chart" aria-hidden="true" />
            <span className="text-sm font-semibold text-fg">{a.rating}</span>
            <span className="text-muted-fg">rating</span>
          </p>
          <p className="mt-1 text-fg">{a.title}</p>
          <p className="text-muted-fg">
            {dateFormat.format(a.t)} · rank {a.rank.toLocaleString("en-US")} · {a.solved}/{a.of} solved
          </p>
        </div>
      )}
    </div>
  );
}
