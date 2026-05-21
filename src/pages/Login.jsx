import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import API from "../api/axios"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async () => {
        setLoading(true)
        setError("")
        try {
            const res = await API.post("/login", { email, password })
            localStorage.setItem("token", res.data.access_token)
            localStorage.setItem("role", res.data.role)
            localStorage.setItem("name", res.data.name)
            localStorage.setItem("user_id", res.data.user_id)
            navigate("/")
        } catch (e) {
            setError(e.response?.data?.detail || "Login failed!")
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
                <p className="text-gray-500 text-center mb-8">Login to SevaHome</p>

                {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4">{error}</div>}

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="email" placeholder="your@email.com"
                        value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="password" placeholder="••••••••"
                        value={password} onChange={e => setPassword(e.target.value)} />
                </div>

                <button onClick={handleLogin} disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50">
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="text-center mt-4 text-gray-500">
                    Don't have an account? <Link to="/register" className="text-blue-600 font-medium">Sign Up</Link>
                </p>
            </div>
        </div>
    )
}

export default Login