import { useState, useEffect } from 'react';
import { api } from '../lib/api';

interface ProductData {
  name: string;
  value: number;
}

export const useProductsData = () => {
  const [data, setData] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await api.get('/products/groups');
        setData(products);
      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading };
};