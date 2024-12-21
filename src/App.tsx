import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import UploadData from "./pages/UploadData";
import UserManagement from "./pages/UserManagement";
import AddProduct from "./pages/AddProduct";
import Pricing from "./pages/Pricing";
import Customers from "./pages/Customers";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route path="customers" element={<Customers />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="/product/add-product" element={<AddProduct />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/upload" element={<UploadData />} />
            <Route path="/users" element={<UserManagement />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
