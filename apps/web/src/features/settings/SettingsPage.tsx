import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "../../components/AppShell";
import {
  getDemoOrganizationSlug,
  setDemoOrganizationSlug,
} from "../../lib/api";
import { ErrorState, LoadingState } from "../../components/StateCards";
import { fetchCases, type CaseListFilters } from "../cases/caseApi";
import { formatFieldLabel } from "../cases/caseUtils";
import { fetchCustomers } from "../customers/customerApi";
import { useAuth } from "../auth/auth";
import { pluralizeLabel } from "../workspace/workspaceLabels";
import {
  createCaseCategory,
  createIntakeField,
  createWorkflowStatus,
  fetchCaseCategories,
  fetchDemoOrganizations,
  fetchIndustryTemplates,
  fetchIntakeFields,
  fetchTeamMembers,
  fetchWorkflowStatuses,
  fetchWorkspaceProfile,
  updateCaseCategory,
  updateIntakeField,
  updateWorkflowStatus,
  updateWorkspaceProfile,
  type CaseCategoryEditForm,
  type CaseCategorySetting,
  type DemoOrganization,
  type IntakeFieldCreateForm,
  type IntakeFieldEditForm,
  type IntakeFieldSetting,
  type IntakeFieldType,
  type WorkflowStatusEditForm,
  type WorkflowStatusSetting,
  type WorkspaceProfile,
  type WorkspaceProfileForm,
} from "./settingsApi";

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

const DASHBOARD_CASE_FILTERS: CaseListFilters = {
  search: "",
  statusSlug: "",
  priority: "",
  categorySlug: "",
  assignedUserId: "",
  sort: "updated",
};

