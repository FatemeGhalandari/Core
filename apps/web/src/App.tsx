import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useState, useMemo, useEffect } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  NavLink,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom";
import { api } from "./lib/api";
import "./App.css";
import { NewCaseForm } from "./features/cases/NewCaseForm";

type CaseListItem = {
  id: string;
  title: string;
  description: string | null;
  priority: "low" | "normal" | "high" | "urgent";
  source: string;
  dueAt: string | null;
  closedAt: string | null;
  createdAt: string;
  updatedAt: string;
  customer: {
    id: string;
    name: string;
    email: string | null;
  };
  assignedUser: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
  category: {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
  } | null;
  status: {
    id: string;
    name: string;
    slug: string;
    color: string | null;
    isClosed: boolean;
  };
  commentCount: number;
  attachmentCount: number;
};

type CaseDetail = CaseListItem & {
  intakeData: Record<string, unknown>;
  customer: {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    externalReference: string | null;
  };
  comments: {
    id: string;
    body: string;
    visibility: "public" | "internal";
    createdAt: string;
    authorUser: {
      id: string;
      name: string;
      role: string;
    } | null;
    authorCustomer: {
      id: string;
      name: string;
    } | null;
  }[];
  activityEvents: {
    id: string;
    eventType: string;
    metadata: Record<string, unknown>;
    createdAt: string;
    actorUser: {
      id: string;
      name: string;
      role: string;
    } | null;
    actorCustomer: {
      id: string;
      name: string;
    } | null;
  }[];
};

type CasesResponse = {
  data: CaseListItem[];
};

type CaseDetailResponse = {
  data: CaseDetail;
};

type CustomerListItem = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  externalReference: string | null;
  createdAt: string;
  updatedAt: string;
  caseCount: number;
  recentCases: {
    id: string;
    title: string;
    priority: "low" | "normal" | "high" | "urgent";
    updatedAt: string;
    status: {
      id: string;
      name: string;
      slug: string;
      color: string | null;
      isClosed: boolean;
    };
  }[];
};

type CustomersResponse = {
  data: CustomerListItem[];
};

type CustomerCaseItem = Omit<CaseListItem, "customer">;

type CustomerDetail = Omit<CustomerListItem, "caseCount" | "recentCases"> & {
  cases: CustomerCaseItem[];
};

type CustomerDetailResponse = {
  data: CustomerDetail;
};

type WorkflowStatusSetting = {
  id: string;
  name: string;
  slug: string;
  color: string | null;
  sortOrder: number;
  isDefault: boolean;
  isClosed: boolean;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
};

type WorkflowStatusesResponse = {
  data: WorkflowStatusSetting[];
};

type CreateWorkflowStatusInput = {
  name: string;
  color: string;
  isDefault: boolean;
  isClosed: boolean;
};

type UpdateWorkflowStatusInput = {
  id: string;
  name: string;
  color: string;
  sortOrder: number;
  isDefault: boolean;
  isClosed: boolean;
};

type WorkflowStatusEditForm = {
  id: string;
  name: string;
  color: string;
  sortOrder: string;
  isDefault: boolean;
  isClosed: boolean;
};

type CaseCategorySetting = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
};

type CaseCategoriesResponse = {
  data: CaseCategorySetting[];
};

type CreateCaseCategoryInput = {
  name: string;
  description: string | null;
};

type UpdateCaseCategoryInput = CreateCaseCategoryInput & {
  id: string;
};

type CaseCategoryEditForm = {
  id: string;
  name: string;
  description: string;
};

type AssignableUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AssignableUsersResponse = {
  data: AssignableUser[];
};

type TeamMemberSetting = AssignableUser & {
  openAssignedCaseCount: number;
};

type TeamMembersResponse = {
  data: TeamMemberSetting[];
};

type IndustryTemplate = {
  key: string;
  name: string;
  appName: string;
  caseLabel: string;
  customerLabel: string;
  defaultStatuses: string[];
  defaultCategories: string[];
};

type IndustryTemplatesResponse = {
  data: IndustryTemplate[];
};

type WorkspaceProfile = {
  id: string;
  name: string;
  slug: string;
  industry: string;
  appName: string | null;
  caseLabel: string | null;
  customerLabel: string | null;
  industryTemplateKey: string | null;
};

type WorkspaceProfileResponse = {
  data: WorkspaceProfile;
};

type UpdateWorkspaceProfileInput = {
  appName: string;
  caseLabel: string;
  customerLabel: string;
  industryTemplateKey: string | null;
};

type WorkspaceProfileForm = {
  appName: string;
  caseLabel: string;
  customerLabel: string;
  industryTemplateKey: string;
};

type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: AppRole;
  organizationId: string;
};

type AppRole = "owner" | "admin" | "staff" | "viewer";

type LoginResponse = {
  data: {
    user: AuthUser;
  };
};

type AuthContextValue = {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
};

type IntakeFieldType =
  | "text"
  | "textarea"
  | "email"
  | "phone"
  | "number"
  | "date"
  | "select"
  | "multiselect"
  | "checkbox";

type IntakeFieldSetting = {
  id: string;
  key: string;
  label: string;
  fieldType: IntakeFieldType;
  placeholder: string | null;
  helpText: string | null;
  options: unknown;
  isRequired: boolean;
  showOnCaseDetail?: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

type IntakeFieldsResponse = {
  data: IntakeFieldSetting[];
};

type CreateIntakeFieldInput = {
  label: string;
  fieldType: IntakeFieldType;
  isRequired: boolean;
  showOnCaseDetail: boolean;
  isActive: boolean;
};

type UpdateIntakeFieldInput = Omit<CreateIntakeFieldInput, "isActive"> & {
  id: string;
  sortOrder: number;
  isActive: boolean;
};

type IntakeFieldCreateForm = CreateIntakeFieldInput;

type IntakeFieldEditForm = {
  id: string;
  label: string;
  fieldType: IntakeFieldType;
  sortOrder: string;
  isRequired: boolean;
  showOnCaseDetail: boolean;
  isActive: boolean;
};

type ReportBreakdownItem = {
  label: string;
  count: number;
};

type ReportBreakdownData = ReportBreakdownItem[] | Record<string, number>;

type OperationsReport = {
  metrics: {
    totalCases: number;
    openCases: number;
    closedCases: number;
    overdueCases: number;
    averageOpenAge: number;
  };
  summary: {
    closedRate: number;
    highPriorityShare: number;
    unassignedShare: number;
    customerCount: number;
    customersWithOpenCases: number;
  };
  attention: {
    waitingCases: number;
    highPriorityCases: number;
    unassignedCases: number;
    overdueCases: number;
  };
  statusCounts?: ReportBreakdownItem[];
  categoryCounts?: ReportBreakdownItem[];
  priorityCounts?: ReportBreakdownItem[];
  sourceCounts?: ReportBreakdownItem[];
  ownerWorkload?: ReportBreakdownItem[];
  breakdowns?: {
    status?: Record<string, number>;
    category?: Record<string, number>;
    priority?: Record<string, number>;
    source?: Record<string, number>;
    owner?: Record<string, number>;
  };
  agingBuckets: ReportBreakdownItem[];
  recentlyClosedCases: {
    id: string;
    title: string;
    updatedAt: string;
    customer: {
      id: string;
      name: string;
    };
    status: {
      id: string;
      name: string;
      slug: string;
    };
  }[];
};

type OperationsReportResponse = {
  data: OperationsReport;
};

const PRIORITY_OPTIONS = [
  { label: "Low", value: "low" },
  { label: "Normal", value: "normal" },
  { label: "High", value: "high" },
  { label: "Urgent", value: "urgent" },
];

const SORT_OPTIONS = [
  { label: "Recently updated", value: "updated" },
  { label: "Newest created", value: "newest" },
  { label: "Oldest created", value: "oldest" },
  { label: "Priority", value: "priority" },
] as const;

const INTAKE_FIELD_TYPE_OPTIONS: { label: string; value: IntakeFieldType }[] = [
  { label: "Text", value: "text" },
  { label: "Long text", value: "textarea" },
  { label: "Email", value: "email" },
  { label: "Phone", value: "phone" },
  { label: "Number", value: "number" },
  { label: "Date", value: "date" },
  { label: "Single select", value: "select" },
  { label: "Multi select", value: "multiselect" },
  { label: "Checkbox", value: "checkbox" },
];

type CaseSortOption = (typeof SORT_OPTIONS)[number]["value"];

type CaseListFilters = {
  search: string;
  statusSlug: string;
  priority: string;
  categorySlug: string;
  assignedUserId: string;
  sort: CaseSortOption;
};

const DASHBOARD_CASE_FILTERS: CaseListFilters = {
  search: "",
  statusSlug: "",
  priority: "",
  categorySlug: "",
  assignedUserId: "",
  sort: "updated",
};

const AUTH_STORAGE_KEY = "core.auth.user";

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredAuthUser() {
  const storedUser = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as AuthUser;
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used inside AuthContext.Provider");
  }

  return auth;
}

function canManageSettings(role: AppRole) {
  return role === "owner" || role === "admin";
}

function canWorkCases(role: AppRole) {
  return role === "owner" || role === "admin" || role === "staff";
}

function canViewReports(role: AppRole) {
  return (
    role === "owner" ||
    role === "admin" ||
    role === "staff" ||
    role === "viewer"
  );
}

async function fetchCases(filters?: Partial<CaseListFilters>) {
  const response = await api.get<CasesResponse>("/api/cases", {
    params: {
      search: filters?.search || undefined,
      statusSlug: filters?.statusSlug || undefined,
      priority: filters?.priority || undefined,
      categorySlug: filters?.categorySlug || undefined,
      sort: filters?.sort || undefined,
      assignedUserId: filters?.assignedUserId || undefined,
    },
  });

  return response.data.data;
}

async function fetchCase(caseId: string) {
  const response = await api.get<CaseDetailResponse>(`/api/cases/${caseId}`);
  return response.data.data;
}

async function fetchCustomers(search: string) {
  const response = await api.get<CustomersResponse>("/api/customers", {
    params: {
      search: search || undefined,
    },
  });

  return response.data.data;
}

async function fetchCustomer(customerId: string) {
  const response = await api.get<CustomerDetailResponse>(
    `/api/customers/${customerId}`,
  );

  return response.data.data;
}

async function fetchWorkflowStatuses() {
  const response = await api.get<WorkflowStatusesResponse>(
    "/api/settings/workflow-statuses",
  );

  return response.data.data;
}

async function createWorkflowStatus(data: CreateWorkflowStatusInput) {
  const response = await api.post<{ data: WorkflowStatusSetting }>(
    "/api/settings/workflow-statuses",
    data,
  );

  return response.data.data;
}

async function updateWorkflowStatus({
  id,
  ...data
}: UpdateWorkflowStatusInput) {
  const response = await api.patch<{ data: WorkflowStatusSetting }>(
    `/api/settings/workflow-statuses/${id}`,
    data,
  );

  return response.data.data;
}

async function fetchCaseCategories() {
  const response = await api.get<CaseCategoriesResponse>(
    "/api/settings/case-categories",
  );

  return response.data.data;
}

async function createCaseCategory(data: CreateCaseCategoryInput) {
  const response = await api.post<{ data: CaseCategorySetting }>(
    "/api/settings/case-categories",
    data,
  );

  return response.data.data;
}

async function updateCaseCategory({ id, ...data }: UpdateCaseCategoryInput) {
  const response = await api.patch<{ data: CaseCategorySetting }>(
    `/api/settings/case-categories/${id}`,
    data,
  );

  return response.data.data;
}

async function fetchAssignableUsers() {
  const response = await api.get<AssignableUsersResponse>(
    "/api/settings/users",
  );

  return response.data.data;
}

async function fetchTeamMembers() {
  const response = await api.get<TeamMembersResponse>(
    "/api/settings/team-members",
  );

  return response.data.data;
}

async function fetchIndustryTemplates() {
  const response = await api.get<IndustryTemplatesResponse>(
    "/api/settings/industry-templates",
  );

  return response.data.data;
}

async function fetchWorkspaceProfile() {
  const response = await api.get<WorkspaceProfileResponse>(
    "/api/settings/workspace",
  );

  return response.data.data;
}

async function updateWorkspaceProfile(data: UpdateWorkspaceProfileInput) {
  const response = await api.patch<WorkspaceProfileResponse>(
    "/api/settings/workspace",
    data,
  );

  return response.data.data;
}

async function loginUser(data: { email: string; password: string }) {
  const response = await api.post<LoginResponse>("/api/auth/login", data);

  return response.data.data.user;
}

async function fetchIntakeFields() {
  const response = await api.get<IntakeFieldsResponse>(
    "/api/settings/intake-fields",
  );

  return response.data.data;
}

async function createIntakeField(data: CreateIntakeFieldInput) {
  const response = await api.post<{ data: IntakeFieldSetting }>(
    "/api/settings/intake-fields",
    data,
  );

  return response.data.data;
}

async function updateIntakeField({ id, ...data }: UpdateIntakeFieldInput) {
  const response = await api.patch<{ data: IntakeFieldSetting }>(
    `/api/settings/intake-fields/${id}`,
    data,
  );

  return response.data.data;
}

