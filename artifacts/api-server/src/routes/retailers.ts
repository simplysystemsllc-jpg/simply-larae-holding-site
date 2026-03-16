import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { approvedRetailersTable } from "@workspace/db/schema";
import { eq, asc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/retailers", async (_req, res) => {
  try {
    const retailers = await db
      .select()
      .from(approvedRetailersTable)
      .where(eq(approvedRetailersTable.isActive, true))
      .orderBy(asc(approvedRetailersTable.priorityRank));
    res.json(retailers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch retailers" });
  }
});

router.get("/retailers/all", async (_req, res) => {
  try {
    const retailers = await db
      .select()
      .from(approvedRetailersTable)
      .orderBy(asc(approvedRetailersTable.priorityRank));
    res.json(retailers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch retailers" });
  }
});

router.post("/retailers", async (req, res) => {
  try {
    const { retailerName, website, retailerType, priorityRank, notes } = req.body;
    const [retailer] = await db
      .insert(approvedRetailersTable)
      .values({ retailerName, website, retailerType, priorityRank, notes })
      .returning();
    res.status(201).json(retailer);
  } catch (err) {
    res.status(500).json({ error: "Failed to create retailer" });
  }
});

router.patch("/retailers/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { isActive, priorityRank, notes } = req.body;
    const [updated] = await db
      .update(approvedRetailersTable)
      .set({ isActive, priorityRank, notes, updatedAt: new Date() })
      .where(eq(approvedRetailersTable.id, id))
      .returning();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update retailer" });
  }
});

export default router;
