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

function getClientOrigins() {
  const configuredOrigins = process.env.CLIENT_URLS ?? process.env.CLIENT_URL;

  if (!configuredOrigins && process.env.NODE_ENV === "production") {
    throw new Error("CLIENT_URLS or CLIENT_URL must be set in production.");
  }

  return (configuredOrigins ?? "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

const CLIENT_ORIGINS = getClientOrigins();

function isAllowedOrigin(origin: string) {
  if (CLIENT_ORIGINS.includes(origin)) {
    return true;
  }

  if (process.env.NODE_ENV !== "production") {
    return /^http:\/\/localhost:\d+$/.test(origin);
  }

  return false;
}

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin ${origin} is not allowed by CORS.`));
    },
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
  console.log(`API listening on port ${PORT}`);
});
