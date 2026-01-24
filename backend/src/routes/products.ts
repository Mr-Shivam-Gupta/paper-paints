import { Router, Request, Response } from "express";
import { Product } from "../models/Product.js";
import { toAPI } from "../utils/mapDoc.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const items = await Product.find().sort({ createdAt: -1 }).lean();
    res.json({ items: items.map((d) => toAPI(d as never)) });
  } catch (e) {
    console.error("GET /products", e);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const doc = await Product.findById(req.params.id).lean();
    const out = toAPI(doc as never);
    if (!out) return res.status(404).json(null);
    res.json(out);
  } catch (e) {
    console.error("GET /products/:id", e);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

router.post("/", requireAdmin, async (req: Request, res: Response) => {
  try {
    const doc = await Product.create(req.body);
    res.status(201).json(toAPI(doc.toObject() as never));
  } catch (e) {
    console.error("POST /products", e);
    res.status(500).json({ error: "Failed to create product" });
  }
});

router.put("/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const doc = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).lean();
    const out = toAPI(doc as never);
    if (!out) return res.status(404).json({ error: "Not found" });
    res.json(out);
  } catch (e) {
    console.error("PUT /products/:id", e);
    res.status(500).json({ error: "Failed to update product" });
  }
});

router.delete("/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const doc = await Product.findByIdAndDelete(req.params.id).lean();
    const out = toAPI(doc as never);
    if (!out) return res.status(404).json({ error: "Not found" });
    res.json(out);
  } catch (e) {
    console.error("DELETE /products/:id", e);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;
