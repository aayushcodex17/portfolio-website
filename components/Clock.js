"use client";

import { useEffect, useState } from "react";

export default function Clock({ timeZone, label }) {
  const [now, setNow] = useState(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const time = now
    ? new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" }).format(now)
    : "--:--:--";

  return (
    <time className="tabular-nums">
      {time} {label}
    </time>
  );
}
