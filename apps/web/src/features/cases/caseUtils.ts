import type { WorkflowStatusSetting } from "../settings/settingsApi";

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function getAgeInDays(value: string) {
  const createdAt = new Date(value).getTime();
  const now = Date.now();
  const dayInMs = 1000 * 60 * 60 * 24;

  return Math.max(0, Math.floor((now - createdAt) / dayInMs));
}

export function getCaseAgeLabel(value: string) {
  const ageInDays = getAgeInDays(value);

  if (ageInDays === 0) return "Opened today";
  if (ageInDays === 1) return "Open 1 day";

  return `Open ${ageInDays} days`;
}

export function getDueLabel(value: string | null) {
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

export function formatSource(value: string | null | undefined) {
  if (!value) return "Unknown";

  return value
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function formatValue(value: unknown) {
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

export function formatFieldLabel(value: string) {
  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function getActivityMessage(event: {
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

export function getWorkflowStatusSelectOptions(
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