import { api } from "../../lib/api";
import type { CaseListItem } from "../cases/caseApi";

export type CustomerListItem = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  externalReference: string | null;
  createdAt: string;
  updatedAt: string;
  caseCount: number;
  recentCases: {
    id: string;
    title: string;
    priority: "low" | "normal" | "high" | "urgent";
    updatedAt: string;
    status: {
      id: string;
      name: string;
      slug: string;
      color: string | null;
      isClosed: boolean;
    };
  }[];
};

export type CustomerCaseItem = Omit<CaseListItem, "customer">;

export type CustomerDetail = Omit<
  CustomerListItem,
  "caseCount" | "recentCases"
> & {
  cases: CustomerCaseItem[];
};

type CustomersResponse = {
  data: CustomerListItem[];
};

type CustomerDetailResponse = {
  data: CustomerDetail;
};

export async function fetchCustomers(search: string) {
  const response = await api.get<CustomersResponse>("/api/customers", {
    params: {
      search: search || undefined,
    },
  });

  return response.data.data;
}

export async function fetchCustomer(customerId: string) {
  const response = await api.get<CustomerDetailResponse>(
    `/api/customers/${customerId}`,
  );

  return response.data.data;
}
