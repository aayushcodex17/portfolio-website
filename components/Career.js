import { LuArrowUpRight } from "react-icons/lu";
import { career, profile } from "@/data/portfolio";
import CommitLog from "./CommitLog";
import CountUp from "./CountUp";
import Section from "./Section";

export default function Career() {
  return (
    <Section id="experience" title="work experience.">
      <div className="grid gap-12 px-4 pt-10 pb-12 md:grid-cols-[15rem_1fr] md:gap-8">
        <div className="md:sticky md:top-10 md:self-start">
          <p className="font-mono text-xs tracking-[0.2em] text-muted-fg uppercase">
            <span className="text-accent">—</span> {career.eyebrow}
          </p>
          <p className="mt-5 text-[2.6rem] leading-[1.04] font-semibold tracking-tight md:text-[2.05rem]">
            {career.title}
            <br />
            <span className="text-muted-fg/60">{career.subtitle}</span>
          </p>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-fg">{career.summary}</p>
          <a
            href={career.card.href}
            target="_blank"
            rel="noreferrer"
            className="group mt-7 flex items-center justify-between gap-4 rounded-2xl border border-line bg-card px-5 py-4 transition-colors hover:border-accent/50"
          >
            <span>
              <span className="block text-3xl font-semibold tracking-tight">
                <CountUp value={career.card.value} />
              </span>
              <span className="mt-0.5 block text-sm text-muted-fg">{career.card.label}</span>
            </span>
            <LuArrowUpRight
              className="size-5 shrink-0 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
          <a href={profile.resume} target="_blank" rel="noreferrer" className="mt-4 inline-block font-mono text-xs text-muted-fg hover:text-fg">
            ↓ resume.pdf
          </a>
        </div>
        <CommitLog commits={career.commits} />
      </div>
    </Section>
  );
}
