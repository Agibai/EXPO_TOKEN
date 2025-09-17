import { useEffect, useState } from "react";
import { api } from "../api/api";

interface Booking {
  id: number;
  seatsBooked: number;
  passengerId: number;
  paymentStatus: string;
}

interface Trip {
  id: number;
  from: string;
  to: string;
  date: string;
  seatsAvailable: number;
  pricePerSeat: number;
  bookings: Booking[];
}

export default function DriverTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);

  const fetchTrips = () => {
    api.get("/trips/driver").then((res) => setTrips(res.data));
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Мои поездки (водитель)</h1>
      <div className="grid gap-4">
        {trips.map((trip) => (
          <div key={trip.id} className="p-4 border rounded shadow">
            <p><strong>От:</strong> {trip.from}</p>
            <p><strong>До:</strong> {trip.to}</p>
            <p><strong>Дата:</strong> {new Date(trip.date).toLocaleString()}</p>
            <p><strong>Мест доступно:</strong> {trip.seatsAvailable}</p>
            <p><strong>Цена за место:</strong> {trip.pricePerSeat} тг</p>

            <h2 className="mt-2 font-semibold">Бронирования:</h2>
            {trip.bookings.length === 0 ? (
              <p>Пока нет бронирований</p>
            ) : (
              <ul className="list-disc list-inside">
                {trip.bookings.map((b) => (
                  <li key={b.id}>
                    ID пассажира: {b.passengerId}, Мест: {b.seatsBooked}, Статус оплаты: {b.paymentStatus}
                  </li>
                ))}
              </ul>
            )}

            <p className="mt-2 font-semibold">
              Мест свободно: {trip.seatsAvailable - trip.bookings.reduce((acc, b) => acc + b.seatsBooked, 0)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
