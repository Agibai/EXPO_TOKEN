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
  const [editSeats, setEditSeats] = useState<{ [key: number]: number }>({});

  const fetchBookings = () => {
    api.get("/bookings").then((res) => setBookings(res.data));
  };

  useEffect(() => {
    fetchBookings();

    // Polling каждые 5 секунд
    const interval = setInterval(fetchBookings, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePay = async (id: number) => {
    try {
      await api.post(`/bookings/${id}/pay`);
      alert("Оплата прошла успешно!");
      fetchBookings();
    } catch (err: any) {
      alert(err.response?.data?.message || "Ошибка оплаты");
    }
  };

  const handleUpdate = async (booking: Booking) => {
    try {
      const seats = editSeats[booking.id] || booking.seatsBooked;
      await api.put(`/bookings/${booking.id}`, { seatsBooked: seats });
      alert("Бронирование обновлено!");
      fetchBookings();
    } catch (err: any) {
      alert(err.response?.data?.message || "Ошибка обновления");
    }
  };

  const handleCancel = async (id: number) => {
    try {
      await api.delete(`/bookings/${id}`);
      alert("Бронирование отменено!");
      fetchBookings();
    } catch (err: any) {
      alert(err.response?.data?.message || "Ошибка отмены");
    }
  };

  const handleKaspiPay = async (id: number) => {
  try {
    await api.post(`/bookings/${id}/pay-kaspi`);
    alert('Оплата Kaspi прошла успешно!');
    fetchBookings();
  } catch (err: any) {
    alert(err.response?.data?.message || 'Ошибка оплаты через Kaspi');
  }
};

  {b.paymentMethod === 'kaspi' && b.paymentStatus !== 'paid' && (
  <button
    onClick={() => handleKaspiPay(b.id)}
    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
  >
    Оплатить Kaspi
  </button>
)}


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Мои бронирования</h1>
      <div className="grid gap-4">
        {bookings.map((b) => (
          <div key={b.id} className="p-4 border rounded shadow flex flex-col gap-2">
            <div>
              <p><strong>Trip ID:</strong> {b.tripId}</p>
              <p><strong>Мест забронировано:</strong> {b.seatsBooked}</p>
              <p><strong>Сумма:</strong> {b.totalPrice} тг</p>
              <p><strong>Метод оплаты:</strong> {b.paymentMethod}</p>
              <p><strong>Статус оплаты:</strong> {b.paymentStatus}</p>
            </div>

            {b.paymentStatus !== "paid" && (
              <div className="flex gap-2 flex-wrap items-center">
                <input
                  type="number"
                  min={1}
                  value={editSeats[b.id] || b.seatsBooked}
                  onChange={(e) => setEditSeats({ ...editSeats, [b.id]: parseInt(e.target.value) })}
                  className="p-2 border rounded w-32"
                />
                <button onClick={() => handleUpdate(b)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                  Обновить
                </button>
                <button onClick={() => handleCancel(b.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  Отменить
                </button>
                {b.paymentMethod === "kaspi" && (
                  <button onClick={() => handlePay(b.id)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                    Оплатить Kaspi
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
        {bookings.length === 0 && <p>Бронирования отсутствуют</p>}
      </div>
    </div>
  );
}
