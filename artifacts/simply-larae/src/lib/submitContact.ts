const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY as string | undefined;

const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/simplylarae.dba@gmail.com";

export async function submitToContact(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  if (SUPABASE_URL && SUPABASE_KEY) {
    fetch(`${SUPABASE_URL}/rest/v1/contact_messages`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
    }).catch(() => {});
  }

  const res = await fetch(FORMSUBMIT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      message: `Subject: ${payload.subject}\n\n${payload.message}`,
      _subject: `[Simply LaRae] ${payload.subject} — ${payload.name}`,
      _replyto: payload.email,
      _captcha: "false",
      _template: "table",
    }),
  });

  if (!res.ok) throw new Error("Request failed");
}
