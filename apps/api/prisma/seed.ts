import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import {
  IntakeFieldType,
  PrismaClient,
  Priority,
  Role,
  Source,
  Visibility,
} from "../src/generated/prisma/client.js";
import { industryTemplates } from "../src/lib/industry-templates.js";

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

type DemoUserConfig = {
  name: string;
  email: string;
  role: Role;
};

type DemoCustomerConfig = {
  name: string;
  email: string;
  phone: string;
};

type DemoCaseConfig = {
  customerEmail: string;
  title: string;
  description: string;
  priority: Priority;
  statusName: string;
  categoryName: string;
  assignedEmail?: string;
  dueInDays?: number | null;
  closedDaysAgo?: number;
  source?: Source;
  intakeData: Record<string, string>;
  comments: string[];
};

type DemoWorkspaceConfig = {
  name: string;
  slug: string;
  industry: string;
  appName: string;
  caseLabel: string;
  customerLabel: string;
  industryTemplateKey: string;
  referencePrefix: string;
  users: DemoUserConfig[];
  customers: DemoCustomerConfig[];
  cases: DemoCaseConfig[];
};

function daysFromNow(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function statusColor(index: number) {
  return ["gray", "blue", "yellow", "purple", "green"][index] ?? "gray";
}

function customers(
  domain: string,
  entries: Array<[string, string]>,
): DemoCustomerConfig[] {
  return entries.map(([name, phone]) => ({
    name,
    email: `${slugify(name).replace(/-/g, ".")}@${domain}`,
    phone,
  }));
}

async function clearWorkspaceData(organizationId: string) {
  await prisma.caseActivityEvent.deleteMany({ where: { organizationId } });
  await prisma.caseComment.deleteMany({ where: { organizationId } });
  await prisma.caseAttachment.deleteMany({ where: { organizationId } });
  await prisma.case.deleteMany({ where: { organizationId } });
  await prisma.customer.deleteMany({ where: { organizationId } });
  await prisma.intakeField.deleteMany({ where: { organizationId } });
  await prisma.caseCategory.deleteMany({ where: { organizationId } });
  await prisma.workflowStatus.deleteMany({ where: { organizationId } });
  await prisma.user.deleteMany({ where: { organizationId } });
}

async function seedDemoWorkspace(
  config: DemoWorkspaceConfig,
  demoPasswordHash: string,
) {
  const template = industryTemplates.find(
    (templateOption) => templateOption.key === config.industryTemplateKey,
  );

  if (!template) {
    throw new Error(`Missing industry template: ${config.industryTemplateKey}`);
  }

  const organization = await prisma.organization.upsert({
    where: {
      slug: config.slug,
    },
    update: {
      name: config.name,
      industry: config.industry,
      appName: config.appName,
      caseLabel: config.caseLabel,
      customerLabel: config.customerLabel,
      industryTemplateKey: config.industryTemplateKey,
    },
    create: {
      name: config.name,
      slug: config.slug,
      industry: config.industry,
      appName: config.appName,
      caseLabel: config.caseLabel,
      customerLabel: config.customerLabel,
      industryTemplateKey: config.industryTemplateKey,
    },
  });

  await clearWorkspaceData(organization.id);

  const users = await Promise.all(
    config.users.map((user) =>
      prisma.user.create({
        data: {
          organizationId: organization.id,
          name: user.name,
          email: user.email,
          passwordHash: demoPasswordHash,
          role: user.role,
        },
      }),
    ),
  );
  const userByEmail = new Map(users.map((user) => [user.email, user]));

  const statuses = await Promise.all(
    template.defaultStatuses.map((statusName, index) =>
      prisma.workflowStatus.create({
        data: {
          organizationId: organization.id,
          name: statusName,
          slug: slugify(statusName),
          color: statusColor(index),
          sortOrder: index + 1,
          isDefault: index === 0,
          isClosed: slugify(statusName) === "closed",
        },
      }),
    ),
  );
  const statusByName = new Map(statuses.map((status) => [status.name, status]));

  const categories = await Promise.all(
    template.defaultCategories.map((categoryName) =>
      prisma.caseCategory.create({
        data: {
          organizationId: organization.id,
          name: categoryName,
          slug: slugify(categoryName),
          description: `${categoryName} work for ${config.name}.`,
        },
      }),
    ),
  );
  const categoryByName = new Map(
    categories.map((category) => [category.name, category]),
  );

  await Promise.all(
    template.defaultIntakeFields.map((field, index) =>
      prisma.intakeField.create({
        data: {
          organizationId: organization.id,
          key: field.key,
          label: field.label,
          fieldType: field.fieldType as IntakeFieldType,
          placeholder: field.placeholder,
          helpText: field.helpText,
          options: field.options,
          isRequired: field.isRequired,
          showOnCaseDetail: field.showOnCaseDetail,
          isActive: true,
          sortOrder: index + 1,
        },
      }),
    ),
  );

  const createdCustomers = await Promise.all(
    config.customers.map((customer, index) =>
      prisma.customer.create({
        data: {
          organizationId: organization.id,
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          externalReference: `${config.referencePrefix}-${String(index + 1).padStart(4, "0")}`,
        },
      }),
    ),
  );
  const customerByEmail = new Map(
    createdCustomers.map((customer) => [customer.email, customer]),
  );

  for (const [index, caseConfig] of config.cases.entries()) {
    const customer = customerByEmail.get(caseConfig.customerEmail);
    const status = statusByName.get(caseConfig.statusName);
    const category = categoryByName.get(caseConfig.categoryName);
    const assignedUser = caseConfig.assignedEmail
      ? userByEmail.get(caseConfig.assignedEmail)
      : undefined;
    const actorUser =
      assignedUser ?? userByEmail.get(config.users[1]?.email ?? "");

    if (!customer || !status || !category) {
      throw new Error(`${config.name} has an invalid case reference.`);
    }

    const createdCase = await prisma.case.create({
      data: {
        organizationId: organization.id,
        customerId: customer.id,
        assignedUserId: assignedUser?.id,
        categoryId: category.id,
        statusId: status.id,
        title: caseConfig.title,
        description: caseConfig.description,
        priority: caseConfig.priority,
        source: caseConfig.source ?? Source.customer_portal,
        intakeData: caseConfig.intakeData,
        dueAt:
          caseConfig.dueInDays === undefined || caseConfig.dueInDays === null
            ? null
            : daysFromNow(caseConfig.dueInDays),
        closedAt:
          caseConfig.closedDaysAgo === undefined
            ? null
            : daysFromNow(-caseConfig.closedDaysAgo),
        createdAt: daysFromNow(-Math.min(index + 1, 24)),
      },
    });

    await prisma.caseActivityEvent.create({
      data: {
        organizationId: organization.id,
        caseId: createdCase.id,
        actorUserId: actorUser?.id,
        eventType: "case.created",
        metadata: {
          title: createdCase.title,
          source: createdCase.source,
        },
        createdAt: daysFromNow(-Math.min(index + 1, 24)),
      },
    });

    if (assignedUser) {
      await prisma.caseActivityEvent.create({
        data: {
          organizationId: organization.id,
          caseId: createdCase.id,
          actorUserId: assignedUser.id,
          eventType: "case.assigned",
          metadata: {
            fromAssigneeId: null,
            fromAssigneeName: null,
            toAssigneeId: assignedUser.id,
            toAssigneeName: assignedUser.name,
          },
          createdAt: daysFromNow(-Math.min(index, 21)),
        },
      });
    }

    if (caseConfig.statusName !== template.defaultStatuses[0]) {
      await prisma.caseActivityEvent.create({
        data: {
          organizationId: organization.id,
          caseId: createdCase.id,
          actorUserId: actorUser?.id,
          eventType: "case.status_changed",
          metadata: {
            fromStatusName: template.defaultStatuses[0],
            toStatusId: status.id,
            toStatusName: status.name,
          },
          createdAt: daysFromNow(-Math.min(index, 20)),
        },
      });
    }

    for (const [commentIndex, body] of caseConfig.comments.entries()) {
      const createdAt = daysFromNow(-Math.max(1, commentIndex + 1));

      await prisma.caseComment.create({
        data: {
          organizationId: organization.id,
          caseId: createdCase.id,
          authorUserId: actorUser?.id,
          visibility: Visibility.internal,
          body,
          createdAt,
        },
      });

      await prisma.caseActivityEvent.create({
        data: {
          organizationId: organization.id,
          caseId: createdCase.id,
          actorUserId: actorUser?.id,
          eventType: "case.comment_added",
          metadata: {
            visibility: Visibility.internal,
          },
          createdAt,
        },
      });
    }
  }

  console.log(
    `${config.name}: ${config.customers.length} customers, ${config.cases.length} cases`,
  );
}

const demoWorkspaces: DemoWorkspaceConfig[] = [
  {
    name: "MapleCare Clinic",
    slug: "maplecare-clinic",
    industry: "clinic",
    appName: "Core Clinic",
    caseLabel: "Request",
    customerLabel: "Patient",
    industryTemplateKey: "clinic",
    referencePrefix: "CLI",
    users: [
      { name: "Avery Morgan", email: "owner@maplecare.test", role: Role.owner },
      { name: "Priya Shah", email: "admin@maplecare.test", role: Role.admin },
      { name: "Sarah Chen", email: "staff@maplecare.test", role: Role.staff },
      { name: "Mateo Rivera", email: "nurse@maplecare.test", role: Role.staff },
      {
        name: "Lena Brooks",
        email: "coordinator@maplecare.test",
        role: Role.staff,
      },
    ],
    customers: customers("maplecare-patients.test", [
      ["Jordan Patel", "555-0101"],
      ["Emily Carter", "555-0102"],
      ["Noah Williams", "555-0103"],
      ["Mia Thompson", "555-0104"],
      ["Lucas Nguyen", "555-0105"],
      ["Sofia Martinez", "555-0106"],
      ["Ava Brown", "555-0107"],
      ["Ethan Wilson", "555-0108"],
      ["Lily Chen", "555-0109"],
      ["Benjamin Ross", "555-0110"],
    ]),
    cases: [
      {
        customerEmail: "jordan.patel@maplecare-patients.test",
        title: "Recurring back pain appointment request",
        description: "Patient requested an assessment after two weeks of pain.",
        priority: Priority.high,
        statusName: "Triage",
        categoryName: "Intake",
        assignedEmail: "staff@maplecare.test",
        dueInDays: 0,
        intakeData: {
          reasonForRequest: "Recurring lower back pain",
          preferredDate: "2026-06-19",
          preferredTime: "Morning",
          coverageProvider: "BlueCross",
        },
        comments: ["Asked patient to confirm any recent injury."],
      },
      {
        customerEmail: "emily.carter@maplecare-patients.test",
        title: "New patient annual visit",
        description: "New patient wants to schedule preventive care.",
        priority: Priority.normal,
        statusName: "New",
        categoryName: "Appointment",
        dueInDays: 5,
        intakeData: {
          reasonForRequest: "Annual preventive visit",
          preferredDate: "2026-06-24",
          preferredTime: "Afternoon",
          coverageProvider: "SunLife",
        },
        comments: ["New patient packet sent."],
      },
      {
        customerEmail: "noah.williams@maplecare-patients.test",
        title: "Records needed for specialist referral",
        description: "Patient needs documents sent before a specialist visit.",
        priority: Priority.normal,
        statusName: "Waiting on Patient",
        categoryName: "Records",
        assignedEmail: "coordinator@maplecare.test",
        dueInDays: 2,
        intakeData: {
          reasonForRequest: "Specialist records package",
          preferredDate: "2026-06-21",
          preferredTime: "Any time",
          coverageProvider: "Manulife",
        },
        comments: ["Waiting for signed release form."],
      },
      {
        customerEmail: "mia.thompson@maplecare-patients.test",
        title: "Billing question about recent visit",
        description: "Patient asked why a charge was not covered.",
        priority: Priority.low,
        statusName: "New",
        categoryName: "Billing",
        assignedEmail: "admin@maplecare.test",
        dueInDays: 4,
        intakeData: {
          reasonForRequest: "Billing clarification",
          preferredDate: "2026-06-22",
          preferredTime: "Evening",
          coverageProvider: "GreenShield",
        },
        comments: ["Billing code review queued."],
      },
      {
        customerEmail: "lucas.nguyen@maplecare-patients.test",
        title: "Follow-up after medication change",
        description: "Patient reported nausea after starting medication.",
        priority: Priority.high,
        statusName: "Scheduled",
        categoryName: "Appointment",
        assignedEmail: "nurse@maplecare.test",
        dueInDays: 1,
        intakeData: {
          reasonForRequest: "Medication side effects",
          preferredDate: "2026-06-18",
          preferredTime: "Morning",
          coverageProvider: "BlueCross",
        },
        comments: ["Booked phone follow-up for tomorrow."],
      },
      {
        customerEmail: "sofia.martinez@maplecare-patients.test",
        title: "Immunization record request",
        description: "Patient needs records for school registration.",
        priority: Priority.normal,
        statusName: "Waiting on Patient",
        categoryName: "Records",
        assignedEmail: "coordinator@maplecare.test",
        dueInDays: 3,
        intakeData: {
          reasonForRequest: "Immunization record copy",
          preferredDate: "2026-06-23",
          preferredTime: "Any time",
          coverageProvider: "OHIP",
        },
        comments: ["Identity confirmation requested."],
      },
      {
        customerEmail: "ava.brown@maplecare-patients.test",
        title: "Urgent cough and fever triage",
        description: "Patient has worsening symptoms and needs review.",
        priority: Priority.urgent,
        statusName: "Triage",
        categoryName: "Intake",
        assignedEmail: "nurse@maplecare.test",
        dueInDays: 0,
        intakeData: {
          reasonForRequest: "Cough and fever",
          preferredDate: "2026-06-17",
          preferredTime: "Any time",
          coverageProvider: "Canada Life",
        },
        comments: ["Nurse reviewing symptoms before booking."],
      },
      {
        customerEmail: "ethan.wilson@maplecare-patients.test",
        title: "Physical therapy referral follow-up",
        description: "Patient asked for referral status update.",
        priority: Priority.normal,
        statusName: "Scheduled",
        categoryName: "Records",
        assignedEmail: "staff@maplecare.test",
        dueInDays: 6,
        intakeData: {
          reasonForRequest: "Referral status",
          preferredDate: "2026-06-26",
          preferredTime: "Afternoon",
          coverageProvider: "Manulife",
        },
        comments: ["Referral sent to provider portal."],
      },
      {
        customerEmail: "lily.chen@maplecare-patients.test",
        title: "Appointment cancellation request",
        description: "Patient needs to move next week's appointment.",
        priority: Priority.low,
        statusName: "New",
        categoryName: "Appointment",
        dueInDays: 7,
        intakeData: {
          reasonForRequest: "Reschedule appointment",
          preferredDate: "2026-06-27",
          preferredTime: "Evening",
          coverageProvider: "SunLife",
        },
        comments: ["Offered two replacement slots."],
      },
      {
        customerEmail: "benjamin.ross@maplecare-patients.test",
        title: "Closed lab result follow-up",
        description: "Provider reviewed results and completed outreach.",
        priority: Priority.normal,
        statusName: "Closed",
        categoryName: "Records",
        assignedEmail: "staff@maplecare.test",
        closedDaysAgo: 2,
        intakeData: {
          reasonForRequest: "Lab result follow-up",
          preferredDate: "2026-06-12",
          preferredTime: "Morning",
          coverageProvider: "BlueCross",
        },
        comments: ["Results reviewed and patient notified."],
      },
    ],
  },
  {
    name: "Summit Realty",
    slug: "summit-realty",
    industry: "real_estate",
    appName: "Core Realty",
    caseLabel: "Inquiry",
    customerLabel: "Client",
    industryTemplateKey: "real_estate",
    referencePrefix: "REA",
    users: [
      {
        name: "Olivia Bennett",
        email: "owner@summit-realty.test",
        role: Role.owner,
      },
      { name: "Daniel Kim", email: "admin@summit-realty.test", role: Role.admin },
      { name: "Maya Singh", email: "agent@summit-realty.test", role: Role.staff },
      {
        name: "Theo Harris",
        email: "broker@summit-realty.test",
        role: Role.staff,
      },
    ],
    customers: customers("summit-realty-clients.test", [
      ["Amelia Brooks", "555-0201"],
      ["Daniel Clarke", "555-0202"],
      ["Priya Desai", "555-0203"],
      ["Owen Foster", "555-0204"],
      ["Lina Park", "555-0205"],
      ["Marcus Bell", "555-0206"],
      ["Hannah Stone", "555-0207"],
      ["Victor Chen", "555-0208"],
      ["Grace Miller", "555-0209"],
      ["Samir Khan", "555-0210"],
    ]),
    cases: [
      {
        customerEmail: "amelia.brooks@summit-realty-clients.test",
        title: "Buyer looking for townhouse near transit",
        description: "Client wants a shortlist of east-end townhouses.",
        priority: Priority.high,
        statusName: "Qualified",
        categoryName: "Buyer Lead",
        assignedEmail: "agent@summit-realty.test",
        dueInDays: 1,
        intakeData: {
          propertyType: "Townhouse",
          budgetRange: "$850k - $1.05m",
          preferredArea: "Leslieville, Riverside",
          timeline: "1-3 months",
          financingStatus: "Pre-approved",
        },
        comments: ["Sent first listing shortlist."],
      },
      {
        customerEmail: "daniel.clarke@summit-realty-clients.test",
        title: "Downtown condo viewing request",
        description: "Client asked to view two units this weekend.",
        priority: Priority.normal,
        statusName: "Viewing Scheduled",
        categoryName: "Viewing",
        assignedEmail: "broker@summit-realty.test",
        dueInDays: 3,
        intakeData: {
          propertyType: "Condo",
          budgetRange: "$650k - $750k",
          preferredArea: "Downtown Toronto",
          timeline: "Immediately",
          financingStatus: "Pre-qualified",
        },
        comments: ["Viewing confirmed for Saturday."],
      },
      {
        customerEmail: "priya.desai@summit-realty-clients.test",
        title: "Detached home seller valuation",
        description: "Owner requested pricing review before listing.",
        priority: Priority.normal,
        statusName: "New Lead",
        categoryName: "Seller Lead",
        dueInDays: 4,
        intakeData: {
          propertyType: "Detached",
          budgetRange: "$1.4m - $1.6m",
          preferredArea: "North York",
          timeline: "3-6 months",
          financingStatus: "Not started",
        },
        comments: ["Preparing comparative market analysis."],
      },
      {
        customerEmail: "owen.foster@summit-realty-clients.test",
        title: "Commercial lease inquiry",
        description: "Client needs small office options near transit.",
        priority: Priority.normal,
        statusName: "Qualified",
        categoryName: "Property Inquiry",
        assignedEmail: "agent@summit-realty.test",
        dueInDays: 5,
        intakeData: {
          propertyType: "Commercial",
          budgetRange: "$4k - $6k monthly",
          preferredArea: "Liberty Village",
          timeline: "1-3 months",
          financingStatus: "Cash buyer",
        },
        comments: ["Requested desired square footage."],
      },
      {
        customerEmail: "lina.park@summit-realty-clients.test",
        title: "Offer review for semi-detached home",
        description: "Client needs offer conditions reviewed before submission.",
        priority: Priority.high,
        statusName: "Offer",
        categoryName: "Buyer Lead",
        assignedEmail: "broker@summit-realty.test",
        dueInDays: 0,
        intakeData: {
          propertyType: "Semi-detached",
          budgetRange: "$1.1m - $1.2m",
          preferredArea: "High Park",
          timeline: "Immediately",
          financingStatus: "Pre-approved",
        },
        comments: ["Offer package drafted."],
      },
      {
        customerEmail: "marcus.bell@summit-realty-clients.test",
        title: "First-time buyer consultation",
        description: "Client wants process overview and lender referrals.",
        priority: Priority.low,
        statusName: "New Lead",
        categoryName: "Buyer Lead",
        dueInDays: 7,
        intakeData: {
          propertyType: "Condo",
          budgetRange: "$500k - $650k",
          preferredArea: "Mississauga",
          timeline: "6+ months",
          financingStatus: "Not started",
        },
        comments: ["Sent buyer preparation checklist."],
      },
      {
        customerEmail: "hannah.stone@summit-realty-clients.test",
        title: "Luxury condo listing prep",
        description: "Seller needs staging and photo timeline.",
        priority: Priority.normal,
        statusName: "Qualified",
        categoryName: "Seller Lead",
        assignedEmail: "agent@summit-realty.test",
        dueInDays: 6,
        intakeData: {
          propertyType: "Condo",
          budgetRange: "$1.3m - $1.5m",
          preferredArea: "Yorkville",
          timeline: "1-3 months",
          financingStatus: "Cash buyer",
        },
        comments: ["Staging quote requested."],
      },
      {
        customerEmail: "victor.chen@summit-realty-clients.test",
        title: "Viewing follow-up for family home",
        description: "Client liked property and wants school details.",
        priority: Priority.normal,
        statusName: "Viewing Scheduled",
        categoryName: "Viewing",
        assignedEmail: "broker@summit-realty.test",
        dueInDays: 2,
        intakeData: {
          propertyType: "Detached",
          budgetRange: "$1.0m - $1.2m",
          preferredArea: "Etobicoke",
          timeline: "1-3 months",
          financingStatus: "Pre-qualified",
        },
        comments: ["School catchment report sent."],
      },
      {
        customerEmail: "grace.miller@summit-realty-clients.test",
        title: "Closed buyer inquiry",
        description: "Client purchased through another agent.",
        priority: Priority.low,
        statusName: "Closed",
        categoryName: "Buyer Lead",
        closedDaysAgo: 3,
        intakeData: {
          propertyType: "Townhouse",
          budgetRange: "$800k - $900k",
          preferredArea: "Oakville",
          timeline: "Immediately",
          financingStatus: "Pre-approved",
        },
        comments: ["Marked closed after client update."],
      },
      {
        customerEmail: "samir.khan@summit-realty-clients.test",
        title: "Investment duplex search",
        description: "Investor wants cash-flow positive options.",
        priority: Priority.high,
        statusName: "Qualified",
        categoryName: "Property Inquiry",
        assignedEmail: "agent@summit-realty.test",
        dueInDays: 3,
        intakeData: {
          propertyType: "Detached",
          budgetRange: "$900k - $1.1m",
          preferredArea: "Hamilton",
          timeline: "3-6 months",
          financingStatus: "Pre-approved",
        },
        comments: ["Filtering for legal duplex inventory."],
      },
    ],
  },
  {
    name: "Northstar Finance",
    slug: "northstar-finance",
    industry: "finance",
    appName: "Core Finance",
    caseLabel: "Application",
    customerLabel: "Customer",
    industryTemplateKey: "finance",
    referencePrefix: "FIN",
    users: [
      {
        name: "Nora Bennett",
        email: "owner@northstar-finance.test",
        role: Role.owner,
      },
      {
        name: "Ibrahim Hassan",
        email: "admin@northstar-finance.test",
        role: Role.admin,
      },
      {
        name: "Grace Wilson",
        email: "analyst@northstar-finance.test",
        role: Role.staff,
      },
      {
        name: "Ethan Ross",
        email: "reviewer@northstar-finance.test",
        role: Role.staff,
      },
    ],
    customers: customers("northstar-finance-customers.test", [
      ["Chloe Adams", "555-0301"],
      ["Mason Wright", "555-0302"],
      ["Nina Flores", "555-0303"],
      ["Leo Turner", "555-0304"],
      ["Aisha Khan", "555-0305"],
      ["Caleb Reed", "555-0306"],
      ["Ruby King", "555-0307"],
      ["Theo Adams", "555-0308"],
      ["Ivy Brooks", "555-0309"],
      ["Omar Ali", "555-0310"],
    ]),
    cases: [
      {
        customerEmail: "chloe.adams@northstar-finance-customers.test",
        title: "Small business credit application",
        description: "Applicant needs review of supporting documents.",
        priority: Priority.high,
        statusName: "Under Review",
        categoryName: "Application",
        assignedEmail: "analyst@northstar-finance.test",
        dueInDays: 0,
        intakeData: {
          applicationType: "New application",
          requestedAmount: "$75,000",
          incomeRange: "$100k - $150k",
          supportingDetails: "Two years of operating history uploaded",
        },
        comments: ["Requested updated cash-flow statement."],
      },
      {
        customerEmail: "mason.wright@northstar-finance-customers.test",
        title: "Duplicate transaction dispute",
        description: "Customer disputes a repeated merchant charge.",
        priority: Priority.normal,
        statusName: "Needs Information",
        categoryName: "Dispute",
        assignedEmail: "reviewer@northstar-finance.test",
        dueInDays: 2,
        intakeData: {
          applicationType: "Dispute",
          requestedAmount: "$1,240",
          incomeRange: "$50k - $100k",
          supportingDetails: "Customer uploaded statement screenshot",
        },
        comments: ["Merchant reference number requested."],
      },
      {
        customerEmail: "nina.flores@northstar-finance-customers.test",
        title: "Loan renewal document request",
        description: "Renewal packet needs updated proof of income.",
        priority: Priority.low,
        statusName: "Submitted",
        categoryName: "Document Request",
        dueInDays: 6,
        intakeData: {
          applicationType: "Document request",
          requestedAmount: "$25,000",
          incomeRange: "$50k - $100k",
          supportingDetails: "Renewal expected next quarter",
        },
        comments: ["Income documents pending."],
      },
      {
        customerEmail: "leo.turner@northstar-finance-customers.test",
        title: "Mortgage pre-approval review",
        description: "Customer submitted income and debt details.",
        priority: Priority.high,
        statusName: "Under Review",
        categoryName: "Application",
        assignedEmail: "analyst@northstar-finance.test",
        dueInDays: 1,
        intakeData: {
          applicationType: "Review",
          requestedAmount: "$620,000",
          incomeRange: "$150k+",
          supportingDetails: "Joint application with uploaded T4s",
        },
        comments: ["Debt ratios being validated."],
      },
      {
        customerEmail: "aisha.khan@northstar-finance-customers.test",
        title: "Approved line increase",
        description: "Line increase review completed and approved.",
        priority: Priority.normal,
        statusName: "Approved",
        categoryName: "Application",
        assignedEmail: "reviewer@northstar-finance.test",
        dueInDays: null,
        intakeData: {
          applicationType: "Review",
          requestedAmount: "$15,000",
          incomeRange: "$100k - $150k",
          supportingDetails: "Strong repayment history",
        },
        comments: ["Approval notice prepared."],
      },
      {
        customerEmail: "caleb.reed@northstar-finance-customers.test",
        title: "Wire transfer review",
        description: "Large outgoing transfer triggered manual review.",
        priority: Priority.urgent,
        statusName: "Needs Information",
        categoryName: "Transaction Review",
        assignedEmail: "analyst@northstar-finance.test",
        dueInDays: 0,
        intakeData: {
          applicationType: "Review",
          requestedAmount: "$48,500",
          incomeRange: "$150k+",
          supportingDetails: "Customer needs beneficiary confirmation",
        },
        comments: ["Outbound verification call queued."],
      },
      {
        customerEmail: "ruby.king@northstar-finance-customers.test",
        title: "Closed card dispute",
        description: "Customer dispute was resolved in customer's favor.",
        priority: Priority.low,
        statusName: "Closed",
        categoryName: "Dispute",
        closedDaysAgo: 1,
        intakeData: {
          applicationType: "Dispute",
          requestedAmount: "$320",
          incomeRange: "Under $50k",
          supportingDetails: "Chargeback completed",
        },
        comments: ["Credit applied to account."],
      },
      {
        customerEmail: "theo.adams@northstar-finance-customers.test",
        title: "Equipment financing application",
        description: "Applicant requested financing for fleet equipment.",
        priority: Priority.normal,
        statusName: "Submitted",
        categoryName: "Application",
        dueInDays: 5,
        intakeData: {
          applicationType: "New application",
          requestedAmount: "$110,000",
          incomeRange: "$100k - $150k",
          supportingDetails: "Vendor quote attached",
        },
        comments: ["Waiting for business bank statements."],
      },
      {
        customerEmail: "ivy.brooks@northstar-finance-customers.test",
        title: "Statement correction request",
        description: "Customer says a payment was posted to the wrong account.",
        priority: Priority.normal,
        statusName: "Under Review",
        categoryName: "Document Request",
        assignedEmail: "reviewer@northstar-finance.test",
        dueInDays: 3,
        intakeData: {
          applicationType: "Document request",
          requestedAmount: "$2,800",
          incomeRange: "$50k - $100k",
          supportingDetails: "Payment confirmation uploaded",
        },
        comments: ["Operations team checking posting batch."],
      },
      {
        customerEmail: "omar.ali@northstar-finance-customers.test",
        title: "New savings account exception",
        description: "Customer profile requires manual verification.",
        priority: Priority.low,
        statusName: "Submitted",
        categoryName: "Transaction Review",
        dueInDays: 7,
        intakeData: {
          applicationType: "Review",
          requestedAmount: "$0",
          incomeRange: "$50k - $100k",
          supportingDetails: "Address mismatch on identity document",
        },
        comments: ["Identity review checklist started."],
      },
    ],
  },
  {
    name: "Harbor Insurance",
    slug: "harbor-insurance",
    industry: "insurance",
    appName: "Core Insurance",
    caseLabel: "Claim",
    customerLabel: "Policyholder",
    industryTemplateKey: "insurance",
    referencePrefix: "INS",
    users: [
      {
        name: "Hannah Singh",
        email: "owner@harbor-insurance.test",
        role: Role.owner,
      },
      {
        name: "Marcus Green",
        email: "admin@harbor-insurance.test",
        role: Role.admin,
      },
      {
        name: "Lily Cooper",
        email: "adjuster@harbor-insurance.test",
        role: Role.staff,
      },
      {
        name: "Benjamin Ross",
        email: "advisor@harbor-insurance.test",
        role: Role.staff,
      },
    ],
    customers: customers("harbor-insurance-policyholders.test", [
      ["Ava Harper", "555-0401"],
      ["Logan Price", "555-0402"],
      ["Ella Morris", "555-0403"],
      ["Jack Hughes", "555-0404"],
      ["Zoe Ward", "555-0405"],
      ["Ryan Kelly", "555-0406"],
      ["Mila Scott", "555-0407"],
      ["Aaron Young", "555-0408"],
      ["Nadia Patel", "555-0409"],
      ["Cole Evans", "555-0410"],
    ]),
    cases: [
      {
        customerEmail: "ava.harper@harbor-insurance-policyholders.test",
        title: "Auto claim document review",
        description: "Claim needs supporting repair estimate.",
        priority: Priority.high,
        statusName: "Assessing",
        categoryName: "Claim",
        assignedEmail: "adjuster@harbor-insurance.test",
        dueInDays: 1,
        intakeData: {
          policyOrAccountNumber: "POL-10482",
          requestType: "Claim",
          incidentDate: "2026-06-08",
          incidentSummary: "Minor collision, vehicle drivable",
        },
        comments: ["Requested estimate from approved shop."],
      },
      {
        customerEmail: "logan.price@harbor-insurance-policyholders.test",
        title: "Home quote request",
        description: "Prospect requested quote for a new property.",
        priority: Priority.normal,
        statusName: "Filed",
        categoryName: "Quote",
        dueInDays: 4,
        intakeData: {
          policyOrAccountNumber: "",
          requestType: "Quote",
          incidentDate: "",
          incidentSummary: "Needs home coverage before closing date",
        },
        comments: ["Quote worksheet created."],
      },
      {
        customerEmail: "ella.morris@harbor-insurance-policyholders.test",
        title: "Policy change for additional driver",
        description: "Customer wants to add a household driver.",
        priority: Priority.normal,
        statusName: "Waiting on Documents",
        categoryName: "Policy Change",
        assignedEmail: "advisor@harbor-insurance.test",
        dueInDays: 3,
        intakeData: {
          policyOrAccountNumber: "POL-99142",
          requestType: "Policy change",
          incidentDate: "",
          incidentSummary: "Waiting for driver record details",
        },
        comments: ["Driver license upload requested."],
      },
      {
        customerEmail: "jack.hughes@harbor-insurance-policyholders.test",
        title: "Water damage claim",
        description: "Customer reported basement water damage.",
        priority: Priority.urgent,
        statusName: "Assessing",
        categoryName: "Claim",
        assignedEmail: "adjuster@harbor-insurance.test",
        dueInDays: 0,
        intakeData: {
          policyOrAccountNumber: "POL-55310",
          requestType: "Claim",
          incidentDate: "2026-06-14",
          incidentSummary: "Water entered basement after storm",
        },
        comments: ["Emergency mitigation vendor assigned."],
      },
      {
        customerEmail: "zoe.ward@harbor-insurance-policyholders.test",
        title: "Life policy beneficiary update",
        description: "Policyholder needs beneficiary forms reviewed.",
        priority: Priority.low,
        statusName: "Filed",
        categoryName: "Document Review",
        dueInDays: 6,
        intakeData: {
          policyOrAccountNumber: "POL-77180",
          requestType: "Document review",
          incidentDate: "",
          incidentSummary: "Beneficiary update form submitted",
        },
        comments: ["Form queued for compliance review."],
      },
      {
        customerEmail: "ryan.kelly@harbor-insurance-policyholders.test",
        title: "Decision ready for theft claim",
        description: "All evidence is received and claim is ready for decision.",
        priority: Priority.high,
        statusName: "Decision",
        categoryName: "Claim",
        assignedEmail: "adjuster@harbor-insurance.test",
        dueInDays: 1,
        intakeData: {
          policyOrAccountNumber: "POL-44821",
          requestType: "Claim",
          incidentDate: "2026-06-01",
          incidentSummary: "Laptop theft with police report",
        },
        comments: ["Police report verified."],
      },
      {
        customerEmail: "mila.scott@harbor-insurance-policyholders.test",
        title: "Closed travel claim",
        description: "Medical travel claim was paid and closed.",
        priority: Priority.normal,
        statusName: "Closed",
        categoryName: "Claim",
        closedDaysAgo: 4,
        intakeData: {
          policyOrAccountNumber: "POL-60021",
          requestType: "Claim",
          incidentDate: "2026-05-29",
          incidentSummary: "Travel medical reimbursement",
        },
        comments: ["Payment sent to policyholder."],
      },
      {
        customerEmail: "aaron.young@harbor-insurance-policyholders.test",
        title: "Commercial liability quote",
        description: "Small business owner requested liability coverage.",
        priority: Priority.normal,
        statusName: "Filed",
        categoryName: "Quote",
        assignedEmail: "advisor@harbor-insurance.test",
        dueInDays: 5,
        intakeData: {
          policyOrAccountNumber: "",
          requestType: "Quote",
          incidentDate: "",
          incidentSummary: "Bakery needs commercial liability quote",
        },
        comments: ["Class code details requested."],
      },
      {
        customerEmail: "nadia.patel@harbor-insurance-policyholders.test",
        title: "Auto endorsement review",
        description: "Customer changed commute distance.",
        priority: Priority.low,
        statusName: "Waiting on Documents",
        categoryName: "Policy Change",
        dueInDays: 7,
        intakeData: {
          policyOrAccountNumber: "POL-33429",
          requestType: "Policy change",
          incidentDate: "",
          incidentSummary: "New commute distance needs confirmation",
        },
        comments: ["Waiting on odometer photo."],
      },
      {
        customerEmail: "cole.evans@harbor-insurance-policyholders.test",
        title: "Roof inspection document review",
        description: "Underwriting requested roof inspection records.",
        priority: Priority.normal,
        statusName: "Assessing",
        categoryName: "Document Review",
        assignedEmail: "advisor@harbor-insurance.test",
        dueInDays: 3,
        intakeData: {
          policyOrAccountNumber: "POL-90142",
          requestType: "Document review",
          incidentDate: "",
          incidentSummary: "Inspection report uploaded after renewal flag",
        },
        comments: ["Underwriter reviewing report."],
      },
    ],
  },
  {
    name: "Pipeline Sales",
    slug: "pipeline-sales",
    industry: "sales",
    appName: "Core Sales",
    caseLabel: "Deal",
    customerLabel: "Lead",
    industryTemplateKey: "sales",
    referencePrefix: "SAL",
    users: [
      {
        name: "Olivia Martin",
        email: "owner@pipeline-sales.test",
        role: Role.owner,
      },
      {
        name: "James Wright",
        email: "admin@pipeline-sales.test",
        role: Role.admin,
      },
      { name: "Maya Chen", email: "rep@pipeline-sales.test", role: Role.staff },
      {
        name: "Leo Walker",
        email: "manager@pipeline-sales.test",
        role: Role.staff,
      },
    ],
    customers: customers("pipeline-sales-leads.test", [
      ["Brightline Studio", "555-0501"],
      ["Atlas Supply", "555-0502"],
      ["Cedar Labs", "555-0503"],
      ["North Pier Foods", "555-0504"],
      ["Vector Works", "555-0505"],
      ["Fieldstone Retail", "555-0506"],
      ["Urban Ledger", "555-0507"],
      ["Bluebird Agency", "555-0508"],
      ["Keystone Logistics", "555-0509"],
      ["Prairie Dental Group", "555-0510"],
    ]),
    cases: [
      {
        customerEmail: "brightline.studio@pipeline-sales-leads.test",
        title: "Inbound lead for team plan",
        description: "Lead requested pricing for a 25-seat rollout.",
        priority: Priority.high,
        statusName: "Qualified",
        categoryName: "Inbound Lead",
        assignedEmail: "rep@pipeline-sales.test",
        dueInDays: 1,
        intakeData: {
          companyName: "Brightline Studio",
          dealInterest: "New purchase",
          estimatedValue: "$18,000",
          decisionTimeline: "This month",
        },
        comments: ["Discovery call scheduled for Thursday."],
      },
      {
        customerEmail: "atlas.supply@pipeline-sales-leads.test",
        title: "Renewal expansion opportunity",
        description: "Current customer asked about additional teams.",
        priority: Priority.normal,
        statusName: "Proposal",
        categoryName: "Expansion",
        assignedEmail: "manager@pipeline-sales.test",
        dueInDays: 2,
        intakeData: {
          companyName: "Atlas Supply",
          dealInterest: "Expansion",
          estimatedValue: "$32,000",
          decisionTimeline: "This quarter",
        },
        comments: ["Proposal sent with expansion pricing."],
      },
      {
        customerEmail: "cedar.labs@pipeline-sales-leads.test",
        title: "Outbound lead requested follow-up",
        description: "Prospect replied to campaign and wants a short demo.",
        priority: Priority.normal,
        statusName: "Contacted",
        categoryName: "Outbound Lead",
        dueInDays: 5,
        intakeData: {
          companyName: "Cedar Labs",
          dealInterest: "Partnership",
          estimatedValue: "$10,000 - $25,000",
          decisionTimeline: "Next quarter",
        },
        comments: ["Demo invite sent."],
      },
      {
        customerEmail: "north.pier.foods@pipeline-sales-leads.test",
        title: "Retail operations platform evaluation",
        description: "Operations team is comparing workflow tools.",
        priority: Priority.high,
        statusName: "Qualified",
        categoryName: "Inbound Lead",
        assignedEmail: "rep@pipeline-sales.test",
        dueInDays: 2,
        intakeData: {
          companyName: "North Pier Foods",
          dealInterest: "New purchase",
          estimatedValue: "$42,000",
          decisionTimeline: "This quarter",
        },
        comments: ["Security questionnaire received."],
      },
      {
        customerEmail: "vector.works@pipeline-sales-leads.test",
        title: "Partner program inquiry",
        description: "Consulting firm asked about partner terms.",
        priority: Priority.low,
        statusName: "New Lead",
        categoryName: "Outbound Lead",
        dueInDays: 7,
        intakeData: {
          companyName: "Vector Works",
          dealInterest: "Partnership",
          estimatedValue: "$15,000",
          decisionTimeline: "Unknown",
        },
        comments: ["Sent partner overview."],
      },
      {
        customerEmail: "fieldstone.retail@pipeline-sales-leads.test",
        title: "Closed renewal conversation",
        description: "Customer renewed through existing account manager.",
        priority: Priority.low,
        statusName: "Closed",
        categoryName: "Renewal",
        closedDaysAgo: 2,
        intakeData: {
          companyName: "Fieldstone Retail",
          dealInterest: "Renewal",
          estimatedValue: "$22,000",
          decisionTimeline: "This month",
        },
        comments: ["Closed after renewal confirmation."],
      },
      {
        customerEmail: "urban.ledger@pipeline-sales-leads.test",
        title: "Finance workflow pilot",
        description: "Finance team wants a two-department pilot.",
        priority: Priority.normal,
        statusName: "Proposal",
        categoryName: "Inbound Lead",
        assignedEmail: "manager@pipeline-sales.test",
        dueInDays: 4,
        intakeData: {
          companyName: "Urban Ledger",
          dealInterest: "New purchase",
          estimatedValue: "$28,000",
          decisionTimeline: "This quarter",
        },
        comments: ["Pilot scope drafted."],
      },
      {
        customerEmail: "bluebird.agency@pipeline-sales-leads.test",
        title: "Agency expansion call",
        description: "Existing customer wants to add client portals.",
        priority: Priority.normal,
        statusName: "Contacted",
        categoryName: "Expansion",
        assignedEmail: "rep@pipeline-sales.test",
        dueInDays: 3,
        intakeData: {
          companyName: "Bluebird Agency",
          dealInterest: "Expansion",
          estimatedValue: "$12,000",
          decisionTimeline: "This month",
        },
        comments: ["Needs implementation timeline."],
      },
      {
        customerEmail: "keystone.logistics@pipeline-sales-leads.test",
        title: "Logistics team outbound lead",
        description: "Prospect opened three campaign emails.",
        priority: Priority.low,
        statusName: "Contacted",
        categoryName: "Outbound Lead",
        dueInDays: 6,
        intakeData: {
          companyName: "Keystone Logistics",
          dealInterest: "New purchase",
          estimatedValue: "$20,000",
          decisionTimeline: "Next quarter",
        },
        comments: ["Left voicemail with operations director."],
      },
      {
        customerEmail: "prairie.dental.group@pipeline-sales-leads.test",
        title: "Multi-location services deal",
        description: "Clinic group asked about workflow consolidation.",
        priority: Priority.high,
        statusName: "Qualified",
        categoryName: "Inbound Lead",
        assignedEmail: "manager@pipeline-sales.test",
        dueInDays: 1,
        intakeData: {
          companyName: "Prairie Dental Group",
          dealInterest: "New purchase",
          estimatedValue: "$55,000",
          decisionTimeline: "This month",
        },
        comments: ["Executive demo booked."],
      },
    ],
  },
  {
    name: "LocalPro Services",
    slug: "localpro-services",
    industry: "local_business",
    appName: "Core Local",
    caseLabel: "Booking",
    customerLabel: "Customer",
    industryTemplateKey: "local_business",
    referencePrefix: "LOC",
    users: [
      {
        name: "Ruby King",
        email: "owner@localpro-services.test",
        role: Role.owner,
      },
      {
        name: "Theo Adams",
        email: "admin@localpro-services.test",
        role: Role.admin,
      },
      {
        name: "Nina Flores",
        email: "dispatcher@localpro-services.test",
        role: Role.staff,
      },
      {
        name: "Caleb Reed",
        email: "tech@localpro-services.test",
        role: Role.staff,
      },
    ],
    customers: customers("localpro-customers.test", [
      ["Ivy Brooks", "555-0601"],
      ["Gavin Clark", "555-0602"],
      ["Elena Cruz", "555-0603"],
      ["Miles Grant", "555-0604"],
      ["Tara Hill", "555-0605"],
      ["Jon Bell", "555-0606"],
      ["Riley Evans", "555-0607"],
      ["Paige Moore", "555-0608"],
      ["Dylan Fox", "555-0609"],
      ["Naomi Hart", "555-0610"],
    ]),
    cases: [
      {
        customerEmail: "ivy.brooks@localpro-customers.test",
        title: "Quote request for office cleaning",
        description: "Customer asked for recurring service pricing.",
        priority: Priority.normal,
        statusName: "Requested",
        categoryName: "Quote",
        assignedEmail: "dispatcher@localpro-services.test",
        dueInDays: 2,
        intakeData: {
          serviceNeeded: "Weekly office cleaning",
          preferredDate: "2026-06-20",
          serviceLocation: "Downtown office",
          budgetRange: "$500 - $1,000",
        },
        comments: ["Waiting for square footage details."],
      },
      {
        customerEmail: "gavin.clark@localpro-customers.test",
        title: "Confirmed appliance repair appointment",
        description: "Customer booked a service call for appliance repair.",
        priority: Priority.high,
        statusName: "Confirmed",
        categoryName: "Booking",
        assignedEmail: "tech@localpro-services.test",
        dueInDays: 1,
        intakeData: {
          serviceNeeded: "Appliance repair",
          preferredDate: "2026-06-18",
          serviceLocation: "Customer home",
          budgetRange: "$250 - $500",
        },
        comments: ["Technician assigned."],
      },
      {
        customerEmail: "elena.cruz@localpro-customers.test",
        title: "Follow-up after completed yard service",
        description: "Customer wants a second appointment for extra work.",
        priority: Priority.low,
        statusName: "Waiting on Customer",
        categoryName: "Follow-up",
        dueInDays: 5,
        intakeData: {
          serviceNeeded: "Additional yard cleanup",
          preferredDate: "2026-06-25",
          serviceLocation: "Customer home",
          budgetRange: "$500 - $1,000",
        },
        comments: ["Sent estimate for additional work."],
      },
      {
        customerEmail: "miles.grant@localpro-customers.test",
        title: "Emergency plumbing service",
        description: "Customer reported active leak under sink.",
        priority: Priority.urgent,
        statusName: "In Progress",
        categoryName: "Service Request",
        assignedEmail: "tech@localpro-services.test",
        dueInDays: 0,
        intakeData: {
          serviceNeeded: "Emergency plumbing",
          preferredDate: "2026-06-17",
          serviceLocation: "Customer home",
          budgetRange: "$250 - $500",
        },
        comments: ["Technician en route."],
      },
      {
        customerEmail: "tara.hill@localpro-customers.test",
        title: "New booking for window cleaning",
        description: "Customer requested exterior window cleaning.",
        priority: Priority.normal,
        statusName: "Requested",
        categoryName: "Booking",
        dueInDays: 6,
        intakeData: {
          serviceNeeded: "Window cleaning",
          preferredDate: "2026-06-28",
          serviceLocation: "Customer home",
          budgetRange: "$250 - $500",
        },
        comments: ["Need confirm ladder access."],
      },
      {
        customerEmail: "jon.bell@localpro-customers.test",
        title: "Confirmed commercial HVAC inspection",
        description: "Business booked quarterly HVAC service.",
        priority: Priority.high,
        statusName: "Confirmed",
        categoryName: "Booking",
        assignedEmail: "dispatcher@localpro-services.test",
        dueInDays: 2,
        intakeData: {
          serviceNeeded: "HVAC inspection",
          preferredDate: "2026-06-20",
          serviceLocation: "Retail location",
          budgetRange: "$1,000 - $2,000",
        },
        comments: ["Access instructions added to work order."],
      },
      {
        customerEmail: "riley.evans@localpro-customers.test",
        title: "Closed gutter repair",
        description: "Repair visit completed and invoice sent.",
        priority: Priority.low,
        statusName: "Closed",
        categoryName: "Service Request",
        closedDaysAgo: 3,
        intakeData: {
          serviceNeeded: "Gutter repair",
          preferredDate: "2026-06-12",
          serviceLocation: "Customer home",
          budgetRange: "$250 - $500",
        },
        comments: ["Invoice sent after completion."],
      },
      {
        customerEmail: "paige.moore@localpro-customers.test",
        title: "Quote for storefront painting",
        description: "Customer asked for repaint estimate.",
        priority: Priority.normal,
        statusName: "Requested",
        categoryName: "Quote",
        assignedEmail: "dispatcher@localpro-services.test",
        dueInDays: 4,
        intakeData: {
          serviceNeeded: "Storefront painting",
          preferredDate: "2026-06-24",
          serviceLocation: "Main Street storefront",
          budgetRange: "$2,000 - $4,000",
        },
        comments: ["Photos requested for estimate."],
      },
      {
        customerEmail: "dylan.fox@localpro-customers.test",
        title: "In-progress move-out cleaning",
        description: "Crew started move-out cleaning for rental unit.",
        priority: Priority.high,
        statusName: "In Progress",
        categoryName: "Service Request",
        assignedEmail: "tech@localpro-services.test",
        dueInDays: 0,
        intakeData: {
          serviceNeeded: "Move-out cleaning",
          preferredDate: "2026-06-17",
          serviceLocation: "Rental condo",
          budgetRange: "$500 - $1,000",
        },
        comments: ["Customer approved extra appliance cleaning."],
      },
      {
        customerEmail: "naomi.hart@localpro-customers.test",
        title: "Follow-up for recurring lawn service",
        description: "Customer wants to switch service frequency.",
        priority: Priority.low,
        statusName: "Waiting on Customer",
        categoryName: "Follow-up",
        dueInDays: 8,
        intakeData: {
          serviceNeeded: "Recurring lawn service",
          preferredDate: "2026-06-30",
          serviceLocation: "Customer home",
          budgetRange: "$500 - $1,000",
        },
        comments: ["Sent biweekly and monthly plan options."],
      },
    ],
  },
];

async function main() {
  const demoPasswordHash = await bcrypt.hash("Password123!", 10);

  for (const workspace of demoWorkspaces) {
    await seedDemoWorkspace(workspace, demoPasswordHash);
  }

  console.log("Seed data created.");
  console.log(
    "Demo login password: Password123! for owner/admin/staff users.",
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
