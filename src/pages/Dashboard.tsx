import React from 'react';
import DashboardStats from '../components/dashboard/DashboardStats';
import ProductsChart from '../components/dashboard/ProductsChart';
import RecentActivity from '../components/dashboard/RecentActivity';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProductsChart />
        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard;