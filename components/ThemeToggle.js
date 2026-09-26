"use client";

import { LuMoon, LuSun } from "react-icons/lu";
import { prefersReducedMotion } from "@/lib/motion";

export default function ThemeToggle() {
  function toggle(event) {
    const apply = () => {
      const dark = document.documentElement.classList.toggle("dark");
      try {
        localStorage.setItem("theme", dark ? "dark" : "light");
      } catch {}
    };
    if (!document.startViewTransition || prefersReducedMotion()) return apply();

    // Grow the new theme out of the button as a circle.
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.4, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  }

  return (
    <button type="button" onClick={toggle} aria-label="Toggle colour theme" className="btn relative size-9 overflow-hidden text-fg">
      <LuSun className="absolute size-4 scale-0 rotate-90 opacity-0 transition-all duration-500 dark:scale-100 dark:rotate-0 dark:opacity-100" aria-hidden="true" />
      <LuMoon className="absolute size-4 transition-all duration-500 dark:scale-0 dark:-rotate-90 dark:opacity-0" aria-hidden="true" />
    </button>
  );
}
