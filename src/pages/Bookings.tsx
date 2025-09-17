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

  const fetchBookings = () => {
    api.get("/bookings").then((res) => setBookings(res.data));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handlePay = async (id: number) => {
    try {
      await api.post(`/bookings/${id}/pay`);
      alert("Оплата прошла успешно!");
      fetchBookings(); // обновляем список
    } catch (err: any) {
      alert(err.response?.data?.message || "Ошибка оплаты");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Мои бронирования</h1>
      <div className="grid gap-4">
        {bookings.map((b) => (
          <div key={b.id} className="p-4 border rounded shadow flex justify-between items-center">
            <div>
              <p><strong>Trip ID:</strong> {b.tripId}</p>
              <p><strong>Мест забронировано:</strong> {b.seatsBooked}</p>
              <p><strong>Сумма:</strong> {b.totalPrice} тг</p>
              <p><strong>Метод оплаты:</strong> {b.paymentMethod}</p>
              <p><strong>Статус оплаты:</strong> {b.paymentStatus}</p>
            </div>
            {b.paymentMethod === "kaspi" && b.paymentStatus !== "paid" && (
              <button
                onClick={() => handlePay(b.id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Оплатить Kaspi
              </button>
            )}
          </div>
        ))}
        {bookings.length === 0 && <p>Бронирования отсутствуют</p>}
      </div>
    </div>
  );
}
