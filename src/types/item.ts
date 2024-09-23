export interface ItemPostThumbnailResponse {
  itemType: number;
  itemTitle: string;
}

export interface ItemPostImageRequest {
  itemPostImageId: number | null;
  imageName: string;
}

export interface ItemPostCreateUpdateRequest {
  itemPostId: number | null;
  itemId: number;
  title: string; // 서버로 전송하지 않고, 사용자에게만 보이는 정보
  content: string;
  images: ItemPostImageRequest[];
}

export interface ItemPostImageResponse {
  itemPostImageId: number;
  imageName: string;
}

export interface ItemPostResponse {
  itemPostId: number;
  itemId: number;
  itemTitle: string;
  itemType: number;
  isOfficial: boolean;
  content: string;
  images: ItemPostImageResponse[];
}

export interface ItemFolderCreateRequest {
  folderId: number;
  itemId: number;
  emoji: string;
}

export interface ItemFolderUpdateRequest {
  itemFolderId: number;
  title: string;
  emoji: string;
  localGovernmentId: string;
  address: string;
}

export interface ItemFolderResponse {
  itemId: number;
  itemFolderId: number;
  isOfficial: boolean;
  itemType: string;
  title: string;
  image: string;
  address: string;
  finishDate: string;
  isFinished: boolean;
}
