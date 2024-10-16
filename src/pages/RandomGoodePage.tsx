import { useEffect, useState, useRef, useCallback } from "react";
import styled, { keyframes, css } from "styled-components";
import Confetti from "react-confetti";
import { get_items_random } from "../services/home";
import { GoodeRandomResponse } from "../types/item";
import { COLOR } from "../utils/color";
import { useNavigate } from "react-router-dom";

export default function RandomGoodePage() {
  const [isAnimated, setIsAnimated] = useState(false);
  const [selectedGoode, setSelectedGoode] =
    useState<GoodeRandomResponse | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const isShufflingRef = useRef(false); // useRef로 isShuffling 관리
  const navigate = useNavigate();

  const handleShuffleClick = useCallback(async () => {
    if (isShufflingRef.current) return; // 중복 호출 방지
    isShufflingRef.current = true; // 호출 시작 표시
    setIsShuffling(true);

    setSelectedGoode(null);
    setIsAnimated(true);
    setShowConfetti(false);

    setTimeout(async () => {
      try {
        const goode = await get_items_random();
        setSelectedGoode(goode);
        setShowConfetti(true);
      } catch (error) {
        console.error("Failed to fetch random Goode", error);
      } finally {
        setIsAnimated(false);
        setIsShuffling(false);
        isShufflingRef.current = false; // 호출 종료 표시
      }
    }, 1800);
  }, []); // 빈 배열로 의존성 설정

  useEffect(() => {
    handleShuffleClick();
  }, [handleShuffleClick]); // handleShuffleClick은 재생성되지 않으므로 한 번만 실행

  const handleClick = (itemId: number) => {
    navigate(`?itemId=${itemId}`);
  };

  return (
    <CardWrapper>
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <CardList isAnimated={isAnimated}>
        {Array.from({ length: 6 }).map((_, index) => (
          <CardItem key={index} data-card={index} zIndex={12 - index}>
            <Card
              color={
                index === 0
                  ? COLOR.blue
                  : index === 1
                  ? COLOR.green
                  : index === 2
                  ? COLOR.beige
                  : index === 3
                  ? COLOR.yellow
                  : index === 4
                  ? COLOR.blue
                  : COLOR.green
              }
              onClick={() => {
                if (selectedGoode && index === 0) {
                  handleClick(selectedGoode.itemId);
                }
              }}
            >
              {selectedGoode && index === 0 ? selectedGoode.title : ""}
            </Card>
          </CardItem>
        ))}
      </CardList>
      <ShuffleButton onClick={handleShuffleClick} disabled={isShuffling}>
        {isShuffling ? "로딩 중..." : "다시 뽑기"}
      </ShuffleButton>
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
        animation: ${shuffle} 0.5s ease-in-out 0s 1 normal;
        z-index: 5;
        transition: z-index 0s ease-in-out 0.25s;
      }
      & li[data-card="1"] {
        animation: ${shuffle} 0.5s ease-in-out 0.25s 1 normal;
        z-index: 4;
        transition: z-index 0s ease-in-out 0.5s;
      }
      & li[data-card="2"] {
        animation: ${shuffle} 0.5s ease-in-out 0.5s 1 normal;
        z-index: 3;
        transition: z-index 0s ease-in-out 0.75s;
      }
      & li[data-card="3"] {
        animation: ${shuffle} 0.5s ease-in-out 0.75s 1 normal;
        z-index: 2;
        transition: z-index 0s ease-in-out 1s;
      }
      & li[data-card="4"] {
        animation: ${shuffle} 0.5s ease-in-out 1s 1 normal;
        z-index: 1;
        transition: z-index 0s ease-in-out 1.25s;
      }
      & li[data-card="5"] {
        animation: ${shuffle} 0.5s ease-in-out 1.25s 1 normal;
        z-index: 0;
        transition: z-index 0s ease-in-out 1.5s;
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
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 1px 3px 0 #222;
  background: ${(props) => props.color};
  color: #fff;
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const ShuffleButton = styled.button<{ disabled: boolean }>`
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#000000")};
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
  color: white;
  font-size: 18px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#ccc" : "#0d2a3d")};
  }
`;
