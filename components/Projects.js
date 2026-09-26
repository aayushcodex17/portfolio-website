import { FaGithub } from "react-icons/fa6";
import { LuExternalLink } from "react-icons/lu";
import { projects } from "@/data/portfolio";
import { Tags } from "./Experience";
import Section from "./Section";

export default function Projects() {
  return (
    <Section id="projects" title="featured projects.">
      <ul className="stagger divide-y divide-dashed divide-line">
        {projects.map((project) => (
          <li key={project.name} className="row-hover group flex items-start justify-between gap-4 px-4 py-4 transition-colors hover:bg-muted/60">
            <div className="min-w-0 space-y-1.5 transition-transform duration-300 group-hover:translate-x-1">
              <h3 className="flex items-center gap-2 font-medium">
                {project.name}
                {project.status && (
                  <span className="rounded-full border border-line px-1.5 text-[11px] font-normal text-muted-fg">{project.status}</span>
                )}
              </h3>
              <p className="text-[15px] text-muted-fg">{project.summary}</p>
              <div className="pt-1">
                <Tags items={project.stack} />
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer" aria-label={`${project.name} live site`} className="btn size-9">
                  <LuExternalLink className="size-4" aria-hidden="true" />
                </a>
              )}
              {project.repo && (
                <a href={project.repo} target="_blank" rel="noreferrer" aria-label={`${project.name} ${project.repoLabel ?? "repository"} on GitHub`} className="btn size-9">
                  <FaGithub className="size-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
