import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

function Cart() {
  const { cartItems, removeFromCart, clearCart } = useApp()

  return (
    <main className="page-content cart-page">
      <div className="page-heading">
        <div><p className="eyebrow">Saved for later</p><h1>My Cart</h1></div>
        {cartItems.length > 0 && <button className="button button-danger" onClick={clearCart}>Clear Cart</button>}
      </div>
      {cartItems.length === 0 ? <div className="empty-cart"><p>Your cart is empty.</p><Link className="button" to="/gifts">Browse Gifts</Link></div> : <div className="cart-list">
        {cartItems.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt={item.name} /><div><h2>{item.name}</h2><p>{item.category} · {item.location}</p></div><button className="button button-small button-danger" onClick={() => removeFromCart(item.id)}>Remove</button></div>)}
      </div>}
    </main>
  )
}

export default Cart
