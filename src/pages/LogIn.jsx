import { faCircleCheck, faEnvelope, faLock, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import login from '../styles/LogIn.module.css';

export default function LogIn () {
  const {t} = useTranslation("global");

  const apiUrl = 'http://localhost:3000/api/v2'
  const [passwordEmptyError, setPasswordEmptyError] = useState(false);
  const form = useRef();
  const id = useId();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = JSON.stringify({
      email: form.current.email.value,
      password: form.current.password.value
    })

    const response = await fetch(apiUrl+"/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: formData
    })
    
    const data = await response.json() // user info data
    if (data.response !== 'Invalid email or password.') {
      localStorage.setItem('token', data.apikey)
      localStorage.setItem('idUser', data.username);
      /* console.log(data.apikey)
      console.log(data.username) */
      // console log para ver si se guardan los datos en el local storage
      /* console.log(localStorage.getItem('token'))
      console.log(localStorage.getItem('idUser')) */
      navigate('/kanbanize-lite/pagina-principal', { replace: true })
    } else {
      console.log('error')
    }
    /* console.log(response)
    console.log(data) */
  }

  const handlePassword = (e) => {
    e.preventDefault();
    const password = form.current.password.value;

    if(password === '') {
      setPasswordEmptyError(true);
    } else {
      setPasswordEmptyError(false);
    }
  }

  return (
    <>
      <div className={login.grid}>
        <header className={login.header}>
          <h1>{t("Translation.BtnLogIn")}</h1>
        </header>
        
        {/* <div className={login.iconContainer}>
          <Link to="/"><img className={login.iconLogin} src={icon} alt="Icon"/></Link>
        </div> */}
        
        <form className={login.form} ref={form} onSubmit={handleSubmit}>
          <fieldset className={login.formGroup} id={`${id}-formGroupEmail`}>
            <label className={login.formLabel} htmlFor={`${id}-email`}>
              <FontAwesomeIcon icon={faEnvelope} />
            </label>
            <div className={login.formInputLogin}>
              <input type="email" className={login.inputLogin} id={`${id}-email`} name="email" placeholder="Correo electrónico" /* title='Ingrese su correo electrónico institucional.' */ onInvalid={e => e.target.setCustomValidity('Por favor, ingrese aquí su correo electrónico institucional.')} autoComplete="true" autoFocus required/>
              <FontAwesomeIcon className={login.formValidationStatusSuccess} icon={faCircleCheck} />
              <FontAwesomeIcon className={login.formValidationStatusError} icon={faTimesCircle} />
              <span className={login.formInputError}>{t("Translation.EmailInputError")}</span>
            </div>
          </fieldset>

          <fieldset className={login.formGroup} id={`${id}-formGroupPassword`}>
            <label className={login.formLabel} htmlFor={`${id}-password`}>
              <FontAwesomeIcon icon={faLock} />
            </label>
            <div className={login.formInputLogin}>
              <input type="password" className={login.inputLogin} id={`${id}-password`} name="password" placeholder="Contraseña" /* title='Ingrese su contraseña.' */ onInvalid={e => e.target.setCustomValidity('Por favor, ingrese aquí su contraseña.')} /* onPaste={(e) => {e.preventDefault(); return false;}} */ /* onCopy={(e) => {e.preventDefault(); return false;}} */ onBlur={handlePassword} /* onSelectStart={(e) => {e.preventDefault(); return false;}} */ autoComplete="true" required/>
              {
                passwordEmptyError &&
                <span className={login.passwordEmptyError}>{t("Translation.PasswordInputError")}</span>
              }
            </div>
          </fieldset>

          <span className={login.newAccount}>{t("Translation.newAccount")} <br/> <Link to="/registro-de-cuenta">{t("Translation.newAccountHere")} &gt;</Link>.</span>

          <footer className={login.formFooterLogin}>
            <button className={login.formBtnSubmitLogin} type="submit">{t("Translation.formBtnSubmitLogin")}</button>
          </footer>
        </form>
      </div>
    </>
  )
}
