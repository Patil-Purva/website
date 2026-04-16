import ProtectedRoute from "@/components/ProtectedRoute";

export default function BookAppointmentPage() {
    return (
        <ProtectedRoute allowedRoles={["user"]}>
            <h1>Book Appointment</h1>
        </ProtectedRoute>
    );
}