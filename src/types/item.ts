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
  itemTitle: string; // 서버로 전송하지 않고, 사용자에게만 보이는 정보
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

// 굳이 리스트에서 사용
export interface ItemsResponse {
  itemId: number;
  metropolitanGovernmentName: string;
  localGovernmentName: string;
  title: string;
  imageUrl: string;
}

// 굳이 상세 정보에서 사용
export interface ItemResponse {
  title: string;
  imageUrl: string;
  address: string;
  description: string;
  localGovernmentName: string;
}
