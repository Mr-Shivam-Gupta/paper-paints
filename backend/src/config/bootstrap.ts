import bcrypt from "bcryptjs";
import { Admin } from "../models/Admin.js";

/**
 * Create an initial admin from ADMIN_EMAIL and ADMIN_PASSWORD if no admins exist.
 */
export async function bootstrapAdmin(): Promise<void> {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password || password.length < 8) return;

  const exists = await Admin.exists();
  if (exists) return;

  const passwordHash = await bcrypt.hash(password, 12);
  await Admin.create({ email, passwordHash });
  console.log("Bootstrap: initial admin created for", email);
}
