import type { Prisma } from "../generated/prisma/index.js";

export const caseListInclude = {
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
} satisfies Prisma.CaseInclude;

export const caseDetailInclude = {
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
} satisfies Prisma.CaseInclude;

type CaseListPayload = Prisma.CaseGetPayload<{
  include: typeof caseListInclude;
}>;

export function toCaseListItem(caseItem: CaseListPayload) {
  return {
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
  };
}
