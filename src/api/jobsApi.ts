import type { JobDto } from "./types";

export type JobsQuery = {
  q?: string;
  status?: string;
  jobTypeCode?: string;
};

const MOCK: JobDto[] = [
  {
    id: "1",
    customerId: "c1",
    customerName: "Kowalski",
    title: "Balcony door",
    jobTypeCode: "DOOR_INSTALL",
    status: "NEW",
    plannedAt: "2026-01-03T09:30:00"
  }
];

export async function listJobs(query: JobsQuery): Promise<JobDto[]> {
  const q = (query.q ?? "").trim().toLowerCase();

  return MOCK.filter((j) => {
    const matchesQ =
      !q ||
      j.customerName.toLowerCase().includes(q) ||
      j.title.toLowerCase().includes(q);

    const matchesStatus = !query.status || query.status === "ALL" || j.status === query.status;
    const matchesType = !query.jobTypeCode || query.jobTypeCode === "ALL" || j.jobTypeCode === query.jobTypeCode;

    return matchesQ && matchesStatus && matchesType;
  });
}
