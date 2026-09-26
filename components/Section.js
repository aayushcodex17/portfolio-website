import Band from "./Band";
import Reveal from "./Reveal";

export default function Section({ id, title, aside, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-2">
      <Band />
      <Reveal>
        <div className="rule-b flex items-center justify-between gap-4 px-4 py-3">
          <h2 id={`${id}-title`} className="text-2xl font-semibold tracking-tight">
            {title.endsWith(".") ? (
              <>
                {title.slice(0, -1)}
                <span className="text-accent">.</span>
              </>
            ) : (
              title
            )}
          </h2>
          {aside}
        </div>
        {children}
      </Reveal>
    </section>
  );
}

// Right-aligned "@handle ↗" link shown next to a section title.
export function HandleLink({ href, icon: Icon, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-2 font-mono text-sm text-muted-fg transition-colors hover:text-fg"
    >
      <Icon className="size-4" aria-hidden="true" />
      {children}
      <span aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
        ↗
      </span>
    </a>
  );
}
