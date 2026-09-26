import { profile } from "@/data/portfolio";
import ThemeToggle from "./ThemeToggle";

const NAV = ["experience", "projects", "skills", "contact"];

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3">
      <a href="#top" className="group text-xl font-bold tracking-tight">
        {profile.shortName}
        <span className="inline-block text-accent transition-transform duration-300 group-hover:-translate-y-1.5">.</span>
      </a>
      <nav aria-label="Sections" className="flex items-center gap-5">
        {NAV.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className="relative hidden text-[15px] text-muted-fg transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:text-fg hover:after:scale-x-100 sm:inline"
          >
            {id}
          </a>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  );
}
