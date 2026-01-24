import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { Admin } from "../models/Admin.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

/**
 * Create a new admin. Requires an existing admin session.
 * POST /api/admins  Body: { email, password }
 */
router.post("/", requireAdmin, async (req: Request, res: Response) => {
  const email = String(req.body?.email || "").trim().toLowerCase();
  const password = String(req.body?.password || "");

  if (!email || !password || password.length < 8) {
    return res.status(400).json({ error: "Email and password (min 8 chars) are required" });
  }

  try {
    const exists = await Admin.findOne({ email });
    if (exists) {
      return res.status(409).json({ error: "An admin with this email already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const admin = await Admin.create({ email, passwordHash });
    res.status(201).json({ _id: admin._id.toString(), email: admin.email });
  } catch (e) {
    console.error("POST /api/admins", e);
    res.status(500).json({ error: "Failed to create admin" });
  }
});

export default router;
