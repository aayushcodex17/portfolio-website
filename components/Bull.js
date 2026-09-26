"use client";

import { useEffect, useRef, useState } from "react";
import { BULL_BODY, BULL_LEGS } from "@/lib/bull";

const FILL = {
  B: "var(--chart)",
  L: "var(--bull-light)",
  S: "var(--bull-shade)",
  H: "var(--bull-horn)",
  F: "var(--bull-horn-far)",
  E: "#111",
  N: "var(--bull-nose)",
  T: "var(--chart)",
  K: "var(--muted-fg)",
};
const WIDTH = BULL_BODY[0].length;
const HEIGHT = BULL_BODY.length + BULL_LEGS[0].length;
const SCALE = 3;
const SPEED = 130; // px per second, so it crosses a phone and a wide screen at the same pace
const CALLS = ["▲ BULLISH", "▲ +1.8%", "▲ NEW HIGH", "▲ BUY SIGNAL", "▲ TO THE MOON"];

// One path per colour keeps the sprite to a handful of DOM nodes.
function toPaths(rows, dy = 0) {
  const paths = {};
  rows.forEach((row, y) =>
    [...row].forEach((c, x) => {
      if (c !== ".") paths[c] = (paths[c] ?? "") + `M${x} ${y + dy}h1v1h-1z`;
    }),
  );
  return Object.entries(paths);
}
const BODY = toPaths(BULL_BODY);
const LEGS = BULL_LEGS.map((frame) => toPaths(frame, BULL_BODY.length));

function Layer({ paths }) {
  return paths.map(([c, d]) => <path key={c} d={d} fill={FILL[c]} />);
}

// A bull that gallops along the bottom of the page. Hover to stop it, click to make it jump.
export default function Bull() {
  const track = useRef(null);
  const [duration, setDuration] = useState(12);
  const [call, setCall] = useState(null);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setDuration(Math.max(5, (entry.contentRect.width + 160) / SPEED / 0.88)));
    observer.observe(track.current);
    return () => observer.disconnect();
  }, []);

  function jump() {
    setCall((prev) => {
      const id = (prev?.id ?? -1) + 1;
      return { id, text: CALLS[id % CALLS.length] };
    });
  }

  return (
    <div ref={track} className="bull-track" aria-hidden="true">
      <div className="bull-run" style={{ animationDuration: `${duration}s` }}>
        <div key={call?.id ?? "idle"} className={`bull-sprite ${call ? "bull-jump" : ""}`} onClick={jump} title="Click me">
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            width={WIDTH * SCALE}
            height={HEIGHT * SCALE}
            shapeRendering="crispEdges"
            className="block overflow-visible"
          >
            <g className="bull-bob">
              <Layer paths={BODY} />
              {LEGS.map((paths, i) => (
                <g key={i} className={i === 0 ? "bull-frame-a" : "bull-frame-b"}>
                  <Layer paths={paths} />
                </g>
              ))}
            </g>
          </svg>
        </div>
        {[0, 1, 2].map((k) => (
          <span key={k} className="bull-dust" style={{ "--k": k }} />
        ))}
        {call && (
          <span key={call.id} className="bull-call">
            {call.text}
          </span>
        )}
      </div>
    </div>
  );
}
