import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

function AddItem() {
  const [item, setItem] = useState({ name: '', description: '', category: 'Furniture', location: '', image: '' })
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const { addItem } = useApp()
  const categories = ['Furniture', 'Electronics', 'Kitchen', 'Clothing', 'Books', 'Other']

  function updateItem(event) {
    setItem({ ...item, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const response = await fetch('http://localhost:5000/api/gifts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('giftlinkToken')}` },
      body: JSON.stringify(item),
    })
    if (!response.ok) {
      setMessage('Please log in before adding a gift.')
      return
    }
    addItem(await response.json())
    navigate('/my-items')
  }

  return <main className="form-page"><form className="form-card" onSubmit={handleSubmit}><p className="eyebrow">Share something useful</p><h1>Add New Gift</h1><label>Item Name<input name="name" value={item.name} onChange={updateItem} required /></label><label>Description<textarea name="description" value={item.description} onChange={updateItem} required /></label><label>Category<select name="category" value={item.category} onChange={updateItem}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label><label>Location<input name="location" value={item.location} onChange={updateItem} required /></label><label>Image URL<input name="image" value={item.image} onChange={updateItem} /></label><button className="button" type="submit">Add Gift</button>{message && <p className="success-message">{message}</p>}</form></main>
}

export default AddItem
