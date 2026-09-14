import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'

function EditItem() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { userItems: savedItems, updateItem: saveItem } = useApp()
  const existingItem = savedItems.find((item) => item.id === Number(id))
  const [item, setItem] = useState(existingItem || { name: '', description: '', category: 'Other', location: '', image: '' })
  const categories = ['Furniture', 'Electronics', 'Kitchen', 'Clothing', 'Books', 'Other']

  function updateItem(event) {
    setItem({ ...item, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    saveItem(item)
    navigate('/my-items')
  }

  if (!existingItem) return <main className="simple-page"><h1>Item not found</h1></main>

  return <main className="form-page"><form className="form-card" onSubmit={handleSubmit}><p className="eyebrow">Update your item</p><h1>Edit Gift</h1><label>Item Name<input name="name" value={item.name} onChange={updateItem} required /></label><label>Description<textarea name="description" value={item.description} onChange={updateItem} required /></label><label>Category<select name="category" value={item.category} onChange={updateItem}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label><label>Location<input name="location" value={item.location} onChange={updateItem} required /></label><label>Image URL<input name="image" value={item.image} onChange={updateItem} /></label><button className="button" type="submit">Update Gift</button></form></main>
}

export default EditItem
