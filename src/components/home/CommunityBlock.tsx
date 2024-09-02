import React from "react";
import styled from "styled-components";
import { COLOR } from "../../utils/color";

interface SharedProps {
  title?: string;
  goode: string;
  details?: string[];
  recommendations?: number;
}

const CommunityBlock: React.FC<SharedProps> = ({
  title,
  goode,
  details,
  recommendations,
}) => {
  return (
    <CommunityWrapper>
      <Title>{title}</Title>
      <Goode>{goode}</Goode>
      <DetailList>
        {details?.map((detail, index) => (
          <DetailItem key={index}>{detail}</DetailItem>
        ))}
      </DetailList>
      <Recommendations>{recommendations}개</Recommendations>
    </CommunityWrapper>
  );
};

export default CommunityBlock;

const CommunityWrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.green};
  justify-content: center;
  border-radius: 16px;
  padding: 18px;
  box-sizing: border-box;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
`;

const Title = styled.h2`
  font-size: 19px;
  font-weight: bold;
  margin-bottom: 12px;
  margin-top: 0;
  text-align: center;
`;

const Goode = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 12px;
  margin-top: 0;
`;

const DetailList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 10px;
  color: #888888;
`;

const DetailItem = styled.li`
  font-size: 14px;
  margin-bottom: 9px;
`;

const Recommendations = styled.div`
  font-size: 12px;
  text-align: right;
`;
