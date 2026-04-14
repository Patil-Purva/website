"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupForm() {
    const router = useRouter();

    // --- API function ---
    const signupUser = async (userData) => {
        const response = await axios.post(
            "http://localhost:5000/api/v1/auth/register",
            userData,
            {
                withCredentials: true, // 🔥 IMPORTANT (future-proof)
            }
        );
        return response.data;
    };

    // --- React Query mutation ---
    const mutation = useMutation({
        mutationFn: signupUser,

        // ✅ SUCCESS
        onSuccess: (data) => {
            toast.success(data.message || "User registered successfully");

            formik.resetForm();

            // 🔥 redirect to login (best practice)
            setTimeout(() => {
                router.push("/login");
            }, 1000);
        },

        // ✅ ERROR (backend aligned)
        onError: (error) => {
            const message =
                error.response?.data?.error?.message ||
                "Signup failed!";

            toast.error(message);

            // 🔥 show error under email only
            if (message.toLowerCase().includes("email")) {
                formik.setFieldError("email", message);
            }
        },
    });

    // --- Formik setup ---
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            mobile: "",
            password: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, "Name must be at least 2 characters")
                .required("Name is required"),

            email: Yup.string()
                .email("Invalid email")
                .required("Email is required"),

            mobile: Yup.string()
                .matches(/^[0-9]{10}$/, "Mobile must be 10 digits")
                .required("Mobile is required"),

            password: Yup.string()
                .min(6, "Minimum 6 characters")
                .required("Password is required"),
        }),
        onSubmit: (values) => {
            mutation.mutate(values);
        },
    });

    return (
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
                Create Account 🌿
            </h2>

            <form onSubmit={formik.handleSubmit} className="space-y-4">

                {/* Name */}
                <div>
                    <label className="block mb-1 text-sm font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        className="w-full px-4 py-2 border rounded-lg"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {formik.errors.name && (
                        <p className="text-red-500 text-sm">{formik.errors.name}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block mb-1 text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border rounded-lg"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.errors.email && (
                        <p className="text-red-500 text-sm">{formik.errors.email}</p>
                    )}
                </div>

                {/* Mobile */}
                <div>
                    <label className="block mb-1 text-sm font-medium">Mobile</label>
                    <input
                        type="text"
                        name="mobile"
                        placeholder="Enter your mobile number"
                        className="w-full px-4 py-2 border rounded-lg"
                        onChange={formik.handleChange}
                        value={formik.values.mobile}
                    />
                    {formik.errors.mobile && (
                        <p className="text-red-500 text-sm">{formik.errors.mobile}</p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label className="block mb-1 text-sm font-medium">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 border rounded-lg"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    {formik.errors.password && (
                        <p className="text-red-500 text-sm">{formik.errors.password}</p>
                    )}
                </div>

                {/* Button */}
                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full bg-green-600 text-white py-2 rounded-lg disabled:opacity-50"
                >
                    {mutation.isPending ? "Signing Up..." : "Sign Up"}
                </button>

                {/* Login Redirect */}
                <div className="text-center mt-2">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-green-600 font-semibold hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}