import { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import Confetti from "react-confetti"; // react-confetti 추가
import { goodeList } from "../data/goodeList";
import { COLOR } from "../utils/color";

const fetchRandomGoode = () => {
  return new Promise<{ name: string; url: string }>((resolve) => {
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * goodeList.length);
      resolve({
        name: goodeList[randomIndex],
        url: `https://example.com/${goodeList[randomIndex]}`,
      });
    }, 3000);
  });
};

export default function RandomGoodePage() {
  const [isAnimated, setIsAnimated] = useState(true);
  const [selectedGoode, setSelectedGoode] = useState<{
    name: string;
    url: string;
  } | null>(null);
  const [showConfetti, setShowConfetti] = useState(false); // 폭죽 상태

  const handleShuffleClick = () => {
    setSelectedGoode(null);
    setIsAnimated(true);
    setShowConfetti(false); // 클릭할 때마다 폭죽을 숨기기

    setTimeout(async () => {
      const goode = await fetchRandomGoode();
      setIsAnimated(false);
      setSelectedGoode(goode);
      setShowConfetti(true); // 애니메이션이 끝나면 폭죽 효과 나타내기
    }, 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsAnimated(true);
      const goode = await fetchRandomGoode();
      setIsAnimated(false);
      setSelectedGoode(goode);
      setShowConfetti(true); // 처음 로드할 때도 폭죽 효과 추가
    };
    fetchData();
  }, []);

  return (
    <CardWrapper>
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}{" "}
      {/* 폭죽 효과 */}
      <CardList isAnimated={isAnimated}>
        {goodeList.slice(0, 3).map((goode, index) => (
          <CardItem key={index} data-card={index} zIndex={6 - index}>
            <Card
              color={
                index === 0
                  ? COLOR.blue
                  : index === 1
                  ? COLOR.green
                  : COLOR.beige
              }
              onClick={() => {
                if (selectedGoode && index === 0) {
                  window.location.href = selectedGoode.url;
                }
              }}
            >
              {selectedGoode && index === 0 ? selectedGoode.name : ""}
            </Card>
          </CardItem>
        ))}
      </CardList>
      <ShuffleButton onClick={handleShuffleClick}>다시 뽑기</ShuffleButton>
    </CardWrapper>
  );
}

const shuffle = keyframes`
  0% { transform: rotate(0) translateX(0) scale(1); }
  50% { transform: rotate(5deg) translateX(105%) scale(0.96); }
  100% { transform: rotate(0) translateX(0); }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;

const CardList = styled.ul<{ isAnimated: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 100%;
  height: 500px;
  margin: 0;
  padding: 30px;
  list-style: none;
  position: relative;

  ${(props) =>
    props.isAnimated &&
    css`
      & li[data-card="0"] {
        animation: ${shuffle} 1s ease-in-out 0s 1 normal;
        z-index: 2;
        transition: z-index 0s ease-in-out 0.5s;
      }
      & li[data-card="1"] {
        animation: ${shuffle} 1s ease-in-out 1s 1 normal;
        z-index: 1;
        transition: z-index 0s ease-in-out 1.5s;
      }
      & li[data-card="2"] {
        animation: ${shuffle} 1s ease-in-out 2s 1 normal;
        z-index: 0;
        transition: z-index 0s ease-in-out 2.5s;
      }
    `}
`;

const CardItem = styled.li<{ zIndex: number }>`
  position: absolute;
  z-index: ${(props) => props.zIndex};
  margin-top: ${(props) => props.zIndex * 8}px;
`;

const Card = styled.div<{ color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  width: 200px;
  max-height: 100%;
  height: 350px;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 1px 3px 0 #222;
  background: ${(props) => props.color};
  color: #fff;
  font-size: 25px;
  cursor: pointer;
`;

const ShuffleButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  background-color: #000000;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
  color: white;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: #0d2a3d;
  }
`;
