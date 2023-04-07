import LinkButton from '../components/LinkButton';
import styles from '../styles/Start.module.css';
import Translator from '../components/Translator';

function Start({ translation }) {
  return (
    <div className={styles.grid}>

      {/* <div className={start.logoContainer}>
        <img src={icon} alt="Icon" className={start.logo} />
      </div> */}

      <div className={styles.start}>
        <LinkButton href="/inicio-de-sesion" text={translation.BtnLogIn} />
        <LinkButton href="/registro-de-cuenta" text={translation.SignUp} />
      </div>
    </div>
  );
}

export default function StartTranslated() {
  return (
    <Translator>
      <Start />
    </Translator>
  );
}
