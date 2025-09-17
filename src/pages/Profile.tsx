import { useEffect, useState } from "react";
import { api } from "../api/api";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar?: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [editUser, setEditUser] = useState({ name: "", phone: "" });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const fetchUser = () => {
    api.get("/users/me").then((res) => {
      setUser(res.data);
      setEditUser({ name: res.data.name, phone: res.data.phone });
      setPreview(res.data.avatar || null);
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editUser.name);
      formData.append("phone", editUser.phone);
      if (avatarFile) formData.append("avatar", avatarFile);

      await api.put(`/users/${user?.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Профиль обновлен!");
      fetchUser();
    } catch (err: any) {
      alert(err.response?.data?.message || "Ошибка обновления");
    }
  };

  const handleChangePassword = async (oldPass: string, newPass: string) => {
    try {
      await api.post("/users/change-password", { oldPassword: oldPass, newPassword: newPass });
      alert("Пароль изменен!");
    } catch (err: any) {
      alert(err.response?.data?.message || "Ошибка изменения пароля");
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  if (!user) return <p>Загрузка...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Профиль</h1>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Фото профиля</label>
        <img
          src={preview || "/default-avatar.png"}
          alt="avatar"
          className="w-32 h-32 rounded-full object-cover mb-2"
        />
        <input type="file" accept="image/*" onChange={handleAvatarChange} />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Имя</label>
        <input
          type="text"
          value={editUser.name}
          onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
          className="p-2 border rounded w-64"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Телефон</label>
        <input
          type="text"
          value={editUser.phone}
          onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
          className="p-2 border rounded w-64"
        />
      </div>

      <button onClick={handleUpdate} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
        Сохранить изменения
      </button>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Смена пароля</h2>
        <PasswordChangeForm onChangePassword={handleChangePassword} />
      </div>
    </div>
  );
}

interface PasswordFormProps {
  onChangePassword: (oldPass: string, newPass: string) => void;
}

function PasswordChangeForm({ onChangePassword }: PasswordFormProps) {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  return (
    <div className="flex flex-col gap-2 w-64">
      <input
        type="password"
        placeholder="Старый пароль"
        value={oldPass}
        onChange={(e) => setOldPass(e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Новый пароль"
        value={newPass}
        onChange={(e) => setNewPass(e.target.value)}
        className="p-2 border rounded"
      />
      <button
        onClick={() => onChangePassword(oldPass, newPass)}
        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
      >
        Изменить пароль
      </button>
    </div>
  );
}
