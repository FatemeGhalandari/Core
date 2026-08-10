import { Prisma } from "../generated/prisma/index.js";
import { prisma } from "./prisma.js";
import { industryTemplates } from "./industry-templates.js";
import { slugify } from "./slug.js";

function getStatusColor(index: number) {
  const colors = ["gray", "blue", "yellow", "purple", "green"];
  return colors[index] ?? "gray";
}

export async function applyIndustryTemplateToWorkspace({
  organizationId,
  industryTemplateKey,
  workspaceOverrides,
}: {
  organizationId: string;
  industryTemplateKey: string;
  workspaceOverrides?: {
    appName?: string | null;
    caseLabel?: string | null;
    customerLabel?: string | null;
  };
}) {
  const template = industryTemplates.find(
    (templateOption) => templateOption.key === industryTemplateKey,
  );

  if (!template) {
    return null;
  }

  const result = await prisma.$transaction(async (tx) => {
    const baseWorkspaceSlug =
      slugify(template.workspaceSlug) ||
      slugify(template.appName) ||
      template.key;
    let workspaceSlug = baseWorkspaceSlug;
    let slugSuffix = 2;

    while (
      await tx.organization.findFirst({
        where: {
          slug: workspaceSlug,
          id: {
            not: organizationId,
          },
        },
        select: {
          id: true,
        },
      })
    ) {
      workspaceSlug = `${baseWorkspaceSlug}-${slugSuffix}`;
      slugSuffix += 1;
    }

    const updatedWorkspace = await tx.organization.update({
      where: {
        id: organizationId,
      },
      data: {
        slug: workspaceSlug,
        appName: workspaceOverrides?.appName ?? template.appName,
        caseLabel: workspaceOverrides?.caseLabel ?? template.caseLabel,
        customerLabel:
          workspaceOverrides?.customerLabel ?? template.customerLabel,
        industryTemplateKey: template.key,
        industry: template.key,
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

    for (const [index, statusName] of template.defaultStatuses.entries()) {
      const slug = slugify(statusName);

      if (!slug) {
        continue;
      }

      await tx.workflowStatus.upsert({
        where: {
          organizationId_slug: {
            organizationId,
            slug,
          },
        },
        update: {
          name: statusName,
          sortOrder: index + 1,
          isDefault: index === 0,
          isClosed: slug === "closed",
        },
        create: {
          organizationId,
          name: statusName,
          slug,
          color: getStatusColor(index),
          sortOrder: index + 1,
          isDefault: index === 0,
          isClosed: slug === "closed",
        },
      });
    }

    const defaultStatusSlug = slugify(template.defaultStatuses[0] ?? "");

    if (defaultStatusSlug) {
      await tx.workflowStatus.updateMany({
        where: {
          organizationId,
          slug: {
            not: defaultStatusSlug,
          },
          isDefault: true,
        },
        data: {
          isDefault: false,
        },
      });
    }

    for (const categoryName of template.defaultCategories) {
      const slug = slugify(categoryName);

      if (!slug) {
        continue;
      }

      await tx.caseCategory.upsert({
        where: {
          organizationId_slug: {
            organizationId,
            slug,
          },
        },
        update: {
          name: categoryName,
        },
        create: {
          organizationId,
          name: categoryName,
          slug,
          description: `${categoryName} work for the ${template.name} template.`,
        },
      });
    }

    for (const [index, intakeField] of template.defaultIntakeFields.entries()) {
      const placeholder = intakeField.placeholder ?? null;
      const helpText = intakeField.helpText ?? null;
      const options = intakeField.options ?? Prisma.JsonNull;

      await tx.intakeField.upsert({
        where: {
          organizationId_key: {
            organizationId,
            key: intakeField.key,
          },
        },
        update: {
          label: intakeField.label,
          fieldType: intakeField.fieldType,
          placeholder,
          helpText,
          options,
          isRequired: intakeField.isRequired,
          showOnCaseDetail: intakeField.showOnCaseDetail,
          isActive: true,
          sortOrder: index + 1,
        },
        create: {
          organizationId,
          key: intakeField.key,
          label: intakeField.label,
          fieldType: intakeField.fieldType,
          placeholder,
          helpText,
          options,
          isRequired: intakeField.isRequired,
          showOnCaseDetail: intakeField.showOnCaseDetail,
          isActive: true,
          sortOrder: index + 1,
        },
      });
    }

    return updatedWorkspace;
  });

  return result;
}
