import { Router } from "express";
import { Priority } from "../generated/prisma/index.js";
import type { Prisma } from "../generated/prisma/index.js";
import { prisma } from "../lib/prisma.js";
import {
  attachCurrentUser,
  requireRole,
  requireUser,
} from "../middleware/auth.js";
import { z } from "zod";

export const caseRouter = Router();

caseRouter.use(attachCurrentUser);

const requireCaseWorker = [requireUser, requireRole("owner", "admin", "staff")];

const createCaseSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  customerName: z.string().min(2),
  customerEmail: z.string().email().optional(),
  customerPhone: z.string().optional(),
  priority: z.nativeEnum(Priority).default(Priority.normal),
  intakeData: z.record(z.string(), z.unknown()).optional(),
});

const createCommentSchema = z.object({
  body: z.string().min(2),
  visibility: z.enum(["public", "internal"]).default("internal"),
});

const updateCaseStatusSchema = z.object({
  statusSlug: z.string().min(1),
});

const updateCaseAssigneeSchema = z.object({
  assignedUserId: z.string().min(1).nullable(),
});

function getStringQueryParam(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function isPriority(value: string): value is Priority {
  return Object.values(Priority).includes(value as Priority);
}

function hasNonEmptyIntakeValue(value: unknown) {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;

  return true;
}

async function getDemoOrganizationId(): Promise<string> {
  const organization = await prisma.organization.findUnique({
    where: {
      slug: "maplecare-clinic",
    },
    select: {
      id: true,
    },
  });

  if (!organization) {
    throw new Error(
      "Demo organization not found. Run the database seed first.",
    );
  }

  return organization.id;
}

caseRouter.post("/:id/comments", ...requireCaseWorker, async (req, res) => {
  const parsed = createCommentSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid request body",
      details: parsed.error.flatten(),
    });
  }

  const id = String(req.params.id);
  const { body, visibility } = parsed.data;

  const organization = await prisma.organization.findFirst({
    where: {
      name: "MapleCare Clinic",
    },
  });

  if (!organization) {
    return res.status(404).json({
      error: "Demo organization not found",
    });
  }

  const existingCase = await prisma.case.findFirst({
    where: {
      id,
      organizationId: organization.id,
    },
  });

  if (!existingCase) {
    return res.status(404).json({
      error: "Case not found",
    });
  }

  const staffUser = await prisma.user.findFirst({
    where: {
      organizationId: organization.id,
      role: "staff",
    },
  });

  const comment = await prisma.caseComment.create({
    data: {
      organizationId: organization.id,
      caseId: existingCase.id,
      authorUserId: staffUser?.id,
      body,
      visibility,
    },
    include: {
      authorUser: true,
      authorCustomer: true,
    },
  });

  await prisma.caseActivityEvent.create({
    data: {
      organizationId: organization.id,
      caseId: existingCase.id,
      actorUserId: staffUser?.id,
      eventType: "case.comment_added",
      metadata: {
        visibility,
      },
    },
  });

  return res.status(201).json(comment);
});

