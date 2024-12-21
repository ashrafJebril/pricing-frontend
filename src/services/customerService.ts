import axiosInstance from "./axiosService";
import { Customer } from "../types/customer";

export const getCustomers = async (
  page: number,
  limit: number
): Promise<{
  data: Customer[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> => {
  try {
    const response = await axiosInstance.get(
      `customer?page=${page}&limit=${limit}`
    );
    console.log("Response:", response);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const addCustomer = async (
  customer: Partial<Customer>
): Promise<Customer> => {
  try {
    const response = await axiosInstance.post("customer", customer);
    console.log("Customer added successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error adding customer:", error);
    throw error;
  }
};

export const getCustomerById = async (id: number): Promise<Customer> => {
  try {
    const response = await axiosInstance.get(`customer/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching customer by ID:", error);
    throw error;
  }
};

export const updateCustomer = async (
  id: number,
  customer: Partial<Customer>
): Promise<Customer> => {
  try {
    const response = await axiosInstance.put(`customer/${id}`, customer);
    console.log("Customer updated successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error updating customer:", error);
    throw error;
  }
};

export const deleteCustomer = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`customer/${id}`);
    console.log("Customer deleted successfully");
  } catch (error: any) {
    console.error("Error deleting customer:", error);
    throw error;
  }
};
