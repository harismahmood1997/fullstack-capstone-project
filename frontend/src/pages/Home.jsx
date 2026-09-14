import { Link } from 'react-router-dom'
import GiftCard from '../components/GiftCard'
import gifts from '../data/gifts'

const categories = [
  { name: 'Furniture', image: gifts[0].image },
  { name: 'Electronics', image: gifts[5].image },
  { name: 'Kitchen', image: gifts[3].image },
  { name: 'Books', image: gifts[6].image },
]

function Home() {
  return (
    <main className="home-page">
      <section className="hero">
        <div>
          <p className="eyebrow">A simpler way to share</p>
          <h1>Give What You Don't Need</h1>
          <p className="hero-text">Find free items and give unwanted household items to others.</p>
          <div className="hero-buttons">
            <Link className="button" to="/register">Get Started</Link>
            <Link className="button button-light" to="/gifts">Browse Items</Link>
          </div>
        </div>
        <div className="hero-note">
          <span>01</span>
          <p>Good items deserve a second home.</p>
        </div>
      </section>

      <section className="benefits-grid" aria-label="GiftLink benefits">
        <div className="benefit"><span>24/7</span><p>Browse anytime</p></div>
        <div className="benefit"><span>100%</span><p>Free to share</p></div>
        <div className="benefit"><span>Local</span><p>Items near you</p></div>
        <div className="benefit"><span>Easy</span><p>Simple gifting</p></div>
      </section>

      {/* Category Section */}
      <section className="categories-section">
        <p className="eyebrow">Browse by type</p>
        <h2>What are you looking for?</h2>
        <div className="category-grid">
          {categories.map((category) => <Link className="category-circle" to={`/gifts?category=${category.name}`} key={category.name}><img src={category.image} alt="" /><span>{category.name}</span></Link>)}
        </div>
      </section>

        {/* products section */}
      <section className="home-intro">
        <div><p className="eyebrow">Start exploring</p><h2>Find something useful.</h2></div>
        <Link className="text-link" to="/gifts">See all gifts →</Link>
      </section>
      <section className="home-gifts">
        {gifts.slice(0, 4).map((gift) => <GiftCard key={gift.id} gift={gift} />)}
    </section>

      
    </main>
  )
}

export default Home
