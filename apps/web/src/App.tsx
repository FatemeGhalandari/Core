import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
  useParams,
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

const STATUS_OPTIONS = [
  { label: "New", value: "new" },
  { label: "In Review", value: "in-review" },
  { label: "Waiting on Customer", value: "waiting-on-customer" },
  { label: "Closed", value: "closed" },
];

const PRIORITY_OPTIONS = [
  { label: "Low", value: "low" },
  { label: "Normal", value: "normal" },
  { label: "High", value: "high" },
  { label: "Urgent", value: "urgent" },
];

const CATEGORY_OPTIONS = [
  { label: "All categories", value: "" },
  { label: "General Appointment", value: "general-appointment" },
];

const SORT_OPTIONS = [
  { label: "Recently updated", value: "updated" },
  { label: "Newest created", value: "newest" },
  { label: "Oldest created", value: "oldest" },
  { label: "Priority", value: "priority" },
] as const;

type CaseSortOption = (typeof SORT_OPTIONS)[number]["value"];

type CaseListFilters = {
  search: string;
  statusSlug: string;
  priority: string;
  categorySlug: string;
  sort: CaseSortOption;
};

const DASHBOARD_CASE_FILTERS: CaseListFilters = {
  search: "",
  statusSlug: "",
  priority: "",
  categorySlug: "",
  sort: "updated",
};

async function fetchCases(filters?: Partial<CaseListFilters>) {
  const response = await api.get<CasesResponse>("/api/cases", {
    params: {
      search: filters?.search || undefined,
      statusSlug: filters?.statusSlug || undefined,
      priority: filters?.priority || undefined,
      assignedUserId: undefined,
    },
  });

  return response.data.data;
}

async function fetchCase(caseId: string) {
  const response = await api.get<CaseDetailResponse>(`/api/cases/${caseId}`);
  return response.data.data;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
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
    const assignedTo = event.metadata.assignedTo;

    if (typeof assignedTo === "string") {
      return `Assigned to ${assignedTo}`;
    }

    return "Case assigned";
  }

  return formatFieldLabel(event.eventType);
}

