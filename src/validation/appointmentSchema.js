import * as Yup from "yup";

const phoneRegExp = /^[6-9]\d{9}$/;

const appointmentSchema = Yup.object().shape({
    fullName: Yup.string()
        .trim()
        .min(3, "Full name must be at least 3 characters")
        .max(50, "Full name is too long")
        .required("Full name is required"),

    mobile: Yup.string()
        .matches(phoneRegExp, "Enter a valid 10-digit mobile number")
        .required("Mobile number is required"),

    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),

    address: Yup.string()
        .trim()
        .min(5, "Address must be at least 5 characters")
        .max(200, "Address is too long")
        .required("Address is required"),

    date: Yup.date()
        .required("Date is required")
        .min(
            new Date(new Date().setHours(0, 0, 0, 0)),
            "Past dates are not allowed"
        ),

    timeSlot: Yup.string()
        .required("Please select a time slot"),
});

export default appointmentSchema;