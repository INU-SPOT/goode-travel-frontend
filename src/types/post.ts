import { ItemPostThumbnailResponse, ItemPostResponse } from "./item";

export interface PostThumbnailResponse {
  writerNickname: string;
  postId: number;
  title: string;
  imageUrl: string;
  items: ItemPostThumbnailResponse[];
  commentNum: number;
  likeNum: number;
}

export interface PostDetailResponse {
  writerId: number;
  writerNickname: string;
  writerImageUrl: string;
  postId: number;
  title: string;
  firstContent: string;
  lastContent: string;
  startDate: string;
  endDate: string;
  visitNum: string;
  likeNum: number;
  isPushLike: boolean;
  isOwner: boolean;
  itemPosts: ItemPostResponse[];
}
