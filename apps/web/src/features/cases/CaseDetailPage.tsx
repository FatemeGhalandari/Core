import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppShell } from "../../components/AppShell";
import { ErrorState, LoadingState } from "../../components/StateCards";
import { api } from "../../lib/api";
import { canWorkCases, useAuth } from "../auth/auth";
import {
  fetchAssignableUsers,
  fetchIntakeFields,
  fetchWorkflowStatuses,
} from "../settings/settingsApi";
import { useWorkspaceLabels } from "../workspace/workspaceLabels";
import { fetchCase } from "./caseApi";
import {
  formatDate,
  formatDateTime,
  formatFieldLabel,
  formatSource,
  formatValue,
  getActivityMessage,
  getWorkflowStatusSelectOptions,
} from "./caseUtils";
export function CaseDetailPage() {
  const { caseLabel, caseLabelPlural, customerLabel, isCleaningTemplate } =
    useWorkspaceLabels();
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
        Back to {caseLabelPlural.toLowerCase()}
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
                <p>
                  {isCleaningTemplate
                    ? "Operational details for this cleaning job."
                    : "Core operational details for this work item."}
                </p>
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
                  disabled={addCommentMutation.isPending || !commentBody.trim()}
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
                      {comment.visibility} / {formatDateTime(comment.createdAt)}
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
                        / {formatDateTime(event.createdAt)}
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
                    : (caseItem.assignedUser?.role ?? "None")}
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
