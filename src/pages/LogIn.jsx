import { faCircleCheck, faEnvelope, faLock, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import login from '../assets/login.svg';
import apiUrlPrefix from '../config/apiUrlPrefix';
import styles from '../styles/LogIn.module.css';

export default function LogIn() {
  const { t } = useTranslation("global");
  const [passwordEmptyError, setPasswordEmptyError] = useState(false);
  const form = useRef();
  const id = useId();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = JSON.stringify({
      email: form.current.email.value,
      domain: form.current.domain.value,
      password: form.current.password.value
    })

    const response = await fetch(`${apiUrlPrefix}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: formData
    })

    const data = await response.json() // user info data
    console.log(data)
    if (data.response !== 'Invalid email or password.') {
      localStorage.setItem('apikey', data.apikey)
      localStorage.setItem('username', data.username);
      localStorage.setItem('domain', data.companyname);
      navigate('/kanbanize-lite/pagina-principal', { replace: true })
    } else {
      console.error('error')
    }
  }

  const handlePassword = (e) => {
    e.preventDefault();
    const password = form.current.password.value;

    if (password === '') {
      setPasswordEmptyError(true);
    } else {
      setPasswordEmptyError(false);
    }
  }

  return (
    <>
      <div className={styles.grid}>
        <header className={styles.header}>
          <h1>{t("Translation.BtnLogIn")}</h1>
        </header>

        <div className={styles.iconContainer}>
          <img className={styles.iconLogin} src={login} alt="Icon" />
        </div>

        <form className={styles.form} ref={form} onSubmit={handleSubmit}>
          <fieldset className={styles.formGroup} id={`${id}-formGroupEmail`}>
            <label className={styles.formLabel} htmlFor={`${id}-email`}>
              <FontAwesomeIcon icon={faEnvelope} />
            </label>
            <div className={styles.formInputLogin}>
              <input type="email" className={styles.inputLogin} id={`${id}-email`} name="email" placeholder="Correo electrónico" /* title='Ingrese su correo electrónico institucional.' */ onInvalid={e => e.target.setCustomValidity('Por favor, ingrese aquí su correo electrónico institucional.')} autoComplete="true" autoFocus required />
              <FontAwesomeIcon className={styles.formValidationStatusSuccess} icon={faCircleCheck} />
              <FontAwesomeIcon className={styles.formValidationStatusError} icon={faTimesCircle} />
              <span className={styles.formInputError}>{t("Translation.EmailInputError")}</span>
            </div>
          </fieldset>

          <fieldset className={styles.formGroup} id={`${id}-formGroupDomain`}>
            <label className={styles.formLabel} htmlFor={`${id}-domain`}>
              <FontAwesomeIcon icon={faEnvelope} />
            </label>
            <div className={styles.formInputLogin}>
              <input type="text" className={styles.inputLogin} id={`${id}-domain`} name="domain" placeholder="Dominio" /* title='Ingrese su correo electrónico institucional.' */ onInvalid={e => e.target.setCustomValidity('Por favor, ingrese aquí su dominio institucional.')} autoComplete="true" required />
              <FontAwesomeIcon className={styles.formValidationStatusSuccess} icon={faCircleCheck} />
              <FontAwesomeIcon className={styles.formValidationStatusError} icon={faTimesCircle} />
              <span className={styles.formInputError}>{t("Translation.EmailInputError")}</span>
            </div>
          </fieldset>

          <fieldset className={styles.formGroup} id={`${id}-formGroupPassword`}>
            <label className={styles.formLabel} htmlFor={`${id}-password`}>
              <FontAwesomeIcon icon={faLock} />
            </label>
            <div className={styles.formInputLogin}>
              <input type="password" className={styles.inputLogin} id={`${id}-password`} name="password" placeholder="Contraseña" /* title='Ingrese su contraseña.' */ onInvalid={e => e.target.setCustomValidity('Por favor, ingrese aquí su contraseña.')} /* onPaste={(e) => {e.preventDefault(); return false;}} */ /* onCopy={(e) => {e.preventDefault(); return false;}} */ onBlur={handlePassword} /* onSelectStart={(e) => {e.preventDefault(); return false;}} */ autoComplete="true" required />
              {
                passwordEmptyError &&
                <span className={styles.passwordEmptyError}>{t("Translation.PasswordInputError")}</span>
              }
            </div>
          </fieldset>

          <footer className={styles.formFooterLogin}>
            <button className={styles.formBtnSubmitLogin} type="submit">{t("Translation.formBtnSubmitLogin")}</button>
          </footer>
        </form>
      </div>
    </>
  )
}
