import ProtectedRoute from "@/components/ProtectedRoute";
import AppointmentForm from "@/components/appointment/AppointmentForm";

export default function BookAppointmentPage() {
    return (
        <ProtectedRoute allowedRoles={["user"]}>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">


                <AppointmentForm />

            </div>
        </ProtectedRoute>
    );
}