import { Router } from "express";
import { z } from "zod";
import {
  DEMO_ORGANIZATION_SLUG,
  getDemoOrganizationId,
} from "../lib/demoOrg.js";
import { prisma } from "../lib/prisma.js";
import { slugify } from "../lib/slug.js";
import {
  attachCurrentUser,
  requireRole,
  requireUser,
} from "../middleware/auth.js";

export const settingsRouter = Router();

settingsRouter.use(attachCurrentUser);

const requireSettingsManager = [requireUser, requireRole("owner", "admin")];

const industryTemplates = [
  {
    key: "general",
    name: "General Operations",
    appName: "Core",
    caseLabel: "Case",
    customerLabel: "Customer",
    defaultStatuses: ["New", "In Progress", "Waiting on Customer", "Closed"],
    defaultCategories: ["General", "Review", "Follow-up"],
  },
  {
    key: "clinic",
    name: "Clinic",
    appName: "Core Clinic",
    caseLabel: "Request",
    customerLabel: "Patient",
    defaultStatuses: ["New", "Triage", "Scheduled", "Waiting on Patient", "Closed"],
    defaultCategories: ["Intake", "Appointment", "Billing", "Records"],
  },
  {
    key: "real_estate",
    name: "Real Estate",
    appName: "Core Realty",
    caseLabel: "Inquiry",
    customerLabel: "Client",
    defaultStatuses: ["New Lead", "Qualified", "Viewing Scheduled", "Offer", "Closed"],
    defaultCategories: ["Buyer Lead", "Seller Lead", "Viewing", "Property Inquiry"],
  },
  {
    key: "finance",
    name: "Finance",
    appName: "Core Finance",
    caseLabel: "Application",
    customerLabel: "Customer",
    defaultStatuses: ["Submitted", "Under Review", "Needs Information", "Approved", "Closed"],
    defaultCategories: ["Application", "Dispute", "Transaction Review", "Document Request"],
  },
  {
    key: "insurance",
    name: "Insurance",
    appName: "Core Insurance",
    caseLabel: "Claim",
    customerLabel: "Policyholder",
    defaultStatuses: ["Filed", "Assessing", "Waiting on Documents", "Decision", "Closed"],
    defaultCategories: ["Claim", "Quote", "Policy Change", "Document Review"],
  },
  {
    key: "sales",
    name: "Sales",
    appName: "Core Sales",
    caseLabel: "Deal",
    customerLabel: "Lead",
    defaultStatuses: ["New Lead", "Contacted", "Qualified", "Proposal", "Closed"],
    defaultCategories: ["Inbound Lead", "Outbound Lead", "Renewal", "Expansion"],
  },
  {
    key: "local_business",
    name: "Local Business",
    appName: "Core Local",
    caseLabel: "Booking",
    customerLabel: "Customer",
    defaultStatuses: ["Requested", "Confirmed", "In Progress", "Waiting on Customer", "Closed"],
    defaultCategories: ["Booking", "Service Request", "Quote", "Follow-up"],
  },
];

const createWorkflowStatusSchema = z.object({
  name: z.string().trim().min(2),
  color: z.string().trim().min(1).optional(),
  isDefault: z.boolean().default(false),
  isClosed: z.boolean().default(false),
});

const updateWorkflowStatusSchema = z
  .object({
    name: z.string().trim().min(2).optional(),
    color: z.string().trim().min(1).nullable().optional(),
    sortOrder: z.coerce.number().int().min(0).optional(),
    isDefault: z.boolean().optional(),
    isClosed: z.boolean().optional(),
  })
  .strict();

const createCaseCategorySchema = z
  .object({
    name: z.string().trim().min(2),
    description: z.string().trim().min(1).nullable().optional(),
  })
  .strict();

const updateCaseCategorySchema = z
  .object({
    name: z.string().trim().min(2).optional(),
    description: z.string().trim().min(1).nullable().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required.",
  });

const updateWorkspaceSchema = z
  .object({
    appName: z.string().trim().min(1).nullable().optional(),
    caseLabel: z.string().trim().min(1).nullable().optional(),
    customerLabel: z.string().trim().min(1).nullable().optional(),
    industryTemplateKey: z.string().trim().min(1).nullable().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required.",
  });