function AppShell({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const isDashboardActive = location.pathname === "/dashboard";
  const isCasesActive =
    location.pathname === "/" || location.pathname.startsWith("/cases");

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">C</div>
          <div>
            <div className="brand-name">Core</div>
            <div className="brand-subtitle">Workflow Platform</div>
          </div>
        </div>

        <nav className="nav">
          <Link
            className={`nav-item ${isDashboardActive ? "active" : ""}`}
            to="/dashboard"
          >
            Dashboard
          </Link>

          <Link className={`nav-item ${isCasesActive ? "active" : ""}`} to="/">
            Cases
          </Link>

          <a className="nav-item" href="#">
            Customers
          </a>

          <a className="nav-item" href="#">
            Reports
          </a>

          <a className="nav-item" href="#">
            Settings
          </a>
        </nav>
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
        <div className="state-card">Loading dashboard...</div>
      </AppShell>
    );
  }

  if (isError) {
    return (
      <AppShell>
        <div className="state-card error">
          <h2>Could not load dashboard</h2>
          <pre>{error instanceof Error ? error.message : "Unknown error"}</pre>
        </div>
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
            case activity across the workspace.
          </p>
        </div>

        <Link className="primary-button" to="/">
          Open Case Inbox
        </Link>
      </header>

      <section className="dashboard-metrics-grid">
        <DashboardMetricCard
          label="Open cases"
          value={openCases.length}
          description="Active work still moving through the workflow."
        />

        <DashboardMetricCard
          label="High priority"
          value={highPriorityCases.length}
          description="Cases marked high or urgent."
        />

        <DashboardMetricCard
          label="New this week"
          value={newThisWeekCases.length}
          description="Cases created in the last 7 days."
        />

        <DashboardMetricCard
          label="Unassigned"
          value={unassignedCases.length}
          description="Cases without an internal owner."
        />
      </section>

      <section className="dashboard-secondary-grid">
        <DashboardListCard
          title="Workflow Status"
          description="Current case distribution by workflow stage."
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
          title="Case Categories"
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
              <span>Waiting on customer</span>
            </div>

            <div>
              <strong>{highPriorityCases.length}</strong>
              <span>High or urgent priority</span>
            </div>

            <div>
              <strong>{unassignedCases.length}</strong>
              <span>Unassigned cases</span>
            </div>

            <div>
              <strong>{closedCases.length}</strong>
              <span>Closed cases</span>
            </div>
          </div>
        </DashboardListCard>

        <DashboardListCard
          title="Recent Updates"
          description="Latest case activity by last updated timestamp."
        >
          {recentlyUpdatedCases.length === 0 ? (
            <div className="soft-empty">No recent cases found.</div>
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

function CaseInboxPage() {
  const [isCreatingCase, setIsCreatingCase] = useState(false);
  const [search, setSearch] = useState("");
  const [statusSlug, setStatusSlug] = useState("");
  const [priority, setPriority] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [sort, setSort] = useState<CaseSortOption>("updated");

  const filters = useMemo(
    () => ({
      search,
      statusSlug,
      priority,
      categorySlug,
      sort,
    }),
    [search, statusSlug, priority, categorySlug, sort],
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

  const activeFilterCount = [search, statusSlug, priority, categorySlug].filter(
    Boolean,
  ).length;

  function resetFilters() {
    setSearch("");
    setStatusSlug("");
    setPriority("");
    setCategorySlug("");
    setSort("updated");
  }

  return (
    <AppShell>
      <header className="page-header">
        <div>
          <p className="eyebrow">Case Management</p>
          <h1>Case Inbox</h1>
          <p className="page-description">
            Review, assign, and track customer requests from intake to
            resolution.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setIsCreatingCase(true)}
        >
          New Case
        </button>
      </header>

      <section className="toolbar toolbar-expanded">
        <div className="toolbar-search">
          <label htmlFor="case-search">Search</label>
          <input
            id="case-search"
            className="search-input"
            placeholder="Search title, description, customer..."
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
            {STATUS_OPTIONS.map((status) => (
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
              <option key={priorityOption.value} value={priorityOption.value}>
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
            {CATEGORY_OPTIONS.map((categoryOption) => (
              <option key={categoryOption.value} value={categoryOption.value}>
                {categoryOption.label}
              </option>
            ))}
          </select>
        </label>

        <label className="toolbar-field">
          Sort
          <select
            className="filter-select"
            value={sort}
            onChange={(event) => setSort(event.target.value as CaseSortOption)}
          >
            {SORT_OPTIONS.map((sortOption) => (
              <option key={sortOption.value} value={sortOption.value}>
                {sortOption.label}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="inbox-summary">
        <div>
          {isLoading ? (
            <span>Loading cases...</span>
          ) : (
            <span>
              {cases.length} case{cases.length === 1 ? "" : "s"} found
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
          <button className="secondary-button" onClick={resetFilters}>
            Reset filters
          </button>
        )}
      </section>

      {isCreatingCase && (
        <NewCaseForm onCancel={() => setIsCreatingCase(false)} />
      )}

      {isLoading && <div className="state-card">Loading cases...</div>}

      {isError && (
        <div className="state-card error">
          <h2>Something went wrong</h2>
          <pre>{error instanceof Error ? error.message : "Unknown error"}</pre>
        </div>
      )}

      {!isLoading && !isError && cases.length === 0 && (
        <div className="state-card empty-state">
          <h2>No cases found</h2>
          <p>
            No work items match the current search and filters. Clear the
            filters or create a new case.
          </p>

          <div className="empty-actions">
            {activeFilterCount > 0 && (
              <button className="secondary-button" onClick={resetFilters}>
                Clear filters
              </button>
            )}

            <button
              className="primary-button"
              onClick={() => setIsCreatingCase(true)}
            >
              New Case
            </button>
          </div>
        </div>
      )}

      {!isLoading && !isError && cases.length > 0 && (
        <section className="case-list">
          {cases.map((caseItem) => (
            <Link
              className="case-card case-card-link"
              key={caseItem.id}
              to={`/cases/${caseItem.id}`}
            >
              <div className="case-main">
                <div className="case-top-row">
                  <span className="status-badge">{caseItem.status.name}</span>

                  <span className={`priority-badge ${caseItem.priority}`}>
                    {caseItem.priority}
                  </span>

                  {caseItem.category && (
                    <span className="category-badge">
                      {caseItem.category.name}
                    </span>
                  )}
                </div>

                <h2>{caseItem.title}</h2>

                <p className="case-description">
                  {caseItem.description ?? "No description provided."}
                </p>

                <div className="case-meta">
                  <span>Customer: {caseItem.customer.name}</span>
                  <span>
                    Assigned: {caseItem.assignedUser?.name ?? "Unassigned"}
                  </span>
                  <span>Updated: {formatDate(caseItem.updatedAt)}</span>
                </div>
              </div>

              <div className="case-side">
                <span>{caseItem.commentCount} comments</span>
                <span>{caseItem.attachmentCount} files</span>
              </div>
            </Link>
          ))}
        </section>
      )}
    </AppShell>
  );
}

function CaseDetailPage() {
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

  if (isLoading) {
    return (
      <AppShell>
        <div className="state-card">Loading case...</div>
      </AppShell>
    );
  }

  if (isError || !caseItem) {
    return (
      <AppShell>
        <div className="state-card error">
          <h2>Could not load case</h2>
          <pre>{error instanceof Error ? error.message : "Unknown error"}</pre>
        </div>
      </AppShell>
    );
  }

  const intakeEntries = Object.entries(caseItem.intakeData ?? {});
  const latestActivity =
    caseItem.activityEvents[caseItem.activityEvents.length - 1];

  return (
    <AppShell>
      <Link className="back-link" to="/">
        ← Back to cases
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
              {STATUS_OPTIONS.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </header>

      <section className="record-summary-grid">
        <div className="summary-card">
          <span>Customer</span>
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
                <h2>Case Overview</h2>
                <p>Core operational details for this work item.</p>
              </div>
            </div>

            <div className="key-value-list">
              <div className="key-value-row">
                <span>Case ID</span>
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
                  Structured information captured when the case was created.
                </p>
              </div>
            </div>

            {intakeEntries.length === 0 ? (
              <div className="soft-empty">No intake data recorded.</div>
            ) : (
              <div className="key-value-list">
                {intakeEntries.map(([key, value]) => (
                  <div className="key-value-row" key={key}>
                    <span>{formatFieldLabel(key)}</span>
                    <strong>{formatValue(value)}</strong>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>Internal Comments</h2>
                <p>Team notes and working context for this case.</p>
              </div>

              <span className="panel-count">
                {caseItem.comments.length} comment
                {caseItem.comments.length === 1 ? "" : "s"}
              </span>
            </div>

            <form className="comment-form" onSubmit={handleAddComment}>
              <textarea
                value={commentBody}
                onChange={(event) => setCommentBody(event.target.value)}
                placeholder="Add an internal note..."
                rows={3}
              />

              <button
                type="submit"
                disabled={addCommentMutation.isPending || !commentBody.trim()}
              >
                {addCommentMutation.isPending ? "Adding..." : "Add Comment"}
              </button>
            </form>

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
                <p>Audit trail of important events on this case.</p>
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
                <h2>Customer</h2>
                <p>Primary customer linked to this case.</p>
              </div>
            </div>

            <div className="profile-card">
              <div className="avatar">
                {caseItem.customer.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <strong>{caseItem.customer.name}</strong>
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
                <strong>{caseItem.assignedUser?.name ?? "Unassigned"}</strong>
              </div>

              <div className="key-value-row">
                <span>Assignee role</span>
                <strong>{caseItem.assignedUser?.role ?? "None"}</strong>
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
                <h2>Case Assets</h2>
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/" element={<CaseInboxPage />} />
        <Route path="/cases/:caseId" element={<CaseDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
