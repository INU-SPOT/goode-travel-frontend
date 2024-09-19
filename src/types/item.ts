export interface ItemPostThumbnailResponse {
  itemType: number;
  itemTitle: string;
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
