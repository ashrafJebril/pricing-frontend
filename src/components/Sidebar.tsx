import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  LayoutDashboard,
  Package,
  Upload,
  Users,
  LogOut,
  DollarSign,
  User2Icon,
} from "lucide-react";

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">PriceManager</h1>
      </div>
      <nav className="mt-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
              isActive ? "bg-gray-100 border-r-4 border-blue-500" : ""
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5 mr-3" />
          Dashboard
        </NavLink>
        <NavLink
          to="/customers"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
              isActive ? "bg-gray-100 border-r-4 border-blue-500" : ""
            }`
          }
        >
          <Users className="w-5 h-5 mr-3" />
          Customers
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
              isActive ? "bg-gray-100 border-r-4 border-blue-500" : ""
            }`
          }
        >
          <Package className="w-5 h-5 mr-3" />
          Products
        </NavLink>
        <NavLink
          to="/upload"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
              isActive ? "bg-gray-100 border-r-4 border-blue-500" : ""
            }`
          }
        >
          <Upload className="w-5 h-5 mr-3" />
          Upload Data
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
              isActive ? "bg-gray-100 border-r-4 border-blue-500" : ""
            }`
          }
        >
          <User2Icon className="w-5 h-5 mr-3" />
          User Management
        </NavLink>
        <NavLink
          to="/pricing"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
              isActive ? "bg-gray-100 border-r-4 border-blue-500" : ""
            }`
          }
        >
          <DollarSign className="w-5 h-5 mr-3" />
          Pricing
        </NavLink>
      </nav>
      <div className="absolute bottom-0 w-64 p-6">
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
