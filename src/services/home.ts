import axiosInstance from "./axiosInstance";

export const get_items_random = async () => {
  const response = await axiosInstance.get(`/v1/items/random`);
  return response.data.data;
};
