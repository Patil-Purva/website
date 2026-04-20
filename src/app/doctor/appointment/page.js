import ProtectedRoute from "@/components/ProtectedRoute";
import DoctorAppointmentList from "@/components/doctor/DoctorAppointmentList";

export default function DoctorAppointmentsPage() {
    return (
        <ProtectedRoute allowedRoles={["doctor"]}>
            <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-50 flex justify-center p-6">

                <div className="w-full max-w-7xl bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-green-100">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-green-700">
                            Doctor Dashboard
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                            Manage patient appointments
                        </p>
                    </div>

                    <DoctorAppointmentList />

                </div>
            </div>
        </ProtectedRoute>
    );
}