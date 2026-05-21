import { Link } from 'react-router-dom'

function Home() {
    return (
        <div>
            {/* Hero Section */}
            <div className="bg-blue-600 text-white py-20 px-6 text-center">
                <h1 className="text-5xl font-bold mb-4">Find Trusted Home Help</h1>
                <p className="text-xl mb-8">Connect with verified housekeepers and kitchen staff in Nepal</p>
                <Link to="/workers" className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50">
                    Find Workers Now
                </Link>
            </div>

            {/* Services Section */}
            <div className="py-16 px-6 text-center">
                <h2 className="text-3xl font-bold mb-12">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <div className="p-6 border rounded-xl shadow hover:shadow-lg">
                        <div className="text-5xl mb-4">🧹</div>
                        <h3 className="text-xl font-semibold mb-2">Housekeeping</h3>
                        <p className="text-gray-600">Professional home cleaning and organizing</p>
                    </div>
                    <div className="p-6 border rounded-xl shadow hover:shadow-lg">
                        <div className="text-5xl mb-4">🍳</div>
                        <h3 className="text-xl font-semibold mb-2">Cooking</h3>
                        <p className="text-gray-600">Daily meal preparation and kitchen service</p>
                    </div>
                    <div className="p-6 border rounded-xl shadow hover:shadow-lg">
                        <div className="text-5xl mb-4">👶</div>
                        <h3 className="text-xl font-semibold mb-2">Childcare</h3>
                        <p className="text-gray-600">Trusted babysitters and nannies</p>
                    </div>
                </div>
            </div>

            {/* Trust Section */}
            <div className="bg-gray-50 py-16 px-6 text-center">
                <h2 className="text-3xl font-bold mb-12">Why SevaHome?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <div>
                        <div className="text-4xl mb-4">✅</div>
                        <h3 className="font-semibold text-lg">Verified Workers</h3>
                        <p className="text-gray-600">Background checked and ID verified</p>
                    </div>
                    <div>
                        <div className="text-4xl mb-4">⭐</div>
                        <h3 className="font-semibold text-lg">Trust Score</h3>
                        <p className="text-gray-600">Unique scoring system for every worker</p>
                    </div>
                    <div>
                        <div className="text-4xl mb-4">🇳🇵</div>
                        <h3 className="font-semibold text-lg">Made for Nepal</h3>
                        <p className="text-gray-600">Nepali language support coming soon</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home