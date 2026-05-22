import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import API from "../api/axios"

function Review() {
    const { bookingId, workerId } = useParams()
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async () => {
        setLoading(true)
        setError("")
        try {
            await API.post("/reviews", {
                booking_id: parseInt(bookingId),
                reviewer_id: parseInt(localStorage.getItem("user_id")),
                reviewee_id: parseInt(workerId),
                rating: parseInt(rating),
                comment: comment
            })
            navigate("/my-bookings")
        } catch (e) {
            setError(e.response?.data?.detail || "Failed to submit review!")
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-2">Leave a Review</h1>
                <p className="text-gray-500 text-center mb-8">How was your experience?</p>
                {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4">{error}</div>}
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Rating</label>
                    <div className="flex gap-2">
                        {[1,2,3,4,5].map(n => (
                            <button key={n} onClick={() => setRating(n)}
                                className={`text-3xl ${rating >= n ? "opacity-100" : "opacity-30"}`}>
                                ⭐
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">Comment</label>
                    <textarea className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4" placeholder="Share your experience..."
                        value={comment} onChange={e => setComment(e.target.value)} />
                </div>
                <button onClick={handleSubmit} disabled={loading}
                    className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 disabled:opacity-50">
                    {loading ? "Submitting..." : "Submit Review"}
                </button>
            </div>
        </div>
    )
}

export default Review