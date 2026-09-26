import { LuChevronRight } from "react-icons/lu";
import { SiLeetcode } from "react-icons/si";
import { socials } from "@/data/portfolio";
import { getLeetCode } from "@/lib/leetcode";
import CountUp from "./CountUp";
import RatingChart from "./RatingChart";
import Section, { HandleLink } from "./Section";
import SubmissionHeatmap from "./SubmissionHeatmap";

const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit", timeZone: "Asia/Kolkata" });
const fullDate = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
const monthName = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

function Stat({ label, value, tone = "text-fg", className = "" }) {
  return (
    <div className={`border-dashed border-line px-2 py-3 text-center ${className}`}>
      <p className={`text-[11px] font-semibold uppercase tracking-wider ${tone}`}>{label}</p>
      <p className="mt-0.5">{value}</p>
    </div>
  );
}

function SubHeading({ title, facts }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 border-y border-dashed border-line px-4 py-3">
      <h3 className="text-lg font-medium tracking-tight">{title}</h3>
      <p className="text-sm text-muted-fg">
        {facts.map((fact, i) => (
          <span key={fact} className="whitespace-nowrap">
            {i > 0 && " · "}
            {fact}
          </span>
        ))}
      </p>
    </div>
  );
}

function DataTable({ caption, head, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[13px] whitespace-nowrap">
        <caption className="pb-2 text-left text-xs font-semibold uppercase tracking-wider text-muted-fg">{caption}</caption>
        <thead>
          <tr className="border-b border-line text-muted-fg">
            {head.map((h, i) => (
              <th key={h} scope="col" className={`py-1.5 pr-3 font-medium ${i > 0 ? "text-right" : ""}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="tabular-nums">
          {rows.map((row) => (
            <tr key={row[0]} className="border-b border-line/60 last:border-0">
              {row.map((cell, i) => (
                <td key={i} className={`py-1.5 pr-3 ${i > 0 ? "text-right" : "text-muted-fg"}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function LeetCode() {
  const lc = await getLeetCode(socials.leetcode.handle);
  const cal = lc?.calendar;
  const contests = lc?.contests ?? [];
  const peak = contests.length ? Math.max(...contests.map((c) => c.rating)) : null;

  return (
    <Section
      id="leetcode"
      title="leetcode."
      aside={
        <HandleLink href={socials.leetcode.url} icon={SiLeetcode}>
          {socials.leetcode.handle}
        </HandleLink>
      }
    >
      {lc ? (
        <>
          <div className="grid sm:grid-cols-[1fr_16rem]">
            <div className="stagger grid grid-cols-3 border-b border-dashed border-line sm:border-r sm:border-b-0">
              <Stat label="solved" value={<><CountUp value={lc.solved.All} /> / {lc.total.All}</>} className="border-r border-b" />
              <Stat label="contest rating" value={lc.rating != null ? <CountUp value={lc.rating} /> : "–"} className="border-r border-b" />
              <Stat label="top" value={lc.topPercentage != null ? <CountUp value={lc.topPercentage} decimals={2} suffix="%" /> : "–"} className="border-b" />
              <Stat label="easy" tone="text-accent" value={<><CountUp value={lc.solved.Easy} /> / {lc.total.Easy}</>} className="border-r" />
              <Stat label="medium" tone="text-amber-600 dark:text-amber-500" value={<><CountUp value={lc.solved.Medium} /> / {lc.total.Medium}</>} className="border-r" />
              <Stat label="hard" tone="text-down" value={<><CountUp value={lc.solved.Hard} /> / {lc.total.Hard}</>} />
            </div>
            <div>
              <p className="border-b border-dashed border-line px-4 py-2.5 text-sm font-medium">Recently solved</p>
              <ul className="space-y-1.5 px-4 py-3">
                {lc.recent.map((s) => (
                  <li key={s.url} className="flex items-baseline justify-between gap-3 text-[13px]">
                    <a href={s.url} target="_blank" rel="noreferrer" title={s.title} className="truncate text-muted-fg hover:text-fg">
                      {s.title}
                    </a>
                    <span className="shrink-0 font-mono text-xs text-muted-fg">{dateFormat.format(s.date)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {cal && (
            <>
              <SubHeading
                title="submission history."
                facts={[`${cal.total} submissions`, `${cal.activeDays} active days`, `longest streak ${cal.longestStreak} days`]}
              />
              <div className="px-4 py-4">
                <SubmissionHeatmap weeks={cal.weeks} labels={cal.labels} />
              </div>
            </>
          )}

          {contests.length > 1 && (
            <>
              <SubHeading title="contest rating." facts={[`${contests.length} contests`, `peak ${peak}`]} />
              <div className="px-4 pt-3 pb-2">
                <RatingChart points={contests} />
              </div>
            </>
          )}

          {(cal || contests.length > 0) && (
            <details className="group border-t border-dashed border-line">
              <summary className="flex cursor-pointer list-none items-center gap-1.5 px-4 py-3 text-sm text-muted-fg transition-colors hover:text-fg [&::-webkit-details-marker]:hidden">
                <LuChevronRight className="size-4 transition-transform group-open:rotate-90" aria-hidden="true" />
                View data as table
              </summary>
              <div className="grid gap-6 px-4 pb-5 sm:grid-cols-[1fr_14rem]">
                {contests.length > 0 && (
                  <DataTable
                    caption="Contests"
                    head={["Contest", "Date", "Rating", "Rank", "Solved"]}
                    rows={[...contests].reverse().map((c) => [c.title, fullDate.format(c.t), c.rating, c.rank.toLocaleString("en-US"), `${c.solved}/${c.of}`])}
                  />
                )}
                {cal && (
                  <DataTable
                    caption="Submissions by month"
                    head={["Month", "Submissions", "Days"]}
                    rows={cal.months.map((m) => [monthName.format(new Date(`${m.key}-01T00:00:00Z`)), m.submissions, m.activeDays])}
                  />
                )}
              </div>
            </details>
          )}
        </>
      ) : (
        <p className="px-4 py-4 text-muted-fg">Couldn&apos;t load live stats right now. See my profile on LeetCode.</p>
      )}
    </Section>
  );
}
