import { useState, useEffect } from "react"
import API from "../api/axios"

function WorkerDashboard() {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await API.get("/workers/1/bookings")
                setBookings(res.data)
            } catch (e) {
                console.error(e)
            }
            setLoading(false)
        }
        fetchBookings()
    }, [])

    const updateStatus = async (bookingId, status) => {
        try {
            await API.patch(`/bookings/${bookingId}/status?status=${status}`)
            setBookings(bookings.map(b => b.id === bookingId ? {...b, status} : b))
        } catch (e) {
            console.error(e)
        }
    }

    if (loading) return <p className="text-center py-20">Loading...</p>

    return (
        <div className="max-w-3xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-2">Worker Dashboard</h1>
            <p className="text-gray-500 mb-8">Manage your incoming bookings</p>
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
                            <p className="text-gray-500 text-sm">📅 {new Date(b.date).toLocaleDateString()}</p>
                            {b.notes && <p className="text-gray-500 text-sm mt-1">📝 {b.notes}</p>}
                            {b.status === "pending" && (
                                <div className="flex gap-3 mt-4">
                                    <button
                                        onClick={() => updateStatus(b.id, "confirmed")}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                                        ✅ Accept
                                    </button>
                                    <button
                                        onClick={() => updateStatus(b.id, "cancelled")}
                                        className="bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm hover:bg-red-200">
                                        ❌ Reject
                                    </button>
                                </div>
                            )}
                            {b.status === "confirmed" && (
                                <button
                                    onClick={() => updateStatus(b.id, "completed")}
                                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">
                                    Mark as Completed
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default WorkerDashboard