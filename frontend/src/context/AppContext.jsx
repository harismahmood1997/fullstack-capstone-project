import { createContext, useContext, useEffect, useState } from 'react'

const AppContext = createContext()

const defaultProfile = {
  name: 'Alex Morgan',
  email: 'alex@example.com',
  location: 'Austin, TX',
}

function getSavedItems() {
  return JSON.parse(localStorage.getItem('giftlinkUserItems')) || []
}

function AppProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true')
  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem('giftlinkCart')) || [])
  const [userItems, setUserItems] = useState(getSavedItems)
  const [profile, setProfile] = useState(() => JSON.parse(localStorage.getItem('giftlinkProfile')) || defaultProfile)

  useEffect(() => {
    localStorage.setItem('giftlinkCart', JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    localStorage.setItem('giftlinkUserItems', JSON.stringify(userItems))
  }, [userItems])

  useEffect(() => {
    localStorage.setItem('giftlinkProfile', JSON.stringify(profile))
  }, [profile])

  function login() {
    localStorage.setItem('isLoggedIn', 'true')
    setIsLoggedIn(true)
  }

  function saveLogin(token, user) {
    localStorage.setItem('giftlinkToken', token)
    localStorage.setItem('isLoggedIn', 'true')
    if (user) localStorage.setItem('giftlinkProfile', JSON.stringify(user))
    if (user) setProfile(user)
    setIsLoggedIn(true)
  }

  function logout() {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('giftlinkToken')
    setIsLoggedIn(false)
  }

  function addToCart(item) {
    const alreadyAdded = cartItems.some((cartItem) => cartItem.id === item.id)
    if (!alreadyAdded) setCartItems([...cartItems, item])
  }

  function removeFromCart(itemId) {
    setCartItems(cartItems.filter((item) => item.id !== itemId))
  }

  function clearCart() {
    setCartItems([])
  }

  function addItem(item) {
    setUserItems([...userItems, item])
  }

  function updateItem(updatedItem) {
    setUserItems(userItems.map((item) => item.id === updatedItem.id ? updatedItem : item))
  }

  function deleteItem(itemId) {
    setUserItems(userItems.filter((item) => item.id !== itemId))
  }

  return (
    <AppContext.Provider value={{ isLoggedIn, login, saveLogin, logout, cartItems, addToCart, removeFromCart, clearCart, userItems, addItem, updateItem, deleteItem, profile, setProfile }}>
      {children}
    </AppContext.Provider>
  )
}

function useApp() {
  return useContext(AppContext)
}

export { AppProvider, useApp }
