import { useEffect, useState } from "react";
import { api } from "../api/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Trip {
  id: number;
  from: string;
  to: string;
  seatsAvailable: number;
  pricePerSeat: number;
  bookings: { seatsBooked: number; paymentStatus: string }[];
}

export default function DriverDashboard() {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    api.get("/trips/driver").then((res) => setTrips(res.data));
  }, []);

  const chartData = trips.map((trip) => {
    const bookedSeats = trip.bookings.reduce((acc, b) => acc + b.seatsBooked, 0);
    const earned = trip.bookings
      .filter((b) => b.paymentStatus === "paid")
      .reduce((acc, b) => acc + b.seatsBooked * trip.pricePerSeat, 0);
    return {
      trip: `${trip.from} → ${trip.to}`,
      bookedSeats,
      freeSeats: trip.seatsAvailable - bookedSeats,
      earned,
    };
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard водителя</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="trip" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="bookedSeats" stackId="a" fill="#8884d8" name="Забронировано мест" />
          <Bar dataKey="freeSeats" stackId="a" fill="#82ca9d" name="Свободно мест" />
        </BarChart>
      </ResponsiveContainer>

      <h2 className="mt-6 text-xl font-bold">Заработок по поездкам:</h2>
      <ul className="list-disc list-inside">
        {chartData.map((c, idx) => (
          <li key={idx}>
            {c.trip}: {c.earned} тг
          </li>
        ))}
      </ul>
    </div>
  );
}
