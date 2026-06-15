import { Edit2 } from 'lucide-react';

interface User {
  name: string;
  email: string;
  avatar: string;
  phone: string;
}

export const ProfileHeader = ({ user }: { user: User }) => (
  <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-8 py-6 flex items-center gap-6">
    <div className="relative">
      <img
        src={user.avatar}
        alt={user.name}
        className="w-24 h-24 rounded-2xl object-cover border-4 border-white dark:border-gray-900 shadow"
      />
      <button className="absolute bottom-1 right-1 bg-black text-white p-2 rounded-xl hover:bg-gray-800">
        <Edit2 size={18} />
      </button>
    </div>

    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
      <p className="text-gray-500 dark:text-gray-400 mt-1">{user.email}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">📞 {user.phone}</p>
    </div>
  </div>
);