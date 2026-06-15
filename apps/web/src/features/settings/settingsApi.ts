import { api } from "../../lib/api";
import type { AuthUser } from "../auth/auth";

export type WorkflowStatusSetting = {
  id: string;
  name: string;
  slug: string;
  color: string | null;
  sortOrder: number;
  isDefault: boolean;
  isClosed: boolean;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateWorkflowStatusInput = {
  name: string;
  color: string;
  isDefault: boolean;
  isClosed: boolean;
};

export type UpdateWorkflowStatusInput = {
  id: string;
  name: string;
  color: string;
  sortOrder: number;
  isDefault: boolean;
  isClosed: boolean;
};

export type WorkflowStatusEditForm = {
  id: string;
  name: string;
  color: string;
  sortOrder: string;
  isDefault: boolean;
  isClosed: boolean;
};

export type CaseCategorySetting = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateCaseCategoryInput = {
  name: string;
  description: string | null;
};

export type UpdateCaseCategoryInput = CreateCaseCategoryInput & {
  id: string;
};

export type CaseCategoryEditForm = {
  id: string;
  name: string;
  description: string;
};

export type AssignableUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type TeamMemberSetting = AssignableUser & {
  openAssignedCaseCount: number;
};

export type IndustryTemplate = {
  key: string;
  name: string;
  appName: string;
  caseLabel: string;
  customerLabel: string;
  defaultStatuses: string[];
  defaultCategories: string[];
  defaultIntakeFields: {
    key: string;
    label: string;
    fieldType: IntakeFieldType;
    placeholder?: string;
    helpText?: string;
    options?: string[];
    isRequired: boolean;
    showOnCaseDetail: boolean;
  }[];
};

export type WorkspaceProfile = {
  id: string;
  name: string;
  slug: string;
  industry: string;
  appName: string | null;
  caseLabel: string | null;
  customerLabel: string | null;
  industryTemplateKey: string | null;
};

export type DemoOrganization = {
  id: string;
  name: string;
  slug: string;
  appName: string | null;
  caseLabel: string | null;
  customerLabel: string | null;
  industryTemplateKey: string | null;
  demoUser: AuthUser;
};

export type UpdateWorkspaceProfileInput = {
  appName: string;
  caseLabel: string;
  customerLabel: string;
  industryTemplateKey: string | null;
};

export type WorkspaceProfileForm = {
  appName: string;
  caseLabel: string;
  customerLabel: string;
  industryTemplateKey: string;
};

export type IntakeFieldType =
  | "text"
  | "textarea"
  | "email"
  | "phone"
  | "number"
  | "date"
  | "select"
  | "multiselect"
  | "checkbox";

export type IntakeFieldSetting = {
  id: string;
  key: string;
  label: string;
  fieldType: IntakeFieldType;
  placeholder: string | null;
  helpText: string | null;
  options: unknown;
  isRequired: boolean;
  showOnCaseDetail?: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateIntakeFieldInput = {
  label: string;
  fieldType: IntakeFieldType;
  isRequired: boolean;
  showOnCaseDetail: boolean;
  isActive: boolean;
};

export type UpdateIntakeFieldInput = Omit<
  CreateIntakeFieldInput,
  "isActive"
> & {
  id: string;
  sortOrder: number;
  isActive: boolean;
};

export type IntakeFieldCreateForm = CreateIntakeFieldInput;

export type IntakeFieldEditForm = {
  id: string;
  label: string;
  fieldType: IntakeFieldType;
  sortOrder: string;
  isRequired: boolean;
  showOnCaseDetail: boolean;
  isActive: boolean;
};

type WorkflowStatusesResponse = {
  data: WorkflowStatusSetting[];
};

type CaseCategoriesResponse = {
  data: CaseCategorySetting[];
};

type AssignableUsersResponse = {
  data: AssignableUser[];
};

type TeamMembersResponse = {
  data: TeamMemberSetting[];
};

type IndustryTemplatesResponse = {
  data: IndustryTemplate[];
};

type WorkspaceProfileResponse = {
  data: WorkspaceProfile;
};

type DemoOrganizationsResponse = {
  data: DemoOrganization[];
};

type IntakeFieldsResponse = {
  data: IntakeFieldSetting[];
};

export async function fetchWorkflowStatuses() {
  const response = await api.get<WorkflowStatusesResponse>(
    "/api/settings/workflow-statuses",
  );

  return response.data.data;
}

export async function createWorkflowStatus(data: CreateWorkflowStatusInput) {
  const response = await api.post<{ data: WorkflowStatusSetting }>(
    "/api/settings/workflow-statuses",
    data,
  );

  return response.data.data;
}

export async function updateWorkflowStatus({
  id,
  ...data
}: UpdateWorkflowStatusInput) {
  const response = await api.patch<{ data: WorkflowStatusSetting }>(
    `/api/settings/workflow-statuses/${id}`,
    data,
  );

  return response.data.data;
}

export async function fetchCaseCategories() {
  const response = await api.get<CaseCategoriesResponse>(
    "/api/settings/case-categories",
  );

  return response.data.data;
}

export async function createCaseCategory(data: CreateCaseCategoryInput) {
  const response = await api.post<{ data: CaseCategorySetting }>(
    "/api/settings/case-categories",
    data,
  );

  return response.data.data;
}

export async function updateCaseCategory({
  id,
  ...data
}: UpdateCaseCategoryInput) {
  const response = await api.patch<{ data: CaseCategorySetting }>(
    `/api/settings/case-categories/${id}`,
    data,
  );

  return response.data.data;
}

export async function fetchAssignableUsers() {
  const response = await api.get<AssignableUsersResponse>(
    "/api/settings/users",
  );

  return response.data.data;
}

export async function fetchTeamMembers() {
  const response = await api.get<TeamMembersResponse>(
    "/api/settings/team-members",
  );

  return response.data.data;
}

export async function fetchIndustryTemplates() {
  const response = await api.get<IndustryTemplatesResponse>(
    "/api/settings/industry-templates",
  );

  return response.data.data;
}

export async function fetchWorkspaceProfile() {
  const response = await api.get<WorkspaceProfileResponse>(
    "/api/settings/workspace",
  );

  return response.data.data;
}

export async function fetchDemoOrganizations() {
  const response = await api.get<DemoOrganizationsResponse>(
    "/api/settings/demo-organizations",
  );

  return response.data.data;
}

export async function updateWorkspaceProfile(
  data: UpdateWorkspaceProfileInput,
) {
  const response = await api.patch<WorkspaceProfileResponse>(
    "/api/settings/workspace",
    data,
  );

  return response.data.data;
}

export async function fetchIntakeFields() {
  const response = await api.get<IntakeFieldsResponse>(
    "/api/settings/intake-fields",
  );

  return response.data.data;
}

export async function createIntakeField(data: CreateIntakeFieldInput) {
  const response = await api.post<{ data: IntakeFieldSetting }>(
    "/api/settings/intake-fields",
    data,
  );

  return response.data.data;
}

export async function updateIntakeField({
  id,
  ...data
}: UpdateIntakeFieldInput) {
  const response = await api.patch<{ data: IntakeFieldSetting }>(
    `/api/settings/intake-fields/${id}`,
    data,
  );

  return response.data.data;
}
