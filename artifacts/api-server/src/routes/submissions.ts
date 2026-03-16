import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { submissionsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.post("/submissions", async (req, res) => {
  const { serviceId, intakeData, selfieUrl, sessionId } = req.body;

  if (!serviceId || !intakeData || !sessionId) {
    res.status(400).json({ error: "validation_error", message: "Missing required fields" });
    return;
  }

  const [submission] = await db
    .insert(submissionsTable)
    .values({
      serviceId,
      sessionId,
      intakeData,
      selfieUrl: selfieUrl ?? null,
      status: "pending",
    })
    .returning();

  res.status(201).json({
    ...submission,
    intakeData: submission.intakeData as Record<string, unknown>,
  });
});

router.get("/submissions/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "invalid_id", message: "Invalid submission ID" });
    return;
  }

  const [submission] = await db
    .select()
    .from(submissionsTable)
    .where(eq(submissionsTable.id, id));

  if (!submission) {
    res.status(404).json({ error: "not_found", message: "Submission not found" });
    return;
  }

  res.json({
    ...submission,
    intakeData: submission.intakeData as Record<string, unknown>,
  });
});

export default router;
