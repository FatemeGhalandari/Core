import {
  PrismaClient,
  Priority,
  Role,
  Source,
  Visibility,
} from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

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
  const organization = await prisma.organization.upsert({
    where: {
      slug: "maplecare-clinic",
    },
    update: {},
    create: {
      name: "MapleCare Clinic",
      slug: "maplecare-clinic",
      industry: "clinic",
    },
  });

  const owner = await prisma.user.upsert({
    where: {
      email: "owner@maplecare.test",
    },
    update: {},
    create: {
      organizationId: organization.id,
      name: "Avery Morgan",
      email: "owner@maplecare.test",
      passwordHash: "replace_with_real_hash_later",
      role: Role.owner,
    },
  });

  const staff = await prisma.user.upsert({
    where: {
      email: "staff@maplecare.test",
    },
    update: {},
    create: {
      organizationId: organization.id,
      name: "Sarah Chen",
      email: "staff@maplecare.test",
      passwordHash: "replace_with_real_hash_later",
      role: Role.staff,
    },
  });

  const customer = await prisma.customer.create({
    data: {
      organizationId: organization.id,
      name: "Jordan Patel",
      email: "jordan.patel@example.com",
      phone: "555-0142",
      externalReference: "PAT-1001",
    },
  });

  const category = await prisma.caseCategory.upsert({
    where: {
      organizationId_slug: {
        organizationId: organization.id,
        slug: "general-appointment",
      },
    },
    update: {},
    create: {
      organizationId: organization.id,
      name: "General Appointment",
      slug: "general-appointment",
      description: "Standard appointment or intake request",
    },
  });

  const newStatus = await prisma.workflowStatus.upsert({
    where: {
      organizationId_slug: {
        organizationId: organization.id,
        slug: "new",
      },
    },
    update: {},
    create: {
      organizationId: organization.id,
      name: "New",
      slug: "new",
      color: "gray",
      sortOrder: 1,
      isDefault: true,
      isClosed: false,
    },
  });

  await prisma.workflowStatus.upsert({
    where: {
      organizationId_slug: {
        organizationId: organization.id,
        slug: "in-review",
      },
    },
    update: {},
    create: {
      organizationId: organization.id,
      name: "In Review",
      slug: "in-review",
      color: "blue",
      sortOrder: 2,
      isDefault: false,
      isClosed: false,
    },
  });

  await prisma.workflowStatus.upsert({
    where: {
      organizationId_slug: {
        organizationId: organization.id,
        slug: "waiting-on-customer",
      },
    },
    update: {},
    create: {
      organizationId: organization.id,
      name: "Waiting on Customer",
      slug: "waiting-on-customer",
      color: "yellow",
      sortOrder: 3,
      isDefault: false,
      isClosed: false,
    },
  });

  await prisma.workflowStatus.upsert({
    where: {
      organizationId_slug: {
        organizationId: organization.id,
        slug: "closed",
      },
    },
    update: {},
    create: {
      organizationId: organization.id,
      name: "Closed",
      slug: "closed",
      color: "green",
      sortOrder: 4,
      isDefault: false,
      isClosed: true,
    },
  });

  const demoCase = await prisma.case.create({
    data: {
      organizationId: organization.id,
      customerId: customer.id,
      assignedUserId: staff.id,
      categoryId: category.id,
      statusId: newStatus.id,
      title: "Patient requested appointment for recurring back pain",
      description:
        "Patient submitted an intake request asking for a general appointment.",
      priority: Priority.high,
      source: Source.customer_portal,
      intakeData: {
        reasonForVisit: "Recurring back pain",
        preferredDate: "2026-05-20",
        symptoms: "Lower back pain for the past two weeks",
        insuranceProvider: "BlueCross",
      },
    },
  });

  await prisma.caseComment.create({
    data: {
      organizationId: organization.id,
      caseId: demoCase.id,
      authorUserId: staff.id,
      visibility: Visibility.internal,
      body: "Review intake details before scheduling. May require follow-up questions.",
    },
  });

  await prisma.caseActivityEvent.createMany({
    data: [
      {
        organizationId: organization.id,
        caseId: demoCase.id,
        actorUserId: owner.id,
        eventType: "case.created",
        metadata: {
          title: demoCase.title,
        },
      },
      {
        organizationId: organization.id,
        caseId: demoCase.id,
        actorUserId: staff.id,
        eventType: "case.assigned",
        metadata: {
          assignedTo: staff.name,
        },
      },
    ],
  });

  console.log("Seed data created.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
