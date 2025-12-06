import { useTranslation } from "react-i18next";
import styles from "./LanguageSelect.module.css";

const LANGUAGES = [
  { code: "pl", label: "Polski" },
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "uk", label: "Українська" },
  { code: "cs", label: "Čeština" },
  { code: "hu", label: "Magyar" }
];

export function LanguageSelect() {
  const { t, i18n } = useTranslation();

  const resolveInitialLanguage = (): string => {
    if (i18n.language) return i18n.language;

    const fb = i18n.options.fallbackLng;
    if (typeof fb === "string") return fb;
    if (Array.isArray(fb) && fb.length > 0) return fb[0];

    return "pl";
  };

  const currentLanguage = resolveInitialLanguage();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = event.target.value;
    i18n.changeLanguage(newLang);
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor="language-select">
        {t("i18n.selectLanguage")}
      </label>
      <select
        id="language-select"
        className={styles.select}
        value={currentLanguage}
        onChange={handleChange}
      >
        {LANGUAGES.map((lng) => (
          <option key={lng.code} value={lng.code}>
            {lng.label}
          </option>
        ))}
      </select>
    </div>
  );
}
