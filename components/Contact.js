import { profile } from "@/data/portfolio";
import ContactForm from "./ContactForm";
import CopyEmail from "./CopyEmail";
import Section from "./Section";
import SocialLinks from "./SocialLinks";

function Heading({ title, children }) {
  return (
    <div className="border-b border-dashed border-line px-4 py-4">
      <h3 className="text-xl font-medium tracking-tight">{title}</h3>
      <p className="mt-0.5 text-[15px] text-muted-fg">{children}</p>
    </div>
  );
}

export default function Contact() {
  return (
    <Section id="contact" title="let's connect.">
      <div className="grid sm:grid-cols-[1fr_20rem]">
        <div className="flex flex-col border-b border-dashed border-line sm:border-r sm:border-b-0">
          <Heading title="send a message.">Drop a note about a role or a project, or just say hi.</Heading>
          <ContactForm email={profile.email} />
        </div>
        <div className="flex flex-col">
          <Heading title="email me directly.">Prefer your own inbox? That works too.</Heading>
          <div className="border-b border-dashed border-line px-4 py-4">
            <CopyEmail email={profile.email} />
          </div>
          <Heading title="follow & connect.">Find me around the internet.</Heading>
          <div className="flex flex-wrap gap-3 px-4 py-4">
            <SocialLinks />
          </div>
        </div>
      </div>
    </Section>
  );
}
