import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

function Navbar() {
  const { isLoggedIn, logout: logoutUser, cartItems } = useApp()
  const navigate = useNavigate()

  function logout() {
    logoutUser()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <Link className="logo" to="/">GiftLink</Link>
      <nav className="nav-links" aria-label="Main navigation">
        <Link to="/">Home</Link>
        <Link to="/gifts">Browse Gifts</Link>
        {isLoggedIn && <><Link to="/my-items">My Items</Link><Link to="/profile">Profile</Link><Link to="/add-item">Add Gift</Link></>}
      </nav>
      {isLoggedIn ? <button className="nav-button logout-button" onClick={logout}>Logout</button> : <div className="nav-actions"><Link className="nav-button cart-link" to="/cart">Cart <span>{cartItems.length}</span></Link><Link className="nav-button" to="/auth">Login / Register</Link></div>}
    </header>
  )
}

export default Navbar
