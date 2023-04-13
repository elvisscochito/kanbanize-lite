import { useTranslation } from 'react-i18next';

const ToggleLanguage = () => {
    const [t, i18n] = useTranslation("global");
    
    const handleToggleLanguage = () => {
    const currentLanguage = i18n.language;
    const nextLanguage = currentLanguage === "en" ? "es" : "en";
    i18n.changeLanguage(nextLanguage);
    localStorage.setItem("language", nextLanguage);
  };
    
  return (
    <button onClick={handleToggleLanguage}>
      {i18n.language === "en" ? "Español" : "English"}
    </button>
  );
}

export default ToggleLanguage;
