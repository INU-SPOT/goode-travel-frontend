import { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as MinusIcon } from "../../assets/icons/minus-icon.svg";
import { ReactComponent as CameraIcon } from "../../assets/icons/camera-icon.svg";
import WriteTextArea from "./WriteTextArea";
import useWriteStore from "../../store/useWriteStore";
import { ItemPostImageRequest } from "../../types/item";
import { post_posts_image } from "../../services/post";

interface ItemContainerProps {
  itemId: number;
  title: string;
  dragListeners: any;
}

export default function ItemContainer({
  itemId,
  title,
  dragListeners,
}: ItemContainerProps) {
  const { removeItemPost, updatePostImages, itemPosts } = useWriteStore();
  const [selectedImages, setSelectedImages] = useState<ItemPostImageRequest[]>(
    []
  );

  // 렌더링될 때: 전역 상태의 images를 로컬 상태로 가져오기
  useEffect(() => {
    const item = itemPosts.find((item) => item.itemId === itemId);
    if (item && item.images) {
      setSelectedImages(item.images);
    }
  }, [itemId, itemPosts]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      // 각각의 파일을 업로드하고 리턴된 imageName을 저장
      const uploadedImageNames: ItemPostImageRequest[] = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);

          try {
            const response = await post_posts_image(formData);
            const imageName = response.data; // 서버에서 리턴되는 imageName을 사용
            return { itemPostImageId: null, imageName }; // itemPostImageId는 null
          } catch (error) {
            console.error("Image upload failed:", error);
            return { imageName: "", itemPostImageId: null }; // 오류가 발생할 경우 기본값 반환
          }
        })
      );

      // imageName이 빈 문자열이 아닌 것들만 필터링하여 상태와 전역 상태에 업데이트
      const validImages = uploadedImageNames.filter(
        (image) => image.imageName !== "" || null
      );

      setSelectedImages((prevImages) => {
        const newImages = [...prevImages, ...validImages];
        updatePostImages(itemId, newImages);
        return newImages;
      });
    }
  };

  const handleImageRemove = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    updatePostImages(itemId, newImages);
  };

  return (
    <StyledItemContainer>
      <TitleWrapper>
        <span {...dragListeners} style={{ cursor: "grab" }}>
          {title}
        </span>
        <StyledMinusIcon onClick={() => removeItemPost(itemId)} />
      </TitleWrapper>
      <WriteTextArea itemId={itemId} placeholder="일정에 대해 소개해 주세요." />
      <input
        id={`image-upload-${itemId}`}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
      <ImagePreview>
        <CameraButton htmlFor={`image-upload-${itemId}`}>
          <CameraIcon />
        </CameraButton>
        {selectedImages.map((image, index) => (
          <ImageWrapper key={index}>
            <img
              src={`${process.env.REACT_APP_IMAGE_URL}/${image.imageName}`}
              alt={`ItemPostImage-${index}`}
            />
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
