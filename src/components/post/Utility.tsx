import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as ShareIconSVG } from "../../assets/icons/share-icon.svg";
import { ReactComponent as ReportIconSVG } from "../../assets/icons/report-icon.svg";
import { ReactComponent as HeartIconSVG } from "../../assets/icons/heart-icon.svg";
import { ReactComponent as CommentIconSVG } from "../../assets/icons/comment-icon.svg";
import { post_posts_good } from "../../services/post";
import { useNavigate } from "react-router-dom";

export default function Utility({
  postId,
  title,
  likeNum,
  isPushLike,
  commentNum,
}: {
  postId: number;
  title: string;
  likeNum: number;
  isPushLike: boolean;
  commentNum: number;
}) {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(likeNum);
  const [isLiked, setIsLiked] = useState(isPushLike);
  const [isRequesting, setIsRequesting] = useState(false);

  const handleLikeClick = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("로그인이 필요합니다!");
      navigate("/login");
      return;
    }

    if (isRequesting) return;

    setIsRequesting(true);
    try {
      const response = await post_posts_good(postId);
      setLikes(response.data);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("좋아요 실패:", error);
    } finally {
      setIsRequesting(false);
    }
  };

  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "⭐️ 굳이? 여행가자! ⭐️",
          text: title,
          url: window.location.href,
        });
        console.log("Successfully shared!");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Sharing is not supported in this browser.");
    }
  };

  return (
    <Container>
      <div>
        <ShareIcon onClick={handleShareClick} />
        <ReportIcon
          onClick={() => {
            /* TODO: postId 이용 신고 기능 추가 */
          }}
        />
      </div>
      <div>
        <span>
          <HeartIcon
            onClick={handleLikeClick}
            $disabled={isRequesting}
            $isPushLike={isLiked}
          />
          <Text>{likes}</Text>
        </span>
        <span>
          <CommentIcon />
          <Text>{commentNum}</Text>
        </span>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;
    span {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
`;

const ShareIcon = styled(ShareIconSVG)`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const ReportIcon = styled(ReportIconSVG)`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const Text = styled.span`
  min-width: 10px;
  font-size: 14px;
  font-weight: bold;
`;

const HeartIcon = styled(HeartIconSVG)<{
  $disabled: boolean;
  $isPushLike: boolean;
}>`
  width: 24px;
  height: 24px;
  fill: ${({ $isPushLike }) => ($isPushLike ? "#ec221f" : "none")};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
`;

const CommentIcon = styled(CommentIconSVG)`
  width: 24px;
  height: 24px;
`;