export function SettingsPage() {
  const queryClient = useQueryClient();
  const { login } = useAuth();
  const [activeSettingsSection, setActiveSettingsSection] =
    useState("workspace");
  const [selectedDemoSlug, setSelectedDemoSlug] = useState(() =>
    getDemoOrganizationSlug(),
  );
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
  const [newIntakeField, setNewIntakeField] = useState<IntakeFieldCreateForm>({
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

  const { data: demoOrganizations = [], isLoading: isLoadingDemoOrganizations } =
    useQuery({
      queryKey: ["settings", "demo-organizations"],
      queryFn: fetchDemoOrganizations,
      retry: false,
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
    isLoadingDemoOrganizations ||
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

  useEffect(() => {
    if (!workspaceProfile?.slug || selectedDemoSlug === workspaceProfile.slug) {
      return;
    }

    if (
      workspaceProfileForm.industryTemplateKey &&
      workspaceProfileForm.industryTemplateKey !==
        (workspaceProfile.industryTemplateKey ?? "")
    ) {
      return;
    }

    setSelectedDemoSlug(workspaceProfile.slug);
    setDemoOrganizationSlug(workspaceProfile.slug);
  }, [
    selectedDemoSlug,
    workspaceProfile?.industryTemplateKey,
    workspaceProfile?.slug,
    workspaceProfileForm.industryTemplateKey,
  ]);

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
    onSuccess: (workspaceProfile) => {
      queryClient.setQueryData(["settings", "workspace"], workspaceProfile);
      queryClient.setQueryData(
        ["settings", "demo-organizations"],
        (currentOrganizations: typeof demoOrganizations | undefined) =>
          currentOrganizations?.map((organization) =>
            organization.id === workspaceProfile.id
              ? {
                  ...organization,
                  name: workspaceProfile.name,
                  slug: workspaceProfile.slug,
                  appName: workspaceProfile.appName,
                  caseLabel: workspaceProfile.caseLabel,
                  customerLabel: workspaceProfile.customerLabel,
                  industryTemplateKey: workspaceProfile.industryTemplateKey,
                }
              : organization,
          ),
      );
      setSelectedDemoSlug(workspaceProfile.slug);
      setDemoOrganizationSlug(workspaceProfile.slug);
      queryClient.invalidateQueries({
        queryKey: ["settings", "workspace"],
      });
      queryClient.invalidateQueries({
        queryKey: ["settings", "demo-organizations"],
      });
      queryClient.invalidateQueries({
        queryKey: ["settings", "workflow-statuses"],
      });
      queryClient.invalidateQueries({
        queryKey: ["settings", "case-categories"],
      });
      queryClient.invalidateQueries({
        queryKey: ["settings", "intake-fields"],
      });
      queryClient.invalidateQueries({ queryKey: ["cases"] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["reports"] });
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
    const industryTemplateKey = workspaceProfileForm.industryTemplateKey.trim();

    if (!appName || !caseLabel || !customerLabel) {
      return;
    }

    const matchingDemoOrganization =
      findDemoOrganizationForTemplate(industryTemplateKey);

    if (
      matchingDemoOrganization &&
      matchingDemoOrganization.id !== workspaceProfile?.id
    ) {
      selectDemoOrganization(matchingDemoOrganization);
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

  function findDemoOrganizationForTemplate(industryTemplateKey: string) {
    if (!industryTemplateKey) {
      return undefined;
    }

    const template = industryTemplates.find(
      (templateOption) => templateOption.key === industryTemplateKey,
    );

    if (template?.workspaceSlug) {
      return demoOrganizations.find(
        (organization) => organization.slug === template.workspaceSlug,
      );
    }

    return demoOrganizations.find(
      (organization) => organization.industryTemplateKey === industryTemplateKey,
    );
  }

  function selectDemoOrganization(selectedOrganization: DemoOrganization) {
    const nextSlug = selectedOrganization.slug;
    setSelectedDemoSlug(nextSlug);
    setDemoOrganizationSlug(nextSlug);
    login(selectedOrganization.demoUser);
    queryClient.setQueryData<WorkspaceProfile>(["settings", "workspace"], {
      id: selectedOrganization.id,
      name: selectedOrganization.name,
      slug: selectedOrganization.slug,
      industry: selectedOrganization.industryTemplateKey ?? "core",
      appName: selectedOrganization.appName,
      caseLabel: selectedOrganization.caseLabel,
      customerLabel: selectedOrganization.customerLabel,
      industryTemplateKey: selectedOrganization.industryTemplateKey,
    });
    queryClient.invalidateQueries({
      predicate: (query) =>
        query.queryKey[0] !== "settings" ||
        query.queryKey[1] !== "demo-organizations",
    });
  }

  function handleDemoOrganizationChange(
    event: React.ChangeEvent<HTMLSelectElement>,
  ) {
    const selectedOrganization = demoOrganizations.find(
      (organization) => organization.slug === event.target.value,
    );

    if (!selectedOrganization) {
      return;
    }

    selectDemoOrganization(selectedOrganization);
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
  const workspaceAppName = workspaceProfile?.appName ?? "Core";
  const workspaceCaseLabel = workspaceProfile?.caseLabel ?? "Case";
  const workspaceCustomerLabel = workspaceProfile?.customerLabel ?? "Customer";
  const workspaceTemplateName =
    industryTemplates.find(
      (template) => template.key === workspaceProfile?.industryTemplateKey,
    )?.name ?? formatFieldLabel(workspaceProfile?.industry ?? "general");
  const selectedIndustryTemplate = industryTemplates.find(
    (template) => template.key === workspaceProfileForm.industryTemplateKey,
  );
  const webOrigin = window.location.origin;

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
              <div className="settings-panel demo-mode-panel">
                <div className="settings-panel-header">
                  <div>
                    <h2>Demo Mode</h2>
                    <p>
                      Switch the local demo workspace without cloning the app.
                    </p>
                  </div>
                </div>

                <div className="demo-mode-selector">
                  <label>
                    Active demo
                    <select
                      disabled={demoOrganizations.length === 0}
                      value={selectedDemoSlug}
                      onChange={handleDemoOrganizationChange}
                    >
                      {demoOrganizations.length === 0 ? (
                        <option value="">No demos seeded</option>
                      ) : (
                        <>
                          {!selectedDemoSlug && (
                            <option value="">No matching demo seeded</option>
                          )}
                          {demoOrganizations.map((organization) => (
                            <option
                              key={organization.id}
                              value={organization.slug}
                            >
                              {organization.name}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                  </label>

                  <div>
                    <span>Showing</span>
                    <strong>{workspaceAppName}</strong>
                    <p>
                      {workspaceCaseLabel} workflow / {workspaceCustomerLabel}{" "}
                      records
                    </p>
                  </div>
                </div>

                {demoOrganizations.length === 0 && (
                  <div className="settings-muted-note">
                    No seeded demo workspaces were found.
                  </div>
                )}

              </div>

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

                  </div>

                  {updateWorkspaceProfileMutation.isError && (
                    <div className="form-error">
                      Could not save workspace settings.
                    </div>
                  )}
                </form>

                {selectedIndustryTemplate && (
                  <div className="template-preview">
                    <div className="template-preview-header">
                      <div>
                        <span>Template preview</span>
                        <strong>{selectedIndustryTemplate.name}</strong>
                      </div>
                      <small>Preview only</small>
                    </div>

                    <div className="template-preview-labels">
                      <div>
                        <span>App</span>
                        <strong>{selectedIndustryTemplate.appName}</strong>
                      </div>
                      <div>
                        <span>Case label</span>
                        <strong>{selectedIndustryTemplate.caseLabel}</strong>
                      </div>
                      <div>
                        <span>Customer label</span>
                        <strong>{selectedIndustryTemplate.customerLabel}</strong>
                      </div>
                    </div>

                    <div className="template-preview-grid">
                      <div className="template-preview-section">
                        <h3>Statuses</h3>
                        <div className="template-chip-list">
                          {selectedIndustryTemplate.defaultStatuses.map(
                            (status) => (
                              <small key={status}>{status}</small>
                            ),
                          )}
                        </div>
                      </div>

                      <div className="template-preview-section">
                        <h3>Categories</h3>
                        <div className="template-chip-list">
                          {selectedIndustryTemplate.defaultCategories.map(
                            (category) => (
                              <small key={category}>{category}</small>
                            ),
                          )}
                        </div>
                      </div>

                      <div className="template-preview-section full-span">
                        <h3>Intake fields</h3>
                        <div className="template-intake-preview-list">
                          {selectedIndustryTemplate.defaultIntakeFields.map(
                            (field) => (
                              <div
                                className="template-intake-preview-item"
                                key={field.key}
                              >
                                <div>
                                  <strong>{field.label}</strong>
                                  <span>
                                    {formatFieldLabel(field.fieldType)}
                                    {field.isRequired ? " / Required" : ""}
                                  </span>
                                </div>

                                {field.placeholder && (
                                  <small>{field.placeholder}</small>
                                )}

                                {field.options && field.options.length > 0 && (
                                  <div className="template-chip-list">
                                    {field.options.map((option) => (
                                      <small key={option}>{option}</small>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
                      onChange={(event) =>
                        setNewStatusColor(event.target.value)
                      }
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
                                disabled={
                                  updateWorkflowStatusMutation.isPending
                                }
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
                      onChange={(event) =>
                        setNewCategoryName(event.target.value)
                      }
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
                    Configurable fields available for collecting structured case
                    intake details.
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
                        <span>
                          {intakeField.isActive ? "Active" : "Inactive"}
                        </span>
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
                    <span>
                      Open {pluralizeLabel(workspaceCaseLabel).toLowerCase()}
                    </span>
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
                    <input
                      defaultValue={
                        import.meta.env.PROD ? "Production" : "Local development"
                      }
                    />
                  </label>

                  <label>
                    Web origin
                    <input defaultValue={webOrigin} />
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
