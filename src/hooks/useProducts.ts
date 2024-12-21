import { useState, useCallback } from "react";
import { fetchProducts } from "../store/slices/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

export const useProducts = () => {
  const dispatch = useDispatch();
  const { products, isLoading, page, totalPages } = useSelector(
    (state: RootState) => state.products
  );

  const loadPage = useCallback(
    (page: number) => {
      dispatch(fetchProducts({ page, limit: 10 }));
    },
    [dispatch]
  );

  return { products, isLoading, page, totalPages, loadPage };
};
