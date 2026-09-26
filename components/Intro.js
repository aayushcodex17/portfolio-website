import Image from "next/image";
import { LuFileText, LuLocateFixed, LuMail } from "react-icons/lu";
import { bio, openToWorkNote, profile } from "@/data/portfolio";
import { rich } from "@/lib/rich";
import Band from "./Band";
import Clock from "./Clock";
import ScrambleText from "./ScrambleText";
import SocialLinks from "./SocialLinks";
import Typewriter from "./Typewriter";

function Avatar() {
  return (
    <div className="relative shrink-0 p-1.5">
      <span className="avatar-ring absolute inset-0 rounded-full border-2 border-dashed border-line" aria-hidden="true" />
      {profile.avatar ? (
        <Image src={profile.avatar} alt={profile.name} width={88} height={88} priority className="size-20 rounded-full object-cover sm:size-[88px]" />
      ) : (
        <div className="grid size-20 place-items-center rounded-full bg-muted font-mono text-2xl font-semibold tracking-tight sm:size-[88px]">
          {profile.initials}
        </div>
      )}
    </div>
  );
}

export default function Intro() {
  return (
    <>
      <div className="rise flex items-center justify-between gap-4 px-4 py-2" style={{ "--d": "240ms" }}>
        <div className="flex items-center gap-4">
          <Avatar />
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-[26px]">
              <ScrambleText text={profile.name} />
            </h1>
            <p className="font-medium text-muted-fg">
              <Typewriter words={profile.roles} />
            </p>
            {profile.openToWork && (
              <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-0.5 text-xs text-muted-fg">
                <span className="relative flex size-1.5" aria-hidden="true">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                </span>
                open to work
              </p>
            )}
          </div>
        </div>
        <div className="hidden text-right font-mono text-[15px] leading-7 text-muted-fg sm:block">
          <p className="inline-flex items-center gap-1.5">
            <LuLocateFixed className="size-4" aria-hidden="true" />
            {profile.location}
          </p>
          <p>
            <Clock timeZone={profile.timeZone} label={profile.timeZoneLabel} />
          </p>
        </div>
      </div>

      <Band />

      <div className="space-y-4 px-4 py-5 leading-relaxed text-muted-fg sm:text-[17px] sm:leading-[1.7]">
        {bio.map((paragraph, i) => (
          <p key={i} className="rise" style={{ "--d": `${360 + i * 90}ms` }}>
            {rich(paragraph)}
          </p>
        ))}
        {profile.openToWork && (
          <p className="rise" style={{ "--d": `${360 + bio.length * 90}ms` }}>
            {rich(openToWorkNote)}
          </p>
        )}
      </div>

      <div className="rise flex flex-wrap gap-3 border-t border-dashed border-line px-4 py-4" style={{ "--d": "650ms" }}>
        <SocialLinks />
        <a href={profile.resume} target="_blank" rel="noreferrer" className="btn h-10 px-3.5 text-[15px] font-medium">
          <LuFileText className="size-[18px]" aria-hidden="true" />
          Resume
        </a>
        <a href={`mailto:${profile.email}`} className="btn h-10 px-3.5 text-[15px] font-medium">
          <LuMail className="size-[18px]" aria-hidden="true" />
          Email
        </a>
      </div>
    </>
  );
}
