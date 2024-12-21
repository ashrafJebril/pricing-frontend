import React from 'react';
import { User } from '../../types/user';
import UserListItem from './UserListItem';

interface UserListProps {
  users: User[];
  isLoading: boolean;
  onUpdateRole: (userId: string, role: string) => Promise<void>;
}

const UserList = ({ users, isLoading, onUpdateRole }: UserListProps) => {
  if (isLoading) {
    return (
      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-6 animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-gray-200 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
      {users.map((user) => (
        <UserListItem 
          key={user.id} 
          user={user} 
          onUpdateRole={onUpdateRole} 
        />
      ))}
    </div>
  );
};

export default UserList;