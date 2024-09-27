import { ItemFolderResponse } from "./item";

export interface FolderCreateRequest {
  title: string;
}

export interface FolderUpdateRequest {
  title: string | null;
  sequence: number[] | null;
}

export interface FolderListResponse {
  folderId: number;
  title: string;
  image: string;
}

export interface FolderDetailResponse {
  folderId: number;
  title: string;
  itemFolders: ItemFolderResponse[];
}
