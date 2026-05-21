import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Workers from './pages/Workers'
import Login from './pages/Login'
import Register from './pages/Register'
import WorkerDetail from './pages/WorkerDetail'
import MyBookings from './pages/MyBookings'
import WorkerDashboard from './pages/WorkerDashboard'

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/workers" element={<Workers />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/workers/:id" element={<WorkerDetail />} />
                <Route path="/my-bookings" element={<MyBookings />} />
                <Route path="/dashboard" element={<WorkerDashboard />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App