import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import API from "../api/axios"

function WorkerDetail() {
    const { id } = useParams()
    const [worker, setWorker] = useState(null)
    const [loading, setLoading] = useState(true)
    const [booking, setBooking] = useState(false)
    const [bookingSuccess, setBookingSuccess] = useState(false)

    const handleBook = async () => {
        setBooking(true)
        try {
            await API.post("/bookings", {
                customer_id: 1,
                worker_id: parseInt(id),
                service_id: 1,
                date: new Date().toISOString(),
                notes: ""
            })
            setBookingSuccess(true)
        } catch (e) {
            console.error(e)
        }
        setBooking(false)
    }

    useEffect(() => {
        const fetchWorker = async () => {
            try {
                const res = await API.get(`/workers/${id}`)
                setWorker(res.data)
            } catch (e) {
                console.error(e)
            }
            setLoading(false)
        }
        fetchWorker()
    }, [id])

    if (loading) return <p className="text-center py-20">Loading...</p>
    if (!worker) return <p className="text-center py-20">Worker not found.</p>

    return (
        <div className="max-w-2xl mx-auto px-6 py-10">
            <div className="bg-white border rounded-2xl shadow-lg p-8">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-2xl font-bold mb-1">{worker.name}</h1>
                        <p className="text-gray-500">📍 {worker.location}</p>
                    </div>
                    {worker.is_verified_worker && (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">✅ Verified</span>
                    )}
                </div>

                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                    <p className="text-gray-700">{worker.bio || "No bio available."}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-blue-600">Rs. {worker.hourly_rate}</p>
                        <p className="text-gray-500 text-sm">per hour</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-blue-600">{worker.trust_score}/100</p>
                        <p className="text-gray-500 text-sm">Trust Score</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-blue-600">{worker.experience} yrs</p>
                        <p className="text-gray-500 text-sm">Experience</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-blue-600">{worker.is_available ? "✅" : "❌"}</p>
                        <p className="text-gray-500 text-sm">Available</p>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="font-semibold mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {worker.skills?.split(",").map((skill, i) => (
                            <span key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                {skill.trim()}
                            </span>
                        ))}
                    </div>
                </div>

                {bookingSuccess && (
                    <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg mb-4 text-center">
                        ✅ Booking successful! Worker will contact you soon.
                    </div>
                )}

                <button 
                    onClick={handleBook}
                    disabled={booking || !localStorage.getItem("token")}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50">
                    {booking ? "Booking..." : !localStorage.getItem("token") ? "Login to Book" : "Book Now"}
                </button>
            </div>
        </div>
    )
}

export default WorkerDetail