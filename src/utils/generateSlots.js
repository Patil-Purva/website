export const generateTimeSlots = (selectedDate) => {
    const slots = [];
    const now = new Date();
    const selected = new Date(selectedDate);

    const isToday =
        selected.toDateString() === now.toDateString();

    const format12Hour = (hour) => {
        const period = hour >= 12 ? "PM" : "AM";
        const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
        return `${formattedHour}:00 ${period}`;
    };

    for (let hour = 9; hour < 18; hour++) {
        const slotTime = new Date(selected);
        slotTime.setHours(hour, 0, 0, 0);

        // ✅ Skip past time if today
        if (isToday && slotTime <= now) continue;

        slots.push({
            value: `${hour}:00`, // keep backend format same
            label: `${format12Hour(hour)} - ${format12Hour(hour + 1)}`,
        });
    }

    return slots;
};