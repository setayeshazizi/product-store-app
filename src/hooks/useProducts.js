import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchProductById } from "../api/productService";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    retryDelay: 1000,
  });
};

export const useProductDetails = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    retryDelay: 1000,
  });
};
