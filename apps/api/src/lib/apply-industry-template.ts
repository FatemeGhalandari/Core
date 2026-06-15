import { Prisma } from "../generated/prisma/index.js";
import { prisma } from "./prisma.js";
import { industryTemplates } from "./industry-templates.js";

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getStatusColor(index: number) {
  const colors = ["gray", "blue", "yellow", "purple", "green"];
  return colors[index] ?? "gray";
}

export async function applyIndustryTemplateToWorkspace({
  organizationId,
  industryTemplateKey,
}: {
  organizationId: string;
  industryTemplateKey: string;
}) {
  const template = industryTemplates.find(
    (templateOption) => templateOption.key === industryTemplateKey,
  );

  if (!template) {
    return null;
  }

  const result = await prisma.$transaction(async (tx) => {
    const updatedWorkspace = await tx.organization.update({
      where: {
        id: organizationId,
      },
      data: {
        appName: template.appName,
        caseLabel: template.caseLabel,
        customerLabel: template.customerLabel,
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
