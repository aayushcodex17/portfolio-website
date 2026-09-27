import { LuChartCandlestick, LuLandmark } from "react-icons/lu";
import { SiLeetcode } from "react-icons/si";
import { achievements } from "@/data/portfolio";
import Section from "./Section";

const ICONS = { leetcode: SiLeetcode, sebi: LuLandmark, trader: LuChartCandlestick };

function Row({ icon: Icon, title, children, aside }) {
  return (
    <li className="row-hover group flex items-start gap-3 px-4 py-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-line bg-muted transition-colors duration-300 group-hover:border-accent/50">
        <Icon className="size-[18px] transition duration-300 group-hover:scale-110 group-hover:text-accent" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-[15px] text-muted-fg">{children}</p>
      </div>
      {aside}
    </li>
  );
}

export default function Achievements() {
  return (
    <Section id="achievements" title="achievements.">
      <ul className="stagger divide-y divide-dashed divide-line">
        {achievements.map((a) => (
          <Row key={a.title} icon={ICONS[a.kind]} title={a.title}>
            {a.detail}
          </Row>
        ))}
      </ul>
    </Section>
  );
}
