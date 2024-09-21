import {
  ItemPostThumbnailResponse,
  ItemPostCreateUpdateRequest,
  ItemPostResponse,
} from "./item";

export interface PostThumbnailResponse {
  writerNickname: string;
  postId: number;
  title: string;
  imageName: string;
  items: ItemPostThumbnailResponse[];
  commentNum: number;
  likeNum: number;
}

export interface PostCreateUpdateRequest {
  title: string;
  firstContent: string;
  lastContent: string;
  startDate: string;
  endDate: string;
  itemPosts: ItemPostCreateUpdateRequest[];
}

export interface PostDetailResponse {
  writerId: number;
  writerNickname: string;
  writerImageName: string;
  postId: number;
  title: string;
  firstContent: string;
  lastContent: string;
  createDate: string;
  startDate: string;
  endDate: string;
  visitNum: string;
  likeNum: number;
  commentNum: number;
  isPushLike: boolean;
  isOwner: boolean;
  itemPosts: ItemPostResponse[];
}
