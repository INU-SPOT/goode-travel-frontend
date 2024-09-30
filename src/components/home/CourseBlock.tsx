import React from "react";
import styled from "styled-components";
import { COLOR } from "../../utils/color";

interface CourseProps {
  details: string[];
  onClick?: () => void;
}

export default function CourseBlock({ details, onClick }: CourseProps) {
  return (
    <CourseWrapper>
      <Title>관광코스 살펴보기 &gt;</Title>
      <DetailWrapper>
        <DetailList>
          {details?.map((detail, index) => (
            <DetailItem key={index}>{detail}</DetailItem>
          ))}
        </DetailList>
      </DetailWrapper>
    </CourseWrapper>
  );
}

const CourseWrapper = styled.div`
  height: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 800;
  text-align: right;
`;

const DetailWrapper = styled.div`
  height: 100%;
  background-color: ${COLOR.blue};
  justify-content: center;
  border-radius: 13px;
  padding: 16px;
  box-sizing: border-box;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
  display: flex;
`;

const DetailList = styled.ul`
  width: 100%;
  list-style: none;
  justify-content: center;
  align-items: flex-start;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const DetailItem = styled.li`
  font-size: 11px;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
