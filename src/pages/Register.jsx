import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import API from "../api/axios"

function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", role: "customer" })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleRegister = async () => {
        setLoading(true)
        setError("")
        try {
            await API.post("/register", form)
            navigate("/login")
        } catch (e) {
            setError(e.response?.data?.detail || "Registration failed!")
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-2">Join SevaHome</h1>
                <p className="text-gray-500 text-center mb-8">Create your account</p>

                {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4">{error}</div>}

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="name" placeholder="Pratik Nath"
                        value={form.name} onChange={handleChange} />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="email" type="email" placeholder="your@email.com"
                        value={form.email} onChange={handleChange} />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="phone" placeholder="98XXXXXXXX"
                        value={form.phone} onChange={handleChange} />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="password" type="password" placeholder="••••••••"
                        value={form.password} onChange={handleChange} />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">I am a</label>
                    <select className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="role" value={form.role} onChange={handleChange}>
                        <option value="customer">Customer — looking for help</option>
                        <option value="worker">Worker — offering services</option>
                    </select>
                </div>

                <button onClick={handleRegister} disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50">
                    {loading ? "Creating account..." : "Create Account"}
                </button>

                <p className="text-center mt-4 text-gray-500">
                    Already have an account? <Link to="/login" className="text-blue-600 font-medium">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Register