import { Router, Request, Response } from "express";
import multer from "multer";
import { cloudinary } from "../config/cloudinary.js";
import { CareerSubmission } from "../models/CareerSubmission.js";
import { toAPI } from "../utils/mapDoc.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("resume"), async (req: Request, res: Response) => {
  try {
    let resumeUrl: string | undefined;

    if (req.file) {
      const result = await new Promise<{ url: string }>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "paper-paints/resumes", resource_type: "raw" },
          (error, result) => {
            if (error || !result) return reject(error);
            resolve({ url: result.secure_url });
          }
        );
        stream.end(req.file!.buffer);
      });
      resumeUrl = result.url;
    }

    const { name, email, phone, preferredRole, experience, message, jobId } = req.body;

    const doc = await CareerSubmission.create({
      name,
      email,
      phone,
      preferredRole,
      experience,
      message,
      jobId,
      resumeUrl,
    });

    res.status(201).json({ success: true, id: doc._id });
  } catch (e) {
    console.error("POST /career", e);
    res.status(500).json({ error: "Failed to submit career application" });
  }
});

router.get("/", requireAdmin, async (_req: Request, res: Response) => {
  try {
    const items = await CareerSubmission.find().sort({ createdAt: -1 }).lean();
    res.json({ items: items.map((d) => toAPI(d as never)) });
  } catch (e) {
    console.error("GET /career", e);
    res.status(500).json({ error: "Failed to fetch career submissions" });
  }
});

router.get("/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const doc = await CareerSubmission.findById(req.params.id).lean();
    const out = toAPI(doc as never);
    if (!out) return res.status(404).json(null);
    res.json(out);
  } catch (e) {
    console.error("GET /career/:id", e);
    res.status(500).json({ error: "Failed to fetch career submission" });
  }
});

router.delete("/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const doc = await CareerSubmission.findByIdAndDelete(req.params.id).lean();
    const out = toAPI(doc as never);
    if (!out) return res.status(404).json({ error: "Not found" });
    res.json(out);
  } catch (e) {
    console.error("DELETE /career/:id", e);
    res.status(500).json({ error: "Failed to delete career submission" });
  }
});

export default router;

