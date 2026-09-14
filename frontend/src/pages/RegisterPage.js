import { createElement, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    try {
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Registration failed')
      navigate('/login')
    } catch (error) {
      setMessage(error.message)
    }
  }

  return createElement('main', { className: 'form-page' },
    createElement('form', { className: 'form-card', onSubmit: handleSubmit },
      createElement('p', { className: 'eyebrow' }, 'Join the community'),
      createElement('h1', null, 'Register'),
      createElement('label', { htmlFor: 'name' }, 'Name'),
      createElement('input', { id: 'name', name: 'name', value: form.name, onChange: updateField, required: true }),
      createElement('label', { htmlFor: 'email' }, 'Email'),
      createElement('input', { id: 'email', name: 'email', type: 'email', value: form.email, onChange: updateField, required: true }),
      createElement('label', { htmlFor: 'password' }, 'Password'),
      createElement('input', { id: 'password', name: 'password', type: 'password', value: form.password, onChange: updateField, required: true }),
      createElement('button', { className: 'button', type: 'submit' }, 'Register'),
      message && createElement('p', { className: 'success-message' }, message),
      createElement('p', { className: 'form-link' }, 'Already have an account? ', createElement(Link, { to: '/login' }, 'Login')),
    ),
  )
}

export default RegisterPage