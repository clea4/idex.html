// ❗ DO NOT CHANGE THIS FILE
import React, { useState } from 'react'
import axios from 'axios'

function Spinner(props) {
  return props.on ? <div>Please wait...</div> : props.children
}

const baseURL = 'http://localhost:9009/auth'
const initialForm = { username: '', password: '' }

export default function Auth() {
  const [message, setMessage] = useState('')
  const [user, setUser] = useState()
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)

  const onChange = evt => {
    const { name, value } = evt.target
    setForm({ ...form, [name]: value })
  }
  const onSubmit = async evt => {
    evt.preventDefault()
    setSubmitting(true)
    try {
      const { data } = await axios.post(
        `${baseURL}/login`,
        { username: form.username.trim(), password: form.password }
      )
      setUser(data.user)
      setMessage(data.message)
      setForm(initialForm)
    } catch (err) {
      setUser()
      setMessage(err.response.data.message)
    } finally {
      setSubmitting(false)
    }
  }
  const onLogout = async () => {
    setSubmitting(true)
    try {
      const { data } = await axios.get(`${baseURL}/logout`)
      setMessage(data.message)
    } catch (err) {
      setMessage(`Unexpected error: ${err.message}`)
    } finally {
      setUser()
      setSubmitting(false)
    }
  }
  return (
    <div>
      <Spinner on={submitting}>
        {
          user
            ? (
              <>
                <h2>Stars&apos; Lounge</h2>
                <h3>{message}</h3>
                <section>
                  <div>ID: {user.id}, Username: {user.username}, Born: {user.born}</div>
                </section>
                <button data-testid="logoutBtn" onClick={onLogout}>Logout</button>
              </>
            )
            : (
              <>
                <h2>Login Form</h2>
                <h3>{message}</h3>
                <form onSubmit={onSubmit} data-testid="loginForm">
                  <input
                    value={form.username}
                    onChange={onChange}
                    name='username'
                    placeholder='type username'
                  />
                  <input
                    value={form.password}
                    onChange={onChange}
                    name='password'
                    type='password'
                    placeholder='type password'
                  />
                  <button data-testid="loginBtn" type="submit">Login</button>
                </form>
              </>
            )
        }
      </Spinner>
    </div>
  )
}
