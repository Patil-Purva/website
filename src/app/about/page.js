export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#f3fdf5]">

            {/* TOP SECTION */}
            <section className="max-w-7xl mx-auto px-6 pt-12 pb-12">

                <div className="text-center">

                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                        About{" "}
                        <span className="text-green-700">
                            Shrikrishna Arogyadham
                        </span>
                    </h1>

                    <p className="max-w-4xl mx-auto mt-7 text-lg text-gray-600 leading-9">
                        Shrikrishna Arogyadham is a trusted Ayurvedic
                        hospital dedicated to natural healing through
                        authentic Ayurveda and Panchakarma therapies.
                        Our goal is to restore health, balance, and wellness
                        using traditional Ayurvedic wisdom and holistic care.
                    </p>

                </div>

            </section>

            {/* INFO SECTION */}
            <section className="max-w-6xl mx-auto px-6 pb-14">

                <div className="grid md:grid-cols-2 gap-5">

                    {/* CARD 1 */}
                    <div className="bg-white rounded-[26px] p-7 shadow-md border border-green-200 hover:-translate-y-1 hover:shadow-xl transition duration-300">

                        <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-2xl mb-5">
                            🌿
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-3">
                            Ayurvedic Healing
                        </h2>

                        <p className="text-gray-600 leading-8">
                            We provide authentic Ayurvedic treatments focused
                            on improving overall health naturally through
                            herbal medicines and wellness practices.
                        </p>

                    </div>

                    {/* CARD 2 */}
                    <div className="bg-white rounded-[26px] p-7 shadow-md border border-green-200 hover:-translate-y-1 hover:shadow-xl transition duration-300">

                        <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-2xl mb-5">
                            🧘
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-3">
                            Panchakarma Therapy
                        </h2>

                        <p className="text-gray-600 leading-8">
                            Panchakarma therapies help detoxify the body,
                            improve immunity, reduce stress, and support
                            long-term wellness naturally.
                        </p>

                    </div>

                    {/* CARD 3 */}
                    <div className="bg-white rounded-[26px] p-7 shadow-md border border-green-200 hover:-translate-y-1 hover:shadow-xl transition duration-300">

                        <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-2xl mb-5">
                            ✨
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-3">
                            Holistic Wellness
                        </h2>

                        <p className="text-gray-600 leading-8">
                            Our treatments focus on balancing the body,
                            mind, and lifestyle to achieve complete wellness
                            through natural healthcare.
                        </p>

                    </div>

                    {/* CARD 4 */}
                    <div className="bg-white rounded-[26px] p-7 shadow-md border border-green-200 hover:-translate-y-1 hover:shadow-xl transition duration-300">

                        <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-2xl mb-5">
                            🪴
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-3">
                            Personalized Care
                        </h2>

                        <p className="text-gray-600 leading-8">
                            Every patient receives personalized Ayurvedic
                            care and treatment plans according to their
                            health and wellness needs.
                        </p>

                    </div>

                </div>

            </section>

            {/* SMALL STATS SECTION */}
            <section className="pb-10">

                <div className="max-w-4xl mx-auto px-6">

                    <div className="bg-green-700 rounded-[28px] shadow-lg px-6 py-7">

                        <div className="grid grid-cols-3 gap-6 text-center text-white">

                            <div>
                                <h2 className="text-3xl font-bold">
                                    100%
                                </h2>

                                <p className="mt-2 text-sm opacity-90">
                                    Natural Healing
                                </p>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold">
                                    500+
                                </h2>

                                <p className="mt-2 text-sm opacity-90">
                                    Happy Patients
                                </p>
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold">
                                    🧘
                                </h2>

                                <p className="mt-2 text-sm opacity-90">
                                    Panchakarma
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}