const createIntakeFieldSchema = z
  .object({
    label: z.string().trim().min(2),
    fieldType: z.enum([
      "text",
      "textarea",
      "email",
      "phone",
      "number",
      "date",
      "select",
      "multiselect",
      "checkbox",
    ]),
    isRequired: z.boolean(),
    showOnCaseDetail: z.boolean(),
    isActive: z.boolean().default(true),
  })
  .strict();

const updateIntakeFieldSchema = z
  .object({
    label: z.string().trim().min(2).optional(),
    fieldType: z
      .enum([
        "text",
        "textarea",
        "email",
        "phone",
        "number",
        "date",
        "select",
        "multiselect",
        "checkbox",
      ])
      .optional(),
    isRequired: z.boolean().optional(),
    sortOrder: z.coerce.number().int().min(0).optional(),
    showOnCaseDetail: z.boolean().optional(),
    isActive: z.boolean().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required.",
  });

settingsRouter.get("/industry-templates", (_req, res) => {
  res.status(200).json({
    data: industryTemplates,
  });
});

settingsRouter.get("/workspace", async (_req, res, next) => {
  try {
    const workspace = await prisma.organization.findUnique({
      where: {
        slug: DEMO_ORGANIZATION_SLUG,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        industry: true,
        appName: true,
        caseLabel: true,
        customerLabel: true,
        industryTemplateKey: true,
      },
    });

    if (!workspace) {
      res.status(404).json({
        message: "Workspace not found.",
      });
      return;
    }

    res.status(200).json({
      data: workspace,
    });
  } catch (error) {
    next(error);
  }
});

settingsRouter.patch("/workspace", ...requireSettingsManager, async (req, res, next) => {
  try {
    const parsed = updateWorkspaceSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        message: "Invalid request body",
        errors: parsed.error.flatten(),
      });
      return;
    }

    const existingWorkspace = await prisma.organization.findUnique({
      where: {
        slug: DEMO_ORGANIZATION_SLUG,
      },
      select: {
        id: true,
      },
    });

    if (!existingWorkspace) {
      res.status(404).json({
        message: "Workspace not found.",
      });
      return;
    }

    const updatedWorkspace = await prisma.organization.update({
      where: {
        id: existingWorkspace.id,
      },
      data: {
        appName: parsed.data.appName,
        caseLabel: parsed.data.caseLabel,
        customerLabel: parsed.data.customerLabel,
        industryTemplateKey: parsed.data.industryTemplateKey,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        industry: true,
        appName: true,
        caseLabel: true,
        customerLabel: true,
        industryTemplateKey: true,
      },
    });

    res.status(200).json({
      data: updatedWorkspace,
    });
  } catch (error) {
    next(error);
  }
});

