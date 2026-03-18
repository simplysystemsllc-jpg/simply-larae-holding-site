const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "simplylarae.dba@gmail.com";
const ADMIN_CC    = process.env.ADMIN_CC    || "simplysystemsllc@gmail.com";
const FROM_EMAIL  = process.env.FROM_EMAIL  || "Simply LaRae <hello@simplyintegratedco.com>";
const BRAND_INQUIRY_SUBJECT = "Brand Partnership Inquiry";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const body    = req.body || {};
  const name    = body.name;
  const email   = body.email;
  const subject = body.subject;
  const message = body.message;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "validation_error", message: "All fields are required" });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (RESEND_API_KEY) {
    const isBrandInquiry = subject.includes(BRAND_INQUIRY_SUBJECT);

    try {
      const adminRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [ADMIN_EMAIL],
          cc: [ADMIN_CC],
          reply_to: email,
          subject: `[Simply LaRae] ${subject} \u2014 ${name}`,
          html: buildAdminEmailHtml(name, email, subject, message),
        }),
      });
      if (!adminRes.ok) {
        console.error("[RESEND ADMIN ERROR]", adminRes.status, await adminRes.text());
      } else {
        console.log("[ADMIN EMAIL SENT] to=" + ADMIN_EMAIL);
      }
    } catch (err) {
      console.error("[RESEND ADMIN ERROR]", err);
    }

    try {
      let confirmSubject;
      let confirmHtml;

      if (isBrandInquiry) {
        const dashIdx = name.indexOf(" \u2014 ");
        const contactName = dashIdx > -1 ? name.slice(0, dashIdx) : name;
        const companyName = dashIdx > -1 ? name.slice(dashIdx + 3) : "your company";
        confirmSubject = "Simply LaRae \u2014 Brand Partnership Inquiry Received";
        confirmHtml = buildConfirmationHtml(
          contactName,
          `<p>Thank you for your interest in partnering with Simply LaRae. We've received your inquiry on behalf of <strong>${esc(companyName)}</strong>.</p>
           <p>Our team carefully reviews every partnership request. We'll follow up within 2\u20133 business days with next steps.</p>
           <p>In the meantime, if you have any additional information to share, simply reply to this email.</p>
           <p>We look forward to exploring how we can work together.</p>`
        );
      } else {
        confirmSubject = "Simply LaRae \u2014 We Received Your Message";
        confirmHtml = buildConfirmationHtml(
          name,
          `<p>Thank you for reaching out to Simply LaRae. We've received your message and our team will review it shortly.</p>
           <p>We typically respond within 1\u20132 business days. If your inquiry is urgent, feel free to reply to this email.</p>
           <p>We appreciate your interest and look forward to connecting with you.</p>`
        );
      }

      const confirmRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: FROM_EMAIL, to: [email], subject: confirmSubject, html: confirmHtml }),
      });
      if (!confirmRes.ok) {
        console.error("[RESEND CONFIRM ERROR]", confirmRes.status, await confirmRes.text());
      } else {
        console.log("[CONFIRM EMAIL SENT] to=" + email);
      }
    } catch (err) {
      console.error("[RESEND CONFIRM ERROR]", err);
    }
  } else {
    console.log("[EMAIL] skipped \u2014 RESEND_API_KEY not set");
  }

  return res.status(201).json({ success: true, message: "Your message has been received. We'll be in touch soon!" });
}

function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function buildAdminEmailHtml(name, email, subject, message) {
  const year = new Date().getFullYear();
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><style>
body{font-family:Arial,sans-serif;background:#F5E7E3;margin:0;padding:40px 20px}
.wrap{max-width:600px;margin:0 auto;background:#fff;border-radius:24px;overflow:hidden;border:1px solid #E8D5CF}
.hdr{background:#EED4CF;padding:32px 40px}.hdr h1{font-size:22px;font-weight:300;letter-spacing:.15em;color:#6E544E;margin:0}
.hdr p{font-size:11px;letter-spacing:.25em;text-transform:uppercase;color:#8E6E67;margin:6px 0 0}
.body{padding:40px}.row{margin-bottom:18px}.lbl{font-size:11px;text-transform:uppercase;letter-spacing:.15em;color:#8E6E67;margin-bottom:4px}
.val{font-size:14px;color:#6E544E;line-height:1.6}
.ftr{padding:20px 40px;border-top:1px solid #E8D5CF}.ftr p{font-size:10px;color:#B09999;margin:0}
</style></head><body><div class="wrap">
<div class="hdr"><h1>Simply LaRae</h1><p>New Form Submission &middot; Simply Integrated, LLC</p></div>
<div class="body">
<div class="row"><div class="lbl">Name</div><div class="val">${esc(name)}</div></div>
<div class="row"><div class="lbl">Email</div><div class="val">${esc(email)}</div></div>
<div class="row"><div class="lbl">Subject</div><div class="val">${esc(subject)}</div></div>
<div class="row"><div class="lbl">Message</div><div class="val">${esc(message).replace(/\n/g,"<br>")}</div></div>
</div>
<div class="ftr"><p>&copy; ${year} Simply Integrated, LLC &middot; simplylarea.com</p></div>
</div></body></html>`;
}

function buildConfirmationHtml(name, bodyContent) {
  const year = new Date().getFullYear();
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><style>
body{font-family:'Inter',Arial,sans-serif;background:#F5E7E3;margin:0;padding:40px 20px}
.wrap{max-width:600px;margin:0 auto;background:#fff;border-radius:24px;overflow:hidden;border:1px solid #E8D5CF}
.hdr{background:#EED4CF;padding:40px;text-align:center}.hdr h1{font-size:28px;font-weight:300;letter-spacing:.15em;color:#6E544E;margin:0}
.hdr p{font-size:11px;letter-spacing:.25em;text-transform:uppercase;color:#8E6E67;margin:8px 0 0}
.body{padding:40px}.body p{font-size:14px;color:#6E544E;line-height:1.7;font-weight:300}
.ftr{padding:24px 40px;border-top:1px solid #E8D5CF}.ftr p{font-size:10px;color:#B09999;line-height:1.6}
</style></head><body><div class="wrap">
<div class="hdr"><h1>Simply LaRae</h1><p>Personalized Beauty &middot; Simply Integrated, LLC</p></div>
<div class="body"><p>Dear ${esc(name)},</p>${bodyContent}</div>
<div class="ftr">
<p>Simply LaRae is an independent beauty advisory platform and is not affiliated with, endorsed by, or partnered with any retailer or brand unless explicitly stated.</p>
<p>&copy; ${year} Simply Integrated, LLC &middot; hello@simplylarea.com &middot; simplylarea.com</p>
</div></div></body></html>`;
}
