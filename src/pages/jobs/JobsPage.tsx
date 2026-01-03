import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./JobsPage.module.css";

import type { JobDto, JobStatus, JobTypeCode } from "../../api/types";
import { listJobs } from "../../api/jobsApi";

type StatusFilter = JobStatus | "ALL";
type TypeFilter = JobTypeCode | "ALL";

function statusClass(status: JobStatus, css: typeof styles) {
  switch (status) {
    case "NEW":
      return css.statusNew;
    case "MEASURED":
      return css.statusMeasured;
    case "IN_PROGRESS":
      return css.statusInProgress;
    case "READY":
      return css.statusReady;
    case "INSTALLED":
      return css.statusInstalled;
    case "DONE":
      return css.statusDone;
    default:
      return "";
  }
}

export function JobsPage() {
  const { t, i18n } = useTranslation();

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("ALL");

  const [jobs, setJobs] = useState<JobDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const dateFormatter = useMemo(() => {
    return new Intl.DateTimeFormat(i18n.language, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
  }, [i18n.language]);

  const formatPlannedAt = (iso?: string) => {
    if (!iso) return "—";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "—";
    return dateFormatter.format(d);
  };

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setErrorMsg(null);

      try {
        const data = await listJobs({
          q: query,
          status: statusFilter,
          jobTypeCode: typeFilter
        });

        if (!cancelled) setJobs(data);
      } catch (e) {
        if (!cancelled) {
          setErrorMsg(e instanceof Error ? e.message : "Unknown error");
          setJobs([]);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [query, statusFilter, typeFilter]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>{t("nav.jobs")}</h1>
          <p className={styles.subtitle}>{t("jobs.subtitle")}</p>
        </div>

        <button className={styles.primaryButton} type="button" disabled>
          {t("jobs.actions.newJob")}
        </button>
      </div>

      <div className={styles.filtersRow}>
        <input
          className={styles.searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("jobs.filters.searchPlaceholder")}
        />

        <select
          className={styles.select}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
        >
          <option value="ALL">{t("jobs.filters.allStatuses")}</option>
          <option value="NEW">{t("job.status.NEW")}</option>
          <option value="MEASURED">{t("job.status.MEASURED")}</option>
          <option value="IN_PROGRESS">{t("job.status.IN_PROGRESS")}</option>
          <option value="READY">{t("job.status.READY")}</option>
          <option value="INSTALLED">{t("job.status.INSTALLED")}</option>
          <option value="DONE">{t("job.status.DONE")}</option>
        </select>

        <select
          className={styles.select}
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
        >
          <option value="ALL">{t("jobs.filters.allJobTypes")}</option>
          <option value="WINDOW_INSTALL">{t("job.type.WINDOW_INSTALL")}</option>
          <option value="DOOR_INSTALL">{t("job.type.DOOR_INSTALL")}</option>
          <option value="WINDOW_REPAIR">{t("job.type.WINDOW_REPAIR")}</option>
          <option value="DOOR_REPAIR">{t("job.type.DOOR_REPAIR")}</option>
          <option value="GLASS_REPLACEMENT">{t("job.type.GLASS_REPLACEMENT")}</option>
          <option value="FURNITURE_REPAIR">{t("job.type.FURNITURE_REPAIR")}</option>
          <option value="MEASUREMENT_ONLY">{t("job.type.MEASUREMENT_ONLY")}</option>
          <option value="SERVICE_VISIT">{t("job.type.SERVICE_VISIT")}</option>
          <option value="GENERAL_SERVICE">{t("job.type.GENERAL_SERVICE")}</option>
        </select>
      </div>

      <div className={styles.tableCard}>
        {isLoading ? (
          <div className={styles.emptyState}>{t("common.loading")}</div>
        ) : errorMsg ? (
          <div className={styles.emptyState}>
            {t("common.error")}: {errorMsg}
          </div>
        ) : jobs.length === 0 ? (
          <div className={styles.emptyState}>{t("jobs.empty")}</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{t("jobs.table.customer")}</th>
                <th>{t("jobs.table.title")}</th>
                <th>{t("jobs.table.type")}</th>
                <th>{t("jobs.table.status")}</th>
                <th>{t("jobs.table.plannedAt")}</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td className={styles.cellStrong}>{job.customerName}</td>
                  <td>{job.title}</td>
                  <td>{t(`job.type.${job.jobTypeCode}`)}</td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${statusClass(job.status, styles)}`}
                    >
                      {t(`job.status.${job.status}`)}
                    </span>
                  </td>
                  <td>{formatPlannedAt(job.plannedAt)}</td>
                  <td className={styles.actionsCell}>
                    <button className={styles.linkButton} type="button">
                      {t("jobs.actions.view")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
