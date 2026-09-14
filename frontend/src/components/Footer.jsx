function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <p className="footer-logo">GiftLink</p>
          <p className="footer-description">Give useful things a second home.</p>
        </div>
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/gifts">Browse Gifts</a>
          <a href="/auth">Login</a>
        </div>
      </div>
      <div className="footer-bottom">© 2026 GiftLink <span>Share more. Waste less.</span></div>
    </footer>
  )
}

export default Footer
