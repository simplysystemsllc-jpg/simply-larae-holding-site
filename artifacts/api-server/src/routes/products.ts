import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { productsTable } from "@workspace/db/schema";
import { eq, asc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/products", async (req, res) => {
  const { category, priceRange } = req.query as { category?: string; priceRange?: string };

  let query = db.select().from(productsTable).orderBy(asc(productsTable.category));

  const rows = await query;

  let filtered = rows;
  if (category) filtered = filtered.filter((p) => p.category === category);
  if (priceRange) filtered = filtered.filter((p) => p.priceRange === priceRange);

  const result = filtered.map((p) => ({
    ...p,
    price: parseFloat(p.price),
    tags: p.tags ?? [],
  }));

  res.json(result);
});

export default router;
