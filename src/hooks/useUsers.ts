import { useState, useEffect } from 'react';
import { api } from '../lib/api/base';
import { User } from '../types/user';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const data = await api.get('/users');
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async (email: string, role: string) => {
    try {
      await api.post('/users', { email, role });
      await fetchUsers();
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const updateUserRole = async (userId: string, role: string) => {
    try {
      await api.put(`/users/${userId}/role`, { role });
      await fetchUsers();
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return { users, isLoading, addUser, updateUserRole };
};