import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppShell } from "../../components/AppShell";
import { EmptyState, ErrorState, LoadingState } from "../../components/StateCards";
import {
  formatDate,
  getDueLabel,
} from "../cases/caseUtils";
import { useWorkspaceLabels } from "../workspace/workspaceLabels";
import { fetchCustomer, fetchCustomers } from "./customerApi";

export function CustomerRecordsPage() {
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
        <LoadingState
          message={`Loading ${customerLabelPlural.toLowerCase()}`}
        />
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
                type="button"
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
                    {customer.email ?? "No email"} /{" "}
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

export function CustomerDetailPage() {
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
        Back to {customerLabelPlural.toLowerCase()}
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
          <Link className="secondary-button" to="/cases">
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
