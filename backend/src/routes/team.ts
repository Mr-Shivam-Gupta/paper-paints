import { Router, Request, Response } from "express";
import { TeamMember } from "../models/TeamMember.js";
import { toAPI } from "../utils/mapDoc.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const items = await TeamMember.find().sort({ createdAt: -1 }).lean();
    res.json({ items: items.map((d) => toAPI(d as never)) });
  } catch (e) {
    console.error("GET /team", e);
    res.status(500).json({ error: "Failed to fetch team" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const doc = await TeamMember.findById(req.params.id).lean();
    const out = toAPI(doc as never);
    if (!out) return res.status(404).json(null);
    res.json(out);
  } catch (e) {
    console.error("GET /team/:id", e);
    res.status(500).json({ error: "Failed to fetch team member" });
  }
});

router.post("/", requireAdmin, async (req: Request, res: Response) => {
  try {
    const doc = await TeamMember.create(req.body);
    res.status(201).json(toAPI(doc.toObject() as never));
  } catch (e) {
    console.error("POST /team", e);
    res.status(500).json({ error: "Failed to create team member" });
  }
});

router.put("/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const doc = await TeamMember.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).lean();
    const out = toAPI(doc as never);
    if (!out) return res.status(404).json({ error: "Not found" });
    res.json(out);
  } catch (e) {
    console.error("PUT /team/:id", e);
    res.status(500).json({ error: "Failed to update team member" });
  }
});

router.delete("/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const doc = await TeamMember.findByIdAndDelete(req.params.id).lean();
    const out = toAPI(doc as never);
    if (!out) return res.status(404).json({ error: "Not found" });
    res.json(out);
  } catch (e) {
    console.error("DELETE /team/:id", e);
    res.status(500).json({ error: "Failed to delete team member" });
  }
});

export default router;
