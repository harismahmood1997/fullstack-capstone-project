import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { useApp } from '../context/AppContext'
import gifts from '../data/gifts'

function Details() {
  const { id } = useParams()
  const { userItems } = useApp()
  const fallbackGift = [...gifts, ...userItems].find((item) => item.id === Number(id))
  const [gift, setGift] = useState(fallbackGift)
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState('')

  useEffect(() => {
    fetch(`http://localhost:5000/api/gifts/${id}`)
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (data) {
          setGift(data)
          setComments(data.comments || [])
        }
      })
  }, [id])

  async function addComment(event) {
    event.preventDefault()
    if (commentText.trim()) {
      const response = await fetch(`http://localhost:5000/api/gifts/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('giftlinkToken')}` },
        body: JSON.stringify({ comment: commentText }),
      })
      if (!response.ok) return
      setComments([...comments, await response.json()])
      setCommentText('')
    }
  }

  if (!gift) {
    return <main className="simple-page"><h1>Gift not found</h1><Link className="button" to="/gifts">Back to Gifts</Link></main>
  }

  return (
    <main className="details-page">
      <Link className="back-link" to="/gifts">← Back to Gifts</Link>
      <div className="details-card">
        <img src={gift.image} alt={gift.name} />
        <div className="details-copy">
          <span className="category">{gift.category}</span>
          <h1>{gift.name}</h1>
          <p>{gift.description}</p>
          <p><strong>Location:</strong> {gift.location}</p>
          <p><strong>Posted by:</strong> {gift.postedBy} · <strong>Date:</strong> {gift.postedDate}</p>
          <div className="comments-section"><h2>Comments</h2>{comments.map((comment, index) => <p className="comment" key={comment._id || index}>{comment.comment || comment}</p>)}<form onSubmit={addComment}><input placeholder="Write a comment" value={commentText} onChange={(event) => setCommentText(event.target.value)} /><button className="button button-small" type="submit">Add Comment</button></form></div>
          <button className="button" onClick={() => alert('Messaging will be available when the backend is added.')}>I am interested</button>
        </div>
      </div>
    </main>
  )
}

export default Details
