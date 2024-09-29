import axiosInstance from "./axiosInstance";

// 공식 굳이의 코스 가져오기
export const get_item_course = async (itemId: number) => {
  const response = await axiosInstance.get(`v1/item/${itemId}/course`);
  return response.data;
};
