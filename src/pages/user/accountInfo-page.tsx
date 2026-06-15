import { useState } from "react";
import { Edit2, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import {
  useUpdateProfileMutation,
  type UpdateProfileRequest,
} from "@/store/api/api-user";

export const AccountInfoPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState(user);
  const [isEditing, setIsEditing] = useState(false);
  const [updateProfile] = useUpdateProfileMutation();

  if (!user || !formData) {
    return null;
  }

  const handleSave = async () => {
    const profileData: UpdateProfileRequest = {
      email: formData.email,
      displayName: formData.displayName,
      phone: formData.phone,
    };
    await updateProfile({ id: user.id, data: profileData });
    setIsEditing(false);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-5 flex flex-col items-center">
        <div className="relative mb-4">
          <img
            key={user?.avatar}
            src={user.avatar}
            alt="Avatar"
            className="h-32 w-32 rounded-3xl border-4 border-white object-cover shadow-lg dark:border-gray-800"
          />
          <button className="absolute right-2 bottom-2 rounded-2xl bg-black p-3 text-white transition hover:bg-gray-800">
            <Camera size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-5">
        <Input
          id="name"
          label="Họ và tên"
          type="text"
          value={formData.displayName}
          onChange={(e) =>
            setFormData({ ...formData, displayName: e.target.value })
          }
          disabled={!isEditing}
        />

        <Input
          id="email"
          type="email"
          label="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled={!isEditing}
        />

        <Input
          id="phone"
          type="tel"
          label="Số điện thoại"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          disabled={!isEditing}
        />

        <div className="flex justify-center pt-3">
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2"
            >
              <Edit2 size={20} />
              Chỉnh sửa thông tin
            </Button>
          ) : (
            <div className="flex gap-4">
              <Button
                variant="custom"
                className="rounded-2xl bg-black px-10 py-4 font-semibold text-white transition hover:bg-gray-800"
                onClick={() => handleSave()}
              >
                Lưu thay đổi
              </Button>
              <Button onClick={() => setIsEditing(false)}>Hủy</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
