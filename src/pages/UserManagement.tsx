import React from 'react';
import UserList from '../components/users/UserList';
import AddUserForm from '../components/users/AddUserForm';
import { useUsers } from '../hooks/useUsers';

const UserManagement = () => {
  const { users, isLoading, addUser, updateUserRole } = useUsers();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UserList 
            users={users} 
            isLoading={isLoading} 
            onUpdateRole={updateUserRole} 
          />
        </div>
        <div>
          <AddUserForm onAddUser={addUser} />
        </div>
      </div>
    </div>
  );
};

export default UserManagement;