export type JobStatus =
  | "NEW"
  | "MEASURED"
  | "IN_PROGRESS"
  | "READY"
  | "INSTALLED"
  | "DONE";

export type JobTypeCode =
  | "WINDOW_INSTALL"
  | "DOOR_INSTALL"
  | "WINDOW_REPAIR"
  | "DOOR_REPAIR"
  | "GLASS_REPLACEMENT"
  | "FURNITURE_REPAIR"
  | "MEASUREMENT_ONLY"
  | "SERVICE_VISIT"
  | "GENERAL_SERVICE";

export type JobDto = {
  id: string;
  customerId: string;
  customerName: string;
  title: string;
  jobTypeCode: JobTypeCode;
  status: JobStatus;
  plannedAt?: string;
  technicianId?: string;
};
