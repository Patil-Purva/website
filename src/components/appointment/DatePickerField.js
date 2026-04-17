"use client";

export default function DatePickerField({ value, onChange, error }) {
    // Disable past dates
    const today = new Date().toISOString().split("T")[0];

    return (
        <div>
            <input
                type="date"
                value={value}
                min={today}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border p-2 rounded"
            />
            {error && (
                <div className="text-red-500 text-sm">{error}</div>
            )}
        </div>
    );
}