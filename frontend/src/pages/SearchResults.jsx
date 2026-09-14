import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import GiftCard from '../components/GiftCard'
import gifts from '../data/gifts'
import { useApp } from '../context/AppContext'

function SearchResults() {
  const [searchParams] = useSearchParams()
  const [searchText, setSearchText] = useState(searchParams.get('q') || '')
  const { userItems } = useApp()
  const results = [...gifts, ...userItems].filter((gift) => gift.name.toLowerCase().includes(searchText.toLowerCase()))

  return (
    <main className="page-content">
      <p className="eyebrow">Search gifts</p>
      <h1>Search Results</h1>
      <input className="search-input" placeholder="Search gifts..." value={searchText} onChange={(event) => setSearchText(event.target.value)} />
      <div className="gift-grid search-grid">{results.map((gift) => <GiftCard key={gift.id} gift={gift} />)}</div>
      {results.length === 0 && <p className="empty-message">No gifts found.</p>}
    </main>
  )
}

export default SearchResults
