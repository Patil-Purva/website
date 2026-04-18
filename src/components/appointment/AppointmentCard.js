export default function AppointmentCard({ appointment }) {
    const { date, timeSlot, status } = appointment;

    // Format date
    const formattedDate = new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    // Format time (AM/PM)
    const formatTime = (time) => {
        const [hour, minute] = time.split(":");
        const h = parseInt(hour);
        const ampm = h >= 12 ? "PM" : "AM";
        const finalHour = h % 12 || 12;
        return `${finalHour}:${minute} ${ampm}`;
    };

    // Status color
    const statusStyle = {
        pending: "bg-yellow-100 text-yellow-700",
        confirmed: "bg-green-100 text-green-700",
        rejected: "bg-red-100 text-red-700",
    };

    return (
        <div className="bg-white rounded-2xl shadow-md p-5 border hover:shadow-lg transition">

            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-700">
                    Appointment
                </h3>

                <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyle[status] || "bg-gray-100 text-gray-600"
                        }`}
                >
                    {status}
                </span>
            </div>

            <div className="space-y-1 text-sm text-gray-600">
                <p>
                    📅 <span className="font-medium">{formattedDate}</span>
                </p>

                <p>
                    ⏰ <span className="font-medium">{formatTime(timeSlot)}</span>
                </p>
            </div>
        </div>
    );
}