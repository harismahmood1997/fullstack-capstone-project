import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import GiftCard from '../components/GiftCard'
import gifts from '../data/gifts'
import { useApp } from '../context/AppContext'

function Gifts() {
  const [searchText, setSearchText] = useState('')
  const [apiGifts, setApiGifts] = useState(gifts)
  const [searchParams, setSearchParams] = useSearchParams()
  const [category, setCategory] = useState(searchParams.get('category') || 'All')
  const categories = ['All', 'Furniture', 'Electronics', 'Kitchen', 'Clothing', 'Books', 'Other']
  const { userItems } = useApp()
  useEffect(() => {
    fetch('http://localhost:5000/api/gifts')
      .then((response) => response.ok ? response.json() : gifts)
      .then((data) => setApiGifts(data))
  }, [])

  const allGifts = [...apiGifts, ...userItems]

  const filteredGifts = allGifts.filter((gift) => {
    const matchesSearch = gift.name.toLowerCase().includes(searchText.toLowerCase())
    const matchesCategory = category === 'All' || gift.category === category
    return matchesSearch && matchesCategory
  })

  function chooseCategory(value) {
    setCategory(value)
    if (value === 'All') setSearchParams({})
    else setSearchParams({ category: value })
  }

  return (
    <main className="page-content">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Find something useful</p>
          <h1>Browse Gifts</h1>
        </div>
        <p>{filteredGifts.length} items available</p>
      </div>
      <div className="browse-layout">
        <aside className="filter-sidebar">
          <label htmlFor="search">Search by name</label>
          <input id="search" placeholder="Search gifts..." value={searchText} onChange={(event) => setSearchText(event.target.value)} />
          <p>Categories</p>
          {categories.map((itemCategory) => <button className={category === itemCategory ? 'filter-option selected' : 'filter-option'} key={itemCategory} onClick={() => chooseCategory(itemCategory)}>{itemCategory}</button>)}
        </aside>
        <div className="gift-grid">
        {filteredGifts.map((gift) => <GiftCard key={gift.id} gift={gift} />)}
        </div>
      </div>
      {filteredGifts.length === 0 && <p className="empty-message">No gifts match your search.</p>}
    </main>
  )
}

export default Gifts
