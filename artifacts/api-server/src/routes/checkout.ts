import { Router, type IRouter } from "express";
import { createCheckoutSession, constructWebhookEvent, handleCheckoutCompleted, handlePaymentFailed } from "../services/stripe";
import { db } from "@workspace/db";
import { servicesTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import express from "express";

const router: IRouter = Router();

router.post("/checkout/create-session", async (req, res) => {
  try {
    const { serviceId, customerEmail, sessionId } = req.body;

    if (!serviceId || !sessionId) {
      return res.status(400).json({ error: "serviceId and sessionId are required" });
    }

    const [service] = await db.select().from(servicesTable).where(eq(servicesTable.id, serviceId));
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    const priceInCents = Math.round(parseFloat(service.price) * 100);

    const url = await createCheckoutSession({
      serviceName: service.name,
      serviceId: service.id,
      priceInCents,
      customerEmail,
      sessionId,
    });

    res.json({ url });
  } catch (err: any) {
    if (err.message?.includes("STRIPE_SECRET_KEY not configured")) {
      return res.status(503).json({ error: "Payment processing not yet configured. Please contact hello@simplylarea.com to complete your purchase." });
    }
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

router.post("/checkout/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  if (!sig) return res.status(400).json({ error: "No signature" });

  try {
    const event = constructWebhookEvent(req.body, sig as string);

    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event);
        break;
      case "payment_intent.payment_failed":
        await handlePaymentFailed(event);
        break;
      default:
        console.log(`[Stripe Webhook] Unhandled event: ${event.type}`);
    }

    res.json({ received: true });
  } catch (err: any) {
    console.error("[Stripe Webhook] Error:", err.message);
    res.status(400).json({ error: "Webhook error" });
  }
});

export default router;
