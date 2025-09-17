import { useEffect, useState } from "react";
import { api } from "../api/api";

interface Booking {
  id: number;
  tripId: number;
  from: string;
  to: string;
  seatsBooked: number;
  paymentStatus: string;
  date: string;
}

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [editSeats, setEditSeats] = useState<{ [key: number]: number }>({});

  const fetchBookings = () => {
    api.get("/bookings/me").then(res => {
      setBookings(res.data);
      const seatsState: { [key: number]: number } = {};
      res.data.forEach((b: Booking) => seatsState[b.id] = b.seatsBooked);
      setEditSeats(seatsState);
    });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdate = async (bookingId: number) => {
    try {
      await api.put(`/bookings/${bookingId}`, { seatsBooked: editSeats[bookingId] });
      alert("Бронирование обновлено!");
      fetchBookings();
    } catch (err: any) {
      alert(err.response?.data?.message || "Ошибка обновления бронирования");
    }
  };

  const handleCancel = async (bookingId: number) => {
    if (!confirm("Вы уверены, что хотите отменить бронирование?")) return;
    try {
      await api.delete(`/bookings/${bookingId}`);
      alert("Бронирование отменено!");
      fetchBookings();
    } catch (err: any) {
      alert(err.response?.data?.message || "Ошибка отмены бронирования");
    }
  };

  const handleKaspiPay = async (id: number) => {
  try {
    await api.post(`/bookings/${id}/pay-kaspi`);
    alert('Оплата Kaspi прошла успешно!');
    fetchBookings(); // обновление статусов сразу
  } catch (err: any) {
    alert(err.response?.data?.message || 'Ошибка оплаты через Kaspi');
  }
};

// Кнопка оплаты
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
      {bookings.length === 0 && <p>Бронирований нет</p>}
      <ul className="space-y-4">
        {bookings.map(b => (
          <li key={b.id} className="p-4 border rounded shadow flex justify-between items-center gap-4">
            <div className="flex-1">
              <p><strong>{b.from} → {b.to}</strong></p>
              <p>Дата: {new Date(b.date).toLocaleString()}</p>
              <p>Статус оплаты: <span className={b.paymentStatus === "paid" ? "text-green-600" : "text-red-600"}>{b.paymentStatus}</span></p>
              <div className="flex gap-2 items-center mt-2">
                <label>Количество мест:</label>
                <input
                  type="number"
                  min={1}
                  value={editSeats[b.id]}
                  onChange={(e) => setEditSeats({ ...editSeats, [b.id]: Number(e.target.value) })}
                  className="p-1 border rounded w-20"
                />
                <button
                  onClick={() => handleUpdate(b.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Обновить
                </button>
              </div>
            </div>
            <button
              onClick={() => handleCancel(b.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Отменить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
