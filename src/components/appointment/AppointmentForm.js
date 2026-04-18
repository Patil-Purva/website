"use client";

import { useEffect, useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import api from "@/services/api";
import appointmentSchema from "@/validation/appointmentSchema";
import { generateTimeSlots } from "@/utils/generateSlots";

export default function AppointmentForm() {
    const [slots, setSlots] = useState([]);
    const [userData, setUserData] = useState(null);
    const hasFetched = useRef(false);

    const today = new Date().toISOString().split("T")[0];

    const initialValues = {
        fullName: "",
        email: "",
        mobile: "",
        date: "",
        timeSlot: "",
        address: "",
    };

    // ✅ Fetch user once
    useEffect(() => {
        if (hasFetched.current) return;

        const fetchUser = async () => {
            try {
                const res = await api.get("/api/v1/auth/me");
                setUserData(res.data.data);
            } catch {
                toast.error("Failed to load user data");
            }
        };

        fetchUser();
        hasFetched.current = true;
    }, []);

    const handleDateChange = (date, setFieldValue) => {
        setFieldValue("date", date);
        setFieldValue("timeSlot", "");

        if (date) {
            setSlots(generateTimeSlots(date));
        } else {
            setSlots([]);
        }
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            await api.post("/api/v1/book-appointment", values);

            toast.success(
                "Appointment booked! Waiting for confirmation."
            );

            resetForm();
            setSlots([]);
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                "Booking failed";

            toast.error(message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center p-6">

            <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-green-100">

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-green-700">
                        Book Appointment
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Please fill the details to schedule your appointment.
                    </p>
                </div>

                <Formik
                    initialValues={
                        userData
                            ? {
                                ...initialValues,
                                fullName: userData.name,
                                email: userData.email,
                                mobile: userData.mobile,
                            }
                            : initialValues
                    }
                    enableReinitialize
                    validationSchema={appointmentSchema}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue, values }) => (
                        <Form className="space-y-6">

                            {/* Name + Email */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="label">Full Name</label>
                                    <Field name="fullName" className="input" disabled />
                                </div>

                                <div>
                                    <label className="label">Email</label>
                                    <Field name="email" className="input" disabled />
                                </div>
                            </div>

                            {/* Mobile + Address */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="label">Mobile</label>
                                    <Field name="mobile" className="input" disabled />
                                </div>

                                <div>
                                    <label className="label">Address</label>
                                    <Field name="address" className="input" />
                                    <ErrorMessage name="address" component="p" className="text-red-500 text-xs" />
                                </div>
                            </div>

                            {/* Date */}
                            <div>
                                <label className="label">Select Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    min={today}
                                    className="input"
                                    value={values.date}
                                    onChange={(e) =>
                                        handleDateChange(
                                            e.target.value,
                                            setFieldValue
                                        )
                                    }
                                />
                                <ErrorMessage name="date" component="p" className="text-red-500 text-xs" />
                            </div>

                            {/* Time Slot */}
                            <div>
                                <label className="label">Select Time Slot</label>

                                <div className="grid grid-cols-3 gap-3">
                                    {slots.length === 0 ? (
                                        <p className="text-gray-400 text-sm col-span-3">
                                            Select date first
                                        </p>
                                    ) : (
                                        slots.map((slot) => {
                                            const isSelected =
                                                values.timeSlot === slot.value;

                                            return (
                                                <button
                                                    type="button"
                                                    key={slot.value}
                                                    onClick={() =>
                                                        setFieldValue(
                                                            "timeSlot",
                                                            slot.value
                                                        )
                                                    }
                                                    className={`py-2 rounded-lg text-sm border transition
                                                        ${isSelected
                                                            ? "border-green-600 bg-green-50"
                                                            : "border-gray-300 hover:bg-green-100"
                                                        }
                                                    `}
                                                >
                                                    {slot.label}
                                                </button>
                                            );
                                        })
                                    )}
                                </div>

                                <ErrorMessage name="timeSlot" component="p" className="text-red-500 text-xs mt-1" />
                            </div>

                            {/* Submit */}
                            <button
                                type="button"   // 🚨 IMPORTANT (not submit)
                                onClick={() => {
                                    console.log("MANUAL SUBMIT 🔥");

                                    if (!values.date || !values.timeSlot || !values.address) {
                                        toast.error("Please fill all required fields");
                                        return;
                                    }

                                    handleSubmit(values, {
                                        resetForm: () => { },
                                    });
                                }}
                                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold shadow-lg transition"
                            >
                                Book Appointment
                            </button>

                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}