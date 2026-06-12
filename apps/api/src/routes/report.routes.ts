import { Router } from "express";
import { Priority } from "../generated/prisma/index.js";
import { prisma } from "../lib/prisma.js";
import {
  attachCurrentUser,
  requireRole,
  requireUser,
} from "../middleware/auth.js";

export const reportRouter = Router();

reportRouter.use(attachCurrentUser);

const requireReportViewer = [
  requireUser,
  requireRole("owner", "admin", "staff", "viewer"),
];

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

function getAgeInDays(value: Date) {
  const createdAt = value.getTime();
  const now = Date.now();
  const dayInMs = 1000 * 60 * 60 * 24;

  return Math.max(0, Math.floor((now - createdAt) / dayInMs));
}

function getPercent(value: number, total: number) {
  if (total === 0) return 0;

  return Math.round((value / total) * 100);
}

reportRouter.get("/operations", ...requireReportViewer, async (_req, res, next) => {
  try {
    const organizationId = await getDemoOrganizationId();
    const today = new Date();

    const [
      totalCases,
      openCases,
      closedCases,
      highPriorityCases,
      waitingCases,
      unassignedCases,
      overdueCases,
      customerCount,
      customersWithOpenCases,
      openCaseAges,
      workflowStatuses,
      caseCategories,
      sourceGroups,
      priorityGroups,
      owners,
      unassignedOpenCases,
      recentlyClosedCases,
    ] = await Promise.all([
      prisma.case.count({
        where: {
          organizationId,
        },
      }),
      prisma.case.count({
        where: {
          organizationId,
          status: {
            isClosed: false,
          },
        },
      }),
      prisma.case.count({
        where: {
          organizationId,
          status: {
            isClosed: true,
          },
        },
      }),
      prisma.case.count({
        where: {
          organizationId,
          priority: {
            in: [Priority.high, Priority.urgent],
          },
        },
      }),
      prisma.case.count({
        where: {
          organizationId,
          status: {
            slug: "waiting-on-customer",
          },
        },
      }),
      prisma.case.count({
        where: {
          organizationId,
          assignedUserId: null,
        },
      }),
      prisma.case.count({
        where: {
          organizationId,
          dueAt: {
            lt: today,
          },
          status: {
            isClosed: false,
          },
        },
      }),
      prisma.customer.count({
        where: {
          organizationId,
        },
      }),
      prisma.case.findMany({
        where: {
          organizationId,
          status: {
            isClosed: false,
          },
        },
        distinct: ["customerId"],
        select: {
          customerId: true,
        },
      }),
      prisma.case.findMany({
        where: {
          organizationId,
          status: {
            isClosed: false,
          },
        },
        select: {
          createdAt: true,
        },
      }),
      prisma.workflowStatus.findMany({
        where: {
          organizationId,
        },
        orderBy: {
          sortOrder: "asc",
        },
        select: {
          name: true,
          _count: {
            select: {
              cases: true,
            },
          },
        },
      }),
      prisma.caseCategory.findMany({
        where: {
          organizationId,
        },
        orderBy: {
          name: "asc",
        },
        select: {
          name: true,
          _count: {
            select: {
              cases: true,
            },
          },
        },
      }),
      prisma.case.groupBy({
        by: ["source"],
        where: {
          organizationId,
        },
        _count: {
          _all: true,
        },
      }),
      prisma.case.groupBy({
        by: ["priority"],
        where: {
          organizationId,
        },
        _count: {
          _all: true,
        },
      }),
      prisma.user.findMany({
        where: {
          organizationId,
        },
        orderBy: {
          name: "asc",
        },
        select: {
          name: true,
          _count: {
            select: {
              assignedCases: {
                where: {
                  status: {
                    isClosed: false,
                  },
                },
              },
            },
          },
        },
      }),
      prisma.case.count({
        where: {
          organizationId,
          assignedUserId: null,
          status: {
            isClosed: false,
          },
        },
      }),
      prisma.case.findMany({
        where: {
          organizationId,
          status: {
            isClosed: true,
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: 5,
        select: {
          id: true,
          title: true,
          updatedAt: true,
          customer: {
            select: {
              id: true,
              name: true,
            },
          },
          status: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      }),
    ]);

    const averageOpenAge =
      openCaseAges.length === 0
        ? 0
        : Math.round(
            openCaseAges.reduce(
              (total, caseItem) => total + getAgeInDays(caseItem.createdAt),
              0,
            ) / openCaseAges.length,
          );

    const agingBuckets = [
      {
        label: "0-2 days",
        count: openCaseAges.filter(
          (caseItem) => getAgeInDays(caseItem.createdAt) <= 2,
        ).length,
      },
      {
        label: "3-7 days",
        count: openCaseAges.filter((caseItem) => {
          const age = getAgeInDays(caseItem.createdAt);
          return age >= 3 && age <= 7;
        }).length,
      },
      {
        label: "8+ days",
        count: openCaseAges.filter(
          (caseItem) => getAgeInDays(caseItem.createdAt) >= 8,
        ).length,
      },
    ];

    const statusBreakdown = workflowStatuses.reduce<Record<string, number>>(
      (result, status) => {
        result[status.name] = status._count.cases;
        return result;
      },
      {},
    );
    const categoryBreakdown = caseCategories.reduce<Record<string, number>>(
      (result, category) => {
        result[category.name] = category._count.cases;
        return result;
      },
      {},
    );
    const uncategorizedCases = await prisma.case.count({
      where: {
        organizationId,
        categoryId: null,
      },
    });

    if (uncategorizedCases > 0) {
      categoryBreakdown.Uncategorized = uncategorizedCases;
    }

    const sourceBreakdown = sourceGroups.reduce<Record<string, number>>(
      (result, sourceGroup) => {
        result[sourceGroup.source] = sourceGroup._count._all;
        return result;
      },
      {},
    );
    const priorityBreakdown = priorityGroups.reduce<Record<string, number>>(
      (result, priorityGroup) => {
        result[priorityGroup.priority] = priorityGroup._count._all;
        return result;
      },
      {},
    );
    const ownerBreakdown = owners.reduce<Record<string, number>>(
      (result, owner) => {
        result[owner.name] = owner._count.assignedCases;
        return result;
      },
      {},
    );

    if (unassignedOpenCases > 0) {
      ownerBreakdown.Unassigned = unassignedOpenCases;
    }

    res.status(200).json({
      data: {
        metrics: {
          totalCases,
          openCases,
          closedCases,
          overdueCases,
          averageOpenAge,
        },
        summary: {
          closedRate: getPercent(closedCases, totalCases),
          highPriorityShare: getPercent(highPriorityCases, totalCases),
          unassignedShare: getPercent(unassignedCases, totalCases),
          customerCount,
          customersWithOpenCases: customersWithOpenCases.length,
        },
        attention: {
          waitingCases,
          highPriorityCases,
          unassignedCases,
          overdueCases,
        },
        breakdowns: {
          status: statusBreakdown,
          priority: priorityBreakdown,
          category: categoryBreakdown,
          source: sourceBreakdown,
          owner: ownerBreakdown,
        },
        agingBuckets,
        recentlyClosedCases,
      },
    });
  } catch (error) {
    next(error);
  }
});
