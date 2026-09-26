import { skills } from "@/data/portfolio";
import Section from "./Section";

export default function Skills() {
  return (
    <Section id="skills" title="technical skills.">
      <div className="stagger divide-y divide-dashed divide-line">
        {skills.map((group) => (
          <div key={group.label} className="grid gap-3 px-4 py-4 sm:grid-cols-[8.5rem_1fr]">
            <h3 className="pt-1.5 font-mono text-xs uppercase tracking-wider text-muted-fg">{group.label}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map(({ name, icon: Icon }) => (
                <li
                  key={name}
                  className="group inline-flex items-center gap-2 rounded-lg border border-line px-2.5 py-1.5 text-sm transition duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-muted"
                >
                  <Icon className="size-4 text-muted-fg transition duration-200 group-hover:scale-110 group-hover:text-accent" aria-hidden="true" />
                  {name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
