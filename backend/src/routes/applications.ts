import { Router, Request, Response } from "express";
import { Application } from "../models/Application.js";
import { toAPI } from "../utils/mapDoc.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const items = await Application.find().sort({ createdAt: -1 }).lean();
    res.json({ items: items.map((d) => toAPI(d as never)) });
  } catch (e) {
    console.error("GET /applications", e);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const doc = await Application.findById(req.params.id).lean();
    const out = toAPI(doc as never);
    if (!out) return res.status(404).json(null);
    res.json(out);
  } catch (e) {
    console.error("GET /applications/:id", e);
    res.status(500).json({ error: "Failed to fetch application" });
  }
});

router.post("/", requireAdmin, async (req: Request, res: Response) => {
  try {
    const doc = await Application.create(req.body);
    res.status(201).json(toAPI(doc.toObject() as never));
  } catch (e) {
    console.error("POST /applications", e);
    res.status(500).json({ error: "Failed to create application" });
  }
});

router.put("/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const doc = await Application.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).lean();
    const out = toAPI(doc as never);
    if (!out) return res.status(404).json({ error: "Not found" });
    res.json(out);
  } catch (e) {
    console.error("PUT /applications/:id", e);
    res.status(500).json({ error: "Failed to update application" });
  }
});

router.delete("/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const doc = await Application.findByIdAndDelete(req.params.id).lean();
    const out = toAPI(doc as never);
    if (!out) return res.status(404).json({ error: "Not found" });
    res.json(out);
  } catch (e) {
    console.error("DELETE /applications/:id", e);
    res.status(500).json({ error: "Failed to delete application" });
  }
});

export default router;
