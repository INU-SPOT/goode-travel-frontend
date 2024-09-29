import { ItemCreateUpdateRequest } from "../types/item";
import axiosInstance from "./axiosInstance";

// 굳이의 상세 정보 제공
export const get_items = async (itemId: number) => {
  const response = await axiosInstance.put(`/v1/items/${itemId}`);
  return response.data;
};

// 사용자 굳이/계획 수정
export const put_items = async (
  itemId: number,
  itemData: ItemCreateUpdateRequest
) => {
  const response = await axiosInstance.put(`/v1/items/${itemId}`, itemData);
  return response.data;
};

// 사용자의 새로운 계획 추가
export const post_items = async (itemData: ItemCreateUpdateRequest) => {
  const response = await axiosInstance.post(`/v1/items`, itemData);
  return response.data;
};
