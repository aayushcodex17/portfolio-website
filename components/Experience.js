import Image from "next/image";
import { LuChevronDown } from "react-icons/lu";
import { experience } from "@/data/portfolio";
import Section from "./Section";

export function Tags({ items }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li key={item} className="rounded-md border border-line px-2 py-0.5 font-mono text-xs text-muted-fg">
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function Experience() {
  return (
    <Section id="experience" title="work experience.">
      <div className="stagger divide-y divide-dashed divide-line">
        {experience.map((job, i) => (
          <details key={job.company} open={i === 0} className="group">
            <summary className="row-hover flex cursor-pointer list-none items-center gap-3 px-4 py-4 transition-colors hover:bg-muted/60 [&::-webkit-details-marker]:hidden">
              {job.logo ? (
                <span
                  className="logo-tile block size-12 sm:size-14"
                  data-fill={job.fill ? "" : undefined}
                  style={{ "--brand": job.brand ?? "var(--accent)" }}
                >
                  <Image
                    src={job.logo}
                    alt=""
                    fill
                    sizes="56px"
                    unoptimized={job.logo.endsWith(".svg")}
                    className={job.fill ? "object-cover" : "object-contain p-2 sm:p-2.5"}
                  />
                  <span className="logo-shine" aria-hidden="true" />
                </span>
              ) : (
                <span className="grid size-12 shrink-0 place-items-center rounded-lg border border-line bg-muted font-mono text-sm font-semibold transition-colors duration-300 group-open:border-accent/60 group-open:text-accent">
                  {job.initials}
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className="block font-medium">{job.role}</span>
                <span className="block truncate text-sm text-muted-fg">@ {job.company}</span>
              </span>
              <span className="hidden text-right text-sm leading-6 text-muted-fg sm:block">
                {job.period.endsWith("Present") && (
                  <span className="mr-1.5 inline-block size-1.5 -translate-y-px rounded-full bg-accent align-middle" aria-hidden="true" />
                )}
                {job.period}
                <br />
                {job.location}
              </span>
              <LuChevronDown className="size-4 shrink-0 text-muted-fg transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="space-y-3 px-4 pb-5 sm:pl-[5.25rem]">
              <p className="text-sm text-muted-fg sm:hidden">
                {job.period} · {job.location}
              </p>
              {job.about && <p className="text-[15px] leading-relaxed text-muted-fg">{job.about}</p>}
              {job.points?.length > 0 && (
                <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-muted-fg marker:text-line">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap items-center justify-between gap-3">
                {job.stack?.length > 0 && <Tags items={job.stack} />}
                {job.url && (
                  <a href={job.url} target="_blank" rel="noreferrer" className="font-mono text-xs text-muted-fg hover:text-fg">
                    {new URL(job.url).hostname.replace(/^www\./, "")} ↗
                  </a>
                )}
              </div>
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}
