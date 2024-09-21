import axiosInstance from "./axiosInstance";
import { PostCreateUpdateRequest } from "../types/post";

// 게시글 목록(썸네일) 불러오기 기능 **페이징**
export const get_posts = async (page: number, size: number) => {
  const response = await axiosInstance.get(
    `/v1/posts?page=${page}&size=${size}`
  );
  return response.data;
};

// 게시글 등록 기능
export const post_posts = async (postData: PostCreateUpdateRequest) => {
  const response = await axiosInstance.post(`/v1/posts`, postData);
  return response.data;
};

// 게시글 이미지 등록
export const post_posts_image = async (formData: FormData) => {
  const response = await axiosInstance.post(`/v1/posts/image`, formData);
  return response.data;
};
