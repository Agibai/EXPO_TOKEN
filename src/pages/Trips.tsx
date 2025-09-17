import { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function CreateTrip() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [seatsAvailable, setSeatsAvailable] = useState(1);
  const [pricePerSeat, setPricePerSeat] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/trips", { from, to, date, seatsAvailable, pricePerSeat });
      setSuccess("Поездка создана!");
      setError("");
      navigate("/trips"); // перенаправление на список поездок
    } catch (err: any) {
      setError(err.response?.data?.message || "Ошибка создания поездки");
      setSuccess("");
    }
  };

  return (
    <div className="flex justify-center p-4">
      <form onSubmit={handleCreate} className="p-6 border rounded shadow w-96">
        <h1 className="text-xl font-bold mb-4">Создать поездку</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}
        <input
          type="text"
          placeholder="Откуда"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Куда"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Количество мест"
          value={seatsAvailable}
          onChange={(e) => setSeatsAvailable(parseInt(e.target.value))}
          className="w-full mb-2 p-2 border rounded"
          min={1}
        />
        <input
          type="number"
          placeholder="Цена за место"
          value={pricePerSeat}
          onChange={(e) => setPricePerSeat(parseInt(e.target.value))}
          className="w-full mb-4 p-2 border rounded"
          min={0}
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Создать
        </button>
      </form>
    </div>
  );
}
