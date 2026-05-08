export default function Footer() {
    return (
        <footer className="bg-green-600 text-white py-5 mt-8">

            <div className="max-w-6xl mx-auto px-6">

                <div className="grid md:grid-cols-2 gap-6 text-center">

                    {/* CONTACT */}
                    <div>

                        <h2 className="text-xl font-semibold text-orange-300 mb-3">
                            Contact Us
                        </h2>

                        <div className="space-y-2 text-sm">

                            <p>
                                📍 Near Gol Circle, Rankala Stand, Kolhapur
                            </p>

                            <p>
                                📞 +91 XXXXXXXXXX
                            </p>

                            <p>
                                ✉️ info@shrikrishnaarogyadham.com
                            </p>

                        </div>

                    </div>

                    {/* OPENING HOURS */}
                    <div>

                        <h2 className="text-xl font-semibold text-orange-300 mb-3">
                            Opening Hours
                        </h2>

                        <div className="space-y-2 text-sm">

                            <p>
                                Monday - Saturday: 9:00 AM - 8:00 PM
                            </p>

                            <p>
                                Sunday: 10:00 AM - 2:00 PM
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </footer>
    );
}