import { useEffect, useState } from "react";
import { api } from "../api/api";

interface Trip {
  id: number;
  from: string;
  to: string;
  date: string;
  seatsAvailable: number;
  pricePerSeat: number;
}

export default function Trips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
  const [fromFilter, setFromFilter] = useState("");
  const [toFilter, setToFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [bookingSeats, setBookingSeats] = useState<{ [key: number]: number }>({});
  const [paymentMethod, setPaymentMethod] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    api.get("/trips").then((res) => {
      setTrips(res.data);
      setFilteredTrips(res.data);
    });
  }, []);

  const handleFilter = () => {
    let filtered = trips;
    if (fromFilter) filtered = filtered.filter((t) => t.from.toLowerCase().includes(fromFilter.toLowerCase()));
    if (toFilter) filtered = filtered.filter((t) => t.to.toLowerCase().includes(toFilter.toLowerCase()));
    if (dateFilter) filtered = filtered.filter((t) => t.date.startsWith(dateFilter));
    setFilteredTrips(filtered);
  };

  const handleReset = () => {
    setFromFilter("");
    setToFilter("");
    setDateFilter("");
    setFilteredTrips(trips);
  };

  const handleBooking = async (tripId: number) => {
    try {
      const seats = bookingSeats[tripId] || 1;
      const payment = paymentMethod[tripId] || "cash";
      await api.post("/bookings", {
        tripId,
        passengerId: 1, // пока фиксируем тестово
        seatsBooked: seats,
        paymentMethod: payment,
      });
      alert("Бронирование успешно!");
    } catch (err: any) {
      alert(err.response?.data?.message || "Ошибка бронирования");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Доступные поездки</h1>

      {/* Фильтры */}
      <div className="mb-4 flex gap-2 flex-wrap">
        <input type="text" placeholder="Откуда" value={fromFilter} onChange={(e) => setFromFilter(e.target.value)} className="p-2 border rounded" />
        <input type="text" placeholder="Куда" value={toFilter} onChange={(e) => setToFilter(e.target.value)} className="p-2 border rounded" />
        <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="p-2 border rounded" />
        <button onClick={handleFilter} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Применить</button>
        <button onClick={handleReset} className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">Сбросить</button>
      </div>

      {/* Список поездок */}
      <div className="grid gap-4">
        {filteredTrips.map((trip) => (
          <div key={trip.id} className="p-4 border rounded shadow">
            <p><strong>От:</strong> {trip.from}</p>
            <p><strong>До:</strong> {trip.to}</p>
            <p><strong>Дата:</strong> {new Date(trip.date).toLocaleString()}</p>
            <p><strong>Мест:</strong> {trip.seatsAvailable}</p>
            <p><strong>Цена за место:</strong> {trip.pricePerSeat} тг</p>

            {/* Бронирование */}
            <div className="mt-2 flex flex-col gap-2">
              <input
                type="number"
                min={1}
                max={trip.seatsAvailable}
                value={bookingSeats[trip.id] || 1}
                onChange={(e) => setBookingSeats({ ...bookingSeats, [trip.id]: parseInt(e.target.value) })}
                className="p-2 border rounded w-32"
                placeholder="Количество мест"
              />
              <select
                value={paymentMethod[trip.id] || "cash"}
                onChange={(e) => setPaymentMethod({ ...paymentMethod, [trip.id]: e.target.value })}
                className="p-2 border rounded w-32"
              >
                <option value="cash">Наличные</option>
                <option value="kaspi">Kaspi</option>
              </select>
              <button onClick={() => handleBooking(trip.id)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 w-32">
                Забронировать
              </button>
            </div>
          </div>
        ))}
        {filteredTrips.length === 0 && <p>Поездки не найдены</p>}
      </div>
    </div>
  );
}
