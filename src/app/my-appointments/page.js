import ProtectedRoute from "@/components/ProtectedRoute";
import AppointmentList from "@/components/appointment/AppointmentList";

export default function MyAppointmentPage() {
    return (
        <ProtectedRoute allowedRoles={["user"]}>
            <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-white flex justify-center p-6">

                <div className="w-full max-w-6xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-green-100">

                    {/* ✅ ONLY ONE HEADER */}
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-bold text-green-700 tracking-tight">
                            My Appointments
                        </h2>
                        <p className="text-gray-500 mt-2">
                            view your booked appointment and thier status
                        </p>
                    </div>

                    <AppointmentList />

                </div>
            </div>
        </ProtectedRoute>
    );
}