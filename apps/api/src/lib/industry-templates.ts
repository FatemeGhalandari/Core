import { IntakeFieldType } from "../generated/prisma/index.js";

export type IndustryTemplateIntakeField = {
  key: string;
  label: string;
  fieldType: IntakeFieldType;
  placeholder?: string;
  helpText?: string;
  options?: string[];
  isRequired: boolean;
  showOnCaseDetail: boolean;
};

export type IndustryTemplate = {
  key: string;
  name: string;
  appName: string;
  caseLabel: string;
  customerLabel: string;
  defaultStatuses: string[];
  defaultCategories: string[];
  defaultIntakeFields: IndustryTemplateIntakeField[];
};

export const industryTemplates: IndustryTemplate[] = [
  {
    key: "general",
    name: "General Operations",
    appName: "Core",
    caseLabel: "Case",
    customerLabel: "Customer",
    defaultStatuses: ["New", "In Progress", "Waiting on Customer", "Closed"],
    defaultCategories: ["General", "Review", "Follow-up"],
    defaultIntakeFields: [
      {
        key: "requestSummary",
        label: "Request summary",
        fieldType: IntakeFieldType.textarea,
        placeholder: "Summarize what needs to be handled",
        isRequired: true,
        showOnCaseDetail: true,
      },
      {
        key: "requestType",
        label: "Request type",
        fieldType: IntakeFieldType.select,
        options: ["Question", "Service request", "Issue", "Review"],
        isRequired: false,
        showOnCaseDetail: true,
      },
      {
        key: "preferredContactMethod",
        label: "Preferred contact method",
        fieldType: IntakeFieldType.select,
        options: ["Email", "Phone", "Text"],
        isRequired: false,
        showOnCaseDetail: true,
      },
      {
        key: "neededBy",
        label: "Needed by",
        fieldType: IntakeFieldType.date,
        isRequired: false,
        showOnCaseDetail: true,
      },
    ],
  },
  {
    key: "clinic",
    name: "Clinic",
    appName: "Core Clinic",
    caseLabel: "Request",
    customerLabel: "Patient",
    defaultStatuses: [
      "New",
      "Triage",
      "Scheduled",
      "Waiting on Patient",
      "Closed",
    ],
    defaultCategories: ["Intake", "Appointment", "Billing", "Records"],
    defaultIntakeFields: [
      {
        key: "reasonForRequest",
        label: "Reason for request",
        fieldType: IntakeFieldType.textarea,
        placeholder: "Describe the request or concern",
        isRequired: true,
        showOnCaseDetail: true,
      },
      {
        key: "preferredDate",
        label: "Preferred date",
        fieldType: IntakeFieldType.date,
        isRequired: false,
        showOnCaseDetail: true,
      },
      {
        key: "preferredTime",
        label: "Preferred time",
        fieldType: IntakeFieldType.select,
        options: ["Morning", "Afternoon", "Evening", "Any time"],
        isRequired: false,
        showOnCaseDetail: true,
      },
      {
        key: "coverageProvider",
        label: "Coverage provider",
        fieldType: IntakeFieldType.text,
        placeholder: "Provider or plan name",
        isRequired: false,
        showOnCaseDetail: true,
      },
    ],
  },
  {
    key: "real_estate",
    name: "Real Estate",
    appName: "Core Realty",
    caseLabel: "Inquiry",
    customerLabel: "Client",
    defaultStatuses: [
      "New Lead",
      "Qualified",
      "Viewing Scheduled",
      "Offer",
      "Closed",
    ],
    defaultCategories: [
      "Buyer Lead",
      "Seller Lead",
      "Viewing",
      "Property Inquiry",
    ],
    defaultIntakeFields: [
      {
        key: "propertyType",
        label: "Property type",
        fieldType: IntakeFieldType.select,
        options: [
          "Condo",
          "Townhouse",
          "Detached",
          "Semi-detached",
          "Commercial",
        ],
        isRequired: true,
        showOnCaseDetail: true,
      },
      {
        key: "budgetRange",
        label: "Budget range",
        fieldType: IntakeFieldType.text,
        placeholder: "$700k - $900k",
        isRequired: false,
        showOnCaseDetail: true,
      },
      {
        key: "preferredArea",
        label: "Preferred area",
        fieldType: IntakeFieldType.text,
        placeholder: "Downtown Toronto, North York, Mississauga",
        isRequired: false,
        showOnCaseDetail: true,
      },
      {
        key: "timeline",
        label: "Timeline",
        fieldType: IntakeFieldType.select,
        options: ["Immediately", "1-3 months", "3-6 months", "6+ months"],
        isRequired: false,
        showOnCaseDetail: true,
      },
      {
        key: "financingStatus",
        label: "Financing status",
        fieldType: IntakeFieldType.select,
        options: ["Not started", "Pre-qualified", "Pre-approved", "Cash buyer"],
        isRequired: false,
        showOnCaseDetail: true,
      },
    ],
  },
  {
    key: "finance",
    name: "Finance",
    appName: "Core Finance",
    caseLabel: "Application",
    customerLabel: "Customer",
    defaultStatuses: [
      "Submitted",
      "Under Review",
      "Needs Information",
      "Approved",
      "Closed",
    ],
    defaultCategories: [
      "Application",
      "Dispute",
      "Transaction Review",
      "Document Request",
    ],
    defaultIntakeFields: [
      {
        key: "applicationType",
        label: "Application type",
        fieldType: IntakeFieldType.select,
        options: ["New application", "Review", "Dispute", "Document request"],
        isRequired: true,
        showOnCaseDetail: true,
      },
      {
        key: "requestedAmount",
        label: "Requested amount",
        fieldType: IntakeFieldType.text,
        placeholder: "$25,000",
        isRequired: false,
        showOnCaseDetail: true,
      },
      {
        key: "incomeRange",
        label: "Income range",
        fieldType: IntakeFieldType.select,
        options: ["Under $50k", "$50k - $100k", "$100k - $150k", "$150k+"],
        isRequired: false,
        showOnCaseDetail: true,
      },
      {
        key: "supportingDetails",
        label: "Supporting details",
        fieldType: IntakeFieldType.textarea,
        placeholder: "Add context, reference numbers, or special conditions",
        isRequired: false,
        showOnCaseDetail: true,
      },
    ],
  },
  {
    key: "insurance",
    name: "Insurance",
    appName: "Core Insurance",
    caseLabel: "Claim",
    customerLabel: "Policyholder",
    defaultStatuses: [
      "Filed",
      "Assessing",
      "Waiting on Documents",
      "Decision",
      "Closed",
    ],
    defaultCategories: ["Claim", "Quote", "Policy Change", "Document Review"],
    defaultIntakeFields: [
      {
        key: "policyOrAccountNumber",
        label: "Policy or account number",
        fieldType: IntakeFieldType.text,
        placeholder: "Optional reference number",
        isRequired: false,
        showOnCaseDetail: true,
      },
      {
        key: "requestType",
        label: "Request type",
        fieldType: IntakeFieldType.select,
        options: ["Claim", "Quote", "Policy change", "Document review"],
        isRequired: true,
        showOnCaseDetail: true,
      },
      {
        key: "incidentDate",
        label: "Incident date",
        fieldType: IntakeFieldType.date,
        isRequired: false,
        showOnCaseDetail: true,
      },
      {
        key: "incidentSummary",
        label: "Incident summary",
        fieldType: IntakeFieldType.textarea,
        placeholder: "Describe what happened or what needs review",
        isRequired: false,
        showOnCaseDetail: true,
      },
    ],
  },
  {
    key: "sales",
    name: "Sales",
    appName: "Core Sales",
    caseLabel: "Deal",
    customerLabel: "Lead",
    defaultStatuses: [
      "New Lead",
      "Contacted",
      "Qualified",
      "Proposal",
      "Closed",
    ],
    defaultCategories: [
      "Inbound Lead",
      "Outbound Lead",
      "Renewal",
      "Expansion",
    ],
    defaultIntakeFields: [
      {
        key: "companyName",
        label: "Company name",
        fieldType: IntakeFieldType.text,
        placeholder: "Acme Co.",
        isRequired: false,
        showOnCaseDetail: true,
      },
      {
        key: "dealInterest",
        label: "Deal interest",
        fieldType: IntakeFieldType.select,
        options: ["New purchase", "Renewal", "Expansion", "Partnership"],
        isRequired: true,
        showOnCaseDetail: true,
      },
      {
        key: "estimatedValue",
        label: "Estimated value",
        fieldType: IntakeFieldType.text,
        placeholder: "$10,000 - $25,000",
        isRequired: false,
        showOnCaseDetail: true,
      },
      {
        key: "decisionTimeline",
        label: "Decision timeline",
        fieldType: IntakeFieldType.select,
        options: ["This month", "This quarter", "Next quarter", "Unknown"],
        isRequired: false,
        showOnCaseDetail: true,
      },
    ],
  },
  {
    key: "local_business",
    name: "Local Business",
    appName: "Core Local",
    caseLabel: "Booking",
    customerLabel: "Customer",
    defaultStatuses: [
      "Requested",
      "Confirmed",
      "In Progress",
      "Waiting on Customer",
      "Closed",
    ],
    defaultCategories: ["Booking", "Service Request", "Quote", "Follow-up"],
    defaultIntakeFields: [
      {
        key: "serviceNeeded",
        label: "Service needed",
        fieldType: IntakeFieldType.text,
        placeholder: "Describe the service or booking request",
        isRequired: true,
        showOnCaseDetail: true,
      },
      {
        key: "preferredDate",
        label: "Preferred date",
        fieldType: IntakeFieldType.date,
        isRequired: false,
        showOnCaseDetail: true,
      },
      {
        key: "serviceLocation",
        label: "Service location",
        fieldType: IntakeFieldType.text,
        placeholder: "Address, branch, or virtual",
        isRequired: false,
        showOnCaseDetail: true,
      },
      {
        key: "budgetRange",
        label: "Budget range",
        fieldType: IntakeFieldType.text,
        placeholder: "$500 - $1,000",
        isRequired: false,
        showOnCaseDetail: true,
      },
    ],
  },
];
