import { useTranslation } from "react-i18next";
import styles from "./DashboardPage.module.css";

export function DashboardPage() {
  const { t } = useTranslation();

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.content}>
        <h1 className={styles.title}>{t("dashboard.title")}</h1>
        <p className={styles.welcomeText}>{t("dashboard.welcome")}</p>
      </div>
    </div>
  );
}
