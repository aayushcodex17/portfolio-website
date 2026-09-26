"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

// Cycles through phrases: holds each one, deletes it, types the next.
export default function Typewriter({ words }) {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    if (prefersReducedMotion() || words.length < 2) return;
    let word = 0;
    let length = words[0].length;
    let deleting = true;
    let timer;
    const step = () => {
      if (deleting) {
        length--;
        setText(words[word].slice(0, length));
        if (length === 0) {
          deleting = false;
          word = (word + 1) % words.length;
        }
        timer = setTimeout(step, length === 0 ? 350 : 30);
        return;
      }
      length++;
      setText(words[word].slice(0, length));
      if (length === words[word].length) {
        deleting = true;
        timer = setTimeout(step, 2600);
      } else {
        timer = setTimeout(step, 65);
      }
    };
    timer = setTimeout(step, 3000);
    return () => clearTimeout(timer);
  }, [words]);

  return (
    <span>
      <span className="sr-only">{words[0]}</span>
      <span aria-hidden="true">
        {text || "​"}
        <span className="caret ml-px text-accent">▍</span>
      </span>
    </span>
  );
}
