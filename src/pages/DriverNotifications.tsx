import { useEffect, useState } from "react";
import { api } from "../api/api";

interface Notification {
  id: number;
  message: string;
  createdAt: string;
  read: boolean;
}

export default function DriverNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotifications = () => {
    api.get("/notifications/driver").then((res) => setNotifications(res.data));
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000); // polling каждые 5 секунд
    return () => clearInterval(interval);
  }, []);

  const markAsRead = async (id: number) => {
    await api.post(`/notifications/${id}/read`);
    setNotifications((prev) => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Уведомления водителя</h2>
      {notifications.length === 0 && <p>Нет новых уведомлений</p>}
      <ul className="list-disc list-inside">
        {notifications.map((n) => (
          <li
            key={n.id}
            className={n.read ? "text-gray-500" : "font-semibold text-black"}
            onClick={() => markAsRead(n.id)}
          >
            {n.message} <span className="text-sm text-gray-400">({new Date(n.createdAt).toLocaleString()})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
