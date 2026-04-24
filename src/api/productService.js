import axios from "axios";

const API_URL = "https://dummyjson.com/products";

export const fetchProducts = async () => {
  const response = await axios.get(`${API_URL}?limit=100`);
  return response.data.products.map((p) => ({
    id: p.id,
    title: p.title,
    price: p.price,
    category: p.category,
    image: p.thumbnail,
    rating: { rate: p.rating },
  }));
};

export const fetchProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