caseRouter.get("/", async (req, res, next) => {
  try {
    const organizationId = await getDemoOrganizationId();

    const search = getStringQueryParam(req.query.search);
    const statusSlug = getStringQueryParam(req.query.statusSlug);
    const priority = getStringQueryParam(req.query.priority);
    const categorySlug = getStringQueryParam(req.query.categorySlug);
    const assignedUserId = getStringQueryParam(req.query.assignedUserId);
    const sort = getStringQueryParam(req.query.sort) ?? "updated";

    const where: Prisma.CaseWhereInput = {
      organizationId,
    };

    if (statusSlug) {
      where.status = {
        slug: statusSlug,
      };
    }

    if (priority && isPriority(priority)) {
      where.priority = priority;
    }

    if (categorySlug) {
      where.category = {
        slug: categorySlug,
      };
    }

    if (assignedUserId === "unassigned") {
      where.assignedUserId = null;
    } else if (assignedUserId) {
      where.assignedUserId = assignedUserId;
    }

    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          customer: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
        {
          customer: {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
        {
          status: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
        {
          category: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      ];
    }

    let orderBy: Prisma.CaseOrderByWithRelationInput = {
      updatedAt: "desc",
    };

    if (sort === "newest") {
      orderBy = {
        createdAt: "desc",
      };
    }

    if (sort === "oldest") {
      orderBy = {
        createdAt: "asc",
      };
    }

    if (sort === "updated") {
      orderBy = {
        updatedAt: "desc",
      };
    }

    if (sort === "priority") {
      orderBy = {
        priority: "desc",
      };
    }

    const cases = await prisma.case.findMany({
      where,
      orderBy,
      take: 50,
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            externalReference: true,
          },
        },
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
    });

    res.status(200).json({
      data: cases.map((caseItem) => ({
        id: caseItem.id,
        title: caseItem.title,
        description: caseItem.description,
        priority: caseItem.priority,
        source: caseItem.source,
        dueAt: caseItem.dueAt,
        closedAt: caseItem.closedAt,
        createdAt: caseItem.createdAt,
        updatedAt: caseItem.updatedAt,
        customer: caseItem.customer,
        assignedUser: caseItem.assignedUser,
        category: caseItem.category,
        status: caseItem.status,
        commentCount: caseItem._count.comments,
        attachmentCount: caseItem._count.attachments,
      })),
    });
  } catch (error) {
    next(error);
  }
});

caseRouter.patch("/:id/status", ...requireCaseWorker, async (req, res, next) => {
  try {
    const parsed = updateCaseStatusSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        error: "Invalid request body",
        details: parsed.error.flatten(),
      });
      return;
    }

    const id = String(req.params.id);
    const { statusSlug } = parsed.data;

    const organizationId = await getDemoOrganizationId();

    const status = await prisma.workflowStatus.findFirst({
      where: {
        organizationId,
        slug: statusSlug,
      },
    });

    if (!status) {
      res.status(404).json({
        error: "Status not found",
      });
      return;
    }

    const existingCase = await prisma.case.findFirst({
      where: {
        id,
        organizationId,
      },
      include: {
        status: true,
      },
    });

    if (!existingCase) {
      res.status(404).json({
        error: "Case not found",
      });
      return;
    }

    const updatedCase = await prisma.case.update({
      where: {
        id,
      },
      data: {
        statusId: status.id,
      },
      include: {
        customer: true,
        assignedUser: true,
        category: true,
        status: true,
      },
    });

    await prisma.caseActivityEvent.create({
      data: {
        organizationId,
        caseId: updatedCase.id,
        eventType: "case.status_changed",
        metadata: {
          fromStatusId: existingCase.status.id,
          fromStatusName: existingCase.status.name,
          toStatusId: status.id,
          toStatusName: status.name,
        },
      },
    });

    res.status(200).json({
      data: updatedCase,
    });
  } catch (error) {
    next(error);
  }
});

caseRouter.patch("/:id/assignee", ...requireCaseWorker, async (req, res, next) => {
  try {
    const parsed = updateCaseAssigneeSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        error: "Invalid request body",
        details: parsed.error.flatten(),
      });
      return;
    }

    const id = String(req.params.id);
    const { assignedUserId } = parsed.data;

    const organizationId = await getDemoOrganizationId();

    const existingCase = await prisma.case.findFirst({
      where: {
        id,
        organizationId,
      },
      include: {
        assignedUser: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!existingCase) {
      res.status(404).json({
        error: "Case not found",
      });
      return;
    }

    const nextAssignee =
      assignedUserId === null
        ? null
        : await prisma.user.findFirst({
            where: {
              id: assignedUserId,
              organizationId,
            },
            select: {
              id: true,
              name: true,
            },
          });

    if (assignedUserId !== null && !nextAssignee) {
      res.status(404).json({
        error: "Assigned user not found",
      });
      return;
    }

    const updatedCase = await prisma.$transaction(async (tx) => {
      const assignedCase = await tx.case.update({
        where: {
          id: existingCase.id,
        },
        data: {
          assignedUserId,
        },
        include: {
          customer: true,
          assignedUser: true,
          category: true,
          status: true,
        },
      });

      await tx.caseActivityEvent.create({
        data: {
          organizationId,
          caseId: assignedCase.id,
          actorUserId: nextAssignee?.id,
          eventType: "case.assigned",
          metadata: {
            fromAssigneeId: existingCase.assignedUser?.id ?? null,
            fromAssigneeName: existingCase.assignedUser?.name ?? null,
            toAssigneeId: nextAssignee?.id ?? null,
            toAssigneeName: nextAssignee?.name ?? null,
          },
        },
      });

      return assignedCase;
    });

    res.status(200).json({
      data: updatedCase,
    });
  } catch (error) {
    next(error);
  }
});

