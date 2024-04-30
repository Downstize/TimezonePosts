import { Button } from "antd";
import { useTranslation } from "react-i18next";

export function LanguageButton() {
  const { t, i18n } = useTranslation();

  const changeLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  return (
    <Button onClick={changeLanguage}>
      {i18n.language === "en" ? t("Change to Russian") : t("Change to English")}
    </Button>
  );
}