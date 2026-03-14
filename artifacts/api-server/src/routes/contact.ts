import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { contactMessagesTable } from "@workspace/db/schema";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    res.status(400).json({ error: "validation_error", message: "All fields are required" });
    return;
  }

  await db.insert(contactMessagesTable).values({ name, email, subject, message });

  res.status(201).json({ success: true, message: "Your message has been received. We'll be in touch soon!" });
});

export default router;
