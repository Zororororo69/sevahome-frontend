import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../api/axios"

function WorkerSetup() {
    const [form, setForm] = useState({
        bio: "", hourly_rate: "", experience: "", location: "", skills: ""
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async () => {
        setLoading(true)
        setError("")
        try {
            await API.post("/worker/profile", {
                user_id: parseInt(localStorage.getItem("user_id")),
                bio: form.bio,
                hourly_rate: parseFloat(form.hourly_rate),
                experience: parseInt(form.experience),
                location: form.location,
                skills: form.skills
            })
            navigate("/dashboard")
        } catch (e) {
            setError(e.response?.data?.detail || "Failed to save profile!")
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-2">Set Up Your Profile</h1>
                <p className="text-gray-500 text-center mb-8">Let customers find you</p>
                {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4">{error}</div>}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <input className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="location" placeholder="e.g. Kathmandu"
                        value={form.location} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Skills (comma separated)</label>
                    <input className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="skills" placeholder="e.g. cleaning, cooking, laundry"
                        value={form.skills} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Hourly Rate (Rs.)</label>
                    <input className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="hourly_rate" type="number" placeholder="e.g. 150"
                        value={form.hourly_rate} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Years of Experience</label>
                    <input className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="experience" type="number" placeholder="e.g. 3"
                        value={form.experience} onChange={handleChange} />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">Bio</label>
                    <textarea className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="bio" rows="3" placeholder="Tell customers about yourself..."
                        value={form.bio} onChange={handleChange} />
                </div>
                <button onClick={handleSubmit} disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50">
                    {loading ? "Saving..." : "Save Profile"}
                </button>
            </div>
        </div>
    )
}

export default WorkerSetup