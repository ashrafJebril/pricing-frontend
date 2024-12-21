import React from 'react';
import { User } from '../../types/user';
import { formatDate } from '../../utils/format';
import { UserCircle } from 'lucide-react';

interface UserListItemProps {
  user: User;
  onUpdateRole: (userId: string, role: string) => Promise<void>;
}

const UserListItem = ({ user, onUpdateRole }: UserListItemProps) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <UserCircle className="h-12 w-12 text-gray-400" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{user.email}</h3>
            <p className="text-sm text-gray-500">Added {formatDate(user.created_at)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={user.role}
            onChange={(e) => onUpdateRole(user.id, e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            user.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {user.role}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserListItem;