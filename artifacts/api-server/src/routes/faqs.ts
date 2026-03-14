import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { faqsTable } from "@workspace/db/schema";
import { asc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/faqs", async (_req, res) => {
  const faqs = await db
    .select()
    .from(faqsTable)
    .orderBy(asc(faqsTable.sortOrder));

  res.json(faqs);
});

export default router;
