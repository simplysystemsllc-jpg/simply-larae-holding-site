/**
 * Vercel Serverless Function — /api/contact
 *
 * Sends email notification via Resend when RESEND_API_KEY is set.
 * Database storage is handled directly by the frontend via Supabase.
 *
 * Always returns 201 — email failure is logged but never blocks the user.
 */

var ADMIN_EMAIL = process.env.ADMIN_EMAIL || "simplylarae.dba@gmail.com";
var ADMIN_CC    = process.env.ADMIN_CC    || "simplysystemsllc@gmail.com";
var FROM_EMAIL  = process.env.FROM_EMAIL  || "Simply LaRae <onboarding@resend.dev>";

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  var body    = req.body || {};
  var name    = body.name;
  var email   = body.email;
  var subject = body.subject;
  var message = body.message;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "validation_error", message: "All fields are required" });
  }

  var RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (RESEND_API_KEY) {
    try {
      var emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + RESEND_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [ADMIN_EMAIL],
          cc: [ADMIN_CC],
          reply_to: email,
          subject: "[Simply LaRae] " + subject + " \u2014 " + name,
          html: buildEmailHtml(name, email, subject, message),
        }),
      });
      if (!emailRes.ok) {
        console.error("[RESEND ERROR]", emailRes.status, await emailRes.text());
      } else {
        console.log("[EMAIL SENT] to=" + ADMIN_EMAIL);
      }
    } catch (err) {
      console.error("[RESEND ERROR]", err);
    }
  } else {
    console.log("[EMAIL] skipped — RESEND_API_KEY not set");
  }

  return res.status(201).json({
    success: true,
    message: "Your message has been received. We'll be in touch soon!",
  });
};

function escape(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml(name, email, subject, message) {
  var year = new Date().getFullYear();
  return "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><style>" +
    "body{font-family:Arial,sans-serif;background:#F5E7E3;margin:0;padding:40px 20px}" +
    ".wrap{max-width:600px;margin:0 auto;background:#fff;border-radius:24px;overflow:hidden;border:1px solid #E8D5CF}" +
    ".hdr{background:#EED4CF;padding:32px 40px}" +
    ".hdr h1{font-size:22px;font-weight:300;letter-spacing:.15em;color:#6E544E;margin:0}" +
    ".hdr p{font-size:11px;letter-spacing:.25em;text-transform:uppercase;color:#8E6E67;margin:6px 0 0}" +
    ".body{padding:40px}.row{margin-bottom:18px}" +
    ".lbl{font-size:11px;text-transform:uppercase;letter-spacing:.15em;color:#8E6E67;margin-bottom:4px}" +
    ".val{font-size:14px;color:#6E544E;line-height:1.6}" +
    ".ftr{padding:20px 40px;border-top:1px solid #E8D5CF}" +
    ".ftr p{font-size:10px;color:#B09999;margin:0}" +
    "</style></head><body>" +
    "<div class=\"wrap\">" +
    "<div class=\"hdr\"><h1>Simply LaRae</h1><p>New Form Submission &middot; Simply Integrated, LLC</p></div>" +
    "<div class=\"body\">" +
    "<div class=\"row\"><div class=\"lbl\">Name</div><div class=\"val\">" + escape(name) + "</div></div>" +
    "<div class=\"row\"><div class=\"lbl\">Email</div><div class=\"val\">" + escape(email) + "</div></div>" +
    "<div class=\"row\"><div class=\"lbl\">Subject</div><div class=\"val\">" + escape(subject) + "</div></div>" +
    "<div class=\"row\"><div class=\"lbl\">Message</div><div class=\"val\">" + escape(message).replace(/\n/g, "<br>") + "</div></div>" +
    "</div>" +
    "<div class=\"ftr\"><p>&copy; " + year + " Simply Integrated, LLC &middot; simplylarea.com</p></div>" +
    "</div></body></html>";
}
