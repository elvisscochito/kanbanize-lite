import React, { useRef, useId, useState } from 'react';
import login from '../styles/LogIn.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faCircleCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';

export default function LogIn () {
  const apiUrl = 'http://localhost:3000/api/v2'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
      console.log(data.token) //? why this log undefined?
      /* console.log(data.username) */
      navigate('/kanbanize-lite/pagina-principal', { replace: true })
    } else {
      console.log('error')
    }
    /* console.log(response)
    console.log(data) */
  }

  /* const handlePassword = (e) => {
    e.preventDefault();
    const password = form.current.password.value;

    if(password === '') {
      setPasswordEmptyError(true);
    } else {
      setPasswordEmptyError(false);
    }
  } */

  return (
    <>
      <div className={login.grid}>
        <header className={login.formHeader}>
          <h1>Inicia sesión</h1>
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
            </div>
            <span className={login.formInputError}>Debe ingresar su correo electrónico institucional con el que se registro.</span>
          </fieldset>

          <fieldset className={login.formGroup} id={`${id}-formGroupPassword`}>
            <label className={login.formLabel} htmlFor={`${id}-password`}>
              <FontAwesomeIcon icon={faLock} />
            </label>
            <div className={login.formInputLogin}>
              <input type="password" className={login.inputLogin} id={`${id}-password`} name="password" placeholder="Contraseña" /* title='Ingrese su contraseña.' */ onInvalid={e => e.target.setCustomValidity('Por favor, ingrese aquí su contraseña.')} /* onPaste={(e) => {e.preventDefault(); return false;}} */ /* onCopy={(e) => {e.preventDefault(); return false;}} */ /* onBlur={handlePassword} */ /* onSelectStart={(e) => {e.preventDefault(); return false;}} */ autoComplete="true" required/>
            </div>
              {/* {
                passwordEmptyError &&
                <span className={login.passwordEmptyError}>Debe ingresar su contraseña con la que se registro.</span>
              } */}
          </fieldset>

          <span className={login.newAccount}>¿No tienes cuenta?, regístrate <br/> <Link to="/registro-de-cuenta">aquí &gt;</Link>.</span>

          <footer className={login.formFooterLogin}>
            <button className={login.formBtnSubmitLogin} type="submit">Continuar</button>
          </footer>
        </form>
      </div>
    </>
  )
}