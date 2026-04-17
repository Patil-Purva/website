"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import appointmentSchema from "/validation/appointmentSchema";
import { generateTimeSlots } from "@/utils/generateSlots";

import DatePickerField from "./DatePickerField";
import TimeSlotPicker from "./TimeSlotPicker";

export default function AppointmentForm() {
    const [slots, setSlots] = useState([]);

    const initialValues = {
        fullName: "",
        mobile: "",
        email: "",
        address: "",
        date: "",
        timeSlot: "",
    };

    const handleDateChange = (date, setFieldValue) => {
        setFieldValue("date", date);
        setFieldValue("timeSlot", "");

        if (date) {
            const generatedSlots = generateTimeSlots(date);
            setSlots(generatedSlots);
        } else {
            setSlots([]);
        }
    };

    const handleSubmit = (values, { resetForm }) => {
        console.log("Appointment Data:", values);

        // 👉 API call later

        resetForm();
        setSlots([]);
    };

    return (
        <div className="max-w-lg mx-auto p-5 border rounded-lg shadow bg-white">
            <h2 className="text-xl font-semibold mb-4 text-center">
                Book Appointment
            </h2>

            <Formik
                initialValues={initialValues}
                validationSchema={appointmentSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, values, errors, touched, isSubmitting }) => (
                    <Form className="space-y-4">

                        {/* Full Name */}
                        <div>
                            <Field
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                className="w-full border p-2 rounded"
                            />
                            {touched.fullName && errors.fullName && (
                                <div className="text-red-500 text-sm">{errors.fullName}</div>
                            )}
                        </div>

                        {/* Mobile */}
                        <div>
                            <Field
                                type="text"
                                name="mobile"
                                placeholder="Mobile Number"
                                className="w-full border p-2 rounded"
                            />
                            {touched.mobile && errors.mobile && (
                                <div className="text-red-500 text-sm">{errors.mobile}</div>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <Field
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full border p-2 rounded"
                            />
                            {touched.email && errors.email && (
                                <div className="text-red-500 text-sm">{errors.email}</div>
                            )}
                        </div>

                        {/* Address */}
                        <div>
                            <Field
                                as="textarea"
                                name="address"
                                placeholder="Address"
                                className="w-full border p-2 rounded"
                            />
                            {touched.address && errors.address && (
                                <div className="text-red-500 text-sm">{errors.address}</div>
                            )}
                        </div>

                        {/* Date Picker Component */}
                        <DatePickerField
                            value={values.date}
                            onChange={(date) =>
                                handleDateChange(date, setFieldValue)
                            }
                            error={touched.date && errors.date}
                        />

                        {/* Time Slot Component */}
                        <TimeSlotPicker
                            slots={slots}
                            value={values.timeSlot}
                            onChange={(value) =>
                                setFieldValue("timeSlot", value)
                            }
                            error={touched.timeSlot && errors.timeSlot}
                        />

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                        >
                            {isSubmitting ? "Booking..." : "Book Appointment"}
                        </button>

                    </Form>
                )}
            </Formik>
        </div>
    );
}