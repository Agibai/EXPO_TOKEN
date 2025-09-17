import { Link, useNavigate } from "react-router-dom";
import { setAuthToken } from "../api/api";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">YRGYZ Taxi</div>
      <div className="space-x-4">
        {token ? (
          <>
            <Link to="/trips" className="hover:underline">Поездки</Link>
            <Link to="/bookings" className="hover:underline">Бронирования</Link>
            <Link to="/create-trip" className="bg-green-500 px-3 py-1 rounded hover:bg-green-600">
              Создать поездку
            </Link>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
              Выйти
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Вход</Link>
            <Link to="/register" className="hover:underline">Регистрация</Link>
          </>
        )}
      </div>
    </nav>
  );
}
