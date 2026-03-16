import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { recommendationsTable, productsTable, submissionsTable } from "@workspace/db/schema";
import { eq, asc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/recommendations/:submissionId", async (req, res) => {
  const submissionId = parseInt(req.params.submissionId, 10);
  if (isNaN(submissionId)) {
    res.status(400).json({ error: "invalid_id", message: "Invalid submission ID" });
    return;
  }

  const rows = await db
    .select({
      id: recommendationsTable.id,
      submissionId: recommendationsTable.submissionId,
      category: recommendationsTable.category,
      reason: recommendationsTable.reason,
      applicationTip: recommendationsTable.applicationTip,
      sortOrder: recommendationsTable.sortOrder,
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
    .from(recommendationsTable)
    .innerJoin(productsTable, eq(recommendationsTable.productId, productsTable.id))
    .where(eq(recommendationsTable.submissionId, submissionId))
    .orderBy(asc(recommendationsTable.sortOrder));

  const result = rows.map((r) => ({
    ...r,
    product: {
      ...r.product,
      price: parseFloat(r.product.price),
      tags: r.product.tags ?? [],
    },
  }));

  res.json(result);
});

export default router;
