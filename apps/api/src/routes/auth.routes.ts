import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { isDemoModeEnabled } from "../lib/demoMode.js";
import { prisma } from "../lib/prisma.js";

export const authRouter = Router();

const loginSchema = z.object({
  email: z.string().trim().email().toLowerCase(),
  password: z.string().min(1),
});

const demoSessionSchema = z.object({
  slug: z.string().trim().min(1).default("maplecare-clinic"),
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        message: "Invalid request body",
        errors: parsed.error.flatten(),
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: parsed.data.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        organizationId: true,
        passwordHash: true,
      },
    });

    if (!user?.passwordHash) {
      res.status(401).json({
        message: "Invalid email or password.",
      });
      return;
    }

    const isValidPassword = await bcrypt.compare(
      parsed.data.password,
      user.passwordHash,
    );

    if (!isValidPassword) {
      res.status(401).json({
        message: "Invalid email or password.",
      });
      return;
    }

    res.status(200).json({
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          organizationId: user.organizationId,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

authRouter.get("/demo-session", async (req, res, next) => {
  try {
    if (!isDemoModeEnabled()) {
      res.status(404).json({
        message: "Demo mode is not enabled for this environment.",
      });
      return;
    }

    const parsed = demoSessionSchema.safeParse({
      slug: typeof req.query.slug === "string" ? req.query.slug : undefined,
    });

    if (!parsed.success) {
      res.status(400).json({
        message: "Invalid request query",
        errors: parsed.error.flatten(),
      });
      return;
    }

    const demoUser = await prisma.user.findFirst({
      where: {
        organization: {
          slug: parsed.data.slug,
        },
        role: {
          in: ["owner", "admin"],
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        organizationId: true,
      },
    });

    if (!demoUser) {
      res.status(404).json({
        message: "Demo user not found.",
      });
      return;
    }

    res.status(200).json({
      data: {
        user: demoUser,
      },
    });
  } catch (error) {
    next(error);
  }
});

authRouter.get("/me", async (req, res, next) => {
  try {
    const userId = typeof req.query.userId === "string" ? req.query.userId : "";

    if (!userId) {
      res.status(401).json({
        message: "Missing userId.",
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        organizationId: true,
      },
    });

    if (!user) {
      res.status(404).json({
        message: "User not found.",
      });
      return;
    }

    res.status(200).json({
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
});
