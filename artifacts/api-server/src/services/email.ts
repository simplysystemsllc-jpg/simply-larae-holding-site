/**
 * Simply LaRae — Email Notification Service
 * Architecture scaffold for transactional email flows.
 * 
 * Integration-ready for: Resend, SendGrid, Postmark, or SMTP.
 * Default: console logging (no live sends until provider is configured).
 * 
 * To activate: set EMAIL_PROVIDER and EMAIL_API_KEY environment variables.
 */

// Auto-detect provider: if RESEND_API_KEY is set, use Resend regardless of EMAIL_PROVIDER
const EMAIL_PROVIDER = process.env.RESEND_API_KEY ? "resend" : (process.env.EMAIL_PROVIDER || "console");
const FROM_EMAIL = process.env.FROM_EMAIL || "Simply LaRae <onboarding@resend.dev>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "simplylarae.dba@gmail.com";
const ADMIN_CC = process.env.ADMIN_CC || "simplysystemsllc@gmail.com";
const BRAND = "Simply LaRae";

interface EmailPayload {
  to: string;
  cc?: string | string[];
  subject: string;
  html: string;
  from?: string;
}

async function sendEmail(payload: EmailPayload): Promise<void> {
  if (EMAIL_PROVIDER === "console") {
    const ccStr = payload.cc ? ` | CC: ${Array.isArray(payload.cc) ? payload.cc.join(", ") : payload.cc}` : "";
    console.log(`[EMAIL] To: ${payload.to}${ccStr} | Subject: ${payload.subject}`);
    return;
  }

  // Resend integration (add RESEND_API_KEY to env)
  if (EMAIL_PROVIDER === "resend") {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: payload.from ?? FROM_EMAIL,
      to: payload.to,
      cc: payload.cc,
      subject: payload.subject,
      html: payload.html,
    });
    return;
  }
}

