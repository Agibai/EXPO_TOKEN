import { useState } from "react";
import { api, setAuthToken } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { phone, password });
      const token = res.data.access_token;
      localStorage.setItem("token", token);
      setAuthToken(token);
      navigate("/trips");
    } catch (err: any) {
      setError(err.response?.data?.message || "Ошибка входа");
    }
    const handleLogin = async () => {
  try {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.access_token);
    localStorage.setItem("role", res.data.role); // сохраняем роль
    navigate("/trips");
  } catch (err) {
    alert("Ошибка входа");
  }
};

  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="p-6 border rounded shadow w-80">
        <h1 className="text-xl font-bold mb-4">Вход</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Войти
        </button>
      </form>
    </div>
  );
}
