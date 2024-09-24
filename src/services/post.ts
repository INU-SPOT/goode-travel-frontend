import axiosInstance from "./axiosInstance";
import { PostCreateUpdateRequest } from "../types/post";

// 게시글 목록(썸네일) 불러오기 + 전체 게시글 검색 기능 **페이징**
export const get_posts = async (
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

  const response = await axiosInstance.get(`/v1/posts?${params.toString()}`);
  return response.data;
};

// 게시글 등록 기능
export const post_posts = async (postData: PostCreateUpdateRequest) => {
  const response = await axiosInstance.post(`/v1/posts`, postData);
  return response.data;
};

// 조하요~ 누르기
export const post_posts_good = async (postid: number) => {
  const response = await axiosInstance.post(`v1/posts/${postid}/good`);
  return response.data;
};

// 게시글 이미지 등록
export const post_posts_image = async (formData: FormData) => {
  const response = await axiosInstance.post(`/v1/posts/image`, formData);
  return response.data;
};

// 게시글 내용 조회하기
export const get_posts_postid = async (postid: number) => {
  const response = await axiosInstance.get(`v1/posts/${postid}`);
  return response.data;
};

// 게시글 수정하기
export const patch_posts = async (
  postid: number,
  postData: PostCreateUpdateRequest
) => {
  const resposne = await axiosInstance.patch(`v1/posts/${postid}`, postData);
  return resposne.data;
};
