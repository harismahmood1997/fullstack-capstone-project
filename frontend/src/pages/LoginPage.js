import { createElement, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')
  const { saveLogin } = useApp()
  const navigate = useNavigate()

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    try {
      const token = localStorage.getItem('giftlinkToken')
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(form),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Login failed')
      saveLogin(data.token, data.user)
      navigate('/gifts')
    } catch (error) {
      setMessage(error.message)
    }
  }

  return createElement('main', { className: 'form-page' },
    createElement('form', { className: 'form-card', onSubmit: handleSubmit },
      createElement('p', { className: 'eyebrow' }, 'Welcome back'),
      createElement('h1', null, 'Login'),
      createElement('label', { htmlFor: 'email' }, 'Email'),
      createElement('input', { id: 'email', name: 'email', type: 'email', value: form.email, onChange: updateField, required: true }),
      createElement('label', { htmlFor: 'password' }, 'Password'),
      createElement('input', { id: 'password', name: 'password', type: 'password', value: form.password, onChange: updateField, required: true }),
      createElement('button', { className: 'button', type: 'submit' }, 'Login'),
      message && createElement('p', { className: 'success-message' }, message),
      createElement('p', { className: 'form-link' }, "Don't have an account? ", createElement(Link, { to: '/register' }, 'Register')),
    ),
  )
}

export default LoginPage