async function fetchOperationsReport() {
  const response = await api.get<OperationsReportResponse>(
    "/api/reports/operations",
  );

  return response.data.data;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function getAgeInDays(value: string) {
  const createdAt = new Date(value).getTime();
  const now = Date.now();
  const dayInMs = 1000 * 60 * 60 * 24;

  return Math.max(0, Math.floor((now - createdAt) / dayInMs));
}

function getCaseAgeLabel(value: string) {
  const ageInDays = getAgeInDays(value);

  if (ageInDays === 0) return "Opened today";
  if (ageInDays === 1) return "Open 1 day";

  return `Open ${ageInDays} days`;
}

function getDueLabel(value: string | null) {
  if (!value) return "No due date";

  const dueAt = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(dueAt);
  dueDate.setHours(0, 0, 0, 0);

  const dayInMs = 1000 * 60 * 60 * 24;
  const daysUntilDue = Math.round(
    (dueDate.getTime() - today.getTime()) / dayInMs,
  );

  if (daysUntilDue < 0) return `${Math.abs(daysUntilDue)} days overdue`;
  if (daysUntilDue === 0) return "Due today";
  if (daysUntilDue === 1) return "Due tomorrow";

  return `Due in ${daysUntilDue} days`;
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatFieldLabel(value: string) {
  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function pluralizeLabel(value: string) {
  if (value.endsWith("y")) {
    return `${value.slice(0, -1)}ies`;
  }

  if (value.endsWith("s")) {
    return value;
  }

  return `${value}s`;
}

function getWorkspaceLabels(workspaceProfile: WorkspaceProfile | undefined) {
  const appName = workspaceProfile?.appName ?? "Core";
  const caseLabel = workspaceProfile?.caseLabel ?? "Case";
  const customerLabel = workspaceProfile?.customerLabel ?? "Customer";

  return {
    appName,
    caseLabel,
    caseLabelPlural: pluralizeLabel(caseLabel),
    customerLabel,
    customerLabelPlural: pluralizeLabel(customerLabel),
  };
}

function useWorkspaceLabels() {
  const { data: workspaceProfile } = useQuery({
    queryKey: ["settings", "workspace"],
    queryFn: fetchWorkspaceProfile,
  });

  return getWorkspaceLabels(workspaceProfile);
}

function getWorkflowStatusSelectOptions(
  statuses: WorkflowStatusSetting[],
  selectedStatus?: { slug: string; name: string } | null,
) {
  const activeOptions = statuses
    .filter((status) => status.isActive !== false)
    .map((status) => ({
      label: status.name,
      value: status.slug,
    }));

  if (
    !selectedStatus?.slug ||
    activeOptions.some((option) => option.value === selectedStatus.slug)
  ) {
    return activeOptions;
  }

  const existingStatus = statuses.find(
    (status) => status.slug === selectedStatus.slug,
  );

  return [
    ...activeOptions,
    {
      label: existingStatus?.name ?? selectedStatus.name,
      value: selectedStatus.slug,
    },
  ];
}

function formatSource(value: string | null | undefined) {
  if (!value) return "Unknown";

  return value
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatValue(value: unknown) {
  if (value === null || value === undefined || value === "") {
    return "None";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unknown error";
}

function LoadingState({ message }: { message: string }) {
  return (
    <div className="state-card state-card-centered">
      <span className="state-kicker">Loading</span>
      <h2>{message}</h2>
      <p>Getting the latest workspace data.</p>
    </div>
  );
}

function ErrorState({
  title,
  message,
  error,
  action,
}: {
  title: string;
  message: string;
  error?: unknown;
  action?: React.ReactNode;
}) {
  return (
    <div className="state-card error state-card-centered">
      <span className="state-kicker">Needs attention</span>
      <h2>{title}</h2>
      <p>{message}</p>
      {error ? <pre>{getErrorMessage(error)}</pre> : null}
      {action}
    </div>
  );
}

function EmptyState({
  title,
  message,
  action,
}: {
  title: string;
  message: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="state-card empty-state state-card-centered">
      <span className="state-kicker">Nothing here yet</span>
      <h2>{title}</h2>
      <p>{message}</p>
      {action ? <div className="empty-actions">{action}</div> : null}
    </div>
  );
}

function getActivityMessage(event: {
  eventType: string;
  metadata: Record<string, unknown>;
}) {
  if (event.eventType === "case.status_changed") {
    const fromStatusName = event.metadata.fromStatusName;
    const toStatusName = event.metadata.toStatusName;

    if (
      typeof fromStatusName === "string" &&
      typeof toStatusName === "string"
    ) {
      return `Status changed from ${fromStatusName} to ${toStatusName}`;
    }

    return "Status changed";
  }

  if (event.eventType === "case.comment_added") {
    return "Internal comment added";
  }

  if (event.eventType === "case.created") {
    return "Case created";
  }

  if (event.eventType === "case.assigned") {
    const assignedTo = event.metadata.toAssigneeName;
    const assignedFrom = event.metadata.fromAssigneeName;

    if (typeof assignedTo === "string") {
      if (typeof assignedFrom === "string") {
        return `Reassigned from ${assignedFrom} to ${assignedTo}`;
      }

      return `Assigned to ${assignedTo}`;
    }

    if (typeof assignedFrom === "string") {
      return `Unassigned from ${assignedFrom}`;
    }

    return "Assignment changed";
  }

  return formatFieldLabel(event.eventType);
}

function AppShell({ children }: { children: React.ReactNode }) {
  const { appName, caseLabelPlural, customerLabelPlural } =
    useWorkspaceLabels();
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">{appName.charAt(0).toUpperCase()}</div>
          <div>
            <div className="brand-name">{appName}</div>
            <div className="brand-subtitle">Workflow Platform</div>
          </div>
        </div>

        <nav className="nav">
          {user && canWorkCases(user.role) && (
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
              to="/"
            >
              {caseLabelPlural}
            </NavLink>
          )}

          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
            to="/customers"
          >
            {customerLabelPlural}
          </NavLink>

          {user && canViewReports(user.role) && (
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
              to="/reports"
            >
              Reports
            </NavLink>
          )}

          {user && canManageSettings(user.role) && (
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
              to="/settings"
            >
              Settings
            </NavLink>
          )}
        </nav>

        <div className="sidebar-auth">
          {user ? (
            <>
              <div>
                <span>Signed in as</span>
                <strong>{user.name}</strong>
                <small>{formatFieldLabel(user.role)}</small>
              </div>
              <button className="secondary-button compact" type="button" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <Link className="secondary-button compact" to="/login">
              Login
            </Link>
          )}
        </div>
      </aside>

      <main className="main">{children}</main>
    </div>
  );
}

function DashboardMetricCard({
  label,
  value,
  description,
}: {
  label: string;
  value: number;
  description: string;
}) {
  return (
    <div className="dashboard-metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{description}</p>
    </div>
  );
}

function DashboardListCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="dashboard-list-card">
      <div className="panel-header">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>

      {children}
    </section>
  );
}

function DashboardPage() {
  const { caseLabel, caseLabelPlural, customerLabel } = useWorkspaceLabels();
  const {
    data: cases = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cases", "dashboard"],
    queryFn: () => fetchCases(DASHBOARD_CASE_FILTERS),
  });

  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);

  const openCases = cases.filter((caseItem) => !caseItem.status.isClosed);
  const closedCases = cases.filter((caseItem) => caseItem.status.isClosed);
  const highPriorityCases = cases.filter(
    (caseItem) =>
      caseItem.priority === "high" || caseItem.priority === "urgent",
  );
  const unassignedCases = cases.filter((caseItem) => !caseItem.assignedUser);
  const newThisWeekCases = cases.filter(
    (caseItem) => new Date(caseItem.createdAt) >= sevenDaysAgo,
  );
  const waitingCases = cases.filter(
    (caseItem) => caseItem.status.slug === "waiting-on-customer",
  );

  const recentlyUpdatedCases = [...cases]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    .slice(0, 5);

  const statusCounts = cases.reduce<Record<string, number>>(
    (result, caseItem) => {
      const statusName = caseItem.status.name;
      result[statusName] = (result[statusName] ?? 0) + 1;
      return result;
    },
    {},
  );

  const categoryCounts = cases.reduce<Record<string, number>>(
    (result, caseItem) => {
      const categoryName =
        "category" in caseItem && caseItem.category?.name
          ? caseItem.category.name
          : "Uncategorized";
      result[categoryName] = (result[categoryName] ?? 0) + 1;
      return result;
    },
    {},
  );

  if (isLoading) {
    return (
      <AppShell>
        <LoadingState message="Loading dashboard" />
      </AppShell>
    );
  }

  if (isError) {
    return (
      <AppShell>
        <ErrorState
          title="Dashboard unavailable"
          message="We could not load the latest operations snapshot. Try refreshing the page."
          error={error}
        />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <header className="page-header">
        <div>
          <p className="eyebrow">Operations</p>
          <h1>Dashboard</h1>
          <p className="page-description">
            Monitor workload, priority issues, workflow bottlenecks, and recent
            {` ${caseLabel.toLowerCase()} activity across the workspace.`}
          </p>
        </div>

        <div className="page-actions">
          <Link className="secondary-button" to="/reports">
            View Reports
          </Link>

          <Link className="primary-button" to="/">
            Open {caseLabel} Inbox
          </Link>
        </div>
      </header>

      <section className="dashboard-metrics-grid">
        <DashboardMetricCard
          label={`Open ${caseLabelPlural.toLowerCase()}`}
          value={openCases.length}
          description="Active work still moving through the workflow."
        />

        <DashboardMetricCard
          label="High priority"
          value={highPriorityCases.length}
          description={`${caseLabelPlural} marked high or urgent.`}
        />

        <DashboardMetricCard
          label="New this week"
          value={newThisWeekCases.length}
          description={`${caseLabelPlural} created in the last 7 days.`}
        />

        <DashboardMetricCard
          label="Unassigned"
          value={unassignedCases.length}
          description={`${caseLabelPlural} without an internal owner.`}
        />
      </section>

      <section className="dashboard-secondary-grid">
        <DashboardListCard
          title="Workflow Status"
          description={`Current ${caseLabel.toLowerCase()} distribution by workflow stage.`}
        >
          {Object.entries(statusCounts).length === 0 ? (
            <div className="soft-empty">No status data available.</div>
          ) : (
            <div className="dashboard-breakdown">
              {Object.entries(statusCounts).map(([statusName, count]) => (
                <div className="dashboard-breakdown-row" key={statusName}>
                  <span>{statusName}</span>
                  <strong>{count}</strong>
                </div>
              ))}
            </div>
          )}
        </DashboardListCard>

        <DashboardListCard
          title={`${caseLabel} Categories`}
          description="Workload grouped by operational category."
        >
          {Object.entries(categoryCounts).length === 0 ? (
            <div className="soft-empty">No category data available.</div>
          ) : (
            <div className="dashboard-breakdown">
              {Object.entries(categoryCounts).map(([categoryName, count]) => (
                <div className="dashboard-breakdown-row" key={categoryName}>
                  <span>{categoryName}</span>
                  <strong>{count}</strong>
                </div>
              ))}
            </div>
          )}
        </DashboardListCard>
      </section>

      <section className="dashboard-secondary-grid">
        <DashboardListCard
          title="Attention Needed"
          description="Operational signals that usually need review."
        >
          <div className="attention-list">
            <div>
              <strong>{waitingCases.length}</strong>
              <span>Waiting on {customerLabel.toLowerCase()}</span>
            </div>

            <div>
              <strong>{highPriorityCases.length}</strong>
              <span>High or urgent priority</span>
            </div>

            <div>
              <strong>{unassignedCases.length}</strong>
              <span>Unassigned {caseLabelPlural.toLowerCase()}</span>
            </div>

            <div>
              <strong>{closedCases.length}</strong>
              <span>Closed {caseLabelPlural.toLowerCase()}</span>
            </div>
          </div>
        </DashboardListCard>

        <DashboardListCard
          title="Recent Updates"
          description={`Latest ${caseLabel.toLowerCase()} activity by last updated timestamp.`}
        >
          {recentlyUpdatedCases.length === 0 ? (
            <div className="soft-empty">
              No recent {caseLabelPlural.toLowerCase()} found.
            </div>
          ) : (
            <div className="recent-case-list">
              {recentlyUpdatedCases.map((caseItem) => (
                <Link
                  className="recent-case-row"
                  key={caseItem.id}
                  to={`/cases/${caseItem.id}`}
                >
                  <div>
                    <strong>{caseItem.title}</strong>
                    <span>
                      {caseItem.customer.name} · {caseItem.status.name}
                    </span>
                  </div>

                  <span>{formatDate(caseItem.updatedAt)}</span>
                </Link>
              ))}
            </div>
          )}
        </DashboardListCard>
      </section>
    </AppShell>
  );
}

function ReportsPage() {
  const { caseLabel, caseLabelPlural, customerLabel, customerLabelPlural } =
    useWorkspaceLabels();
  const {
    data: report,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["reports", "operations"],
    queryFn: fetchOperationsReport,
  });

  if (isLoading) {
    return (
      <AppShell>
        <LoadingState message="Loading reports" />
      </AppShell>
    );
  }

  if (isError || !report) {
    return (
      <AppShell>
        <ErrorState
          title="Reports unavailable"
          message="We could not load operations reporting right now. Your workspace data is still safe."
          error={error}
        />
      </AppShell>
    );
  }

  const reportRows = [
    {
      label: "Closed rate",
      value: `${report.summary.closedRate}%`,
      detail: `${report.metrics.closedCases} of ${report.metrics.totalCases} ${caseLabelPlural.toLowerCase()} closed`,
    },
    {
      label: "High priority share",
      value: `${report.summary.highPriorityShare}%`,
      detail: `${report.attention.highPriorityCases} high or urgent ${caseLabelPlural.toLowerCase()}`,
    },
    {
      label: "Unassigned share",
      value: `${report.summary.unassignedShare}%`,
      detail: `${report.attention.unassignedCases} ${caseLabelPlural.toLowerCase()} need an owner`,
    },
    {
      label: `${customerLabelPlural} with open work`,
      value: String(report.summary.customersWithOpenCases),
      detail: `${report.summary.customerCount} ${customerLabelPlural.toLowerCase()} in the workspace`,
    },
  ];
  const statusCounts = report.statusCounts ?? report.breakdowns?.status;
  const priorityCounts = report.priorityCounts ?? report.breakdowns?.priority;
  const categoryCounts = report.categoryCounts ?? report.breakdowns?.category;
  const sourceCounts = report.sourceCounts ?? report.breakdowns?.source;
  const ownerWorkload = report.ownerWorkload ?? report.breakdowns?.owner;

  return (
    <AppShell>
      <header className="page-header">
        <div>
          <p className="eyebrow">Reports</p>
          <h1>Operations Reports</h1>
          <p className="page-description">
            Review {caseLabel.toLowerCase()} volume, workload distribution,{" "}
            {customerLabel.toLowerCase()} coverage, and workflow risk across
            the workspace.
          </p>
        </div>

        <div className="page-actions">
          <Link className="secondary-button" to="/dashboard">
            Dashboard
          </Link>

          <Link className="primary-button" to="/">
            Open {caseLabel} Inbox
          </Link>
        </div>
      </header>

      <section className="report-metrics-grid">
        <DashboardMetricCard
          label={`Total ${caseLabelPlural.toLowerCase()}`}
          value={report.metrics.totalCases}
          description={`All ${caseLabelPlural.toLowerCase()} currently in the workspace.`}
        />

        <DashboardMetricCard
          label={`Open ${caseLabelPlural.toLowerCase()}`}
          value={report.metrics.openCases}
          description={`Active ${caseLabelPlural.toLowerCase()} that still need workflow action.`}
        />

        <DashboardMetricCard
          label="Overdue"
          value={report.metrics.overdueCases}
          description={`Open ${caseLabelPlural.toLowerCase()} with due dates in the past.`}
        />

        <DashboardMetricCard
          label="Avg open age"
          value={report.metrics.averageOpenAge}
          description={`Average age in days for currently open ${caseLabelPlural.toLowerCase()}.`}
        />
      </section>

      <section className="report-summary-grid">
        {reportRows.map((row) => (
          <div className="report-summary-card" key={row.label}>
            <span>{row.label}</span>
            <strong>{row.value}</strong>
            <p>{row.detail}</p>
          </div>
        ))}
      </section>

      <section className="reports-grid">
        <DashboardListCard
          title="Workflow Status"
          description={`${caseLabel} distribution by current workflow status.`}
        >
          <ReportBreakdown
            data={statusCounts}
            total={report.metrics.totalCases}
          />
        </DashboardListCard>

        <DashboardListCard
          title="Priority Mix"
          description="How much work is low, normal, high, or urgent."
        >
          <ReportBreakdown
            data={priorityCounts}
            total={report.metrics.totalCases}
          />
        </DashboardListCard>

        <DashboardListCard
          title={`${caseLabel} Categories`}
          description="Workload grouped by operational category."
        >
          <ReportBreakdown
            data={categoryCounts}
            total={report.metrics.totalCases}
          />
        </DashboardListCard>

        <DashboardListCard
          title="Intake Sources"
          description="Where cases are entering the workflow."
        >
          <ReportBreakdown
            data={sourceCounts}
            total={report.metrics.totalCases}
          />
        </DashboardListCard>

        <DashboardListCard
          title="Owner Workload"
          description={`Open ${caseLabelPlural.toLowerCase()} grouped by current internal owner.`}
        >
          <ReportBreakdown
            data={ownerWorkload}
            total={report.metrics.openCases}
          />
        </DashboardListCard>

        <DashboardListCard
          title={`Open ${caseLabel} Aging`}
          description={`Open ${caseLabelPlural.toLowerCase()} grouped by how long they have been active.`}
        >
          <div className="report-aging-list">
            {report.agingBuckets.map((bucket) => (
              <div className="report-aging-row" key={bucket.label}>
                <span>{bucket.label}</span>
                <strong>{bucket.count}</strong>
              </div>
            ))}
          </div>
        </DashboardListCard>
      </section>

      <section className="dashboard-secondary-grid">
        <DashboardListCard
          title="Attention Signals"
          description="Operational counts that should be reviewed regularly."
        >
          <div className="attention-list">
            <div>
              <strong>{report.attention.waitingCases}</strong>
              <span>Waiting on {customerLabel.toLowerCase()}</span>
            </div>

            <div>
              <strong>{report.attention.highPriorityCases}</strong>
              <span>High or urgent priority</span>
            </div>

            <div>
              <strong>{report.attention.unassignedCases}</strong>
              <span>Unassigned {caseLabelPlural.toLowerCase()}</span>
            </div>

            <div>
              <strong>{report.attention.overdueCases}</strong>
              <span>Overdue {caseLabelPlural.toLowerCase()}</span>
            </div>
          </div>
        </DashboardListCard>

        <DashboardListCard
          title="Recently Closed"
          description={`Most recent ${caseLabelPlural.toLowerCase()} that reached a closed workflow state.`}
        >
          {report.recentlyClosedCases.length === 0 ? (
            <div className="soft-empty">
              No closed {caseLabelPlural.toLowerCase()} found.
            </div>
          ) : (
            <div className="recent-case-list">
              {report.recentlyClosedCases.map((caseItem) => (
                <Link
                  className="recent-case-row"
                  key={caseItem.id}
                  to={`/cases/${caseItem.id}`}
                >
                  <div>
                    <strong>{caseItem.title}</strong>
                    <span>
                      {caseItem.customer.name} / {caseItem.status.name}
                    </span>
                  </div>

                  <span>{formatDate(caseItem.updatedAt)}</span>
                </Link>
              ))}
            </div>
          )}
        </DashboardListCard>
      </section>
    </AppShell>
  );
}

