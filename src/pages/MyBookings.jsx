import { useState, useEffect } from "react"
import API from "../api/axios"

function MyBookings() {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await API.get(`/customers/${localStorage.getItem("user_id")}/bookings`)
                setBookings(res.data)
            } catch (e) {
                console.error(e)
            }
            setLoading(false)
        }
        fetchBookings()
    }, [])

    if (loading) return <p className="text-center py-20">Loading...</p>

    return (
        <div className="max-w-3xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
            {bookings.length === 0 ? (
                <p className="text-gray-500">No bookings yet.</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {bookings.map(b => (
                        <div key={b.id} className="border rounded-xl p-6 shadow">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-semibold text-lg">Booking #{b.id}</h3>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    b.status === "completed" ? "bg-green-100 text-green-700" :
                                    b.status === "confirmed" ? "bg-blue-100 text-blue-700" :
                                    b.status === "cancelled" ? "bg-red-100 text-red-700" :
                                    "bg-yellow-100 text-yellow-700"
                                }`}>
                                    {b.status}
                                </span>
                            </div>
                            <p className="text-gray-700 font-medium">👷 {b.worker_name}</p>
                            <p className="text-gray-500 text-sm">📍 {b.worker_location}</p>
                            <p className="text-gray-500 text-sm">🛠 {b.worker_skills}</p>
                            <p className="text-gray-500 text-sm">📅 {new Date(b.date).toLocaleDateString()}</p>
                            {b.notes && <p className="text-gray-500 text-sm mt-1">📝 {b.notes}</p>}
                            {b.status === "completed" && (
                                <button
                                    onClick={() => window.location.href = `/review/${b.id}/${b.worker_id}`}
                                    className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-600">
                                    ⭐ Leave Review
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyBookings