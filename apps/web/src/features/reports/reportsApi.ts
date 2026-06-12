import { api } from "../../lib/api";

export type ReportBreakdownItem = {
  label: string;
  count: number;
};

export type ReportBreakdownData =
  | ReportBreakdownItem[]
  | Record<string, number>;

export type OperationsReport = {
  metrics: {
    totalCases: number;
    openCases: number;
    closedCases: number;
    overdueCases: number;
    averageOpenAge: number;
  };
  summary: {
    closedRate: number;
    highPriorityShare: number;
    unassignedShare: number;
    customerCount: number;
    customersWithOpenCases: number;
  };
  attention: {
    waitingCases: number;
    highPriorityCases: number;
    unassignedCases: number;
    overdueCases: number;
  };
  statusCounts?: ReportBreakdownItem[];
  categoryCounts?: ReportBreakdownItem[];
  priorityCounts?: ReportBreakdownItem[];
  sourceCounts?: ReportBreakdownItem[];
  ownerWorkload?: ReportBreakdownItem[];
  breakdowns?: {
    status?: Record<string, number>;
    category?: Record<string, number>;
    priority?: Record<string, number>;
    source?: Record<string, number>;
    owner?: Record<string, number>;
  };
  agingBuckets: ReportBreakdownItem[];
  recentlyClosedCases: {
    id: string;
    title: string;
    updatedAt: string;
    customer: {
      id: string;
      name: string;
    };
    status: {
      id: string;
      name: string;
      slug: string;
    };
  }[];
};

type OperationsReportResponse = {
  data: OperationsReport;
};

export async function fetchOperationsReport() {
  const response = await api.get<OperationsReportResponse>(
    "/api/reports/operations",
  );

  return response.data.data;
}
