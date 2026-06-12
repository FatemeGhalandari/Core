import { prisma } from "./prisma.js";

export const DEMO_ORGANIZATION_SLUG = "maplecare-clinic";

export async function getDemoOrganizationId(): Promise<string> {
  const organization = await prisma.organization.findUnique({
    where: {
      slug: DEMO_ORGANIZATION_SLUG,
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
