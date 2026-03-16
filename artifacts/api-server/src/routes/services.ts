import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { servicesTable } from "@workspace/db/schema";
import { asc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/services", async (_req, res) => {
  const services = await db
    .select()
    .from(servicesTable)
    .orderBy(asc(servicesTable.sortOrder));

  const result = services.map((s) => ({
    ...s,
    price: parseFloat(s.price),
    features: s.features ?? [],
  }));

  res.json(result);
});

export default router;
