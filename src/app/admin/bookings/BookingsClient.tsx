'use client';

export default function BookingsClient({ bookings }: { bookings: any[] }) {
    return (
        <div>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <ul>
                    {bookings.map(b => (
                        <li key={b.id}>{b.clientName} - {b.bookingDate} at {b.startTime}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}
