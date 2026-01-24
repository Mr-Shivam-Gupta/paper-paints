import { Router, Request, Response } from "express";
import { Project } from "../models/Project.js";
import { toProject } from "../utils/mapDoc.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const items = await Project.find().sort({ createdAt: -1 }).lean();
    res.json({ items: items.map((d) => toProject(d as never)) });
  } catch (e) {
    console.error("GET /projects", e);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const doc = await Project.findById(req.params.id).lean();
    const out = toProject(doc as never);
    if (!out) return res.status(404).json(null);
    res.json(out);
  } catch (e) {
    console.error("GET /projects/:id", e);
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

router.post("/", requireAdmin, async (req: Request, res: Response) => {
  try {
    if (req.body.completionDate) req.body.completionDate = new Date(req.body.completionDate);
    const doc = await Project.create(req.body);
    res.status(201).json(toProject(doc.toObject() as never));
  } catch (e) {
    console.error("POST /projects", e);
    res.status(500).json({ error: "Failed to create project" });
  }
});

router.put("/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    if (req.body.completionDate) req.body.completionDate = new Date(req.body.completionDate);
    const doc = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).lean();
    const out = toProject(doc as never);
    if (!out) return res.status(404).json({ error: "Not found" });
    res.json(out);
  } catch (e) {
    console.error("PUT /projects/:id", e);
    res.status(500).json({ error: "Failed to update project" });
  }
});

router.delete("/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const doc = await Project.findByIdAndDelete(req.params.id).lean();
    const out = toProject(doc as never);
    if (!out) return res.status(404).json({ error: "Not found" });
    res.json(out);
  } catch (e) {
    console.error("DELETE /projects/:id", e);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

export default router;
