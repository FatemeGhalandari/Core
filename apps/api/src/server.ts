import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { prisma } from "./lib/prisma.js";
import { authRouter } from "./routes/auth.routes.js";
import { caseRouter } from "./routes/case.routes.js";
import { customerRouter } from "./routes/customer.routes.js";
import { reportRouter } from "./routes/report.routes.js";
import { settingsRouter } from "./routes/settings.routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT ?? 4000;
const CLIENT_URL = process.env.CLIENT_URL ?? "http://localhost:5173";

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.use("/api/cases", caseRouter);

app.use("/api/customers", customerRouter);

app.use("/api/reports", reportRouter);

app.use("/api/settings", settingsRouter);

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "core-api",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/debug/db", async (_req, res, next) => {
  try {
    const organizationCount = await prisma.organization.count();
    const userCount = await prisma.user.count();
    const customerCount = await prisma.customer.count();
    const caseCount = await prisma.case.count();

    res.status(200).json({
      status: "ok",
      database: {
        organizations: organizationCount,
        users: userCount,
        customers: customerCount,
        cases: caseCount,
      },
    });
  } catch (error) {
    next(error);
  }
});

app.use(
  (
    error: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  },
);

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
