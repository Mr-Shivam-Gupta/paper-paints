import { Router, Request, Response } from "express";
import { DealerSubmission } from "../models/DealerSubmission.js";
import { toAPI } from "../utils/mapDoc.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAdmin, async (_req: Request, res: Response) => {
  try {
    const items = await DealerSubmission.find().sort({ createdAt: -1 }).lean();
    res.json({ items: items.map((d) => toAPI(d as never)) });
  } catch (e) {
    console.error("GET /dealer", e);
    res.status(500).json({ error: "Failed to fetch dealer submissions" });
  }
});

router.get("/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const doc = await DealerSubmission.findById(req.params.id).lean();
    const out = toAPI(doc as never);
    if (!out) return res.status(404).json(null);
    res.json(out);
  } catch (e) {
    console.error("GET /dealer/:id", e);
    res.status(500).json({ error: "Failed to fetch dealer submission" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const doc = await DealerSubmission.create(req.body);
    res.status(201).json(toAPI(doc.toObject() as never));
  } catch (e) {
    console.error("POST /dealer", e);
    res.status(500).json({ error: "Failed to submit" });
  }
});

router.delete("/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const doc = await DealerSubmission.findByIdAndDelete(req.params.id).lean();
    const out = toAPI(doc as never);
    if (!out) return res.status(404).json({ error: "Not found" });
    res.json(out);
  } catch (e) {
    console.error("DELETE /dealer/:id", e);
    res.status(500).json({ error: "Failed to delete" });
  }
});

export default router;