function ReportBreakdown({
  data,
  total,
}: {
  data: ReportBreakdownData | undefined;
  total: number;
}) {
  const entries = Array.isArray(data)
    ? data
    : Object.entries(data ?? {}).map(([label, count]) => ({
        label,
        count,
      }));
  const sortedEntries = entries.sort((a, b) => b.count - a.count);

  if (sortedEntries.length === 0) {
    return <div className="soft-empty">No report data available.</div>;
  }

  return (
    <div className="report-breakdown">
      {sortedEntries.map(({ label, count }) => {
        const percent = total === 0 ? 0 : Math.round((count / total) * 100);

        return (
          <div className="report-breakdown-row" key={label}>
            <div className="report-breakdown-header">
              <span>{label}</span>
              <strong>
                {count} / {percent}%
              </strong>
            </div>

            <div className="report-bar">
              <span style={{ width: `${percent}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SettingsPage() {
  const queryClient = useQueryClient();
  const [activeSettingsSection, setActiveSettingsSection] = useState("company");
  const [newStatusName, setNewStatusName] = useState("");
  const [newStatusColor, setNewStatusColor] = useState("#4f46e5");
  const [newStatusIsDefault, setNewStatusIsDefault] = useState(false);
  const [newStatusIsClosed, setNewStatusIsClosed] = useState(false);
  const [editingStatus, setEditingStatus] =
    useState<WorkflowStatusEditForm | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [editingCategory, setEditingCategory] =
    useState<CaseCategoryEditForm | null>(null);
  const [workspaceProfileForm, setWorkspaceProfileForm] =
    useState<WorkspaceProfileForm>({
      appName: "",
      caseLabel: "",
      customerLabel: "",
      industryTemplateKey: "",
    });
  const [newIntakeField, setNewIntakeField] =
    useState<IntakeFieldCreateForm>({
      label: "",
      fieldType: "text",
      isRequired: false,
      showOnCaseDetail: true,
      isActive: true,
    });
  const [editingIntakeField, setEditingIntakeField] =
    useState<IntakeFieldEditForm | null>(null);

  const {
    data: cases = [],
    isLoading: isLoadingCases,
    isError: isCasesError,
    error: casesError,
  } = useQuery({
    queryKey: ["cases", "settings"],
    queryFn: () => fetchCases(DASHBOARD_CASE_FILTERS),
  });

  const {
    data: customers = [],
    isLoading: isLoadingCustomers,
    isError: isCustomersError,
    error: customersError,
  } = useQuery({
    queryKey: ["customers", "settings"],
    queryFn: () => fetchCustomers(""),
  });

  const {
    data: workflowStatuses = [],
    isLoading: isLoadingWorkflowStatuses,
    isError: isWorkflowStatusesError,
    error: workflowStatusesError,
  } = useQuery({
    queryKey: ["settings", "workflow-statuses"],
    queryFn: fetchWorkflowStatuses,
  });

  const {
    data: caseCategories = [],
    isLoading: isLoadingCaseCategories,
    isError: isCaseCategoriesError,
    error: caseCategoriesError,
  } = useQuery({
    queryKey: ["settings", "case-categories"],
    queryFn: fetchCaseCategories,
  });

  const {
    data: teamMembers = [],
    isLoading: isLoadingTeamMembers,
    isError: isTeamMembersError,
    error: teamMembersError,
  } = useQuery({
    queryKey: ["settings", "team-members"],
    queryFn: fetchTeamMembers,
  });

  const {
    data: industryTemplates = [],
    isLoading: isLoadingIndustryTemplates,
    isError: isIndustryTemplatesError,
    error: industryTemplatesError,
  } = useQuery({
    queryKey: ["settings", "industry-templates"],
    queryFn: fetchIndustryTemplates,
  });

  const {
    data: workspaceProfile,
    isLoading: isLoadingWorkspaceProfile,
    isError: isWorkspaceProfileError,
    error: workspaceProfileError,
  } = useQuery({
    queryKey: ["settings", "workspace"],
    queryFn: fetchWorkspaceProfile,
  });

  const {
    data: intakeFields = [],
    isLoading: isLoadingIntakeFields,
    isError: isIntakeFieldsError,
    error: intakeFieldsError,
  } = useQuery({
    queryKey: ["settings", "intake-fields"],
    queryFn: fetchIntakeFields,
  });

  const isLoading =
    isLoadingCases ||
    isLoadingCustomers ||
    isLoadingWorkflowStatuses ||
    isLoadingCaseCategories ||
    isLoadingTeamMembers ||
    isLoadingIndustryTemplates ||
    isLoadingWorkspaceProfile ||
    isLoadingIntakeFields;
  const isError =
    isCasesError ||
    isCustomersError ||
    isWorkflowStatusesError ||
    isCaseCategoriesError ||
    isTeamMembersError ||
    isIndustryTemplatesError ||
    isWorkspaceProfileError ||
    isIntakeFieldsError;
  const error =
    casesError ??
    customersError ??
    workflowStatusesError ??
    caseCategoriesError ??
    teamMembersError ??
    industryTemplatesError ??
    workspaceProfileError ??
    intakeFieldsError;

  useEffect(() => {
    if (!workspaceProfile) {
      return;
    }

    setWorkspaceProfileForm({
      appName: workspaceProfile.appName ?? "Core",
      caseLabel: workspaceProfile.caseLabel ?? "Case",
      customerLabel: workspaceProfile.customerLabel ?? "Customer",
      industryTemplateKey: workspaceProfile.industryTemplateKey ?? "",
    });
  }, [workspaceProfile]);

  const openCases = cases.filter((caseItem) => !caseItem.status.isClosed);
  const unassignedCases = cases.filter((caseItem) => !caseItem.assignedUser);
  const statusCounts = cases.reduce<Record<string, number>>(
    (result, caseItem) => {
      result[caseItem.status.slug] = (result[caseItem.status.slug] ?? 0) + 1;
      return result;
    },
    {},
  );
  const categoryCounts = cases.reduce<Record<string, number>>(
    (result, caseItem) => {
      const categorySlug = caseItem.category?.slug ?? "uncategorized";
      result[categorySlug] = (result[categorySlug] ?? 0) + 1;
      return result;
    },
    {},
  );
  const settingsSections = [
    { id: "company", label: "Company" },
    { id: "workspace", label: "Workspace" },
    { id: "workflow", label: "Workflow" },
    { id: "intake", label: "Intake" },
    { id: "team", label: "Team" },
    { id: "security", label: "Security" },
  ];

  const createWorkflowStatusMutation = useMutation({
    mutationFn: createWorkflowStatus,
    onSuccess: () => {
      setNewStatusName("");
      setNewStatusColor("#4f46e5");
      setNewStatusIsDefault(false);
      setNewStatusIsClosed(false);
      queryClient.invalidateQueries({
        queryKey: ["settings", "workflow-statuses"],
      });
    },
  });

  const updateWorkflowStatusMutation = useMutation({
    mutationFn: updateWorkflowStatus,
    onSuccess: () => {
      setEditingStatus(null);
      queryClient.invalidateQueries({
        queryKey: ["settings", "workflow-statuses"],
      });
    },
  });

  const createCaseCategoryMutation = useMutation({
    mutationFn: createCaseCategory,
    onSuccess: () => {
      setNewCategoryName("");
      setNewCategoryDescription("");
      queryClient.invalidateQueries({
        queryKey: ["settings", "case-categories"],
      });
    },
  });

  const updateCaseCategoryMutation = useMutation({
    mutationFn: updateCaseCategory,
    onSuccess: () => {
      setEditingCategory(null);
      queryClient.invalidateQueries({
        queryKey: ["settings", "case-categories"],
      });
      queryClient.invalidateQueries({ queryKey: ["cases"] });
    },
  });

  const updateWorkspaceProfileMutation = useMutation({
    mutationFn: updateWorkspaceProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings", "workspace"],
      });
    },
  });

  const createIntakeFieldMutation = useMutation({
    mutationFn: createIntakeField,
    onSuccess: () => {
      setNewIntakeField({
        label: "",
        fieldType: "text",
        isRequired: false,
        showOnCaseDetail: true,
        isActive: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["settings", "intake-fields"],
      });
    },
  });

  const updateIntakeFieldMutation = useMutation({
    mutationFn: updateIntakeField,
    onSuccess: () => {
      setEditingIntakeField(null);
      queryClient.invalidateQueries({
        queryKey: ["settings", "intake-fields"],
      });
    },
  });

  function handleCreateWorkflowStatus(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = newStatusName.trim();

    if (!trimmedName) {
      return;
    }

    createWorkflowStatusMutation.mutate({
      name: trimmedName,
      color: newStatusColor,
      isDefault: newStatusIsDefault,
      isClosed: newStatusIsClosed,
    });
  }

  function startEditingWorkflowStatus(status: WorkflowStatusSetting) {
    setEditingStatus({
      id: status.id,
      name: status.name,
      color: status.color ?? "#4f46e5",
      sortOrder: String(status.sortOrder),
      isDefault: status.isDefault,
      isClosed: status.isClosed,
    });
  }

  function handleUpdateWorkflowStatus(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!editingStatus) {
      return;
    }

    const trimmedName = editingStatus.name.trim();

    if (!trimmedName) {
      return;
    }

    updateWorkflowStatusMutation.mutate({
      id: editingStatus.id,
      name: trimmedName,
      color: editingStatus.color,
      sortOrder: Number(editingStatus.sortOrder) || 0,
      isDefault: editingStatus.isDefault,
      isClosed: editingStatus.isClosed,
    });
  }

  function handleCreateCaseCategory(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = newCategoryName.trim();

    if (!trimmedName) {
      return;
    }

    createCaseCategoryMutation.mutate({
      name: trimmedName,
      description: newCategoryDescription.trim() || null,
    });
  }

  function startEditingCaseCategory(category: CaseCategorySetting) {
    setEditingCategory({
      id: category.id,
      name: category.name,
      description: category.description ?? "",
    });
  }

  function handleUpdateCaseCategory(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!editingCategory) {
      return;
    }

    const trimmedName = editingCategory.name.trim();

    if (!trimmedName) {
      return;
    }

    updateCaseCategoryMutation.mutate({
      id: editingCategory.id,
      name: trimmedName,
      description: editingCategory.description.trim() || null,
    });
  }

  function handleUpdateWorkspaceProfile(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const appName = workspaceProfileForm.appName.trim();
    const caseLabel = workspaceProfileForm.caseLabel.trim();
    const customerLabel = workspaceProfileForm.customerLabel.trim();
    const industryTemplateKey =
      workspaceProfileForm.industryTemplateKey.trim();

    if (!appName || !caseLabel || !customerLabel) {
      return;
    }

    updateWorkspaceProfileMutation.mutate({
      appName,
      caseLabel,
      customerLabel,
      industryTemplateKey: industryTemplateKey || null,
    });
  }

  function handleWorkspaceTemplateChange(
    event: React.ChangeEvent<HTMLSelectElement>,
  ) {
    const industryTemplateKey = event.target.value;
    const template = industryTemplates.find(
      (templateOption) => templateOption.key === industryTemplateKey,
    );

    setWorkspaceProfileForm((current) => ({
      ...current,
      industryTemplateKey,
      appName: template?.appName ?? current.appName,
      caseLabel: template?.caseLabel ?? current.caseLabel,
      customerLabel: template?.customerLabel ?? current.customerLabel,
    }));
  }

  function handleCreateIntakeField(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const label = newIntakeField.label.trim();

    if (!label) {
      return;
    }

    createIntakeFieldMutation.mutate({
      ...newIntakeField,
      label,
    });
  }

  function startEditingIntakeField(intakeField: IntakeFieldSetting) {
    setEditingIntakeField({
      id: intakeField.id,
      label: intakeField.label,
      fieldType: intakeField.fieldType,
      sortOrder: String(intakeField.sortOrder),
      isRequired: intakeField.isRequired,
      showOnCaseDetail: intakeField.showOnCaseDetail ?? false,
      isActive: intakeField.isActive,
    });
  }

  function handleUpdateIntakeField(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!editingIntakeField) {
      return;
    }

    const label = editingIntakeField.label.trim();

    if (!label) {
      return;
    }

    updateIntakeFieldMutation.mutate({
      id: editingIntakeField.id,
      label,
      fieldType: editingIntakeField.fieldType,
      sortOrder: Number(editingIntakeField.sortOrder) || 0,
      isRequired: editingIntakeField.isRequired,
      showOnCaseDetail: editingIntakeField.showOnCaseDetail,
      isActive: editingIntakeField.isActive,
    });
  }

  if (isLoading) {
    return (
      <AppShell>
        <LoadingState message="Loading settings" />
      </AppShell>
    );
  }

  if (isError) {
    return (
      <AppShell>
        <ErrorState
          title="Settings unavailable"
          message="We could not load workspace settings. Try refreshing before making changes."
          error={error}
        />
      </AppShell>
    );
  }

  const workspaceName = workspaceProfile?.name ?? "Workspace";
  const workspaceSlug = workspaceProfile?.slug ?? "";
  const workspaceAppName = workspaceProfile?.appName ?? "Core";
  const workspaceCaseLabel = workspaceProfile?.caseLabel ?? "Case";
  const workspaceCustomerLabel = workspaceProfile?.customerLabel ?? "Customer";
  const workspaceTemplateName =
    industryTemplates.find(
      (template) => template.key === workspaceProfile?.industryTemplateKey,
    )?.name ?? formatFieldLabel(workspaceProfile?.industry ?? "general");

  return (
    <AppShell>
      <header className="page-header">
        <div>
          <p className="eyebrow">Settings</p>
          <h1>Admin Settings</h1>
          <p className="page-description">
            Manage company profile, workspace defaults, workflow setup, team
            access, notifications, and data controls.
          </p>
        </div>

        <div className="page-actions">
          <Link className="secondary-button" to="/reports">
            Reports
          </Link>

          <Link className="primary-button" to="/">
            Open {workspaceCaseLabel} Inbox
          </Link>
        </div>
      </header>

      <section className="admin-settings-hero">
        <div className="company-identity-card">
          <div className="company-logo-preview">MC</div>

          <div>
            <span>Active workspace</span>
            <strong>{workspaceName}</strong>
            <p>
              {workspaceAppName} / {workspaceTemplateName}
            </p>
          </div>
        </div>

        <div className="admin-settings-stats">
          <div>
            <span>{pluralizeLabel(workspaceCaseLabel)}</span>
            <strong>{cases.length}</strong>
          </div>

          <div>
            <span>{pluralizeLabel(workspaceCustomerLabel)}</span>
            <strong>{customers.length}</strong>
          </div>

          <div>
            <span>Open work</span>
            <strong>{openCases.length}</strong>
          </div>

          <div>
            <span>Unassigned</span>
            <strong>{unassignedCases.length}</strong>
          </div>
        </div>
      </section>

      <div className="admin-settings-layout">
        <aside className="admin-settings-nav" aria-label="Settings sections">
          {settingsSections.map((section) => (
            <button
              className={
                activeSettingsSection === section.id ? "active" : undefined
              }
              key={section.id}
              type="button"
              onClick={() => setActiveSettingsSection(section.id)}
            >
              {section.label}
            </button>
          ))}
        </aside>

        <section className="admin-settings-content">
          {activeSettingsSection === "company" && (
            <>
              <div className="settings-panel">
                <div className="settings-panel-header">
                  <div>
                    <h2>Company Profile</h2>
                    <p>
                      Business identity used across customer-facing records.
                    </p>
                  </div>

                  <button className="primary-button" type="button">
                    Save changes
                  </button>
                </div>

                <div className="company-profile-layout">
                  <div className="company-logo-uploader">
                    <div className="company-logo-preview large">MC</div>
                    <button className="secondary-button" type="button">
                      Upload logo
                    </button>
                  </div>

                  <div className="admin-form-grid">
                    <label>
                      Public company name
                      <input defaultValue={workspaceName} />
                    </label>

                    <label>
                      Legal business name
                      <input defaultValue="MapleCare Health Services Inc." />
                    </label>

                    <label>
                      Website
                      <input defaultValue="https://maplecare.example" />
                    </label>

                    <label>
                      Support email
                      <input defaultValue="support@maplecare.example" />
                    </label>

                    <label>
                      Phone
                      <input defaultValue="+1 (416) 555-0188" />
                    </label>

                    <label>
                      Time zone
                      <select defaultValue="America/Toronto">
                        <option value="America/Toronto">America/Toronto</option>
                        <option value="America/New_York">
                          America/New_York
                        </option>
                        <option value="America/Chicago">America/Chicago</option>
                        <option value="America/Los_Angeles">
                          America/Los_Angeles
                        </option>
                      </select>
                    </label>

                    <label className="full-span">
                      Business address
                      <input defaultValue="120 King Street West, Toronto, ON" />
                    </label>
                  </div>
                </div>
              </div>

              <div className="settings-panel">
                <div className="settings-panel-header">
                  <div>
                    <h2>Branding</h2>
                    <p>Basic visual identity for emails and customer views.</p>
                  </div>
                </div>

                <div className="brand-settings-grid">
                  <label>
                    Primary color
                    <div className="color-input-row">
                      <span className="color-swatch dark" />
                      <input defaultValue="#111827" />
                    </div>
                  </label>

                  <label>
                    Accent color
                    <div className="color-input-row">
                      <span className="color-swatch accent" />
                      <input defaultValue="#4f46e5" />
                    </div>
                  </label>

                    <label>
                      Email footer
                    <input
                      defaultValue={`${workspaceAppName} workflow updates from ${workspaceName}`}
                    />
                    </label>
                </div>
              </div>
            </>
          )}

          {activeSettingsSection === "workspace" && (
            <>
              <div className="settings-panel">
                <form onSubmit={handleUpdateWorkspaceProfile}>
                  <div className="settings-panel-header">
                    <div>
                      <h2>Workspace Defaults</h2>
                      <p>Reusable labels and operational defaults for Core.</p>
                    </div>

                    <button
                      className="primary-button"
                      disabled={
                        updateWorkspaceProfileMutation.isPending ||
                        !workspaceProfileForm.appName.trim() ||
                        !workspaceProfileForm.caseLabel.trim() ||
                        !workspaceProfileForm.customerLabel.trim()
                      }
                      type="submit"
                    >
                      {updateWorkspaceProfileMutation.isPending
                        ? "Saving..."
                        : "Save changes"}
                    </button>
                  </div>

                  <div className="admin-form-grid">
                    <label>
                      Application name
                      <input
                        name="appName"
                        required
                        value={workspaceProfileForm.appName}
                        onChange={(event) =>
                          setWorkspaceProfileForm((current) => ({
                            ...current,
                            appName: event.target.value,
                          }))
                        }
                      />
                    </label>

                    <label>
                      Workspace slug
                      <input defaultValue={workspaceSlug} readOnly />
                    </label>

                    <label>
                      Primary work object
                      <input
                        name="caseLabel"
                        required
                        value={workspaceProfileForm.caseLabel}
                        onChange={(event) =>
                          setWorkspaceProfileForm((current) => ({
                            ...current,
                            caseLabel: event.target.value,
                          }))
                        }
                      />
                    </label>

                    <label>
                      Customer object label
                      <input
                        name="customerLabel"
                        required
                        value={workspaceProfileForm.customerLabel}
                        onChange={(event) =>
                          setWorkspaceProfileForm((current) => ({
                            ...current,
                            customerLabel: event.target.value,
                          }))
                        }
                      />
                    </label>

                    <label>
                      Industry template
                      <select
                        name="industryTemplateKey"
                        value={workspaceProfileForm.industryTemplateKey}
                        onChange={handleWorkspaceTemplateChange}
                      >
                        <option value="">No template</option>
                        {industryTemplates.map((template) => (
                          <option key={template.key} value={template.key}>
                            {template.name}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label>
                      Default status
                      <select defaultValue="new" disabled>
                        {workflowStatuses.map((status) => (
                          <option key={status.id} value={status.slug}>
                            {status.name}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  {updateWorkspaceProfileMutation.isError && (
                    <div className="form-error">
                      Could not save workspace settings.
                    </div>
                  )}
                </form>
              </div>

              <div className="settings-panel">
                <div className="settings-panel-header">
                  <div>
                    <h2>Workspace Templates</h2>
                    <p>Available industry presets for labels and app naming.</p>
                  </div>
                </div>

                <div className="admin-table workspace-template-table">
                  <div className="admin-table-header">
                    <span>Template</span>
                    <span>App name</span>
                    <span>Case label</span>
                    <span>Customer label</span>
                    <span>Statuses</span>
                    <span>Categories</span>
                  </div>

                  {industryTemplates.length === 0 ? (
                    <div className="admin-table-row">
                      <strong>No templates</strong>
                      <span>None available</span>
                      <span>Case</span>
                      <span>Customer</span>
                      <span>None</span>
                      <span>None</span>
                    </div>
                  ) : (
                    industryTemplates.map((template) => (
                      <div className="admin-table-row" key={template.key}>
                        <strong>{template.name}</strong>
                        <span>{template.appName}</span>
                        <span>{template.caseLabel}</span>
                        <span>{template.customerLabel}</span>
                        <span className="template-chip-list">
                          {template.defaultStatuses.map((status) => (
                            <small key={status}>{status}</small>
                          ))}
                        </span>
                        <span className="template-chip-list">
                          {template.defaultCategories.map((category) => (
                            <small key={category}>{category}</small>
                          ))}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="settings-panel">
                <div className="settings-panel-header">
                  <div>
                    <h2>Intake Rules</h2>
                    <p>Default behavior for new work entering the system.</p>
                  </div>
                </div>

                <div className="settings-toggle-list">
                  <label>
                    <input defaultChecked type="checkbox" />
                    Assign new staff-created cases to the first available staff
                    user
                  </label>

                  <label>
                    <input defaultChecked type="checkbox" />
                    Create an activity event when a case is created
                  </label>

                  <label>
                    <input type="checkbox" />
                    Require a due date before a case can be closed
                  </label>
                </div>
              </div>
            </>
          )}

          {activeSettingsSection === "workflow" && (
            <>
              <div className="settings-panel">
                <div className="settings-panel-header">
                  <div>
                    <h2>Workflow Statuses</h2>
                    <p>Status stages used to move cases through operations.</p>
                  </div>
                </div>

                <form
                  className="workflow-status-form"
                  onSubmit={handleCreateWorkflowStatus}
                >
                  <label>
                    Name
                    <input
                      placeholder="Needs Review"
                      value={newStatusName}
                      onChange={(event) => setNewStatusName(event.target.value)}
                    />
                  </label>

                  <label>
                    Color
                    <input
                      type="color"
                      value={newStatusColor}
                      onChange={(event) => setNewStatusColor(event.target.value)}
                    />
                  </label>

                  <label className="workflow-status-checkbox">
                    <input
                      checked={newStatusIsDefault}
                      type="checkbox"
                      onChange={(event) =>
                        setNewStatusIsDefault(event.target.checked)
                      }
                    />
                    Default
                  </label>

                  <label className="workflow-status-checkbox">
                    <input
                      checked={newStatusIsClosed}
                      type="checkbox"
                      onChange={(event) =>
                        setNewStatusIsClosed(event.target.checked)
                      }
                    />
                    Closed
                  </label>

                  <button
                    className="primary-button"
                    disabled={
                      createWorkflowStatusMutation.isPending ||
                      !newStatusName.trim()
                    }
                    type="submit"
                  >
                    {createWorkflowStatusMutation.isPending
                      ? "Creating..."
                      : "Create status"}
                  </button>
                </form>

                {createWorkflowStatusMutation.isError && (
                  <div className="form-error">
                    Could not create workflow status.
                  </div>
                )}

                <div className="admin-table workflow-status-table">
                  <div className="admin-table-header">
                    <span>Status</span>
                    <span>Slug</span>
                    <span>Usage</span>
                    <span>Type</span>
                    <span>Actions</span>
                  </div>

                  {workflowStatuses.length === 0 ? (
                    <div className="admin-table-row">
                      <strong>No workflow statuses</strong>
                      <span>Add the first status</span>
                      <span>0 cases</span>
                      <span>Workflow</span>
                      <span>Use the form above</span>
                    </div>
                  ) : (
                    workflowStatuses.map((status) => (
                      <div className="workflow-status-item" key={status.id}>
                        <div className="admin-table-row">
                          <strong>{status.name}</strong>
                          <span>{status.slug}</span>
                          <span>{statusCounts[status.slug] ?? 0} cases</span>
                          <span>
                            {status.isDefault
                              ? "Default"
                              : status.isClosed
                                ? "Closed"
                                : "Workflow"}
                          </span>
                          <button
                            className="secondary-button compact"
                            disabled={updateWorkflowStatusMutation.isPending}
                            type="button"
                            onClick={() => startEditingWorkflowStatus(status)}
                          >
                            Edit
                          </button>
                        </div>

                        {editingStatus?.id === status.id && (
                          <form
                            className="workflow-status-edit-form"
                            onSubmit={handleUpdateWorkflowStatus}
                          >
                            <label>
                              Name
                              <input
                                value={editingStatus.name}
                                onChange={(event) =>
                                  setEditingStatus({
                                    ...editingStatus,
                                    name: event.target.value,
                                  })
                                }
                              />
                            </label>

                            <label>
                              Color
                              <input
                                type="color"
                                value={editingStatus.color}
                                onChange={(event) =>
                                  setEditingStatus({
                                    ...editingStatus,
                                    color: event.target.value,
                                  })
                                }
                              />
                            </label>

                            <label>
                              Order
                              <input
                                min="0"
                                type="number"
                                value={editingStatus.sortOrder}
                                onChange={(event) =>
                                  setEditingStatus({
                                    ...editingStatus,
                                    sortOrder: event.target.value,
                                  })
                                }
                              />
                            </label>

                            <label className="workflow-status-checkbox">
                              <input
                                checked={editingStatus.isDefault}
                                type="checkbox"
                                onChange={(event) =>
                                  setEditingStatus({
                                    ...editingStatus,
                                    isDefault: event.target.checked,
                                  })
                                }
                              />
                              Default
                            </label>

                            <label className="workflow-status-checkbox">
                              <input
                                checked={editingStatus.isClosed}
                                type="checkbox"
                                onChange={(event) =>
                                  setEditingStatus({
                                    ...editingStatus,
                                    isClosed: event.target.checked,
                                  })
                                }
                              />
                              Closed
                            </label>

                            <div className="workflow-status-edit-actions">
                              <button
                                className="primary-button"
                                disabled={
                                  updateWorkflowStatusMutation.isPending ||
                                  !editingStatus.name.trim()
                                }
                                type="submit"
                              >
                                {updateWorkflowStatusMutation.isPending
                                  ? "Saving..."
                                  : "Save"}
                              </button>
                              <button
                                className="secondary-button"
                                disabled={updateWorkflowStatusMutation.isPending}
                                type="button"
                                onClick={() => setEditingStatus(null)}
                              >
                                Cancel
                              </button>
                            </div>

                            {updateWorkflowStatusMutation.isError && (
                              <div className="form-error workflow-status-edit-error">
                                Could not update workflow status.
                              </div>
                            )}
                          </form>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="settings-panel">
                <div className="settings-panel-header">
                  <div>
                    <h2>Case Categories</h2>
                    <p>Categories available for grouping operational work.</p>
                  </div>
                </div>

                <form
                  className="case-category-form"
                  onSubmit={handleCreateCaseCategory}
                >
                  <label>
                    Name
                    <input
                      placeholder="Billing Review"
                      value={newCategoryName}
                      onChange={(event) => setNewCategoryName(event.target.value)}
                    />
                  </label>

                  <label>
                    Description
                    <input
                      placeholder="Cases related to billing or payment work"
                      value={newCategoryDescription}
                      onChange={(event) =>
                        setNewCategoryDescription(event.target.value)
                      }
                    />
                  </label>

                  <button
                    className="primary-button"
                    disabled={
                      createCaseCategoryMutation.isPending ||
                      !newCategoryName.trim()
                    }
                    type="submit"
                  >
                    {createCaseCategoryMutation.isPending
                      ? "Creating..."
                      : "Create category"}
                  </button>
                </form>

                {createCaseCategoryMutation.isError && (
                  <div className="form-error">
                    Could not create case category.
                  </div>
                )}

                <div className="admin-table case-category-table">
                  <div className="admin-table-header">
                    <span>Category</span>
                    <span>Slug</span>
                    <span>{pluralizeLabel(workspaceCaseLabel)}</span>
                    <span>Actions</span>
                  </div>

                  {caseCategories.length === 0 ? (
                    <div className="admin-table-row">
                      <strong>No case categories</strong>
                      <span>Add the first category</span>
                      <span>0</span>
                      <span>Use the form above</span>
                    </div>
                  ) : (
                    caseCategories.map((category) => (
                      <div className="case-category-item" key={category.id}>
                        <div className="admin-table-row">
                          <strong>{category.name}</strong>
                          <span>{category.slug}</span>
                          <span>{categoryCounts[category.slug] ?? 0}</span>
                          <button
                            className="secondary-button compact"
                            disabled={updateCaseCategoryMutation.isPending}
                            type="button"
                            onClick={() => startEditingCaseCategory(category)}
                          >
                            Edit
                          </button>
                        </div>

                        {editingCategory?.id === category.id && (
                          <form
                            className="case-category-edit-form"
                            onSubmit={handleUpdateCaseCategory}
                          >
                            <label>
                              Name
                              <input
                                value={editingCategory.name}
                                onChange={(event) =>
                                  setEditingCategory({
                                    ...editingCategory,
                                    name: event.target.value,
                                  })
                                }
                              />
                            </label>

                            <label>
                              Description
                              <input
                                value={editingCategory.description}
                                onChange={(event) =>
                                  setEditingCategory({
                                    ...editingCategory,
                                    description: event.target.value,
                                  })
                                }
                              />
                            </label>

                            <div className="case-category-edit-actions">
                              <button
                                className="primary-button"
                                disabled={
                                  updateCaseCategoryMutation.isPending ||
                                  !editingCategory.name.trim()
                                }
                                type="submit"
                              >
                                {updateCaseCategoryMutation.isPending
                                  ? "Saving..."
                                  : "Save"}
                              </button>

                              <button
                                className="secondary-button"
                                disabled={updateCaseCategoryMutation.isPending}
                                type="button"
                                onClick={() => setEditingCategory(null)}
                              >
                                Cancel
                              </button>
                            </div>

                            {updateCaseCategoryMutation.isError && (
                              <div className="form-error case-category-edit-error">
                                Could not update case category.
                              </div>
                            )}
                          </form>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}

          {activeSettingsSection === "intake" && (
            <div className="settings-panel">
              <div className="settings-panel-header">
                <div>
                  <h2>Intake Fields</h2>
                  <p>
                    Configurable fields available for collecting structured
                    case intake details.
                  </p>
                </div>
              </div>

              <form
                className="intake-field-form"
                onSubmit={handleCreateIntakeField}
              >
                <label>
                  Label
                  <input
                    placeholder="Preferred contact time"
                    value={newIntakeField.label}
                    onChange={(event) =>
                      setNewIntakeField((current) => ({
                        ...current,
                        label: event.target.value,
                      }))
                    }
                  />
                </label>

                <label>
                  Field type
                  <select
                    value={newIntakeField.fieldType}
                    onChange={(event) =>
                      setNewIntakeField((current) => ({
                        ...current,
                        fieldType: event.target.value as IntakeFieldType,
                      }))
                    }
                  >
                    {INTAKE_FIELD_TYPE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="workflow-status-checkbox">
                  <input
                    checked={newIntakeField.isRequired}
                    type="checkbox"
                    onChange={(event) =>
                      setNewIntakeField((current) => ({
                        ...current,
                        isRequired: event.target.checked,
                      }))
                    }
                  />
                  Required
                </label>

                <label className="workflow-status-checkbox">
                  <input
                    checked={newIntakeField.showOnCaseDetail}
                    type="checkbox"
                    onChange={(event) =>
                      setNewIntakeField((current) => ({
                        ...current,
                        showOnCaseDetail: event.target.checked,
                      }))
                    }
                  />
                  Show on case detail
                </label>

                <label className="workflow-status-checkbox">
                  <input
                    checked={newIntakeField.isActive}
                    type="checkbox"
                    onChange={(event) =>
                      setNewIntakeField((current) => ({
                        ...current,
                        isActive: event.target.checked,
                      }))
                    }
                  />
                  Active
                </label>

                <button
                  className="primary-button"
                  disabled={
                    createIntakeFieldMutation.isPending ||
                    !newIntakeField.label.trim()
                  }
                  type="submit"
                >
                  {createIntakeFieldMutation.isPending
                    ? "Creating..."
                    : "Create field"}
                </button>
              </form>

              {createIntakeFieldMutation.isError && (
                <div className="form-error">Could not create intake field.</div>
              )}

              <div className="admin-table intake-field-table">
                <div className="admin-table-header">
                  <span>Field</span>
                  <span>Key</span>
                  <span>Type</span>
                  <span>Required</span>
                  <span>Show on case detail</span>
                  <span>Active</span>
                  <span>Actions</span>
                </div>

                {intakeFields.length === 0 ? (
                  <div className="admin-table-row">
                    <strong>No intake fields</strong>
                    <span>Add the first field</span>
                    <span>None</span>
                    <span>No</span>
                    <span>No</span>
                    <span>No</span>
                    <span>Use the form above</span>
                  </div>
                ) : (
                  intakeFields.map((intakeField) => (
                    <div className="intake-field-item" key={intakeField.id}>
                      <div className="admin-table-row">
                        <strong>{intakeField.label}</strong>
                        <span>{intakeField.key}</span>
                        <span>{formatFieldLabel(intakeField.fieldType)}</span>
                        <span>{intakeField.isRequired ? "Yes" : "No"}</span>
                        <span>
                          {intakeField.showOnCaseDetail ? "Shown" : "Hidden"}
                        </span>
                        <span>{intakeField.isActive ? "Active" : "Inactive"}</span>
                        <button
                          className="secondary-button compact"
                          disabled={updateIntakeFieldMutation.isPending}
                          type="button"
                          onClick={() => startEditingIntakeField(intakeField)}
                        >
                          Edit
                        </button>
                      </div>

                      {editingIntakeField?.id === intakeField.id && (
                        <form
                          className="intake-field-edit-form"
                          onSubmit={handleUpdateIntakeField}
                        >
                          <label>
                            Label
                            <input
                              value={editingIntakeField.label}
                              onChange={(event) =>
                                setEditingIntakeField({
                                  ...editingIntakeField,
                                  label: event.target.value,
                                })
                              }
                            />
                          </label>

                          <label>
                            Field type
                            <select
                              value={editingIntakeField.fieldType}
                              onChange={(event) =>
                                setEditingIntakeField({
                                  ...editingIntakeField,
                                  fieldType: event.target
                                    .value as IntakeFieldType,
                                })
                              }
                            >
                              {INTAKE_FIELD_TYPE_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </label>

                          <label>
                            Order
                            <input
                              min="0"
                              type="number"
                              value={editingIntakeField.sortOrder}
                              onChange={(event) =>
                                setEditingIntakeField({
                                  ...editingIntakeField,
                                  sortOrder: event.target.value,
                                })
                              }
                            />
                          </label>

                          <label className="workflow-status-checkbox">
                            <input
                              checked={editingIntakeField.isRequired}
                              type="checkbox"
                              onChange={(event) =>
                                setEditingIntakeField({
                                  ...editingIntakeField,
                                  isRequired: event.target.checked,
                                })
                              }
                            />
                            Required
                          </label>

                          <label className="workflow-status-checkbox">
                            <input
                              checked={editingIntakeField.showOnCaseDetail}
                              type="checkbox"
                              onChange={(event) =>
                                setEditingIntakeField({
                                  ...editingIntakeField,
                                  showOnCaseDetail: event.target.checked,
                                })
                              }
                            />
                            Show on case detail
                          </label>

                          <label className="workflow-status-checkbox">
                            <input
                              checked={editingIntakeField.isActive}
                              type="checkbox"
                              onChange={(event) =>
                                setEditingIntakeField({
                                  ...editingIntakeField,
                                  isActive: event.target.checked,
                                })
                              }
                            />
                            Active
                          </label>

                          <div className="intake-field-edit-actions">
                            <button
                              className="primary-button"
                              disabled={
                                updateIntakeFieldMutation.isPending ||
                                !editingIntakeField.label.trim()
                              }
                              type="submit"
                            >
                              {updateIntakeFieldMutation.isPending
                                ? "Saving..."
                                : "Save"}
                            </button>

                            <button
                              className="secondary-button"
                              disabled={updateIntakeFieldMutation.isPending}
                              type="button"
                              onClick={() => setEditingIntakeField(null)}
                            >
                              Cancel
                            </button>
                          </div>

                          {updateIntakeFieldMutation.isError && (
                            <div className="form-error intake-field-edit-error">
                              Could not update intake field.
                            </div>
                          )}
                        </form>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeSettingsSection === "team" && (
            <>
              <div className="settings-panel">
                <div className="settings-panel-header">
                  <div>
                    <h2>Team Members</h2>
                    <p>People and roles with access to the admin workspace.</p>
                  </div>
                </div>

                <div className="admin-table">
                  <div className="admin-table-header">
                    <span>Name</span>
                    <span>Email</span>
                    <span>Role</span>
                    <span>Open {pluralizeLabel(workspaceCaseLabel).toLowerCase()}</span>
                  </div>

                  {teamMembers.length === 0 ? (
                    <div className="admin-table-row">
                      <strong>No team members</strong>
                      <span>No users found</span>
                      <span>None</span>
                      <span>0</span>
                    </div>
                  ) : (
                    teamMembers.map((teamMember) => (
                      <div className="admin-table-row" key={teamMember.id}>
                        <strong>{teamMember.name}</strong>
                        <span>{teamMember.email}</span>
                        <span>{formatFieldLabel(teamMember.role)}</span>
                        <span>{teamMember.openAssignedCaseCount}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="settings-panel">
                <div className="settings-panel-header">
                  <div>
                    <h2>Notifications</h2>
                    <p>Operational notifications sent to the internal team.</p>
                  </div>
                </div>

                <div className="settings-toggle-list">
                  <label>
                    <input defaultChecked type="checkbox" />
                    Email assigned staff when a new case is created
                  </label>

                  <label>
                    <input defaultChecked type="checkbox" />
                    Notify assignees when internal comments are added
                  </label>

                  <label>
                    <input defaultChecked type="checkbox" />
                    Send a daily summary of urgent and overdue cases
                  </label>
                </div>
              </div>
            </>
          )}

          {activeSettingsSection === "security" && (
            <>
              <div className="settings-panel">
                <div className="settings-panel-header">
                  <div>
                    <h2>Security Controls</h2>
                    <p>Access and compliance settings for the workspace.</p>
                  </div>
                </div>

                <div className="settings-toggle-list">
                  <label>
                    <input type="checkbox" />
                    Require multi-factor authentication for admins
                  </label>

                  <label>
                    <input defaultChecked type="checkbox" />
                    Record activity events for case changes
                  </label>

                  <label>
                    <input defaultChecked type="checkbox" />
                    Restrict customer data exports to admins
                  </label>
                </div>
              </div>

              <div className="settings-panel">
                <div className="settings-panel-header">
                  <div>
                    <h2>Data & API</h2>
                    <p>
                      Operational data policy and environment configuration.
                    </p>
                  </div>
                </div>

                <div className="admin-form-grid">
                  <label>
                    Data region
                    <select defaultValue="ca-central">
                      <option value="ca-central">Canada Central</option>
                      <option value="us-east">US East</option>
                      <option value="us-west">US West</option>
                    </select>
                  </label>

                  <label>
                    Activity retention
                    <select defaultValue="365">
                      <option value="180">180 days</option>
                      <option value="365">365 days</option>
                      <option value="forever">Keep indefinitely</option>
                    </select>
                  </label>

                  <label>
                    API environment
                    <input defaultValue="Local development" />
                  </label>

                  <label>
                    Web origin
                    <input defaultValue="http://localhost:5173" />
                  </label>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </AppShell>
  );
}

function CaseInboxPage() {
  const { caseLabel, caseLabelPlural, customerLabel } = useWorkspaceLabels();
  const { user } = useAuth();
  const canCurrentUserWorkCases = Boolean(user && canWorkCases(user.role));
  const [isCreatingCase, setIsCreatingCase] = useState(false);
  const [search, setSearch] = useState("");
  const [statusSlug, setStatusSlug] = useState("");
  const [priority, setPriority] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [sort, setSort] = useState<CaseSortOption>("updated");

  const filters = useMemo(
    () => ({
      search,
      statusSlug,
      priority,
      categorySlug,
      assignedUserId,
      sort,
    }),
    [search, statusSlug, priority, categorySlug, assignedUserId, sort],
  );

  const {
    data: cases = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cases", filters],
    queryFn: () => fetchCases(filters),
  });

  const {
    data: allCases = [],
    isLoading: isLoadingAllCases,
    isError: isAllCasesError,
  } = useQuery({
    queryKey: ["cases", "operations-overview"],
    queryFn: () => fetchCases(DASHBOARD_CASE_FILTERS),
  });

  const { data: workflowStatuses = [] } = useQuery({
    queryKey: ["settings", "workflow-statuses"],
    queryFn: fetchWorkflowStatuses,
  });

  const { data: caseCategories = [] } = useQuery({
    queryKey: ["settings", "case-categories"],
    queryFn: fetchCaseCategories,
  });

  const { data: assignableUsers = [] } = useQuery({
    queryKey: ["settings", "users"],
    queryFn: fetchAssignableUsers,
  });

  const visibleCases = useMemo(() => {
    const priorityRank: Record<CaseListItem["priority"], number> = {
      urgent: 4,
      high: 3,
      normal: 2,
      low: 1,
    };

    return [...cases]
      .filter((caseItem) =>
        categorySlug ? caseItem.category?.slug === categorySlug : true,
      )
      .sort((a, b) => {
        if (sort === "priority") {
          return priorityRank[b.priority] - priorityRank[a.priority];
        }

        if (sort === "newest") {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }

        if (sort === "oldest") {
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        }

        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      });
  }, [cases, categorySlug, sort]);

  const openCases = allCases.filter((caseItem) => !caseItem.status.isClosed);
  const highPriorityCases = allCases.filter(
    (caseItem) =>
      caseItem.priority === "high" || caseItem.priority === "urgent",
  );
  const waitingCases = allCases.filter(
    (caseItem) => caseItem.status.slug === "waiting-on-customer",
  );
  const unassignedCases = allCases.filter((caseItem) => !caseItem.assignedUser);
  const overdueCases = allCases.filter(
    (caseItem) =>
      caseItem.dueAt &&
      !caseItem.status.isClosed &&
      new Date(caseItem.dueAt).getTime() < Date.now(),
  );

  const statusCounts = allCases.reduce<Record<string, number>>(
    (result, caseItem) => {
      result[caseItem.status.name] = (result[caseItem.status.name] ?? 0) + 1;
      return result;
    },
    {},
  );

  const priorityCounts = allCases.reduce<
    Record<CaseListItem["priority"], number>
  >(
    (result, caseItem) => {
      result[caseItem.priority] += 1;
      return result;
    },
    {
      urgent: 0,
      high: 0,
      normal: 0,
      low: 0,
    },
  );

  const activeFilterCount = [
    search,
    statusSlug,
    priority,
    categorySlug,
    assignedUserId,
  ].filter(Boolean).length;

  const statusFilterOptions = useMemo(
    () =>
      getWorkflowStatusSelectOptions(
        workflowStatuses,
        statusSlug
          ? { slug: statusSlug, name: formatFieldLabel(statusSlug) }
          : null,
      ),
    [statusSlug, workflowStatuses],
  );

  const categoryFilterOptions = useMemo(
    () =>
      caseCategories
        .filter((category) => category.isActive !== false)
        .map((category) => ({
          label: category.name,
          value: category.slug,
        })),
    [caseCategories],
  );

  const resultCount = visibleCases.length;
  const hasOverviewData = !isLoadingAllCases && !isAllCasesError;

  function resetFilters() {
    setSearch("");
    setStatusSlug("");
    setPriority("");
    setCategorySlug("");
    setAssignedUserId("");
    setSort("updated");
  }

  return (
    <AppShell>
      <header className="page-header">
        <div>
          <p className="eyebrow">{caseLabel} Management</p>
          <h1>{caseLabel} Inbox</h1>
          <p className="page-description">
            Triage incoming work, spot stalled {caseLabelPlural.toLowerCase()},
            and keep every {customerLabel.toLowerCase()} request moving through
            the workflow.
          </p>
        </div>

        {canCurrentUserWorkCases && (
          <button
            className="primary-button"
            onClick={() => setIsCreatingCase(true)}
          >
            New {caseLabel}
          </button>
        )}
      </header>

      <section className="ops-metrics-grid" aria-label="Inbox overview">
        <button
          className="ops-metric-card"
          type="button"
          onClick={() => {
            setStatusSlug("");
            setPriority("");
          }}
        >
          <span>Open work</span>
          <strong>{hasOverviewData ? openCases.length : "--"}</strong>
          <small>{caseLabelPlural} not closed</small>
        </button>

        <button
          className="ops-metric-card urgent"
          type="button"
          onClick={() => {
            setPriority("urgent");
            setStatusSlug("");
          }}
        >
          <span>Urgent</span>
          <strong>{hasOverviewData ? priorityCounts.urgent : "--"}</strong>
          <small>Needs first review</small>
        </button>

        <button
          className="ops-metric-card"
          type="button"
          onClick={() => {
            setStatusSlug("waiting-on-customer");
            setPriority("");
          }}
        >
          <span>Waiting</span>
          <strong>{hasOverviewData ? waitingCases.length : "--"}</strong>
          <small>{customerLabel} response needed</small>
        </button>

        <button
          className="ops-metric-card warning"
          type="button"
          onClick={() => {
            setStatusSlug("");
            setPriority("high");
          }}
        >
          <span>High priority</span>
          <strong>{hasOverviewData ? highPriorityCases.length : "--"}</strong>
          <small>High or urgent {caseLabelPlural.toLowerCase()}</small>
        </button>
      </section>

      <div className="ops-inbox-layout">
        <section className="ops-inbox-main">
          <section className="toolbar toolbar-expanded ops-toolbar">
            <div className="toolbar-search">
              <label htmlFor="case-search">Search</label>
              <input
                id="case-search"
                className="search-input"
                placeholder={`Title, description, ${customerLabel.toLowerCase()}...`}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <label className="toolbar-field">
              Status
              <select
                className="filter-select"
                value={statusSlug}
                onChange={(event) => setStatusSlug(event.target.value)}
              >
                <option value="">All statuses</option>
                {statusFilterOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="toolbar-field">
              Priority
              <select
                className="filter-select"
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
              >
                <option value="">All priorities</option>
                {PRIORITY_OPTIONS.map((priorityOption) => (
                  <option
                    key={priorityOption.value}
                    value={priorityOption.value}
                  >
                    {priorityOption.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="toolbar-field">
              Category
              <select
                className="filter-select"
                value={categorySlug}
                onChange={(event) => setCategorySlug(event.target.value)}
              >
                <option value="">All categories</option>
                {categoryFilterOptions.map((categoryOption) => (
                  <option
                    key={categoryOption.value}
                    value={categoryOption.value}
                  >
                    {categoryOption.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="toolbar-field">
              Assignee
              <select
                className="filter-select"
                value={assignedUserId}
                onChange={(event) => setAssignedUserId(event.target.value)}
              >
                <option value="">All assignees</option>
                <option value="unassigned">Unassigned</option>
                {assignableUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="toolbar-field">
              Sort
              <select
                className="filter-select"
                value={sort}
                onChange={(event) =>
                  setSort(event.target.value as CaseSortOption)
                }
              >
                {SORT_OPTIONS.map((sortOption) => (
                  <option key={sortOption.value} value={sortOption.value}>
                    {sortOption.label}
                  </option>
                ))}
              </select>
            </label>
          </section>

          <section className="quick-queue-bar" aria-label="Quick queues">
            <button
              className={!statusSlug && !priority ? "active" : ""}
              type="button"
              onClick={() => {
                setStatusSlug("");
                setPriority("");
              }}
            >
              All
            </button>

            <button
              className={statusSlug === "new" ? "active" : ""}
              type="button"
              onClick={() => {
                setStatusSlug("new");
                setPriority("");
              }}
            >
              New
            </button>

            <button
              className={priority === "urgent" ? "active" : ""}
              type="button"
              onClick={() => {
                setPriority("urgent");
                setStatusSlug("");
              }}
            >
              Urgent
            </button>

            <button
              className={statusSlug === "waiting-on-customer" ? "active" : ""}
              type="button"
              onClick={() => {
                setStatusSlug("waiting-on-customer");
                setPriority("");
              }}
            >
              Waiting
            </button>

            <button
              className={priority === "high" ? "active" : ""}
              type="button"
              onClick={() => {
                setPriority("high");
                setStatusSlug("");
              }}
            >
              High priority
            </button>
          </section>

          <section className="inbox-summary">
            <div>
              {isLoading ? (
                <span>Loading {caseLabelPlural.toLowerCase()}...</span>
              ) : (
                <span>
                  {resultCount}{" "}
                  {resultCount === 1 ? caseLabel : caseLabelPlural} in queue
                </span>
              )}

              {activeFilterCount > 0 && (
                <span className="filter-count">
                  {activeFilterCount} active filter
                  {activeFilterCount === 1 ? "" : "s"}
                </span>
              )}
            </div>

            {activeFilterCount > 0 && (
              <button
                className="secondary-button compact"
                onClick={resetFilters}
              >
                Reset filters
              </button>
            )}
          </section>

      {canCurrentUserWorkCases && isCreatingCase && (
        <NewCaseForm onCancel={() => setIsCreatingCase(false)} />
      )}

          {isLoading && (
            <LoadingState message={`Loading ${caseLabelPlural.toLowerCase()}`} />
          )}

          {isError && (
            <ErrorState
              title={`${caseLabel} inbox unavailable`}
              message="We could not load the current queue. Try refreshing the page."
              error={error}
            />
          )}

          {!isLoading && !isError && visibleCases.length === 0 && (
            <EmptyState
              title={`No ${caseLabelPlural.toLowerCase()} found`}
              message={
                activeFilterCount > 0
                  ? "No work matches the current filters. Clear filters to see the full queue."
                  : `Create a new ${caseLabel.toLowerCase()} when work arrives.`
              }
              action={
                <>
                  {activeFilterCount > 0 && (
                    <button className="secondary-button" onClick={resetFilters}>
                      Clear filters
                    </button>
                  )}

                  {canCurrentUserWorkCases && (
                    <button
                      className="primary-button"
                      onClick={() => setIsCreatingCase(true)}
                    >
                      New {caseLabel}
                    </button>
                  )}
                </>
              }
            />
          )}

          {!isLoading && !isError && visibleCases.length > 0 && (
            <section
              className="operations-list"
              aria-label={`${caseLabel} queue`}
            >
              <div className="operations-list-header">
                <span>{caseLabel}</span>
                <span>{customerLabel}</span>
                <span>Owner</span>
                <span>Signals</span>
              </div>

              {visibleCases.map((caseItem) => (
                <Link
                  className="operations-row"
                  key={caseItem.id}
                  to={`/cases/${caseItem.id}`}
                >
                  <div className="operations-case-cell">
                    <div className="case-top-row">
                      <span className="status-badge">
                        {caseItem.status.name}
                      </span>

                      <span className={`priority-badge ${caseItem.priority}`}>
                        {caseItem.priority}
                      </span>
                    </div>

                    <strong>{caseItem.title}</strong>
                    <p>{caseItem.description ?? "No description provided."}</p>
                  </div>

                  <div className="operations-customer-cell">
                    <strong>{caseItem.customer.name}</strong>
                    <span>{caseItem.customer.email ?? "No email"}</span>
                  </div>

                  <div className="operations-owner-cell">
                    <strong>
                      {caseItem.assignedUser?.name ?? "Unassigned"}
                    </strong>
                    <span>Updated {formatDate(caseItem.updatedAt)}</span>
                  </div>

                  <div className="operations-signal-cell">
                    <span>{getCaseAgeLabel(caseItem.createdAt)}</span>
                    <span
                      className={
                        caseItem.dueAt &&
                        new Date(caseItem.dueAt).getTime() < Date.now()
                          ? "danger"
                          : ""
                      }
                    >
                      {getDueLabel(caseItem.dueAt)}
                    </span>
                    <span>
                      {caseItem.commentCount} comments /{" "}
                      {caseItem.attachmentCount} files
                    </span>
                  </div>
                </Link>
              ))}
            </section>
          )}
        </section>
        <aside className="ops-side-panel" aria-label="Operations signals">
          <section className="ops-panel">
            <div className="panel-header">
              <div>
                <h2>Queue Health</h2>
                <p>Signals that help prioritize the next action.</p>
              </div>
            </div>

            <div className="ops-health-list">
              <div>
                <span>Unassigned</span>
                <strong>
                  {hasOverviewData ? unassignedCases.length : "--"}
                </strong>
              </div>

              <div>
                <span>Overdue</span>
                <strong>{hasOverviewData ? overdueCases.length : "--"}</strong>
              </div>

              <div>
                <span>Waiting</span>
                <strong>{hasOverviewData ? waitingCases.length : "--"}</strong>
              </div>
            </div>
          </section>

          <section className="ops-panel">
            <div className="panel-header">
              <div>
                <h2>Workflow</h2>
                <p>Open workload by current status.</p>
              </div>
            </div>

            <div className="ops-breakdown-list">
              {Object.entries(statusCounts).length === 0 ? (
                <div className="soft-empty">No status data available.</div>
              ) : (
                Object.entries(statusCounts).map(([statusName, count]) => (
                  <div className="ops-breakdown-row" key={statusName}>
                    <span>{statusName}</span>
                    <strong>{count}</strong>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="ops-panel">
            <div className="panel-header">
              <div>
                <h2>Priority Mix</h2>
                <p>How much of the queue needs faster handling.</p>
              </div>
            </div>

            <div className="ops-breakdown-list">
              {PRIORITY_OPTIONS.map((priorityOption) => (
                <div className="ops-breakdown-row" key={priorityOption.value}>
                  <span>{priorityOption.label}</span>
                  <strong>
                    {
                      priorityCounts[
                        priorityOption.value as CaseListItem["priority"]
                      ]
                    }
                  </strong>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </AppShell>
  );
}

function CustomerRecordsPage() {
  const { caseLabel, caseLabelPlural, customerLabel, customerLabelPlural } =
    useWorkspaceLabels();
  const [customerSearch, setCustomerSearch] = useState("");

  const {
    data: customers,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["customers", customerSearch],
    queryFn: () => fetchCustomers(customerSearch),
  });

  return (
    <AppShell>
      <header className="page-header">
        <div>
          <p className="eyebrow">{customerLabel} Records</p>
          <h1>{customerLabelPlural}</h1>
          <p className="page-description">
            View {customerLabel.toLowerCase()} profiles, contact details, and
            recent {caseLabel.toLowerCase()} activity.
          </p>
        </div>
      </header>
      <section className="toolbar">
        <input
          className="search-input"
          placeholder={`Search ${customerLabelPlural.toLowerCase()}...`}
          value={customerSearch}
          onChange={(event) => setCustomerSearch(event.target.value)}
        />
      </section>

      {isLoading && (
        <LoadingState message={`Loading ${customerLabelPlural.toLowerCase()}`} />
      )}

      {isError && (
        <ErrorState
          title={`${customerLabelPlural} unavailable`}
          message="We could not load customer records. Try refreshing the page."
          error={error}
        />
      )}

      {!isLoading && !isError && customers?.length === 0 && (
        <EmptyState
          title={`No ${customerLabelPlural.toLowerCase()} found`}
          message={
            customerSearch
              ? "No records match your search. Try a name, email, or reference."
              : `New ${customerLabelPlural.toLowerCase()} will appear here after ${caseLabelPlural.toLowerCase()} are created.`
          }
          action={
            customerSearch ? (
              <button
                className="secondary-button"
                onClick={() => setCustomerSearch("")}
              >
                Clear search
              </button>
            ) : null
          }
        />
      )}

      {!isLoading && !isError && customers && customers.length > 0 && (
        <section className="customer-list">
          {customers.map((customer) => (
            <article className="customer-card" key={customer.id}>
              <div className="customer-header">
                <div>
                  <h2>
                    <Link
                      className="customer-name-link"
                      to={`/customers/${customer.id}`}
                    >
                      {customer.name}
                    </Link>
                  </h2>
                  <p>
                    {customer.email ?? "No email"} ·{" "}
                    {customer.phone ?? "No phone"}
                  </p>
                </div>

                <div className="customer-case-count">
                  <strong>{customer.caseCount}</strong>
                  <span>
                    {customer.caseCount === 1 ? caseLabel : caseLabelPlural}
                  </span>
                </div>
              </div>

              <div className="customer-meta">
                <span>Reference: {customer.externalReference ?? "None"}</span>
                <span>Updated: {formatDate(customer.updatedAt)}</span>
                <Link className="text-link" to={`/customers/${customer.id}`}>
                  View profile
                </Link>
              </div>

              <div className="recent-case-list">
                <h3>Recent {caseLabelPlural}</h3>

                {customer.recentCases.length === 0 && (
                  <p className="empty-text">
                    No recent {caseLabelPlural.toLowerCase()}.
                  </p>
                )}

                {customer.recentCases.map((caseItem) => (
                  <Link
                    className="recent-case"
                    key={caseItem.id}
                    to={`/cases/${caseItem.id}`}
                  >
                    <div>
                      <strong>{caseItem.title}</strong>
                      <span>Updated {formatDate(caseItem.updatedAt)}</span>
                    </div>

                    <div className="case-top-row">
                      <span className="status-badge">
                        {caseItem.status.name}
                      </span>

                      <span className={`priority-badge ${caseItem.priority}`}>
                        {caseItem.priority}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </section>
      )}
    </AppShell>
  );
}

function CustomerDetailPage() {
  const { caseLabel, caseLabelPlural, customerLabel, customerLabelPlural } =
    useWorkspaceLabels();
  const params = useParams();
  const customerId = params.customerId;

  const {
    data: customer,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["customer", customerId],
    queryFn: () => fetchCustomer(customerId!),
    enabled: Boolean(customerId),
  });

  if (isLoading) {
    return (
      <AppShell>
        <LoadingState message={`Loading ${customerLabel.toLowerCase()}`} />
      </AppShell>
    );
  }

  if (isError || !customer) {
    return (
      <AppShell>
        <ErrorState
          title={`${customerLabel} record unavailable`}
          message={`We could not load this ${customerLabel.toLowerCase()} record. It may have been removed or the connection failed.`}
          error={error}
          action={
            <Link className="secondary-button" to="/customers">
              Back to {customerLabelPlural.toLowerCase()}
            </Link>
          }
        />
      </AppShell>
    );
  }

  const openCases = customer.cases.filter(
    (caseItem) => !caseItem.status.isClosed,
  );
  const closedCases = customer.cases.filter(
    (caseItem) => caseItem.status.isClosed,
  );
  const highPriorityCases = customer.cases.filter(
    (caseItem) =>
      caseItem.priority === "high" || caseItem.priority === "urgent",
  );
  const latestCase = customer.cases[0];

  return (
    <AppShell>
      <Link className="back-link" to="/customers">
        ← Back to {customerLabelPlural.toLowerCase()}
      </Link>

      <header className="record-header">
        <div className="record-header-main">
          <p className="eyebrow">{customerLabel} Record</p>
          <h1>{customer.name}</h1>
          <p className="page-description">
            Contact details, linked {caseLabelPlural.toLowerCase()}, and recent
            workflow history for this {customerLabel.toLowerCase()}.
          </p>
        </div>

        <div className="record-actions">
          <Link className="secondary-button" to="/">
            Open {caseLabel} Inbox
          </Link>
        </div>
      </header>

      <section className="record-summary-grid">
        <div className="summary-card">
          <span>Total {caseLabelPlural.toLowerCase()}</span>
          <strong>{customer.cases.length}</strong>
        </div>

        <div className="summary-card">
          <span>Open {caseLabelPlural.toLowerCase()}</span>
          <strong>{openCases.length}</strong>
        </div>

        <div className="summary-card">
          <span>High priority</span>
          <strong>{highPriorityCases.length}</strong>
        </div>

        <div className="summary-card">
          <span>Last {caseLabel.toLowerCase()} update</span>
          <strong>
            {latestCase
              ? formatDate(latestCase.updatedAt)
              : `No ${caseLabelPlural.toLowerCase()} yet`}
          </strong>
        </div>
      </section>

      <div className="detail-layout customer-detail-layout">
        <section className="detail-main">
          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>Linked {caseLabelPlural}</h2>
                <p>
                  All work items associated with this{" "}
                  {customerLabel.toLowerCase()}.
                </p>
              </div>

              <span className="panel-count">
                {customer.cases.length}{" "}
                {customer.cases.length === 1 ? caseLabel : caseLabelPlural}
              </span>
            </div>

            {customer.cases.length === 0 ? (
              <div className="soft-empty">
                No {caseLabelPlural.toLowerCase()} are linked to this{" "}
                {customerLabel.toLowerCase()} yet.
              </div>
            ) : (
              <div className="customer-case-list">
                {customer.cases.map((caseItem) => (
                  <Link
                    className="customer-case-row"
                    key={caseItem.id}
                    to={`/cases/${caseItem.id}`}
                  >
                    <div className="customer-case-main">
                      <div className="case-top-row">
                        <span className="status-badge">
                          {caseItem.status.name}
                        </span>

                        <span className={`priority-badge ${caseItem.priority}`}>
                          {caseItem.priority}
                        </span>

                        {caseItem.category && (
                          <span className="category-badge">
                            {caseItem.category.name}
                          </span>
                        )}
                      </div>

                      <strong>{caseItem.title}</strong>
                      <p>
                        {caseItem.description ?? "No description provided."}
                      </p>
                    </div>

                    <div className="customer-case-meta">
                      <span>
                        Owner: {caseItem.assignedUser?.name ?? "Unassigned"}
                      </span>
                      <span>Updated: {formatDate(caseItem.updatedAt)}</span>
                      <span>{getDueLabel(caseItem.dueAt)}</span>
                      <span>
                        {caseItem.commentCount} comments /{" "}
                        {caseItem.attachmentCount} files
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <aside className="detail-side">
          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>Profile</h2>
                <p>Primary {customerLabel.toLowerCase()} information.</p>
              </div>
            </div>

            <div className="profile-card">
              <div className="avatar">
                {customer.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <strong>{customer.name}</strong>
                <span>{customer.email ?? "No email"}</span>
              </div>
            </div>

            <div className="key-value-list">
              <div className="key-value-row">
                <span>Email</span>
                <strong>{customer.email ?? "None"}</strong>
              </div>

              <div className="key-value-row">
                <span>Phone</span>
                <strong>{customer.phone ?? "None"}</strong>
              </div>

              <div className="key-value-row">
                <span>Reference</span>
                <strong>{customer.externalReference ?? "None"}</strong>
              </div>

              <div className="key-value-row">
                <span>Created</span>
                <strong>{formatDate(customer.createdAt)}</strong>
              </div>

              <div className="key-value-row">
                <span>Updated</span>
                <strong>{formatDate(customer.updatedAt)}</strong>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>{caseLabel} Summary</h2>
                <p>{customerLabel} workload by current state.</p>
              </div>
            </div>

            <div className="metric-list">
              <div>
                <strong>{openCases.length}</strong>
                <span>Open</span>
              </div>

              <div>
                <strong>{closedCases.length}</strong>
                <span>Closed</span>
              </div>

              <div>
                <strong>{highPriorityCases.length}</strong>
                <span>Priority</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

function CaseDetailPage() {
  const { caseLabel, caseLabelPlural, customerLabel } = useWorkspaceLabels();
  const { user } = useAuth();
  const canCurrentUserWorkCases = Boolean(user && canWorkCases(user.role));
  const params = useParams();
  const queryClient = useQueryClient();
  const caseId = params.caseId;
  const [commentBody, setCommentBody] = useState("");

  const addCommentMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post(`/api/cases/${caseId}/comments`, {
        body: commentBody,
        visibility: "internal",
      });

      return response.data;
    },
    onSuccess: () => {
      setCommentBody("");
      queryClient.invalidateQueries({ queryKey: ["case", caseId] });
      queryClient.invalidateQueries({ queryKey: ["cases"] });
    },
  });

  function handleAddComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!commentBody.trim()) {
      return;
    }

    addCommentMutation.mutate();
  }

  const updateStatusMutation = useMutation({
    mutationFn: async (statusSlug: string) => {
      const response = await api.patch(`/api/cases/${caseId}/status`, {
        statusSlug,
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case", caseId] });
      queryClient.invalidateQueries({ queryKey: ["cases"] });
    },
  });

  const updateAssigneeMutation = useMutation({
    mutationFn: async (assignedUserId: string | null) => {
      const response = await api.patch(`/api/cases/${caseId}/assignee`, {
        assignedUserId,
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case", caseId] });
      queryClient.invalidateQueries({ queryKey: ["cases"] });
    },
  });

  const {
    data: caseItem,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["case", caseId],
    queryFn: () => fetchCase(caseId!),
    enabled: Boolean(caseId),
  });

  const { data: workflowStatuses = [] } = useQuery({
    queryKey: ["settings", "workflow-statuses"],
    queryFn: fetchWorkflowStatuses,
  });

  const { data: intakeFields = [] } = useQuery({
    queryKey: ["settings", "intake-fields"],
    queryFn: fetchIntakeFields,
  });

  const { data: assignableUsers = [], isLoading: isLoadingAssignableUsers } =
    useQuery({
      queryKey: ["settings", "users"],
      queryFn: fetchAssignableUsers,
    });

  if (isLoading) {
    return (
      <AppShell>
        <LoadingState message={`Loading ${caseLabel.toLowerCase()}`} />
      </AppShell>
    );
  }

  if (isError || !caseItem) {
    return (
      <AppShell>
        <ErrorState
          title={`${caseLabel} unavailable`}
          message={`We could not load this ${caseLabel.toLowerCase()}. It may have been removed or the connection failed.`}
          error={error}
          action={
            <Link className="secondary-button" to="/">
              Back to {caseLabelPlural.toLowerCase()}
            </Link>
          }
        />
      </AppShell>
    );
  }

  const intakeFieldByKey = new Map(
    intakeFields.map((field) => [field.key, field]),
  );
  const intakeEntries = Object.entries(caseItem.intakeData ?? {})
    .map(([key, value]) => {
      const field = intakeFieldByKey.get(key);

      if (field && (!field.isActive || field.showOnCaseDetail === false)) {
        return null;
      }

      return {
        key,
        label: field?.label ?? formatFieldLabel(key),
        value,
      };
    })
    .filter(
      (
        entry,
      ): entry is {
        key: string;
        label: string;
        value: unknown;
      } => entry !== null,
    );
  const latestActivity =
    caseItem.activityEvents[caseItem.activityEvents.length - 1];
  const statusOptions = getWorkflowStatusSelectOptions(
    workflowStatuses,
    caseItem.status,
  );

  return (
    <AppShell>
      <Link className="back-link" to="/">
        ← Back to {caseLabelPlural.toLowerCase()}
      </Link>

      <header className="record-header">
        <div className="record-header-main">
          <div className="case-top-row">
            <span className="status-badge">{caseItem.status.name}</span>

            <span className={`priority-badge ${caseItem.priority}`}>
              {caseItem.priority}
            </span>

            {caseItem.category && (
              <span className="category-badge">{caseItem.category.name}</span>
            )}
          </div>

          <h1>{caseItem.title}</h1>

          <p className="page-description">
            {caseItem.description ?? "No description provided."}
          </p>
        </div>

        <div className="record-actions">
          {canCurrentUserWorkCases ? (
            <label>
              Workflow status
              <select
                className="status-select"
                value={caseItem.status.slug}
                disabled={updateStatusMutation.isPending}
                onChange={(event) =>
                  updateStatusMutation.mutate(event.target.value)
                }
              >
                {statusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <div className="readonly-action">
              <span>Workflow status</span>
              <strong>{caseItem.status.name}</strong>
            </div>
          )}
        </div>
      </header>

      {!canCurrentUserWorkCases && (
        <div className="readonly-notice">You have read-only access.</div>
      )}

      <section className="record-summary-grid">
        <div className="summary-card">
          <span>{customerLabel}</span>
          <strong>{caseItem.customer.name}</strong>
        </div>

        <div className="summary-card">
          <span>Assigned to</span>
          <strong>{caseItem.assignedUser?.name ?? "Unassigned"}</strong>
        </div>

        <div className="summary-card">
          <span>Last updated</span>
          <strong>{formatDate(caseItem.updatedAt)}</strong>
        </div>

        <div className="summary-card">
          <span>Activity</span>
          <strong>
            {latestActivity
              ? getActivityMessage(latestActivity)
              : "No activity yet"}
          </strong>
        </div>
      </section>

      <div className="detail-layout">
        <section className="detail-main">
          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>{caseLabel} Overview</h2>
                <p>Core operational details for this work item.</p>
              </div>
            </div>

            <div className="key-value-list">
              <div className="key-value-row">
                <span>{caseLabel} ID</span>
                <strong>{caseItem.id}</strong>
              </div>

              <div className="key-value-row">
                <span>Status</span>
                <strong>{caseItem.status.name}</strong>
              </div>

              <div className="key-value-row">
                <span>Priority</span>
                <strong>{caseItem.priority}</strong>
              </div>

              <div className="key-value-row">
                <span>Category</span>
                <strong>{caseItem.category?.name ?? "Uncategorized"}</strong>
              </div>

              <div className="key-value-row">
                <span>Source</span>
                <strong>{formatSource(caseItem.source)}</strong>
              </div>

              <div className="key-value-row">
                <span>Created</span>
                <strong>{formatDateTime(caseItem.createdAt)}</strong>
              </div>

              <div className="key-value-row">
                <span>Updated</span>
                <strong>{formatDateTime(caseItem.updatedAt)}</strong>
              </div>

              <div className="key-value-row">
                <span>Closed</span>
                <strong>
                  {caseItem.closedAt
                    ? formatDateTime(caseItem.closedAt)
                    : "Open"}
                </strong>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>Intake Data</h2>
                <p>
                  Structured information captured when the{" "}
                  {caseLabel.toLowerCase()} was created.
                </p>
              </div>
            </div>

            {intakeEntries.length === 0 ? (
              <div className="soft-empty">No intake data recorded.</div>
            ) : (
              <div className="key-value-list">
                {intakeEntries.map((entry) => (
                  <div className="key-value-row" key={entry.key}>
                    <span>{entry.label}</span>
                    <strong>{formatValue(entry.value)}</strong>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>Internal Comments</h2>
                <p>
                  Team notes and working context for this{" "}
                  {caseLabel.toLowerCase()}.
                </p>
              </div>

              <span className="panel-count">
                {caseItem.comments.length} comment
                {caseItem.comments.length === 1 ? "" : "s"}
              </span>
            </div>

            {canCurrentUserWorkCases ? (
              <form className="comment-form" onSubmit={handleAddComment}>
                <textarea
                  value={commentBody}
                  onChange={(event) => setCommentBody(event.target.value)}
                  placeholder="Add an internal note..."
                  rows={3}
                />

                <button
                  type="submit"
                  disabled={
                    addCommentMutation.isPending || !commentBody.trim()
                  }
                >
                  {addCommentMutation.isPending ? "Adding..." : "Add Comment"}
                </button>
              </form>
            ) : (
              <div className="soft-empty">Comments are read-only.</div>
            )}

            {caseItem.comments.length === 0 ? (
              <div className="soft-empty">No comments yet.</div>
            ) : (
              caseItem.comments.map((comment) => (
                <div className="comment" key={comment.id}>
                  <div className="comment-header">
                    <strong>
                      {comment.authorUser?.name ??
                        comment.authorCustomer?.name ??
                        "Unknown"}
                    </strong>

                    <span>
                      {comment.visibility} · {formatDateTime(comment.createdAt)}
                    </span>
                  </div>

                  <p>{comment.body}</p>
                </div>
              ))
            )}
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>Activity Timeline</h2>
                <p>
                  Audit trail of important events on this{" "}
                  {caseLabel.toLowerCase()}.
                </p>
              </div>

              <span className="panel-count">
                {caseItem.activityEvents.length} event
                {caseItem.activityEvents.length === 1 ? "" : "s"}
              </span>
            </div>

            {caseItem.activityEvents.length === 0 ? (
              <div className="soft-empty">No activity recorded.</div>
            ) : (
              <div className="timeline">
                {caseItem.activityEvents.map((event) => (
                  <div className="timeline-item" key={event.id}>
                    <div className="timeline-dot" />

                    <div>
                      <strong>{getActivityMessage(event)}</strong>

                      <p>
                        {event.actorUser?.name ??
                          event.actorCustomer?.name ??
                          "System"}{" "}
                        · {formatDateTime(event.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <aside className="detail-side">
          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>{customerLabel}</h2>
                <p>
                  Primary {customerLabel.toLowerCase()} linked to this{" "}
                  {caseLabel.toLowerCase()}.
                </p>
              </div>
            </div>

            <div className="profile-card">
              <div className="avatar">
                {caseItem.customer.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <Link
                  className="customer-name-link"
                  to={`/customers/${caseItem.customer.id}`}
                >
                  {caseItem.customer.name}
                </Link>
                <span>{caseItem.customer.email ?? "No email"}</span>
              </div>
            </div>

            <div className="key-value-list">
              <div className="key-value-row">
                <span>Email</span>
                <strong>{caseItem.customer.email ?? "None"}</strong>
              </div>

              <div className="key-value-row">
                <span>Phone</span>
                <strong>{caseItem.customer.phone ?? "None"}</strong>
              </div>

              <div className="key-value-row">
                <span>Reference</span>
                <strong>{caseItem.customer.externalReference ?? "None"}</strong>
              </div>
            </div>

            <Link
              className="secondary-button full-width-action"
              to={`/customers/${caseItem.customer.id}`}
            >
              View {customerLabel.toLowerCase()} record
            </Link>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>Ownership</h2>
                <p>Internal responsibility and workflow state.</p>
              </div>
            </div>

            <div className="key-value-list">
              <div className="key-value-row">
                <span>Assigned to</span>
                {canCurrentUserWorkCases ? (
                  <select
                    className="assignee-select"
                    disabled={
                      isLoadingAssignableUsers ||
                      updateAssigneeMutation.isPending
                    }
                    value={caseItem.assignedUser?.id ?? ""}
                    onChange={(event) =>
                      updateAssigneeMutation.mutate(event.target.value || null)
                    }
                  >
                    <option value="">Unassigned</option>
                    {assignableUsers.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <strong>{caseItem.assignedUser?.name ?? "Unassigned"}</strong>
                )}
              </div>

              <div className="key-value-row">
                <span>Assignee role</span>
                <strong>
                  {updateAssigneeMutation.isPending
                    ? "Saving..."
                    : caseItem.assignedUser?.role ?? "None"}
                </strong>
              </div>

              <div className="key-value-row">
                <span>Status closed?</span>
                <strong>{caseItem.status.isClosed ? "Yes" : "No"}</strong>
              </div>

              <div className="key-value-row">
                <span>Due date</span>
                <strong>
                  {caseItem.dueAt ? formatDate(caseItem.dueAt) : "No due date"}
                </strong>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>{caseLabel} Assets</h2>
                <p>Files and linked work history.</p>
              </div>
            </div>

            <div className="metric-list">
              <div>
                <strong>{caseItem.comments.length}</strong>
                <span>Comments</span>
              </div>

              <div>
                <strong>{caseItem.attachmentCount}</strong>
                <span>Files</span>
              </div>

              <div>
                <strong>{caseItem.activityEvents.length}</strong>
                <span>Events</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [email, setEmail] = useState("owner@maplecare.test");
  const [password, setPassword] = useState("Password123!");

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (loggedInUser) => {
      login(loggedInUser);
      navigate("/");
    },
  });

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    loginMutation.mutate({
      email,
      password,
    });
  }

  if (user) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleLogin}>
        <div>
          <p className="eyebrow">Core Login</p>
          <h1>Sign in</h1>
          <p className="page-description">
            Use a demo user to personalize the workspace.
          </p>
        </div>

        <label>
          Email
          <input
            autoComplete="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label>
          Password
          <input
            autoComplete="current-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        {loginMutation.isError && (
          <div className="form-error">
            Could not sign in. Check the email and password.
          </div>
        )}

        <button
          className="primary-button"
          disabled={loginMutation.isPending || !email || !password}
          type="submit"
        >
          {loginMutation.isPending ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}

function getDefaultAllowedPath(role: AppRole) {
  if (canWorkCases(role)) return "/";
  if (canViewReports(role)) return "/reports";
  return "/login";
}

function AccessDeniedPage({ user }: { user: AuthUser }) {
  const allowedPath = getDefaultAllowedPath(user.role);

  return (
    <AppShell>
      <div className="state-card access-denied-card">
        <h2>Access denied</h2>
        <p>
          You are signed in as {user.name} with the{" "}
          {formatFieldLabel(user.role)} role. This page needs a different level
          of access.
        </p>
        <Link className="primary-button" to={allowedPath}>
          Go to an allowed page
        </Link>
      </div>
    </AppShell>
  );
}

function RequirePermission({
  children,
  allowed,
}: {
  children: React.ReactNode;
  allowed: (role: AppRole) => boolean;
}) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate replace to="/login" />;
  }

  if (!allowed(user.role)) {
    return <AccessDeniedPage user={user} />;
  }

  return children;
}

function App() {
  const [user, setUser] = useState<AuthUser | null>(() => readStoredAuthUser());

  const authValue = useMemo<AuthContextValue>(
    () => ({
      user,
      login: (loggedInUser) => {
        window.localStorage.setItem(
          AUTH_STORAGE_KEY,
          JSON.stringify(loggedInUser),
        );
        setUser(loggedInUser);
      },
      logout: () => {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
        setUser(null);
      },
    }),
    [user],
  );

  return (
    <AuthContext.Provider value={authValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <RequirePermission allowed={canWorkCases}>
                <DashboardPage />
              </RequirePermission>
            }
          />
          <Route
            path="/reports"
            element={
              <RequirePermission allowed={canViewReports}>
                <ReportsPage />
              </RequirePermission>
            }
          />
          <Route
            path="/settings"
            element={
              <RequirePermission allowed={canManageSettings}>
                <SettingsPage />
              </RequirePermission>
            }
          />
          <Route
            path="/"
            element={
              <RequirePermission allowed={canWorkCases}>
                <CaseInboxPage />
              </RequirePermission>
            }
          />
          <Route
            path="/customers"
            element={
              <RequirePermission allowed={canWorkCases}>
                <CustomerRecordsPage />
              </RequirePermission>
            }
          />
          <Route
            path="/customers/:customerId"
            element={
              <RequirePermission allowed={canWorkCases}>
                <CustomerDetailPage />
              </RequirePermission>
            }
          />
          <Route
            path="/cases/:caseId"
            element={
              <RequirePermission allowed={canWorkCases}>
                <CaseDetailPage />
              </RequirePermission>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
