import styled from "styled-components";
import { ItemsResponse } from "../../types/item";
import { useLocation, useNavigate } from "react-router-dom";
import { local_government } from "../../data/districts";
import useGoodesStore from "../../store/uesGoodesStore";
import { City } from "../../types/common";

interface GoodeCardProps {
  goode: ItemsResponse;
}

export default function GoodeCard({ goode }: GoodeCardProps) {
  const { filters, setFilters } = useGoodesStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddLocalGovernment = () => {
    // local_government 배열에서 goode의 localGovernmentName을 찾아서 일치하는 객체 반환
    let foundDistrict;
    for (const city of local_government) {
      foundDistrict = city.districts.find(
        (district) => district.name === goode.localGovernmentName
      );
      if (foundDistrict) break; // 찾았으면 루프 중단
    }

    // City 객체를 생성 (id, name, fullname)
    if (foundDistrict) {
      const localGovernment: City = {
        id: foundDistrict.id,
        name: foundDistrict.name,
        fullname: foundDistrict.fullname,
      };

      // 이미 필터에 존재하지 않으면 추가
      if (
        !filters.localGovernments.some((lg) => lg.name === localGovernment.name)
      ) {
        setFilters({
          ...filters,
          localGovernments: [...filters.localGovernments, localGovernment],
        });
      }
    } else {
      console.error("해당하는 지역을 찾을 수 없습니다.");
    }
  };

  const handleNavigateWithQuery = () => {
    const newUrl = `${location.pathname}?itemId=${goode.itemId}`;
    navigate(newUrl);
  };

  return (
    <GoodeItemContainer>
      <ItemImage
        src={
          goode.imageUrl
            ? goode.imageUrl
            : `${process.env.REACT_APP_IMAGE_URL}/frog.jpeg` // TODO: imageURL이 공백일 때, 로고 보이도록 하기
        }
        alt={goode.title}
        onClick={handleNavigateWithQuery}
      />
      <ItemDetails>
        <Title onClick={handleNavigateWithQuery}>{goode.title}</Title>
        <ButtonGroup>
          <button onClick={handleAddLocalGovernment}>
            {`${goode.metropolitanGovernmentName} ${goode.localGovernmentName}`}
          </button>
        </ButtonGroup>
      </ItemDetails>
      <Flag onClick={handleNavigateWithQuery}>{">"}</Flag>
    </GoodeItemContainer>
  );
}

const GoodeItemContainer = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  width: 100%;
`;

const ItemImage = styled.img`
  min-height: 68px;
  max-height: 68px;
  min-width: 68px;
  max-width: 68px;
  border-radius: 50%;
  margin-right: 12px;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-grow: 1;
  margin-right: 10px;
`;

const Title = styled.span`
  font-size: 17px;
  margin: 2px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;

  button {
    margin-right: 10px;
    padding: 0;
    color: #b2b2b2;
    font-size: 13px;
    background: none;
    border: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Flag = styled.div`
  padding-left: 24px;
  font-size: 20px;
`;
