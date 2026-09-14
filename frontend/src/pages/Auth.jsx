import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const { login } = useApp()
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    if (!isLogin && password !== confirmPassword) {
      setMessage('Passwords do not match.')
      return
    }

    if (isLogin) {
      login()
      navigate('/gifts')
    } else {
      setMessage('Registration successful. You can now login.')
      setIsLogin(true)
    }
  }

  return (
    <main className="form-page">
      <form className="form-card" onSubmit={handleSubmit}>
        <div className="auth-tabs">
          <button type="button" className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Login</button>
          <button type="button" className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Register</button>
        </div>
        <p className="eyebrow">GiftLink community</p>
        <h1>{isLogin ? 'Welcome back' : 'Create account'}</h1>
        {!isLogin && <><label htmlFor="name">Name</label><input id="name" value={name} onChange={(event) => setName(event.target.value)} required /></>}
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        {!isLogin && <><label htmlFor="confirmPassword">Confirm Password</label><input id="confirmPassword" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required /></>}
        <button className="button" type="submit">{isLogin ? 'Login' : 'Register'}</button>
        {message && <p className="success-message">{message}</p>}
      </form>
    </main>
  )
}

export default Auth
