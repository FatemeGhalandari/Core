import type { NextFunction, Request, RequestHandler, Response } from "express";
import { prisma } from "../lib/prisma.js";
import type { AppRole } from "../lib/permissions.js";
import { isDemoModeEnabled } from "../lib/demoMode.js";

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  role: AppRole;
  organizationId: string;
};

export async function attachCurrentUser(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    const demoOrganizationSlug = req.header("x-demo-organization-slug");

    if (demoOrganizationSlug && isDemoModeEnabled()) {
      const demoUser = await prisma.user.findFirst({
        where: {
          organization: {
            slug: demoOrganizationSlug,
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

      if (demoUser) {
        req.currentUser = {
          ...demoUser,
          role: demoUser.role as AppRole,
        };
        next();
        return;
      }
    }

    const userId = req.header("x-user-id");

    if (!userId) {
      next();
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

    if (user) {
      req.currentUser = {
        ...user,
        role: user.role as AppRole,
      };
    }

    next();
  } catch (error) {
    next(error);
  }
}

export function requireUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.currentUser) {
    res.status(401).json({
      message: "Authentication required.",
    });
    return;
  }

  next();
}

export function requireRole(...allowedRoles: AppRole[]): RequestHandler {
  return (req, res, next) => {
    if (!req.currentUser) {
      res.status(401).json({
        message: "Authentication required.",
      });
      return;
    }

    if (!allowedRoles.includes(req.currentUser.role)) {
      res.status(403).json({
        message: "Insufficient permissions.",
      });
      return;
    }

    next();
  };
}
