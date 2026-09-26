"use client";

import { useState } from "react";
import { LuArrowRight, LuMail, LuMessageSquare, LuUser } from "react-icons/lu";

const FIELD = "w-full bg-transparent py-4 pr-4 pl-11 text-[15px] placeholder:text-muted-fg/70 focus:outline-none";
const ROW = "relative block border-b border-dashed border-line transition-colors focus-within:bg-muted/60";
const ICON = "pointer-events-none absolute left-4 size-4 text-muted-fg";

export default function ContactForm({ email }) {
  const [status, setStatus] = useState("idle");
  const [note, setNote] = useState("");

  function openMailApp(data) {
    const subject = encodeURIComponent(`Hello from ${data.name}`);
    const body = encodeURIComponent(`${data.message}\n\n${data.name} (${data.email})`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setNote("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        form.reset();
        setStatus("sent");
        setNote("Thanks! Your message is on its way.");
        return;
      }
      // No email provider configured: hand the message to the visitor's mail app instead.
      if (res.status === 503) {
        openMailApp(data);
        setStatus("idle");
        setNote("Opening your email app with your message filled in.");
        return;
      }
      const body = await res.json().catch(() => ({}));
      setStatus("error");
      setNote(body.error ?? "Something went wrong. Please email me directly.");
    } catch {
      setStatus("error");
      setNote("Couldn't reach the server. Please email me directly.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-1 flex-col">
      <label className={ROW}>
        <span className="sr-only">Your name</span>
        <LuUser className={`${ICON} top-1/2 -translate-y-1/2`} aria-hidden="true" />
        <input name="name" required maxLength={100} autoComplete="name" placeholder="Your name" className={FIELD} />
      </label>
      <label className={ROW}>
        <span className="sr-only">Your email</span>
        <LuMail className={`${ICON} top-1/2 -translate-y-1/2`} aria-hidden="true" />
        <input name="email" type="email" required maxLength={200} autoComplete="email" placeholder="you@example.com" className={FIELD} />
      </label>
      <label className={`${ROW} flex-1`}>
        <span className="sr-only">Message</span>
        <LuMessageSquare className={`${ICON} top-[1.2rem]`} aria-hidden="true" />
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          placeholder="What would you like to discuss?"
          className={`${FIELD} h-full min-h-36 resize-none`}
        />
      </label>
      {/* Honeypot: hidden from people, often filled in by bots. */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="space-y-3 px-4 py-4">
        <button type="submit" disabled={status === "sending"} className="btn group h-11 w-full font-medium disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Send Message"}
          <LuArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </button>
        <p aria-live="polite" className={`text-sm empty:hidden ${status === "error" ? "text-down" : "text-muted-fg"}`}>
          {note}
        </p>
      </div>
    </form>
  );
}
