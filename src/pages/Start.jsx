import { useTranslation } from 'react-i18next';
import KanbanizeLiteLogo from '../assets/kanbanize-lite.svg';
import KanbanizeLogo from '../assets/kanbanize.svg';
import LinkButton from '../components/LinkButton';
import ToggleLanguage from '../components/ToggleLanguage';
import styles from '../styles/Start.module.css';

function Start() {

  const [t, i18n] = useTranslation("global");

  return (
    <div className={styles.grid}>

      <figure className={styles.logoContainer}>
        <img src={KanbanizeLiteLogo} alt="Kanbanize Lite Logo" className={styles.logo} />
        <figcaption className={styles.figcaption}>
          <h1 className={styles.title}>Kanbanize <span className={styles.secondWord}>Lite</span></h1>
          <p className={styles.description}>{t("Translation.StartDescription")}</p>
        </figcaption>
      </figure>

      <div className={styles.start}>
        <LinkButton href="/inicio-de-sesion" text={t("Translation.BtnLogIn")} />
      </div>

      <ToggleLanguage />

      <footer className={styles.footer}>
        <span>Powered By Kanbanize <img src={KanbanizeLogo} alt="Kanbanize Logo" className={styles.logoOriginal} /></span>
      </footer>
    </div>
  );
}

export default Start
