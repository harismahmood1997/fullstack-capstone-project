import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

function MyItems() {
	const { userItems: items, deleteItem } = useApp()
	const navigate = useNavigate()

	return (
		<main className="page-content my-items-page">
			<div className="page-heading"><div><p className="eyebrow">Your shared items</p><h1>My Items</h1></div><Link className="button" to="/add-item">Add Gift</Link></div>
			<div className="my-items-list">
				{items.map((item) => <div className="my-item" key={item.id}><div><h2>{item.name}</h2><span className="category">{item.category}</span><p>{item.location}</p></div><div className="item-actions"><button className="button button-small button-light" onClick={() => navigate(`/edit-item/${item.id}`)}>Edit</button><button className="button button-small button-danger" onClick={() => deleteItem(item.id)}>Delete</button></div></div>)}
				{items.length === 0 && <p className="empty-message">You have not posted any items yet.</p>}
			</div>
		</main>
	)
}

export default MyItems
