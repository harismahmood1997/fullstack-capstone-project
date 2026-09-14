import { Navigate, Routes, Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Cart from './pages/Cart'
import Gifts from './pages/Gifts'
import Details from './pages/Details'
import Profile from './pages/Profile'
import MyItems from './pages/MyItems'
import AddItem from './pages/AddItem'
import EditItem from './pages/EditItem'
import SearchResults from './pages/SearchResults'
import NotFound from './pages/NotFound'

function App() {
  const location = useLocation()
  const isAuthPage = ['/auth', '/login', '/register'].includes(location.pathname)

  return (
    <div className="app">
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/gifts" element={<Gifts />} />
        <Route path="/gifts/:id" element={<Details />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/my-items" element={<ProtectedRoute><MyItems /></ProtectedRoute>} />
        <Route path="/add-item" element={<ProtectedRoute><AddItem /></ProtectedRoute>} />
        <Route path="/edit-item/:id" element={<ProtectedRoute><EditItem /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAuthPage && <Footer />}
    </div>
  )
}

export default App
