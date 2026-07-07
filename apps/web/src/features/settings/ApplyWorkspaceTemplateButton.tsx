import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";

type ApplyWorkspaceTemplateButtonProps = {
  industryTemplateKey: string;
  templateName?: string;
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

async function applyWorkspaceTemplate(industryTemplateKey: string) {
  const response = await api.post<WorkspaceProfileResponse>(
    "/api/settings/workspace/apply-template",
    {
      industryTemplateKey,
    },
  );

  return response.data.data;
}

export function ApplyWorkspaceTemplateButton({
  industryTemplateKey,
  templateName,
}: ApplyWorkspaceTemplateButtonProps) {
  const queryClient = useQueryClient();
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const trimmedTemplateKey = industryTemplateKey.trim();

  useEffect(() => {
    setStatusMessage("");
    setErrorMessage("");
  }, [trimmedTemplateKey]);

  const applyWorkspaceTemplateMutation = useMutation({
    mutationFn: applyWorkspaceTemplate,
    onSuccess: (workspaceProfile) => {
      queryClient.setQueryData(["settings", "workspace"], workspaceProfile);
      queryClient.invalidateQueries({ queryKey: ["settings", "workspace"] });
      queryClient.invalidateQueries({
        queryKey: ["settings", "workflow-statuses"],
      });
      queryClient.invalidateQueries({
        queryKey: ["settings", "case-categories"],
      });
      queryClient.invalidateQueries({
        queryKey: ["settings", "intake-fields"],
      });
      queryClient.invalidateQueries({
        queryKey: ["settings", "demo-organizations"],
      });
      queryClient.invalidateQueries({ queryKey: ["cases"] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      setErrorMessage("");
      setStatusMessage(
        `${templateName ?? "Template"} applied. Workspace labels and setup have been refreshed.`,
      );
    },
    onError: () => {
      setStatusMessage("");
      setErrorMessage("Could not apply this template. Try again.");
    },
  });

  function handleApplyTemplate() {
    if (!trimmedTemplateKey || applyWorkspaceTemplateMutation.isPending) {
      return;
    }

    setStatusMessage("");
    setErrorMessage("");

    const confirmed = window.confirm(
      `Apply ${templateName ?? "this template"} to this workspace? This will add or update labels, statuses, categories, and intake fields without deleting existing setup.`,
    );

    if (!confirmed) {
      return;
    }

    applyWorkspaceTemplateMutation.mutate(trimmedTemplateKey);
  }

  return (
    <div className="template-apply-control">
      <button
        className="secondary-button"
        disabled={
          applyWorkspaceTemplateMutation.isPending || !trimmedTemplateKey
        }
        type="button"
        onClick={handleApplyTemplate}
      >
        {applyWorkspaceTemplateMutation.isPending
          ? "Applying..."
          : "Apply template"}
      </button>

      {statusMessage && (
        <span className="template-apply-message success">{statusMessage}</span>
      )}

      {errorMessage && (
        <span className="template-apply-message error">{errorMessage}</span>
      )}
    </div>
  );
}
