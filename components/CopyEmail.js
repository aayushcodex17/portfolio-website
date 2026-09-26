"use client";

import { useState } from "react";
import { LuCheck, LuCopy, LuMail } from "react-icons/lu";

export default function CopyEmail({ email }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  }

  return (
    <div className="flex gap-2">
      <a href={`mailto:${email}`} className="btn h-10 min-w-0 flex-1 px-3 text-sm font-medium">
        <LuMail className="size-4 shrink-0" aria-hidden="true" />
        <span className="truncate">{email}</span>
      </a>
      <button type="button" onClick={copy} aria-label={copied ? "Copied" : "Copy email address"} className="btn size-10 shrink-0">
        {copied ? <LuCheck className="size-4 text-accent" aria-hidden="true" /> : <LuCopy className="size-4" aria-hidden="true" />}
      </button>
    </div>
  );
}
