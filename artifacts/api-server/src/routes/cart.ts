import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { cartItemsTable, productsTable } from "@workspace/db/schema";
import { eq, and } from "drizzle-orm";

const router: IRouter = Router();

router.get("/cart", async (req, res) => {
  const { sessionId } = req.query as { sessionId?: string };
  if (!sessionId) {
    res.status(400).json({ error: "validation_error", message: "sessionId is required" });
    return;
  }

  const rows = await db
    .select({
      id: cartItemsTable.id,
      sessionId: cartItemsTable.sessionId,
      quantity: cartItemsTable.quantity,
      addedAt: cartItemsTable.addedAt,
      product: {
        id: productsTable.id,
        name: productsTable.name,
        brand: productsTable.brand,
        category: productsTable.category,
        description: productsTable.description,
        price: productsTable.price,
        priceRange: productsTable.priceRange,
        imageUrl: productsTable.imageUrl,
        purchaseUrl: productsTable.purchaseUrl,
        tags: productsTable.tags,
      },
    })
    .from(cartItemsTable)
    .innerJoin(productsTable, eq(cartItemsTable.productId, productsTable.id))
    .where(eq(cartItemsTable.sessionId, sessionId));

  const items = rows.map((r) => ({
    ...r,
    product: {
      ...r.product,
      price: parseFloat(r.product.price),
      tags: r.product.tags ?? [],
    },
  }));

  const estimatedTotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  res.json({
    sessionId,
    items,
    totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
    estimatedTotal: Math.round(estimatedTotal * 100) / 100,
  });
});

router.post("/cart", async (req, res) => {
  const { sessionId, productId, quantity } = req.body;
  if (!sessionId || !productId) {
    res.status(400).json({ error: "validation_error", message: "sessionId and productId required" });
    return;
  }

  const [existing] = await db
    .select()
    .from(cartItemsTable)
    .where(
      and(
        eq(cartItemsTable.sessionId, sessionId),
        eq(cartItemsTable.productId, productId)
      )
    );

  let cartItem;
  if (existing) {
    const [updated] = await db
      .update(cartItemsTable)
      .set({ quantity: existing.quantity + (quantity ?? 1) })
      .where(eq(cartItemsTable.id, existing.id))
      .returning();
    cartItem = updated;
  } else {
    const [created] = await db
      .insert(cartItemsTable)
      .values({ sessionId, productId, quantity: quantity ?? 1 })
      .returning();
    cartItem = created;
  }

  const [product] = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, cartItem.productId));

  res.status(201).json({
    ...cartItem,
    product: {
      ...product,
      price: parseFloat(product.price),
      tags: product.tags ?? [],
    },
  });
});

router.delete("/cart/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "invalid_id", message: "Invalid cart item ID" });
    return;
  }

  await db.delete(cartItemsTable).where(eq(cartItemsTable.id, id));

  res.json({ success: true, message: "Item removed from cart" });
});

export default router;
