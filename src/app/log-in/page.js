'use client'

import { useRef, useId, useState } from "react"

export default function LogIn () {
  const apiUrl = 'http://localhost:3000/api/v2'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const data = {
      email,
      password
    }

    fetch(apiUrl+"/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    <>
      <header>
        <h1>Login</h1>
      </header>

      <form onSubmit={handleSubmit}>

        <fieldset>

          <div>
            <input type='email' name='email' placeholder='email' title='Enter your email' onChange={handleEmailChange} />
          </div>

        </fieldset>

        <fieldset>

          <div>
            <input type='pas' name='password' placeholder='password' title='Enter your password' onChange={handlePasswordChange} />
          </div>

        </fieldset>

        <footer>
          <button type='submit'>Login</button>
        </footer>

      </form>
    </>
  )
}
