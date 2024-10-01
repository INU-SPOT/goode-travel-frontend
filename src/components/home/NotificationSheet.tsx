import styled from "styled-components";
import { Sheet } from "react-modal-sheet";
import NotificationBlock from "./NotificationBlock";
import { useSheetPadding } from "../../hooks/useSheetPadding";

interface NotificationSheetProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
}

export default function NotificationSheet({
  isOpen,
  onClose,
  isLoggedIn,
}: NotificationSheetProps) {
  useSheetPadding(isOpen);

  return (
    <StyledSheet isOpen={isOpen} onClose={onClose}>
      <Sheet.Container>
        <Sheet.Header />
        <StyledSheetContent>
          {isLoggedIn ? (
            <NotificationBlock /> // 알림 목록을 보여줌
          ) : (
            <NoFolder>로그인 후 이용 가능합니다.</NoFolder>
          )}
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

const NoFolder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 18px;
`;
