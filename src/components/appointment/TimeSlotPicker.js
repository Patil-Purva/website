"use client";

export default function TimeSlotPicker({
    slots,
    value,
    onChange,
    error,
}) {
    return (
        <div>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border p-2 rounded"
            >
                <option value="">Select Time Slot</option>

                {slots.map((slot) => (
                    <option
                        key={slot.value}
                        value={slot.value}
                        disabled={slot.disabled}
                    >
                        {slot.label}
                    </option>
                ))}
            </select>

            {error && (
                <div className="text-red-500 text-sm">{error}</div>
            )}
        </div>
    );
}