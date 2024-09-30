import { useEffect, useState } from "react";
import styled from "styled-components";
import { WeatherResponse } from "../../types/item";
import { get_items_weather } from "../../services/item";

export default function Weather({ itemId }: { itemId: string }) {
  const [weather, setWeather] = useState<WeatherResponse>();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await get_items_weather(Number(itemId));
        setWeather(response.data);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    };
    fetchWeather();
    // setWeather({
    //   metropolitanGovernmentName: "인천광역시",
    //   localGovernmentName: "연수구",
    //   date: "2024-09-30",
    //   sky: "맑음",
    //   temperature: "25",
    //   day: "night",
    //   todayWeatherLink: "link",
    // });
  }, [itemId]);

  const renderWeatherComponent = () => {
    if (!weather) {
      return <></>;
    }

    if (weather.day === "night") {
      switch (weather.sky) {
        case "맑음":
          return (
            <NightSky>
              <Moon />
              <StarContainer>
                <Star className="star1" />
                <Star className="star2" />
                <Star className="star3" />
                <Star className="star4" />
                <Star className="star5" />
                <Star className="star6" />
                <Star className="star7" />
              </StarContainer>
            </NightSky>
          );
        case "구름":
          return (
            <NightSky>
              <Cloud1 className="cloud" />
              <Cloud2 className="cloud" />
              <Cloud3 className="cloud" />
            </NightSky>
          );
        case "비":
          return (
            <NightSky>
              <RainContainer>
                <Rain className="rain" />
                <Rain className="rain" />
                <Rain className="rain" />
                <Rain className="rain" />
                <Rain className="rain" />
                <Rain className="rain" />
                <Rain className="rain" />
                <Rain className="rain" />
              </RainContainer>
            </NightSky>
          );
        case "진눈깨비":
          return (
            <NightSky>
              <SleetContainer>
                <SleetRain className="sleet-rain" />
                <SleetRain className="sleet-rain" />
                <SleetRain className="sleet-rain" />
                <SleetRain className="sleet-rain" />
                <SleetSnow className="sleet-snow" />
                <SleetSnow className="sleet-snow" />
                <SleetSnow className="sleet-snow" />
                <SleetSnow className="sleet-snow" />
              </SleetContainer>
            </NightSky>
          );
        case "눈":
          return (
            <NightSky>
              <SnowContainer>
                <Snowflake className="snowflake" />
                <Snowflake className="snowflake" />
                <Snowflake className="snowflake" />
                <Snowflake className="snowflake" />
                <Snowflake className="snowflake" />
                <Snowflake className="snowflake" />
                <Snowflake className="snowflake" />
                <Snowflake className="snowflake" />
              </SnowContainer>
            </NightSky>
          );
        default:
          return (
            <NightSky>
              <Moon />
            </NightSky>
          );
      }
    } else {
      // Day
      switch (weather.sky) {
        case "맑음":
          return (
            <ClearSky>
              <Sun />
            </ClearSky>
          );
        case "구름":
          return (
            <CloudySky>
              <Cloud1 className="cloud" />
              <Cloud2 className="cloud" />
              <Cloud3 className="cloud" />
            </CloudySky>
          );
        case "비":
          return (
            <RainSky>
              <RainContainer>
                <Rain className="rain" />
                <Rain className="rain" />
                <Rain className="rain" />
                <Rain className="rain" />
                <Rain className="rain" />
                <Rain className="rain" />
                <Rain className="rain" />
                <Rain className="rain" />
              </RainContainer>
            </RainSky>
          );
        case "진눈깨비":
          return (
            <SleetSky>
              <SleetContainer>
                <SleetRain className="sleet-rain" />
                <SleetRain className="sleet-rain" />
                <SleetRain className="sleet-rain" />
                <SleetRain className="sleet-rain" />
                <SleetSnow className="sleet-snow" />
                <SleetSnow className="sleet-snow" />
                <SleetSnow className="sleet-snow" />
                <SleetSnow className="sleet-snow" />
              </SleetContainer>
            </SleetSky>
          );
        case "눈":
          return (
            <SnowSky>
              <SnowContainer>
                <Snowflake className="snowflake" />
                <Snowflake className="snowflake" />
                <Snowflake className="snowflake" />
                <Snowflake className="snowflake" />
                <Snowflake className="snowflake" />
                <Snowflake className="snowflake" />
                <Snowflake className="snowflake" />
                <Snowflake className="snowflake" />
                <Snowflake className="snowflake" />
                <Snowflake className="snowflake" />
              </SnowContainer>
            </SnowSky>
          );
        default:
          return (
            <ClearSky>
              <Sun />
            </ClearSky>
          );
      }
    }
  };

  return (
    <WeatherWrapper>
      {renderWeatherComponent()}
      {weather && (
        <WeatherInfo>
          <h2>{weather.temperature}°C</h2>
          <h4>{weather.metropolitanGovernmentName}</h4>
          <h4>{weather.localGovernmentName}</h4>
        </WeatherInfo>
      )}
    </WeatherWrapper>
  );
}

