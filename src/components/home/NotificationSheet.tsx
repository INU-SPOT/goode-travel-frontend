// NotificationSheet.tsx
import { useEffect } from "react";
import styled from "styled-components";
import { Sheet } from "react-modal-sheet";
import NotificationBlock from "./NotificationBlock";

interface NotificationSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const getScrollBarWidth = () => {
  return window.innerWidth - document.documentElement.clientWidth;
};

export default function NotificationSheet({
  isOpen,
  onClose,
}: NotificationSheetProps) {
  useEffect(() => {
    const scrollBarWidth = getScrollBarWidth();

    if (isOpen) {
      // 스크롤바 너비만큼 body에 padding-right 추가
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      // 원래대로 복원
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    // 컴포넌트가 언마운트될 때 원래대로 복원
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  return (
    <StyledSheet isOpen={isOpen} onClose={onClose}>
      <Sheet.Container>
        <Sheet.Header />
        <StyledSheetContent>
          <NotificationBlock /> {/* 알림 목록을 보여줌 */}
        </StyledSheetContent>
      </Sheet.Container>
      <Sheet.Backdrop onTap={onClose} />
    </StyledSheet>
  );
}

const StyledSheet = styled(Sheet)`
  width: 100%;
  max-width: 480px;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
`;

const StyledSheetContent = styled(Sheet.Content)`
  overflow: auto;
`;
