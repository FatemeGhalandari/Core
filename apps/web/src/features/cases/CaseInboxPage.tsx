import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "../../components/AppShell";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "../../components/StateCards";
import { canWorkCases, useAuth } from "../auth/auth";
import {
  fetchAssignableUsers,
  fetchCaseCategories,
  fetchWorkflowStatuses,
} from "../settings/settingsApi";
import { useWorkspaceLabels } from "../workspace/workspaceLabels";
import {
  fetchCases,
  type CaseListFilters,
  type CaseListItem,
  type CaseSortOption,
} from "./caseApi";
import {
  formatDate,
  formatFieldLabel,
  getCaseAgeLabel,
  getDueLabel,
  getWorkflowStatusSelectOptions,
} from "./caseUtils";
import { NewCaseForm } from "./NewCaseForm";

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

const OVERVIEW_CASE_FILTERS: CaseListFilters = {
  search: "",
  statusSlug: "",
  priority: "",
  categorySlug: "",
  assignedUserId: "",
  sort: "updated",
};
export function CaseInboxPage() {
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

  const isDefaultCaseQuery =
    !search &&
    !statusSlug &&
    !priority &&
    !categorySlug &&
    !assignedUserId &&
    sort === "updated";

  const {
    data: cases = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: isDefaultCaseQuery
      ? ["cases", "operations-overview"]
      : ["cases", filters],
    queryFn: () => fetchCases(filters),
  });

  const {
    data: allCases = [],
    isLoading: isLoadingAllCases,
    isError: isAllCasesError,
  } = useQuery({
    queryKey: ["cases", "operations-overview"],
    queryFn: () => fetchCases(OVERVIEW_CASE_FILTERS),
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
            <LoadingState
              message={`Loading ${caseLabelPlural.toLowerCase()}`}
            />
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
