import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { socials } from "@/data/portfolio";

const LINKS = [
  { ...socials.github, label: "GitHub", icon: FaGithub },
  { ...socials.linkedin, label: "LinkedIn", icon: FaLinkedinIn },
  { ...socials.x, label: "X (Twitter)", icon: FaXTwitter },
  { ...socials.leetcode, label: "LeetCode", icon: SiLeetcode },
];

export default function SocialLinks() {
  return LINKS.map(({ url, label, icon: Icon }) => (
    <a key={label} href={url} target="_blank" rel="noreferrer" aria-label={label} title={label} className="btn h-10 w-11">
      <Icon className="size-[18px]" aria-hidden="true" />
    </a>
  ));
}