/* 스타일 컴포넌트 */
const WeatherWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const WeatherInfo = styled.div`
  position: absolute;
  left: 5%;
  bottom: 10%;
  z-index: 10;
  color: white;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  h2 {
    margin: 0;
  }
  h4 {
    margin: 0;
  }
`;

/* Clear Sky */
const ClearSky = styled.div`
  background: linear-gradient(#a1d8f7 0%, #57a0ff 50%, #006eff 100%);
  width: 100%;
  height: 100%;
  border-radius: 6px;
`;

/* Cloudy Sky */
const CloudySky = styled.div`
  background: linear-gradient(180deg, #6b6b6b 0%, #9b9b9b 50%, #e0e0e0 100%);
  width: 100%;
  height: 100%;
  border-radius: 6px;
`;

/* Rainy Sky */
const RainSky = styled.div`
  background: linear-gradient(180deg, #394f64 0%, #667d94 50%, #b0c4de 100%);
  width: 100%;
  height: 100%;
  border-radius: 6px;
`;

/* Sleet Sky */
const SleetSky = styled.div`
  background: linear-gradient(180deg, #4b5c6e 0%, #7d8f9e 50%, #d9e6ef 100%);
  width: 100%;
  height: 100%;
  border-radius: 6px;
`;

/* Snowy Sky */
const SnowSky = styled.div`
  background: linear-gradient(180deg, #c0d6df 0%, #d2e4ed 50%, #f9f9f9 100%);
  width: 100%;
  height: 100%;
  border-radius: 6px;
`;

/* Night Sky */
const NightSky = styled.div`
  background: linear-gradient(180deg, #0d1b2a 0%, #123456 50%, #162b4f 100%);
  width: 100%;
  height: 100%;
  border-radius: 6px;
`;

/* 태양 */
const Sun = styled.div`
  background: radial-gradient(
    50% 50% at 50% 50%,
    #ffffff 0%,
    rgba(255, 255, 255, 0.9) 70%,
    rgba(255, 255, 0, 0.8) 100%
  );

  width: 30%;
  aspect-ratio: 1 / 1; /* 가로와 세로 비율을 1:1로 고정하여 원형 유지 */
  border-radius: 50%;
  box-shadow: 0px 0px 50px 20px rgba(255, 204, 0, 0.7);
  box-shadow: 0px 0px 80px 40px rgba(255, 140, 0, 0.5);
  filter: blur(8px);
  position: absolute;
  top: 10%;
  left: 50%;
`;

/* 달 */
const Moon = styled.div`
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 1) 40%,
    rgba(255, 255, 255, 0.8) 70%,
    rgba(200, 200, 200, 0.6) 100%
  );
  width: 30%;
  aspect-ratio: 1 / 1; /* 가로와 세로 비율을 1:1로 고정하여 원형 유지 */
  border-radius: 50%;
  position: absolute;
  top: 10%;
  left: 55%;
  box-shadow: 0 0 30px 15px rgba(255, 255, 255, 0.4);
`;

/* 별 */
const Star = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  width: 3px;
  height: 3px;
  position: absolute;
`;

/* 별의 위치를 설정 */
const StarContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  .star1 {
    top: 10%;
    left: 15%;
  }
  .star2 {
    top: 20%;
    left: 50%;
  }
  .star3 {
    top: 35%;
    left: 75%;
  }
  .star4 {
    top: 50%;
    left: 30%;
  }
  .star5 {
    top: 60%;
    left: 20%;
  }
  .star6 {
    top: 55%;
    left: 80%;
  }
  .star7 {
    top: 45%;
    left: 40%;
  }
`;

/* 구름 */
const Cloud1 = styled.div`
  background: #ffffff;
  width: 40%;
  aspect-ratio: 2 / 1;
  top: 15%;
  left: 40%;
  border-radius: 50px;
  position: absolute;
  box-shadow: 30px 30px 40px 0 rgba(150, 150, 150, 0.5),
    -10px 0px 30px 0 rgba(200, 200, 200, 0.5),
    -30px -20px 40px 0 rgba(255, 255, 255, 0.9);
`;

