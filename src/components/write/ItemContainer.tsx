import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as MinusIcon } from "../../assets/icons/minus-icon.svg";
import { ReactComponent as CameraIcon } from "../../assets/icons/camera-icon.svg";
import WriteTextArea from "./WriteTextArea";
import useWriteStore from "../../store/useWriteStore";

interface ItemContainerProps {
  id: number;
  title: string;
  dragListeners: any;
}

export default function ItemContainer({
  id,
  title,
  dragListeners,
}: ItemContainerProps) {
  const { removeItemPost, updatePostImages } = useWriteStore();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const imageUrls = files.map((file) => URL.createObjectURL(file));
      setSelectedImages((prevImages) => [...prevImages, ...imageUrls]);
      updatePostImages(id, [...selectedImages, ...imageUrls]);
    }
  };

  const handleImageRemove = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    updatePostImages(id, newImages);
  };

  return (
    <StyledItemContainer>
      <TitleWrapper>
        <span {...dragListeners} style={{ cursor: "grab" }}>
          {title}
        </span>
        <StyledMinusIcon onClick={() => removeItemPost(id)} />
      </TitleWrapper>
      <WriteTextArea id={id} placeholder="일정에 대해 소개해 주세요." />
      <input
        id={`image-upload-${id}`}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
      <ImagePreview>
        <CameraButton htmlFor={`image-upload-${id}`}>
          <CameraIcon />
        </CameraButton>
        {selectedImages.map((image, index) => (
          <ImageWrapper key={index}>
            <img src={image} alt={`ItemPostImage-${index}`} />
            <StyledDeleteIcon onClick={() => handleImageRemove(index)} />
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

const StyledMinusIcon = styled(MinusIcon)`
  width: 16px;
  height: 16px;
`;

const CameraButton = styled.label`
  min-width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #abe5e3;
  border-radius: 8px;
  cursor: pointer;

  svg {
    width: 52px;
    height: 52px;
  }
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

const StyledDeleteIcon = styled(MinusIcon)`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 16px;
  height: 16px;
`;
