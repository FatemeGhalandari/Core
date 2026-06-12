import { api } from "../../lib/api";

export type CaseListItem = {
  id: string;
  title: string;
  description: string | null;
  priority: "low" | "normal" | "high" | "urgent";
  source: string;
  dueAt: string | null;
  closedAt: string | null;
  createdAt: string;
  updatedAt: string;
  customer: {
    id: string;
    name: string;
    email: string | null;
  };
  assignedUser: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
  category: {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
  } | null;
  status: {
    id: string;
    name: string;
    slug: string;
    color: string | null;
    isClosed: boolean;
  };
  commentCount: number;
  attachmentCount: number;
};

export type CaseDetail = CaseListItem & {
  intakeData: Record<string, unknown>;
  customer: {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    externalReference: string | null;
  };
  comments: {
    id: string;
    body: string;
    visibility: "public" | "internal";
    createdAt: string;
    authorUser: {
      id: string;
      name: string;
      role: string;
    } | null;
    authorCustomer: {
      id: string;
      name: string;
    } | null;
  }[];
  activityEvents: {
    id: string;
    eventType: string;
    metadata: Record<string, unknown>;
    createdAt: string;
    actorUser: {
      id: string;
      name: string;
      role: string;
    } | null;
    actorCustomer: {
      id: string;
      name: string;
    } | null;
  }[];
};

export type CaseSortOption = "updated" | "newest" | "oldest" | "priority";

export type CaseListFilters = {
  search: string;
  statusSlug: string;
  priority: string;
  categorySlug: string;
  assignedUserId: string;
  sort: CaseSortOption;
};

type CasesResponse = {
  data: CaseListItem[];
};

type CaseDetailResponse = {
  data: CaseDetail;
};

export async function fetchCases(filters?: Partial<CaseListFilters>) {
  const response = await api.get<CasesResponse>("/api/cases", {
    params: {
      search: filters?.search || undefined,
      statusSlug: filters?.statusSlug || undefined,
      priority: filters?.priority || undefined,
      categorySlug: filters?.categorySlug || undefined,
      sort: filters?.sort || undefined,
      assignedUserId: filters?.assignedUserId || undefined,
    },
  });

  return response.data.data;
}

export async function fetchCase(caseId: string) {
  const response = await api.get<CaseDetailResponse>(`/api/cases/${caseId}`);
  return response.data.data;
}
