import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { contactMessagesTable } from "@workspace/db/schema";
import {
  sendContactNotification,
  sendContactConfirmation,
  sendBrandInquiryNotification,
  sendBrandInquiryConfirmation,
} from "../services/email.js";

const router: IRouter = Router();

const BRAND_INQUIRY_SUBJECT = "Brand Partnership Inquiry";

router.post("/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      res.status(400).json({ error: "validation_error", message: "All fields are required" });
      return;
    }

    await db.insert(contactMessagesTable).values({ name, email, subject, message });

    const isBrandInquiry = subject.includes(BRAND_INQUIRY_SUBJECT);

    if (isBrandInquiry) {
      const dashIdx = name.indexOf(" — ");
      const contactName = dashIdx > -1 ? name.slice(0, dashIdx) : name;
      const companyName = dashIdx > -1 ? name.slice(dashIdx + 3) : "your company";

      sendBrandInquiryNotification(companyName, email, message).catch((err) => {
        console.error("[EMAIL] Failed to send brand inquiry admin notification:", err);
      });

      sendBrandInquiryConfirmation(email, contactName, companyName).catch((err) => {
        console.error("[EMAIL] Failed to send brand inquiry confirmation:", err);
      });
    } else {
      sendContactNotification(name, email, subject, message).catch((err) => {
        console.error("[EMAIL] Failed to send contact notification:", err);
      });

      sendContactConfirmation(email, name).catch((err) => {
        console.error("[EMAIL] Failed to send contact confirmation:", err);
      });
    }

    res.status(201).json({ success: true, message: "Your message has been received. We'll be in touch soon!" });
  } catch (err) {
    console.error("[CONTACT] Route error:", err);
    res.status(500).json({ error: "server_error", message: "Something went wrong. Please try again." });
  }
});

export default router;
