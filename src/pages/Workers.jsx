import { useState, useEffect } from "react"
import API from "../api/axios"
import WorkerCard from "../components/WorkerCard"

function Workers() {
    const [workers, setWorkers] = useState([])
    const [location, setLocation] = useState("")
    const [skill, setSkill] = useState("")
    const [loading, setLoading] = useState(false)

    const search = async () => {
        setLoading(true)
        try {
            const res = await API.get("/workers", { params: { location, skill } })
            setWorkers(res.data)
        } catch (e) {
            console.error(e)
        }
        setLoading(false)
    }

    useEffect(() => { search() }, [])

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-8">Find Workers</h1>
            <div className="flex gap-4 mb-8">
                <input className="border rounded-lg px-4 py-2 flex-1" placeholder="Location (e.g. Kathmandu)"
                    value={location} onChange={e => setLocation(e.target.value)} />
                <input className="border rounded-lg px-4 py-2 flex-1" placeholder="Skill (e.g. cooking)"
                    value={skill} onChange={e => setSkill(e.target.value)} />
                <button onClick={search} className="bg-blue-600 text-white px-6 py-2 rounded-lg">Search</button>
            </div>
            {loading ? <p>Loading...</p> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {workers.map(w => <WorkerCard key={w.id} worker={w} />)}
                    {workers.length === 0 && <p className="text-gray-500">No workers found.</p>}
                </div>
            )}
        </div>
    )
}
export default Workers

