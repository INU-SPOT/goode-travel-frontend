import axiosInstance from "./axiosInstance";

export const get_post_top_visit = async () => {
  const response = await axiosInstance.get(`/v1/posts/top-visit`);
  return response.data.data;
};

export const get_post_top_like = async () => {
  const response = await axiosInstance.get(`/v1/posts/top-like`);
  return response.data.data;
};

export const get_items_random = async () => {
  const response = await axiosInstance.get(`/v1/items/random`);
  return response.data.data;
};