const baseTemplate = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: 'Inter', Arial, sans-serif; background: #F5E7E3; margin: 0; padding: 40px 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 24px; overflow: hidden; border: 1px solid #E8D5CF; }
    .header { background: #EED4CF; padding: 40px; text-align: center; }
    .header h1 { font-size: 28px; font-weight: 300; letter-spacing: 0.15em; color: #6E544E; margin: 0; }
    .header p { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #8E6E67; margin: 8px 0 0; }
    .body { padding: 40px; }
    .body p { font-size: 14px; color: #6E544E; line-height: 1.7; font-weight: 300; }
    .cta { display: inline-block; background: #8E6E67; color: #fff; padding: 14px 32px; border-radius: 100px; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; text-decoration: none; margin: 20px 0; }
    .footer { padding: 24px 40px; border-top: 1px solid #E8D5CF; }
    .footer p { font-size: 10px; color: #B09999; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Simply LaRae</h1>
      <p>Personalized Beauty · Simply Integrated, LLC</p>
    </div>
    <div class="body">${content}</div>
    <div class="footer">
      <p>Simply LaRae is an independent beauty advisory platform and is not affiliated with, endorsed by, or partnered with any retailer or brand unless explicitly stated.</p>
      <p>© ${new Date().getFullYear()} Simply Integrated, LLC · hello@simplylarea.com · simplylarea.com</p>
    </div>
  </div>
</body>
</html>
`;

export async function sendPurchaseConfirmation(to: string, customerName: string, serviceName: string, price: string): Promise<void> {
  await sendEmail({
    to,
    subject: `${BRAND} — Order Confirmed: ${serviceName}`,
    html: baseTemplate(`
      <p>Dear ${customerName},</p>
      <p>Thank you for your order. We're delighted to welcome you to Simply LaRae.</p>
      <p><strong>Service:</strong> ${serviceName}<br/><strong>Amount:</strong> ${price}</p>
      <p>Your beauty intake questionnaire is ready — please complete it at your earliest convenience so our team can begin crafting your personalized Beauty Blueprint.</p>
      <p>Expected delivery: 24–48 hours after intake completion.</p>
      <p>If you have any questions, reply to this email or contact us at hello@simplylarea.com.</p>
    `),
  });
}

export async function sendIntakeReceived(to: string, customerName: string): Promise<void> {
  await sendEmail({
    to,
    subject: `${BRAND} — Profile Received`,
    html: baseTemplate(`
      <p>Dear ${customerName},</p>
      <p>We've received your beauty profile. Your intake information has been submitted and our concierge team is reviewing your details.</p>
      <p>Next step: Please complete your selfie upload if you haven't already. The more information we have, the better your recommendations will be.</p>
      <p>We'll be in touch shortly with your personalized Beauty Blueprint.</p>
    `),
  });
}

export async function sendSelfieReceived(to: string, customerName: string): Promise<void> {
  await sendEmail({
    to,
    subject: `${BRAND} — Analysis Photo Received`,
    html: baseTemplate(`
      <p>Dear ${customerName},</p>
      <p>Your photo has been received. Our beauty concierge team is now reviewing your facial features alongside your intake profile.</p>
      <p>Your personalized Beauty Blueprint will be delivered within 24–48 hours. We'll send you a confirmation when it's ready.</p>
    `),
  });
}

export async function sendAdminNewSubmission(submissionId: number, customerName: string, serviceName: string): Promise<void> {
  await sendEmail({
    to: ADMIN_EMAIL,
    cc: ADMIN_CC,
    subject: `[Admin] New Submission #${submissionId} — ${customerName}`,
    html: baseTemplate(`
      <p><strong>New submission received.</strong></p>
      <p><strong>Submission ID:</strong> #${submissionId}<br/>
      <strong>Client:</strong> ${customerName}<br/>
      <strong>Service:</strong> ${serviceName}</p>
      <p>Please review the submission in the admin dashboard and update the workflow status.</p>
      <a href="https://simplylarea.com/admin" class="cta">Open Admin Dashboard</a>
    `),
  });
}

export async function sendBlueprintDelivered(to: string, customerName: string, blueprintUrl: string): Promise<void> {
  await sendEmail({
    to,
    subject: `${BRAND} — Your Beauty Blueprint is Ready`,
    html: baseTemplate(`
      <p>Dear ${customerName},</p>
      <p>Your personalized Beauty Blueprint has been completed and is ready for you to review.</p>
      <p>Your blueprint includes:</p>
      <ul style="color: #6E544E; font-weight: 300; font-size: 14px; line-height: 1.9;">
        <li>Your complete beauty profile summary</li>
        <li>Curated product recommendations matched to your features</li>
        <li>Shade guidance and undertone analysis</li>
        <li>Application technique guide</li>
        <li>Quick and full routine recommendations</li>
        <li>Your personalized beauty cart</li>
      </ul>
      <a href="${blueprintUrl}" class="cta">View Your Blueprint</a>
      <p style="font-size: 11px; color: #B09999;">Simply LaRae is an independent advisory platform. Product links direct to third-party retailers. Prices may vary.</p>
    `),
  });
}

export async function sendConciergeRequestConfirmation(to: string, customerName: string): Promise<void> {
  await sendEmail({
    to,
    subject: `${BRAND} — Concierge Request Received`,
    html: baseTemplate(`
      <p>Dear ${customerName},</p>
      <p>We've received your concierge purchase request. Our team will review your product list, verify pricing, and follow up with a confirmation and invoice within 24 hours.</p>
      <p>If you have any questions or adjustments, please contact us at hello@simplylarea.com.</p>
      <p>Thank you for trusting Simply LaRae with your beauty shopping.</p>
    `),
  });
}

export async function sendBrandInquiryNotification(brandName: string, contactEmail: string, message: string): Promise<void> {
  await sendEmail({
    to: ADMIN_EMAIL,
    cc: ADMIN_CC,
    subject: `[Brand Inquiry] ${brandName}`,
    html: baseTemplate(`
      <p><strong>New brand partnership inquiry received.</strong></p>
      <p><strong>Brand:</strong> ${brandName}<br/>
      <strong>Contact:</strong> ${contactEmail}</p>
      <p><strong>Message:</strong><br/>${message}</p>
      <p>Please review and log this inquiry in the admin dashboard Brand Partnership tracker.</p>
    `),
  });
}

export async function sendContactNotification(name: string, fromEmail: string, subject: string, message: string): Promise<void> {
  await sendEmail({
    to: ADMIN_EMAIL,
    cc: ADMIN_CC,
    subject: `[Contact] ${subject} — ${name}`,
    html: baseTemplate(`
      <p><strong>New contact form submission.</strong></p>
      <p><strong>From:</strong> ${name}<br/>
      <strong>Email:</strong> ${fromEmail}<br/>
      <strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
    `),
  });
}
