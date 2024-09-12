import { useState, useEffect } from "react";
import styled from "styled-components";
import { COLOR } from "../../utils/color";
import { Sheet } from "react-modal-sheet";
import { useScrollStore } from "../../store/scrollStore";
import Notification from "./NotificationBlock";

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
  // useScrollStore 훅을 사용해 스크롤 상태를 가져옵니다.
  const hasScrollBar = useScrollStore((state) => state.hasScrollBar);
  const [scrollBarWidth, setScrollBarWidth] = useState(0);

  useEffect(() => {
    if (hasScrollBar) {
      setScrollBarWidth(getScrollBarWidth());
    }
  }, [hasScrollBar]);

  useEffect(() => {
    if (isOpen) {
    }
  }, [isOpen]);

  return (
    <StyledSheet
      isOpen={isOpen}
      onClose={onClose}
      hasScrollBar={hasScrollBar}
      scrollBarWidth={scrollBarWidth}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <Notification />
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={onClose} />
    </StyledSheet>
  );
}

const StyledSheet = styled(Sheet)<{
  hasScrollBar: boolean;
  scrollBarWidth: number;
}>`
  width: 100%;
  max-width: 480px;
  margin-top: 40px;
  /* margin-left: ${({ hasScrollBar, scrollBarWidth }) =>
    hasScrollBar ? `${scrollBarWidth}px` : "auto"}; */
  margin-left: auto;
  margin-right: auto;
`;
