import { useEffect, useState } from "react";
import { api } from "../api/api";

interface Trip {
  id: number;
  from: string;
  to: string;
  seatsAvailable: number;
  pricePerSeat: number;
}

export default function BookTrip() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<number | null>(null);
  const [seats, setSeats] = useState(1);

  useEffect(() => {
    api.get("/trips").then((res) => setTrips(res.data));
  }, []);

  const handleBooking = async () => {
    if (!selectedTrip) return alert("Выберите поездку");
    try {
      const res = await api.post("/bookings", { tripId: selectedTrip, seatsBooked: seats, paymentMethod: "kaspi" });
      // сразу инициируем оплату KaspiPay
      await api.post(`/bookings/${res.data.id}/pay-kaspi`);
      alert("Бронирование и оплата прошли успешно!");
    } catch (err: any) {
      alert(err.response?.data?.message || "Ошибка бронирования/оплаты");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Забронировать поездку</h1>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Выберите поездку</label>
        <select
          value={selectedTrip || ""}
          onChange={(e) => setSelectedTrip(Number(e.target.value))}
          className="p-2 border rounded w-64"
        >
          <option value="">-- Выберите поездку --</option>
          {trips.map((trip) => (
            <option key={trip.id} value={trip.id}>
              {trip.from} → {trip.to} ({trip.seatsAvailable} мест свободно) — {trip.pricePerSeat} тг/место
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Количество мест</label>
        <input
          type="number"
          min={1}
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
          className="p-2 border rounded w-24"
        />
      </div>

      <button
        onClick={handleBooking}
        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
      >
        Забронировать и оплатить Kaspi
      </button>
    </div>
  );
}