settingsRouter.get("/intake-fields", async (_req, res, next) => {
  try {
    const organizationId = await getDemoOrganizationId();

    const intakeFields = await prisma.intakeField.findMany({
      where: {
        organizationId,
      },
      orderBy: [
        {
          sortOrder: "asc",
        },
        {
          label: "asc",
        },
      ],
      select: {
        id: true,
        key: true,
        label: true,
        fieldType: true,
        placeholder: true,
        helpText: true,
        options: true,
        isRequired: true,
        showOnCaseDetail: true,
        isActive: true,
        sortOrder: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({
      data: intakeFields,
    });
  } catch (error) {
    next(error);
  }
});

settingsRouter.post("/intake-fields", ...requireSettingsManager, async (req, res, next) => {
  try {
    const parsed = createIntakeFieldSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        message: "Invalid request body",
        errors: parsed.error.flatten(),
      });
      return;
    }

    const organizationId = await getDemoOrganizationId();
    const key = slugify(parsed.data.label);

    if (!key) {
      res.status(400).json({
        message: "Field label must include letters or numbers.",
      });
      return;
    }

    const existingIntakeField = await prisma.intakeField.findFirst({
      where: {
        organizationId,
        key,
      },
      select: {
        id: true,
      },
    });

    if (existingIntakeField) {
      res.status(409).json({
        message: "An intake field with this key already exists.",
      });
      return;
    }

    const maxSortOrderIntakeField = await prisma.intakeField.findFirst({
      where: {
        organizationId,
      },
      orderBy: {
        sortOrder: "desc",
      },
      select: {
        sortOrder: true,
      },
    });

    const nextSortOrder = (maxSortOrderIntakeField?.sortOrder ?? 0) + 1;

    const createdIntakeField = await prisma.intakeField.create({
      data: {
        organizationId,
        key,
        label: parsed.data.label,
        fieldType: parsed.data.fieldType,
        isRequired: parsed.data.isRequired,
        showOnCaseDetail: parsed.data.showOnCaseDetail,
        isActive: parsed.data.isActive,
        sortOrder: nextSortOrder,
      },
      select: {
        id: true,
        key: true,
        label: true,
        fieldType: true,
        placeholder: true,
        helpText: true,
        options: true,
        isRequired: true,
        showOnCaseDetail: true,
        isActive: true,
        sortOrder: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(201).json({
      data: createdIntakeField,
    });
  } catch (error) {
    next(error);
  }
});

settingsRouter.patch("/intake-fields/:id", ...requireSettingsManager, async (req, res, next) => {
  try {
    const parsed = updateIntakeFieldSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        message: "Invalid request body",
        errors: parsed.error.flatten(),
      });
      return;
    }

    const organizationId = await getDemoOrganizationId();
    const id = String(req.params.id);

    const currentIntakeField = await prisma.intakeField.findFirst({
      where: {
        id,
        organizationId,
      },
      select: {
        id: true,
      },
    });

    if (!currentIntakeField) {
      res.status(404).json({
        message: "Intake field not found.",
      });
      return;
    }

    let key: string | undefined;

    if (parsed.data.label) {
      key = slugify(parsed.data.label);

      if (!key) {
        res.status(400).json({
          message: "Field label must include letters or numbers.",
        });
        return;
      }

      const duplicateIntakeField = await prisma.intakeField.findFirst({
        where: {
          organizationId,
          key,
          NOT: {
            id,
          },
        },
        select: {
          id: true,
        },
      });

      if (duplicateIntakeField) {
        res.status(409).json({
          message: "An intake field with this key already exists.",
        });
        return;
      }
    }

    const updateData = {
      ...(parsed.data.label ? { label: parsed.data.label, key } : {}),
      ...(parsed.data.fieldType ? { fieldType: parsed.data.fieldType } : {}),
      ...(parsed.data.isRequired !== undefined
        ? { isRequired: parsed.data.isRequired }
        : {}),
      ...(parsed.data.showOnCaseDetail !== undefined
        ? { showOnCaseDetail: parsed.data.showOnCaseDetail }
        : {}),
      ...(parsed.data.sortOrder !== undefined
        ? { sortOrder: parsed.data.sortOrder }
        : {}),
      ...(parsed.data.isActive !== undefined
        ? { isActive: parsed.data.isActive }
        : {}),
    };

    const updatedIntakeField = await prisma.intakeField.update({
      where: {
        id: currentIntakeField.id,
      },
      data: updateData,
      select: {
        id: true,
        key: true,
        label: true,
        fieldType: true,
        placeholder: true,
        helpText: true,
        options: true,
        isRequired: true,
        showOnCaseDetail: true,
        isActive: true,
        sortOrder: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({
      data: updatedIntakeField,
    });
  } catch (error) {
    next(error);
  }
});

settingsRouter.get("/workflow-statuses", async (_req, res, next) => {
  try {
    const organizationId = await getDemoOrganizationId();

    const workflowStatuses = await prisma.workflowStatus.findMany({
      where: {
        organizationId,
      },
      orderBy: {
        sortOrder: "asc",
      },
      select: {
        id: true,
        name: true,
        slug: true,
        color: true,
        sortOrder: true,
        isDefault: true,
        isClosed: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({
      data: workflowStatuses,
    });
  } catch (error) {
    next(error);
  }
});

settingsRouter.post("/workflow-statuses", ...requireSettingsManager, async (req, res, next) => {
  try {
    const parsed = createWorkflowStatusSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        message: "Invalid request body",
        errors: parsed.error.flatten(),
      });
      return;
    }

    const organizationId = await getDemoOrganizationId();
    const slug = slugify(parsed.data.name);

    if (!slug) {
      res.status(400).json({
        message: "Status name must include letters or numbers.",
      });
      return;
    }

    const existingStatus = await prisma.workflowStatus.findFirst({
      where: {
        organizationId,
        slug,
      },
      select: {
        id: true,
      },
    });

    if (existingStatus) {
      res.status(409).json({
        message: "A workflow status with this slug already exists.",
      });
      return;
    }

    const maxSortOrderStatus = await prisma.workflowStatus.findFirst({
      where: {
        organizationId,
      },
      orderBy: {
        sortOrder: "desc",
      },
      select: {
        sortOrder: true,
      },
    });

    const nextSortOrder = (maxSortOrderStatus?.sortOrder ?? 0) + 1;

    const createdStatus = await prisma.$transaction(async (tx) => {
      if (parsed.data.isDefault) {
        await tx.workflowStatus.updateMany({
          where: {
            organizationId,
            isDefault: true,
          },
          data: {
            isDefault: false,
          },
        });
      }

      return tx.workflowStatus.create({
        data: {
          organizationId,
          name: parsed.data.name,
          slug,
          color: parsed.data.color,
          sortOrder: nextSortOrder,
          isDefault: parsed.data.isDefault,
          isClosed: parsed.data.isClosed,
        },
        select: {
          id: true,
          name: true,
          slug: true,
          color: true,
          sortOrder: true,
          isDefault: true,
          isClosed: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    });

    res.status(201).json({
      data: createdStatus,
    });
  } catch (error) {
    next(error);
  }
});

settingsRouter.patch("/workflow-statuses/:id", ...requireSettingsManager, async (req, res, next) => {
  try {
    const parsed = updateWorkflowStatusSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        message: "Invalid request body",
        errors: parsed.error.flatten(),
      });
      return;
    }

    const organizationId = await getDemoOrganizationId();
    const id = String(req.params.id);

    const existingStatus = await prisma.workflowStatus.findFirst({
      where: {
        id,
        organizationId,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        color: true,
        sortOrder: true,
        isDefault: true,
        isClosed: true,
      },
    });

    if (!existingStatus) {
      res.status(404).json({
        message: "Workflow status not found.",
      });
      return;
    }

    const nextSlug =
      parsed.data.name === undefined ? existingStatus.slug : slugify(parsed.data.name);

    if (!nextSlug) {
      res.status(400).json({
        message: "Status name must include letters or numbers.",
      });
      return;
    }

    const duplicateStatus = await prisma.workflowStatus.findFirst({
      where: {
        organizationId,
        slug: nextSlug,
        id: {
          not: existingStatus.id,
        },
      },
      select: {
        id: true,
      },
    });

    if (duplicateStatus) {
      res.status(409).json({
        message: "A workflow status with this slug already exists.",
      });
      return;
    }

    const nextIsDefault = parsed.data.isDefault ?? existingStatus.isDefault;
    const nextIsClosed = parsed.data.isClosed ?? existingStatus.isClosed;

    if (nextIsDefault && nextIsClosed) {
      res.status(400).json({
        message: "A closed workflow status cannot be the default status.",
      });
      return;
    }

    if (parsed.data.isDefault === false && existingStatus.isDefault) {
      const otherDefaultStatus = await prisma.workflowStatus.findFirst({
        where: {
          organizationId,
          isDefault: true,
          id: {
            not: existingStatus.id,
          },
        },
        select: {
          id: true,
        },
      });

      if (!otherDefaultStatus) {
        res.status(400).json({
          message: "At least one workflow status must remain the default.",
        });
        return;
      }
    }

    const updatedStatus = await prisma.$transaction(async (tx) => {
      if (parsed.data.isDefault === true) {
        await tx.workflowStatus.updateMany({
          where: {
            organizationId,
            isDefault: true,
            id: {
              not: existingStatus.id,
            },
          },
          data: {
            isDefault: false,
          },
        });
      }

      return tx.workflowStatus.update({
        where: {
          id: existingStatus.id,
        },
        data: {
          name: parsed.data.name,
          slug: nextSlug,
          color: parsed.data.color,
          sortOrder: parsed.data.sortOrder,
          isDefault: parsed.data.isDefault,
          isClosed: parsed.data.isClosed,
        },
        select: {
          id: true,
          name: true,
          slug: true,
          color: true,
          sortOrder: true,
          isDefault: true,
          isClosed: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    });

    res.status(200).json({
      data: updatedStatus,
    });
  } catch (error) {
    next(error);
  }
});

settingsRouter.get("/users", async (_req, res, next) => {
  try {
    const organizationId = await getDemoOrganizationId();

    const users = await prisma.user.findMany({
      where: {
        organizationId,
      },
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    res.status(200).json({
      data: users,
    });
  } catch (error) {
    next(error);
  }
});

settingsRouter.get("/team-members", async (_req, res, next) => {
  try {
    const organizationId = await getDemoOrganizationId();

    const teamMembers = await prisma.user.findMany({
      where: {
        organizationId,
      },
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        _count: {
          select: {
            assignedCases: {
              where: {
                organizationId,
                status: {
                  isClosed: false,
                },
              },
            },
          },
        },
      },
    });

    res.status(200).json({
      data: teamMembers.map((teamMember) => ({
        id: teamMember.id,
        name: teamMember.name,
        email: teamMember.email,
        role: teamMember.role,
        openAssignedCaseCount: teamMember._count.assignedCases,
      })),
    });
  } catch (error) {
    next(error);
  }
});

settingsRouter.get("/case-categories", async (_req, res, next) => {
  try {
    const organizationId = await getDemoOrganizationId();

    const caseCategories = await prisma.caseCategory.findMany({
      where: {
        organizationId,
      },
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({
      data: caseCategories,
    });
  } catch (error) {
    next(error);
  }
});

settingsRouter.post("/case-categories", ...requireSettingsManager, async (req, res, next) => {
  try {
    const parsed = createCaseCategorySchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        message: "Invalid request body",
        errors: parsed.error.flatten(),
      });
      return;
    }

    const organizationId = await getDemoOrganizationId();
    const slug = slugify(parsed.data.name);

    if (!slug) {
      res.status(400).json({
        message: "Category name must include letters or numbers.",
      });
      return;
    }

    const existingCategory = await prisma.caseCategory.findFirst({
      where: {
        organizationId,
        slug,
      },
      select: {
        id: true,
      },
    });

    if (existingCategory) {
      res.status(409).json({
        message: "A case category with this slug already exists.",
      });
      return;
    }

    const createdCategory = await prisma.caseCategory.create({
      data: {
        organizationId,
        name: parsed.data.name,
        slug,
        description: parsed.data.description,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(201).json({
      data: createdCategory,
    });
  } catch (error) {
    next(error);
  }
});

settingsRouter.patch("/case-categories/:id", ...requireSettingsManager, async (req, res, next) => {
  try {
    const parsed = updateCaseCategorySchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        message: "Invalid request body",
        errors: parsed.error.flatten(),
      });
      return;
    }

    const organizationId = await getDemoOrganizationId();
    const id = String(req.params.id);

    const existingCategory = await prisma.caseCategory.findFirst({
      where: {
        id,
        organizationId,
      },
      select: {
        id: true,
        slug: true,
      },
    });

    if (!existingCategory) {
      res.status(404).json({
        message: "Case category not found.",
      });
      return;
    }

    const nextSlug =
      parsed.data.name === undefined
        ? existingCategory.slug
        : slugify(parsed.data.name);

    if (!nextSlug) {
      res.status(400).json({
        message: "Category name must include letters or numbers.",
      });
      return;
    }

    const duplicateCategory = await prisma.caseCategory.findFirst({
      where: {
        organizationId,
        slug: nextSlug,
        id: {
          not: existingCategory.id,
        },
      },
      select: {
        id: true,
      },
    });

    if (duplicateCategory) {
      res.status(409).json({
        message: "A case category with this slug already exists.",
      });
      return;
    }

    const updatedCategory = await prisma.caseCategory.update({
      where: {
        id: existingCategory.id,
      },
      data: {
        name: parsed.data.name,
        slug: nextSlug,
        description: parsed.data.description,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({
      data: updatedCategory,
    });
  } catch (error) {
    next(error);
  }
});
