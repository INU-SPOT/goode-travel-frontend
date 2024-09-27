import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Sheet } from "react-modal-sheet";

interface GoodeSheetProps {
  itemId: string | null;
}

export default function ItemSheet({ itemId }: GoodeSheetProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // itemId가 있으면 시트 열기
  useEffect(() => {
    if (itemId) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [itemId]);

  // 시트를 닫을 때 itemId를 쿼리에서 제거
  const handleClose = () => {
    setIsOpen(false);
    navigate("/goode", { replace: true }); // query 없이 메인 페이지로 이동
  };

  return (
    <StyledSheet isOpen={isOpen} onClose={handleClose}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <ContentWrapper>
            <h2>Item Details for ID: {itemId}</h2>
            {/* 여기에 필요한 아이템 정보를 추가 */}
          </ContentWrapper>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={handleClose} />
    </StyledSheet>
  );
}

const StyledSheet = styled(Sheet)`
  width: 100%;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
`;

const ContentWrapper = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
