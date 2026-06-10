import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const organization = await prisma.organization.findUnique({
    where: {
      slug: "maplecare-clinic",
    },
  });

  if (!organization) {
    throw new Error("MapleCare Clinic organization was not found.");
  }

  const category = await prisma.caseCategory.findFirst({
    where: {
      organizationId: organization.id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  if (!category) {
    throw new Error("No case category found for this organization.");
  }

  const result = await prisma.case.updateMany({
    where: {
      organizationId: organization.id,
      categoryId: null,
    },
    data: {
      categoryId: category.id,
    },
  });

  console.log(
    `Backfilled ${result.count} case(s) with category: ${category.name}`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
