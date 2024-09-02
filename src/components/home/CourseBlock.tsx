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

const Title = styled.h2`
  font-size: 15px;
  margin: 0 0 9px 0;
  text-align: right;
`;

const CourseWrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;

const DetailWrapper = styled.div`
  background-color: ${COLOR.blue};
  justify-content: center;
  height: 100%;
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
  justify-content: space-between;
`;

const DetailItem = styled.li`
  font-size: 12px;
  padding: 5px 0;
`;
