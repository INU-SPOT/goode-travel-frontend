import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Sheet } from "react-modal-sheet";
import PostContainer from "../components/post/PostContainer";
import CommentsContainer from "../components/post/CommentsContainer";
import { useSheetPadding } from "../hooks/useSheetPadding";
import { ReactComponent as XIcon } from "../assets/icons/x-icon.svg";

export default function PostPage({ postId }: { postId: string | null }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useSheetPadding(isOpen);
  // postId가 있으면 시트 열기
  useEffect(() => {
    if (postId) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [postId]);

  // 시트를 닫을 때 postId를 쿼리에서 제거
  const handleClose = () => {
    const params = new URLSearchParams(location.search);
    params.delete("postId");
    setIsOpen(false);
    const newURL = `${location.pathname}?${params.toString()}`;
    navigate(newURL); // 쿼리 업데이트
  };

  return (
    <StyledSheet isOpen={isOpen} onClose={handleClose} disableDrag>
      <Sheet.Container
        style={{
          top: "0px",
          borderTopRightRadius: "0px",
          borderTopLeftRadius: "0px",
        }}
      >
        <Sheet.Content>
          <PostPageContainer>
            <CloseButton onClick={handleClose}>
              <StyledXIcon />
            </CloseButton>
            <PostContainer postId={Number(postId)} />
            <Line />
            <CommentsContainer postId={Number(postId)} />
          </PostPageContainer>
        </Sheet.Content>
      </Sheet.Container>
    </StyledSheet>
  );
}

const StyledSheet = styled(Sheet)`
  width: 100%;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
`;

const PostPageContainer = styled.div`
  position: relative;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Line = styled.div`
  height: 2px;
  width: 100%;
  background-color: #e0e0e0;
`;

const CloseButton = styled.div`
  position: absolute;
  padding: 4px;
  top: 22px;
  left: 22px;
  z-index: 1000;
  cursor: pointer;
`;

const StyledXIcon = styled(XIcon)`
  width: 12px;
  height: 12px;
`;
