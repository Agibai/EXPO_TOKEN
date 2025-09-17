import { useEffect, useState } from "react";
import { api } from "../api/api";

interface Booking {
  id: number;
  tripId: number;
  from: string;
  to: string;
  seatsBooked: number;
  totalPrice: number;
  paymentMethod: string;
  paymentStatus: string;
  date: string;
}

export default function PaymentHistory() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const fetchHistory = () => {
    api.get("/bookings/history").then((res) => setBookings(res.data));
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">История оплат</h1>
      <div className="grid gap-4">
        {bookings.length === 0 && <p>Нет историй оплат</p>}
        {bookings.map((b) => (
          <div key={b.id} className="p-4 border rounded shadow flex flex-col gap-1">
            <p><strong>Поездка:</strong> {b.from} → {b.to}</p>
            <p><strong>Мест забронировано:</strong> {b.seatsBooked}</p>
            <p><strong>Сумма:</strong> {b.totalPrice} тг</p>
            <p><strong>Метод оплаты:</strong> {b.paymentMethod}</p>
            <p><strong>Статус оплаты:</strong> {b.paymentStatus}</p>
            <p><strong>Дата бронирования:</strong> {new Date(b.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
