import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../styles/ToggleLanguage.module.css';

const ToggleLanguage = () => {
  const [t, i18n] = useTranslation("global");
  const id = useId();
  const [isToggle, setIsToggle] = useState(false);
  const currentLanguage = i18n.language;

  const language = i18n.language === "en" ? "Change language to: " : "Cambiar idioma a: ";

  const handleToggleLanguage = () => {
    const nextLanguage = currentLanguage === "en" ? "es" : "en";
    i18n.changeLanguage(nextLanguage);
    localStorage.setItem("language", nextLanguage);
    setIsToggle(!isToggle);
  };

  if (currentLanguage == "es" && isToggle == false) {
    setIsToggle(true);
  } else if (currentLanguage == "en" && isToggle == true) {
    setIsToggle(false);
  }

  return (
    <div className={styles.switch}>
      <button onClick={handleToggleLanguage} className={styles.toggleLanguage}>
        {i18n.language === "en" ? "Español" : "English"}
      </button>
    </div>
  );
}

export default ToggleLanguage;
