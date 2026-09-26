import { profile } from "@/data/portfolio";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Sends contact-form messages through Resend when RESEND_API_KEY is set.
// Without it, responds 503 and the form falls back to the visitor's mail app.
export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body) return Response.json({ error: "Invalid request." }, { status: 400 });
  if (body.company) return Response.json({ ok: true });

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  if (!name || name.length > 100 || email.length > 200 || !EMAIL.test(email) || message.length < 10 || message.length > 5000) {
    return Response.json({ error: "Please add your name, a valid email and a message of at least 10 characters." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ error: "Email sending isn't configured." }, { status: 503 });

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO ?? profile.email],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: `${message}\n\n${name} <${email}>`,
      }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Couldn't send right now. Please email me directly." }, { status: 502 });
  }
}
