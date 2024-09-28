import { useEffect, useState } from "react";
import styled from "styled-components";
import { get_item_course } from "../../services/course";
import { CourseDetailResponse } from "../../types/course";
import { useLocation, useNavigate } from "react-router-dom";
import { Sheet } from "react-modal-sheet";

interface CourseSheetProps {
  courseId: string | null;
}

export default function CourseSheet({ courseId }: CourseSheetProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [course, setCourse] = useState<CourseDetailResponse | null>(null);

  // courseId가 있으면 시트 열기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get_item_course(Number(courseId));
        setCourse(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    if (courseId) {
      setIsOpen(true);
      fetchData();
    } else {
      setIsOpen(false);
    }
  }, [courseId]);

  // 시트를 닫을 때 courseId를 쿼리에서 제거
  const handleClose = () => {
    const params = new URLSearchParams(location.search);
    params.delete("courseId");
    setIsOpen(false);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true }); // 쿼리 업데이트
  };

  return (
    <StyledSheet isOpen={isOpen} onClose={handleClose}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content></Sheet.Content>
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
