import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { AppShell } from "../../components/AppShell";
import {
  DashboardListCard,
  DashboardMetricCard,
} from "../../components/DashboardCards";
import { ErrorState, LoadingState } from "../../components/StateCards";
import { fetchOperationsReport, type ReportBreakdownData } from "./reportsApi";
import { useWorkspaceLabels } from "../workspace/workspaceLabels";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
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

export function ReportsPage() {
  const {
    caseLabel,
    caseLabelPlural,
    customerLabel,
    customerLabelPlural,
    isCleaningTemplate,
  } = useWorkspaceLabels();

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
            {customerLabel.toLowerCase()} coverage, and workflow risk across the
            workspace.
          </p>
        </div>

        <div className="page-actions">
          <Link className="secondary-button" to="/">
            Dashboard
          </Link>

          <Link className="primary-button" to="/cases">
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
          title={isCleaningTemplate ? "Crew Workload" : "Owner Workload"}
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
