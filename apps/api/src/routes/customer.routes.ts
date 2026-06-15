import { Router } from "express";
import type { Prisma } from "../generated/prisma/index.js";
import { prisma } from "../lib/prisma.js";
import { getStringQueryParam } from "../lib/queryParams.js";
import { attachCurrentUser, requireUser } from "../middleware/auth.js";

export const customerRouter = Router();

customerRouter.use(attachCurrentUser);
customerRouter.use(requireUser);

customerRouter.get("/", async (req, res, next) => {
  try {
    const organizationId = req.currentUser!.organizationId;
    const search = getStringQueryParam(req.query.search);

    const where: Prisma.CustomerWhereInput = {
      organizationId,
    };

    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          phone: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          externalReference: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    const customers = await prisma.customer.findMany({
      where,
      orderBy: {
        updatedAt: "desc",
      },
      take: 50,
      include: {
        cases: {
          orderBy: {
            updatedAt: "desc",
          },
          take: 3,
          select: {
            id: true,
            title: true,
            priority: true,
            updatedAt: true,
            status: {
              select: {
                id: true,
                name: true,
                slug: true,
                color: true,
                isClosed: true,
              },
            },
          },
        },
        _count: {
          select: {
            cases: true,
          },
        },
      },
    });

    res.status(200).json({
      data: customers.map((customer) => ({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        externalReference: customer.externalReference,
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt,
        caseCount: customer._count.cases,
        recentCases: customer.cases,
      })),
    });
  } catch (error) {
    next(error);
  }
});

customerRouter.get("/:id", async (req, res, next) => {
  try {
    const organizationId = req.currentUser!.organizationId;

    const customer = await prisma.customer.findFirst({
      where: {
        id: req.params.id,
        organizationId,
      },
      include: {
        cases: {
          orderBy: {
            updatedAt: "desc",
          },
          include: {
            assignedUser: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
              },
            },
            category: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
            status: {
              select: {
                id: true,
                name: true,
                slug: true,
                color: true,
                isClosed: true,
              },
            },
            _count: {
              select: {
                comments: true,
                attachments: true,
              },
            },
          },
        },
      },
    });

    if (!customer) {
      res.status(404).json({
        message: "Customer not found",
      });
      return;
    }

    res.status(200).json({
      data: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        externalReference: customer.externalReference,
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt,
        cases: customer.cases.map((caseItem) => ({
          id: caseItem.id,
          title: caseItem.title,
          description: caseItem.description,
          priority: caseItem.priority,
          source: caseItem.source,
          dueAt: caseItem.dueAt,
          closedAt: caseItem.closedAt,
          createdAt: caseItem.createdAt,
          updatedAt: caseItem.updatedAt,
          assignedUser: caseItem.assignedUser,
          category: caseItem.category,
          status: caseItem.status,
          commentCount: caseItem._count.comments,
          attachmentCount: caseItem._count.attachments,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
});
