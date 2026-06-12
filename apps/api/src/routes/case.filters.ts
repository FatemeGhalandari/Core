import type { Prisma } from "../generated/prisma/index.js";
import { getStringQueryParam } from "../lib/queryParams.js";
import { isPriority } from "./case.schemas.js";

export function getCaseListQuery(
  query: Record<string, unknown>,
  organizationId: string,
) {
  const search = getStringQueryParam(query.search);
  const statusSlug = getStringQueryParam(query.statusSlug);
  const priority = getStringQueryParam(query.priority);
  const categorySlug = getStringQueryParam(query.categorySlug);
  const assignedUserId = getStringQueryParam(query.assignedUserId);
  const sort = getStringQueryParam(query.sort) ?? "updated";

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

  return {
    where,
    orderBy,
  };
}
