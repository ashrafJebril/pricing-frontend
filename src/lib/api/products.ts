import { api } from './base';
import { Product, ProductFilters } from '../../types/product';

export const productsApi = {
  async getProducts(filters?: ProductFilters): Promise<Product[]> {
    const queryParams = new URLSearchParams();
    if (filters?.search) queryParams.set('search', filters.search);
    if (filters?.productGroup) queryParams.set('productGroup', filters.productGroup);
    if (filters?.sortBy) queryParams.set('sortBy', filters.sortBy);
    
    return api.get(`/products?${queryParams.toString()}`);
  },

  async getProductStats(): Promise<{
    totalProducts: number;
    priceUpdates: number;
    activeUsers: number;
    dataUploads: number;
  }> {
    return api.get('/products/stats');
  }
};