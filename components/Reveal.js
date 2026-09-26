"use client";

import { useEffect, useRef, useState } from "react";

// Fades its content up the first time it scrolls into view (styles in globals.css).
export default function Reveal({ children }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="reveal" data-in={inView ? "" : undefined}>
      {children}
    </div>
  );
}
