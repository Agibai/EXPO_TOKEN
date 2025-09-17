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

  useEffect(() => {
    api.get("/trips").then((res) => setTrips(res.data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Доступные поездки</h1>
      <div className="grid gap-4">
        {trips.map((trip) => (
          <div key={trip.id} className="p-4 border rounded shadow">
            <p><strong>От:</strong> {trip.from}</p>
            <p><strong>До:</strong> {trip.to}</p>
            <p><strong>Дата:</strong> {new Date(trip.date).toLocaleString()}</p>
            <p><strong>Мест:</strong> {trip.seatsAvailable}</p>
            <p><strong>Цена за место:</strong> {trip.pricePerSeat} тг</p>
          </div>
        ))}
      </div>
    </div>
  );
}
