import { useState } from 'react'
import { useApp } from '../context/AppContext'

function Profile() {
  const [editing, setEditing] = useState(false)
  const [message, setMessage] = useState('')
  const { profile, setProfile } = useApp()

  function updateProfile(event) {
    setProfile({ ...profile, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('giftlinkToken')
    const response = await fetch('http://localhost:5000/api/auth/user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(profile),
    })
    if (response.ok) {
      setMessage('Profile updated.')
      setEditing(false)
    } else {
      setMessage('Could not update profile.')
    }
  }

  return (
    <main className="profile-page">
      <div className="profile-card">
        <div className="avatar">AM</div>
        <p className="eyebrow">Your account</p>
        <h1>{profile.name}</h1>
        {!editing ? <>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Location:</strong> {profile.location}</p>
          <button className="button" onClick={() => setEditing(true)}>Edit Profile</button>
        </> : <form onSubmit={handleSubmit} className="edit-form">
          <label>Name<input name="name" value={profile.name} onChange={updateProfile} /></label>
          <label>Email<input name="email" type="email" value={profile.email} onChange={updateProfile} /></label>
          <label>Location<input name="location" value={profile.location} onChange={updateProfile} /></label>
          <button className="button" type="submit">Save</button>
        </form>}
        {message && <p className="success-message">{message}</p>}
      </div>
    </main>
  )
}

export default Profile
