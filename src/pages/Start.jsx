import { useTranslation } from 'react-i18next';
import LinkButton from '../components/LinkButton';
import ToggleLanguage from '../components/ToggleLanguage';
import styles from '../styles/Start.module.css';

function Start() {

  const [t, i18n] = useTranslation("global");

  return (
    <div className={styles.grid}>

      {/* <div className={start.logoContainer}>
        <img src={icon} alt="Icon" className={start.logo} />
      </div> */}

      <div className={styles.start}>
        <LinkButton href="/inicio-de-sesion" text={t("Translation.BtnLogIn")} />
        <LinkButton href="/registro-de-cuenta" text={t("Translation.SignUp")} />
      </div>

      <ToggleLanguage />
    </div>
  );
}

export default Start
