/**
 * Simply LaRae — Stripe Payment Service
 * Scaffolding for service-based checkout flow.
 * 
 * Default posture: service revenue (not retail/product sales).
 * 
 * To activate: set STRIPE_SECRET_KEY environment variable.
 * Webhook: STRIPE_WEBHOOK_SECRET for event verification.
 */

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const BASE_URL = process.env.PUBLIC_URL || "https://simplylarea.com";

function getStripe() {
  if (!STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY not configured. Set it in environment variables.");
  }
  const Stripe = require("stripe");
  return new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });
}

export interface CheckoutSessionParams {
  serviceName: string;
  serviceId: number;
  priceInCents: number;
  customerEmail?: string;
  sessionId: string;
  successPath?: string;
  cancelPath?: string;
}

export async function createCheckoutSession(params: CheckoutSessionParams): Promise<string> {
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: params.customerEmail,
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: params.priceInCents,
          product_data: {
            name: `Simply LaRae — ${params.serviceName}`,
            description: "Personalized Beauty Blueprint · Simply Integrated, LLC",
            metadata: {
              service_id: String(params.serviceId),
              session_id: params.sessionId,
            },
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      service_id: String(params.serviceId),
      session_id: params.sessionId,
      source: "simply_larae_web",
    },
    success_url: `${BASE_URL}${params.successPath ?? `/intake?serviceId=${params.serviceId}&paid=1`}`,
    cancel_url: `${BASE_URL}${params.cancelPath ?? `/services`}`,
  });

  if (!session.url) {
    throw new Error("Failed to create Stripe checkout session");
  }

  return session.url;
}

export interface StripeWebhookEvent {
  type: string;
  data: {
    object: any;
  };
}

export function constructWebhookEvent(payload: Buffer | string, signature: string): StripeWebhookEvent {
  if (!STRIPE_WEBHOOK_SECRET) {
    throw new Error("STRIPE_WEBHOOK_SECRET not configured");
  }
  const stripe = getStripe();
  return stripe.webhooks.constructEvent(payload, signature, STRIPE_WEBHOOK_SECRET);
}

export async function handleCheckoutCompleted(event: StripeWebhookEvent): Promise<void> {
  const session = event.data.object;
  const serviceId = session.metadata?.service_id;
  const sessionId = session.metadata?.session_id;
  const customerEmail = session.customer_email;

  console.log(`[Stripe] Checkout completed — serviceId: ${serviceId}, sessionId: ${sessionId}, email: ${customerEmail}`);

  // TODO: update submission payment status in DB, trigger confirmation email
  // await updateSubmissionPaid(submissionId);
  // await sendPurchaseConfirmation(customerEmail, ..., ...);
}

export async function handlePaymentFailed(event: StripeWebhookEvent): Promise<void> {
  const intent = event.data.object;
  console.log(`[Stripe] Payment failed — intentId: ${intent.id}`);
}
