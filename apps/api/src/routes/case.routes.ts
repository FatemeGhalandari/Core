import { Router } from "express";
import { getDemoOrganizationId } from "../lib/demoOrg.js";
import { prisma } from "../lib/prisma.js";
import {
  attachCurrentUser,
  requireRole,
  requireUser,
} from "../middleware/auth.js";
import {
  createCaseSchema,
  createCommentSchema,
  updateCaseAssigneeSchema,
  updateCaseStatusSchema,
} from "./case.schemas.js";
import { getCaseListQuery } from "./case.filters.js";
import {
  caseDetailInclude,
  caseListInclude,
  toCaseListItem,
} from "./case.mappers.js";
import {
  addCaseComment,
  assignCase,
  changeCaseStatus,
  createCase,
} from "./case.commands.js";

export const caseRouter = Router();

caseRouter.use(attachCurrentUser);

const requireCaseWorker = [requireUser, requireRole("owner", "admin", "staff")];

caseRouter.post("/:id/comments", ...requireCaseWorker, async (req, res) => {
  const parsed = createCommentSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid request body",
      details: parsed.error.flatten(),
    });
  }

  const id = String(req.params.id);
  const organizationId = await getDemoOrganizationId();
  const result = await addCaseComment({
    caseId: id,
    organizationId,
    data: parsed.data,
  });

  if (result.error === "case_not_found") {
    return res.status(404).json({
      error: "Case not found",
    });
  }

  return res.status(201).json(result.data);
});

caseRouter.get("/", async (req, res, next) => {
  try {
    const organizationId = await getDemoOrganizationId();
    const { where, orderBy } = getCaseListQuery(req.query, organizationId);

    const cases = await prisma.case.findMany({
      where,
      orderBy,
      take: 50,
      include: caseListInclude,
    });

    res.status(200).json({
      data: cases.map(toCaseListItem),
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
    const result = await changeCaseStatus({
      caseId: id,
      organizationId,
      statusSlug,
    });

    if (result.error === "status_not_found") {
      res.status(404).json({
        error: "Status not found",
      });
      return;
    }

    if (result.error === "case_not_found") {
      res.status(404).json({
        error: "Case not found",
      });
      return;
    }

    res.status(200).json({
      data: result.data,
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
    const result = await assignCase({
      caseId: id,
      organizationId,
      assignedUserId,
    });

    if (result.error === "case_not_found") {
      res.status(404).json({
        error: "Case not found",
      });
      return;
    }

    if (result.error === "assigned_user_not_found") {
      res.status(404).json({
        error: "Assigned user not found",
      });
      return;
    }

    res.status(200).json({
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
});

caseRouter.post("/", ...requireCaseWorker, async (req, res, next) => {
  try {
    const parsed = createCaseSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        message: "Invalid request body",
        errors: parsed.error.flatten(),
      });
      return;
    }

    const organizationId = await getDemoOrganizationId();
    const result = await createCase({
      organizationId,
      data: parsed.data,
    });

    if (result.error === "missing_required_intake_fields") {
      res.status(400).json({
        message: "Missing required intake fields.",
        missingFields: result.missingFields,
      });
      return;
    }

    if (result.error === "default_status_not_found") {
      res.status(400).json({
        message: "No default workflow status found.",
      });
      return;
    }

    res.status(201).json({
      data: result.data,
    });
  } catch (error) {
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
      include: caseDetailInclude,
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
