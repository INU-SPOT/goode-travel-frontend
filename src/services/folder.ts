import { FolderCreateRequest } from "../types/folder";
import {
  ItemFolderCreateRequest,
  ItemFolderUpdateRequest,
} from "../types/item";
import axiosInstance from "./axiosInstance";

// 폴더 안 계획의 내부 정보 수정하기
export const put_folders_plan = async (itemData: ItemFolderUpdateRequest) => {
  const response = await axiosInstance.put(`/v1/folders/plan`, itemData);
  return response.data;
};

// 새 계획 생성
export const post_folders_plan = async (itemData: ItemFolderCreateRequest) => {
  const response = await axiosInstance.post(`/v1/folders/plan`, itemData);
  return response.data;
};

// 계획이 끝난 여부 변환하기
export const put_folders_plan_itempostid = async (itempostid: number) => {
  const response = await axiosInstance.put(`/v1/folders/plan/${itempostid}`);
  return response.data;
};

// 사용자의 폴더 목록 제공
export const get_folders = async () => {
  const response = await axiosInstance.get(`/v1/folders`);
  return response.data;
};

// 새 폴더 생성
export const post_folders = async (folderData: FolderCreateRequest) => {
  const response = await axiosInstance.post(`/v1/folders`, folderData);
  return response.data;
};

// 폴더 세부정보 제공
export const get_folders_folderid = async (folderId: number) => {
  const response = await axiosInstance.get(`/v1/folders/${folderId}`);
  return response.data;
};

// 폴더 삭제
export const delete_folders = async (folderId: number) => {
  const response = await axiosInstance.delete(`/v1/folders/${folderId}`);
  return response.data;
};

// 폴더 제목, 계획 순서 수정
export const patch_folders = async (
  itemID: number,
  folderId: number,
  folderData: FolderCreateRequest
) => {
  const response = await axiosInstance.patch(
    `/v1/folders/${folderId}`,
    folderData
  );
  return response.data;
};

// 폴더 안의 계획 삭제
export const delete_folders_plan = async (
  folderId: number,
  itemFolderId: number
) => {
  const response = await axiosInstance.delete(
    `/v1/folders/${folderId}/plan/${itemFolderId}`
  );
  return response.data;
};
