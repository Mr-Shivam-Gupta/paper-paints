import { Router, Request, Response } from "express";
import { ContactSubmission } from "../models/ContactSubmission.js";
import { toAPI } from "../utils/mapDoc.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAdmin, async (_req: Request, res: Response) => {
  try {
    const items = await ContactSubmission.find().sort({ createdAt: -1 }).lean();
    res.json({ items: items.map((d) => toAPI(d as never)) });
  } catch (e) {
    console.error("GET /contact", e);
    res.status(500).json({ error: "Failed to fetch contact submissions" });
  }
});

router.get("/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const doc = await ContactSubmission.findById(req.params.id).lean();
    const out = toAPI(doc as never);
    if (!out) return res.status(404).json(null);
    res.json(out);
  } catch (e) {
    console.error("GET /contact/:id", e);
    res.status(500).json({ error: "Failed to fetch contact submission" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const doc = await ContactSubmission.create(req.body);
    res.status(201).json(toAPI(doc.toObject() as never));
  } catch (e) {
    console.error("POST /contact", e);
    res.status(500).json({ error: "Failed to submit" });
  }
});

router.delete("/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const doc = await ContactSubmission.findByIdAndDelete(req.params.id).lean();
    const out = toAPI(doc as never);
    if (!out) return res.status(404).json({ error: "Not found" });
    res.json(out);
  } catch (e) {
    console.error("DELETE /contact/:id", e);
    res.status(500).json({ error: "Failed to delete" });
  }
});

export default router;
