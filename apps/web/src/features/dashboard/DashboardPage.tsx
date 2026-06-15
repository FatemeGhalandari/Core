import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { AppShell } from "../../components/AppShell";
import {
  DashboardListCard,
  DashboardMetricCard,
} from "../../components/DashboardCards";
import { ErrorState, LoadingState } from "../../components/StateCards";
import { fetchCases } from "../cases/caseApi";
import { useWorkspaceLabels } from "../workspace/workspaceLabels";

const DASHBOARD_CASE_FILTERS = {
  search: "",
  statusSlug: "",
  priority: "",
  categorySlug: "",
  assignedUserId: "",
  sort: "updated" as const,
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function DashboardPage() {
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
      const categoryName = caseItem.category?.name ?? "Uncategorized";
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

          <Link className="primary-button" to="/cases">
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
