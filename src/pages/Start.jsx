import { useTranslation } from 'react-i18next';
import LinkButton from '../components/LinkButton';
import ToggleLanguage from '../components/ToggleLanguage';
import styles from '../styles/Start.module.css';

function Start() {
  
  const [t, i18n] = useTranslation("global");
  const language = i18n.language === "en" ? "Change language to: " : "Cambiar idioma a: ";

  return (
    <div className={styles.grid}>

      {/* <div className={start.logoContainer}>
        <img src={icon} alt="Icon" className={start.logo} />
      </div> */}

      <div className={styles.start}>
        <LinkButton href="/inicio-de-sesion" text={t("Translation.BtnLogIn")} />
        <LinkButton href="/registro-de-cuenta" text={t("Translation.SignUp")} />
      </div>

      <div className={styles.language}>
        <span>{language}</span>
        <ToggleLanguage />
      </div>
    </div>
  );
}

export default Start
