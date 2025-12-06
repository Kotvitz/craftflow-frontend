import { useTranslation } from "react-i18next";
import styles from "./DashboardPage.module.css";

export function DashboardPage() {
  const { t } = useTranslation();

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>{t("dashboard.title")}</h1>
          <p className={styles.welcomeText}>{t("dashboard.welcome")}</p>
        </div>

        <div className={styles.headerActions}>
          <button className={styles.primaryButton}>
            {t("dashboard.actions.newJob")}
          </button>
          <button className={styles.secondaryButton}>
            {t("dashboard.actions.newCustomer")}
          </button>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>
            {t("dashboard.stats.openJobs")}
          </div>
          <div className={styles.statValue}>12</div>
          <div className={styles.statHint}>
            {t("dashboard.stats.openJobsHint")}
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statLabel}>
            {t("dashboard.stats.todayJobs")}
          </div>
          <div className={styles.statValue}>4</div>
          <div className={styles.statHint}>
            {t("dashboard.stats.todayJobsHint")}
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statLabel}>
            {t("dashboard.stats.waitingForMeasurement")}
          </div>
          <div className={styles.statValue}>3</div>
          <div className={styles.statHint}>
            {t("dashboard.stats.waitingForMeasurementHint")}
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statLabel}>
            {t("dashboard.stats.lowStock")}
          </div>
          <div className={styles.statValue}>5</div>
          <div className={styles.statHint}>
            {t("dashboard.stats.lowStockHint")}
          </div>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {t("dashboard.section.myJobsToday")}
            </h2>
            <button className={styles.linkButton}>
              {t("dashboard.viewAllJobs")}
            </button>
          </div>

          <ul className={styles.list}>
            <li className={styles.listItem}>
              <div>
                <div className={styles.itemTitle}>Kowalski – Balcony door</div>
                <div className={styles.itemMeta}>
                  {t("dashboard.labels.jobType")} · WINDOW_INSTALL ·{" "}
                  {t("dashboard.labels.todayAt", { time: "09:30" })}
                </div>
              </div>
              <span className={`${styles.statusBadge} ${styles.statusNew}`}>
                {t("job.status.NEW")}
              </span>
            </li>

            <li className={styles.listItem}>
              <div>
                <div className={styles.itemTitle}>Nowak – Kitchen window</div>
                <div className={styles.itemMeta}>
                  {t("dashboard.labels.jobType")} · GLASS_REPAIR ·{" "}
                  {t("dashboard.labels.todayAt", { time: "12:00" })}
                </div>
              </div>
              <span
                className={`${styles.statusBadge} ${styles.statusInProgress}`}
              >
                {t("job.status.IN_PROGRESS")}
              </span>
            </li>

            <li className={styles.listItem}>
              <div>
                <div className={styles.itemTitle}>Smith – Front door</div>
                <div className={styles.itemMeta}>
                  {t("dashboard.labels.jobType")} · DOOR_INSTALL ·{" "}
                  {t("dashboard.labels.todayAt", { time: "15:00" })}
                </div>
              </div>
              <span className={`${styles.statusBadge} ${styles.statusReady}`}>
                {t("job.status.READY")}
              </span>
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {t("dashboard.section.schedule")}
            </h2>
          </div>
          <div className={styles.emptyState}>
            {t("dashboard.scheduleEmpty")}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {t("dashboard.section.lowStock")}
            </h2>
            <button className={styles.linkButton}>
              {t("dashboard.viewInventory")}
            </button>
          </div>

          <ul className={styles.list}>
            <li className={styles.listItem}>
              <div>
                <div className={styles.itemTitle}>WOOD-001 – Oak plank</div>
                <div className={styles.itemMeta}>
                  {t("dashboard.labels.stock")}: 4 / 10 PCS
                </div>
              </div>
            </li>
            <li className={styles.listItem}>
              <div>
                <div className={styles.itemTitle}>GLASS-010 – 4mm clear</div>
                <div className={styles.itemMeta}>
                  {t("dashboard.labels.stock")}: 2 / 8 M2
                </div>
              </div>
            </li>
            <li className={styles.listItem}>
              <div>
                <div className={styles.itemTitle}>PAINT-005 – White paint</div>
                <div className={styles.itemMeta}>
                  {t("dashboard.labels.stock")}: 1 / 5 L
                </div>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
