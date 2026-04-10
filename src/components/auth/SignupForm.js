"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

export default function SignupForm() {
    // --- API function inside this page ---
    const signupUser = async (userData) => {
        // Replace with your backend signup URL
        const response = await axios.post(
            "http://localhost:5000/api/v1/auth/register",
            userData
        );
        return response.data; // { msg: "User registered successfully" }
    };

    // --- React Query mutation ---
    const mutation = useMutation({
        mutationFn: signupUser,
        onSuccess: (data) => {
            alert(data.msg); // show success message
            // Optional: redirect to login page here
        },
        onError: (error) => {
            alert(error.response?.data?.msg || "Signup failed!");
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
            mutation.mutate(values); // call backend API
        },
    });

    useEffect(() => {
        if (mutation.isSuccess) console.log("Signup successful");
        if (mutation.isError) console.error("Signup error", mutation.error);
    }, [mutation.status]);

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
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                    {mutation.isLoading ? "Signing Up..." : "Sign Up"}
                </button>
            </form>
        </div>
    );
}