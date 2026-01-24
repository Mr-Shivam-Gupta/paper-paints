import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { signToken, verifyToken, getCookieOpts, COOKIE_NAME } from "../middleware/auth.js";
import { Admin } from "../models/Admin.js";

const router = Router();

router.get("/check", (req: Request, res: Response) => {
  const payload = verifyToken(req.cookies?.[COOKIE_NAME]);
  if (payload) return res.json({ ok: true });
  res.status(401).json({ error: "Unauthorized" });
});

router.post("/login", async (req: Request, res: Response) => {
  const email = String(req.body?.email || "").trim().toLowerCase();
  const password = String(req.body?.password || "");

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const admin = await Admin.findOne({ email }).lean();
    if (!admin) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, admin.passwordHash);
    if (!match) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = signToken({ sub: String(admin._id), email: admin.email });
    if (!token) {
      return res.status(503).json({ error: "Server misconfigured. Set SESSION_SECRET or ADMIN_PASSWORD." });
    }

    res.cookie(COOKIE_NAME, token, getCookieOpts());
    res.json({ ok: true });
  } catch (e) {
    console.error("POST /api/auth/login", e);
    res.status(500).json({ error: "Login failed" });
  }
});

router.post("/logout", (_req: Request, res: Response) => {
  res.clearCookie(COOKIE_NAME, { path: "/" });
  res.json({ ok: true });
});

export default router;
