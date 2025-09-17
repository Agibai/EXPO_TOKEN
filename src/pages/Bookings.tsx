import { useEffect, useState } from "react";
import { api } from "../api/api";

interface Booking {
  id: number;
  tripId: number;
  seatsBooked: number;
  totalPrice: number;
  paymentMethod: string;
  paymentStatus: string;
}

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    api.get("/bookings").then((res) => setBookings(res.data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Мои бронирования</h1>
      <div className="grid gap-4">
        {bookings.map((b) => (
          <div key={b.id} className="p-4 border rounded shadow">
            <p><strong>Trip ID:</strong> {b.tripId}</p>
            <p><strong>Мест забронировано:</strong> {b.seatsBooked}</p>
            <p><strong>Сумма:</strong> {b.totalPrice} тг</p>
            <p><strong>Метод оплаты:</strong> {b.paymentMethod}</p>
            <p><strong>Статус оплаты:</strong> {b.paymentStatus}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
