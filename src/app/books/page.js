import Image from "next/image";

export default function BooksPage() {

    const amazonLink =
        "https://www.amazon.in/s?k=Yog+Athapasun+Itiparyant&crid=3Q0NIV8DF088U&sprefix=yog+athapasun+itiparyant%2Caps%2C640&ref=nb_sb_noss";

    return (
        <div className="min-h-screen bg-[#f3f3f3] py-10 px-6">

            <div className="max-w-6xl mx-auto">

                {/* MAIN SECTION */}
                <div className="flex flex-col md:flex-row gap-14 items-start">

                    {/* LEFT SIDE IMAGE */}
                    <div className="flex-shrink-0 mx-auto md:mx-0">

                        <div className="bg-[#3d3d3d] p-5 rounded-md shadow-lg">

                            <Image
                                src="/images/book.png"
                                alt="Book"
                                width={340}
                                height={500}
                                priority
                                className="object-contain"
                            />

                        </div>

                    </div>

                    {/* RIGHT SIDE CONTENT */}
                    <div className="flex-1 pt-3">

                        <h1 className="text-4xl font-bold text-green-700 mb-3">
                            Yog Athapasun Itiparyant
                        </h1>

                        <p className="text-gray-500 italic text-lg mb-5">
                            By Dr. Prasad Sanagar
                        </p>

                        <h2 className="text-3xl font-bold text-orange-500 mb-6">
                            ₹499
                        </h2>

                        <p className="text-gray-700 leading-8 mb-5">
                            This comprehensive guide to Ayurvedic medicine
                            brings ancient healing wisdom to modern readers.
                        </p>

                        {/* FEATURES */}
                        <ul className="space-y-3 text-gray-700 mb-8">

                            <li>
                                • Fundamental principles of Ayurveda
                            </li>

                            <li>
                                • Personalized health approaches based on doshas
                            </li>

                            <li>
                                • Herbal remedies for common ailments
                            </li>

                            <li>
                                • Dietary guidelines for optimal health
                            </li>

                            <li>
                                • Daily routines for balance and wellness
                            </li>

                            <li>
                                • Traditional detoxification methods
                            </li>

                        </ul>

                        {/* BUTTONS */}
                        <div className="flex gap-4">

                            <a
                                href={amazonLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <button className="bg-green-700 hover:bg-green-800 text-white px-7 py-3 rounded-md font-medium transition">
                                    Buy Now
                                </button>
                            </a>

                            <a
                                href={amazonLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <button className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 rounded-md font-medium transition">
                                    Add to Cart
                                </button>
                            </a>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}