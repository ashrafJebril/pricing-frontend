import { useState, useEffect } from 'react';
import { api } from '../lib/api';

interface Activity {
  id: string;
  type: 'update' | 'create';
  description: string;
  timestamp: string;
}

export const useRecentActivity = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await api.get('/activities/recent');
        setActivities(data);
      } catch (error) {
        console.error('Error fetching recent activities:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return { activities, isLoading };
};