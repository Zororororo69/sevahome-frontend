import { Link } from 'react-router-dom'
function WorkerCard({ worker }) {
    return (
        <div className="border rounded-xl p-4 shadow hover:shadow-lg">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{worker.bio?.slice(0, 40) || "Worker"}...</h3>
                {worker.is_verified_worker && <span className="text-green-600 text-sm">✅ Verified</span>}
            </div>
            <p className="text-gray-500 text-sm mb-1">📍 {worker.location}</p>
            <p className="text-gray-500 text-sm mb-1">🛠 {worker.skills}</p>
            <p className="text-gray-500 text-sm mb-3">⭐ Trust Score: {worker.trust_score}/100</p>
            <div className="flex justify-between items-center">
                <span className="font-bold text-blue-600">Rs. {worker.hourly_rate}/hr</span>
                <Link to={`/workers/${worker.id}`} className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm">View</Link>
            </div>
        </div>
    )
}
export default WorkerCard