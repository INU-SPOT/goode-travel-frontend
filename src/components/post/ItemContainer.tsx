import styled from "styled-components";
import { ReactComponent as InfoIcon } from "../../assets/icons/info-icon.svg";
import { ItemPostResponse } from "../../types/item";
import Content from "./Content";
import { useLocation, useNavigate } from "react-router-dom";

export default function ItemContainer({
  itemPost,
}: {
  itemPost: ItemPostResponse;
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigateWithQuery = () => {
    const newUrl = `${location.pathname}?itemId=${itemPost.itemId}`;
    navigate(newUrl);
  };

  return (
    <StyledItemContainer>
      <TitleWrapper>
        <span>{itemPost.itemTitle}</span>
        {itemPost.isOfficial && (
          <StyledInfoIcon onClick={handleNavigateWithQuery} />
        )}
      </TitleWrapper>
      <Content content={itemPost.content} />
      <ImagePreview>
        {itemPost.images.map((image, index) => (
          <ImageWrapper key={index}>
            <img
              src={`${process.env.REACT_APP_IMAGE_URL}/${image.imageName}`}
              alt={`${image.itemPostImageId}`}
              onClick={() =>
                window.open(
                  `${process.env.REACT_APP_IMAGE_URL}/${image.imageName}`,
                  "_blank"
                )
              }
              style={{ cursor: "pointer" }}
            />
          </ImageWrapper>
        ))}
      </ImagePreview>
    </StyledItemContainer>
  );
}

const StyledItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 2px 8px 0px #0000001a;
  background-color: white;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    font-size: 16px;
    font-weight: bold;
  }
`;

const StyledInfoIcon = styled(InfoIcon)`
  width: 16px;
  height: 16px;
`;

const ImagePreview = styled.div`
  display: flex;
  gap: 8px;
  padding: 4px 0;
  overflow-x: scroll;
`;

const ImageWrapper = styled.div`
  position: relative;
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
  }
`;
