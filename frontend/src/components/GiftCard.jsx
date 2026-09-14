import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

function GiftCard({ gift }) {
  const { addToCart } = useApp()

  return (
    <article className="gift-card">
      <img src={gift.image} alt={gift.name} />
      <div className="gift-card-content">
        <span className="category">{gift.category}</span>
        <h2>{gift.name}</h2>
        <p className="location">{gift.location}</p>
        <div className="card-actions">
          <Link className="button button-small" to={`/gifts/${gift.id}`}>View Details</Link>
          <button className="button button-small button-light" onClick={addToCart}>Add to Cart</button>
        </div>
      </div>
    </article>
  )
}

export default GiftCard
