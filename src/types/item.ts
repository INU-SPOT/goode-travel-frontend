export interface ItemPostThumbnailResponse {
  itemType: number;
  itemTitle: string;
}

export interface ItemPostImageRequest {
  itemPostImageId: number;
  imageName: string;
}

export interface ItemPostCreateUpdateRequest {
  itemPostId: number;
  itemId: number;
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
