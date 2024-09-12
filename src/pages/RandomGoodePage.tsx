import React, { useState } from "react";
import styled from "styled-components";
import { COLOR } from "../utils/color";

// 예시 데이터 리스트
const data = [
  "굳이 1",
  "굳이 2",
  "굳이 3",
  "굳이 4",
  "굳이 5",
  "굳이 6",
  "굳이 7",
  "굳이 8",
  "굳이 9",
  "굳이 10",
  "굳이 11",
  "굳이 12",
  "굳이 13",
  "굳이 14",
  "굳이 15",
  "굳이 16",
  "굳이 17",
  "굳이 18",
  "굳이 19",
  "굳이 20",
  "굳이 21",
  "굳이 22",
  "굳이 23",
  "굳이 24",
  "굳이 25",
  "굳이 26",
  "굳이 27",
  "굳이 28",
  "굳이 29",
  "굳이 30",
];

export default function RandomGoodePage() {
  const [selectedBox, setSelectedBox] = useState<number | null>(null);

  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    setSelectedBox(randomIndex);
  };

  return (
    <Container>
      {selectedBox !== null && <Box>{data[selectedBox]}</Box>}
      <Button onClick={handleClick}>즉흥 굳이 뽑기</Button>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #636363;
`;

const Box = styled.div`
  width: 300px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  color: #000000;
  border-radius: 13px;
  font-size: 21px;
  font-weight: 600;
  text-align: center;
`;

const Button = styled.button`
  position: absolute;
  bottom: 100px;
  font-size: 16px;
  color: #fff;
  background-color: #000000;
`;
