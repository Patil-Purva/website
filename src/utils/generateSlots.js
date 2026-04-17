export const generateTimeSlots = (selectedDate) => {
    const slots = [];

    const now = new Date();
    const selected = new Date(selectedDate);

    const isToday =
        selected.toDateString() === now.toDateString();

    // Hospital timing: 9 AM to 6 PM
    for (let hour = 9; hour < 18; hour++) {
        // Skip lunch time (1 PM - 2 PM)
        if (hour === 13) continue;

        const slotTime = new Date(selected);
        slotTime.setHours(hour, 0, 0, 0);

        let disabled = false;

        // Disable past time slots for today
        if (isToday && slotTime <= now) {
            disabled = true;
        }

        slots.push({
            label: formatTime(hour),
            value: `${hour}:00`,
            disabled,
        });
    }

    return slots;
};

const formatTime = (hour) => {
    const suffix = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

    return `${formattedHour}:00 ${suffix}`;
};