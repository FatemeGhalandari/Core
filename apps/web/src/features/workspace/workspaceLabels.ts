import { useQuery } from "@tanstack/react-query";
import {
  fetchWorkspaceProfile,
  type WorkspaceProfile,
} from "../settings/settingsApi";

export function pluralizeLabel(value: string) {
  if (value.endsWith("y")) {
    return `${value.slice(0, -1)}ies`;
  }

  if (value.endsWith("s")) {
    return value;
  }

  return `${value}s`;
}

export function getWorkspaceLabels(
  workspaceProfile: WorkspaceProfile | undefined,
) {
  const appName = workspaceProfile?.appName ?? "Core";
  const caseLabel = workspaceProfile?.caseLabel ?? "Case";
  const customerLabel = workspaceProfile?.customerLabel ?? "Customer";
  const industryTemplateKey = workspaceProfile?.industryTemplateKey ?? "";

  return {
    appName,
    caseLabel,
    caseLabelPlural: pluralizeLabel(caseLabel),
    customerLabel,
    customerLabelPlural: pluralizeLabel(customerLabel),
    industryTemplateKey,
    isCleaningTemplate: industryTemplateKey === "cleaning",
  };
}

export function useWorkspaceLabels() {
  const { data: workspaceProfile } = useQuery({
    queryKey: ["settings", "workspace"],
    queryFn: fetchWorkspaceProfile,
  });

  return getWorkspaceLabels(workspaceProfile);
}
