import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./AppLayout.module.css";
import { LanguageSelect } from "../components/LanguageSelect";
import {
  LayoutDashboard,
  ToolCase,
  Warehouse,
  Users,
  Settings
} from "lucide-react";

type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.appShell}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <span className={styles.logoMark}>CF</span>
          <span className={styles.logoText}>{t("app.title")}</span>
        </div>

        <nav className={styles.nav}>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? styles.navItemActive : styles.navItem
            }
          >
            <LayoutDashboard size={18} />
            {t("nav.dashboard")}
          </NavLink>
          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              isActive ? styles.navItemActive : styles.navItem
            }
          >
            <ToolCase size={18} />
            {t("nav.jobs")}
          </NavLink>
          <NavLink
            to="/inventory"
            className={({ isActive }) =>
              isActive ? styles.navItemActive : styles.navItem
            }
          >
            <Warehouse size={18} />
            {t("nav.inventory")}
          </NavLink>
          <NavLink
            to="/customers"
            className={({ isActive }) =>
              isActive ? styles.navItemActive : styles.navItem
            }
          >
            <Users size={18} /> 
            {t("nav.customers")}
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? styles.navItemActive : styles.navItem
            }
          >
            <Settings size={18} /> 
            {t("nav.settings")}
          </NavLink>
        </nav>
      </aside>

      <div className={styles.main}>
        <header className={styles.topBar}>
          <div className={styles.topBarRight}>
            <LanguageSelect />
          </div>
        </header>

        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
