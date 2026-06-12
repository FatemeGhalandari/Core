import type { Prisma } from "../generated/prisma/index.js";
import { createCaseActivityEvent } from "../lib/caseActivity.js";
import { prisma } from "../lib/prisma.js";
import {
  hasNonEmptyIntakeValue,
  type CreateCommentInput,
  type CreateCaseInput,
} from "./case.schemas.js";

type AddCaseCommentInput = {
  caseId: string;
  organizationId: string;
  data: CreateCommentInput;
};

export async function addCaseComment({
  caseId,
  organizationId,
  data,
}: AddCaseCommentInput) {
  const existingCase = await prisma.case.findFirst({
    where: {
      id: caseId,
      organizationId,
    },
  });

  if (!existingCase) {
    return {
      error: "case_not_found" as const,
    };
  }

  const staffUser = await prisma.user.findFirst({
    where: {
      organizationId,
      role: "staff",
    },
  });

  const comment = await prisma.caseComment.create({
    data: {
      organizationId,
      caseId: existingCase.id,
      authorUserId: staffUser?.id,
      body: data.body,
      visibility: data.visibility,
    },
    include: {
      authorUser: true,
      authorCustomer: true,
    },
  });

  await createCaseActivityEvent({
    organizationId,
    caseId: existingCase.id,
    actorUserId: staffUser?.id,
    eventType: "case.comment_added",
    metadata: {
      visibility: data.visibility,
    },
  });

  return {
    data: comment,
  };
}

type ChangeCaseStatusInput = {
  caseId: string;
  organizationId: string;
  statusSlug: string;
};

export async function changeCaseStatus({
  caseId,
  organizationId,
  statusSlug,
}: ChangeCaseStatusInput) {
  const status = await prisma.workflowStatus.findFirst({
    where: {
      organizationId,
      slug: statusSlug,
    },
  });

  if (!status) {
    return {
      error: "status_not_found" as const,
    };
  }

  const existingCase = await prisma.case.findFirst({
    where: {
      id: caseId,
      organizationId,
    },
    include: {
      status: true,
    },
  });

  if (!existingCase) {
    return {
      error: "case_not_found" as const,
    };
  }

  const updatedCase = await prisma.case.update({
    where: {
      id: caseId,
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

  await createCaseActivityEvent({
    organizationId,
    caseId: updatedCase.id,
    eventType: "case.status_changed",
    metadata: {
      fromStatusId: existingCase.status.id,
      fromStatusName: existingCase.status.name,
      toStatusId: status.id,
      toStatusName: status.name,
    },
  });

  return {
    data: updatedCase,
  };
}

type AssignCaseInput = {
  caseId: string;
  organizationId: string;
  assignedUserId: string | null;
};

export async function assignCase({
  caseId,
  organizationId,
  assignedUserId,
}: AssignCaseInput) {
  const existingCase = await prisma.case.findFirst({
    where: {
      id: caseId,
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
    return {
      error: "case_not_found" as const,
    };
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
    return {
      error: "assigned_user_not_found" as const,
    };
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

    await createCaseActivityEvent(
      {
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
      tx,
    );

    return assignedCase;
  });

  return {
    data: updatedCase,
  };
}

type CreateCaseCommandInput = {
  organizationId: string;
  data: CreateCaseInput;
};

export async function createCase({
  organizationId,
  data,
}: CreateCaseCommandInput) {
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
    return {
      error: "missing_required_intake_fields" as const,
      missingFields: missingIntakeFieldKeys,
    };
  }

  const defaultStatus = await prisma.workflowStatus.findFirst({
    where: {
      organizationId,
      isDefault: true,
    },
  });

  if (!defaultStatus) {
    return {
      error: "default_status_not_found" as const,
    };
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

  const createdCase = await prisma.$transaction(async (tx) => {
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

    await createCaseActivityEvent(
      {
        organizationId,
        caseId: newCase.id,
        actorUserId: staffUser?.id,
        eventType: "case.created",
        metadata: {
          title: newCase.title,
          source: "staff_created",
        },
      },
      tx,
    );

    return newCase;
  });

  return {
    data: createdCase,
  };
}
