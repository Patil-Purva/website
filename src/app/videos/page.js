export default function VideosPage() {

    const videos = [
        {
            id: "2-FuOSEAuos",
            title: "Ayurveda Health Tips",
        },
        {
            id: "fhTETk6WHqM",
            title: " Panchkarma For Vata diseases & arthritis",
        },
        {
            id: "VM0lSOjg_hY",
            title: "Panchakarma Benefits",
        },
        {
            id: "zVBsIYxZ3Xc",
            title: "Yoga & Wellness",
        },
    ];

    return (
        <div className="min-h-screen bg-[#f3fdf5] py-12 px-6">

            <div className="max-w-6xl mx-auto">

                {/* CHANNEL CARD */}
                <div className="bg-white rounded-3xl shadow-md border border-green-100 p-6 md:p-8 mb-14">

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                        {/* LEFT */}
                        <div className="flex items-center gap-5">

                            {/* CHANNEL IMAGE */}
                            <img
                                src="https://yt3.googleusercontent.com/ytc/AIdro_kQWzM0Dq8x2lK5k6t4N7j8x9sP0q1r2t3u4v=s176-c-k-c0x00ffffff-no-rj"
                                alt="Shrikrishna Arogyavani"
                                className="w-24 h-24 rounded-full object-cover"
                            />

                            {/* CHANNEL INFO */}
                            <div>

                                <h1 className="text-3xl font-bold text-gray-900">
                                    Shrikrishna Arogyavani
                                </h1>

                                <p className="text-gray-500 mt-1">
                                    @dr.prasadsanagar
                                </p>

                                <p className="text-gray-600 mt-3">
                                    🙏 Welcome to a space where health meets simplicity!
                                </p>

                            </div>

                        </div>

                        {/* SUBSCRIBE BUTTON */}
                        <a
                            href="https://www.youtube.com/@dr.prasadsanagar"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <button className="bg-red-600 hover:bg-red-700 text-white px-7 py-3 rounded-lg font-medium transition">
                                Subscribe
                            </button>
                        </a>

                    </div>

                </div>

                {/* HEADING */}
                <div className="text-center mb-12">

                    <h2 className="text-5xl font-bold text-green-700 mb-4">
                        Our YouTube Videos
                    </h2>

                    <p className="text-gray-600 text-lg">
                        Explore our latest videos on Ayurveda and Yoga!
                    </p>

                </div>

                {/* VIDEO GRID */}
                <div className="grid md:grid-cols-2 gap-8">

                    {videos.map((video, index) => (

                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-md border border-green-100 overflow-hidden hover:shadow-xl transition"
                        >

                            {/* YOUTUBE EMBED */}
                            <div className="aspect-video">

                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${video.id}`}
                                    title={video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>

                            </div>

                            {/* TITLE */}
                            <div className="p-4">

                                <h3 className="text-lg font-semibold text-gray-800">
                                    {video.title}
                                </h3>

                            </div>

                        </div>

                    ))}

                </div>

                <div className="text-center mt-14">

                    <p className="text-gray-600 text-lg mb-5">
                        For more Ayurveda, Yoga, and Panchakarma videos,
                        visit our official YouTube channel.
                    </p>

                    <a
                        href="https://www.youtube.com/@dr.prasadsanagar"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition">
                            Visit Our YouTube Channel
                        </button>
                    </a>

                </div>

            </div>

        </div>
    );
}