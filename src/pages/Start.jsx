import LinkButton from '../components/LinkButton';
import styles from '../styles/Start.module.css';

function Start() {
  return (
    <div className={styles.grid}>

      {/* <div className={start.logoContainer}>
        <img src={icon} alt="Icon" className={start.logo} />
      </div> */}

      <div className={styles.start}>
        <LinkButton href="/inicio-de-sesion" text="Iniciar sesión" />
        <LinkButton href="/registro-de-cuenta" text="Registrarse" />
      </div>
    </div>
  );
}

export default Start;
