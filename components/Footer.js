import { profile } from "@/data/portfolio";
import Band from "./Band";
import Bull from "./Bull";

export default function Footer() {
  return (
    <footer>
      <Band />
      <div className="space-y-1 px-4 py-6 text-center text-sm text-muted-fg">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p>
          <a href="#top" className="group hover:text-fg">
            Back to top{" "}
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1" aria-hidden="true">
              ↑
            </span>
          </a>
        </p>
      </div>
      <Bull />
    </footer>
  );
}