caseRouter.post("/", ...requireCaseWorker, async (req, res, next) => {
  try {
    const organizationId = await getDemoOrganizationId();
    const data = createCaseSchema.parse(req.body);
    const intakeData = data.intakeData ?? {};

    const requiredIntakeFields = await prisma.intakeField.findMany({
      where: {
        organizationId,
        isActive: true,
        isRequired: true,
      },
      select: {
        key: true,
      },
    });

    const missingIntakeFieldKeys = requiredIntakeFields
      .map((field) => field.key)
      .filter((key) => !hasNonEmptyIntakeValue(intakeData[key]));

    if (missingIntakeFieldKeys.length > 0) {
      res.status(400).json({
        message: "Missing required intake fields.",
        missingFields: missingIntakeFieldKeys,
      });
      return;
    }

    const defaultStatus = await prisma.workflowStatus.findFirst({
      where: {
        organizationId,
        isDefault: true,
      },
    });

    if (!defaultStatus) {
      res.status(400).json({
        message: "No default workflow status found.",
      });
      return;
    }

    const defaultCategory = await prisma.caseCategory.findFirst({
      where: {
        organizationId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const staffUser = await prisma.user.findFirst({
      where: {
        organizationId,
        role: "staff",
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const result = await prisma.$transaction(async (tx) => {
      const caseIntakeData = intakeData as Prisma.InputJsonObject;

      const customer = await tx.customer.create({
        data: {
          organizationId,
          name: data.customerName,
          email: data.customerEmail,
          phone: data.customerPhone,
        },
      });

      const newCase = await tx.case.create({
        data: {
          organizationId,
          customerId: customer.id,
          assignedUserId: staffUser?.id,
          categoryId: defaultCategory?.id,
          statusId: defaultStatus.id,
          title: data.title,
          description: data.description,
          priority: data.priority,
          source: "staff_created",
          intakeData: caseIntakeData,
        },
        include: {
          customer: true,
          assignedUser: true,
          category: true,
          status: true,
        },
      });

      await tx.caseActivityEvent.create({
        data: {
          organizationId,
          caseId: newCase.id,
          actorUserId: staffUser?.id,
          eventType: "case.created",
          metadata: {
            title: newCase.title,
            source: "staff_created",
          },
        },
      });

      return newCase;
    });

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: "Invalid request body",
        errors: error.flatten(),
      });
      return;
    }

    next(error);
  }
});

caseRouter.get("/:id", async (req, res, next) => {
  try {
    const organizationId = await getDemoOrganizationId();

    const caseItem = await prisma.case.findFirst({
      where: {
        id: req.params.id,
        organizationId,
      },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            externalReference: true,
          },
        },
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
            description: true,
          },
        },
        status: {
          select: {
            id: true,
            name: true,
            slug: true,
            color: true,
            sortOrder: true,
            isClosed: true,
          },
        },
        comments: {
          orderBy: {
            createdAt: "asc",
          },
          include: {
            authorUser: {
              select: {
                id: true,
                name: true,
                role: true,
              },
            },
            authorCustomer: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        attachments: {
          orderBy: {
            createdAt: "desc",
          },
        },
        activityEvents: {
          orderBy: {
            createdAt: "asc",
          },
          include: {
            actorUser: {
              select: {
                id: true,
                name: true,
                role: true,
              },
            },
            actorCustomer: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!caseItem) {
      res.status(404).json({
        message: "Case not found",
      });
      return;
    }

    res.status(200).json({
      data: caseItem,
    });
  } catch (error) {
    next(error);
  }
});
