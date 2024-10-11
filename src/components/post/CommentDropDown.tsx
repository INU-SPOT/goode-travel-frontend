import { useState } from "react";
import styled from "styled-components";
import {
  delete_posts_comments,
  delete_posts_replycomments,
  put_posts_comments,
  put_posts_replycomments,
  post_posts_report_comments,
  post_posts_report_replycomments,
} from "../../services/comment";

export default function CommentDropDown({
  isOwner,
  id,
  content,
  type,
  fetchCommentDetail,
}: {
  isOwner: boolean;
  id: number;
  content: string;
  type: "comment" | "reply";
  fetchCommentDetail: () => void;
}) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = async () => {
    const newContent = prompt("수정할 내용을 입력해주세요:", content);
    if (newContent && newContent !== content) {
      try {
        if (type === "comment") {
          await put_posts_comments(id, newContent);
        } else {
          await put_posts_replycomments(id, newContent);
        }
        fetchCommentDetail();
      } catch (error) {
        console.error("수정 실패:", error);
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      if (isDeleting) return; // 중복 호출 방지
      setIsDeleting(true);

      try {
        if (type === "comment") {
          await delete_posts_comments(id);
        } else {
          await delete_posts_replycomments(id);
        }
        fetchCommentDetail();
      } catch (error) {
        console.error("삭제 실패:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleReport = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("로그인이 필요합니다. 로그인 후 다시 시도해 주세요.");
      return;
    }
    if (window.confirm("이 내용을 신고하시겠습니까?")) {
      try {
        if (type === "comment") {
          await post_posts_report_comments(id);
        } else {
          await post_posts_report_replycomments(id);
        }
        alert("신고가 완료되었습니다.");
      } catch (error) {
        console.error("신고 실패:", error);
      }
    }
  };

  return (
    <Wrapper>
      <button onClick={() => setDropdownVisible(!dropdownVisible)}>...</button>
      {dropdownVisible && (
        <DropdownMenu>
          {isOwner && (
            <>
              <DropdownItem onClick={handleEdit}>수정</DropdownItem>
              <DropdownItem style={{ color: "#FF0000" }} onClick={handleDelete}>
                삭제
              </DropdownItem>
            </>
          )}
          <DropdownItem style={{ color: "#FF0000" }} onClick={handleReport}>
            신고
          </DropdownItem>
        </DropdownMenu>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 0;
  right: 44px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 2px 8px 0px #0000001a;
  padding: 4px;
  z-index: 1000;

  button {
    display: block;
    min-width: 40px;
    padding: 4px;
    border-radius: 8px;
    text-align: center;
  }
`;

const DropdownItem = styled.button``;
