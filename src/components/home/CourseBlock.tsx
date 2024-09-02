import React from "react";
import styled from "styled-components";
import { COLOR } from "../../utils/color";

interface CourseProps {
  details: string[];
}

const CourseBlock: React.FC<CourseProps> = ({ details }) => {
  return (
    <>
      <Title>관광코스 살펴보기 &gt;</Title>
      <CourseWrapper>
        <DetailList>
          {details?.map((detail, index) => (
            <DetailItem key={index}>{detail}</DetailItem>
          ))}
        </DetailList>
      </CourseWrapper>
    </>
  );
};

export default CourseBlock;

const Title = styled.h2`
  font-size: 15px;
  margin-bottom: 9px;
  text-align: right;
`;

const CourseWrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.blue};
  justify-content: center;
  border-radius: 16px;
  padding: 18px;
  box-sizing: border-box;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
`;

const DetailList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 아이템 간의 간격을 동일하게 */
  height: 100%; /* 부모 요소의 높이를 차지하도록 */
`;

const DetailItem = styled.li`
  font-size: 12px;
  padding: 5px 0; /* 위아래로 일정한 간격 */
`;
