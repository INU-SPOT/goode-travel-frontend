import axiosInstance from "./axiosInstance";

// 굳이의 상세 정보 제공
export const get_items_itemId = async (itemId: number) => {
  const response = await axiosInstance.get(`/v1/items/${itemId}`);
  return response.data;
};

// 굳이들 조회
export const get_items = async (
  page: number,
  size: number,
  metropolitanGovernments?: number[],
  localGovernments?: number[],
  categories?: string[],
  keyword?: string
) => {
  const params = new URLSearchParams();
  if (metropolitanGovernments && metropolitanGovernments.length > 0) {
    metropolitanGovernments.forEach((governmentId) =>
      params.append("metropolitanGovernments", governmentId.toString())
    );
  }
  if (localGovernments && localGovernments.length > 0) {
    localGovernments.forEach((government) =>
      params.append("localGovernments", government.toString())
    );
  }
  if (categories && categories.length > 0) {
    categories.forEach((category) => params.append("categories", category));
  }
  if (keyword && keyword.trim() !== "") {
    params.append("keyword", keyword);
  }
  params.append("page", page.toString());
  params.append("size", size.toString());

  const response = await axiosInstance.get(`/v1/items?${params.toString()}`);
  return response.data;
};


// 굳이 날씨 조회
export const get_items_weather = async (itemid: number) => {
  const response = await axiosInstance.get(`/v1/items/${itemid}/weather`);
  return response.data;
};

export const get_items_recommend = async () => {
  const response = await axiosInstance.get(`/v1/items/recommend`);
  return response.data;
};