const Cloud2 = styled(Cloud1)`
  top: 12%;
  left: 20%;
`;

const Cloud3 = styled(Cloud1)`
  top: 18%;
  left: 30%;
`;

/* 비 */
const RainContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
`;

const Rain = styled.div`
  position: absolute;
  width: 3%;
  aspect-ratio: 1 / 5;
  background: rgba(174, 194, 224, 0.5);
  bottom: 100%;
  animation: fall 1s linear infinite;
  /* 빗방울을 랜덤하게 배치하기 위한 클래스 */
  &:nth-child(1) {
    left: 20%;
    animation-duration: 0.8s;
    animation-delay: 0s;
  }

  &:nth-child(2) {
    left: 40%;
    animation-duration: 1.2s;
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    left: 60%;
    animation-duration: 0.6s;
    animation-delay: 0.4s;
  }

  &:nth-child(4) {
    left: 80%;
    animation-duration: 1s;
    animation-delay: 0.6s;
  }

  /* 더 많은 빗방울을 추가할 때 */
  &:nth-child(5) {
    left: 25%;
    animation-duration: 0.9s;
    animation-delay: 0.3s;
  }

  &:nth-child(6) {
    left: 55%;
    animation-duration: 1.1s;
    animation-delay: 0.5s;
  }

  &:nth-child(7) {
    left: 75%;
    animation-duration: 0.7s;
    animation-delay: 0.1s;
  }

  @keyframes fall {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(100vh);
    }
  }
`;

/* 진눈깨비 */
const SleetContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
`;

const SleetRain = styled.div`
  position: absolute;
  width: 3%;
  aspect-ratio: 1 / 5;
  background: rgba(174, 194, 224, 0.5);
  bottom: 100%;
  animation: fall 1s linear infinite;

  @keyframes fall {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(100vh);
    }
  }
  /* 빗방울 위치 설정 */
  &:nth-child(1) {
    left: 20%;
    animation-duration: 0.8s;
    animation-delay: 0s;
  }

  &:nth-child(2) {
    left: 40%;
    animation-duration: 1.2s;
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    left: 60%;
    animation-duration: 0.6s;
    animation-delay: 0.4s;
  }

  &:nth-child(4) {
    left: 80%;
    animation-duration: 1s;
    animation-delay: 0.6s;
  }
`;

const SleetSnow = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  bottom: 100%;
  animation: snow-fall 2s linear infinite;
  @keyframes snow-fall {
    0% {
      transform: translateY(0) translateX(0);
    }
    100% {
      transform: translateY(100vh) translateX(-30px);
    }
  }
  /* 눈송이 위치 설정 */
  &:nth-child(1) {
    left: 110%;
    animation-duration: 3s;
    animation-delay: 0s;
  }

  &:nth-child(2) {
    left: 30%;
    animation-duration: 2.5s;
    animation-delay: 0.5s;
  }

  &:nth-child(3) {
    left: 50%;
    animation-duration: 4s;
    animation-delay: 1s;
  }

  &:nth-child(4) {
    left: 70%;
    animation-duration: 3.5s;
    animation-delay: 0.7s;
  }

  &:nth-child(5) {
    left: 90%;
    animation-duration: 2s;
    animation-delay: 0.3s;
  }
`;

/* 눈 */
const SnowContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
`;

const Snowflake = styled.div`
  position: absolute;
  top: -10px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  width: 8px;
  height: 8px;
  animation: fall 4s linear infinite;
  @keyframes fall {
    0% {
      transform: translateY(0) translateX(0);
    }
    100% {
      transform: translateY(100vh) translateX(30px);
    }
  }

  /* 여러 눈송이의 위치와 속도를 다르게 설정 */
  &:nth-child(1) {
    left: 10%;
    animation-duration: 4s;
    animation-delay: 0s;
  }

  &:nth-child(2) {
    left: 30%;
    animation-duration: 6s;
    animation-delay: 1s;
  }

  &:nth-child(3) {
    left: 50%;
    animation-duration: 5s;
    animation-delay: 2s;
  }

  &:nth-child(4) {
    left: 70%;
    animation-duration: 7s;
    animation-delay: 1.5s;
  }

  &:nth-child(5) {
    left: 90%;
    animation-duration: 5.5s;
    animation-delay: 0.5s;
  }
`;
