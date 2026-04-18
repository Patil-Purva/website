import ProtectedRoute from "@/components/ProtectedRoute";
import AppointmentList from "@/components/appointment/appointment-list";

export default function MyAppointmentPage() {
    return (
        <ProtectedRoute allowedRoles={["user"]}>
            <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-50 flex justify-center p-6">

                <div className="w-full max-w-6xl bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-green-100">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-green-700">
                            My Appointments
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                            View your booked appointments and their status.
                        </p>
                    </div>

                    {/* Client Component */}
                    <AppointmentList />

                </div>
            </div>
        </ProtectedRoute>
    );
}