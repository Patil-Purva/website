import ProtectedRoute from "@/components/ProtectedRoute";
import Dashboard from "@/components/doctor/Dashboard";

export default function DoctorDashboard() {
    return (
        <ProtectedRoute allowedRoles={["doctor"]}>
            <Dashboard />
        </ProtectedRoute>
    );
}