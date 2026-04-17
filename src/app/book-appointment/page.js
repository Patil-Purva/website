import ProtectedRoute from "@/components/ProtectedRoute";
import AppointmentForm from "@/components/appointment/AppointmentForm";

export default function BookAppointmentPage() {
    return (
        <ProtectedRoute allowedRoles={["user"]}>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">

                <h1 className="text-2xl font-bold mb-4">
                    Book Appointment
                </h1>

                <AppointmentForm />

            </div>
        </ProtectedRoute>
    );
}