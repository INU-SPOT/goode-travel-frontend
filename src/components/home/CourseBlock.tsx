import React from "react";
import styled from "styled-components";
import { COLOR } from "../../utils/color";

interface CourseProps {
  details: string[];
}

const CourseBlock: React.FC<CourseProps> = ({ details }) => {
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
};

export default CourseBlock;

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
  border-radius: 16px;
  padding: 18px;
  box-sizing: border-box;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
`;

const DetailList = styled.ul`
  height: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DetailItem = styled.li`
  font-size: 12px;
`;
