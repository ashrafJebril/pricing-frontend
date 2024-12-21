import axiosInstance from "./axiosService";
import { Product } from "../types/product";

export const getProducts = async (
  page: number,
  limit: number
): Promise<{
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> => {
  try {
    const response = await axiosInstance.get(
      `prices?page=${page}&limit=${limit}`
    );
    console.log("res", response);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const addProduct = async (product: Product): Promise<Product> => {
  try {
    const response = await axiosInstance.post("prices", product);
    console.log("Product added successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const searchByCatalogNumber = async (
  catalogNumber: string
): Promise<Product[]> => {
  try {
    const response = await axiosInstance.get(
      `prices/search/${catalogNumber.toString()}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error searching by catalog number:", error);
    throw error;
  }
};
