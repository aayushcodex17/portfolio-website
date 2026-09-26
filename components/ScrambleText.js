"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=<>/";
const FRAMES = 26;

// Text that "decodes" from random glyphs on load, and again on hover.
export default function ScrambleText({ text }) {
  const [shown, setShown] = useState(text);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let frame = 0;
    let timer;
    const step = () => {
      frame++;
      const settled = Math.floor((frame / FRAMES) * text.length);
      setShown(
        frame >= FRAMES
          ? text
          : [...text].map((ch, i) => (i < settled || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join(""),
      );
      if (frame < FRAMES) timer = setTimeout(step, 32);
    };
    timer = setTimeout(step, run === 0 ? 350 : 0);
    return () => clearTimeout(timer);
  }, [text, run]);

  return (
    <span onMouseEnter={() => setRun((n) => n + 1)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}
