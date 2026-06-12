import {
  PrismaClient,
  IntakeFieldType,
  Priority,
  Role,
  Source,
  Visibility,
} from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
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

function daysFromNow(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

async function main() {
  const demoPasswordHash = await bcrypt.hash("Password123!", 10);

  const organization = await prisma.organization.upsert({
    where: {
      slug: "maplecare-clinic",
    },
    update: {
      appName: "Core Clinic",
      caseLabel: "Intake",
      customerLabel: "Patient",
      industryTemplateKey: "clinic",
    },
    create: {
      name: "MapleCare Clinic",
      slug: "maplecare-clinic",
      industry: "clinic",
      appName: "Core Clinic",
      caseLabel: "Intake",
      customerLabel: "Patient",
      industryTemplateKey: "clinic",
    },
  });

  await prisma.caseActivityEvent.deleteMany({
    where: {
      organizationId: organization.id,
    },
  });
  await prisma.caseComment.deleteMany({
    where: {
      organizationId: organization.id,
    },
  });
  await prisma.caseAttachment.deleteMany({
    where: {
      organizationId: organization.id,
    },
  });
  await prisma.case.deleteMany({
    where: {
      organizationId: organization.id,
    },
  });
  await prisma.customer.deleteMany({
    where: {
      organizationId: organization.id,
    },
  });

  const demoUsers = [
    {
      name: "Avery Morgan",
      email: "owner@maplecare.test",
      role: Role.owner,
    },
    {
      name: "Priya Shah",
      email: "admin@maplecare.test",
      role: Role.admin,
    },
    {
      name: "Sarah Chen",
      email: "staff@maplecare.test",
      role: Role.staff,
    },
    {
      name: "Mateo Rivera",
      email: "nurse@maplecare.test",
      role: Role.staff,
    },
    {
      name: "Lena Brooks",
      email: "coordinator@maplecare.test",
      role: Role.staff,
    },
  ];

  const users = await Promise.all(
    demoUsers.map((user) =>
      prisma.user.upsert({
        where: {
          email: user.email,
        },
        update: {
          organizationId: organization.id,
          name: user.name,
          passwordHash: demoPasswordHash,
          role: user.role,
        },
        create: {
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

  const categoryDefinitions = [
    {
      name: "General Appointment",
      slug: "general-appointment",
      description: "Standard appointment or intake request",
    },
    {
      name: "Urgent Symptoms",
      slug: "urgent-symptoms",
      description: "Symptoms that need faster clinical review",
    },
    {
      name: "Billing Question",
      slug: "billing-question",
      description: "Insurance, billing, and payment questions",
    },
    {
      name: "Records Request",
      slug: "records-request",
      description: "Medical records and documentation requests",
    },
    {
      name: "Referral",
      slug: "referral",
      description: "Specialist referrals and follow-up coordination",
    },
    {
      name: "Follow-up",
      slug: "follow-up",
      description: "Follow-up care and care-plan check-ins",
    },
  ];

  const categories = await Promise.all(
    categoryDefinitions.map((category) =>
      prisma.caseCategory.upsert({
        where: {
          organizationId_slug: {
            organizationId: organization.id,
            slug: category.slug,
          },
        },
        update: {
          name: category.name,
          description: category.description,
        },
        create: {
          organizationId: organization.id,
          name: category.name,
          slug: category.slug,
          description: category.description,
        },
      }),
    ),
  );

  const categoryBySlug = new Map(
    categories.map((category) => [category.slug, category]),
  );

  const statusDefinitions = [
    {
      name: "New",
      slug: "new",
      color: "gray",
      sortOrder: 1,
      isDefault: true,
      isClosed: false,
    },
    {
      name: "In Review",
      slug: "in-review",
      color: "blue",
      sortOrder: 2,
      isDefault: false,
      isClosed: false,
    },
    {
      name: "Waiting on Customer",
      slug: "waiting-on-customer",
      color: "yellow",
      sortOrder: 3,
      isDefault: false,
      isClosed: false,
    },
    {
      name: "Scheduled",
      slug: "scheduled",
      color: "teal",
      sortOrder: 4,
      isDefault: false,
      isClosed: false,
    },
    {
      name: "Closed",
      slug: "closed",
      color: "green",
      sortOrder: 5,
      isDefault: false,
      isClosed: true,
    },
  ];

  const statuses = await Promise.all(
    statusDefinitions.map((status) =>
      prisma.workflowStatus.upsert({
        where: {
          organizationId_slug: {
            organizationId: organization.id,
            slug: status.slug,
          },
        },
        update: {
          name: status.name,
          color: status.color,
          sortOrder: status.sortOrder,
          isDefault: status.isDefault,
          isClosed: status.isClosed,
        },
        create: {
          organizationId: organization.id,
          name: status.name,
          slug: status.slug,
          color: status.color,
          sortOrder: status.sortOrder,
          isDefault: status.isDefault,
          isClosed: status.isClosed,
        },
      }),
    ),
  );

  const statusBySlug = new Map(statuses.map((status) => [status.slug, status]));

  const intakeFieldDefinitions = [
    {
      key: "reasonForVisit",
      label: "Reason for visit",
      fieldType: IntakeFieldType.textarea,
      placeholder: "Describe the request or concern",
      helpText: "Capture the primary reason this intake should be reviewed.",
      isRequired: true,
      sortOrder: 1,
    },
    {
      key: "preferredDate",
      label: "Preferred date",
      fieldType: IntakeFieldType.date,
      placeholder: null,
      helpText: "Optional date requested by the patient.",
      isRequired: false,
      sortOrder: 2,
    },
    {
      key: "symptoms",
      label: "Additional details",
      fieldType: IntakeFieldType.textarea,
      placeholder: "Add any relevant context",
      helpText: null,
      isRequired: false,
      sortOrder: 3,
    },
    {
      key: "insuranceProvider",
      label: "Insurance provider",
      fieldType: IntakeFieldType.text,
      placeholder: "Provider name",
      helpText: null,
      isRequired: false,
      sortOrder: 4,
    },
  ];

  await Promise.all(
    intakeFieldDefinitions.map((field) =>
      prisma.intakeField.upsert({
        where: {
          organizationId_key: {
            organizationId: organization.id,
            key: field.key,
          },
        },
        update: {
          label: field.label,
          fieldType: field.fieldType,
          placeholder: field.placeholder,
          helpText: field.helpText,
          isRequired: field.isRequired,
          showOnCaseDetail: true,
          isActive: true,
          sortOrder: field.sortOrder,
        },
        create: {
          organizationId: organization.id,
          key: field.key,
          label: field.label,
          fieldType: field.fieldType,
          placeholder: field.placeholder,
          helpText: field.helpText,
          isRequired: field.isRequired,
          showOnCaseDetail: true,
          isActive: true,
          sortOrder: field.sortOrder,
        },
      }),
    ),
  );

  const customerDefinitions = [
    ["Jordan Patel", "jordan.patel@example.com", "555-0142"],
    ["Emily Carter", "emily.carter@example.com", "555-0176"],
    ["Noah Williams", "noah.williams@example.com", "555-0183"],
    ["Mia Thompson", "mia.thompson@example.com", "555-0104"],
    ["Lucas Nguyen", "lucas.nguyen@example.com", "555-0195"],
    ["Sofia Martinez", "sofia.martinez@example.com", "555-0137"],
    ["Ethan Brooks", "ethan.brooks@example.com", "555-0119"],
    ["Aisha Khan", "aisha.khan@example.com", "555-0168"],
    ["Daniel Kim", "daniel.kim@example.com", "555-0155"],
    ["Grace Wilson", "grace.wilson@example.com", "555-0191"],
    ["Owen Clarke", "owen.clarke@example.com", "555-0128"],
    ["Nora Bennett", "nora.bennett@example.com", "555-0188"],
    ["Hannah Singh", "hannah.singh@example.com", "555-0109"],
    ["Benjamin Ross", "benjamin.ross@example.com", "555-0149"],
    ["Chloe Adams", "chloe.adams@example.com", "555-0171"],
    ["Ibrahim Hassan", "ibrahim.hassan@example.com", "555-0121"],
    ["Lily Cooper", "lily.cooper@example.com", "555-0162"],
    ["Marcus Green", "marcus.green@example.com", "555-0134"],
  ];

  const customers = await Promise.all(
    customerDefinitions.map(([name, email, phone], index) =>
      prisma.customer.create({
        data: {
          organizationId: organization.id,
          name,
          email,
          phone,
          externalReference: `PAT-${String(index + 1001).padStart(4, "0")}`,
        },
      }),
    ),
  );

  const customerByEmail = new Map(
    customers.map((customer) => [customer.email, customer]),
  );

  const caseDefinitions = [
    {
      customerEmail: "jordan.patel@example.com",
      title: "Recurring back pain needs appointment review",
      description: "Patient requested assessment after two weeks of lower back pain.",
      priority: Priority.high,
      statusSlug: "in-review",
      categorySlug: "general-appointment",
      assignedEmail: "staff@maplecare.test",
      dueInDays: -2,
      source: Source.customer_portal,
      intakeData: {
        reasonForVisit: "Recurring lower back pain",
        preferredDate: "2026-06-10",
        symptoms: "Pain after standing for long periods",
        insuranceProvider: "BlueCross",
      },
      comments: ["Asked patient to confirm any recent injury."],
    },
    {
      customerEmail: "emily.carter@example.com",
      title: "New patient intake for annual physical",
      description: "New patient wants to book a preventive care visit.",
      priority: Priority.normal,
      statusSlug: "new",
      categorySlug: "general-appointment",
      assignedEmail: null,
      dueInDays: 4,
      source: Source.customer_portal,
      intakeData: {
        reasonForVisit: "Annual physical",
        preferredDate: "2026-06-18",
        symptoms: "No current symptoms",
        insuranceProvider: "SunLife",
      },
      comments: [],
    },
    {
      customerEmail: "noah.williams@example.com",
      title: "Chest tightness reported through portal",
      description: "Patient reports intermittent chest tightness and fatigue.",
      priority: Priority.urgent,
      statusSlug: "waiting-on-customer",
      categorySlug: "urgent-symptoms",
      assignedEmail: "nurse@maplecare.test",
      dueInDays: -1,
      source: Source.customer_portal,
      intakeData: {
        reasonForVisit: "Chest tightness and fatigue",
        preferredDate: "2026-06-12",
        symptoms: "Intermittent tightness, no current severe pain",
        insuranceProvider: "Manulife",
      },
      comments: ["Left voicemail advising urgent follow-up questions."],
    },
    {
      customerEmail: "mia.thompson@example.com",
      title: "Insurance card update before visit",
      description: "Patient uploaded new insurance details for upcoming appointment.",
      priority: Priority.low,
      statusSlug: "closed",
      categorySlug: "billing-question",
      assignedEmail: "coordinator@maplecare.test",
      dueInDays: null,
      closedDaysAgo: 2,
      source: Source.staff_created,
      intakeData: {
        reasonForVisit: "Update insurance information",
        preferredDate: "2026-06-09",
        symptoms: "Administrative request",
        insuranceProvider: "GreenShield",
      },
      comments: ["Insurance details verified and account updated."],
    },
    {
      customerEmail: "lucas.nguyen@example.com",
      title: "Referral request for dermatology",
      description: "Patient is asking for specialist referral after recurring rash.",
      priority: Priority.normal,
      statusSlug: "in-review",
      categorySlug: "referral",
      assignedEmail: "staff@maplecare.test",
      dueInDays: 1,
      source: Source.customer_portal,
      intakeData: {
        reasonForVisit: "Dermatology referral",
        preferredDate: "2026-06-14",
        symptoms: "Recurring rash on forearms",
        insuranceProvider: "BlueCross",
      },
      comments: ["Provider reviewing previous visit notes."],
    },
    {
      customerEmail: "sofia.martinez@example.com",
      title: "Request for immunization record",
      description: "Patient needs immunization record for school paperwork.",
      priority: Priority.low,
      statusSlug: "scheduled",
      categorySlug: "records-request",
      assignedEmail: "coordinator@maplecare.test",
      dueInDays: 3,
      source: Source.customer_portal,
      intakeData: {
        reasonForVisit: "Immunization record copy",
        preferredDate: "2026-06-15",
        symptoms: "Records request",
        insuranceProvider: "OHIP",
      },
      comments: [],
    },
    {
      customerEmail: "ethan.brooks@example.com",
      title: "Follow-up after blood pressure medication change",
      description: "Patient needs a follow-up call after dosage change.",
      priority: Priority.high,
      statusSlug: "waiting-on-customer",
      categorySlug: "follow-up",
      assignedEmail: "nurse@maplecare.test",
      dueInDays: -3,
      source: Source.staff_created,
      intakeData: {
        reasonForVisit: "Medication follow-up",
        preferredDate: "2026-06-08",
        symptoms: "Occasional dizziness",
        insuranceProvider: "Manulife",
      },
      comments: ["Awaiting home blood pressure readings."],
    },
    {
      customerEmail: "aisha.khan@example.com",
      title: "Same-day appointment request for fever",
      description: "Patient requested quick review for fever and sore throat.",
      priority: Priority.urgent,
      statusSlug: "scheduled",
      categorySlug: "urgent-symptoms",
      assignedEmail: "staff@maplecare.test",
      dueInDays: 0,
      source: Source.customer_portal,
      intakeData: {
        reasonForVisit: "Fever and sore throat",
        preferredDate: "2026-06-12",
        symptoms: "Fever, sore throat, chills",
        insuranceProvider: "SunLife",
      },
      comments: ["Booked same-day virtual appointment."],
    },
    {
      customerEmail: "daniel.kim@example.com",
      title: "Lab results follow-up question",
      description: "Patient has questions after receiving lab results.",
      priority: Priority.normal,
      statusSlug: "new",
      categorySlug: "follow-up",
      assignedEmail: null,
      dueInDays: 5,
      source: Source.customer_portal,
      intakeData: {
        reasonForVisit: "Clarify lab results",
        preferredDate: "2026-06-19",
        symptoms: "No new symptoms",
        insuranceProvider: "BlueCross",
      },
      comments: [],
    },
    {
      customerEmail: "grace.wilson@example.com",
      title: "Billing question about invoice balance",
      description: "Patient sees a balance after insurer payment.",
      priority: Priority.low,
      statusSlug: "in-review",
      categorySlug: "billing-question",
      assignedEmail: "coordinator@maplecare.test",
      dueInDays: 6,
      source: Source.customer_portal,
      intakeData: {
        reasonForVisit: "Invoice balance question",
        preferredDate: "2026-06-20",
        symptoms: "Administrative request",
        insuranceProvider: "GreenShield",
      },
      comments: ["Checking payment posting with billing vendor."],
    },
    {
      customerEmail: "owen.clarke@example.com",
      title: "Prescription refill request",
      description: "Patient needs refill before weekend travel.",
      priority: Priority.high,
      statusSlug: "in-review",
      categorySlug: "follow-up",
      assignedEmail: "nurse@maplecare.test",
      dueInDays: 1,
      source: Source.customer_portal,
      intakeData: {
        reasonForVisit: "Prescription refill",
        preferredDate: "2026-06-13",
        symptoms: "No acute symptoms",
        insuranceProvider: "Manulife",
      },
      comments: ["Medication list sent to provider for approval."],
    },
    {
      customerEmail: "nora.bennett@example.com",
      title: "Closed request for vaccination booking",
      description: "Vaccination appointment was booked and confirmed.",
      priority: Priority.normal,
      statusSlug: "closed",
      categorySlug: "general-appointment",
      assignedEmail: "staff@maplecare.test",
      dueInDays: null,
      closedDaysAgo: 5,
      source: Source.staff_created,
      intakeData: {
        reasonForVisit: "Vaccination booking",
        preferredDate: "2026-06-05",
        symptoms: "Preventive care",
        insuranceProvider: "OHIP",
      },
      comments: ["Appointment confirmed by phone."],
    },
    {
      customerEmail: "hannah.singh@example.com",
      title: "Records needed for travel insurance claim",
      description: "Patient requested visit notes and invoice documentation.",
      priority: Priority.normal,
      statusSlug: "waiting-on-customer",
      categorySlug: "records-request",
      assignedEmail: "coordinator@maplecare.test",
      dueInDays: -1,
      source: Source.customer_portal,
      intakeData: {
        reasonForVisit: "Travel insurance documentation",
        preferredDate: "2026-06-11",
        symptoms: "Records request",
        insuranceProvider: "SunLife",
      },
      comments: ["Waiting for signed release form."],
    },
    {
      customerEmail: "benjamin.ross@example.com",
      title: "Recurring migraine follow-up",
      description: "Patient reports migraines increasing in frequency.",
      priority: Priority.high,
      statusSlug: "scheduled",
      categorySlug: "follow-up",
      assignedEmail: "nurse@maplecare.test",
      dueInDays: 2,
      source: Source.customer_portal,
      intakeData: {
        reasonForVisit: "Migraine follow-up",
        preferredDate: "2026-06-16",
        symptoms: "Migraines three times this week",
        insuranceProvider: "BlueCross",
      },
      comments: ["Appointment scheduled with primary provider."],
    },
    {
      customerEmail: "chloe.adams@example.com",
      title: "New patient prenatal intake",
      description: "Patient requested initial prenatal care visit.",
      priority: Priority.normal,
      statusSlug: "new",
      categorySlug: "general-appointment",
      assignedEmail: null,
      dueInDays: 7,
      source: Source.customer_portal,
      intakeData: {
        reasonForVisit: "Prenatal intake",
        preferredDate: "2026-06-22",
        symptoms: "Early pregnancy care",
        insuranceProvider: "OHIP",
      },
      comments: [],
    },
    {
      customerEmail: "ibrahim.hassan@example.com",
      title: "Urgent asthma flare-up message",
      description: "Patient reports increased inhaler use over two days.",
      priority: Priority.urgent,
      statusSlug: "in-review",
      categorySlug: "urgent-symptoms",
      assignedEmail: "staff@maplecare.test",
      dueInDays: 0,
      source: Source.customer_portal,
      intakeData: {
        reasonForVisit: "Asthma symptoms worsening",
        preferredDate: "2026-06-12",
        symptoms: "Wheezing and increased inhaler use",
        insuranceProvider: "Manulife",
      },
      comments: ["Clinical team reviewing message now."],
    },
    {
      customerEmail: "lily.cooper@example.com",
      title: "Question about specialist appointment notes",
      description: "Patient asks whether specialist notes arrived.",
      priority: Priority.low,
      statusSlug: "closed",
      categorySlug: "records-request",
      assignedEmail: "coordinator@maplecare.test",
      dueInDays: null,
      closedDaysAgo: 1,
      source: Source.customer_portal,
      intakeData: {
        reasonForVisit: "Specialist note status",
        preferredDate: "2026-06-11",
        symptoms: "Records request",
        insuranceProvider: "GreenShield",
      },
      comments: ["Confirmed records received and filed."],
    },
    {
      customerEmail: "marcus.green@example.com",
      title: "Diabetes care plan check-in",
      description: "Patient requested review of blood sugar readings.",
      priority: Priority.normal,
      statusSlug: "scheduled",
      categorySlug: "follow-up",
      assignedEmail: "nurse@maplecare.test",
      dueInDays: 3,
      source: Source.staff_created,
      intakeData: {
        reasonForVisit: "Diabetes care check-in",
        preferredDate: "2026-06-17",
        symptoms: "Morning readings trending high",
        insuranceProvider: "BlueCross",
      },
      comments: ["Readings added to provider review queue."],
    },
    {
      customerEmail: "emily.carter@example.com",
      title: "Request to move appointment time",
      description: "Patient asked to move appointment later in the day.",
      priority: Priority.low,
      statusSlug: "waiting-on-customer",
      categorySlug: "general-appointment",
      assignedEmail: "coordinator@maplecare.test",
      dueInDays: 2,
      source: Source.customer_portal,
      intakeData: {
        reasonForVisit: "Appointment time change",
        preferredDate: "2026-06-18",
        symptoms: "Scheduling request",
        insuranceProvider: "SunLife",
      },
      comments: ["Offered two alternate times by email."],
    },
    {
      customerEmail: "noah.williams@example.com",
      title: "Follow-up after urgent symptom call",
      description: "Team needs to confirm patient received nurse advice.",
      priority: Priority.high,
      statusSlug: "new",
      categorySlug: "urgent-symptoms",
      assignedEmail: null,
      dueInDays: -1,
      source: Source.staff_created,
      intakeData: {
        reasonForVisit: "Confirm symptom follow-up",
        preferredDate: "2026-06-11",
        symptoms: "Chest tightness follow-up",
        insuranceProvider: "Manulife",
      },
      comments: [],
    },
    {
      customerEmail: "mia.thompson@example.com",
      title: "Clarify invoice after appointment",
      description: "Patient is asking about a copay line item.",
      priority: Priority.low,
      statusSlug: "in-review",
      categorySlug: "billing-question",
      assignedEmail: "coordinator@maplecare.test",
      dueInDays: 4,
      source: Source.customer_portal,
      intakeData: {
        reasonForVisit: "Copay clarification",
        preferredDate: "2026-06-19",
        symptoms: "Administrative request",
        insuranceProvider: "GreenShield",
      },
      comments: ["Billing team checking payer response."],
    },
    {
      customerEmail: "lucas.nguyen@example.com",
      title: "Upload photo for rash review",
      description: "Patient will send photo before provider review.",
      priority: Priority.normal,
      statusSlug: "waiting-on-customer",
      categorySlug: "referral",
      assignedEmail: "staff@maplecare.test",
      dueInDays: -2,
      source: Source.customer_portal,
      intakeData: {
        reasonForVisit: "Send photo for rash",
        preferredDate: "2026-06-10",
        symptoms: "Rash photo pending",
        insuranceProvider: "BlueCross",
      },
      comments: ["Waiting for image upload from patient."],
    },
    {
      customerEmail: "sofia.martinez@example.com",
      title: "School medical form completion",
      description: "Form needs physician review before pickup.",
      priority: Priority.normal,
      statusSlug: "in-review",
      categorySlug: "records-request",
      assignedEmail: "coordinator@maplecare.test",
      dueInDays: 2,
      source: Source.staff_created,
      intakeData: {
        reasonForVisit: "School medical form",
        preferredDate: "2026-06-16",
        symptoms: "Documentation request",
        insuranceProvider: "OHIP",
      },
      comments: ["Form scanned and routed to provider."],
    },
    {
      customerEmail: "aisha.khan@example.com",
      title: "Closed flu symptom virtual visit",
      description: "Virtual visit completed and care instructions sent.",
      priority: Priority.high,
      statusSlug: "closed",
      categorySlug: "urgent-symptoms",
      assignedEmail: "staff@maplecare.test",
      dueInDays: null,
      closedDaysAgo: 3,
      source: Source.customer_portal,
      intakeData: {
        reasonForVisit: "Flu-like symptoms",
        preferredDate: "2026-06-09",
        symptoms: "Fever and aches",
        insuranceProvider: "SunLife",
      },
      comments: ["Care instructions sent through portal."],
    },
    {
      customerEmail: "daniel.kim@example.com",
      title: "Book follow-up for cholesterol results",
      description: "Provider requested a non-urgent follow-up visit.",
      priority: Priority.normal,
      statusSlug: "scheduled",
      categorySlug: "follow-up",
      assignedEmail: "staff@maplecare.test",
      dueInDays: 5,
      source: Source.staff_created,
      intakeData: {
        reasonForVisit: "Cholesterol follow-up",
        preferredDate: "2026-06-21",
        symptoms: "Review lab results",
        insuranceProvider: "BlueCross",
      },
      comments: [],
    },
    {
      customerEmail: "grace.wilson@example.com",
      title: "Request payment plan callback",
      description: "Patient asked for a callback to discuss payment options.",
      priority: Priority.low,
      statusSlug: "new",
      categorySlug: "billing-question",
      assignedEmail: null,
      dueInDays: 6,
      source: Source.customer_portal,
      intakeData: {
        reasonForVisit: "Payment plan callback",
        preferredDate: "2026-06-20",
        symptoms: "Administrative request",
        insuranceProvider: "GreenShield",
      },
      comments: [],
    },
    {
      customerEmail: "hannah.singh@example.com",
      title: "Closed records release for insurer",
      description: "Release form received and records package sent.",
      priority: Priority.normal,
      statusSlug: "closed",
      categorySlug: "records-request",
      assignedEmail: "coordinator@maplecare.test",
      dueInDays: null,
      closedDaysAgo: 4,
      source: Source.staff_created,
      intakeData: {
        reasonForVisit: "Records release",
        preferredDate: "2026-06-07",
        symptoms: "Documentation request",
        insuranceProvider: "SunLife",
      },
      comments: ["Records package sent securely."],
    },
    {
      customerEmail: "benjamin.ross@example.com",
      title: "Medication side effect question",
      description: "Patient asks whether nausea is expected with new medication.",
      priority: Priority.high,
      statusSlug: "waiting-on-customer",
      categorySlug: "follow-up",
      assignedEmail: "nurse@maplecare.test",
      dueInDays: 0,
      source: Source.customer_portal,
      intakeData: {
        reasonForVisit: "Medication side effect",
        preferredDate: "2026-06-12",
        symptoms: "Nausea after starting medication",
        insuranceProvider: "BlueCross",
      },
      comments: ["Asked patient to confirm dosage and timing."],
    },
    {
      customerEmail: "chloe.adams@example.com",
      title: "Prenatal records transfer request",
      description: "Patient needs prior clinic records transferred.",
      priority: Priority.normal,
      statusSlug: "in-review",
      categorySlug: "records-request",
      assignedEmail: "coordinator@maplecare.test",
      dueInDays: 4,
      source: Source.customer_portal,
      intakeData: {
        reasonForVisit: "Transfer prior prenatal records",
        preferredDate: "2026-06-18",
        symptoms: "Records transfer",
        insuranceProvider: "OHIP",
      },
      comments: ["Release form sent to patient."],
    },
    {
      customerEmail: "ibrahim.hassan@example.com",
      title: "Asthma action plan document",
      description: "Patient requested updated action plan for workplace.",
      priority: Priority.normal,
      statusSlug: "scheduled",
      categorySlug: "records-request",
      assignedEmail: "staff@maplecare.test",
      dueInDays: 3,
      source: Source.staff_created,
      intakeData: {
        reasonForVisit: "Asthma action plan",
        preferredDate: "2026-06-17",
        symptoms: "Documentation request",
        insuranceProvider: "Manulife",
      },
      comments: [],
    },
    {
      customerEmail: "lily.cooper@example.com",
      title: "Follow-up appointment after specialist visit",
      description: "Patient wants to discuss specialist recommendations.",
      priority: Priority.normal,
      statusSlug: "new",
      categorySlug: "follow-up",
      assignedEmail: null,
      dueInDays: 8,
      source: Source.customer_portal,
      intakeData: {
        reasonForVisit: "Discuss specialist recommendations",
        preferredDate: "2026-06-24",
        symptoms: "Follow-up discussion",
        insuranceProvider: "GreenShield",
      },
      comments: [],
    },
    {
      customerEmail: "marcus.green@example.com",
      title: "Urgent high glucose readings",
      description: "Patient reports several high readings over 48 hours.",
      priority: Priority.urgent,
      statusSlug: "in-review",
      categorySlug: "urgent-symptoms",
      assignedEmail: "nurse@maplecare.test",
      dueInDays: 0,
      source: Source.customer_portal,
      intakeData: {
        reasonForVisit: "High glucose readings",
        preferredDate: "2026-06-12",
        symptoms: "Repeated high readings and fatigue",
        insuranceProvider: "BlueCross",
      },
      comments: ["Nurse reviewing readings before provider escalation."],
    },
  ];

  for (const [index, caseDefinition] of caseDefinitions.entries()) {
    const customer = customerByEmail.get(caseDefinition.customerEmail);
    const status = statusBySlug.get(caseDefinition.statusSlug);
    const category = categoryBySlug.get(caseDefinition.categorySlug);
    const assignedUser = caseDefinition.assignedEmail
      ? userByEmail.get(caseDefinition.assignedEmail)
      : null;

    if (!customer || !status || !category) {
      throw new Error(`Invalid seed case reference at index ${index}`);
    }

    const createdCase = await prisma.case.create({
      data: {
        organizationId: organization.id,
        customerId: customer.id,
        assignedUserId: assignedUser?.id,
        categoryId: category.id,
        statusId: status.id,
        title: caseDefinition.title,
        description: caseDefinition.description,
        priority: caseDefinition.priority,
        source: caseDefinition.source,
        intakeData: caseDefinition.intakeData,
        dueAt:
          caseDefinition.dueInDays === null
            ? null
            : daysFromNow(caseDefinition.dueInDays),
        closedAt:
          caseDefinition.closedDaysAgo === undefined
            ? null
            : daysFromNow(-caseDefinition.closedDaysAgo),
        createdAt: daysFromNow(-Math.min(index + 1, 28)),
      },
    });

    const actorUser =
      assignedUser ??
      userByEmail.get("admin@maplecare.test") ??
      userByEmail.get("owner@maplecare.test");

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
        createdAt: daysFromNow(-Math.min(index + 1, 28)),
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

    if (caseDefinition.statusSlug !== "new") {
      await prisma.caseActivityEvent.create({
        data: {
          organizationId: organization.id,
          caseId: createdCase.id,
          actorUserId: actorUser?.id,
          eventType: "case.status_changed",
          metadata: {
            fromStatusId: statusBySlug.get("new")?.id,
            fromStatusName: "New",
            toStatusId: status.id,
            toStatusName: status.name,
          },
          createdAt: daysFromNow(-Math.min(index, 20)),
        },
      });
    }

    for (const [commentIndex, body] of caseDefinition.comments.entries()) {
      await prisma.caseComment.create({
        data: {
          organizationId: organization.id,
          caseId: createdCase.id,
          authorUserId: actorUser?.id,
          visibility: Visibility.internal,
          body,
          createdAt: daysFromNow(-Math.max(1, commentIndex + 1)),
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
          createdAt: daysFromNow(-Math.max(1, commentIndex + 1)),
        },
      });
    }
  }

  console.log("Seed data created.");
  console.log(
    "Demo login password: Password123! for owner/admin/staff users.",
  );
  console.log(
    "Viewer user not seeded because the current Prisma Role enum has no viewer value.",
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
