import { useEffect, useState } from "react";
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
  const navigate = useNavigate();

  const handleShuffleClick = () => {
    setSelectedGoode(null);
    setIsAnimated(true);
    setShowConfetti(false);

    setTimeout(async () => {
      const goode = await get_items_random();
      setIsAnimated(false);
      setSelectedGoode(goode);
      setShowConfetti(true);
    }, 1800);
  };

  useEffect(() => {
    handleShuffleClick();
  }, []);

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
