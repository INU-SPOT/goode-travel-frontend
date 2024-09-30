export interface CommentDetailResponse {
  commentId: number;
  userId: number;
  nickname: string;
  profileImageName: string;
  date: string;
  isOwner: boolean;
  isModified: false;
  content: string;
  replyComments: ReplyCommentResponse[];
}

export interface ReplyCommentResponse {
  replyCommentId: number;
  userId: number;
  nickname: string;
  profileImageName: string;
  date: string;
  isOwner: boolean;
  isModified: boolean;
  content: string;
}

export interface UserCommentResponse {
  type: string;
  postId: number;
  postTitle: string;
  date: string;
  isModified: boolean;
  createDate: string;
  content: string;
}
