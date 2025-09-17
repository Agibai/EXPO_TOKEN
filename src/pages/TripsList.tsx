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

export default function TripsList() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = () => {
    api.get("/trips").then((res) => setTrips(res.data));
  };

  const filteredTrips = trips.filter(trip => {
    return (
      (!filterFrom || trip.from.toLowerCase().includes(filterFrom.toLowerCase())) &&
      (!filterTo || trip.to.toLowerCase().includes(filterTo.toLowerCase())) &&
      (!filterDate || new Date(trip.date).toDateString() === new Date(filterDate).toDateString())
    );
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Поездки</h1>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Откуда"
          value={filterFrom}
          onChange={(e) => setFilterFrom(e.target.value)}
          className="p-2 border rounded w-40"
        />
        <input
          type="text"
          placeholder="Куда"
          value={filterTo}
          onChange={(e) => setFilterTo(e.target.value)}
          className="p-2 border rounded w-40"
        />
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      <ul className="space-y-2">
        {filteredTrips.length === 0 && <p>Поездки не найдены</p>}
        {filteredTrips.map(trip => (
          <li key={trip.id} className="p-4 border rounded shadow flex justify-between items-center">
            <div>
              <p><strong>{trip.from} → {trip.to}</strong></p>
              <p>Дата: {new Date(trip.date).toLocaleString()}</p>
              <p>Свободных мест: {trip.seatsAvailable}</p>
              <p>Цена за место: {trip.pricePerSeat} тг</p>
            </div>
            <button
              onClick={() => window.location.href = `/book-trip?tripId=${trip.id}`}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Забронировать
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
