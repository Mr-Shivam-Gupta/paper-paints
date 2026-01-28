import { Router, Request, Response } from "express";
import multer from "multer";
import { cloudinary } from "../config/cloudinary.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/image", upload.single("image"), async (req: Request, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const result = await new Promise<{ url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "paper-paints/images", resource_type: "image" },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve({ url: result.secure_url });
        }
      );
      stream.end(req.file!.buffer);
    });

    res.json(result);
  } catch (e) {
    console.error("POST /uploads/image", e);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

export default router;

