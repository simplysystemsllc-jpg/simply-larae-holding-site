const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY as string | undefined;

export async function submitToContact(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  let supabaseSaved = false;

  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      const dbRes = await fetch(`${SUPABASE_URL}/rest/v1/contact_messages`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(payload),
      });
      if (dbRes.ok) supabaseSaved = true;
    } catch {
      /* Supabase unreachable */
    }
  }

  if (supabaseSaved) {
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});
    return;
  }

  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Request failed");
}
