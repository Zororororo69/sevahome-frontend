import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import API from "../api/axios"

function EditProfile() {
    const [form, setForm] = useState({
        bio: "", hourly_rate: "", experience: "", location: "", skills: "", is_available: true
    })
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()
    const userId = localStorage.getItem("user_id")

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await API.get(`/worker/profile/${userId}`)
                const p = res.data
                setForm({
                    bio: p.bio || "",
                    hourly_rate: p.hourly_rate || "",
                    experience: p.experience || "",
                    location: p.location || "",
                    skills: p.skills || "",
                    is_available: p.is_available
                })
            } catch (e) {
                console.error(e)
            }
            setFetching(false)
        }
        fetchProfile()
    }, [])

    const handleChange = (e) => {
        const val = e.target.type === "checkbox" ? e.target.checked : e.target.value
        setForm({ ...form, [e.target.name]: val })
    }

    const handleSubmit = async () => {
        setLoading(true)
        setError("")
        try {
            await API.patch(`/worker/profile/${userId}`, {
                bio: form.bio,
                hourly_rate: parseFloat(form.hourly_rate),
                experience: parseInt(form.experience),
                location: form.location,
                skills: form.skills,
                is_available: form.is_available
            })
            setSuccess(true)
            setTimeout(() => navigate("/dashboard"), 1500)
        } catch (e) {
            setError(e.response?.data?.detail || "Failed to update profile!")
        }
        setLoading(false)
    }

    if (fetching) return <p className="text-center py-20">Loading...</p>

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-2">Edit Profile</h1>
                <p className="text-gray-500 text-center mb-8">Update your worker profile</p>
                {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4">{error}</div>}
                {success && <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg mb-4">✅ Profile updated!</div>}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <input className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="location" value={form.location} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Skills</label>
                    <input className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="skills" value={form.skills} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Hourly Rate (Rs.)</label>
                    <input className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="hourly_rate" type="number" value={form.hourly_rate} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Years of Experience</label>
                    <input className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="experience" type="number" value={form.experience} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Bio</label>
                    <textarea className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="bio" rows="3" value={form.bio} onChange={handleChange} />
                </div>
                <div className="mb-6 flex items-center gap-3">
                    <input type="checkbox" name="is_available" id="available"
                        checked={form.is_available} onChange={handleChange}
                        className="w-4 h-4" />
                    <label htmlFor="available" className="text-sm font-medium">Available for bookings</label>
                </div>
                <button onClick={handleSubmit} disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50">
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </div>
    )
}

export default EditProfile