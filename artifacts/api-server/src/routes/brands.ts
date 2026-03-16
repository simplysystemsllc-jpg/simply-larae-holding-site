import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { brandsTable, brandPartnershipsTable, partnershipContactLogTable } from "@workspace/db/schema";
import { eq, asc, desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/brands", async (_req, res) => {
  try {
    const brands = await db
      .select()
      .from(brandsTable)
      .orderBy(asc(brandsTable.brandName));
    res.json(brands);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch brands" });
  }
});

router.post("/brands", async (req, res) => {
  try {
    const { brandName, website, contactName, contactEmail, partnershipStatus, notes } = req.body;
    const [brand] = await db
      .insert(brandsTable)
      .values({ brandName, website, contactName, contactEmail, partnershipStatus, notes })
      .returning();
    res.status(201).json(brand);
  } catch (err) {
    res.status(500).json({ error: "Failed to create brand" });
  }
});

router.get("/brands/:id/partnerships", async (req, res) => {
  try {
    const brandId = parseInt(req.params.id, 10);
    const partnerships = await db
      .select()
      .from(brandPartnershipsTable)
      .where(eq(brandPartnershipsTable.brandId, brandId));
    res.json(partnerships);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch partnerships" });
  }
});

router.get("/brands/:id/contact-log", async (req, res) => {
  try {
    const brandId = parseInt(req.params.id, 10);
    const log = await db
      .select()
      .from(partnershipContactLogTable)
      .where(eq(partnershipContactLogTable.brandId, brandId))
      .orderBy(desc(partnershipContactLogTable.createdAt));
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contact log" });
  }
});

export default router;
