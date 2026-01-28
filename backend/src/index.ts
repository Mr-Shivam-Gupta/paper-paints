import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import { bootstrapAdmin } from "./config/bootstrap.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admins.js";
import productRoutes from "./routes/products.js";
import applicationRoutes from "./routes/applications.js";
import teamRoutes from "./routes/team.js";
import dealerRoutes from "./routes/dealer.js";
import contactRoutes from "./routes/contact.js";
import uploadRoutes from "./routes/uploads.js";
import careerRoutes from "./routes/career.js";

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/dealer", dealerRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/career", careerRoutes);

app.get("/api/health", (_req, res) => res.json({ ok: true }));

connectDB()
  .then(() => bootstrapAdmin())
  .then(() => {
    app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));
  })
  .catch((e) => {
    console.error("DB connect failed:", e);
    process.exit(1);
  });
