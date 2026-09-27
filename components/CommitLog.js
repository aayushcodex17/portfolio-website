"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import LogoTile from "./LogoTile";

// Graph geometry (px). The side branch is only drawn from the sm breakpoint up.
const X = { narrow: 10, wide: 20 };
const BRANCH_OFFSET = 32;

function buildGraph(root) {
  const wide = window.matchMedia("(min-width: 640px)").matches;
  const x = wide ? X.wide : X.narrow;
  const bx = x + BRANCH_OFFSET;
  const top = root.getBoundingClientRect().top;
  const nodes = [...root.querySelectorAll("[data-node]")].map((el) => {
    const r = el.getBoundingClientRect();
    const onBranch = wide && el.dataset.branch === "side";
    return { y: r.top + r.height / 2 - top, x: onBranch ? bx : x, kind: el.dataset.kind, onBranch };
  });
  if (nodes.length < 2) return null;

  const first = nodes[0].y;
  const last = nodes.at(-1).y;
  let branch = null;
  const fork = nodes.find((n) => n.kind === "fork");
  const merge = nodes.find((n) => n.kind === "head") ?? nodes.at(-1);
  if (wide && fork && merge.y - fork.y > 120) {
    const a = fork.y;
    const b = merge.y;
    branch = `M${x} ${a}C${x} ${a + 30} ${bx} ${a + 22} ${bx} ${a + 60}V${b - 40}C${bx} ${b - 16} ${x} ${b - 22} ${x} ${b}`;
  }
  return { x, nodes, first, last, main: `M${x} ${first}V${last}`, branch, height: root.offsetHeight };
}

function Commit({ commit, index }) {
  const kind = commit.head ? "head" : commit.branch ? "fork" : "commit";
  return (
    <article className={`group relative pb-14 pl-9 last:pb-2 ${commit.onBranch ? "sm:pl-24" : "sm:pl-16"}`} style={{ "--i": index }}>
      <p data-node data-kind={kind} data-branch={commit.onBranch ? "side" : "main"} className="font-mono text-xs">
        <span className="text-accent">{commit.type}</span>
        <span className="text-muted-fg/60"> · </span>
        <span className="text-muted-fg">{commit.message}</span>
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
        {commit.logo && <LogoTile src={commit.logo} brand={commit.brand} fill={commit.fill} wide={commit.wide} className="size-10" />}
        <h3 className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
          {commit.url ? (
            <a href={commit.url} target="_blank" rel="noreferrer" className="decoration-line decoration-1 underline-offset-[6px] hover:underline">
              {commit.name}
            </a>
          ) : (
            commit.name
          )}
        </h3>
        {commit.badge && <span className="rounded-md border border-line px-2 py-0.5 text-[13px] text-fg/85">{commit.badge}</span>}
        {commit.head && (
          <span className="rounded-[4px] bg-accent px-2 py-0.5 font-mono text-[11px] font-semibold tracking-[0.15em] text-black uppercase">
            You are here
          </span>
        )}
      </div>
      {commit.meta && <p className="mt-2 font-mono text-xs text-muted-fg">{commit.meta}</p>}
      <p className="mt-3 text-[15px] leading-relaxed text-muted-fg">{commit.text}</p>
      {commit.chips && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {commit.chips.map((chip) => (
            <li key={chip} className="rounded-md border border-line bg-card px-2.5 py-1 text-[13px] text-fg/85">
              {chip}
            </li>
          ))}
        </ul>
      )}
      {commit.branch && <p className="mt-4 font-mono text-xs text-accent">↳ branched: {commit.branch}</p>}
    </article>
  );
}

// A career timeline drawn as a git graph. The line lights up as you scroll and each commit fills in once reached.
export default function CommitLog({ commits }) {
  const root = useRef(null);
  const [graph, setGraph] = useState(null);
  const [head, setHead] = useState(Infinity);

  useEffect(() => {
    const el = root.current;
    const still = prefersReducedMotion();
    let frame = 0;
    let current = null;
    const measure = () => {
      current = buildGraph(el);
      setGraph(current);
      update();
    };
    const update = () => {
      frame = 0;
      if (!current) return;
      if (still) return setHead(current.last);
      const y = window.innerHeight * 0.6 - el.getBoundingClientRect().top;
      setHead(Math.min(Math.max(y, current.first), current.last));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(frame);
    };
  }, []);

  const reached = graph ? graph.nodes.filter((n) => n.y <= head + 1) : [];
  const active = reached.at(-1);
  const moving = graph && head > graph.first + 1 && head < graph.last - 1;

  return (
    <div ref={root} className="relative">
      {graph && (
        <svg
          aria-hidden="true"
          width="72"
          height={graph.height}
          className="pointer-events-none absolute top-0 left-0 overflow-visible"
          fill="none"
          strokeWidth="2"
        >
          <defs>
            <clipPath id="commit-lit">
              <rect x="0" y="0" width="96" height={Math.max(head, 0)} />
            </clipPath>
          </defs>
          <path d={graph.main} stroke="var(--line)" />
          {graph.branch && <path d={graph.branch} stroke="color-mix(in oklab, var(--accent) 18%, transparent)" />}
          <g clipPath="url(#commit-lit)">
            <path d={graph.main} stroke="var(--muted-fg)" />
            {graph.branch && <path d={graph.branch} stroke="var(--accent)" />}
          </g>
          {graph.nodes.map((n) => {
            const isReached = n.y <= head + 1;
            const isActive = n === active;
            const color = n.onBranch || n.kind === "head" ? "var(--accent)" : "var(--fg)";
            return (
              <circle
                key={n.y}
                cx={n.x}
                cy={n.y}
                r="6.5"
                className="transition-[fill,stroke] duration-300"
                style={{
                  fill: isActive ? color : "var(--bg)",
                  stroke: isReached ? color : "var(--line)",
                  filter: isActive && n.kind === "head" ? "drop-shadow(0 0 6px var(--accent))" : undefined,
                }}
              />
            );
          })}
          {moving && (
            <circle cx={graph.x} cy={head} r="3.5" fill="var(--accent)" style={{ filter: "drop-shadow(0 0 6px var(--accent))" }} />
          )}
        </svg>
      )}
      {commits.map((commit, i) => (
        <Commit key={commit.name} commit={commit} index={i} />
      ))}
    </div>
  );
}
