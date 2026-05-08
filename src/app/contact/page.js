export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#f3fdf5] py-14 px-6">

            <div className="max-w-6xl mx-auto">

                {/* HEADING */}
                <div className="text-center mb-14">

                    <h1 className="text-5xl font-bold text-green-700 mb-4">
                        Contact Us
                    </h1>

                    <p className="text-gray-600 text-lg">
                        Get in touch for appointments and inquiries
                    </p>

                </div>

                {/* CONTACT CARDS */}
                <div className="grid md:grid-cols-3 gap-7 mb-12">

                    {/* PHONE */}
                    <div className="bg-white rounded-3xl p-8 shadow-md border border-green-100 text-center hover:shadow-xl transition">

                        <div className="text-5xl mb-5">
                            📞
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Phone
                        </h2>

                        <p className="text-gray-600 mb-6">
                            +91 94237 72844
                        </p>

                        <a href="tel:+919423772844">
                            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition">
                                Call Now
                            </button>
                        </a>

                    </div>

                    {/* EMAIL */}
                    <div className="bg-white rounded-3xl p-8 shadow-md border border-green-100 text-center hover:shadow-xl transition">

                        <div className="text-5xl mb-5">
                            ✉️
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Email
                        </h2>

                        <p className="text-gray-600 mb-6 break-all">
                            info@arogyadham.com
                        </p>

                        <a href="mailto:info@arogyadham.com">
                            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition">
                                Send Email
                            </button>
                        </a>

                    </div>

                    {/* WHATSAPP */}
                    <div className="bg-white rounded-3xl p-8 shadow-md border border-green-100 text-center hover:shadow-xl transition">

                        <div className="text-5xl mb-5">
                            💬
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            WhatsApp
                        </h2>

                        <p className="text-gray-600 mb-6">
                            +91 94237 72844
                        </p>

                        <a
                            href="https://wa.me/919423772844"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition">
                                Message Now
                            </button>
                        </a>

                    </div>

                </div>


                {/* VISIT US CARD */}
                <div className="max-w-3xl mx-auto">

                    <div className="bg-white rounded-3xl shadow-md border border-green-100 p-8 hover:shadow-xl transition">

                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                            {/* LEFT */}
                            <div className="text-center md:text-left">

                                <h2 className="text-3xl font-bold text-green-700 mb-4">
                                    Visit Us
                                </h2>

                                <div className="space-y-2 text-gray-700">

                                    <p className="font-semibold text-xl text-gray-800">
                                        Shrikrishna Arogyadham
                                    </p>

                                    <p>
                                        Kolhapur, Maharashtra
                                    </p>

                                    <p>
                                        India - 416200
                                    </p>

                                </div>

                            </div>

                            {/* RIGHT */}
                            <div className="bg-green-50 rounded-2xl px-8 py-6 text-center min-w-[240px]">

                                <h3 className="text-xl font-bold text-gray-800 mb-4">
                                    Opening Hours
                                </h3>

                                <div className="space-y-2 text-gray-600 text-sm">

                                    <p>
                                        Mon - Sat: 9AM - 7PM
                                    </p>

                                    <p>
                                        Sunday: 10AM - 2PM
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}