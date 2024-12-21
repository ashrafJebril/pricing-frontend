import React from 'react';
import { Package, TrendingUp, Users, FileSpreadsheet } from 'lucide-react';
import StatCard from './StatCard';
import { useDashboardStats } from '../../hooks/useDashboardStats';

const DashboardStats = () => {
  const { stats, isLoading } = useDashboardStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Products"
        value={stats?.totalProducts ?? 0}
        icon={Package}
        trend={5}
        isLoading={isLoading}
      />
      <StatCard
        title="Price Updates"
        value={stats?.priceUpdates ?? 0}
        icon={TrendingUp}
        trend={12}
        isLoading={isLoading}
      />
      <StatCard
        title="Active Users"
        value={stats?.activeUsers ?? 0}
        icon={Users}
        trend={-2}
        isLoading={isLoading}
      />
      <StatCard
        title="Data Uploads"
        value={stats?.dataUploads ?? 0}
        icon={FileSpreadsheet}
        trend={8}
        isLoading={isLoading}
      />
    </div>
  );
};

export default DashboardStats;