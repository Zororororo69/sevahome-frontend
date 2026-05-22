import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const name = localStorage.getItem("name")
    const role = localStorage.getItem("role")
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        localStorage.removeItem("name")
        navigate("/")
        window.location.reload()
    }

    return (
        <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">🏠 SevaHome</Link>
            <div className="flex gap-4 items-center">
                <Link to="/workers" className="hover:text-blue-200">Find Workers</Link>
                {name ? (
                    <>
                        <span className="text-blue-200">Hi, {name}!</span>
                        {role === "customer" && (
                            <Link to="/my-bookings" className="hover:text-blue-200">My Bookings</Link>
                        )}
                        {role === "worker" && (
                            <Link to="/dashboard" className="hover:text-blue-200">Dashboard</Link>
                        )}
                        <button onClick={handleLogout} className="bg-white text-blue-600 px-4 py-1 rounded-full hover:bg-blue-50">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="hover:text-blue-200">Login</Link>
                        <Link to="/register" className="bg-white text-blue-600 px-4 py-1 rounded-full hover:bg-blue-50">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar